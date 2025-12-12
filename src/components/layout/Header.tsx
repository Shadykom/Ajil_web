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
  Globe,
  ArrowRight,
  ArrowLeft,
  User,
} from 'lucide-react'
import {
  IconCarFinancing,
  IconPersonalFinancing,
  IconBusinessFinancing,
  IconLoanCalculator,
  IconOffers,
  IconAbout,
  IconNews,
  IconCustomerSupport,
  AjilSymbol,
  AnimatedCarFinancing,
  AnimatedPersonalFinancing,
  AnimatedBusinessFinancing,
  AnimatedLoanCalculator,
  AnimatedCustomerSupport,
  AnimatedAjilSymbol,
  AnimatedOffers,
  AnimatedAbout,
  AnimatedNews,
} from '@/components/icons'

// Navigation items with icons
const navItems = [
  {
    key: 'individuals',
    labelAr: 'الأفراد',
    labelEn: 'Individuals',
    hasDropdown: true,
    icon: IconPersonalFinancing,
    animatedIcon: AnimatedPersonalFinancing,
    dropdownItems: [
      { 
        key: 'car_financing', 
        labelAr: 'تمويل السيارات',
        labelEn: 'Car Financing',
        href: '/individuals/car-financing',
        icon: IconCarFinancing,
        animatedIcon: AnimatedCarFinancing,
      },
      { 
        key: 'personal_financing', 
        labelAr: 'التمويل الشخصي',
        labelEn: 'Personal Financing',
        href: '/individuals/personal-financing',
        icon: IconPersonalFinancing,
        animatedIcon: AnimatedPersonalFinancing,
      },
      { 
        key: 'financing_rates', 
        labelAr: 'معدلات التمويل',
        labelEn: 'Financing Rates',
        href: '/individuals/rates',
        icon: IconLoanCalculator,
        animatedIcon: AnimatedLoanCalculator,
      },
    ],
  },
  {
    key: 'business',
    labelAr: 'الأعمال',
    labelEn: 'Business',
    hasDropdown: true,
    icon: IconBusinessFinancing,
    animatedIcon: AnimatedBusinessFinancing,
    dropdownItems: [
      { 
        key: 'cash_financing', 
        labelAr: 'التمويل النقدي',
        labelEn: 'Cash Financing',
        href: '/business/cash-financing',
        icon: IconLoanCalculator,
        animatedIcon: AnimatedLoanCalculator,
      },
      { 
        key: 'car_financing', 
        labelAr: 'تمويل السيارات',
        labelEn: 'Car Financing',
        href: '/business/car-financing',
        icon: IconCarFinancing,
        animatedIcon: AnimatedCarFinancing,
      },
      { 
        key: 'heavy_equipment', 
        labelAr: 'المعدات الثقيلة',
        labelEn: 'Heavy Equipment',
        href: '/business/heavy-equipment',
        icon: IconBusinessFinancing,
        animatedIcon: AnimatedBusinessFinancing,
      },
    ],
  },
  {
    key: 'calculator',
    labelAr: 'حاسبة التمويل',
    labelEn: 'Calculator',
    href: '/calculator',
    icon: IconLoanCalculator,
    animatedIcon: AnimatedLoanCalculator,
  },
  {
    key: 'offers',
    labelAr: 'العروض',
    labelEn: 'Offers',
    href: '/offers',
    icon: IconOffers,
    animatedIcon: AnimatedOffers,
  },
  {
    key: 'about',
    labelAr: 'عن أجل',
    labelEn: 'About',
    hasDropdown: true,
    icon: IconAbout,
    animatedIcon: AnimatedAbout,
    dropdownItems: [
      { 
        key: 'our_story', 
        labelAr: 'قصتنا',
        labelEn: 'Our Story',
        href: '/about/story',
        icon: AjilSymbol,
        animatedIcon: AnimatedAjilSymbol,
      },
      { 
        key: 'news', 
        labelAr: 'الأخبار',
        labelEn: 'News',
        href: '/about/news',
        icon: IconNews,
        animatedIcon: AnimatedNews,
      },
      { 
        key: 'financial_reports', 
        labelAr: 'التقارير المالية',
        labelEn: 'Financial Reports',
        href: '/about/reports',
        icon: IconLoanCalculator,
        animatedIcon: AnimatedLoanCalculator,
      },
    ],
  },
  {
    key: 'contact',
    labelAr: 'اتصل بنا',
    labelEn: 'Contact',
    href: '/contact',
    icon: IconCustomerSupport,
    animatedIcon: AnimatedCustomerSupport,
  },
]

export default function Header() {
  const { language, setLanguage, dir } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Phone */}
          <a 
            href="tel:8002442211" 
            className="flex items-center gap-2 hover:text-secondary-400 transition-colors"
            dir="ltr"
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">800 244 2211</span>
          </a>
          
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-secondary-400 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>
            
            {/* Login */}
            <Link 
              href="/login" 
              className="hidden sm:flex items-center gap-1.5 hover:text-secondary-400 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative bg-primary-600 rounded-lg p-2">
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL Finance"
                  width={90}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
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
                      className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium text-sm transition-colors"
                    >
                      {language === 'ar' ? item.labelAr : item.labelEn}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 font-medium text-sm transition-colors ${
                        activeDropdown === item.key ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                      }`}
                    >
                      <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`} 
                      />
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
                        className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 mt-1`}
                      >
                        {item.dropdownItems?.map((dropdownItem) => {
                          const DropdownIcon = dropdownItem.icon
                          return (
                            <Link
                              key={dropdownItem.key}
                              href={dropdownItem.href}
                              className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              <DropdownIcon size={18} className="text-gray-400" />
                              <span className="font-medium text-sm">
                                {language === 'ar' ? dropdownItem.labelAr : dropdownItem.labelEn}
                              </span>
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                <span>{language === 'ar' ? 'تقدم بطلبك' : 'Apply Now'}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[85%] max-w-sm h-full bg-white z-50 lg:hidden flex flex-col`}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="bg-primary-600 rounded-lg p-1.5">
                  <Image
                    src="/images/AJIL_logo.png"
                    alt="AJIL Finance"
                    width={80}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-2">
                  {navItems.map((item) => {
                    const ItemIcon = item.animatedIcon
                    const isExpanded = mobileActiveDropdown === item.key
                    
                    return (
                      <div key={item.key} className="border-b border-gray-50">
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                              <ItemIcon size={20} className="text-primary-600" />
                            </div>
                            <span className="font-semibold">
                              {language === 'ar' ? item.labelAr : item.labelEn}
                            </span>
                          </Link>
                        ) : (
                          <>
                            <button
                              onClick={() => setMobileActiveDropdown(isExpanded ? null : item.key)}
                              className="w-full flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                isExpanded ? 'bg-primary-600' : 'bg-primary-50'
                              }`}>
                                <ItemIcon size={20} className={isExpanded ? 'text-white' : 'text-primary-600'} />
                              </div>
                              <span className="font-semibold flex-1 text-start">
                                {language === 'ar' ? item.labelAr : item.labelEn}
                              </span>
                              <ChevronDown 
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            
                            {/* Submenu */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden bg-gray-50"
                                >
                                  {item.dropdownItems?.map((subItem) => {
                                    const SubIcon = subItem.animatedIcon
                                    return (
                                      <Link
                                        key={subItem.key}
                                        href={subItem.href}
                                        className={`flex items-center gap-3 px-4 py-3 ${dir === 'rtl' ? 'pr-8' : 'pl-8'} text-gray-600 hover:text-primary-600 transition-colors`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                          <SubIcon size={16} className="text-primary-600" />
                                        </div>
                                        <span className="font-medium text-sm">
                                          {language === 'ar' ? subItem.labelAr : subItem.labelEn}
                                        </span>
                                      </Link>
                                    )
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </div>
                    )
                  })}
                </nav>
              </div>

              {/* Menu Footer */}
              <div className="p-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-semibold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{language === 'ar' ? 'تقدم بطلبك الآن' : 'Apply Now'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
                
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
                </Link>
                
                {/* Contact Info */}
                <div className="pt-3 border-t border-gray-100">
                  <a 
                    href="tel:8002442211" 
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                    dir="ltr"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold">800 244 2211</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
