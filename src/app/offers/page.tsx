'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Gift, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Star,
  Percent,
  BadgeCheck
} from 'lucide-react'
import { AjilSymbol } from '@/components/icons'

const offers = [
  {
    id: 1,
    title: 'Winter Special: 0% Processing Fee',
    titleAr: 'عرض الشتاء: 0% رسوم معالجة',
    desc: 'Apply for car financing this winter and pay zero processing fees',
    descAr: 'قدم على تمويل السيارات هذا الشتاء واستمتع برسوم معالجة صفر',
    discount: '0%',
    discountLabel: 'Processing Fee',
    discountLabelAr: 'رسوم المعالجة',
    validUntil: '2025-01-31',
    category: 'Car Financing',
    categoryAr: 'تمويل السيارات',
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Personal Financing: Reduced APR',
    titleAr: 'التمويل الشخصي: معدل مخفض',
    desc: 'Get personal financing with reduced annual percentage rate',
    descAr: 'احصل على تمويل شخصي بمعدل نسبة سنوية مخفض',
    discount: '3.99%',
    discountLabel: 'Starting APR',
    discountLabelAr: 'تبدأ من',
    validUntil: '2025-02-28',
    category: 'Personal Financing',
    categoryAr: 'التمويل الشخصي',
    featured: true,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 3,
    title: 'Business Growth Special',
    titleAr: 'عرض نمو الأعمال الخاص',
    desc: 'Exclusive rates for business expansion financing',
    descAr: 'أسعار حصرية لتمويل توسع الأعمال',
    discount: '15%',
    discountLabel: 'Off Processing',
    discountLabelAr: 'خصم على الرسوم',
    validUntil: '2025-03-31',
    category: 'Business',
    categoryAr: 'الأعمال',
    featured: false,
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    id: 4,
    title: 'First-Time Customer Bonus',
    titleAr: 'مكافأة العميل الجديد',
    desc: 'Special benefits for new AJIL customers',
    descAr: 'مزايا خاصة لعملاء أجيل الجدد',
    discount: '25%',
    discountLabel: 'Fee Discount',
    discountLabelAr: 'خصم على الرسوم',
    validUntil: '2025-12-31',
    category: 'All Products',
    categoryAr: 'جميع المنتجات',
    featured: false,
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 5,
    title: 'Salary Transfer Benefit',
    titleAr: 'ميزة تحويل الراتب',
    desc: 'Better rates when you transfer your salary to our partner banks',
    descAr: 'أسعار أفضل عند تحويل راتبك إلى بنوكنا الشريكة',
    discount: '0.5%',
    discountLabel: 'Lower Rate',
    discountLabelAr: 'سعر أقل',
    validUntil: '2025-06-30',
    category: 'Car Financing',
    categoryAr: 'تمويل السيارات',
    featured: false,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 6,
    title: 'Fleet Financing Deal',
    titleAr: 'صفقة تمويل الأسطول',
    desc: 'Special rates for businesses financing 5+ vehicles',
    descAr: 'أسعار خاصة للشركات التي تمول 5+ مركبات',
    discount: '20%',
    discountLabel: 'Volume Discount',
    discountLabelAr: 'خصم الكمية',
    validUntil: '2025-04-30',
    category: 'Business',
    categoryAr: 'الأعمال',
    featured: false,
    gradient: 'from-teal-500 to-cyan-500',
  },
]

export default function OffersPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return language === 'ar'
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const featuredOffers = offers.filter(o => o.featured)
  const regularOffers = offers.filter(o => !o.featured)

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Special Offers"
        titleAr="العروض الخاصة"
        subtitle="Exclusive financing deals and promotions just for you"
        subtitleAr="صفقات تمويلية حصرية وعروض ترويجية خاصة بك"
        badge="Limited Time"
        badgeAr="لفترة محدودة"
        BadgeIcon={Gift}
      />

      {/* Featured Offers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              <span>{language === 'ar' ? 'العروض المميزة' : 'Featured Offers'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              {language === 'ar' ? 'أفضل العروض لك' : 'Best Deals for You'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-primary-300 hover:shadow-2xl transition-all duration-300"
              >
                {/* Top Gradient */}
                <div className={`h-2 bg-gradient-to-r ${offer.gradient}`} />
                
                {/* Featured Badge */}
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-1 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>{language === 'ar' ? 'مميز' : 'Featured'}</span>
                  </div>
                </div>

                <div className="p-8">
                  {/* Category */}
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-4">
                    {language === 'ar' ? offer.categoryAr : offer.category}
                  </div>

                  {/* Discount Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${offer.gradient} rounded-2xl flex flex-col items-center justify-center text-white`}>
                      <div className="text-3xl font-black">{offer.discount}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {language === 'ar' ? offer.discountLabelAr : offer.discountLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {language === 'ar' ? offer.titleAr : offer.title}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {language === 'ar' ? offer.descAr : offer.desc}
                  </p>

                  {/* Validity */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Clock className="w-4 h-4" />
                    <span>
                      {language === 'ar' ? 'صالح حتى: ' : 'Valid until: '}
                      {formatDate(offer.validUntil)}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/apply"
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${offer.gradient} text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all`}
                  >
                    <span>{language === 'ar' ? 'احصل على العرض' : 'Get This Offer'}</span>
                    <ArrowIcon className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Offers */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">
              {language === 'ar' ? 'المزيد من العروض' : 'More Offers'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Top Gradient */}
                <div className={`h-1.5 bg-gradient-to-r ${offer.gradient}`} />
                
                <div className="p-6">
                  {/* Category */}
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-4">
                    {language === 'ar' ? offer.categoryAr : offer.category}
                  </div>

                  {/* Discount */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${offer.gradient} rounded-xl flex items-center justify-center text-white`}>
                      <div className="text-xl font-black">{offer.discount}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {language === 'ar' ? offer.discountLabelAr : offer.discountLabel}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {language === 'ar' ? offer.titleAr : offer.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {language === 'ar' ? offer.descAr : offer.desc}
                  </p>

                  {/* Validity */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(offer.validUntil)}</span>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-1 text-primary-600 font-semibold text-sm group-hover:gap-2 transition-all"
                  >
                    <span>{language === 'ar' ? 'تعرف على المزيد' : 'Learn More'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Note */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500">
              {language === 'ar'
                ? '* تطبق الشروط والأحكام. العروض قابلة للتغيير دون إشعار مسبق. الأهلية تخضع لتقييم الائتمان.'
                : '* Terms and conditions apply. Offers are subject to change without prior notice. Eligibility is subject to credit assessment.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-500 to-orange-500 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              {language === 'ar' ? 'لا تفوت العروض!' : "Don't Miss Out!"}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'قدم طلبك الآن واستفد من هذه العروض الحصرية'
                : 'Apply now and take advantage of these exclusive offers'}
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-white text-secondary-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
            >
              <span>{language === 'ar' ? 'قدم طلبك الآن' : 'Apply Now'}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
