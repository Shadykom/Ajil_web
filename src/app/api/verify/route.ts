import { NextResponse } from 'next/server'
import { getSupabaseServerClient, hasServiceRoleKey } from '@/lib/supabaseServer'
import { normalizeVerificationToken } from '@/lib/verification'

type VerifyStatus = 'approved' | 'pending' | 'revoked' | 'expired' | 'invalid' | 'error'

type Candidate = {
  table: string
  tokenColumn: string
  statusColumn?: string
  approvedValues?: string[]
  revokedValues?: string[]
  suspendedValues?: string[]
  expiresAtColumn?: string
  revokedAtColumn?: string
  suspendedAtColumn?: string
  activeColumn?: string
  approvedAtColumn?: string
  idColumn?: string
}

function getCandidatesFromEnv(): Candidate[] {
  const table = process.env.VERIFICATION_TABLE?.trim()
  const tokenColumn = process.env.VERIFICATION_TOKEN_COLUMN?.trim()
  if (table && tokenColumn) {
    return [
      {
        table,
        tokenColumn,
        statusColumn: process.env.VERIFICATION_STATUS_COLUMN?.trim() || undefined,
        expiresAtColumn: process.env.VERIFICATION_EXPIRES_AT_COLUMN?.trim() || undefined,
        activeColumn: process.env.VERIFICATION_ACTIVE_COLUMN?.trim() || undefined,
        approvedAtColumn: process.env.VERIFICATION_APPROVED_AT_COLUMN?.trim() || undefined,
        idColumn: process.env.VERIFICATION_ID_COLUMN?.trim() || undefined,
        approvedValues: (process.env.VERIFICATION_APPROVED_VALUES || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        revokedValues: (process.env.VERIFICATION_REVOKED_VALUES || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        suspendedValues: (process.env.VERIFICATION_SUSPENDED_VALUES || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      },
    ]
  }
  return []
}

function defaultCandidates(): Candidate[] {
  return [
    {
      table: 'licenses',
      tokenColumn: 'token',
      statusColumn: 'status',
      approvedValues: ['approved', 'active', 'valid'],
      revokedValues: ['revoked'],
      suspendedValues: ['suspended'],
      expiresAtColumn: 'expires_at',
      activeColumn: 'is_active',
      approvedAtColumn: 'approved_at',
      idColumn: 'id',
    },
    {
      table: 'license_verifications',
      tokenColumn: 'token',
      statusColumn: 'status',
      approvedValues: ['approved', 'active', 'valid'],
      revokedValues: ['revoked'],
      suspendedValues: ['suspended'],
      expiresAtColumn: 'expires_at',
      revokedAtColumn: 'revoked_at',
      suspendedAtColumn: 'suspended_at',
      approvedAtColumn: 'approved_at',
      idColumn: 'id',
    },
    {
      table: 'verification_tokens',
      tokenColumn: 'token',
      statusColumn: 'status',
      approvedValues: ['approved', 'active', 'valid'],
      revokedValues: ['revoked'],
      suspendedValues: ['suspended'],
      expiresAtColumn: 'expires_at',
      idColumn: 'id',
    },
  ]
}

function asDate(value: unknown): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }
  return null
}

function isTruthy(value: unknown): boolean {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value !== 0
  if (typeof value === 'string') return ['1', 'true', 'yes', 'y'].includes(value.toLowerCase())
  return false
}

function deriveStatus(row: Record<string, unknown>, c: Candidate): VerifyStatus {
  const now = new Date()

  const expiresAt = c.expiresAtColumn ? asDate(row[c.expiresAtColumn]) : null
  if (expiresAt && expiresAt.getTime() < now.getTime()) return 'expired'

  const revokedAt = c.revokedAtColumn ? asDate(row[c.revokedAtColumn]) : null
  if (revokedAt) return 'revoked'

  const suspendedAt = c.suspendedAtColumn ? asDate(row[c.suspendedAtColumn]) : null
  if (suspendedAt) return 'revoked'

  const active = c.activeColumn ? row[c.activeColumn] : undefined
  if (typeof active !== 'undefined' && !isTruthy(active)) return 'revoked'

  const statusRaw = c.statusColumn ? row[c.statusColumn] : undefined
  const status = typeof statusRaw === 'string' ? statusRaw.toLowerCase().trim() : ''

  if (status) {
    const approvedValues = (c.approvedValues?.length ? c.approvedValues : ['approved']).map((s) =>
      s.toLowerCase()
    )
    const revokedValues = (c.revokedValues?.length ? c.revokedValues : ['revoked']).map((s) =>
      s.toLowerCase()
    )
    const suspendedValues = (c.suspendedValues?.length ? c.suspendedValues : ['suspended']).map((s) =>
      s.toLowerCase()
    )

    if (revokedValues.includes(status) || suspendedValues.includes(status)) return 'revoked'
    if (approvedValues.includes(status)) return 'approved'
    return 'pending'
  }

  const approvedAt = c.approvedAtColumn ? asDate(row[c.approvedAtColumn]) : null
  if (approvedAt) return 'approved'

  return 'pending'
}

function pickReference(row: Record<string, unknown>, c: Candidate): string | undefined {
  const idCol = c.idColumn
  if (idCol && typeof row[idCol] !== 'undefined') return String(row[idCol])
  if (typeof row.id !== 'undefined') return String(row.id)
  if (typeof row.license_id !== 'undefined') return String(row.license_id)
  if (typeof row.reference !== 'undefined') return String(row.reference)
  return undefined
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const raw =
    url.searchParams.get('token') ||
    url.searchParams.get('t') ||
    url.searchParams.get('reference') ||
    url.searchParams.get('ref') ||
    url.searchParams.get('id') ||
    ''

  const token = normalizeVerificationToken(raw)
  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        status: 'invalid' as VerifyStatus,
        reason: 'missing_token',
      },
      { status: 400 }
    )
  }

  const supabase = getSupabaseServerClient()
  const candidates = [...getCandidatesFromEnv(), ...defaultCandidates()]

  let lastError: unknown = null
  for (const c of candidates) {
    try {
      const { data, error } = await supabase
        .from(c.table)
        // Don't select everything to reduce accidental exposure.
        .select('*')
        .eq(c.tokenColumn, token)
        .limit(1)
        .maybeSingle()

      if (error) {
        // If this table doesn't exist (common when not configured), try next.
        const msg = String((error as any)?.message || error)
        if (
          /does not exist/i.test(msg) ||
          /relation .* does not exist/i.test(msg) ||
          /schema cache/i.test(msg)
        ) {
          lastError = error
          continue
        }

        // If anonymous key cannot read because of RLS, this will likely fail.
        lastError = error
        continue
      }

      if (!data) continue

      const row = data as unknown as Record<string, unknown>
      const status = deriveStatus(row, c)

      return NextResponse.json({
        ok: true,
        status,
        reference: pickReference(row, c),
        usingServiceRole: hasServiceRoleKey(),
      })
    } catch (e) {
      lastError = e
    }
  }

  // If we got here, we couldn't verify (not found, table missing, or permissions).
  const hint = hasServiceRoleKey()
    ? 'not_found_or_unconfigured'
    : 'missing_service_role_key_or_rls_blocks_read'

  return NextResponse.json(
    {
      ok: false,
      status: 'error' as VerifyStatus,
      reason: hint,
      // Keep error details minimal to avoid leaking internals.
      message: lastError ? 'Verification lookup failed.' : 'Verification record not found.',
    },
    { status: 404 }
  )
}

