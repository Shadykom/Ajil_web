'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Pause,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Star,
  Shield,
  Zap,
  Heart,
  Users,
  Award,
  Phone,
  MessageCircle,
  Calculator,
  Car,
  Home as HomeIcon,
  Building2,
  Sparkles,
  Globe,
  Check,
  Volume2,
  VolumeX,
  Menu,
  X,
  User,
  Headphones,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Import animated icons from classic theme
import {
  IconCarFinancing,
  IconPersonalFinancing,
  IconBusinessFinancing,
  IconLoanCalculator,
  IconOffers,
  IconAbout,
  IconNews,
  IconCustomerSupport,
  AnimatedCarFinancing,
  AnimatedPersonalFinancing,
  AnimatedBusinessFinancing,
  AnimatedLoanCalculator,
  AnimatedCustomerSupport,
  AnimatedOffers,
  AnimatedAbout,
  AnimatedNews,
  AnimatedShariaCompliant,
  AnimatedQuickApproval,
  AnimatedSecurity,
  AnimatedService247,
} from '@/components/icons';

// Import new components
import ProductShowcase from './components/ProductShowcase';
import LifestyleGallery from './components/LifestyleGallery';
import InteractiveCalculator from './components/InteractiveCalculator';
import AppDownload from './components/AppDownload';
import PartnersAchievements from './components/PartnersAchievements';
import BranchesPreview from './components/BranchesPreview';

// AJIL Brand Colors
const COLORS = {
  navy: '#00377B',
  blue: '#0066B3',
  lightBlue: '#4DA3E0',
  gold: '#F7941D',
  white: '#FFFFFF',
  cream: '#FFF8F0',
};

// Mini A Shape for decorations
function MiniAShape({ size = 20, color = COLORS.gold, className = '' }: { size?: number; color?: string; className?: string }) {
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

// Navigation items with animated icons
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
        icon: IconAbout,
        animatedIcon: AnimatedAbout,
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
];

// Animated Background Shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large A Shape */}
      <motion.svg
        className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-5"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <path
          d="M20 85 L50 15 L80 85 M32 60 L68 60"
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Floating circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, ${COLORS.blue}20, ${COLORS.gold}10)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.navy} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.navy} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// Animated AJIL Logo Mark
function AjilLogoMark({ size = 60, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={animated ? { pathLength: 0 } : false}
      animate={animated ? { pathLength: 1 } : false}
      transition={{ duration: 2, ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.blue} />
          <stop offset="100%" stopColor={COLORS.navy} />
        </linearGradient>
      </defs>
      <motion.path
        d="M20 80 L50 20 L80 80"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M32 55 L68 55"
        fill="none"
        stroke={COLORS.gold}
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

// Video Hero Section - Full screen video background
function HeroSection() {
  const { language, dir } = useI18n();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background - Full screen cinematic video */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1920&q=80"
        >
          {/* Premium car driving video - Saudi Arabia style */}
          <source
            src="https://cdn.coverr.co/videos/coverr-driving-through-city-at-night-4405/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00377B]/70 via-[#00377B]/50 to-[#00377B]/80" />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4"
        style={{ opacity, y }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1.5 }}
          className="mb-8"
        >
          <AjilLogoMark size={100} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#F7941D]" />
          <span className="text-sm font-medium">
            {language === 'ar' ? 'تمويل متوافق مع الشريعة الإسلامية' : 'Sharia-Compliant Financing'}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <span className="block">
            {language === 'ar' ? 'نبني' : 'Building'}
          </span>
          <span className="block bg-gradient-to-r from-white via-[#F7941D] to-white bg-clip-text text-transparent">
            {language === 'ar' ? 'أحلامك' : 'Dreams'}
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-light mt-2 opacity-90">
            {language === 'ar' ? 'معاً' : 'Together'}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/80 text-center max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {language === 'ar'
            ? 'حلول تمويلية مبتكرة تناسب طموحاتك. من السيارات إلى العقارات، نحن شريكك في النجاح.'
            : 'Innovative financing solutions tailored to your ambitions. From cars to real estate, we are your partner in success.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Link href="/apply">
            <motion.button
              className="group relative px-8 py-4 bg-[#F7941D] text-white font-bold rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {language === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
                {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </Link>
          <Link href="/calculator">
            <motion.button
              className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator className="w-5 h-5" />
              {language === 'ar' ? 'احسب تمويلك' : 'Calculate Finance'}
            </motion.button>
          </Link>
        </motion.div>

        {/* Video Controls */}
        <motion.div
          className="absolute bottom-8 left-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <button
            onClick={toggleVideo}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Floating Stats Section
function StatsSection() {
  const { language } = useI18n();
  const stats = [
    { value: '17+', label: language === 'ar' ? 'عاماً من الخبرة' : 'Years Experience', icon: Award },
    { value: '100K+', label: language === 'ar' ? 'عميل سعيد' : 'Happy Clients', icon: Users },
    { value: '50+', label: language === 'ar' ? 'فرع في المملكة' : 'Branches Nationwide', icon: Building2 },
    { value: '4.8', label: language === 'ar' ? 'تقييم العملاء' : 'Customer Rating', icon: Star },
  ];

  return (
    <section className="relative -mt-24 z-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066B3] to-[#00377B] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <svg viewBox="0 0 100 100">
                    <path d="M20 80 L50 20 L80 80 M32 55 L68 55" fill="none" stroke={COLORS.navy} strokeWidth="4" />
                  </svg>
                </div>
                <stat.icon className="w-8 h-8 text-[#F7941D] mb-3" />
                <div className="text-4xl font-bold text-[#00377B] mb-1">{stat.value}</div>
                <div className="text-sm text-[#0066B3]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Services Section with 3D Cards - Using real car images and Saudi lifestyle
function ServicesSection() {
  const { language, dir } = useI18n();
  const services = [
    {
      icon: IconCarFinancing,
      animatedIcon: AnimatedCarFinancing,
      title: language === 'ar' ? 'تمويل السيارات' : 'Auto Financing',
      description: language === 'ar' 
        ? 'احصل على سيارة أحلامك مع خطط سداد مرنة' 
        : 'Get your dream car with flexible payment plans',
      // Real luxury car image - Toyota Land Cruiser popular in Saudi
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
      color: '#0066B3',
      href: '/individuals/car-financing',
    },
    {
      icon: IconPersonalFinancing,
      animatedIcon: AnimatedPersonalFinancing,
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar'
        ? 'حقق أهدافك المالية مع حلول تمويلية مخصصة'
        : 'Achieve your financial goals with customized solutions',
      // Saudi family/lifestyle image
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
      color: '#00377B',
      href: '/individuals/personal-financing',
    },
    {
      icon: IconBusinessFinancing,
      animatedIcon: AnimatedBusinessFinancing,
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar'
        ? 'نمِّ أعمالك مع خيارات تمويل متنوعة'
        : 'Grow your business with diverse financing options',
      // Modern Saudi business district
      image: 'https://images.unsplash.com/photo-1565623006220-9f9e61fa4e3f?w=800&q=80',
      color: '#F7941D',
      href: '/business/cash-financing',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4" />
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00377B] mb-4">
            {language === 'ar' ? 'حلول تمويلية شاملة' : 'Comprehensive Solutions'}
          </h2>
          <p className="text-xl text-[#0066B3] max-w-2xl mx-auto">
            {language === 'ar'
              ? 'نقدم مجموعة واسعة من الحلول التمويلية المتوافقة مع الشريعة الإسلامية'
              : 'We offer a wide range of Sharia-compliant financing solutions'}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={service.href}>
                <div className="relative h-[450px] rounded-3xl overflow-hidden cursor-pointer">
                  {/* Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity"
                    style={{
                      background: `linear-gradient(to top, ${service.color} 0%, transparent 100%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <service.animatedIcon size={32} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90 mb-4">{service.description}</p>
                    <div className="flex items-center gap-2 text-[#F7941D] font-semibold">
                      {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                      {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-3xl transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section - With animated icons and Saudi imagery
function WhyChooseUsSection() {
  const { language } = useI18n();
  const features = [
    {
      icon: AnimatedShariaCompliant,
      title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant',
      description: language === 'ar' 
        ? 'جميع منتجاتنا معتمدة من الهيئة الشرعية' 
        : 'All products approved by Sharia Board',
    },
    {
      icon: AnimatedQuickApproval,
      title: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval',
      description: language === 'ar'
        ? 'احصل على موافقة خلال 24 ساعة'
        : 'Get approved within 24 hours',
    },
    {
      icon: AnimatedCustomerSupport,
      title: language === 'ar' ? 'خدمة مميزة' : 'Premium Service',
      description: language === 'ar'
        ? 'فريق متخصص لخدمتك على مدار الساعة'
        : 'Dedicated team at your service 24/7',
    },
    {
      icon: AnimatedService247,
      title: language === 'ar' ? 'تغطية شاملة' : 'Wide Coverage',
      description: language === 'ar'
        ? 'فروع في جميع مناطق المملكة'
        : 'Branches across all regions',
    },
  ];

  return (
    <section className="py-24 bg-[#00377B] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Large A pattern */}
        <motion.svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5"
          viewBox="0 0 100 100"
        >
          <path
            d="M10 90 L50 10 L90 90 M25 60 L75 60"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </motion.svg>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0066B3]/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F7941D]/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F7941D] text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              {language === 'ar' ? 'لماذا نحن' : 'Why Choose Us'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'ar' 
                ? 'شريكك الموثوق في التمويل' 
                : 'Your Trusted Finance Partner'}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {language === 'ar'
                ? 'نحن نفخر بتقديم أفضل الحلول التمويلية المتوافقة مع الشريعة الإسلامية، مع التزامنا بالشفافية والمصداقية.'
                : 'We pride ourselves on providing the best Sharia-compliant financing solutions, with a commitment to transparency and integrity.'}
            </p>

            {/* Feature List - With animated icons */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#F7941D] flex items-center justify-center shrink-0">
                      <FeatureIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-white/70">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Content - Saudi professional image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              {/* Main Image - Saudi professional/customer */}
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                alt={language === 'ar' ? 'عميل سعيد' : 'Happy Customer'}
                fill
                className="object-cover"
              />
              
              {/* Floating Card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#00377B] flex items-center justify-center">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#00377B] text-lg">
                      {language === 'ar' ? 'معتمد من ساما' : 'SAMA Licensed'}
                    </div>
                    <div className="text-[#0066B3] text-sm">
                      {language === 'ar' ? 'البنك المركزي السعودي' : 'Saudi Central Bank'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-[#F7941D] rounded-3xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#F7941D]/20 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const { language } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'رائد أعمال' : 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      quote: language === 'ar'
        ? 'تجربة رائعة مع أجل للتمويل! حصلت على تمويل سيارتي في وقت قياسي. الفريق كان متعاوناً جداً.'
        : 'Amazing experience with AJIL Finance! Got my car financing in record time. The team was very cooperative.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'سارة العمري' : 'Sara Al-Omari',
      role: language === 'ar' ? 'مديرة تنفيذية' : 'Executive Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      quote: language === 'ar'
        ? 'أفضل شركة تمويل تعاملت معها. الشفافية والمصداقية في كل خطوة.'
        : 'Best financing company I have dealt with. Transparency and credibility at every step.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'خالد السعيد' : 'Khalid Al-Saeed',
      role: language === 'ar' ? 'صاحب أعمال' : 'Business Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      quote: language === 'ar'
        ? 'ساعدتني أجل في تمويل توسع شركتي. شكراً للفريق المحترف!'
        : 'AJIL helped me finance my company expansion. Thanks to the professional team!',
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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7941D]/10 text-[#F7941D] text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            {language === 'ar' ? 'آراء عملائنا' : 'Testimonials'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00377B] mb-4">
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-[#F7941D]/20">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F7941D]">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-start">
                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < testimonials[activeIndex].rating
                            ? 'fill-[#F7941D] text-[#F7941D]'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl md:text-2xl text-[#00377B] mb-6 leading-relaxed">
                    "{testimonials[activeIndex].quote}"
                  </p>

                  {/* Author */}
                  <div>
                    <div className="font-bold text-[#00377B] text-lg">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-[#0066B3]">
                      {testimonials[activeIndex].role}
                    </div>
                  </div>
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
                    ? 'w-8 bg-[#F7941D]'
                    : 'w-3 bg-[#00377B]/30 hover:bg-[#00377B]/50'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { language, dir } = useI18n();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1560472355-536de3962603?w=1920&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-driving-through-city-at-night-4405/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00377B]/95 to-[#0066B3]/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AjilLogoMark size={80} />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-8 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {language === 'ar' 
              ? 'مستعد لتحقيق أحلامك؟' 
              : 'Ready to Achieve Your Dreams?'}
          </motion.h2>

          <motion.p
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {language === 'ar'
              ? 'تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا'
              : 'Contact us today and get a free consultation from our experts'}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/apply">
              <motion.button
                className="px-10 py-5 bg-[#F7941D] text-white font-bold text-lg rounded-2xl flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'قدّم طلبك الآن' : 'Apply Now'}
                {dir === 'rtl' ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
              </motion.button>
            </Link>
            <a href="tel:8002442211">
              <motion.button
                className="px-10 py-5 border-2 border-white text-white font-semibold text-lg rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                800 244 2211
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Modern Header - Classic theme navigation with transparent mode and animated icons
function ModernHeader() {
  const { language, setLanguage, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Top Bar - AJIL Blue - Only visible when scrolled or on non-hero pages */}
      <motion.div 
        className={cn(
          'fixed top-0 left-0 right-0 z-[60] text-white py-2 text-sm transition-all duration-300',
          isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ backgroundColor: COLORS.navy }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Phone */}
          <a 
            href="tel:8002442211" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            dir="ltr"
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.gold }}>
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
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
            
            {/* Login */}
            <Link 
              href="/login" 
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors"
              style={{ backgroundColor: COLORS.gold, color: '#1a1a1a' }}
            >
              <User className="w-3.5 h-3.5" />
              <span className="font-semibold text-xs">{language === 'ar' ? 'دخول' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Header - Transparent when not scrolled */}
      <header 
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'top-8 bg-white/95 backdrop-blur-md shadow-lg' 
            : 'top-0 bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/modern" className="flex items-center gap-3">
              <div className={cn(
                'relative rounded-lg overflow-hidden transition-all duration-300',
                isScrolled ? '' : 'bg-white/10 backdrop-blur-sm'
              )} style={{ backgroundColor: isScrolled ? COLORS.navy : 'transparent' }}>
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

            {/* Desktop Navigation - With dropdown menus */}
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
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-6 font-medium text-sm transition-colors hover:text-[#F7941D]',
                        isScrolled 
                          ? (activeDropdown === item.key ? 'text-[#0066B3]' : 'text-gray-700')
                          : 'text-white'
                      )}
                    >
                      <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-6 font-medium text-sm transition-colors',
                        isScrolled 
                          ? (activeDropdown === item.key ? 'text-[#0066B3]' : 'text-gray-700')
                          : 'text-white'
                      )}
                    >
                      <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                      <ChevronDown 
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          activeDropdown === item.key ? 'rotate-180' : ''
                        )} 
                      />
                    </button>
                  )}

                  {/* Active indicator line */}
                  <motion.div 
                    className="absolute bottom-0 left-4 right-4 h-[3px] rounded-full"
                    style={{ backgroundColor: COLORS.gold }}
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
                          style={{ backgroundColor: COLORS.navy }}
                        >
                          <span className="text-white font-bold text-sm">
                            {language === 'ar' ? item.labelAr : item.labelEn}
                          </span>
                          <MiniAShape size={24} color="rgba(255,255,255,0.3)" />
                        </div>
                        
                        {/* Dropdown items with animated icons */}
                        <div className="py-2">
                          {item.dropdownItems?.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.animatedIcon;
                            return (
                              <Link
                                key={dropdownItem.key}
                                href={dropdownItem.href}
                                className="group/item flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              >
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover/item:scale-110"
                                  style={{ backgroundColor: `${COLORS.navy}10` }}
                                >
                                  <DropdownIcon size={20} className="text-[#00377B]" />
                                </div>
                                <div className="flex-1">
                                  <span 
                                    className="block font-semibold text-sm group-hover/item:text-[#0066B3] transition-colors text-gray-800"
                                  >
                                    {language === 'ar' ? dropdownItem.labelAr : dropdownItem.labelEn}
                                  </span>
                                  <span className="block text-xs text-gray-500">
                                    {language === 'ar' ? dropdownItem.descAr : dropdownItem.descEn}
                                  </span>
                                </div>
                                <ArrowIcon 
                                  className="w-4 h-4 text-gray-300 group-hover/item:text-[#0066B3] group-hover/item:translate-x-1 rtl:group-hover/item:-translate-x-1 transition-all" 
                                />
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown footer CTA */}
                        <div className="px-4 py-3 border-t border-gray-100">
                          <Link
                            href="/apply"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-gray-900 transition-all hover:opacity-90"
                            style={{ backgroundColor: COLORS.gold }}
                          >
                            <MiniAShape size={16} color="rgba(0,0,0,0.3)" />
                            <span>{language === 'ar' ? 'تقدم الآن' : 'Apply Now'}</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Switch to Classic Homepage */}
              <Link
                href="/"
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90 border-2',
                  isScrolled 
                    ? 'border-[#00377B] text-[#00377B]'
                    : 'border-white/50 text-white hover:bg-white/10'
                )}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>{language === 'ar' ? 'الصفحة الكلاسيكية' : 'Classic Design'}</span>
              </Link>
              
              {/* Language Toggle - Only when not scrolled (top bar has it when scrolled) */}
              {!isScrolled && (
                <button
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="px-4 py-2 rounded-xl font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {language === 'ar' ? 'EN' : 'عربي'}
                </button>
              )}
              
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 hover:scale-105 text-gray-900"
                style={{ backgroundColor: COLORS.gold }}
              >
                <MiniAShape size={16} color="rgba(0,0,0,0.2)" />
                <span>{language === 'ar' ? 'تقدم بطلبك' : 'Apply Now'}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                isScrolled 
                  ? 'bg-[#00377B]/10 text-[#00377B]'
                  : 'bg-white/10 text-white'
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full screen overlay */}
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
                style={{ backgroundColor: COLORS.navy }}
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
              <div className="relative h-8 overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
                <svg viewBox="0 0 400 40" className="absolute bottom-0 w-full" preserveAspectRatio="none">
                  <path d="M0,40 L200,10 L400,40 Z" fill="white" />
                  <path d="M150,38 L200,15 L250,38" fill="none" stroke={COLORS.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-4">
                  {navItems.map((item) => {
                    const ItemIcon = item.icon;
                    const AnimIcon = item.animatedIcon;
                    const isExpanded = mobileActiveDropdown === item.key;
                    
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
                              style={{ backgroundColor: `${COLORS.navy}10` }}
                            >
                              <AnimIcon size={20} className="text-[#00377B]" />
                            </div>
                            <span className="font-semibold" style={{ color: COLORS.navy }}>
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
                                  backgroundColor: isExpanded ? COLORS.navy : `${COLORS.navy}10`,
                                }}
                              >
                                <AnimIcon size={20} className={isExpanded ? 'text-white' : 'text-[#00377B]'} />
                              </div>
                              <span 
                                className="font-semibold flex-1 text-start"
                                style={{ color: COLORS.navy }}
                              >
                                {language === 'ar' ? item.labelAr : item.labelEn}
                              </span>
                              <ChevronDown 
                                className={cn(
                                  'w-5 h-5 transition-transform duration-200',
                                  isExpanded ? 'rotate-180' : ''
                                )}
                                style={{ color: COLORS.gold }}
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
                                  style={{ backgroundColor: `${COLORS.navy}05` }}
                                >
                                  {item.dropdownItems?.map((subItem) => {
                                    const SubIcon = subItem.animatedIcon;
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
                                          <SubIcon size={16} className="text-[#F7941D]" />
                                        </div>
                                        <div>
                                          <span className="block font-medium text-sm" style={{ color: COLORS.navy }}>
                                            {language === 'ar' ? subItem.labelAr : subItem.labelEn}
                                          </span>
                                          <span className="block text-xs text-gray-500">
                                            {language === 'ar' ? subItem.descAr : subItem.descEn}
                                          </span>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Menu Footer */}
              <div className="p-4 border-t border-gray-100">
                {/* Switch to Classic */}
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold border-2 mb-3 transition-colors"
                  style={{ borderColor: COLORS.navy, color: COLORS.navy }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span>{language === 'ar' ? 'جرّب التصميم الكلاسيكي' : 'Try Classic Design'}</span>
                </Link>
                
                {/* Apply Button with A shape */}
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all hover:opacity-90 text-gray-900"
                  style={{ backgroundColor: COLORS.gold }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MiniAShape size={18} color="rgba(0,0,0,0.2)" />
                  <span>{language === 'ar' ? 'تقدم بطلبك الآن' : 'Apply Now'}</span>
                </Link>
                
                {/* Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded-xl font-semibold border-2 transition-colors"
                  style={{ borderColor: COLORS.navy, color: COLORS.navy }}
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
                    style={{ color: COLORS.navy }}
                    dir="ltr"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: COLORS.gold }}
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
  );
}

// Modern Footer
function ModernFooter() {
  const { language } = useI18n();

  return (
    <footer className="bg-[#00377B] text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="footer-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0L20 20L10 10L0 20L10 0Z" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <AjilLogoMark size={50} animated={false} />
              <span className="text-3xl font-bold">{language === 'ar' ? 'أجل للتمويل' : 'AJIL Finance'}</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              {language === 'ar'
                ? 'شركة أجل للتمويل، رائدة في تقديم الحلول التمويلية المتوافقة مع الشريعة الإسلامية في المملكة العربية السعودية.'
                : 'AJIL Finance Company, a pioneer in providing Sharia-compliant financing solutions in Saudi Arabia.'}
            </p>
            <div className="flex items-center gap-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com/ajilfinance`}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#F7941D] transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="space-y-3">
              {[
                { label: language === 'ar' ? 'عن أجل' : 'About Us', href: '/about/story' },
                { label: language === 'ar' ? 'الأخبار' : 'News', href: '/about/news' },
                { label: language === 'ar' ? 'الوظائف' : 'Careers', href: '/careers' },
                { label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/70 hover:text-[#F7941D] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F7941D]" />
                <a href="tel:8002442211" className="text-white/70 hover:text-white" dir="ltr">
                  800 244 2211
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#F7941D]" />
                <a href="mailto:info@ajil.com" className="text-white/70 hover:text-white">
                  info@ajil.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            {language === 'ar'
              ? '© 2008-2025 شركة أجل للتمويل - جميع الحقوق محفوظة'
              : '© 2008-2025 AJIL Finance Company - All Rights Reserved'}
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-white">{language === 'ar' ? 'الخصوصية' : 'Privacy'}</Link>
            <Link href="/terms" className="text-white/50 hover:text-white">{language === 'ar' ? 'الشروط' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Modern Homepage
export default function ModernHomepage() {
  return (
    <main className="min-h-screen">
      <ModernHeader />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProductShowcase />
      <WhyChooseUsSection />
      <LifestyleGallery />
      <InteractiveCalculator />
      <BranchesPreview />
      <TestimonialsSection />
      <AppDownload />
      <PartnersAchievements />
      <CTASection />
      <ModernFooter />
    </main>
  );
}
