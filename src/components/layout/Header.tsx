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
  Sparkles,
  Clock,
  MapPin,
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
import { AjilLogoMark } from '@/components/icons/AjilLogo'

// Navigation items with icons (static for desktop, animated for mobile)
const navItems = [
  {
    key: 'individuals',
    labelKey: 'nav.individuals',
    hasDropdown: true,
    icon: IconPersonalFinancing,
    animatedIcon: AnimatedPersonalFinancing,
    description: 'Personal financing solutions',
    descriptionAr: 'حلول التمويل الشخصي',
    dropdownItems: [
      { 
        key: 'car_financing', 
        labelKey: 'nav.car_financing', 
        href: '/individuals/car-financing',
        icon: IconCarFinancing,
        animatedIcon: AnimatedCarFinancing,
        description: 'Finance your dream car',
        descriptionAr: 'مول سيارة أحلامك',
      },
      { 
        key: 'personal_financing', 
        labelKey: 'nav.personal_financing', 
        href: '/individuals/personal-financing',
        icon: IconPersonalFinancing,
        animatedIcon: AnimatedPersonalFinancing,
        description: 'Personal cash financing',
        descriptionAr: 'تمويل نقدي شخصي',
      },
      { 
        key: 'financing_rates', 
        labelKey: 'nav.financing_rates', 
        href: '/individuals/rates',
        icon: IconLoanCalculator,
        animatedIcon: AnimatedLoanCalculator,
        description: 'View our competitive rates',
        descriptionAr: 'اطلع على أسعارنا التنافسية',
      },
    ],
  },
  {
    key: 'business',
    labelKey: 'nav.business',
    hasDropdown: true,
    icon: IconBusinessFinancing,
    animatedIcon: AnimatedBusinessFinancing,
    description: 'Business financing solutions',
    descriptionAr: 'حلول تمويل الأعمال',
    dropdownItems: [
      { 
        key: 'cash_financing', 
        labelKey: 'nav.cash_financing', 
        href: '/business/cash-financing',
        icon: IconLoanCalculator,
        animatedIcon: AnimatedLoanCalculator,
        description: 'Cash financing for businesses',
        descriptionAr: 'تمويل نقدي للأعمال',
      },
      { 
        key: 'car_financing', 
        labelKey: 'nav.car_financing', 
        href: '/business/car-financing',
        icon: IconCarFinancing,
        animatedIcon: AnimatedCarFinancing,
        description: 'Fleet and vehicle financing',
        descriptionAr: 'تمويل الأسطول والمركبات',
      },
      { 
        key: 'heavy_equipment', 
        labelKey: 'nav.heavy_equipment', 
        href: '/business/heavy-equipment',
        icon: IconBusinessFinancing,
        animatedIcon: AnimatedBusinessFinancing,
        description: 'Heavy equipment financing',
        descriptionAr: 'تمويل المعدات الثقيلة',
      },
      { 
        key: 'bab_rizq', 
        labelKey: 'nav.bab_rizq', 
        href: '/business/bab-rizq-jameel',
        icon: IconCustomerSupport,
        animatedIcon: AnimatedCustomerSupport,
        description: 'Bab Rizq Jameel program',
        descriptionAr: 'برنامج باب رزق جميل',
      },
    ],
  },
  {
    key: 'offers',
    labelKey: 'nav.offers',
    href: '/offers',
    icon: IconOffers,
    animatedIcon: AnimatedOffers,
  },
  {
    key: 'about',
    labelKey: 'nav.about',
    hasDropdown: true,
    icon: IconAbout,
    animatedIcon: AnimatedAbout,
    description: 'Learn about AJIL',
    descriptionAr: 'تعرف على أجيل',
    dropdownItems: [
      { 
        key: 'our_story', 
        labelKey: 'nav.our_story', 
        href: '/about/story',
        icon: AjilSymbol,
        animatedIcon: AnimatedAjilSymbol,
        description: 'Our journey and mission',
        descriptionAr: 'رحلتنا ومهمتنا',
      },
      { 
        key: 'news', 
        labelKey: 'nav.news', 
        href: '/about/news',
        icon: IconNews,
        animatedIcon: AnimatedNews,
        description: 'Latest news and updates',
        descriptionAr: 'آخر الأخبار والتحديثات',
      },
      { 
        key: 'financial_reports', 
        labelKey: 'nav.financial_reports', 
        href: '/about/reports',
        icon: IconLoanCalculator,
        animatedIcon: AnimatedLoanCalculator,
        description: 'Financial reports and data',
        descriptionAr: 'التقارير المالية والبيانات',
      },
    ],
  },
  {
    key: 'contact',
    labelKey: 'nav.contact',
    href: '/contact',
    icon: IconCustomerSupport,
    animatedIcon: AnimatedCustomerSupport,
  },
]

export default function Header() {
  const { t, language, setLanguage, dir } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
      {/* Premium Top Bar */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white py-2.5 text-sm relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="none"/%3E%3Cpath d="M10 0l10 20H0z" fill="%23fff" opacity="0.1"/%3E%3C/svg%3E")',
            backgroundSize: '20px 20px',
          }} />
        </div>
        
        <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
          {/* Left side - Contact info */}
          <div className="flex items-center gap-6">
            <motion.a 
              href="tel:8002442211" 
              className="flex items-center gap-2 hover:text-secondary-400 transition-colors group"
              dir="ltr"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-secondary-500 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold tracking-wide">800 244 2211</span>
            </motion.a>
            
            <div className="hidden md:flex items-center gap-2 text-white/60">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{language === 'ar' ? 'متاح 24/7' : 'Available 24/7'}</span>
            </div>
          </div>
          
          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold text-xs">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </motion.button>
            
            {/* Login Button */}
            <Link 
              href="/login" 
              className="hidden sm:flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-300"
            >
              <IconPersonalFinancing size={14} />
              <span>{t('nav.login')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-xl shadow-xl shadow-gray-200/50' 
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {/* Light background for logo visibility */}
                <div className="absolute -inset-1 bg-primary-600 rounded-lg opacity-90 group-hover:opacity-100 group-hover:bg-primary-500 transition-all duration-300" />
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL Finance Logo"
                  width={115}
                  height={40}
                  className="object-contain relative z-10 p-1.5"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const ItemIcon = item.icon
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2 px-4 py-2.5 text-gray-700 font-semibold text-[15px] rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 relative"
                      >
                        <ItemIcon size={18} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                        <span>{t(item.labelKey)}</span>
                        {/* Active indicator line */}
                        <motion.div 
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-500 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </Link>
                    ) : (
                      <button
                        className="group flex items-center gap-2 px-4 py-2.5 text-gray-700 font-semibold text-[15px] rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 relative"
                      >
                        <ItemIcon size={18} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                        <span>{t(item.labelKey)}</span>
                        {item.hasDropdown && (
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-all duration-300 ${
                              activeDropdown === item.key ? 'rotate-180 text-primary-500' : ''
                            }`} 
                          />
                        )}
                      </button>
                    )}

                    {/* Mega Dropdown Menu */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} w-80 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 py-4 mt-3 overflow-hidden`}
                        >
                          {/* Decorative top gradient */}
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500" />
                          
                          {/* Background decoration */}
                          <div className="absolute top-4 right-4 opacity-5">
                            <AjilLogoMark size={80} variant="primary" />
                          </div>

                          {/* Dropdown header */}
                          <div className="px-5 pb-3 mb-2 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                                <ItemIcon size={18} className="text-primary-600" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-sm">{t(item.labelKey)}</h4>
                                <p className="text-xs text-gray-500">
                                  {language === 'ar' ? item.descriptionAr : item.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Dropdown items */}
                          <div className="px-2">
                            {item.dropdownItems?.map((dropdownItem, index) => {
                              const DropdownIcon = dropdownItem.icon
                              return (
                                <motion.div
                                  key={dropdownItem.key}
                                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    href={dropdownItem.href}
                                    className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent transition-all duration-300"
                                  >
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                                      <DropdownIcon size={20} className="text-gray-500 group-hover:text-primary-600 transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                      <span className="block font-semibold text-gray-700 group-hover:text-primary-600 text-sm transition-colors">
                                        {t(dropdownItem.labelKey)}
                                      </span>
                                      <span className="block text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                                        {language === 'ar' ? dropdownItem.descriptionAr : dropdownItem.description}
                                      </span>
                                    </div>
                                    <ArrowIcon className={`w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-all ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                                  </Link>
                                </motion.div>
                              )
                            })}
                          </div>

                          {/* Dropdown footer CTA */}
                          <div className="mx-4 mt-3 pt-3 border-t border-gray-100">
                            <Link
                              href="/apply"
                              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                            >
                              <Sparkles className="w-4 h-4" />
                              <span>{language === 'ar' ? 'تقدم الآن' : 'Apply Now'}</span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Calculator quick link */}
              <Link
                href="/calculator"
                className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-primary-600 font-medium text-sm rounded-xl hover:bg-gray-50 transition-all"
              >
                <IconLoanCalculator size={18} />
                <span>{language === 'ar' ? 'حاسبة التمويل' : 'Calculator'}</span>
              </Link>
              
              {/* Main CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/apply"
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl font-bold text-sm overflow-hidden shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>
                  
                  <AjilSymbol size={18} className="relative z-10" />
                  <span className="relative z-10">{language === 'ar' ? 'تقدم بطلبك' : 'Apply Now'}</span>
                  <ArrowIcon className={`w-4 h-4 relative z-10 transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 rounded-xl bg-gray-100 hover:bg-primary-100 flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-full max-w-sm h-full bg-white shadow-2xl overflow-y-auto`}
            >
              {/* Mobile Menu Header */}
              <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div className="bg-primary-600 rounded-lg p-1.5">
                  <Image
                    src="/images/AJIL_logo.png"
                    alt="AJIL Finance Logo"
                    width={80}
                    height={30}
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="px-4 py-6">
                {navItems.map((item, index) => {
                  const AnimatedIcon = item.animatedIcon
                  const isExpanded = mobileActiveDropdown === item.key
                  
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="mb-2"
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-primary-50 transition-all duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-500 flex items-center justify-center transition-colors duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <AnimatedIcon size={24} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                          </motion.div>
                          <span className="font-bold text-gray-900 group-hover:text-primary-600 text-lg transition-colors duration-300">{t(item.labelKey)}</span>
                        </Link>
                      ) : (
                        <div>
                          <button
                            onClick={() => setMobileActiveDropdown(isExpanded ? null : item.key)}
                            className="group w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-primary-50 transition-all duration-300"
                          >
                            <motion.div 
                              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-primary-500' : 'bg-primary-100 group-hover:bg-primary-200'}`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <AnimatedIcon size={24} className={`transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-primary-600'}`} />
                            </motion.div>
                            <span className="font-bold text-gray-900 group-hover:text-primary-600 text-lg flex-1 text-start transition-colors duration-300">{t(item.labelKey)}</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className={`${dir === 'rtl' ? 'pr-8' : 'pl-8'} py-2`}>
                                  {item.dropdownItems?.map((dropdownItem, idx) => {
                                    const DropdownAnimatedIcon = dropdownItem.animatedIcon
                                    return (
                                      <motion.div
                                        key={dropdownItem.key}
                                        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                      >
                                        <Link
                                          href={dropdownItem.href}
                                          className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 transition-all duration-300"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          <motion.div 
                                            className="w-10 h-10 rounded-lg bg-gray-100 group-hover/item:bg-primary-500 flex items-center justify-center transition-colors duration-300"
                                            whileHover={{ scale: 1.15, rotate: 10 }}
                                            whileTap={{ scale: 0.9 }}
                                          >
                                            <DropdownAnimatedIcon size={20} className="text-gray-600 group-hover/item:text-white transition-colors duration-300" />
                                          </motion.div>
                                          <div>
                                            <span className="block font-semibold text-gray-800 group-hover/item:text-primary-600 transition-colors duration-300">{t(dropdownItem.labelKey)}</span>
                                            <span className="block text-xs text-gray-500">
                                              {language === 'ar' ? dropdownItem.descriptionAr : dropdownItem.description}
                                            </span>
                                          </div>
                                        </Link>
                                      </motion.div>
                                    )
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  )
                })}

                {/* Mobile CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-100"
                >
                  <Link
                    href="/apply"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary-500/25"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{language === 'ar' ? 'تقدم بطلبك الآن' : 'Apply Now'}</span>
                  </Link>
                  
                  <Link
                    href="/calculator"
                    className="flex items-center justify-center gap-3 w-full py-4 mt-3 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconLoanCalculator size={20} />
                    <span>{language === 'ar' ? 'حاسبة التمويل' : 'Loan Calculator'}</span>
                  </Link>
                </motion.div>

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-4 bg-gray-50 rounded-2xl"
                >
                  <h4 className="font-bold text-gray-900 mb-4">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
                  <a href="tel:8002442211" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 mb-3" dir="ltr">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">800 244 2211</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">{language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
