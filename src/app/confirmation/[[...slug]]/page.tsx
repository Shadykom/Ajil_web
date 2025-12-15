'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'
import { AShapeSection, AShapeCard, AJIL_BLUE } from '@/components/shared/PageStyles'
import { useI18n } from '@/lib/i18n'
import { CheckCircle2, FileText, Home, Info, ShieldCheck } from 'lucide-react'

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

  const reference =
    sp.reference ||
    sp.ref ||
    sp.id ||
    sp.token ||
    sp.contractId ||
    sp.licenseId ||
    (slug.length ? slug.join('/') : '')

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
                  <CheckCircle2 className="w-7 h-7" style={{ color: AJIL_BLUE }} />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
                    {language === 'ar' ? 'تم فتح صفحة التأكيد بنجاح' : 'Confirmation page opened'}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'ar'
                      ? 'إذا كنت تمسح رمز QR من عقد أو ترخيص، يجب أن ترى هنا بيانات المرجع. إذا لم تظهر البيانات، فقد يكون الرابط غير مكتمل أو تم نسخه بشكل خاطئ.'
                      : 'If you scanned a QR from a contract or license, you should see a reference below. If not, the QR link may be incomplete or copied incorrectly.'}
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

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 text-amber-700" />
                    <p className="text-sm text-amber-900 leading-relaxed">
                      {language === 'ar'
                        ? 'ملاحظة: هذه الصفحة تمنع خطأ 404 عند مسح رموز QR. إذا كان المطلوب هو “تحقق فعلي” من العقد/الترخيص (مثلاً عبر رقم عقد أو رمز تحقق)، يلزم ربط هذه الصفحة بقاعدة البيانات/النظام المصدر الذي يصدر العقود.'
                        : 'Note: This page prevents 404s when scanning QR codes. If you need real verification (e.g., validate a contract/license by ID or token), we’ll need to connect this page to the system that issues those documents.'}
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

