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
  ArrowUp
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { AjilLogoBackground } from '@/components/icons/AjilLogo'

const footerLinks = {
  individuals: [
    { key: 'car_financing', labelKey: 'nav.car_financing', href: '/individuals/car-financing' },
    { key: 'personal_financing', labelKey: 'nav.personal_financing', href: '/individuals/personal-financing' },
    { key: 'financing_rates', labelKey: 'nav.financing_rates', href: '/individuals/rates' },
  ],
  business: [
    { key: 'cash_financing', labelKey: 'nav.cash_financing', href: '/business/cash-financing' },
    { key: 'car_financing', labelKey: 'nav.car_financing', href: '/business/car-financing' },
    { key: 'heavy_equipment', labelKey: 'nav.heavy_equipment', href: '/business/heavy-equipment' },
    { key: 'bab_rizq', labelKey: 'nav.bab_rizq', href: '/business/bab-rizq-jameel' },
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
  const { t, dir } = useI18n()
  const [showBackToTop, setShowBackToTop] = useState(false)

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
      <footer className="bg-gradient-to-b from-dark-800 to-dark-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
        
        {/* AJIL Logo Background */}
        <div className="absolute top-20 right-10 opacity-[0.02]">
          <AjilLogoBackground size={300} animated />
        </div>
        <div className="absolute bottom-20 left-10 opacity-[0.015] rotate-12">
          <AjilLogoBackground size={250} animated />
        </div>
        
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 pt-20 pb-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 group mb-6">
                <motion.div 
                  className="relative overflow-hidden bg-white rounded-xl p-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Image
                    src="/images/AJIL_logo.png"
                    alt="AJIL Finance Logo"
                    width={120}
                    height={45}
                    className="object-contain"
                  />
                </motion.div>
              </Link>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                {t('footer.about_text')}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/5 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Individual Financing Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white relative">
                {t('footer.individuals_financing')}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.individuals.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <span className={`w-0 group-hover:w-2 h-0.5 bg-secondary-500 transition-all duration-300`} />
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Financing Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white relative">
                {t('footer.business_financing')}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.business.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <span className={`w-0 group-hover:w-2 h-0.5 bg-secondary-500 transition-all duration-300`} />
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white relative">
                {t('footer.contact_us')}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
              </h4>
              <div className="space-y-5">
                <a 
                  href="tel:8002442211" 
                  className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors group"
                  dir="ltr"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="font-semibold">8002442211</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@ajil.com" 
                  className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-semibold">{t('common.email')}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-gray-400">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="font-semibold">{t('common.address')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 text-center md:text-start">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6">
              <Link 
                href="/privacy" 
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                {t('footer.privacy_policy')}
              </Link>
              <Link 
                href="/terms" 
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed ${dir === 'rtl' ? 'left-6' : 'right-6'} bottom-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl flex items-center justify-center shadow-glow-md z-50 transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Accessibility Font Size Controls */}
      <div className={`fixed ${dir === 'rtl' ? 'left-6' : 'right-6'} bottom-24 flex flex-col gap-2 z-50`}>
        <button
          onClick={() => {
            const html = document.documentElement
            const currentSize = parseFloat(getComputedStyle(html).fontSize)
            html.style.fontSize = Math.min(currentSize + 2, 24) + 'px'
          }}
          className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 shadow-md"
          aria-label="Increase font size"
        >
          A+
        </button>
        <button
          onClick={() => {
            const html = document.documentElement
            const currentSize = parseFloat(getComputedStyle(html).fontSize)
            html.style.fontSize = Math.max(currentSize - 2, 12) + 'px'
          }}
          className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 shadow-md"
          aria-label="Decrease font size"
        >
          A-
        </button>
      </div>
    </>
  )
}
