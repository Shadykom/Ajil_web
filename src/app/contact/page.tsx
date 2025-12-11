'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageHero } from '@/components/shared'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react'
import { AjilSymbol } from '@/components/icons'

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    titleAr: 'اتصل بنا',
    value: '800 244 2211',
    valueAr: '800 244 2211',
    desc: 'Toll-free 24/7 support',
    descAr: 'دعم مجاني على مدار الساعة',
    href: 'tel:8002442211',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    titleAr: 'راسلنا',
    value: 'info@ajil.com',
    valueAr: 'info@ajil.com',
    desc: 'We reply within 24 hours',
    descAr: 'نرد خلال 24 ساعة',
    href: 'mailto:info@ajil.com',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    titleAr: 'زرنا',
    value: 'Riyadh, Saudi Arabia',
    valueAr: 'الرياض، المملكة العربية السعودية',
    desc: 'Our headquarters location',
    descAr: 'موقع مقرنا الرئيسي',
    href: '#',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    titleAr: 'ساعات العمل',
    value: 'Sun - Thu: 8AM - 5PM',
    valueAr: 'الأحد - الخميس: 8ص - 5م',
    desc: 'Branch hours may vary',
    descAr: 'قد تختلف ساعات الفروع',
    href: '#',
    color: 'bg-amber-100 text-amber-600',
  },
]

const branches = [
  { city: 'Riyadh', cityAr: 'الرياض', branches: 8 },
  { city: 'Jeddah', cityAr: 'جدة', branches: 5 },
  { city: 'Dammam', cityAr: 'الدمام', branches: 4 },
  { city: 'Makkah', cityAr: 'مكة المكرمة', branches: 3 },
  { city: 'Madinah', cityAr: 'المدينة المنورة', branches: 2 },
  { city: 'Khobar', cityAr: 'الخبر', branches: 2 },
]

export default function ContactPage() {
  const { language, dir } = useI18n()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <PageHero
        title="Contact Us"
        titleAr="تواصل معنا"
        subtitle="We're here to help you with all your financing needs"
        subtitleAr="نحن هنا لمساعدتك في جميع احتياجاتك التمويلية"
        badge="Get in Touch"
        badgeAr="تواصل معنا"
        BadgeIcon={MessageSquare}
      />

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block p-8 bg-white rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'ar' ? info.titleAr : info.title}
                </h3>
                <div className="text-xl font-semibold text-primary-600 mb-2" dir={info.icon === Phone ? 'ltr' : undefined}>
                  {language === 'ar' ? info.valueAr : info.value}
                </div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? info.descAr : info.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <AjilSymbol size={16} />
                <span>{language === 'ar' ? 'أرسل رسالة' : 'Send a Message'}</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {language === 'ar' ? 'نحن نحب أن نسمع منك' : "We'd Love to Hear From You"}
              </h2>
              
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {language === 'ar' ? 'تم إرسال رسالتك!' : 'Message Sent!'}
                  </h3>
                  <p className="text-green-600">
                    {language === 'ar'
                      ? 'سنتواصل معك قريباً'
                      : "We'll get back to you soon"}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'الاسم' : 'Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'رقم الجوال' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        placeholder={language === 'ar' ? 'أدخل رقم جوالك' : 'Enter your phone'}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'الموضوع' : 'Subject'}
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      >
                        <option value="">{language === 'ar' ? 'اختر الموضوع' : 'Select subject'}</option>
                        <option value="financing">{language === 'ar' ? 'استفسار تمويل' : 'Financing Inquiry'}</option>
                        <option value="support">{language === 'ar' ? 'دعم فني' : 'Technical Support'}</option>
                        <option value="complaint">{language === 'ar' ? 'شكوى' : 'Complaint'}</option>
                        <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'ar' ? 'الرسالة' : 'Message'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all resize-none"
                      placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
                  >
                    <Send className="w-5 h-5" />
                    <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map Placeholder & Branches */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl h-64 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                  <p className="text-primary-600 font-semibold">
                    {language === 'ar' ? 'الخريطة التفاعلية' : 'Interactive Map'}
                  </p>
                </div>
              </div>

              {/* Branch Locations */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'مواقع الفروع' : 'Branch Locations'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {branches.map((branch, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">
                        {language === 'ar' ? branch.cityAr : branch.city}
                      </span>
                      <span className="text-sm text-primary-600 font-semibold">
                        {branch.branches} {language === 'ar' ? 'فروع' : 'branches'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
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
              {language === 'ar' ? 'هل تحتاج مساعدة فورية؟' : 'Need Immediate Help?'}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {language === 'ar'
                ? 'فريق خدمة العملاء متاح على مدار الساعة'
                : 'Our customer service team is available 24/7'}
            </p>
            <a
              href="tel:8002442211"
              className="inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all"
              dir="ltr"
            >
              <Phone className="w-6 h-6" />
              <span>800 244 2211</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
