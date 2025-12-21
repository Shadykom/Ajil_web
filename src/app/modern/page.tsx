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
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

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

// Video Hero Section
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
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1560472355-536de3962603?w=1920&q=80"
        >
          {/* Using a beautiful cityscape/lifestyle video from a CDN */}
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-view-of-city-buildings-4411/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00377B]/80 via-[#00377B]/60 to-[#00377B]/90" />
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

// Services Section with 3D Cards
function ServicesSection() {
  const { language, dir } = useI18n();
  const services = [
    {
      icon: Car,
      title: language === 'ar' ? 'تمويل السيارات' : 'Auto Financing',
      description: language === 'ar' 
        ? 'احصل على سيارة أحلامك مع خطط سداد مرنة' 
        : 'Get your dream car with flexible payment plans',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      color: '#0066B3',
      href: '/individuals/car-financing',
    },
    {
      icon: HomeIcon,
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar'
        ? 'حقق أهدافك المالية مع حلول تمويلية مخصصة'
        : 'Achieve your financial goals with customized solutions',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      color: '#00377B',
      href: '/individuals/personal-financing',
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar'
        ? 'نمِّ أعمالك مع خيارات تمويل متنوعة'
        : 'Grow your business with diverse financing options',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
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
                      <service.icon className="w-8 h-8" />
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

// Why Choose Us Section
function WhyChooseUsSection() {
  const { language } = useI18n();
  const features = [
    {
      icon: Shield,
      title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant',
      description: language === 'ar' 
        ? 'جميع منتجاتنا معتمدة من الهيئة الشرعية' 
        : 'All products approved by Sharia Board',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval',
      description: language === 'ar'
        ? 'احصل على موافقة خلال 24 ساعة'
        : 'Get approved within 24 hours',
    },
    {
      icon: Heart,
      title: language === 'ar' ? 'خدمة مميزة' : 'Premium Service',
      description: language === 'ar'
        ? 'فريق متخصص لخدمتك على مدار الساعة'
        : 'Dedicated team at your service 24/7',
    },
    {
      icon: Globe,
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

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F7941D] flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Video/Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              {/* Main Image */}
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                alt="Happy Customer"
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

// Modern Header
function ModernHeader() {
  const { language, setLanguage, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/modern" className="flex items-center gap-3">
            <AjilLogoMark size={40} animated={false} />
            <span className={cn(
              'text-2xl font-bold transition-colors',
              isScrolled ? 'text-[#00377B]' : 'text-white'
            )}>
              {language === 'ar' ? 'أجل' : 'AJIL'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: language === 'ar' ? 'الأفراد' : 'Individuals', href: '/individuals/car-financing' },
              { label: language === 'ar' ? 'الأعمال' : 'Business', href: '/business/cash-financing' },
              { label: language === 'ar' ? 'الحاسبة' : 'Calculator', href: '/calculator' },
              { label: language === 'ar' ? 'الفروع' : 'Branches', href: '/branches' },
              { label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'font-medium transition-colors hover:text-[#F7941D]',
                  isScrolled ? 'text-[#00377B]' : 'text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Switch to Classic */}
            <Link href="/">
              <motion.button
                className={cn(
                  'hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  isScrolled
                    ? 'bg-gray-100 text-[#00377B] hover:bg-gray-200'
                    : 'bg-white/10 text-white hover:bg-white/20'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                {language === 'ar' ? 'الصفحة الكلاسيكية' : 'Classic Homepage'}
              </motion.button>
            </Link>

            {/* Language */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className={cn(
                'px-4 py-2 rounded-xl font-medium transition-colors',
                isScrolled
                  ? 'bg-gray-100 text-[#00377B] hover:bg-gray-200'
                  : 'bg-white/10 text-white hover:bg-white/20'
              )}
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>

            {/* CTA */}
            <Link href="/apply">
              <motion.button
                className="hidden md:flex px-6 py-3 bg-[#F7941D] text-white font-bold rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'قدّم طلبك' : 'Apply Now'}
              </motion.button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-xl',
                isScrolled ? 'text-[#00377B]' : 'text-white'
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <nav className="p-4 space-y-2">
                {[
                  { label: language === 'ar' ? 'الأفراد' : 'Individuals', href: '/individuals/car-financing' },
                  { label: language === 'ar' ? 'الأعمال' : 'Business', href: '/business/cash-financing' },
                  { label: language === 'ar' ? 'الحاسبة' : 'Calculator', href: '/calculator' },
                  { label: language === 'ar' ? 'الفروع' : 'Branches', href: '/branches' },
                  { label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
                  { label: language === 'ar' ? 'الصفحة الكلاسيكية' : 'Classic Homepage', href: '/' },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-4 py-3 text-[#00377B] font-medium hover:bg-gray-100 rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/apply"
                  className="block px-4 py-3 bg-[#F7941D] text-white font-bold text-center rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {language === 'ar' ? 'قدّم طلبك' : 'Apply Now'}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
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
