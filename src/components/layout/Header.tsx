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
  Headphones,
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

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_BLUE_LIGHT = '#0066b3'
const AJIL_GOLD = '#F7941D'

// Mini A Shape for decorations
function MiniAShape({ size = 20, color = AJIL_GOLD, className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 60 L68 60"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Navigation items
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
        descAr: 'احصل على سيارة أحلامك',
        descEn: 'Get your dream car',
        href: '/individuals/car-financing',
        icon: IconCarFinancing,
        animatedIcon: AnimatedCarFinancing,
      },
      { 
        key: 'personal_financing', 
        labelAr: 'التمويل الشخصي',
        labelEn: 'Personal Financing',
        descAr: 'تمويل نقدي سريع',
        descEn: 'Quick cash financing',
        href: '/individuals/personal-financing',
        icon: IconPersonalFinancing,
        animatedIcon: AnimatedPersonalFinancing,
      },
      { 
        key: 'financing_rates', 
        labelAr: 'معدلات التمويل',
        labelEn: 'Financing Rates',
        descAr: 'اطلع على الأسعار',
        descEn: 'View our rates',
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
        descAr: 'تمويل لأعمالك',
        descEn: 'Finance for your business',
        href: '/business/cash-financing',
        icon: IconLoanCalculator,
        animatedIcon: AnimatedLoanCalculator,
      },
      { 
        key: 'car_financing', 
        labelAr: 'تمويل السيارات',
        labelEn: 'Car Financing',
        descAr: 'تمويل أسطول المركبات',
        descEn: 'Fleet financing',
        href: '/business/car-financing',
        icon: IconCarFinancing,
        animatedIcon: AnimatedCarFinancing,
      },
      { 
        key: 'heavy_equipment', 
        labelAr: 'المعدات الثقيلة',
        labelEn: 'Heavy Equipment',
        descAr: 'تمويل المعدات',
        descEn: 'Equipment financing',
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
        descAr: 'تعرف علينا',
        descEn: 'Learn about us',
        href: '/about/story',
        icon: AjilSymbol,
        animatedIcon: AnimatedAjilSymbol,
      },
      { 
        key: 'news', 
        labelAr: 'الأخبار',
        labelEn: 'News',
        descAr: 'آخر المستجدات',
        descEn: 'Latest updates',
        href: '/about/news',
        icon: IconNews,
        animatedIcon: AnimatedNews,
      },
      { 
        key: 'financial_reports', 
        labelAr: 'التقارير المالية',
        labelEn: 'Reports',
        descAr: 'التقارير والبيانات',
        descEn: 'Financial data',
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
      {/* Top Bar - AJIL Blue */}
      <div style={{ backgroundColor: AJIL_BLUE }} className="text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Phone */}
          <a 
            href="tel:8002442211" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            dir="ltr"
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: AJIL_GOLD }}>
              <Phone className="w-3 h-3 text-gray-900" />
            </div>
            <span className="font-bold">800 244 2211</span>
          </a>
          
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Customer Service */}
            <a 
              href="/contact" 
              className="hidden md:flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Headphones className="w-4 h-4" />
              <span>{language === 'ar' ? 'خدمة العملاء' : 'Support'}</span>
            </a>
            
            {/* Language */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
            
            {/* Login */}
            <Link 
              href="/login" 
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors"
              style={{ backgroundColor: AJIL_GOLD, color: '#1a1a1a' }}
            >
              <User className="w-3.5 h-3.5" />
              <span className="font-semibold text-xs">{language === 'ar' ? 'دخول' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative rounded-lg overflow-hidden" style={{ backgroundColor: AJIL_BLUE }}>
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL Finance"
                  width={100}
                  height={36}
                  className="object-contain p-2"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 px-4 py-6 font-semibold text-sm transition-colors"
                      style={{ 
                        color: isScrolled ? AJIL_BLUE : AJIL_GOLD,
                        textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                    </Link>
                  ) : (
                    <button
                      className="flex items-center gap-1.5 px-4 py-6 font-semibold text-sm transition-colors"
                      style={{ 
                        color: isScrolled ? AJIL_BLUE : AJIL_GOLD,
                        textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  )}

                  {/* Active indicator line */}
                  <motion.div 
                    className="absolute bottom-0 left-4 right-4 h-[3px] rounded-full"
                    style={{ backgroundColor: AJIL_GOLD }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeDropdown === item.key ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden`}
                      >
                        {/* Dropdown header with A shape */}
                        <div 
                          className="px-4 py-3 flex items-center justify-between"
                          style={{ backgroundColor: AJIL_BLUE }}
                        >
                          <span className="text-white font-bold text-sm">
                            {language === 'ar' ? item.labelAr : item.labelEn}
                          </span>
                          <MiniAShape size={24} color="rgba(255,255,255,0.3)" />
                        </div>
                        
                        {/* Dropdown items */}
                        <div className="py-2">
                          {item.dropdownItems?.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon
                            return (
                              <Link
                                key={dropdownItem.key}
                                href={dropdownItem.href}
                                className="group/item flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              >
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors group-hover/item:scale-110"
                                  style={{ backgroundColor: `${AJIL_BLUE}10` }}
                                >
                                  <DropdownIcon size={20} style={{ color: AJIL_BLUE }} />
                                </div>
                                <div className="flex-1">
                                  <span 
                                    className="block font-semibold text-sm group-hover/item:text-[#0066b3] transition-colors"
                                    style={{ color: '#1f2937' }}
                                  >
                                    {language === 'ar' ? dropdownItem.labelAr : dropdownItem.labelEn}
                                  </span>
                                  <span className="block text-xs text-gray-500">
                                    {language === 'ar' ? dropdownItem.descAr : dropdownItem.descEn}
                                  </span>
                                </div>
                                <ArrowIcon 
                                  className="w-4 h-4 text-gray-300 group-hover/item:text-[#0066b3] group-hover/item:translate-x-1 rtl:group-hover/item:-translate-x-1 transition-all" 
                                />
                              </Link>
                            )
                          })}
                        </div>

                        {/* Dropdown footer CTA */}
                        <div className="px-4 py-3 border-t border-gray-100">
                          <Link
                            href="/apply"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: AJIL_GOLD }}
                          >
                            <MiniAShape size={16} color="rgba(0,0,0,0.3)" />
                            <span className="text-gray-900">{language === 'ar' ? 'تقدم الآن' : 'Apply Now'}</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Switch to Modern Homepage */}
              <Link
                href="/modern"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90 border-2"
                style={{ 
                  borderColor: isScrolled ? AJIL_BLUE : AJIL_GOLD, 
                  color: isScrolled ? AJIL_BLUE : AJIL_GOLD,
                  textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>{language === 'ar' ? 'الصفحة الكلاسيكية' : 'Classic Page'}</span>
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: AJIL_GOLD, color: '#1a1a1a' }}
              >
                <MiniAShape size={16} color="rgba(0,0,0,0.2)" />
                <span>{language === 'ar' ? 'تقدم بطلبك' : 'Apply Now'}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                isScrolled ? '' : 'bg-black/20'
              }`}
              style={isScrolled ? { backgroundColor: `${AJIL_BLUE}10` } : {}}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" style={{ color: isScrolled ? AJIL_BLUE : AJIL_GOLD }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              <div 
                className="flex items-center justify-between p-4"
                style={{ backgroundColor: AJIL_BLUE }}
              >
                <div className="flex items-center gap-3">
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
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* A Shape Decoration */}
              <div className="relative h-8 overflow-hidden" style={{ backgroundColor: AJIL_BLUE }}>
                <svg viewBox="0 0 400 40" className="absolute bottom-0 w-full" preserveAspectRatio="none">
                  <path d="M0,40 L200,10 L400,40 Z" fill="white" />
                  <path d="M150,38 L200,15 L250,38" fill="none" stroke={AJIL_GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-4">
                  {navItems.map((item) => {
                    const ItemIcon = item.icon
                    const AnimIcon = item.animatedIcon
                    const isExpanded = mobileActiveDropdown === item.key
                    
                    return (
                      <div key={item.key} className="border-b border-gray-100">
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${AJIL_BLUE}10` }}
                            >
                              <ItemIcon size={20} style={{ color: AJIL_BLUE }} />
                            </div>
                            <span className="font-semibold" style={{ color: AJIL_BLUE }}>
                              {language === 'ar' ? item.labelAr : item.labelEn}
                            </span>
                          </Link>
                        ) : (
                          <>
                            <button
                              onClick={() => setMobileActiveDropdown(isExpanded ? null : item.key)}
                              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                            >
                              <div 
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                                style={{ 
                                  backgroundColor: isExpanded ? AJIL_BLUE : `${AJIL_BLUE}10`,
                                }}
                              >
                                <ItemIcon size={20} style={{ color: isExpanded ? 'white' : AJIL_BLUE }} />
                              </div>
                              <span 
                                className="font-semibold flex-1 text-start"
                                style={{ color: AJIL_BLUE }}
                              >
                                {language === 'ar' ? item.labelAr : item.labelEn}
                              </span>
                              <ChevronDown 
                                className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                style={{ color: AJIL_GOLD }}
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
                                  className="overflow-hidden"
                                  style={{ backgroundColor: `${AJIL_BLUE}05` }}
                                >
                                  {item.dropdownItems?.map((subItem) => {
                                    const SubIcon = subItem.icon
                                    return (
                                      <Link
                                        key={subItem.key}
                                        href={subItem.href}
                                        className={`flex items-center gap-3 px-4 py-3 ${dir === 'rtl' ? 'pr-8' : 'pl-8'} hover:bg-white transition-colors`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        <div 
                                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-white"
                                          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                                        >
                                          <SubIcon size={16} style={{ color: AJIL_GOLD }} />
                                        </div>
                                        <div>
                                          <span className="block font-medium text-sm" style={{ color: AJIL_BLUE }}>
                                            {language === 'ar' ? subItem.labelAr : subItem.labelEn}
                                          </span>
                                          <span className="block text-xs text-gray-500">
                                            {language === 'ar' ? subItem.descAr : subItem.descEn}
                                          </span>
                                        </div>
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
              <div className="p-4 border-t border-gray-100">
                {/* Switch to Modern */}
                <Link
                  href="/modern"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold border-2 mb-3 transition-colors"
                  style={{ borderColor: AJIL_BLUE, color: AJIL_BLUE }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span>{language === 'ar' ? 'جرّب التصميم الحديث' : 'Try Modern Design'}</span>
                </Link>
                
                {/* Apply Button with A shape */}
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all hover:opacity-90"
                  style={{ backgroundColor: AJIL_GOLD, color: '#1a1a1a' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MiniAShape size={18} color="rgba(0,0,0,0.2)" />
                  <span>{language === 'ar' ? 'تقدم بطلبك الآن' : 'Apply Now'}</span>
                </Link>
                
                {/* Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded-xl font-semibold border-2 transition-colors"
                  style={{ borderColor: AJIL_BLUE, color: AJIL_BLUE }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
                </Link>
                
                {/* Contact */}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <a 
                    href="tel:8002442211" 
                    className="flex items-center gap-2 text-sm"
                    style={{ color: AJIL_BLUE }}
                    dir="ltr"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: AJIL_GOLD }}
                    >
                      <Phone className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="font-bold">800 244 2211</span>
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
