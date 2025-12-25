'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Check,
  Star,
  Shield,
  Zap,
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
  TrendingUp,
  BadgeCheck,
  Smartphone,
  Clock,
  Target,
  Layers,
  BarChart3,
  Wallet,
  FileText,
  Headphones,
  ChevronRight,
  Play,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// D360 Style Colors - Dark, Corporate, Modern
const COLORS = {
  dark: '#0C0C0E',
  darkGray: '#141417',
  mediumGray: '#1C1C21',
  lightGray: '#8B8B8B',
  white: '#FFFFFF',
  primary: '#00377B',
  accent: '#F7941D',
  blue: '#0066B3',
  gradient: 'linear-gradient(135deg, #00377B 0%, #0066B3 50%, #22D3EE 100%)',
};

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================
// D360 STYLE HEADER
// ============================================
function D360Header() {
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
    { label: language === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { label: language === 'ar' ? 'الأفراد' : 'Individuals', href: '/individuals/car-financing' },
    { label: language === 'ar' ? 'الأعمال' : 'Business', href: '/business/cash-financing' },
    { label: language === 'ar' ? 'الحاسبة' : 'Calculator', href: '/calculator' },
    { label: language === 'ar' ? 'عن أجل' : 'About', href: '/about/story' },
    { label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-[#0C0C0E]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00377B] to-[#0066B3] flex items-center justify-center">
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
                <span className="text-[#8B8B8B] text-sm block">{language === 'ar' ? 'للتمويل' : 'Finance'}</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="px-5 py-2.5 text-[#8B8B8B] hover:text-white font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#F7941D] group-hover:w-1/2 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="text-[#8B8B8B] hover:text-white font-medium transition-colors"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <Link
                href="/apply"
                className="px-6 py-3 bg-[#F7941D] text-[#0C0C0E] font-bold rounded-lg hover:bg-[#F7941D]/90 transition-colors"
              >
                {language === 'ar' ? 'قدّم طلبك' : 'Apply Now'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center"
            >
              <Menu className="w-6 h-6 text-white" />
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[85%] max-w-sm h-full bg-[#0C0C0E] z-50`}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-white font-bold text-xl">{language === 'ar' ? 'القائمة' : 'Menu'}</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <nav className="p-6 space-y-2">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#8B8B8B] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                <Link
                  href="/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 bg-[#F7941D] text-[#0C0C0E] font-bold rounded-lg text-center"
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
// D360 HERO SECTION - Dark & Bold
// ============================================
function D360Hero() {
  const { language, dir } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen bg-[#0C0C0E] overflow-hidden flex items-center">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00377B]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F7941D]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 lg:pt-40"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#F7941D] animate-pulse" />
            <span className="text-[#8B8B8B] text-sm font-medium">
              {language === 'ar' ? 'تمويل متوافق مع الشريعة الإسلامية' : 'Sharia-Compliant Financing'}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">{language === 'ar' ? 'نُحَوِّل' : 'Transforming'}</span>
            <br />
            <span className="bg-gradient-to-r from-[#00377B] via-[#0066B3] to-[#22D3EE] bg-clip-text text-transparent">
              {language === 'ar' ? 'طموحاتك' : 'Your Ambitions'}
            </span>
            <br />
            <span className="text-white">{language === 'ar' ? 'إلى واقع' : 'Into Reality'}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl lg:text-2xl text-[#8B8B8B] max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {language === 'ar'
              ? 'حلول تمويلية مبتكرة مصممة لتمكينك من تحقيق أهدافك. سريعة، شفافة، ومتوافقة مع الشريعة.'
              : 'Innovative financing solutions designed to empower you to achieve your goals. Fast, transparent, and Sharia-compliant.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/apply">
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 bg-[#F7941D] text-[#0C0C0E] font-bold text-lg rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/calculator">
              <motion.button
                className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold text-lg rounded-lg hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calculator className="w-5 h-5" />
                {language === 'ar' ? 'احسب تمويلك' : 'Calculate'}
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="flex flex-wrap gap-12 mt-20 pt-12 border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { value: 17, suffix: '+', label: language === 'ar' ? 'عاماً من الخبرة' : 'Years Experience' },
              { value: 100, suffix: 'K+', label: language === 'ar' ? 'عميل سعيد' : 'Happy Clients' },
              { value: 50, suffix: '+', label: language === 'ar' ? 'فرع' : 'Branches' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[#8B8B8B]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#8B8B8B] text-sm">{language === 'ar' ? 'اكتشف المزيد' : 'Scroll to explore'}</span>
          <ChevronDown className="w-6 h-6 text-[#8B8B8B]" />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// SERVICES SECTION - D360 Style Cards
// ============================================
function D360Services() {
  const { language, dir } = useI18n();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const services = [
    {
      icon: Car,
      number: '01',
      title: language === 'ar' ? 'تمويل السيارات' : 'Car Financing',
      description: language === 'ar'
        ? 'احصل على سيارة أحلامك مع خطط سداد مرنة تناسب ميزانيتك وأسلوب حياتك'
        : 'Get your dream car with flexible payment plans that fit your budget and lifestyle',
      href: '/individuals/car-financing',
    },
    {
      icon: Banknote,
      number: '02',
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar'
        ? 'تمويل نقدي سريع لتحقيق أهدافك الشخصية بإجراءات بسيطة وموافقة سريعة'
        : 'Quick cash financing to achieve your personal goals with simple procedures',
      href: '/individuals/personal-financing',
    },
    {
      icon: Building2,
      number: '03',
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar'
        ? 'حلول تمويلية متخصصة لدعم نمو أعمالك وتوسيع نطاق عملياتك'
        : 'Specialized financing solutions to support your business growth',
      href: '/business/cash-financing',
    },
    {
      icon: Layers,
      number: '04',
      title: language === 'ar' ? 'المعدات الثقيلة' : 'Heavy Equipment',
      description: language === 'ar'
        ? 'تمويل مرن للمعدات الثقيلة والآليات لدعم مشاريعك الكبرى'
        : 'Flexible financing for heavy equipment to support your major projects',
      href: '/business/heavy-equipment',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#141417]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#F7941D] font-semibold mb-4 block"
            >
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-bold text-white"
            >
              {language === 'ar' ? 'حلول تمويلية شاملة' : 'Complete Solutions'}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#8B8B8B] text-lg max-w-md"
          >
            {language === 'ar'
              ? 'نقدم مجموعة متكاملة من الحلول التمويلية المصممة لتلبية احتياجاتك المختلفة'
              : 'We offer a comprehensive range of financing solutions designed to meet your various needs'}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <div className="group relative bg-[#1C1C21] rounded-2xl p-8 lg:p-10 border border-white/5 hover:border-[#F7941D]/30 transition-all duration-500 h-full">
                  {/* Number */}
                  <span className="absolute top-8 right-8 text-6xl font-bold text-white/5 group-hover:text-[#F7941D]/10 transition-colors">
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#F7941D]/10 flex items-center justify-center mb-6 group-hover:bg-[#F7941D]/20 transition-colors">
                    <service.icon className="w-7 h-7 text-[#F7941D]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F7941D] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#8B8B8B] mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-[#F7941D] font-semibold">
                    <span>{language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                    <ArrowIcon className="w-5 h-5 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
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
// WHY CHOOSE US - D360 Style
// ============================================
function D360WhyUs() {
  const { language } = useI18n();

  const features = [
    {
      icon: BadgeCheck,
      title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant',
      description: language === 'ar' ? 'جميع منتجاتنا معتمدة من الهيئة الشرعية' : 'All products approved by Sharia Board',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval',
      description: language === 'ar' ? 'احصل على موافقة خلال 24 ساعة' : 'Get approved within 24 hours',
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'آمن وموثوق' : 'Safe & Secure',
      description: language === 'ar' ? 'حماية كاملة لبياناتك' : 'Complete protection for your data',
    },
    {
      icon: Headphones,
      title: language === 'ar' ? 'دعم متواصل' : '24/7 Support',
      description: language === 'ar' ? 'فريق متخصص لخدمتك' : 'Dedicated team at your service',
    },
    {
      icon: Target,
      title: language === 'ar' ? 'حلول مخصصة' : 'Custom Solutions',
      description: language === 'ar' ? 'خطط تناسب احتياجاتك' : 'Plans tailored to your needs',
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'أسعار تنافسية' : 'Competitive Rates',
      description: language === 'ar' ? 'أفضل الأسعار في السوق' : 'Best rates in the market',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0C0C0E] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00377B]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#F7941D] font-semibold mb-4 block"
            >
              {language === 'ar' ? 'لماذا أجل؟' : 'Why AJIL?'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {language === 'ar'
                ? 'شريكك الموثوق في رحلة التمويل'
                : 'Your Trusted Finance Partner'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#8B8B8B] text-lg mb-10 leading-relaxed"
            >
              {language === 'ar'
                ? 'نحن نؤمن بأن التمويل يجب أن يكون سهلاً وشفافاً ومتاحاً للجميع. منذ 17 عاماً ونحن نخدم عملاءنا بتميز.'
                : 'We believe financing should be easy, transparent, and accessible to everyone. For 17 years, we have been serving our clients with excellence.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/about/story">
                <button className="flex items-center gap-3 text-[#F7941D] font-semibold text-lg group">
                  {language === 'ar' ? 'اعرف المزيد عنا' : 'Learn More About Us'}
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141417] rounded-xl p-6 border border-white/5 hover:border-[#F7941D]/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F7941D]/10 flex items-center justify-center mb-4 group-hover:bg-[#F7941D]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#F7941D]" />
                </div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-[#8B8B8B] text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROCESS SECTION - How It Works
// ============================================
function D360Process() {
  const { language } = useI18n();

  const steps = [
    {
      number: '01',
      title: language === 'ar' ? 'قدّم طلبك' : 'Submit Application',
      description: language === 'ar' ? 'قدّم طلبك بسهولة عبر الموقع أو التطبيق' : 'Submit your application easily online or via app',
    },
    {
      number: '02',
      title: language === 'ar' ? 'المراجعة' : 'Review',
      description: language === 'ar' ? 'فريقنا يراجع طلبك بسرعة' : 'Our team reviews your application quickly',
    },
    {
      number: '03',
      title: language === 'ar' ? 'الموافقة' : 'Approval',
      description: language === 'ar' ? 'احصل على الموافقة خلال 24 ساعة' : 'Get approved within 24 hours',
    },
    {
      number: '04',
      title: language === 'ar' ? 'استلم التمويل' : 'Get Funded',
      description: language === 'ar' ? 'استلم التمويل مباشرة' : 'Receive your financing directly',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#141417]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F7941D] font-semibold mb-4 block"
          >
            {language === 'ar' ? 'كيف يعمل' : 'How It Works'}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            {language === 'ar' ? 'خطوات بسيطة للحصول على التمويل' : 'Simple Steps to Get Financed'}
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-[#F7941D]/50 to-transparent" />
              )}

              <div className="text-center">
                {/* Number */}
                <div className="w-16 h-16 rounded-full bg-[#F7941D] text-[#0C0C0E] font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[#8B8B8B]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/apply">
            <motion.button
              className="px-10 py-5 bg-[#F7941D] text-[#0C0C0E] font-bold text-lg rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey'}
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
function D360App() {
  const { language, dir } = useI18n();

  return (
    <section className="py-24 lg:py-32 bg-[#0C0C0E] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#F7941D]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={dir === 'rtl' ? 'lg:order-2' : ''}
          >
            <span className="text-[#F7941D] font-semibold mb-4 block">
              {language === 'ar' ? 'التطبيق' : 'Mobile App'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'ar' ? 'إدارة تمويلك من هاتفك' : 'Manage Your Finance On The Go'}
            </h2>
            <p className="text-[#8B8B8B] text-lg mb-8 leading-relaxed">
              {language === 'ar'
                ? 'حمّل تطبيق أجل للتمويل وتمتع بإدارة كاملة لحسابك من أي مكان وفي أي وقت'
                : 'Download the AJIL Finance app and enjoy complete account management from anywhere, anytime'}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {[
                language === 'ar' ? 'تقديم طلبات التمويل' : 'Submit financing applications',
                language === 'ar' ? 'متابعة حالة الطلب' : 'Track application status',
                language === 'ar' ? 'سداد الأقساط' : 'Pay installments',
                language === 'ar' ? 'عروض حصرية' : 'Exclusive offers',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#F7941D]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#F7941D]" />
                  </div>
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl text-[#0C0C0E]"
                whileHover={{ scale: 1.02 }}
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
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl text-[#0C0C0E]"
                whileHover={{ scale: 1.02 }}
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
              <div className="absolute inset-0 bg-gradient-to-b from-[#00377B]/30 to-[#F7941D]/20 blur-[100px] rounded-full" />

              {/* Phone */}
              <motion.div
                className="relative w-[280px] bg-[#1C1C21] rounded-[3rem] p-3 border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="bg-[#0C0C0E] rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* App Screen */}
                  <div className="h-full p-6 pt-12 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <div className="text-[#8B8B8B] text-xs">{language === 'ar' ? 'مرحباً' : 'Hello'}</div>
                        <div className="text-white font-bold">{language === 'ar' ? 'أحمد' : 'Ahmed'}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#F7941D] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#0C0C0E]" />
                      </div>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-gradient-to-br from-[#00377B] to-[#0066B3] rounded-2xl p-5 mb-6">
                      <div className="text-white/60 text-sm mb-1">
                        {language === 'ar' ? 'رصيد التمويل' : 'Finance Balance'}
                      </div>
                      <div className="text-white text-2xl font-bold" dir="ltr">
                        125,000 SAR
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Wallet, label: language === 'ar' ? 'دفع' : 'Pay' },
                        { icon: FileText, label: language === 'ar' ? 'كشف' : 'Statement' },
                        { icon: Headphones, label: language === 'ar' ? 'دعم' : 'Support' },
                      ].map((action, idx) => (
                        <div key={idx} className="bg-[#141417] rounded-xl p-3 text-center">
                          <action.icon className="w-5 h-5 text-[#F7941D] mx-auto mb-2" />
                          <span className="text-white text-xs">{action.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-4 inset-x-0 flex justify-center">
                  <div className="w-20 h-5 bg-[#0C0C0E] rounded-full" />
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
function D360Testimonials() {
  const { language } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: language === 'ar'
        ? 'تجربة رائعة مع أجل للتمويل! الموافقة كانت سريعة والفريق متعاون جداً. أنصح الجميع بالتعامل معهم.'
        : 'Amazing experience with AJIL! Quick approval and very cooperative team. I recommend everyone to deal with them.',
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'رائد أعمال' : 'Entrepreneur',
    },
    {
      quote: language === 'ar'
        ? 'أفضل شركة تمويل تعاملت معها. الشفافية والمصداقية في كل خطوة. شكراً لفريق أجل.'
        : 'Best financing company I have dealt with. Transparency at every step. Thanks to the AJIL team.',
      name: language === 'ar' ? 'سارة العمري' : 'Sara Al-Omari',
      role: language === 'ar' ? 'مديرة تنفيذية' : 'Executive Director',
    },
    {
      quote: language === 'ar'
        ? 'ساعدتني أجل في توسيع شركتي بحلول تمويلية مرنة. خدمة عملاء ممتازة!'
        : 'AJIL helped me expand my company with flexible financing solutions. Excellent customer service!',
      name: language === 'ar' ? 'خالد السعيد' : 'Khalid Al-Saeed',
      role: language === 'ar' ? 'صاحب أعمال' : 'Business Owner',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 lg:py-32 bg-[#141417]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F7941D] font-semibold mb-4 block"
          >
            {language === 'ar' ? 'آراء العملاء' : 'Testimonials'}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white"
          >
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </motion.h2>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* Quote */}
              <div className="text-5xl text-[#F7941D] mb-8">"</div>
              <p className="text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-10">
                {testimonials[activeIndex].quote}
              </p>
              <div>
                <div className="text-white font-bold text-xl mb-1">
                  {testimonials[activeIndex].name}
                </div>
                <div className="text-[#8B8B8B]">
                  {testimonials[activeIndex].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'w-10 bg-[#F7941D]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
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
function D360CTA() {
  const { language } = useI18n();

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[#00377B] to-[#0066B3] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? 'مستعد للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-white/80 mb-10">
            {language === 'ar'
              ? 'تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا'
              : 'Contact us today and get a free consultation from our experts'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply">
              <motion.button
                className="px-10 py-5 bg-[#F7941D] text-[#0C0C0E] font-bold text-lg rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {language === 'ar' ? 'قدّم طلبك الآن' : 'Apply Now'}
              </motion.button>
            </Link>
            <a href="tel:8002442211">
              <motion.button
                className="flex items-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
function D360Footer() {
  const { language } = useI18n();

  const links = [
    {
      title: language === 'ar' ? 'الخدمات' : 'Services',
      items: [
        { label: language === 'ar' ? 'تمويل السيارات' : 'Car Financing', href: '/individuals/car-financing' },
        { label: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance', href: '/individuals/personal-financing' },
        { label: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance', href: '/business/cash-financing' },
      ],
    },
    {
      title: language === 'ar' ? 'الشركة' : 'Company',
      items: [
        { label: language === 'ar' ? 'عن أجل' : 'About Us', href: '/about/story' },
        { label: language === 'ar' ? 'الأخبار' : 'News', href: '/about/news' },
        { label: language === 'ar' ? 'الفروع' : 'Branches', href: '/branches' },
      ],
    },
    {
      title: language === 'ar' ? 'الدعم' : 'Support',
      items: [
        { label: language === 'ar' ? 'اتصل بنا' : 'Contact Us', href: '/contact' },
        { label: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs', href: '/contact' },
        { label: language === 'ar' ? 'الشروط والأحكام' : 'Terms', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0C0C0E] border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00377B] to-[#0066B3] flex items-center justify-center">
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-white font-bold text-xl">{language === 'ar' ? 'أجل' : 'AJIL'}</span>
                <span className="text-[#8B8B8B] text-sm block">{language === 'ar' ? 'للتمويل' : 'Finance'}</span>
              </div>
            </Link>
            <p className="text-[#8B8B8B] mb-6 max-w-sm leading-relaxed">
              {language === 'ar'
                ? 'شركة أجل للتمويل، رائدة في تقديم الحلول التمويلية المتوافقة مع الشريعة الإسلامية في المملكة العربية السعودية.'
                : 'AJIL Finance Company, a pioneer in providing Sharia-compliant financing solutions in Saudi Arabia.'}
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:8002442211" className="flex items-center gap-3 text-[#8B8B8B] hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span dir="ltr">800 244 2211</span>
              </a>
              <a href="mailto:info@ajil.com" className="flex items-center gap-3 text-[#8B8B8B] hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                info@ajil.com
              </a>
            </div>
          </div>

          {/* Links */}
          {links.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-white font-bold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      className="text-[#8B8B8B] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8B8B8B] text-sm">
            {language === 'ar'
              ? '© 2008-2025 شركة أجل للتمويل - جميع الحقوق محفوظة'
              : '© 2008-2025 AJIL Finance Company - All Rights Reserved'}
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-[#8B8B8B] hover:text-white transition-colors">
              {language === 'ar' ? 'الخصوصية' : 'Privacy'}
            </Link>
            <Link href="/terms" className="text-[#8B8B8B] hover:text-white transition-colors">
              {language === 'ar' ? 'الشروط' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function D360StyleHomepage() {
  return (
    <main className="min-h-screen bg-[#0C0C0E]">
      <D360Header />
      <D360Hero />
      <D360Services />
      <D360WhyUs />
      <D360Process />
      <D360App />
      <D360Testimonials />
      <D360CTA />
      <D360Footer />
    </main>
  );
}
