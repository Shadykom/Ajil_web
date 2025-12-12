'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  Phone, 
  Mail, 
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUp,
  ChevronRight,
  ChevronLeft,
  Send,
  Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_BLUE_LIGHT = '#0066b3'
const AJIL_GOLD = '#F7941D'

// Mini A Shape Component
function MiniAShape({ size = 24, color = AJIL_GOLD, strokeWidth = 3 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 60 L68 60"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}

// Large A Shape for background
function LargeAShape({ size = 200, opacity = 0.05 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
      <path
        d="M10 90 L50 10 L90 90"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 65 L75 65"
        fill="none"
        stroke={AJIL_GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  )
}

// Animated floating A
function FloatingA({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 5, 0],
        opacity: [0.03, 0.06, 0.03]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay,
        ease: 'easeInOut'
      }}
    >
      <MiniAShape size={40} color="white" strokeWidth={1} />
    </motion.div>
  )
}

const footerLinks = {
  individuals: [
    { key: 'car_financing', labelAr: 'تمويل السيارات', labelEn: 'Car Financing', href: '/individuals/car-financing' },
    { key: 'personal_financing', labelAr: 'التمويل الشخصي', labelEn: 'Personal Financing', href: '/individuals/personal-financing' },
    { key: 'financing_rates', labelAr: 'معدلات التمويل', labelEn: 'Financing Rates', href: '/individuals/rates' },
  ],
  business: [
    { key: 'cash_financing', labelAr: 'التمويل النقدي', labelEn: 'Cash Financing', href: '/business/cash-financing' },
    { key: 'car_financing', labelAr: 'تمويل السيارات', labelEn: 'Car Financing', href: '/business/car-financing' },
    { key: 'heavy_equipment', labelAr: 'المعدات الثقيلة', labelEn: 'Heavy Equipment', href: '/business/heavy-equipment' },
  ],
  company: [
    { key: 'about', labelAr: 'عن أجل', labelEn: 'About Us', href: '/about/story' },
    { key: 'news', labelAr: 'الأخبار', labelEn: 'News', href: '/about/news' },
    { key: 'contact', labelAr: 'اتصل بنا', labelEn: 'Contact', href: '/contact' },
    { key: 'careers', labelAr: 'الوظائف', labelEn: 'Careers', href: '/careers' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/ajilfinance', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/ajilfinance', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/ajilfinance', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/ajilfinance', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com/company/ajilfinance', label: 'LinkedIn' },
]

export default function Footer() {
  const { t, dir, language } = useI18n()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [email, setEmail] = useState('')
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronRight

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="relative overflow-hidden" style={{ backgroundColor: AJIL_BLUE }}>
        {/* Top A-Wave Divider */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path 
              d="M0,0 L0,40 Q360,80 720,40 Q1080,80 1440,40 L1440,0 Z" 
              fill="white"
            />
            <path 
              d="M560,38 L720,10 L880,38" 
              fill="none"
              stroke={AJIL_GOLD}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large A shapes */}
          <motion.div 
            className="absolute -top-20 -right-20"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          >
            <LargeAShape size={400} opacity={0.03} />
          </motion.div>
          <motion.div 
            className="absolute -bottom-20 -left-20"
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          >
            <LargeAShape size={350} opacity={0.02} />
          </motion.div>
          
          {/* Center decorative A */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
            <LargeAShape size={600} opacity={1} />
          </div>

          {/* Floating A shapes */}
          <FloatingA delay={0} x={10} y={30} />
          <FloatingA delay={2} x={85} y={25} />
          <FloatingA delay={4} x={20} y={70} />
          <FloatingA delay={1} x={75} y={65} />
          <FloatingA delay={3} x={50} y={20} />

          {/* Gradient orbs */}
          <div 
            className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${AJIL_GOLD}10 0%, transparent 70%)` }}
          />
          <div 
            className="absolute bottom-20 left-0 w-[300px] h-[300px] rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${AJIL_BLUE_LIGHT}20 0%, transparent 70%)` }}
          />
        </div>
        
        {/* Newsletter Section */}
        <div className="container mx-auto px-4 pt-28 pb-12 relative z-10">
          <motion.div 
            className="relative rounded-3xl p-8 md:p-12 mb-16 overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${AJIL_BLUE_LIGHT}30 0%, ${AJIL_BLUE}50 100%)`,
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background A shapes */}
            <div className="absolute top-4 right-4 opacity-10">
              <MiniAShape size={80} color="white" strokeWidth={1.5} />
            </div>
            <div className="absolute bottom-4 left-4 opacity-10">
              <MiniAShape size={60} color={AJIL_GOLD} strokeWidth={1.5} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MiniAShape size={24} color={AJIL_GOLD} strokeWidth={2} />
                  <span className="text-sm font-semibold" style={{ color: AJIL_GOLD }}>
                    {language === 'ar' ? 'النشرة البريدية' : 'Newsletter'}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {language === 'ar' ? 'اشترك في نشرتنا البريدية' : 'Subscribe to Our Newsletter'}
                </h3>
                <p className="text-white/60">
                  {language === 'ar' 
                    ? 'احصل على آخر العروض والأخبار مباشرة في بريدك الإلكتروني'
                    : 'Get the latest offers and news directly in your inbox'}
                </p>
              </div>
              
              <div>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                      className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#F7941D] transition-colors"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-4 opacity-30">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <motion.button
                    className="px-6 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-300"
                    style={{ backgroundColor: AJIL_GOLD, color: '#1a1a1a' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">
                      {language === 'ar' ? 'اشترك' : 'Subscribe'}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <motion.div 
                  className="relative bg-white rounded-2xl p-4 shadow-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {/* A shape decoration */}
                  <div className="absolute -top-2 -right-2">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: AJIL_GOLD }}
                    >
                      <MiniAShape size={10} color="white" strokeWidth={2} />
                    </div>
                  </div>
                  <Image
                    src="/images/AJIL_logo.png"
                    alt="AJIL Finance Logo"
                    width={130}
                    height={50}
                    className="object-contain"
                  />
                </motion.div>
              </Link>
              
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                {t('footer.about_text')}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Hover fill */}
                    <div 
                      className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      style={{ backgroundColor: AJIL_GOLD }}
                    />
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-gray-900 relative z-10 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Individual Financing Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-3">
                <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
                <span>{language === 'ar' ? 'تمويل الأفراد' : 'Individuals'}</span>
              </h4>
              <ul className="space-y-4">
                {footerLinks.individuals.map((link, index) => (
                  <motion.li 
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ChevronIcon 
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: AJIL_GOLD }}
                      />
                      <span>{language === 'ar' ? link.labelAr : link.labelEn}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Business Financing Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-3">
                <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
                <span>{language === 'ar' ? 'تمويل الأعمال' : 'Business'}</span>
              </h4>
              <ul className="space-y-4">
                {footerLinks.business.map((link, index) => (
                  <motion.li 
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ChevronIcon 
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: AJIL_GOLD }}
                      />
                      <span>{language === 'ar' ? link.labelAr : link.labelEn}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-3">
                <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={2} />
                <span>{language === 'ar' ? 'تواصل معنا' : 'Contact'}</span>
              </h4>
              <div className="space-y-5">
                <motion.a 
                  href="tel:8002442211" 
                  className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors"
                  dir="ltr"
                  whileHover={{ x: 5 }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <Phone className="w-5 h-5" style={{ color: AJIL_GOLD }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">
                      {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                    </p>
                    <p className="font-bold">800 244 2211</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="mailto:info@ajil.com" 
                  className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: AJIL_GOLD }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">
                      {language === 'ar' ? 'راسلنا' : 'Email Us'}
                    </p>
                    <p className="font-bold">info@ajil.com</p>
                  </div>
                </motion.a>

                <motion.div 
                  className="flex items-center gap-4 text-white/50"
                  whileHover={{ x: 5 }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: AJIL_GOLD }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">
                      {language === 'ar' ? 'موقعنا' : 'Location'}
                    </p>
                    <p className="font-bold text-sm">
                      {language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright with A shape */}
            <div className="flex items-center gap-3">
              <MiniAShape size={16} color={AJIL_GOLD} strokeWidth={1.5} />
              <p className="text-sm text-white/40">
                {t('footer.copyright')}
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-0 group-hover:w-2 h-0.5 transition-all duration-300" style={{ backgroundColor: AJIL_GOLD }} />
                {t('footer.privacy_policy')}
              </Link>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <Link 
                href="/terms" 
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-0 group-hover:w-2 h-0.5 transition-all duration-300" style={{ backgroundColor: AJIL_GOLD }} />
                {t('footer.terms')}
              </Link>
            </div>

            {/* Regulatory Info */}
            <div className="flex items-center gap-2 text-xs text-white/30">
              <Sparkles className="w-4 h-4" style={{ color: AJIL_GOLD }} />
              <span>{language === 'ar' ? 'مرخصة من البنك المركزي السعودي' : 'Licensed by SAMA'}</span>
            </div>
          </div>
        </div>

        {/* Bottom A-Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 30" className="w-full" preserveAspectRatio="none">
            <path 
              d="M0,30 L0,15 Q360,0 720,15 Q1080,0 1440,15 L1440,30 Z" 
              fill={`${AJIL_BLUE}80`}
            />
            <path 
              d="M600,14 L720,5 L840,14" 
              fill="none"
              stroke={AJIL_GOLD}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
          </svg>
        </div>
      </footer>

      {/* Back to Top Button with A shape */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed ${dir === 'rtl' ? 'left-6' : 'right-6'} bottom-6 z-50 transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
      >
        <div 
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
          style={{ 
            backgroundColor: AJIL_GOLD,
            boxShadow: `0 10px 30px ${AJIL_GOLD}40`
          }}
        >
          {/* A shape frame */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56">
            <path
              d="M14 42 L28 14 L42 42"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <ArrowUp className="w-6 h-6 text-gray-900" />
        </div>
      </motion.button>

      {/* Accessibility Font Size Controls with A styling */}
      <div className={`fixed ${dir === 'rtl' ? 'left-6' : 'right-6'} bottom-24 flex flex-col gap-2 z-50`}>
        <motion.button
          onClick={() => {
            const html = document.documentElement
            const currentSize = parseFloat(getComputedStyle(html).fontSize)
            html.style.fontSize = Math.min(currentSize + 2, 24) + 'px'
          }}
          className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 font-bold shadow-lg overflow-hidden group"
          style={{ border: `2px solid ${AJIL_BLUE}20` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Increase font size"
        >
          <div 
            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            style={{ backgroundColor: AJIL_BLUE }}
          />
          <span className="relative z-10 group-hover:text-white transition-colors">A+</span>
        </motion.button>
        <motion.button
          onClick={() => {
            const html = document.documentElement
            const currentSize = parseFloat(getComputedStyle(html).fontSize)
            html.style.fontSize = Math.max(currentSize - 2, 12) + 'px'
          }}
          className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 font-bold shadow-lg overflow-hidden group"
          style={{ border: `2px solid ${AJIL_BLUE}20` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Decrease font size"
        >
          <div 
            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            style={{ backgroundColor: AJIL_BLUE }}
          />
          <span className="relative z-10 group-hover:text-white transition-colors">A-</span>
        </motion.button>
      </div>
    </>
  )
}
