'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  Shield, 
  Lock, 
  Eye, 
  Server,
  FileText,
  Users,
  Bell,
  Mail
} from 'lucide-react'

const privacySections = [
  {
    icon: FileText,
    title: 'Information We Collect',
    titleAr: 'المعلومات التي نجمعها',
    content: [
      'Personal identification information (Name, ID number, date of birth)',
      'Contact information (Email address, phone number, address)',
      'Financial information (Income, employment details, bank statements)',
      'Technical data (IP address, browser type, device information)',
    ],
    contentAr: [
      'معلومات التعريف الشخصية (الاسم، رقم الهوية، تاريخ الميلاد)',
      'معلومات الاتصال (البريد الإلكتروني، رقم الهاتف، العنوان)',
      'المعلومات المالية (الدخل، تفاصيل التوظيف، كشوفات البنك)',
      'البيانات التقنية (عنوان IP، نوع المتصفح، معلومات الجهاز)',
    ],
  },
  {
    icon: Server,
    title: 'How We Use Your Information',
    titleAr: 'كيف نستخدم معلوماتك',
    content: [
      'Process and evaluate financing applications',
      'Communicate with you about your account and services',
      'Comply with legal and regulatory requirements',
      'Improve our products, services, and customer experience',
      'Detect and prevent fraud and security threats',
    ],
    contentAr: [
      'معالجة وتقييم طلبات التمويل',
      'التواصل معك بشأن حسابك وخدماتنا',
      'الامتثال للمتطلبات القانونية والتنظيمية',
      'تحسين منتجاتنا وخدماتنا وتجربة العملاء',
      'كشف ومنع الاحتيال والتهديدات الأمنية',
    ],
  },
  {
    icon: Users,
    title: 'Information Sharing',
    titleAr: 'مشاركة المعلومات',
    content: [
      'We do not sell your personal information to third parties',
      'Information may be shared with credit bureaus for credit assessments',
      'Third-party service providers under strict confidentiality agreements',
      'Government and regulatory authorities when required by law',
    ],
    contentAr: [
      'لا نبيع معلوماتك الشخصية لأطراف ثالثة',
      'قد تتم مشاركة المعلومات مع مكاتب الائتمان لتقييم الائتمان',
      'مزودي الخدمات من الأطراف الثالثة بموجب اتفاقيات سرية صارمة',
      'السلطات الحكومية والتنظيمية عند الطلب بموجب القانون',
    ],
  },
  {
    icon: Lock,
    title: 'Data Security',
    titleAr: 'أمان البيانات',
    content: [
      'Industry-standard encryption for data transmission and storage',
      'Regular security audits and vulnerability assessments',
      'Access controls and employee training on data protection',
      'Secure data centers with physical and digital safeguards',
    ],
    contentAr: [
      'تشفير بمعايير الصناعة لنقل وتخزين البيانات',
      'عمليات تدقيق أمني منتظمة وتقييمات الثغرات',
      'ضوابط الوصول وتدريب الموظفين على حماية البيانات',
      'مراكز بيانات آمنة مع حماية مادية ورقمية',
    ],
  },
  {
    icon: Eye,
    title: 'Your Rights',
    titleAr: 'حقوقك',
    content: [
      'Right to access your personal data we hold',
      'Right to request correction of inaccurate information',
      'Right to request deletion of your data (subject to legal requirements)',
      'Right to withdraw consent for marketing communications',
      'Right to lodge a complaint with supervisory authorities',
    ],
    contentAr: [
      'الحق في الوصول إلى بياناتك الشخصية التي نحتفظ بها',
      'الحق في طلب تصحيح المعلومات غير الدقيقة',
      'الحق في طلب حذف بياناتك (وفقاً للمتطلبات القانونية)',
      'الحق في سحب الموافقة على الاتصالات التسويقية',
      'الحق في تقديم شكوى إلى السلطات الإشرافية',
    ],
  },
  {
    icon: Bell,
    title: 'Cookies & Tracking',
    titleAr: 'ملفات تعريف الارتباط والتتبع',
    content: [
      'Essential cookies for website functionality',
      'Analytics cookies to improve our services',
      'Marketing cookies for personalized content (with consent)',
      'You can manage cookie preferences in your browser settings',
    ],
    contentAr: [
      'ملفات تعريف الارتباط الأساسية لوظائف الموقع',
      'ملفات تعريف الارتباط التحليلية لتحسين خدماتنا',
      'ملفات تعريف الارتباط التسويقية للمحتوى المخصص (بموافقتك)',
      'يمكنك إدارة تفضيلات ملفات تعريف الارتباط في إعدادات المتصفح',
    ],
  },
]

export default function PrivacyPage() {
  const { language, dir } = useI18n()

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Privacy Policy"
        titleAr="سياسة الخصوصية"
        subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
        subtitleAr="خصوصيتك مهمة بالنسبة لنا. تعرف على كيفية جمع واستخدام وحماية معلوماتك."
        badge="Data Protection"
        badgeAr="حماية البيانات"
        BadgeIcon={Shield}
      />

      {/* Last Updated */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto">
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">{language === 'ar' ? 'آخر تحديث:' : 'Last Updated:'}</span>{' '}
              {language === 'ar' ? '١ ديسمبر ٢٠٢٤' : 'December 1, 2024'}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">{language === 'ar' ? 'الإصدار:' : 'Version:'}</span> 2.0
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-8 lg:p-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ar' ? 'مقدمة' : 'Introduction'}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {language === 'ar' ? (
                  <p>
                    شركة عجل للتمويل ("عجل" أو "نحن" أو "الشركة") ملتزمة بحماية خصوصية عملائنا وزوار موقعنا الإلكتروني. 
                    توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا ومشاركتنا لمعلوماتك الشخصية. 
                    باستخدام خدماتنا أو موقعنا الإلكتروني، فإنك توافق على الممارسات الموضحة في هذه السياسة.
                  </p>
                ) : (
                  <p>
                    AJIL Finance Company ("AJIL", "we", "us", or "the Company") is committed to protecting the privacy of our 
                    customers and website visitors. This Privacy Policy explains how we collect, use, protect, and share your 
                    personal information. By using our services or website, you agree to the practices described in this policy.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                    <section.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 pt-2">
                    {language === 'ar' ? section.titleAr : section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(language === 'ar' ? section.contentAr : section.content).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-amber-50 border border-amber-200 rounded-3xl p-8 lg:p-10"
            >
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                {language === 'ar' ? 'خصوصية الأطفال' : "Children's Privacy"}
              </h3>
              <p className="text-amber-800">
                {language === 'ar'
                  ? 'خدماتنا غير موجهة للأفراد دون سن 18 عاماً. نحن لا نجمع معلومات شخصية من القاصرين عن قصد. إذا علمنا أننا جمعنا معلومات من قاصر، سنتخذ خطوات لحذف تلك المعلومات على الفور.'
                  : 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have collected information from a minor, we will take steps to delete that information promptly.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Policy Changes */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'تغييرات السياسة' : 'Policy Changes'}
              </h3>
              <p className="text-gray-600 mb-8">
                {language === 'ar'
                  ? 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار بارز على موقعنا. ننصحك بمراجعة هذه السياسة بشكل دوري.'
                  : 'We may update this Privacy Policy from time to time. We will notify you of any material changes via email or a prominent notice on our website. We encourage you to review this policy periodically.'}
              </p>
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
            <Mail className="w-16 h-16 mx-auto mb-6 text-secondary-400" />
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">
              {language === 'ar' ? 'أسئلة حول الخصوصية؟' : 'Privacy Questions?'}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {language === 'ar'
                ? 'إذا كانت لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية الخاصة بنا، يرجى التواصل معنا'
                : 'If you have any questions or concerns about our privacy policy, please contact us'}
            </p>
            <a
              href="mailto:privacy@ajil.com"
              className="inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
            >
              <Mail className="w-6 h-6" />
              <span>privacy@ajil.com</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
