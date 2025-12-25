'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Check,
  Star,
  Sparkles,
  Shield,
  Zap,
  Heart,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Globe,
  User,
  Calculator,
  Car,
  Banknote,
  Building2,
  CreditCard,
  Smartphone,
  Clock,
  TrendingUp,
  BadgeCheck,
  Play,
  Headphones,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// AJIL Brand Colors - Bunq inspired palette
const COLORS = {
  navy: '#00377B',
  blue: '#0066B3',
  lightBlue: '#4DA3E0',
  gold: '#F7941D',
  green: '#00D084',
  pink: '#FF6B9D',
  purple: '#8B5CF6',
  cyan: '#22D3EE',
  white: '#FFFFFF',
  cream: '#FFF8F0',
  dark: '#0A0A1A',
};

// Gradient presets like Bunq
const GRADIENTS = {
  hero: 'linear-gradient(135deg, #00377B 0%, #0066B3 50%, #4DA3E0 100%)',
  sunset: 'linear-gradient(135deg, #F7941D 0%, #FF6B9D 100%)',
  ocean: 'linear-gradient(135deg, #00377B 0%, #22D3EE 100%)',
  forest: 'linear-gradient(135deg, #00377B 0%, #00D084 100%)',
  purple: 'linear-gradient(135deg, #8B5CF6 0%, #FF6B9D 100%)',
};

// ============================================
// HEADER COMPONENT - Bunq Style Navigation
// ============================================
function BunqHeader() {
  const { language, setLanguage, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      key: 'individuals',
      labelAr: 'الأفراد',
      labelEn: 'Individuals',
      hasDropdown: true,
      items: [
        { labelAr: 'تمويل السيارات', labelEn: 'Car Financing', href: '/individuals/car-financing', icon: Car },
        { labelAr: 'التمويل الشخصي', labelEn: 'Personal Financing', href: '/individuals/personal-financing', icon: Banknote },
        { labelAr: 'معدلات التمويل', labelEn: 'Financing Rates', href: '/individuals/rates', icon: TrendingUp },
      ],
    },
    {
      key: 'business',
      labelAr: 'الأعمال',
      labelEn: 'Business',
      hasDropdown: true,
      items: [
        { labelAr: 'التمويل النقدي', labelEn: 'Cash Financing', href: '/business/cash-financing', icon: Banknote },
        { labelAr: 'تمويل السيارات', labelEn: 'Fleet Financing', href: '/business/car-financing', icon: Car },
        { labelAr: 'المعدات الثقيلة', labelEn: 'Heavy Equipment', href: '/business/heavy-equipment', icon: Building2 },
      ],
    },
    { key: 'calculator', labelAr: 'الحاسبة', labelEn: 'Calculator', href: '/calculator' },
    { key: 'offers', labelAr: 'العروض', labelEn: 'Offers', href: '/offers' },
    { key: 'about', labelAr: 'عن أجل', labelEn: 'About', href: '/about/story' },
  ];

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: GRADIENTS.hero }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </motion.div>
              <div className={cn(
                'font-bold text-2xl transition-colors',
                isScrolled ? 'text-[#00377B]' : 'text-white'
              )}>
                {language === 'ar' ? 'أجل' : 'AJIL'}
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
                      className={cn(
                        'px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300',
                        isScrolled
                          ? 'text-[#00377B] hover:bg-[#00377B]/10'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {language === 'ar' ? item.labelAr : item.labelEn}
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300',
                        isScrolled
                          ? 'text-[#00377B] hover:bg-[#00377B]/10'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {language === 'ar' ? item.labelAr : item.labelEn}
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform',
                        activeDropdown === item.key && 'rotate-180'
                      )} />
                    </button>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden`}
                      >
                        <div className="p-2">
                          {item.items?.map((subItem, idx) => {
                            const Icon = subItem.icon;
                            return (
                              <Link
                                key={idx}
                                href={subItem.href}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                              >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00377B]/10 to-[#0066B3]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Icon className="w-6 h-6 text-[#00377B]" />
                                </div>
                                <div>
                                  <div className="font-semibold text-[#00377B]">
                                    {language === 'ar' ? subItem.labelAr : subItem.labelEn}
                                  </div>
                                </div>
                                <ArrowIcon className="w-4 h-4 text-gray-400 mr-auto rtl:ml-auto rtl:mr-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all',
                  isScrolled
                    ? 'text-[#00377B] hover:bg-[#00377B]/10'
                    : 'text-white/90 hover:bg-white/10'
                )}
              >
                <Globe className="w-4 h-4" />
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>

              {/* Login */}
              <Link
                href="/login"
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all',
                  isScrolled
                    ? 'text-[#00377B] hover:bg-[#00377B]/10'
                    : 'text-white/90 hover:bg-white/10'
                )}
              >
                <User className="w-4 h-4" />
                {language === 'ar' ? 'دخول' : 'Login'}
              </Link>

              {/* CTA */}
              <Link href="/apply">
                <motion.button
                  className="px-6 py-3 rounded-xl font-bold text-sm text-[#00377B] transition-all"
                  style={{ background: COLORS.gold }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'قدّم طلبك' : 'Apply Now'}
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'lg:hidden w-12 h-12 rounded-xl flex items-center justify-center transition-all',
                isScrolled ? 'bg-[#00377B]/10' : 'bg-white/10'
              )}
            >
              <Menu className={cn('w-6 h-6', isScrolled ? 'text-[#00377B]' : 'text-white')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[85%] max-w-sm h-full bg-white z-50 flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: GRADIENTS.hero }}
                  >
                    <Image
                      src="/images/AJIL_logo.png"
                      alt="AJIL"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-xl text-[#00377B]">
                    {language === 'ar' ? 'أجل' : 'AJIL'}
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Nav Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => (
                  <div key={item.key} className="px-4 mb-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-[#00377B]">
                          {language === 'ar' ? item.labelAr : item.labelEn}
                        </span>
                        <ArrowIcon className="w-5 h-5 text-gray-400" />
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <div className="px-4 py-3 font-bold text-[#00377B] text-sm uppercase tracking-wider">
                          {language === 'ar' ? item.labelAr : item.labelEn}
                        </div>
                        {item.items?.map((subItem, idx) => {
                          const Icon = subItem.icon;
                          return (
                            <Link
                              key={idx}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-[#00377B]/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-[#00377B]" />
                              </div>
                              <span className="text-gray-700">
                                {language === 'ar' ? subItem.labelAr : subItem.labelEn}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-gray-100 space-y-3">
                <button
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#00377B] text-[#00377B] font-semibold"
                >
                  <Globe className="w-5 h-5" />
                  {language === 'ar' ? 'English' : 'العربية'}
                </button>
                <Link
                  href="/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 rounded-xl font-bold text-center text-[#00377B]"
                  style={{ background: COLORS.gold }}
                >
                  {language === 'ar' ? 'قدّم طلبك الآن' : 'Apply Now'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// HERO SECTION - Bunq Style
// ============================================
function BunqHero() {
  const { language, dir } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: GRADIENTS.hero }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(247,148,29,0.2) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-20"
        style={{ y, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-white text-center lg:text-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#F7941D]" />
              <span className="text-sm font-semibold">
                {language === 'ar' ? 'تمويل متوافق مع الشريعة الإسلامية' : 'Sharia-Compliant Financing'}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'ar' ? (
                <>
                  <span className="block">تمويل بلا</span>
                  <span className="block mt-2" style={{ color: COLORS.gold }}>حدود</span>
                </>
              ) : (
                <>
                  <span className="block">Finance</span>
                  <span className="block mt-2" style={{ color: COLORS.gold }}>Without Limits</span>
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {language === 'ar'
                ? 'حلول تمويلية مبتكرة وسهلة. من السيارات إلى التمويل الشخصي، نجعل أحلامك حقيقة.'
                : 'Innovative and easy financing solutions. From cars to personal finance, we make your dreams come true.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/apply">
                <motion.button
                  className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-[#00377B]"
                  style={{ background: COLORS.gold }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                  <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/calculator">
                <motion.button
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calculator className="w-5 h-5" />
                  {language === 'ar' ? 'احسب تمويلك' : 'Calculate'}
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5 text-[#00D084]" />
                </div>
                <span className="text-sm text-white/80">
                  {language === 'ar' ? 'معتمد من ساما' : 'SAMA Licensed'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <span className="text-sm text-white/80">
                  {language === 'ar' ? 'آمن 100%' : '100% Secure'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[380px]">
              {/* Phone Frame */}
              <motion.div
                className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Screen */}
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* Status Bar */}
                  <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/5 to-transparent z-10" />
                  
                  {/* App Content */}
                  <div className="absolute inset-0 p-5 pt-10 flex flex-col">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#00377B] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">أ</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {language === 'ar' ? 'مرحباً' : 'Hello'}
                        </div>
                        <div className="font-bold text-[#00377B]">
                          {language === 'ar' ? 'أحمد' : 'Ahmed'}
                        </div>
                      </div>
                    </div>

                    {/* Balance Card */}
                    <div
                      className="rounded-2xl p-5 text-white mb-6"
                      style={{ background: GRADIENTS.hero }}
                    >
                      <div className="text-sm opacity-80 mb-1">
                        {language === 'ar' ? 'رصيد التمويل' : 'Financing Balance'}
                      </div>
                      <div className="text-3xl font-bold" dir="ltr">
                        125,000 <span className="text-lg">SAR</span>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                          <div className="w-[65%] h-full bg-[#00D084] rounded-full" />
                        </div>
                        <span className="text-xs">65%</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { icon: CreditCard, label: language === 'ar' ? 'دفع' : 'Pay' },
                        { icon: Calculator, label: language === 'ar' ? 'حاسبة' : 'Calc' },
                        { icon: Headphones, label: language === 'ar' ? 'دعم' : 'Help' },
                      ].map((action, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <action.icon className="w-5 h-5 text-[#00377B]" />
                          </div>
                          <span className="text-xs text-gray-600">{action.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#00377B] mb-3">
                        {language === 'ar' ? 'آخر العمليات' : 'Recent Activity'}
                      </div>
                      {[1, 2].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-3 py-3 border-b border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-[#00D084]/10 flex items-center justify-center">
                            <Check className="w-5 h-5 text-[#00D084]" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">
                              {language === 'ar' ? 'دفعة ناجحة' : 'Payment Success'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {language === 'ar' ? 'منذ ساعتين' : '2 hours ago'}
                            </div>
                          </div>
                          <div className="text-sm font-bold text-[#00377B]" dir="ltr">
                            -2,500
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-5 inset-x-0 flex justify-center">
                  <div className="w-24 h-6 bg-black rounded-full" />
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -left-8 top-20 bg-white rounded-2xl p-4 shadow-xl"
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00D084]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#00D084]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">
                      {language === 'ar' ? 'تمت الموافقة' : 'Approved'}
                    </div>
                    <div className="font-bold text-[#00377B]" dir="ltr">50,000 SAR</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-32 bg-white rounded-2xl p-4 shadow-xl"
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F7941D]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#F7941D]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">
                      {language === 'ar' ? 'معالجة سريعة' : 'Fast Processing'}
                    </div>
                    <div className="font-bold text-[#00377B]">24h</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
}

// ============================================
// STATS SECTION - Bunq Style Floating Cards
// ============================================
function BunqStats() {
  const { language } = useI18n();

  const stats = [
    {
      value: '17+',
      label: language === 'ar' ? 'عاماً من الخبرة' : 'Years Experience',
      icon: Award,
      gradient: GRADIENTS.ocean,
    },
    {
      value: '100K+',
      label: language === 'ar' ? 'عميل سعيد' : 'Happy Clients',
      icon: Users,
      gradient: GRADIENTS.sunset,
    },
    {
      value: '50+',
      label: language === 'ar' ? 'فرع في المملكة' : 'Branches',
      icon: MapPin,
      gradient: GRADIENTS.forest,
    },
    {
      value: '4.9',
      label: language === 'ar' ? 'تقييم العملاء' : 'App Rating',
      icon: Star,
      gradient: GRADIENTS.purple,
    },
  ];

  return (
    <section className="relative py-20 -mt-16 z-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 overflow-hidden h-full">
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: stat.gradient }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: stat.gradient }}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-[#00377B] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FEATURES SECTION - Colorful Cards like Bunq
// ============================================
function BunqFeatures() {
  const { language, dir } = useI18n();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Car,
      title: language === 'ar' ? 'تمويل السيارات' : 'Car Financing',
      description: language === 'ar'
        ? 'احصل على سيارة أحلامك مع خطط سداد مرنة تناسب ميزانيتك'
        : 'Get your dream car with flexible payment plans that fit your budget',
      gradient: GRADIENTS.ocean,
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      href: '/individuals/car-financing',
    },
    {
      icon: Banknote,
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar'
        ? 'تمويل نقدي سريع لتحقيق أهدافك بإجراءات بسيطة وموافقة فورية'
        : 'Quick cash financing to achieve your goals with simple procedures',
      gradient: GRADIENTS.sunset,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
      href: '/individuals/personal-financing',
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar'
        ? 'نمِّ أعمالك مع حلول تمويلية متخصصة للشركات والمؤسسات'
        : 'Grow your business with specialized financing solutions for companies',
      gradient: GRADIENTS.forest,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      href: '/business/cash-financing',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4" />
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#00377B] mb-6">
            {language === 'ar' ? 'حلول تمويلية شاملة' : 'Complete Financing Solutions'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'اختر ما يناسبك من مجموعة واسعة من الحلول التمويلية المتوافقة مع الشريعة'
              : 'Choose from a wide range of Sharia-compliant financing solutions'}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={feature.href}>
                <div className="relative h-[500px] rounded-3xl overflow-hidden cursor-pointer">
                  {/* Background Image */}
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{ background: feature.gradient }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-white/90 mb-6 text-lg">{feature.description}</p>
                    <div className="flex items-center gap-2 font-semibold group-hover:gap-4 transition-all">
                      {language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                      <ArrowIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// WHY CHOOSE US - Bunq Style
// ============================================
function BunqWhyUs() {
  const { language } = useI18n();

  const reasons = [
    {
      icon: BadgeCheck,
      title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant',
      description: language === 'ar'
        ? 'جميع منتجاتنا معتمدة من الهيئة الشرعية'
        : 'All products approved by Sharia Board',
      color: COLORS.green,
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval',
      description: language === 'ar'
        ? 'احصل على موافقة خلال 24 ساعة'
        : 'Get approved within 24 hours',
      color: COLORS.gold,
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'آمن وموثوق' : 'Safe & Secure',
      description: language === 'ar'
        ? 'حماية كاملة لبياناتك ومعاملاتك'
        : 'Complete protection for your data',
      color: COLORS.cyan,
    },
    {
      icon: Headphones,
      title: language === 'ar' ? 'دعم 24/7' : '24/7 Support',
      description: language === 'ar'
        ? 'فريق متخصص لخدمتك على مدار الساعة'
        : 'Dedicated team at your service',
      color: COLORS.pink,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                alt="Professional Service"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,55,123,0.6) 0%, transparent 50%)' }}
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: GRADIENTS.hero }}
                >
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00377B]">17+</div>
                  <div className="text-gray-600">
                    {language === 'ar' ? 'عاماً من التميز' : 'Years of Excellence'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-[#F7941D] rounded-3xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7941D]/10 text-[#F7941D] text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              {language === 'ar' ? 'لماذا أجل؟' : 'Why AJIL?'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#00377B] mb-6 leading-tight">
              {language === 'ar'
                ? 'شريكك الموثوق في رحلة التمويل'
                : 'Your Trusted Partner in Finance'}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {language === 'ar'
                ? 'نحن نؤمن بأن التمويل يجب أن يكون سهلاً وشفافاً ومتاحاً للجميع'
                : 'We believe financing should be easy, transparent, and accessible to everyone'}
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${reason.color}20` }}
                    >
                      <reason.icon className="w-7 h-7" style={{ color: reason.color }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#00377B] mb-1">{reason.title}</h4>
                      <p className="text-sm text-gray-600">{reason.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// HOW IT WORKS - Simple Steps
// ============================================
function BunqHowItWorks() {
  const { language } = useI18n();

  const steps = [
    {
      number: '01',
      title: language === 'ar' ? 'قدّم طلبك' : 'Apply Online',
      description: language === 'ar'
        ? 'قدّم طلبك بسهولة عبر التطبيق أو الموقع'
        : 'Submit your application easily through app or website',
      icon: Smartphone,
    },
    {
      number: '02',
      title: language === 'ar' ? 'المراجعة السريعة' : 'Quick Review',
      description: language === 'ar'
        ? 'فريقنا يراجع طلبك خلال 24 ساعة'
        : 'Our team reviews your application within 24 hours',
      icon: Clock,
    },
    {
      number: '03',
      title: language === 'ar' ? 'احصل على التمويل' : 'Get Funded',
      description: language === 'ar'
        ? 'استلم التمويل مباشرة في حسابك'
        : 'Receive your financing directly in your account',
      icon: Banknote,
    },
  ];

  return (
    <section className="py-20 lg:py-32" style={{ background: GRADIENTS.hero }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
            <Play className="w-4 h-4" />
            {language === 'ar' ? 'كيف يعمل' : 'How It Works'}
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? '3 خطوات فقط' : 'Just 3 Steps'}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'الحصول على التمويل أصبح أسهل من أي وقت مضى'
              : 'Getting financed has never been easier'}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 h-full">
                {/* Number */}
                <div
                  className="text-8xl font-bold opacity-10 absolute top-4 right-4"
                  style={{ color: COLORS.gold }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: COLORS.gold }}
                >
                  <step.icon className="w-8 h-8 text-[#00377B]" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/apply">
            <motion.button
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-[#00377B]"
              style={{ background: COLORS.gold }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey'}
              <ArrowRight className="w-6 h-6 rtl:rotate-180" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// APP DOWNLOAD SECTION
// ============================================
function BunqAppDownload() {
  const { language, dir } = useI18n();

  const features = [
    language === 'ar' ? 'تقديم طلبات التمويل' : 'Submit Financing Applications',
    language === 'ar' ? 'متابعة الأقساط' : 'Track Your Payments',
    language === 'ar' ? 'إدارة حسابك' : 'Manage Your Account',
    language === 'ar' ? 'عروض حصرية' : 'Exclusive Offers',
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={dir === 'rtl' ? 'order-2' : ''}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-6">
              <Smartphone className="w-4 h-4" />
              {language === 'ar' ? 'التطبيق' : 'Mobile App'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#00377B] mb-6 leading-tight">
              {language === 'ar'
                ? 'حمّل تطبيق أجل الآن'
                : 'Download AJIL App Now'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'ar'
                ? 'إدارة تمويلك بكل سهولة من هاتفك. متاح على iOS و Android.'
                : 'Manage your financing easily from your phone. Available on iOS and Android.'}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#00D084] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                className="flex items-center gap-3 px-6 py-4 bg-black rounded-2xl text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-start">
                  <div className="text-xs opacity-80">{language === 'ar' ? 'تحميل من' : 'Download on'}</div>
                  <div className="font-bold">App Store</div>
                </div>
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-3 px-6 py-4 bg-black rounded-2xl text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-start">
                  <div className="text-xs opacity-80">{language === 'ar' ? 'متوفر على' : 'Get it on'}</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative ${dir === 'rtl' ? 'order-1' : ''}`}
          >
            <div className="relative mx-auto w-[280px] sm:w-[320px]">
              {/* Glow Effect */}
              <div
                className="absolute inset-0 blur-3xl opacity-30"
                style={{ background: GRADIENTS.hero }}
              />

              {/* Phone */}
              <motion.div
                className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* App Screen Content */}
                  <div
                    className="h-full flex flex-col items-center justify-center p-8"
                    style={{ background: GRADIENTS.hero }}
                  >
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6">
                      <Image
                        src="/images/AJIL_logo.png"
                        alt="AJIL"
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {language === 'ar' ? 'أجل' : 'AJIL'}
                    </h3>
                    <p className="text-white/80 text-center">
                      {language === 'ar' ? 'للتمويل' : 'Finance'}
                    </p>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-5 inset-x-0 flex justify-center">
                  <div className="w-24 h-6 bg-black rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS - Bunq Style
// ============================================
function BunqTestimonials() {
  const { language } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'رائد أعمال' : 'Entrepreneur',
      quote: language === 'ar'
        ? 'تجربة رائعة مع أجل للتمويل! الموافقة كانت سريعة والفريق متعاون جداً.'
        : 'Amazing experience with AJIL! Quick approval and very cooperative team.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'سارة العمري' : 'Sara Al-Omari',
      role: language === 'ar' ? 'مديرة تنفيذية' : 'Executive Director',
      quote: language === 'ar'
        ? 'أفضل شركة تمويل تعاملت معها. الشفافية والمصداقية في كل خطوة.'
        : 'Best financing company I have dealt with. Transparency at every step.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'خالد السعيد' : 'Khalid Al-Saeed',
      role: language === 'ar' ? 'صاحب أعمال' : 'Business Owner',
      quote: language === 'ar'
        ? 'ساعدتني أجل في توسيع شركتي. شكراً للفريق المحترف!'
        : 'AJIL helped me expand my company. Thanks to the professional team!',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6B9D]/10 text-[#FF6B9D] text-sm font-semibold mb-6">
            <Heart className="w-4 h-4" />
            {language === 'ar' ? 'آراء عملائنا' : 'Testimonials'}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#00377B] mb-6">
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-50 rounded-3xl p-8 lg:p-12 text-center"
            >
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-6 h-6',
                      i < testimonials[activeIndex].rating
                        ? 'fill-[#F7941D] text-[#F7941D]'
                        : 'text-gray-300'
                    )}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-2xl lg:text-3xl text-[#00377B] font-medium mb-8 leading-relaxed">
                "{testimonials[activeIndex].quote}"
              </p>

              {/* Author */}
              <div>
                <div className="font-bold text-xl text-[#00377B] mb-1">
                  {testimonials[activeIndex].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[activeIndex].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-3 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'w-10 bg-[#F7941D]'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
function BunqCTA() {
  const { language, dir } = useI18n();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-32" style={{ background: GRADIENTS.sunset }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            {language === 'ar'
              ? 'مستعد لتحقيق أحلامك؟'
              : 'Ready to Achieve Your Dreams?'}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا'
              : 'Contact us today and get a free consultation from our experts'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply">
              <motion.button
                className="flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-[#00377B] bg-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'قدّم طلبك الآن' : 'Apply Now'}
                <ArrowIcon className="w-6 h-6" />
              </motion.button>
            </Link>
            <a href="tel:8002442211">
              <motion.button
                className="flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg text-white border-2 border-white/50 hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                <span dir="ltr">800 244 2211</span>
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER - Clean Modern Style
// ============================================
function BunqFooter() {
  const { language } = useI18n();

  const footerLinks = [
    {
      title: language === 'ar' ? 'الأفراد' : 'Individuals',
      links: [
        { label: language === 'ar' ? 'تمويل السيارات' : 'Car Financing', href: '/individuals/car-financing' },
        { label: language === 'ar' ? 'التمويل الشخصي' : 'Personal Financing', href: '/individuals/personal-financing' },
        { label: language === 'ar' ? 'معدلات التمويل' : 'Financing Rates', href: '/individuals/rates' },
      ],
    },
    {
      title: language === 'ar' ? 'الأعمال' : 'Business',
      links: [
        { label: language === 'ar' ? 'التمويل النقدي' : 'Cash Financing', href: '/business/cash-financing' },
        { label: language === 'ar' ? 'تمويل السيارات' : 'Fleet Financing', href: '/business/car-financing' },
        { label: language === 'ar' ? 'المعدات الثقيلة' : 'Heavy Equipment', href: '/business/heavy-equipment' },
      ],
    },
    {
      title: language === 'ar' ? 'الشركة' : 'Company',
      links: [
        { label: language === 'ar' ? 'عن أجل' : 'About Us', href: '/about/story' },
        { label: language === 'ar' ? 'الأخبار' : 'News', href: '/about/news' },
        { label: language === 'ar' ? 'الفروع' : 'Branches', href: '/branches' },
        { label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0A0A1A] text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: GRADIENTS.hero }}
              >
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-2xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              {language === 'ar'
                ? 'شركة أجل للتمويل، رائدة في تقديم الحلول التمويلية المتوافقة مع الشريعة الإسلامية في المملكة العربية السعودية.'
                : 'AJIL Finance Company, a pioneer in providing Sharia-compliant financing solutions in Saudi Arabia.'}
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:8002442211" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span dir="ltr">800 244 2211</span>
              </a>
              <a href="mailto:info@ajil.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                info@ajil.com
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-lg mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-start">
            {language === 'ar'
              ? '© 2008-2025 شركة أجل للتمويل - جميع الحقوق محفوظة'
              : '© 2008-2025 AJIL Finance Company - All Rights Reserved'}
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
              {language === 'ar' ? 'الخصوصية' : 'Privacy'}
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
              {language === 'ar' ? 'الشروط' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function BunqStyleHomepage() {
  return (
    <main className="min-h-screen">
      <BunqHeader />
      <BunqHero />
      <BunqStats />
      <BunqFeatures />
      <BunqWhyUs />
      <BunqHowItWorks />
      <BunqAppDownload />
      <BunqTestimonials />
      <BunqCTA />
      <BunqFooter />
    </main>
  );
}
