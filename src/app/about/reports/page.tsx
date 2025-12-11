'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  FileText, 
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react'
import { AjilSymbol } from '@/components/icons'

const annualReports = [
  {
    year: '2023',
    title: 'Annual Report 2023',
    titleAr: 'التقرير السنوي 2023',
    size: '4.2 MB',
    type: 'PDF',
  },
  {
    year: '2022',
    title: 'Annual Report 2022',
    titleAr: 'التقرير السنوي 2022',
    size: '3.8 MB',
    type: 'PDF',
  },
  {
    year: '2021',
    title: 'Annual Report 2021',
    titleAr: 'التقرير السنوي 2021',
    size: '3.5 MB',
    type: 'PDF',
  },
  {
    year: '2020',
    title: 'Annual Report 2020',
    titleAr: 'التقرير السنوي 2020',
    size: '3.2 MB',
    type: 'PDF',
  },
]

const quarterlyReports = [
  {
    quarter: 'Q3 2024',
    quarterAr: 'الربع الثالث 2024',
    title: 'Q3 2024 Financial Results',
    titleAr: 'النتائج المالية للربع الثالث 2024',
    size: '1.5 MB',
    type: 'PDF',
  },
  {
    quarter: 'Q2 2024',
    quarterAr: 'الربع الثاني 2024',
    title: 'Q2 2024 Financial Results',
    titleAr: 'النتائج المالية للربع الثاني 2024',
    size: '1.4 MB',
    type: 'PDF',
  },
  {
    quarter: 'Q1 2024',
    quarterAr: 'الربع الأول 2024',
    title: 'Q1 2024 Financial Results',
    titleAr: 'النتائج المالية للربع الأول 2024',
    size: '1.3 MB',
    type: 'PDF',
  },
  {
    quarter: 'Q4 2023',
    quarterAr: 'الربع الرابع 2023',
    title: 'Q4 2023 Financial Results',
    titleAr: 'النتائج المالية للربع الرابع 2023',
    size: '1.4 MB',
    type: 'PDF',
  },
]

const highlights = [
  {
    icon: TrendingUp,
    value: '25%',
    label: 'Revenue Growth',
    labelAr: 'نمو الإيرادات',
    color: 'text-green-600 bg-green-100',
  },
  {
    icon: BarChart3,
    value: '18%',
    label: 'Portfolio Growth',
    labelAr: 'نمو المحفظة',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: PieChart,
    value: '2.1%',
    label: 'NPL Ratio',
    labelAr: 'نسبة التعثر',
    color: 'text-amber-600 bg-amber-100',
  },
]

export default function ReportsPage() {
  const { language, dir } = useI18n()

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Financial Reports"
        titleAr="التقارير المالية"
        subtitle="Transparency and accountability in our financial performance"
        subtitleAr="الشفافية والمسؤولية في أدائنا المالي"
        badge="Investor Relations"
        badgeAr="علاقات المستثمرين"
        BadgeIcon={FileText}
      />

      {/* Key Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AjilSymbol size={16} />
              <span>{language === 'ar' ? 'أبرز النتائج' : 'Key Highlights'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {language === 'ar' ? 'أداء 2024' : '2024 Performance'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-3xl border border-gray-100 shadow-lg"
              >
                <div className={`w-16 h-16 mx-auto mb-4 ${item.color} rounded-2xl flex items-center justify-center`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">{item.value}</div>
                <div className="text-gray-500 font-medium">
                  {language === 'ar' ? item.labelAr : item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'التقارير السنوية' : 'Annual Reports'}
            </h2>
            <p className="text-gray-500">
              {language === 'ar'
                ? 'تقاريرنا السنوية الشاملة عن الأداء المالي والعمليات'
                : 'Our comprehensive annual reports on financial performance and operations'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {annualReports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary-100 group-hover:bg-primary-500 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <FileText className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{report.year}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'ar' ? report.titleAr : report.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                
                {/* Download Button */}
                <button className="w-12 h-12 bg-gray-100 group-hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Download className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quarterly Reports */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'التقارير الربعية' : 'Quarterly Reports'}
            </h2>
            <p className="text-gray-500">
              {language === 'ar'
                ? 'تحديثات الأداء المالي الربعية'
                : 'Quarterly financial performance updates'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {quarterlyReports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-secondary-200 hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-secondary-100 group-hover:bg-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <BarChart3 className="w-8 h-8 text-secondary-600 group-hover:text-white transition-colors" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="text-lg font-bold text-secondary-600 mb-1">
                    {language === 'ar' ? report.quarterAr : report.quarter}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {language === 'ar' ? report.titleAr : report.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                
                {/* Download Button */}
                <button className="w-12 h-12 bg-white group-hover:bg-secondary-500 rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-secondary-500 transition-all duration-300">
                  <Download className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'إخلاء المسؤولية' : 'Disclaimer'}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {language === 'ar'
                ? 'المعلومات الواردة في هذه التقارير هي للأغراض الإعلامية فقط ولا تشكل نصيحة استثمارية. يجب على المستثمرين إجراء تحليلهم الخاص والتشاور مع المستشارين الماليين المرخصين قبل اتخاذ أي قرارات استثمارية. الأداء السابق لا يضمن النتائج المستقبلية.'
                : 'The information contained in these reports is for informational purposes only and does not constitute investment advice. Investors should conduct their own analysis and consult with licensed financial advisors before making any investment decisions. Past performance does not guarantee future results.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact IR */}
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
            className="text-center text-white"
          >
            <h2 className="text-4xl font-extrabold mb-6">
              {language === 'ar' ? 'علاقات المستثمرين' : 'Investor Relations'}
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'للاستفسارات المتعلقة بعلاقات المستثمرين، يرجى التواصل معنا'
                : 'For investor relations inquiries, please contact us'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:ir@ajil.com"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all"
              >
                <span>ir@ajil.com</span>
              </a>
              <a
                href="tel:+966112345678"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                dir="ltr"
              >
                <span>+966 11 234 5678</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
