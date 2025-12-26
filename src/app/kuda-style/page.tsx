'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
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
  Headphones,
  Wallet,
  PiggyBank,
  Send,
  Receipt,
  Bell,
  Lock,
  Eye,
  Gift,
  Target,
  CircleDollarSign,
  Percent,
  FileText,
  ChevronRight,
  Play,
  Download,
  QrCode,
  Fingerprint,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Kuda-inspired Color Palette - Purple/Gradient Theme
const COLORS = {
  purple: '#40196D',
  purpleLight: '#5C2D91',
  purpleDark: '#2D1150',
  pink: '#E91E63',
  magenta: '#AA00FF',
  cyan: '#00BCD4',
  yellow: '#FFD600',
  green: '#00C853',
  orange: '#FF6D00',
  white: '#FFFFFF',
  gray: '#F5F5F7',
  dark: '#1A1A2E',
};

// Gradient Definitions
const GRADIENTS = {
  hero: 'linear-gradient(135deg, #40196D 0%, #5C2D91 50%, #7B3FA0 100%)',
  purple: 'linear-gradient(135deg, #40196D 0%, #AA00FF 100%)',
  pink: 'linear-gradient(135deg, #E91E63 0%, #AA00FF 100%)',
  cyan: 'linear-gradient(135deg, #00BCD4 0%, #40196D 100%)',
  dark: 'linear-gradient(135deg, #1A1A2E 0%, #40196D 100%)',
};

// ============================================
// ANIMATED BACKGROUND - Kuda Style Blobs
// ============================================
function KudaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0" style={{ background: GRADIENTS.hero }} />
      
      {/* Animated Blobs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, #AA00FF 0%, transparent 70%)',
          top: '-20%',
          right: '-20%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #E91E63 0%, transparent 70%)',
          bottom: '-10%',
          left: '-10%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, #00BCD4 0%, transparent 70%)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          scale: [1, 1.4, 1],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// ============================================
// HEADER - Kuda Style
// ============================================
function KudaHeader() {
  const { language, setLanguage, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: language === 'ar' ? 'الأفراد' : 'Personal', href: '/individuals/car-financing' },
    { label: language === 'ar' ? 'الأعمال' : 'Business', href: '/business/cash-financing' },
    { label: language === 'ar' ? 'الحاسبة' : 'Calculator', href: '/calculator' },
    { label: language === 'ar' ? 'عن أجل' : 'About', href: '/about/story' },
  ];

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-[#40196D]/95 backdrop-blur-xl shadow-xl' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Image src="/images/AJIL_logo.png" alt="AJIL" width={36} height={36} className="object-contain" />
              </motion.div>
              <span className="text-white font-bold text-2xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-white/80 hover:text-white font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD600] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="text-white/80 hover:text-white font-medium"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <Link href="/login">
                <motion.button
                  className="px-6 py-2.5 text-white font-semibold border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'دخول' : 'Sign In'}
                </motion.button>
              </Link>
              <Link href="/apply">
                <motion.button
                  className="px-6 py-2.5 bg-[#FFD600] text-[#40196D] font-bold rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'قدّم طلبك' : 'Get Started'}
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

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
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[85%] max-w-sm h-full z-50`}
              style={{ background: GRADIENTS.hero }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-white font-bold text-xl">{language === 'ar' ? 'القائمة' : 'Menu'}</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="absolute bottom-8 left-6 right-6 space-y-3">
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-4 bg-[#FFD600] text-[#40196D] font-bold rounded-full">
                      {language === 'ar' ? 'قدّم طلبك الآن' : 'Get Started'}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// HERO SECTION - Kuda Style
// ============================================
function KudaHero() {
  const { language, dir } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <KudaBackground />

      <motion.div
        className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-20"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white text-center lg:text-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#00C853]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'تمويل متوافق مع الشريعة' : 'Sharia-Compliant Finance'}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {language === 'ar' ? (
                <>
                  <span className="block">التمويل الذي</span>
                  <span className="block text-[#FFD600]">تستحقه</span>
                </>
              ) : (
                <>
                  <span className="block">The finance</span>
                  <span className="block text-[#FFD600]">you deserve</span>
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-white/80 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'ar'
                ? 'تمويل سهل وسريع بدون تعقيدات. احصل على الموافقة في دقائق وحقق أحلامك اليوم.'
                : 'Easy and fast financing without complications. Get approved in minutes and achieve your dreams today.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/apply">
                <motion.button
                  className="flex items-center gap-2 px-8 py-4 bg-[#FFD600] text-[#40196D] font-bold text-lg rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </motion.button>
              </Link>
              <Link href="/calculator">
                <motion.button
                  className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calculator className="w-5 h-5" />
                  {language === 'ar' ? 'احسب تمويلك' : 'Calculate'}
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '100K+', label: language === 'ar' ? 'عميل' : 'Customers' },
                { value: '4.9★', label: language === 'ar' ? 'تقييم' : 'Rating' },
                { value: '24h', label: language === 'ar' ? 'موافقة' : 'Approval' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-[#FFD600]">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Phone Mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Glow Effect */}
            <div className="absolute w-[400px] h-[400px] bg-[#AA00FF]/30 rounded-full blur-[100px]" />

            {/* Main Phone */}
            <motion.div
              className="relative w-[280px] sm:w-[320px]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-[#40196D] rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* App Screen */}
                  <div className="h-full p-5 pt-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-white/60 text-xs">{language === 'ar' ? 'مرحباً' : 'Hello'}</div>
                        <div className="text-white font-bold text-lg">{language === 'ar' ? 'أحمد 👋' : 'Ahmed 👋'}</div>
                      </div>
                      <motion.div
                        className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Bell className="w-5 h-5 text-[#40196D]" />
                      </motion.div>
                    </div>

                    {/* Balance Card */}
                    <motion.div
                      className="bg-gradient-to-br from-[#5C2D91] to-[#AA00FF] rounded-2xl p-5 mb-5"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">{language === 'ar' ? 'المبلغ المتبقي' : 'Balance'}</span>
                        <Eye className="w-4 h-4 text-white/70" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-3" dir="ltr">125,000 SAR</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#FFD600] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 1.5, delay: 1 }}
                          />
                        </div>
                        <span className="text-xs text-[#FFD600]">65%</span>
                      </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-4 gap-2 mb-5">
                      {[
                        { icon: Send, label: language === 'ar' ? 'دفع' : 'Pay', color: '#FFD600' },
                        { icon: Receipt, label: language === 'ar' ? 'كشف' : 'Bills', color: '#00BCD4' },
                        { icon: PiggyBank, label: language === 'ar' ? 'ادخار' : 'Save', color: '#00C853' },
                        { icon: Gift, label: language === 'ar' ? 'عروض' : 'Offers', color: '#E91E63' },
                      ].map((action, idx) => (
                        <motion.div
                          key={idx}
                          className="flex flex-col items-center gap-1 p-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${action.color}20` }}
                          >
                            <action.icon className="w-5 h-5" style={{ color: action.color }} />
                          </div>
                          <span className="text-white/70 text-[10px]">{action.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <div className="text-white/60 text-xs mb-3">{language === 'ar' ? 'آخر العمليات' : 'Recent'}</div>
                      {[
                        { icon: Check, title: language === 'ar' ? 'دفعة ناجحة' : 'Payment Success', amount: '-2,500', color: '#00C853' },
                        { icon: TrendingUp, title: language === 'ar' ? 'تمويل جديد' : 'New Finance', amount: '+50,000', color: '#FFD600' },
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 + idx * 0.2 }}
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${item.color}20` }}
                          >
                            <item.icon className="w-4 h-4" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm">{item.title}</div>
                          </div>
                          <span className="text-white font-semibold text-sm" dir="ltr">{item.amount}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Notch */}
                  <div className="absolute top-3 inset-x-0 flex justify-center">
                    <div className="w-24 h-6 bg-black rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -left-4 top-20 bg-white rounded-2xl p-4 shadow-xl"
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00C853]/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#00C853]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">{language === 'ar' ? 'تمت الموافقة' : 'Approved'}</div>
                  <div className="font-bold text-[#40196D]" dir="ltr">50,000 SAR</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-40 bg-white rounded-2xl p-4 shadow-xl"
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFD600]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#FFD600]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">{language === 'ar' ? 'سريع' : 'Fast'}</div>
                  <div className="font-bold text-[#40196D]">24h</div>
                </div>
              </div>
            </motion.div>
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
// FEATURES SECTION - Kuda Style Cards
// ============================================
function KudaFeatures() {
  const { language, dir } = useI18n();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Car,
      title: language === 'ar' ? 'تمويل السيارات' : 'Car Financing',
      description: language === 'ar'
        ? 'احصل على سيارة أحلامك بسهولة مع أقساط مريحة'
        : 'Get your dream car easily with comfortable installments',
      color: '#FFD600',
      href: '/individuals/car-financing',
    },
    {
      icon: Banknote,
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar'
        ? 'تمويل نقدي سريع لتلبية احتياجاتك الشخصية'
        : 'Quick cash financing to meet your personal needs',
      color: '#00BCD4',
      href: '/individuals/personal-financing',
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar'
        ? 'حلول تمويلية متخصصة لنمو أعمالك'
        : 'Specialized financing solutions for your business growth',
      color: '#E91E63',
      href: '/business/cash-financing',
    },
    {
      icon: Calculator,
      title: language === 'ar' ? 'حاسبة التمويل' : 'Finance Calculator',
      description: language === 'ar'
        ? 'احسب قسطك الشهري بسهولة وشفافية'
        : 'Calculate your monthly payment easily and transparently',
      color: '#00C853',
      href: '/calculator',
    },
  ];

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
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-[#40196D]/10 text-[#40196D] font-semibold text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </motion.span>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#40196D] mb-6">
            {language === 'ar' ? 'كل ما تحتاجه في مكان واحد' : 'Everything in one place'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'حلول تمويلية شاملة مصممة لتناسب احتياجاتك'
              : 'Comprehensive financing solutions designed to fit your needs'}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={feature.href}>
                <motion.div
                  className="relative bg-white rounded-3xl p-8 border border-gray-100 h-full group overflow-hidden"
                  whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
                >
                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${feature.color}10, ${feature.color}05)` }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${feature.color}15` }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#40196D] mb-3 group-hover:text-[#40196D]">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center gap-2 font-semibold group-hover:gap-4 transition-all" style={{ color: feature.color }}>
                      <span>{language === 'ar' ? 'المزيد' : 'Learn more'}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// WHY AJIL SECTION
// ============================================
function KudaWhyUs() {
  const { language } = useI18n();

  const reasons = [
    { icon: BadgeCheck, title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant', color: '#00C853' },
    { icon: Zap, title: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval', color: '#FFD600' },
    { icon: Shield, title: language === 'ar' ? 'آمن 100%' : '100% Secure', color: '#00BCD4' },
    { icon: Headphones, title: language === 'ar' ? 'دعم 24/7' : '24/7 Support', color: '#E91E63' },
    { icon: Percent, title: language === 'ar' ? 'أسعار تنافسية' : 'Best Rates', color: '#AA00FF' },
    { icon: Target, title: language === 'ar' ? 'حلول مخصصة' : 'Custom Solutions', color: '#FF6D00' },
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: GRADIENTS.hero }}>
      <KudaBackground />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-[#FFD600] font-semibold text-sm mb-6">
              {language === 'ar' ? 'لماذا أجل؟' : 'Why AJIL?'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'ar'
                ? 'نحن هنا لنجعل التمويل سهلاً'
                : "We're here to make financing easy"}
            </h2>
            <p className="text-xl text-white/80 mb-10">
              {language === 'ar'
                ? 'أكثر من 17 عاماً من الخبرة في خدمة عملائنا بتميز وشفافية'
                : 'Over 17 years of experience serving our customers with excellence and transparency'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '17+', label: language === 'ar' ? 'عاماً' : 'Years' },
                { value: '100K+', label: language === 'ar' ? 'عميل' : 'Clients' },
                { value: '50+', label: language === 'ar' ? 'فرع' : 'Branches' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-4xl font-bold text-[#FFD600] mb-1">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Reasons Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${reason.color}20` }}
                >
                  <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
                </div>
                <h4 className="text-white font-semibold">{reason.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// HOW IT WORKS
// ============================================
function KudaProcess() {
  const { language } = useI18n();

  const steps = [
    { icon: Smartphone, title: language === 'ar' ? 'قدّم طلبك' : 'Apply', desc: language === 'ar' ? 'قدّم طلبك أونلاين' : 'Apply online', color: '#FFD600' },
    { icon: FileText, title: language === 'ar' ? 'المراجعة' : 'Review', desc: language === 'ar' ? 'نراجع طلبك' : 'We review', color: '#00BCD4' },
    { icon: BadgeCheck, title: language === 'ar' ? 'الموافقة' : 'Approval', desc: language === 'ar' ? 'خلال 24 ساعة' : 'Within 24h', color: '#00C853' },
    { icon: Banknote, title: language === 'ar' ? 'استلم' : 'Receive', desc: language === 'ar' ? 'استلم تمويلك' : 'Get funded', color: '#E91E63' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#F5F5F7]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#40196D]/10 text-[#40196D] font-semibold text-sm mb-4">
            {language === 'ar' ? 'كيف يعمل' : 'How it works'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#40196D] mb-6">
            {language === 'ar' ? '4 خطوات بسيطة' : '4 simple steps'}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              {/* Connector */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-[#40196D]/20" />
              )}

              {/* Step Number */}
              <motion.div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative"
                style={{ backgroundColor: `${step.color}20` }}
                whileHover={{ scale: 1.1 }}
              >
                <step.icon className="w-10 h-10" style={{ color: step.color }} />
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: step.color }}
                >
                  {idx + 1}
                </div>
              </motion.div>

              <h3 className="text-xl font-bold text-[#40196D] mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
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
              className="px-10 py-5 bg-[#40196D] text-white font-bold text-lg rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'ar' ? 'ابدأ الآن' : 'Get Started Now'}
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
function KudaApp() {
  const { language, dir } = useI18n();

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={dir === 'rtl' ? 'lg:order-2' : ''}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#40196D]/10 text-[#40196D] font-semibold text-sm mb-6">
              {language === 'ar' ? 'التطبيق' : 'Mobile App'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#40196D] mb-6 leading-tight">
              {language === 'ar' ? 'إدارة تمويلك من هاتفك' : 'Manage your finance on the go'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'ar'
                ? 'حمّل التطبيق واستمتع بتجربة تمويل سلسة ومريحة'
                : 'Download the app and enjoy a seamless financing experience'}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Fingerprint, label: language === 'ar' ? 'تسجيل دخول آمن' : 'Secure login' },
                { icon: Bell, label: language === 'ar' ? 'إشعارات فورية' : 'Instant notifications' },
                { icon: CreditCard, label: language === 'ar' ? 'دفع سهل' : 'Easy payments' },
                { icon: Gift, label: language === 'ar' ? 'عروض حصرية' : 'Exclusive offers' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#40196D]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#40196D]" />
                  </div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                className="flex items-center gap-3 px-6 py-4 bg-black rounded-2xl text-white"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-start">
                  <div className="text-xs opacity-60">Download on</div>
                  <div className="font-bold">App Store</div>
                </div>
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-3 px-6 py-4 bg-black rounded-2xl text-white"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-start">
                  <div className="text-xs opacity-60">Get it on</div>
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
            className={`relative flex justify-center ${dir === 'rtl' ? 'lg:order-1' : ''}`}
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-[#40196D]/20 blur-[100px] rounded-full" />

              <motion.div
                className="relative w-[280px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="rounded-[2.5rem] overflow-hidden aspect-[9/19]" style={{ background: GRADIENTS.hero }}>
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
                        <Image src="/images/AJIL_logo.png" alt="AJIL" width={60} height={60} className="object-contain" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{language === 'ar' ? 'أجل' : 'AJIL'}</h3>
                      <p className="text-white/80">{language === 'ar' ? 'للتمويل' : 'Finance'}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 inset-x-0 flex justify-center">
                  <div className="w-20 h-5 bg-black rounded-full" />
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
// TESTIMONIALS
// ============================================
function KudaTestimonials() {
  const { language } = useI18n();
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      quote: language === 'ar'
        ? 'تجربة رائعة! حصلت على الموافقة في نفس اليوم. شكراً أجل!'
        : 'Amazing experience! Got approved the same day. Thanks AJIL!',
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'رائد أعمال' : 'Entrepreneur',
    },
    {
      quote: language === 'ar'
        ? 'أفضل شركة تمويل تعاملت معها. سرعة وشفافية!'
        : 'Best financing company I dealt with. Fast and transparent!',
      name: language === 'ar' ? 'سارة العمري' : 'Sara Al-Omari',
      role: language === 'ar' ? 'مديرة' : 'Manager',
    },
    {
      quote: language === 'ar'
        ? 'خدمة عملاء ممتازة ومتوفرة دائماً. أنصح الجميع!'
        : 'Excellent customer service, always available. Highly recommend!',
      name: language === 'ar' ? 'خالد السعيد' : 'Khalid Al-Saeed',
      role: language === 'ar' ? 'صاحب أعمال' : 'Business Owner',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 lg:py-32" style={{ background: GRADIENTS.hero }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-[#FFD600] font-semibold text-sm mb-4">
            {language === 'ar' ? 'آراء العملاء' : 'Testimonials'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What customers say'}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#FFD600] text-[#FFD600]" />
                ))}
              </div>
              <p className="text-2xl lg:text-3xl text-white font-medium mb-8 leading-relaxed">
                "{testimonials[active].quote}"
              </p>
              <div className="text-white font-bold text-lg">{testimonials[active].name}</div>
              <div className="text-white/60">{testimonials[active].role}</div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  idx === active ? 'w-8 bg-[#FFD600]' : 'w-2 bg-white/30'
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
function KudaCTA() {
  const { language } = useI18n();

  return (
    <section className="py-20 lg:py-32 bg-[#FFD600]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-[#40196D] mb-6">
            {language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start your journey today'}
          </h2>
          <p className="text-xl text-[#40196D]/80 mb-10">
            {language === 'ar'
              ? 'انضم إلى آلاف العملاء السعداء واحصل على تمويلك بسهولة'
              : 'Join thousands of happy customers and get financed easily'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply">
              <motion.button
                className="flex items-center gap-2 px-10 py-5 bg-[#40196D] text-white font-bold text-lg rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'قدّم طلبك الآن' : 'Get Started Free'}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </motion.button>
            </Link>
            <a href="tel:8002442211">
              <motion.button
                className="flex items-center gap-2 px-10 py-5 bg-[#40196D]/10 text-[#40196D] font-bold text-lg rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
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
// FOOTER
// ============================================
function KudaFooter() {
  const { language } = useI18n();

  return (
    <footer className="py-16" style={{ background: GRADIENTS.dark }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                <Image src="/images/AJIL_logo.png" alt="AJIL" width={36} height={36} className="object-contain" />
              </div>
              <span className="text-white font-bold text-2xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              {language === 'ar'
                ? 'شركة أجل للتمويل، شريكك الموثوق في رحلة التمويل.'
                : 'AJIL Finance, your trusted partner in your financing journey.'}
            </p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'linkedin'].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD600] transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-5 h-5 bg-current rounded-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: language === 'ar' ? 'الخدمات' : 'Services',
              links: [
                { label: language === 'ar' ? 'تمويل السيارات' : 'Car Finance', href: '/individuals/car-financing' },
                { label: language === 'ar' ? 'التمويل الشخصي' : 'Personal', href: '/individuals/personal-financing' },
                { label: language === 'ar' ? 'الأعمال' : 'Business', href: '/business/cash-financing' },
              ],
            },
            {
              title: language === 'ar' ? 'الشركة' : 'Company',
              links: [
                { label: language === 'ar' ? 'عن أجل' : 'About', href: '/about/story' },
                { label: language === 'ar' ? 'الفروع' : 'Branches', href: '/branches' },
                { label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
              ],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="text-white font-bold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {language === 'ar' ? '© 2025 شركة أجل للتمويل' : '© 2025 AJIL Finance Company'}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/40 hover:text-white">{language === 'ar' ? 'الخصوصية' : 'Privacy'}</Link>
            <Link href="/terms" className="text-white/40 hover:text-white">{language === 'ar' ? 'الشروط' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function KudaStyleHomepage() {
  return (
    <main className="min-h-screen">
      <KudaHeader />
      <KudaHero />
      <KudaFeatures />
      <KudaWhyUs />
      <KudaProcess />
      <KudaApp />
      <KudaTestimonials />
      <KudaCTA />
      <KudaFooter />
    </main>
  );
}
