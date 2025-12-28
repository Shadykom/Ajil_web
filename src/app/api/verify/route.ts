import { NextResponse } from 'next/server'
import { getSupabaseServerClient, hasServiceRoleKey } from '@/lib/supabaseServer'
import { normalizeVerificationToken } from '@/lib/verification'

type VerifyStatus = 'approved' | 'pending' | 'revoked' | 'expired' | 'invalid' | 'error'

type Candidate = {
  table: string
  tokenColumns: string[]
  statusColumns?: string[]
  approvedValues?: string[]
  revokedValues?: string[]
  suspendedValues?: string[]
  expiresAtColumns?: string[]
  revokedAtColumns?: string[]
  suspendedAtColumns?: string[]
  activeColumns?: string[]
  approvedAtColumns?: string[]
  idColumns?: string[]
}

function getCandidatesFromEnv(): Candidate[] {
  const table = process.env.VERIFICATION_TABLE?.trim()
  const tokenColumnsRaw =
    process.env.VERIFICATION_TOKEN_COLUMNS?.trim() || process.env.VERIFICATION_TOKEN_COLUMN?.trim() || ''

  const tokenColumns = tokenColumnsRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  if (table && tokenColumns.length) {
    return [
      {
        table,
        tokenColumns,
        statusColumns: (process.env.VERIFICATION_STATUS_COLUMNS?.trim() ||
          process.env.VERIFICATION_STATUS_COLUMN?.trim() ||
          '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        expiresAtColumns: (process.env.VERIFICATION_EXPIRES_AT_COLUMNS?.trim() ||
          process.env.VERIFICATION_EXPIRES_AT_COLUMN?.trim() ||
          '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        activeColumns: (process.env.VERIFICATION_ACTIVE_COLUMNS?.trim() ||
          process.env.VERIFICATION_ACTIVE_COLUMN?.trim() ||
          '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        approvedAtColumns: (process.env.VERIFICATION_APPROVED_AT_COLUMNS?.trim() ||
          process.env.VERIFICATION_APPROVED_AT_COLUMN?.trim() ||
          '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        idColumns: (process.env.VERIFICATION_ID_COLUMNS?.trim() ||
          process.env.VERIFICATION_ID_COLUMN?.trim() ||
          '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
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
  const common: Omit<Candidate, 'table'> = {
    tokenColumns: ['token', 'qr_token', 'verification_token', 'public_token', 'code', 'reference', 'uuid', 'id'],
    statusColumns: ['status', 'license_status', 'state'],
    approvedValues: ['approved', 'active', 'valid'],
    revokedValues: ['revoked'],
    suspendedValues: ['suspended'],
    expiresAtColumns: ['expires_at', 'expires_on', 'expiry_date', 'valid_until', 'valid_to', 'end_date'],
    revokedAtColumns: ['revoked_at'],
    suspendedAtColumns: ['suspended_at'],
    activeColumns: ['is_active', 'active', 'enabled'],
    approvedAtColumns: ['approved_at', 'activated_at', 'issued_at'],
    idColumns: ['id', 'license_id'],
  }

  return [
    {
      table: 'licenses',
      ...common,
    },
    {
      table: 'license_verifications',
      ...common,
    },
    {
      table: 'verification_tokens',
      ...common,
    },
    // Tables commonly found in license-based apps (matching your Supabase list)
    { table: 'active_licenses', ...common },
    { table: 'user_renewable_licenses', ...common },
    { table: 'vehicle_licenses', ...common },
    { table: 'vehicle_wrapping_licenses', ...common },
    { table: 'advertisement_licenses', ...common },
    { table: 'vertical_signs_licenses', ...common },
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

function firstColumnValue(row: Record<string, unknown>, columns?: string[]): unknown {
  if (!columns?.length) return undefined
  for (const c of columns) {
    if (Object.prototype.hasOwnProperty.call(row, c)) return row[c]
  }
  return undefined
}

function deriveStatus(row: Record<string, unknown>, c: Candidate): VerifyStatus {
  const now = new Date()

  const expiresAt = asDate(firstColumnValue(row, c.expiresAtColumns))
  if (expiresAt && expiresAt.getTime() < now.getTime()) return 'expired'

  const revokedAt = asDate(firstColumnValue(row, c.revokedAtColumns))
  if (revokedAt) return 'revoked'

  const suspendedAt = asDate(firstColumnValue(row, c.suspendedAtColumns))
  if (suspendedAt) return 'revoked'

  const active = firstColumnValue(row, c.activeColumns)
  if (typeof active !== 'undefined' && !isTruthy(active)) return 'revoked'

  const statusRaw = firstColumnValue(row, c.statusColumns)
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

  const approvedAt = asDate(firstColumnValue(row, c.approvedAtColumns))
  if (approvedAt) return 'approved'

  return 'pending'
}

function pickReference(row: Record<string, unknown>, c: Candidate): string | undefined {
  const idColValue = firstColumnValue(row, c.idColumns)
  if (typeof idColValue !== 'undefined') return String(idColValue)
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
      // Try each possible token column for this table.
      for (const tokenColumn of c.tokenColumns) {
        const { data, error } = await supabase
          .from(c.table)
          // We keep select('*') since we don't know schema; response is still limited to one row.
          .select('*')
          .eq(tokenColumn, token)
          .limit(1)
          .maybeSingle()

        if (error) {
          // If this table doesn't exist or column is missing, try next.
          const msg = String((error as any)?.message || error)
          if (
            /does not exist/i.test(msg) ||
            /relation .* does not exist/i.test(msg) ||
            /schema cache/i.test(msg) ||
            /column .* does not exist/i.test(msg) ||
            /could not find the .* column/i.test(msg)
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
      }
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

