'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { 
  Newspaper, 
  Calendar,
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Tag
} from 'lucide-react'
import { AjilSymbol } from '@/components/icons'

const newsItems = [
  {
    id: 1,
    title: 'AJIL Launches New Digital Financing Platform',
    titleAr: 'أجيل تطلق منصة تمويل رقمية جديدة',
    excerpt: 'Experience faster approvals and seamless applications with our new digital platform.',
    excerptAr: 'استمتع بموافقات أسرع وتقديم سلس مع منصتنا الرقمية الجديدة.',
    date: '2024-12-01',
    category: 'Technology',
    categoryAr: 'تكنولوجيا',
    image: '/images/news/digital-platform.jpg',
  },
  {
    id: 2,
    title: 'AJIL Partners with Major Auto Dealers',
    titleAr: 'أجيل تشارك مع كبار وكلاء السيارات',
    excerpt: 'New partnerships bring exclusive financing offers to customers.',
    excerptAr: 'شراكات جديدة تقدم عروض تمويل حصرية للعملاء.',
    date: '2024-11-15',
    category: 'Partnership',
    categoryAr: 'شراكات',
    image: '/images/news/partnership.jpg',
  },
  {
    id: 3,
    title: 'Special Ramadan Financing Offers',
    titleAr: 'عروض تمويل رمضان الخاصة',
    excerpt: 'Enjoy reduced rates and flexible terms during the holy month.',
    excerptAr: 'استمتع بأسعار مخفضة وشروط مرنة خلال الشهر الفضيل.',
    date: '2024-11-01',
    category: 'Offers',
    categoryAr: 'عروض',
    image: '/images/news/ramadan.jpg',
  },
  {
    id: 4,
    title: 'AJIL Receives Excellence Award',
    titleAr: 'أجيل تحصل على جائزة التميز',
    excerpt: 'Recognized for outstanding customer service in the financing sector.',
    excerptAr: 'تم الاعتراف بها لخدمة العملاء المتميزة في قطاع التمويل.',
    date: '2024-10-20',
    category: 'Awards',
    categoryAr: 'جوائز',
    image: '/images/news/award.jpg',
  },
  {
    id: 5,
    title: 'New Branch Opening in Jeddah',
    titleAr: 'افتتاح فرع جديد في جدة',
    excerpt: 'Expanding our presence to serve customers in the Western Region.',
    excerptAr: 'توسيع تواجدنا لخدمة العملاء في المنطقة الغربية.',
    date: '2024-10-05',
    category: 'Expansion',
    categoryAr: 'توسع',
    image: '/images/news/branch.jpg',
  },
  {
    id: 6,
    title: 'AJIL Supports Vision 2030 Initiatives',
    titleAr: 'أجيل تدعم مبادرات رؤية 2030',
    excerpt: 'Contributing to Saudi Arabia economic transformation goals.',
    excerptAr: 'المساهمة في أهداف التحول الاقتصادي للمملكة.',
    date: '2024-09-15',
    category: 'Corporate',
    categoryAr: 'شركات',
    image: '/images/news/vision2030.jpg',
  },
]

const categories = [
  { en: 'All', ar: 'الكل' },
  { en: 'Technology', ar: 'تكنولوجيا' },
  { en: 'Partnership', ar: 'شراكات' },
  { en: 'Offers', ar: 'عروض' },
  { en: 'Awards', ar: 'جوائز' },
  { en: 'Corporate', ar: 'شركات' },
]

export default function NewsPage() {
  const { language, dir } = useI18n()
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronRight

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return language === 'ar'
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="News & Updates"
        titleAr="الأخبار والتحديثات"
        subtitle="Stay updated with the latest news from AJIL Finance"
        subtitleAr="ابق على اطلاع بآخر أخبار أجيل للتمويل"
        badge="Latest News"
        badgeAr="آخر الأخبار"
        BadgeIcon={Newspaper}
      />

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  index === 0
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                {language === 'ar' ? category.ar : category.en}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              {/* Content */}
              <div className="p-12 text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                  <Tag className="w-4 h-4" />
                  <span>{language === 'ar' ? newsItems[0].categoryAr : newsItems[0].category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {language === 'ar' ? newsItems[0].titleAr : newsItems[0].title}
                </h2>
                <p className="text-white/70 text-lg mb-6">
                  {language === 'ar' ? newsItems[0].excerptAr : newsItems[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <Calendar className="w-5 h-5 text-white/60" />
                  <span className="text-white/60">{formatDate(newsItems[0].date)}</span>
                </div>
                <button className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
                  <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                  <ArrowIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Image Placeholder */}
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <div className="text-white/20">
                  <AjilSymbol size={200} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {language === 'ar' ? 'المزيد من الأخبار' : 'More News'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.slice(1).map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-primary-300 group-hover:text-primary-400 transition-colors">
                    <AjilSymbol size={80} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold">
                      {language === 'ar' ? item.categoryAr : item.category}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.date)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {language === 'ar' ? item.titleAr : item.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-4 line-clamp-2">
                    {language === 'ar' ? item.excerptAr : item.excerpt}
                  </p>
                  
                  <button className="inline-flex items-center gap-1 text-primary-600 font-semibold group-hover:gap-2 transition-all">
                    <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                    <ChevronIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all">
              <span>{language === 'ar' ? 'تحميل المزيد' : 'Load More'}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
            className="text-center text-white max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-extrabold mb-6">
              {language === 'ar' ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {language === 'ar'
                ? 'احصل على آخر الأخبار والعروض مباشرة في بريدك الإلكتروني'
                : 'Get the latest news and offers delivered to your inbox'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                className="px-6 py-4 rounded-xl text-gray-900 w-full sm:w-80 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="px-8 py-4 bg-secondary-500 text-white rounded-xl font-bold hover:bg-secondary-600 transition-all">
                {language === 'ar' ? 'اشتراك' : 'Subscribe'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
