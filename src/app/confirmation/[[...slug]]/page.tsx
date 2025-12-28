'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'
import { AShapeSection, AShapeCard, AJIL_BLUE } from '@/components/shared/PageStyles'
import { useI18n } from '@/lib/i18n'
import { normalizeVerificationToken } from '@/lib/verification'
import { AlertTriangle, CheckCircle2, Clock, FileText, Home, Info, ShieldAlert, ShieldCheck } from 'lucide-react'

type ConfirmationPageProps = {
  params?: { slug?: string[] }
  searchParams?: Record<string, string | string[] | undefined>
}

function normalizeSearchParams(
  searchParams: ConfirmationPageProps['searchParams']
): Record<string, string> {
  const out: Record<string, string> = {}
  if (!searchParams) return out

  for (const [k, v] of Object.entries(searchParams)) {
    if (typeof v === 'string') out[k] = v
    else if (Array.isArray(v) && typeof v[0] === 'string') out[k] = v[0]
  }
  return out
}

export default function ConfirmationPage({ params, searchParams }: ConfirmationPageProps) {
  const { language, dir } = useI18n()

  const slug = params?.slug?.filter(Boolean) ?? []
  const sp = useMemo(() => normalizeSearchParams(searchParams), [searchParams])

  const rawReference =
    sp.token ||
    sp.t ||
    sp.reference ||
    sp.ref ||
    sp.id ||
    sp.contractId ||
    sp.licenseId ||
    (slug.length ? slug.join('/') : '')

  const reference = useMemo(() => normalizeVerificationToken(rawReference), [rawReference])

  const docType = (sp.type || sp.doc || (slug[0] ?? '')).toLowerCase()
  const docTypeLabel =
    docType === 'contract'
      ? language === 'ar'
        ? 'عقد'
        : 'Contract'
      : docType === 'license' || docType === 'licence'
        ? language === 'ar'
          ? 'ترخيص'
          : 'License'
        : language === 'ar'
          ? 'مستند'
          : 'Document'

  const [loading, setLoading] = useState(false)
  const [verify, setVerify] = useState<{
    ok: boolean
    status: 'approved' | 'pending' | 'revoked' | 'expired' | 'invalid' | 'error'
    reason?: string
    message?: string
    reference?: string
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!reference) {
        setVerify({
          ok: false,
          status: 'invalid',
          reason: 'missing_token',
        })
        return
      }

      setLoading(true)
      try {
        const res = await fetch(`/api/verify?token=${encodeURIComponent(reference)}`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })
        const json = (await res.json()) as any
        if (!cancelled) setVerify(json)
      } catch (e) {
        if (!cancelled) {
          setVerify({
            ok: false,
            status: 'error',
            reason: 'network_or_server_error',
            message: e instanceof Error ? e.message : 'Unknown error',
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [reference])

  const status = verify?.status
  const isApproved = status === 'approved'
  const StatusIcon = isApproved ? CheckCircle2 : status === 'pending' ? Clock : ShieldAlert

  return (
    <main className="min-h-screen" dir={dir}>
      <PageHero
        title="Confirmation"
        titleAr="صفحة التأكيد"
        subtitle="This page opens from QR codes on contracts and licenses."
        subtitleAr="هذه الصفحة تُفتح من رموز QR الموجودة على العقود والتراخيص."
        badge="Verification"
        badgeAr="التحقق"
        BadgeIcon={ShieldCheck}
      />

      <AShapeSection background="white" className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <AShapeCard className="p-6 md:p-8" hover={false}>
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 rounded-2xl p-3"
                  style={{ backgroundColor: `${AJIL_BLUE}0D` }}
                >
                  <StatusIcon className="w-7 h-7" style={{ color: AJIL_BLUE }} />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
                    {loading
                      ? language === 'ar'
                        ? 'جارٍ التحقق...'
                        : 'Verifying...'
                      : isApproved
                        ? language === 'ar'
                          ? 'تم التحقق: صالح'
                          : 'Verified: valid'
                        : language === 'ar'
                          ? 'تعذر التحقق'
                          : 'Verification failed'}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'ar'
                      ? 'امسح رمز QR مرة أخرى إذا كانت الكاميرا/التطبيق يغير الرابط. هذه الصفحة تتحقق من حالة الترخيص/المستند بناءً على الرمز.'
                      : 'Re-scan if the scanner app alters the URL. This page verifies the license/document status based on the token.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <FileText className="w-4 h-4" />
                    <span>
                      {language === 'ar' ? 'نوع المستند' : 'Document type'}: {docTypeLabel}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 break-words">
                    <span className="font-semibold text-gray-800">
                      {language === 'ar' ? 'المرجع' : 'Reference'}:{' '}
                    </span>
                    {reference ? (
                      <span className="font-mono">{reference}</span>
                    ) : (
                      <span className="italic">
                        {language === 'ar' ? 'غير متوفر' : 'Not provided'}
                      </span>
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 text-blue-700" />
                      <p className="text-sm text-blue-900 leading-relaxed">
                        {language === 'ar'
                          ? 'جارٍ التحقق من حالة الترخيص...'
                          : 'Checking license status...'}
                      </p>
                    </div>
                  </div>
                ) : isApproved ? (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700" />
                      <p className="text-sm text-emerald-900 leading-relaxed">
                        {language === 'ar'
                          ? 'الترخيص/المستند صالح.'
                          : 'This license/document is valid.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-700" />
                      <div className="text-sm text-amber-900 leading-relaxed">
                        <p className="font-bold mb-2">
                          {language === 'ar' ? 'أسباب محتملة:' : 'Possible reasons:'}
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            {language === 'ar'
                              ? 'الرابط/الرمز غير صحيح أو تم تغييره أثناء المسح.'
                              : 'Incorrect QR code or token (scanner altered the URL).'}
                          </li>
                          <li>
                            {language === 'ar'
                              ? 'الرابط انتهت صلاحيته (Expired).'
                              : 'Invalid or expired verification link.'}
                          </li>
                          <li>
                            {language === 'ar'
                              ? 'الترخيص لم تتم الموافقة عليه بعد (Pending).'
                              : 'License not yet approved.'}
                          </li>
                          <li>
                            {language === 'ar'
                              ? 'الترخيص تم سحبه أو تعليقه (Revoked/Suspended).'
                              : 'License has been revoked or suspended.'}
                          </li>
                        </ul>
                        {verify?.reason ? (
                          <p className="mt-3 text-xs text-amber-800">
                            {language === 'ar' ? 'تفاصيل فنية: ' : 'Technical detail: '}
                            <span className="font-mono">{verify.reason}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 text-gray-600" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {language === 'ar'
                        ? 'إذا كانت الحالة “خطأ” فغالباً يلزم ضبط إعدادات التحقق (جدول/أعمدة قاعدة البيانات) أو توفير مفتاح خدمة Supabase على الخادم.'
                        : 'If the status shows “error”, verification likely needs configuration (table/columns) or a Supabase service role key on the server.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: AJIL_BLUE }}
                >
                  <Home className="w-5 h-5" />
                  <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to home'}</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold border-2 border-gray-200 text-gray-900 hover:bg-gray-50 transition-all"
                >
                  <span>{language === 'ar' ? 'تواصل معنا' : 'Contact support'}</span>
                </Link>
              </div>
            </AShapeCard>

            <motion.div
              className="text-center text-sm text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {language === 'ar'
                ? 'إذا استمر ظهور 404 بعد هذا التغيير، فالرابط داخل رمز QR قد يشير إلى مسار مختلف تماماً.'
                : 'If you still get a 404 after this change, the QR likely points to a different path entirely.'}
            </motion.div>
          </div>
        </div>
      </AShapeSection>
    </main>
  )
}

