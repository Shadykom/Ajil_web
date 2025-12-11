'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  FileText, 
  Scale, 
  AlertTriangle, 
  CreditCard,
  Shield,
  Clock,
  Ban,
  Phone
} from 'lucide-react'

const termsSections = [
  {
    icon: Scale,
    title: 'Acceptance of Terms',
    titleAr: 'قبول الشروط',
    content: `By accessing or using AJIL Finance services, website, or mobile applications, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

These terms constitute a legally binding agreement between you and AJIL Finance Company. We reserve the right to modify these terms at any time, and your continued use of our services after any changes constitutes acceptance of those changes.`,
    contentAr: `باستخدامك لخدمات عجل للتمويل أو الموقع الإلكتروني أو التطبيقات، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.

تشكل هذه الشروط اتفاقية ملزمة قانونياً بينك وبين شركة عجل للتمويل. نحتفظ بالحق في تعديل هذه الشروط في أي وقت، واستمرار استخدامك لخدماتنا بعد أي تغييرات يعني قبولك لتلك التغييرات.`,
  },
  {
    icon: CreditCard,
    title: 'Financing Services',
    titleAr: 'خدمات التمويل',
    content: `AJIL Finance provides Sharia-compliant financing solutions for individuals and businesses. All financing products are subject to:

• Credit approval based on eligibility criteria
• Verification of submitted documents and information
• Agreement to specific terms and conditions for each product
• Compliance with Saudi Arabian Monetary Authority (SAMA) regulations

Financing offers are valid for a limited time and may be withdrawn or modified without prior notice. Monthly payments and rates are calculated based on the approved financing amount and duration.`,
    contentAr: `تقدم شركة عجل للتمويل حلول تمويلية متوافقة مع الشريعة الإسلامية للأفراد والشركات. جميع المنتجات التمويلية تخضع لـ:

• الموافقة الائتمانية بناءً على معايير الأهلية
• التحقق من المستندات والمعلومات المقدمة
• الموافقة على الشروط والأحكام الخاصة بكل منتج
• الامتثال لأنظمة البنك المركزي السعودي

عروض التمويل صالحة لفترة محدودة وقد يتم سحبها أو تعديلها دون إشعار مسبق. يتم حساب الأقساط الشهرية والمعدلات بناءً على مبلغ التمويل المعتمد ومدته.`,
  },
  {
    icon: Clock,
    title: 'Payment Obligations',
    titleAr: 'التزامات السداد',
    content: `As a borrower, you agree to:

• Make all monthly payments on or before the due date
• Maintain sufficient funds in your designated payment account
• Notify AJIL immediately of any changes to your contact or banking information
• Pay any applicable late payment fees as specified in your financing agreement
• Maintain the financed asset (for car/equipment financing) in good condition

Failure to meet payment obligations may result in:
- Late payment charges
- Negative impact on your credit score
- Legal action to recover outstanding amounts
- Repossession of financed assets (where applicable)`,
    contentAr: `بصفتك مقترضاً، توافق على:

• سداد جميع الأقساط الشهرية في موعد استحقاقها أو قبله
• الحفاظ على رصيد كافٍ في حساب السداد المخصص
• إخطار عجل فوراً بأي تغييرات في بيانات الاتصال أو المعلومات البنكية
• دفع أي رسوم تأخير سداد كما هو محدد في عقد التمويل
• الحفاظ على الأصل الممول (للسيارات/المعدات) في حالة جيدة

قد يؤدي عدم الوفاء بالتزامات السداد إلى:
- رسوم التأخير في السداد
- تأثير سلبي على سجلك الائتماني
- إجراء قانوني لاسترداد المبالغ المستحقة
- استرداد الأصول الممولة (حيثما ينطبق ذلك)`,
  },
  {
    icon: Shield,
    title: 'User Responsibilities',
    titleAr: 'مسؤوليات المستخدم',
    content: `You are responsible for:

• Providing accurate and complete information in all applications
• Keeping your account credentials secure and confidential
• Notifying us immediately of any unauthorized account access
• Using our services only for lawful purposes
• Not attempting to interfere with or compromise our systems

Any fraudulent activity, misrepresentation, or violation of these terms may result in immediate termination of services and legal action.`,
    contentAr: `أنت مسؤول عن:

• تقديم معلومات دقيقة وكاملة في جميع الطلبات
• الحفاظ على سرية وأمان بيانات اعتماد حسابك
• إخطارنا فوراً بأي وصول غير مصرح به للحساب
• استخدام خدماتنا لأغراض قانونية فقط
• عدم محاولة التدخل في أنظمتنا أو اختراقها

قد يؤدي أي نشاط احتيالي أو تحريف أو انتهاك لهذه الشروط إلى إنهاء الخدمات فوراً واتخاذ إجراء قانوني.`,
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    titleAr: 'حدود المسؤولية',
    content: `AJIL Finance shall not be liable for:

• Indirect, incidental, or consequential damages
• Loss of profits, data, or business opportunities
• Damages resulting from circumstances beyond our control
• Service interruptions due to maintenance or technical issues
• Third-party actions or services

Our total liability for any claim shall not exceed the fees paid by you for the specific service giving rise to the claim. These limitations apply to the fullest extent permitted by applicable law.`,
    contentAr: `لن تكون شركة عجل للتمويل مسؤولة عن:

• الأضرار غير المباشرة أو العرضية أو التبعية
• خسارة الأرباح أو البيانات أو الفرص التجارية
• الأضرار الناتجة عن ظروف خارجة عن سيطرتنا
• انقطاع الخدمة بسبب الصيانة أو المشكلات التقنية
• تصرفات أو خدمات الأطراف الثالثة

لن تتجاوز مسؤوليتنا الإجمالية عن أي مطالبة الرسوم التي دفعتها مقابل الخدمة المحددة التي أدت إلى المطالبة. تنطبق هذه القيود إلى أقصى حد يسمح به القانون المعمول به.`,
  },
  {
    icon: Ban,
    title: 'Termination',
    titleAr: 'الإنهاء',
    content: `AJIL Finance may terminate or suspend your access to services:

• For violation of these Terms and Conditions
• For fraudulent or illegal activity
• Upon your request with all outstanding obligations settled
• As required by law or regulatory authorities

Upon termination:
- All outstanding amounts become immediately due
- Your access to online services will be revoked
- Any remaining obligations under financing agreements continue
- We may retain your information as required by law`,
    contentAr: `قد تقوم شركة عجل للتمويل بإنهاء أو تعليق وصولك إلى الخدمات:

• بسبب انتهاك هذه الشروط والأحكام
• بسبب نشاط احتيالي أو غير قانوني
• بناءً على طلبك مع تسوية جميع الالتزامات المستحقة
• كما يقتضيه القانون أو السلطات التنظيمية

عند الإنهاء:
- تصبح جميع المبالغ المستحقة مستحقة فوراً
- سيتم إلغاء وصولك إلى الخدمات عبر الإنترنت
- تستمر أي التزامات متبقية بموجب عقود التمويل
- قد نحتفظ بمعلوماتك كما يقتضيه القانون`,
  },
]

export default function TermsPage() {
  const { language, dir } = useI18n()

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Terms & Conditions"
        titleAr="الشروط والأحكام"
        subtitle="Please read these terms carefully before using our services"
        subtitleAr="يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا"
        badge="Legal Agreement"
        badgeAr="اتفاقية قانونية"
        BadgeIcon={FileText}
      />

      {/* Last Updated */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto">
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">{language === 'ar' ? 'تاريخ السريان:' : 'Effective Date:'}</span>{' '}
              {language === 'ar' ? '١ ديسمبر ٢٠٢٤' : 'December 1, 2024'}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">{language === 'ar' ? 'الإصدار:' : 'Version:'}</span> 3.0
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 lg:p-10"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">
                    {language === 'ar' ? 'إشعار مهم' : 'Important Notice'}
                  </h3>
                  <p className="text-amber-800">
                    {language === 'ar'
                      ? 'هذه الشروط والأحكام تحكم علاقتك مع شركة عجل للتمويل. باستخدام خدماتنا، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بهذه الشروط. إذا كان لديك أي أسئلة، يرجى التواصل مع خدمة العملاء قبل المتابعة.'
                      : 'These Terms and Conditions govern your relationship with AJIL Finance Company. By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you have any questions, please contact customer service before proceeding.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {termsSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-gray-100 p-8 lg:p-10 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                    <section.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-primary-600 mb-1 block">
                      {language === 'ar' ? `القسم ${index + 1}` : `Section ${index + 1}`}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {language === 'ar' ? section.titleAr : section.title}
                    </h3>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                  {language === 'ar' ? section.contentAr : section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-8 lg:p-12"
            >
              <div className="flex items-start gap-4">
                <Scale className="w-10 h-10 text-primary-600 shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {language === 'ar' ? 'القانون الحاكم' : 'Governing Law'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'ar'
                      ? 'تخضع هذه الشروط والأحكام وتفسر وفقاً لقوانين المملكة العربية السعودية. يتم حل أي نزاعات تنشأ عن هذه الشروط أو تتعلق بها من خلال المحاكم المختصة في المملكة العربية السعودية.'
                      : 'These Terms and Conditions are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any disputes arising out of or relating to these terms shall be resolved through the competent courts of Saudi Arabia.'}
                  </p>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'تخضع جميع خدمات التمويل لأنظمة ولوائح البنك المركزي السعودي (ساما).'
                      : 'All financing services are subject to the regulations and guidelines of the Saudi Central Bank (SAMA).'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <Phone className="w-16 h-16 mx-auto mb-6 text-secondary-400" />
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">
              {language === 'ar' ? 'هل لديك أسئلة؟' : 'Have Questions?'}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {language === 'ar'
                ? 'فريق خدمة العملاء لدينا متاح لمساعدتك في فهم شروطنا وأحكامنا'
                : 'Our customer service team is available to help you understand our terms and conditions'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:8002442211"
                className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold shadow-2xl hover:bg-gray-50 transition-all"
                dir="ltr"
              >
                <Phone className="w-5 h-5" />
                <span>800 244 2211</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
