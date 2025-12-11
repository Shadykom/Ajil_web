'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Globe
} from 'lucide-react'
import { IconPersonalFinancing } from '@/components/icons'

const navItems = [
  {
    key: 'individuals',
    labelKey: 'nav.individuals',
    hasDropdown: true,
    dropdownItems: [
      { key: 'car_financing', labelKey: 'nav.car_financing', href: '/individuals/car-financing' },
      { key: 'personal_financing', labelKey: 'nav.personal_financing', href: '/individuals/personal-financing' },
      { key: 'financing_rates', labelKey: 'nav.financing_rates', href: '/individuals/rates' },
    ],
  },
  {
    key: 'business',
    labelKey: 'nav.business',
    hasDropdown: true,
    dropdownItems: [
      { key: 'cash_financing', labelKey: 'nav.cash_financing', href: '/business/cash-financing' },
      { key: 'car_financing', labelKey: 'nav.car_financing', href: '/business/car-financing' },
      { key: 'heavy_equipment', labelKey: 'nav.heavy_equipment', href: '/business/heavy-equipment' },
      { key: 'bab_rizq', labelKey: 'nav.bab_rizq', href: '/business/bab-rizq-jameel' },
    ],
  },
  {
    key: 'offers',
    labelKey: 'nav.offers',
    href: '/offers',
  },
  {
    key: 'about',
    labelKey: 'nav.about',
    hasDropdown: true,
    dropdownItems: [
      { key: 'our_story', labelKey: 'nav.our_story', href: '/about/story' },
      { key: 'news', labelKey: 'nav.news', href: '/about/news' },
      { key: 'financial_reports', labelKey: 'nav.financial_reports', href: '/about/reports' },
    ],
  },
  {
    key: 'contact',
    labelKey: 'nav.contact',
    href: '/contact',
  },
]

export default function Header() {
  const { t, language, setLanguage, dir } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a 
              href="tel:8002442211" 
              className="flex items-center gap-2 hover:text-secondary-400 transition-colors group"
              dir="ltr"
            >
              <Phone className="w-4 h-4 group-hover:animate-bounce-soft" />
              <span className="font-semibold">8002442211</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md transition-all duration-300 backdrop-blur-sm"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            <Link 
              href="/login" 
              className="hover:text-secondary-400 transition-colors flex items-center gap-2"
            >
              <IconPersonalFinancing size={16} />
              {t('nav.login')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL Finance Logo"
                  width={140}
                  height={50}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 font-semibold text-[15px] rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-all duration-300"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ) : (
                    <button
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 font-semibold text-[15px] rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-all duration-300"
                    >
                      {t(item.labelKey)}
                      {item.hasDropdown && (
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.key ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 mt-2 overflow-hidden`}
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <motion.div
                            key={dropdownItem.key}
                            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={dropdownItem.href}
                              className={`block px-5 py-3 text-gray-600 hover:text-primary-600 hover:bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} hover:from-primary-50 hover:to-transparent transition-all duration-300 font-medium text-sm`}
                            >
                              {t(dropdownItem.labelKey)}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/apply"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:shadow-glow-md hover:-translate-y-0.5"
              >
                <span className="relative z-10">{t('nav.login')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block py-3 px-4 text-gray-700 font-semibold hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ) : (
                      <div className="py-2">
                        <div className="px-4 py-2 text-gray-700 font-semibold">
                          {t(item.labelKey)}
                        </div>
                        <div className={`${dir === 'rtl' ? 'pr-6' : 'pl-6'}`}>
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.key}
                              href={dropdownItem.href}
                              className="block py-2 px-4 text-gray-500 hover:text-primary-600 text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {t(dropdownItem.labelKey)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <Link
                    href="/apply"
                    className="block w-full text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('hero.cta_primary')}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
