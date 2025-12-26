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
  Send,
  Receipt,
  Bell,
  Lock,
  Eye,
  Gift,
  Target,
  Percent,
  FileText,
  ChevronRight,
  Play,
  Wifi,
  CircleDollarSign,
  PieChart,
  BarChart3,
  LineChart,
  Layers,
  Box,
  Gem,
  Crown,
  Rocket,
  MousePointer2,
  Fingerprint,
  ScanLine,
  QrCode,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Karta-inspired Color Palette
const COLORS = {
  dark: '#0D0D12',
  darkGray: '#141419',
  purple: '#7C3AED',
  purpleLight: '#A78BFA',
  blue: '#3B82F6',
  cyan: '#06B6D4',
  pink: '#EC4899',
  green: '#10B981',
  orange: '#F59E0B',
  white: '#FFFFFF',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
};

// ============================================
// 3D FLOATING CARD COMPONENT
// ============================================
function FloatingCard3D({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative', className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// ANIMATED GRADIENT BACKGROUND
// ============================================
function KartaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12] via-[#141419] to-[#0D0D12]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 60%)',
          top: '-30%',
          left: '-20%',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #EC4899 0%, transparent 60%)',
          top: '20%',
          right: '-20%',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, transparent 60%)',
          bottom: '-10%',
          left: '30%',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Noise texture - subtle grain */}
      <div className="absolute inset-0 opacity-[0.03]" />
    </div>
  );
}

// ============================================
// CREDIT CARD 3D COMPONENT
// ============================================
function CreditCard3D({ variant = 'purple', className = '' }: { variant?: 'purple' | 'dark' | 'gradient'; className?: string }) {
  const gradients = {
    purple: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)',
    dark: 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #4B5563 100%)',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F59E0B 100%)',
  };

  return (
    <motion.div
      className={cn('relative w-[320px] h-[200px] rounded-2xl overflow-hidden shadow-2xl', className)}
      style={{
        background: gradients[variant],
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Card shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      
      {/* Chip */}
      <div className="absolute top-8 left-8">
        <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
          <div className="w-8 h-6 border-2 border-yellow-600/50 rounded" />
        </div>
      </div>

      {/* Contactless */}
      <div className="absolute top-8 right-8">
        <Wifi className="w-8 h-8 text-white/60 rotate-90" />
      </div>

      {/* Card Number */}
      <div className="absolute bottom-16 left-8 right-8">
        <div className="flex justify-between text-white/90 font-mono text-lg tracking-wider">
          <span>••••</span>
          <span>••••</span>
          <span>••••</span>
          <span>4532</span>
        </div>
      </div>

      {/* Card Holder & Logo */}
      <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
        <div>
          <div className="text-white/50 text-xs uppercase mb-1">Card Holder</div>
          <div className="text-white font-semibold">AJIL FINANCE</div>
        </div>
        <div className="flex gap-1">
          <div className="w-8 h-8 rounded-full bg-red-500/80" />
          <div className="w-8 h-8 rounded-full bg-orange-400/80 -ml-3" />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// HEADER
// ============================================
function KartaHeader() {
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
          isScrolled ? 'bg-[#0D0D12]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Image src="/images/AJIL_logo.png" alt="AJIL" width={28} height={28} className="object-contain" />
              </motion.div>
              <span className="text-white font-bold text-xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-gray-400 hover:text-white font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="text-gray-400 hover:text-white font-medium transition-colors"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <Link href="/apply">
                <motion.button
                  className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-semibold rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[85%] max-w-sm h-full bg-[#0D0D12] z-50`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-white font-bold text-xl">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="absolute bottom-8 left-6 right-6">
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold rounded-full">
                      {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
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
// HERO SECTION - Karta Style with 3D Cards
// ============================================
function KartaHero() {
  const { language, dir } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <KartaBackground />

      <motion.div
        className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-20"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#10B981]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-gray-400 text-sm">{language === 'ar' ? 'تمويل متوافق مع الشريعة' : 'Sharia-Compliant'}</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">{language === 'ar' ? 'تمويل' : 'Finance'}</span>
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent">
                {language === 'ar' ? 'المستقبل' : 'Reimagined'}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'ar'
                ? 'حلول تمويلية مبتكرة بتقنيات حديثة. موافقة فورية، شفافية كاملة، وتجربة سلسة.'
                : 'Innovative financing solutions with modern technology. Instant approval, full transparency, and seamless experience.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/apply">
                <motion.button
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold text-lg rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </motion.button>
              </Link>
              <Link href="/calculator">
                <motion.button
                  className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calculator className="w-5 h-5" />
                  {language === 'ar' ? 'احسب تمويلك' : 'Calculate'}
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '100K+', label: language === 'ar' ? 'عميل' : 'Customers' },
                { value: 'SAR 5B+', label: language === 'ar' ? 'تمويل' : 'Financed' },
                { value: '4.9★', label: language === 'ar' ? 'تقييم' : 'Rating' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-start">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - 3D Cards Stack */}
          <div className="relative flex justify-center items-center min-h-[500px]">
            {/* Background glow */}
            <div className="absolute w-[400px] h-[400px] bg-[#7C3AED]/20 rounded-full blur-[100px]" />

            {/* Cards Stack */}
            <div className="relative">
              {/* Back Card */}
              <FloatingCard3D className="absolute top-10 -left-10 transform -rotate-12" delay={0.6}>
                <CreditCard3D variant="dark" />
              </FloatingCard3D>

              {/* Middle Card */}
              <FloatingCard3D className="absolute top-5 left-5 transform rotate-6" delay={0.4}>
                <CreditCard3D variant="gradient" />
              </FloatingCard3D>

              {/* Front Card */}
              <FloatingCard3D delay={0.2}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <CreditCard3D variant="purple" />
                </motion.div>
              </FloatingCard3D>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-10 -right-10 bg-[#141419] rounded-2xl p-4 border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{language === 'ar' ? 'تمت الموافقة' : 'Approved'}</div>
                    <div className="text-white font-semibold">50,000 SAR</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-16 bg-[#141419] rounded-2xl p-4 border border-white/10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{language === 'ar' ? 'سريع' : 'Instant'}</div>
                    <div className="text-white font-semibold">24h</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-gray-500 text-sm">{language === 'ar' ? 'اكتشف المزيد' : 'Scroll to explore'}</span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </motion.div>
    </section>
  );
}

// ============================================
// FEATURES SECTION
// ============================================
function KartaFeatures() {
  const { language, dir } = useI18n();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Car,
      title: language === 'ar' ? 'تمويل السيارات' : 'Car Financing',
      description: language === 'ar' ? 'احصل على سيارة أحلامك بسهولة' : 'Get your dream car easily',
      color: '#7C3AED',
      href: '/individuals/car-financing',
    },
    {
      icon: Banknote,
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar' ? 'تمويل نقدي سريع وبدون تعقيدات' : 'Quick cash, no complications',
      color: '#EC4899',
      href: '/individuals/personal-financing',
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar' ? 'نمِّ أعمالك مع حلولنا' : 'Grow your business with us',
      color: '#06B6D4',
      href: '/business/cash-financing',
    },
    {
      icon: Calculator,
      title: language === 'ar' ? 'حاسبة ذكية' : 'Smart Calculator',
      description: language === 'ar' ? 'احسب أقساطك بدقة' : 'Calculate your payments accurately',
      color: '#10B981',
      href: '/calculator',
    },
  ];

  return (
    <section className="py-24 bg-[#0D0D12] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-semibold text-sm mb-4">
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? 'كل ما تحتاجه' : 'Everything you need'}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'حلول تمويلية شاملة مصممة لتناسب احتياجاتك'
              : 'Comprehensive financing solutions designed for your needs'}
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
                  className="relative bg-[#141419] rounded-3xl p-8 border border-white/5 h-full group overflow-hidden"
                  whileHover={{ y: -8, borderColor: `${feature.color}30` }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${feature.color}10, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${feature.color}15` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 mb-6">{feature.description}</p>
                    <div className="flex items-center gap-2 font-medium group-hover:gap-4 transition-all" style={{ color: feature.color }}>
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
// WHY US SECTION
// ============================================
function KartaWhyUs() {
  const { language } = useI18n();

  const reasons = [
    { icon: BadgeCheck, title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant', color: '#10B981' },
    { icon: Zap, title: language === 'ar' ? 'موافقة فورية' : 'Instant Approval', color: '#F59E0B' },
    { icon: Shield, title: language === 'ar' ? 'آمن 100%' : '100% Secure', color: '#3B82F6' },
    { icon: Headphones, title: language === 'ar' ? 'دعم 24/7' : '24/7 Support', color: '#EC4899' },
    { icon: Percent, title: language === 'ar' ? 'أسعار تنافسية' : 'Best Rates', color: '#7C3AED' },
    { icon: Target, title: language === 'ar' ? 'حلول مخصصة' : 'Custom Solutions', color: '#06B6D4' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0D0D12] to-[#141419]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#EC4899]/20 rounded-3xl blur-[80px]" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-[#141419] to-[#1F1F28] rounded-3xl p-8 border border-white/5">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '17+', label: language === 'ar' ? 'عاماً' : 'Years', icon: Award },
                    { value: '100K+', label: language === 'ar' ? 'عميل' : 'Clients', icon: Users },
                    { value: '50+', label: language === 'ar' ? 'فرع' : 'Branches', icon: Building2 },
                    { value: '4.9★', label: language === 'ar' ? 'تقييم' : 'Rating', icon: Star },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/5 rounded-2xl p-6 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <stat.icon className="w-8 h-8 text-[#7C3AED] mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-500 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#EC4899]/10 text-[#EC4899] font-semibold text-sm mb-6">
              {language === 'ar' ? 'لماذا أجل؟' : 'Why AJIL?'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'ar' ? 'شريكك الموثوق في التمويل' : 'Your trusted finance partner'}
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              {language === 'ar'
                ? 'نقدم لك أفضل الحلول التمويلية بشفافية كاملة وخدمة استثنائية'
                : 'We provide the best financing solutions with complete transparency and exceptional service'}
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-2 gap-4">
              {reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${reason.color}15` }}
                  >
                    <reason.icon className="w-5 h-5" style={{ color: reason.color }} />
                  </div>
                  <span className="text-white font-medium text-sm">{reason.title}</span>
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
// PROCESS SECTION
// ============================================
function KartaProcess() {
  const { language } = useI18n();

  const steps = [
    { icon: Smartphone, title: language === 'ar' ? 'قدّم طلبك' : 'Apply', color: '#7C3AED' },
    { icon: ScanLine, title: language === 'ar' ? 'التحقق' : 'Verify', color: '#EC4899' },
    { icon: BadgeCheck, title: language === 'ar' ? 'الموافقة' : 'Approve', color: '#10B981' },
    { icon: Banknote, title: language === 'ar' ? 'استلم' : 'Receive', color: '#F59E0B' },
  ];

  return (
    <section className="py-24 bg-[#141419]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] font-semibold text-sm mb-4">
            {language === 'ar' ? 'كيف يعمل' : 'How it works'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {language === 'ar' ? '4 خطوات سهلة' : '4 easy steps'}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8">
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
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
              )}

              <motion.div
                className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center relative"
                style={{ backgroundColor: `${step.color}15` }}
                whileHover={{ scale: 1.1 }}
              >
                <step.icon className="w-12 h-12" style={{ color: step.color }} />
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: step.color }}
                >
                  {idx + 1}
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
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
              className="px-10 py-5 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold text-lg rounded-full"
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
// APP SECTION
// ============================================
function KartaApp() {
  const { language, dir } = useI18n();

  return (
    <section className="py-24 bg-[#0D0D12] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={dir === 'rtl' ? 'lg:order-2' : ''}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-semibold text-sm mb-6">
              {language === 'ar' ? 'التطبيق' : 'Mobile App'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'ar' ? 'إدارة تمويلك بسهولة' : 'Manage your finance easily'}
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              {language === 'ar'
                ? 'حمّل التطبيق وتمتع بتجربة سلسة ومريحة'
                : 'Download the app and enjoy a seamless experience'}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: Fingerprint, label: language === 'ar' ? 'تسجيل آمن' : 'Secure Login' },
                { icon: Bell, label: language === 'ar' ? 'إشعارات فورية' : 'Instant Alerts' },
                { icon: CreditCard, label: language === 'ar' ? 'دفع سهل' : 'Easy Payments' },
                { icon: Gift, label: language === 'ar' ? 'عروض حصرية' : 'Exclusive Offers' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <span className="text-white font-medium text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Download */}
            <div className="flex flex-wrap gap-4">
              <motion.a href="#" className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl" whileHover={{ scale: 1.05 }}>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="black">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-start text-black">
                  <div className="text-xs opacity-60">Download on</div>
                  <div className="font-bold">App Store</div>
                </div>
              </motion.a>
              <motion.a href="#" className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl" whileHover={{ scale: 1.05 }}>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="black">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-start text-black">
                  <div className="text-xs opacity-60">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative flex justify-center ${dir === 'rtl' ? 'lg:order-1' : ''}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/30 to-[#EC4899]/30 rounded-full blur-[100px]" />
              <motion.div
                className="relative w-[280px] bg-gradient-to-b from-[#1F1F28] to-[#0D0D12] rounded-[3rem] p-2 border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-[2.5rem] overflow-hidden aspect-[9/19] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <Image src="/images/AJIL_logo.png" alt="AJIL" width={60} height={60} className="object-contain" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{language === 'ar' ? 'أجل' : 'AJIL'}</h3>
                    <p className="text-white/80">{language === 'ar' ? 'للتمويل' : 'Finance'}</p>
                  </div>
                </div>
                <div className="absolute top-3 inset-x-0 flex justify-center">
                  <div className="w-20 h-5 bg-[#0D0D12] rounded-full" />
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
// CTA SECTION
// ============================================
function KartaCTA() {
  const { language } = useI18n();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start your journey today'}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {language === 'ar'
              ? 'انضم إلى آلاف العملاء السعداء'
              : 'Join thousands of happy customers'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply">
              <motion.button
                className="flex items-center gap-2 px-10 py-5 bg-white text-[#7C3AED] font-bold text-lg rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'قدّم طلبك الآن' : 'Get Started Free'}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </motion.button>
            </Link>
            <a href="tel:8002442211">
              <motion.button
                className="flex items-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border border-white/20"
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
function KartaFooter() {
  const { language } = useI18n();

  return (
    <footer className="py-16 bg-[#0D0D12] border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                <Image src="/images/AJIL_logo.png" alt="AJIL" width={28} height={28} className="object-contain" />
              </div>
              <span className="text-white font-bold text-xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
            </Link>
            <p className="text-gray-500 mb-6 max-w-sm">
              {language === 'ar'
                ? 'شركة أجل للتمويل، شريكك في رحلة النجاح المالي.'
                : 'AJIL Finance, your partner in financial success.'}
            </p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'linkedin'].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#7C3AED]/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-5 h-5 bg-gray-500 rounded-sm" />
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
                    <Link href={link.href} className="text-gray-500 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            {language === 'ar' ? '© 2025 شركة أجل للتمويل' : '© 2025 AJIL Finance Company'}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-white">{language === 'ar' ? 'الخصوصية' : 'Privacy'}</Link>
            <Link href="/terms" className="text-gray-600 hover:text-white">{language === 'ar' ? 'الشروط' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function KartaStyleHomepage() {
  return (
    <main className="min-h-screen bg-[#0D0D12]">
      <KartaHeader />
      <KartaHero />
      <KartaFeatures />
      <KartaWhyUs />
      <KartaProcess />
      <KartaApp />
      <KartaCTA />
      <KartaFooter />
    </main>
  );
}
