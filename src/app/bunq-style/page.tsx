'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Wallet,
  PiggyBank,
  Target,
  Gem,
  Crown,
  Rocket,
  Gift,
  Bell,
  Settings,
  ChevronRight,
  MousePointer,
  Fingerprint,
  QrCode,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Vibrant Color Palette
const COLORS = {
  primary: '#00377B',
  secondary: '#0066B3',
  accent: '#F7941D',
  success: '#00D084',
  pink: '#FF6B9D',
  purple: '#8B5CF6',
  cyan: '#22D3EE',
  yellow: '#FBBF24',
  coral: '#FF7F6B',
  mint: '#34D399',
  lavender: '#A78BFA',
  peach: '#FDBA74',
};

// ============================================
// ANIMATED BACKGROUND COMPONENT
// ============================================
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,102,179,0.4) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(247,148,29,0.3) 0%, transparent 70%)',
            top: '50%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 70%)',
            bottom: '10%',
            left: '30%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#F7941D', '#22D3EE', '#00D084', '#FF6B9D', '#8B5CF6'][i % 5],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// ============================================
// MAGNETIC BUTTON COMPONENT
// ============================================
function MagneticButton({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ============================================
// GLOWING CARD COMPONENT
// ============================================
function GlowingCard({ children, className, glowColor = COLORS.accent }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative overflow-hidden rounded-3xl', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      {children}
    </motion.div>
  );
}

// ============================================
// HEADER
// ============================================
function BunqHeader() {
  const { language, setLanguage, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative w-12 h-12 rounded-2xl overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/images/AJIL_logo.png" alt="AJIL" fill className="object-contain p-2" />
              </motion.div>
              <span className={cn(
                'font-bold text-2xl transition-colors',
                isScrolled ? 'text-[#00377B]' : 'text-white'
              )}>
                {language === 'ar' ? 'أجل' : 'AJIL'}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { label: language === 'ar' ? 'الأفراد' : 'Individuals', href: '/individuals/car-financing' },
                { label: language === 'ar' ? 'الأعمال' : 'Business', href: '/business/cash-financing' },
                { label: language === 'ar' ? 'الحاسبة' : 'Calculator', href: '/calculator' },
                { label: language === 'ar' ? 'العروض' : 'Offers', href: '/offers' },
                { label: language === 'ar' ? 'عن أجل' : 'About', href: '/about/story' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className={cn(
                    'relative px-5 py-2.5 font-semibold transition-colors group',
                    isScrolled ? 'text-[#00377B]/70 hover:text-[#00377B]' : 'text-white/80 hover:text-white'
                  )}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-0.5 bg-[#F7941D] rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ width: '60%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className={cn(
                  'px-4 py-2 rounded-xl font-medium transition-colors',
                  isScrolled ? 'text-[#00377B] hover:bg-[#00377B]/10' : 'text-white hover:bg-white/10'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </motion.button>
              <Link href="/apply">
                <MagneticButton
                  className="px-6 py-3 bg-gradient-to-r from-[#F7941D] to-[#FF6B9D] text-white font-bold rounded-xl shadow-lg shadow-[#F7941D]/30"
                >
                  {language === 'ar' ? 'قدّم طلبك' : 'Apply Now'}
                </MagneticButton>
              </Link>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'lg:hidden w-12 h-12 rounded-xl flex items-center justify-center',
                isScrolled ? 'bg-[#00377B]/10' : 'bg-white/10'
              )}
            >
              <Menu className={cn('w-6 h-6', isScrolled ? 'text-[#00377B]' : 'text-white')} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
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
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[85%] max-w-sm h-full bg-white z-50`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-xl text-[#00377B]">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {[
                    { label: language === 'ar' ? 'الأفراد' : 'Individuals', href: '/individuals/car-financing' },
                    { label: language === 'ar' ? 'الأعمال' : 'Business', href: '/business/cash-financing' },
                    { label: language === 'ar' ? 'الحاسبة' : 'Calculator', href: '/calculator' },
                    { label: language === 'ar' ? 'العروض' : 'Offers', href: '/offers' },
                    { label: language === 'ar' ? 'عن أجل' : 'About', href: '/about/story' },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl hover:bg-gray-100 text-[#00377B] font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="absolute bottom-6 left-6 right-6">
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-4 bg-gradient-to-r from-[#F7941D] to-[#FF6B9D] text-white font-bold rounded-xl">
                      {language === 'ar' ? 'قدّم طلبك الآن' : 'Apply Now'}
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
// HERO SECTION - Incredible Design
// ============================================
function BunqHero() {
  const { language, dir } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Floating Cards Data
  const floatingCards = [
    { icon: Check, label: language === 'ar' ? 'تمت الموافقة' : 'Approved', value: '50,000 SAR', color: COLORS.success, delay: 0 },
    { icon: Zap, label: language === 'ar' ? 'سريع' : 'Fast', value: '24h', color: COLORS.accent, delay: 1 },
    { icon: Shield, label: language === 'ar' ? 'آمن' : 'Secure', value: '100%', color: COLORS.cyan, delay: 2 },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 50%, #1a5a96 100%)` }}>
      <AnimatedBackground />

      <motion.div
        className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-20"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-white text-center lg:text-start">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5 text-[#F7941D]" />
              </motion.div>
              <span className="font-semibold">
                {language === 'ar' ? 'تمويل متوافق مع الشريعة الإسلامية' : 'Sharia-Compliant Financing'}
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-[#00D084]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Main Heading with Gradient */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'ar' ? (
                <>
                  <motion.span
                    className="block"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    تمويل بلا
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-[#F7941D] via-[#FF6B9D] to-[#22D3EE] bg-clip-text text-transparent"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    حدود
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.span
                    className="block"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Finance
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-[#F7941D] via-[#FF6B9D] to-[#22D3EE] bg-clip-text text-transparent"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Without Limits
                  </motion.span>
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {language === 'ar'
                ? 'حلول تمويلية مبتكرة وسهلة. من السيارات إلى التمويل الشخصي، نجعل أحلامك حقيقة في دقائق.'
                : 'Innovative and easy financing solutions. From cars to personal finance, we make your dreams come true in minutes.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/apply">
                <MagneticButton className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F7941D] to-[#FF6B9D] text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#F7941D]/30">
                  <span>{language === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowIcon className="w-5 h-5" />
                  </motion.div>
                </MagneticButton>
              </Link>
              <Link href="/calculator">
                <motion.button
                  className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calculator className="w-5 h-5" />
                  <span>{language === 'ar' ? 'احسب تمويلك' : 'Calculate'}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { icon: BadgeCheck, label: language === 'ar' ? 'معتمد من ساما' : 'SAMA Licensed', color: COLORS.success },
                { icon: Shield, label: language === 'ar' ? 'آمن 100%' : '100% Secure', color: COLORS.cyan },
                { icon: Star, label: '4.9 ★', color: COLORS.yellow },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-sm font-medium text-white/90">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Interactive Phone & Cards */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Glowing Circle Behind Phone */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#F7941D]/30 to-[#22D3EE]/30 blur-[80px]" />

            {/* Phone Mockup */}
            <motion.div
              className="relative w-[280px] sm:w-[300px]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-2.5 shadow-2xl shadow-black/50">
                {/* Screen */}
                <div className="relative bg-gradient-to-b from-[#00377B] to-[#0066B3] rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* App UI */}
                  <div className="absolute inset-0 p-5 pt-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white/60 text-xs">{language === 'ar' ? 'مرحباً' : 'Hello'}</div>
                          <div className="text-white font-bold">{language === 'ar' ? 'أحمد' : 'Ahmed'}</div>
                        </div>
                      </div>
                      <motion.div
                        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Bell className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>

                    {/* Balance Card */}
                    <motion.div
                      className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 mb-5 border border-white/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/60 text-sm">{language === 'ar' ? 'رصيد التمويل' : 'Finance Balance'}</span>
                        <Wallet className="w-5 h-5 text-[#F7941D]" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-3" dir="ltr">125,000 SAR</div>
                      <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#00D084] to-[#22D3EE]"
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs">
                        <span className="text-white/60">{language === 'ar' ? 'المدفوع' : 'Paid'}</span>
                        <span className="text-[#00D084] font-semibold">65%</span>
                      </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-4 gap-2 mb-5">
                      {[
                        { icon: CreditCard, label: language === 'ar' ? 'دفع' : 'Pay', color: '#F7941D' },
                        { icon: QrCode, label: language === 'ar' ? 'مسح' : 'Scan', color: '#22D3EE' },
                        { icon: TrendingUp, label: language === 'ar' ? 'تتبع' : 'Track', color: '#00D084' },
                        { icon: Headphones, label: language === 'ar' ? 'دعم' : 'Help', color: '#FF6B9D' },
                      ].map((action, idx) => (
                        <motion.div
                          key={idx}
                          className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white/5"
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', scale: 1.05 }}
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${action.color}20` }}>
                            <action.icon className="w-4 h-4" style={{ color: action.color }} />
                          </div>
                          <span className="text-white/80 text-[10px]">{action.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Recent */}
                    <div className="space-y-2">
                      <div className="text-white/60 text-xs mb-2">{language === 'ar' ? 'آخر العمليات' : 'Recent'}</div>
                      {[1, 2].map((_, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 + idx * 0.2 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#00D084]/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#00D084]" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">{language === 'ar' ? 'دفعة ناجحة' : 'Payment Success'}</div>
                            <div className="text-white/50 text-xs">{language === 'ar' ? 'منذ ساعتين' : '2h ago'}</div>
                          </div>
                          <span className="text-white font-semibold text-sm" dir="ltr">-2,500</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-3 inset-x-0 flex justify-center">
                    <motion.div
                      className="w-28 h-7 bg-black rounded-full"
                      animate={{ width: ['7rem', '8rem', '7rem'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating Cards Around Phone */}
              {floatingCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className="absolute bg-white rounded-2xl p-4 shadow-xl shadow-black/10"
                  style={{
                    [idx === 0 ? 'left' : idx === 1 ? 'right' : 'left']: idx === 1 ? '-20px' : '-40px',
                    top: idx === 0 ? '80px' : idx === 1 ? '200px' : 'auto',
                    bottom: idx === 2 ? '100px' : 'auto',
                  }}
                  initial={{ opacity: 0, scale: 0.8, x: idx === 1 ? 50 : -50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { delay: 1 + card.delay * 0.3 },
                    y: { duration: 3, repeat: Infinity, delay: card.delay },
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <card.icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">{card.label}</div>
                      <div className="text-[#00377B] font-bold">{card.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/60 text-sm">{language === 'ar' ? 'اكتشف المزيد' : 'Scroll to explore'}</span>
        <ChevronDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  );
}

// ============================================
// MARQUEE - Infinite Scroll Logos/Text
// ============================================
function Marquee({ children, direction = 'left', speed = 30 }: { children: React.ReactNode; direction?: 'left' | 'right'; speed?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// ============================================
// STATS SECTION - Impressive Numbers
// ============================================
function BunqStats() {
  const { language } = useI18n();

  const stats = [
    { value: 17, suffix: '+', label: language === 'ar' ? 'عاماً من الخبرة' : 'Years', icon: Award, color: COLORS.accent },
    { value: 100, suffix: 'K+', label: language === 'ar' ? 'عميل سعيد' : 'Clients', icon: Users, color: COLORS.pink },
    { value: 50, suffix: '+', label: language === 'ar' ? 'فرع' : 'Branches', icon: MapPin, color: COLORS.cyan },
    { value: 4.9, suffix: '', label: language === 'ar' ? 'تقييم' : 'Rating', icon: Star, color: COLORS.yellow },
  ];

  return (
    <section className="relative py-16 -mt-20 z-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <GlowingCard key={idx} glowColor={stat.color}>
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-[#00377B] mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FEATURES - Bento Grid Style
// ============================================
function BunqFeatures() {
  const { language, dir } = useI18n();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const features = [
    {
      title: language === 'ar' ? 'تمويل السيارات' : 'Car Financing',
      description: language === 'ar' ? 'احصل على سيارة أحلامك' : 'Get your dream car',
      icon: Car,
      color: COLORS.accent,
      gradient: 'from-[#F7941D] to-[#FF6B9D]',
      href: '/individuals/car-financing',
      large: true,
    },
    {
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar' ? 'تمويل نقدي سريع' : 'Quick cash financing',
      icon: Banknote,
      color: COLORS.cyan,
      gradient: 'from-[#22D3EE] to-[#0066B3]',
      href: '/individuals/personal-financing',
    },
    {
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar' ? 'نمِّ أعمالك معنا' : 'Grow your business',
      icon: Building2,
      color: COLORS.success,
      gradient: 'from-[#00D084] to-[#22D3EE]',
      href: '/business/cash-financing',
    },
    {
      title: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval',
      description: language === 'ar' ? 'خلال 24 ساعة' : 'Within 24 hours',
      icon: Zap,
      color: COLORS.purple,
      gradient: 'from-[#8B5CF6] to-[#FF6B9D]',
      href: '/apply',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00377B]/10 text-[#00377B] font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Gem className="w-4 h-4" />
            {language === 'ar' ? 'خدماتنا المميزة' : 'Premium Services'}
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#00377B] mb-6">
            {language === 'ar' ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'حلول تمويلية متكاملة مصممة خصيصاً لتلبية احتياجاتك'
              : 'Comprehensive financing solutions designed specifically for your needs'}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={feature.large ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
            >
              <Link href={feature.href}>
                <GlowingCard glowColor={feature.color} className="h-full">
                  <div className={cn(
                    'relative overflow-hidden rounded-3xl p-8 h-full transition-all duration-300 group',
                    feature.large ? 'min-h-[400px]' : 'min-h-[200px]',
                    `bg-gradient-to-br ${feature.gradient}`
                  )}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-6"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-white/80 text-lg">{feature.description}</p>
                      </div>

                      <div className="flex items-center gap-2 text-white font-semibold mt-6 group-hover:gap-4 transition-all">
                        <span>{language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                        <ArrowIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </GlowingCard>
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
function BunqWhyUs() {
  const { language } = useI18n();

  const reasons = [
    { icon: BadgeCheck, title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant', color: COLORS.success },
    { icon: Zap, title: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval', color: COLORS.accent },
    { icon: Shield, title: language === 'ar' ? 'آمن وموثوق' : 'Safe & Secure', color: COLORS.cyan },
    { icon: Headphones, title: language === 'ar' ? 'دعم 24/7' : '24/7 Support', color: COLORS.pink },
    { icon: Target, title: language === 'ar' ? 'حلول مخصصة' : 'Custom Solutions', color: COLORS.purple },
    { icon: TrendingUp, title: language === 'ar' ? 'أسعار تنافسية' : 'Best Rates', color: COLORS.yellow },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                  alt="Professional"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00377B]/60 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F7941D] to-[#FF6B9D] flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#00377B]">17+</div>
                    <div className="text-gray-500">{language === 'ar' ? 'عاماً من التميز' : 'Years of Excellence'}</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-[#F7941D] rounded-3xl" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7941D]/10 text-[#F7941D] font-semibold mb-6">
              <Heart className="w-4 h-4" />
              {language === 'ar' ? 'لماذا أجل؟' : 'Why AJIL?'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#00377B] mb-6 leading-tight">
              {language === 'ar' ? 'شريكك الموثوق في التمويل' : 'Your Trusted Finance Partner'}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {language === 'ar'
                ? 'نحن نؤمن بأن التمويل يجب أن يكون سهلاً وشفافاً ومتاحاً للجميع'
                : 'We believe financing should be easy, transparent, and accessible to everyone'}
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-2 gap-4">
              {reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${reason.color}15` }}
                  >
                    <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
                  </div>
                  <span className="font-semibold text-[#00377B]">{reason.title}</span>
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
// HOW IT WORKS
// ============================================
function BunqProcess() {
  const { language } = useI18n();

  const steps = [
    { icon: Smartphone, title: language === 'ar' ? 'قدّم طلبك' : 'Apply Online', color: COLORS.accent },
    { icon: Clock, title: language === 'ar' ? 'مراجعة سريعة' : 'Quick Review', color: COLORS.cyan },
    { icon: BadgeCheck, title: language === 'ar' ? 'الموافقة' : 'Approval', color: COLORS.success },
    { icon: Banknote, title: language === 'ar' ? 'استلم التمويل' : 'Get Funded', color: COLORS.pink },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-[#00377B] via-[#0066B3] to-[#004a82] relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-semibold mb-6">
            <Rocket className="w-4 h-4" />
            {language === 'ar' ? 'كيف يعمل' : 'How It Works'}
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? '4 خطوات سهلة' : '4 Easy Steps'}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center h-full group hover:bg-white/20 transition-all">
                {/* Number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#F7941D] text-white font-bold flex items-center justify-center text-lg">
                  {idx + 1}
                </div>

                <motion.div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${step.color}30` }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="w-10 h-10" style={{ color: step.color }} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
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
            <MagneticButton className="px-10 py-5 bg-[#F7941D] text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#F7941D]/30">
              {language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey'}
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// APP DOWNLOAD
// ============================================
function BunqApp() {
  const { language, dir } = useI18n();

  return (
    <section className="py-20 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={dir === 'rtl' ? 'lg:order-2' : ''}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00377B]/10 text-[#00377B] font-semibold mb-6">
              <Smartphone className="w-4 h-4" />
              {language === 'ar' ? 'التطبيق' : 'Mobile App'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#00377B] mb-6">
              {language === 'ar' ? 'حمّل تطبيق أجل الآن' : 'Download AJIL App'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'ar'
                ? 'إدارة تمويلك بكل سهولة من هاتفك'
                : 'Manage your financing easily from your phone'}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: CreditCard, label: language === 'ar' ? 'دفع سهل' : 'Easy Payments' },
                { icon: Bell, label: language === 'ar' ? 'إشعارات فورية' : 'Instant Alerts' },
                { icon: Fingerprint, label: language === 'ar' ? 'دخول آمن' : 'Secure Login' },
                { icon: Gift, label: language === 'ar' ? 'عروض حصرية' : 'Exclusive Offers' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4, shadow: 'lg' }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F7941D]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#F7941D]" />
                  </div>
                  <span className="font-medium text-[#00377B]">{item.label}</span>
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#00377B]/30 to-[#F7941D]/30 blur-[100px] rounded-full" />
              <motion.div
                className="relative w-[280px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2.5 shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="bg-gradient-to-br from-[#00377B] to-[#0066B3] rounded-[2.5rem] overflow-hidden aspect-[9/19] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <Image src="/images/AJIL_logo.png" alt="AJIL" width={60} height={60} className="object-contain" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{language === 'ar' ? 'أجل' : 'AJIL'}</h3>
                    <p className="text-white/80">{language === 'ar' ? 'للتمويل' : 'Finance'}</p>
                  </div>
                </div>
                <div className="absolute top-4 inset-x-0 flex justify-center">
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
// CTA SECTION
// ============================================
function BunqCTA() {
  const { language, dir } = useI18n();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-[#F7941D] via-[#FF6B9D] to-[#8B5CF6] relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? 'مستعد لتحقيق أحلامك؟' : 'Ready to Achieve Your Dreams?'}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {language === 'ar' ? 'ابدأ رحلتك معنا اليوم' : 'Start your journey with us today'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply">
              <MagneticButton className="flex items-center gap-3 px-10 py-5 bg-white text-[#00377B] font-bold text-lg rounded-2xl shadow-xl">
                {language === 'ar' ? 'قدّم طلبك الآن' : 'Apply Now'}
                <ArrowIcon className="w-6 h-6" />
              </MagneticButton>
            </Link>
            <a href="tel:8002442211">
              <motion.button
                className="flex items-center gap-3 px-10 py-5 border-2 border-white text-white font-semibold text-lg rounded-2xl hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
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
// FOOTER
// ============================================
function BunqFooter() {
  const { language } = useI18n();

  return (
    <footer className="bg-[#0A0A1A] text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00377B] to-[#0066B3] flex items-center justify-center">
                <Image src="/images/AJIL_logo.png" alt="AJIL" width={40} height={40} className="object-contain" />
              </div>
              <span className="font-bold text-2xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              {language === 'ar'
                ? 'شركة أجل للتمويل، رائدة في تقديم الحلول التمويلية المتوافقة مع الشريعة الإسلامية.'
                : 'AJIL Finance Company, a pioneer in Sharia-compliant financing solutions.'}
            </p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#F7941D] transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="sr-only">{social}</span>
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
                { label: language === 'ar' ? 'تمويل السيارات' : 'Car Financing', href: '/individuals/car-financing' },
                { label: language === 'ar' ? 'التمويل الشخصي' : 'Personal', href: '/individuals/personal-financing' },
                { label: language === 'ar' ? 'تمويل الأعمال' : 'Business', href: '/business/cash-financing' },
              ],
            },
            {
              title: language === 'ar' ? 'الشركة' : 'Company',
              links: [
                { label: language === 'ar' ? 'عن أجل' : 'About Us', href: '/about/story' },
                { label: language === 'ar' ? 'الفروع' : 'Branches', href: '/branches' },
                { label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
              ],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-6">{section.title}</h4>
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

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {language === 'ar' ? '© 2025 شركة أجل للتمويل' : '© 2025 AJIL Finance Company'}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white">{language === 'ar' ? 'الخصوصية' : 'Privacy'}</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white">{language === 'ar' ? 'الشروط' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function BunqStyleHomepage() {
  return (
    <main className="min-h-screen">
      <BunqHeader />
      <BunqHero />
      <BunqStats />
      <BunqFeatures />
      <BunqWhyUs />
      <BunqProcess />
      <BunqApp />
      <BunqCTA />
      <BunqFooter />
    </main>
  );
}
