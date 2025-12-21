'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Send,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  Bell,
  TrendingUp,
  RefreshCw,
  Building2,
  Car,
  Users,
  Menu,
  X,
  Phone,
  ChevronDown,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Import the new connected products components
import ConnectedProducts from './components/ConnectedProducts';
import StripeConnectedProducts from './components/StripeConnectedProducts';
import StripeProductGrid from './components/StripeProductGrid';

// AJIL Brand Colors
const COLORS = {
  navy: '#00377B',
  blue: '#0066B3',
  lightBlue: '#4DA3E0',
  gold: '#F7941D',
  white: '#FFFFFF',
  cream: '#FFF8F0',
  dark: '#0A0A1A',
  purple: '#6366F1',
  cyan: '#22D3EE',
  gradient: {
    primary: 'linear-gradient(135deg, #00377B 0%, #0066B3 50%, #00377B 100%)',
    accent: 'linear-gradient(135deg, #F7941D 0%, #FDB913 100%)',
    mesh: 'radial-gradient(at 40% 20%, hsla(210, 100%, 20%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 30%, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(25, 100%, 50%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(210, 100%, 30%, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(210, 100%, 25%, 1) 0px, transparent 50%)',
  },
};

// Animated Mesh Gradient Background
function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0A0A1A 0%, #00377B 50%, #0A0A1A 100%)',
        }}
      />
      
      {/* Animated mesh gradient blobs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,179,0.8) 0%, transparent 70%)',
          left: '10%',
          top: '20%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(247,148,29,0.6) 0%, transparent 70%)',
          right: '10%',
          top: '40%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)',
          left: '50%',
          bottom: '10%',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [-50, 50, -50],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// Hero Section
function HeroSection() {
  const { language, dir } = useI18n();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <MeshGradientBackground />
      
      <div className="container mx-auto px-4 relative z-10 py-32">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ShieldCheck className="w-4 h-4 text-[#F7941D]" />
            <span className="text-white/80 text-sm">
              {language === 'ar' ? 'تمويل متوافق مع الشريعة الإسلامية' : 'Sharia-Compliant Financing'}
            </span>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {language === 'ar' ? (
              <>
                <span className="block">{language === 'ar' ? 'مستقبل' : 'The Future of'}</span>
                <span 
                  className="block bg-gradient-to-r from-[#F7941D] via-[#FDB913] to-[#F7941D] bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                >
                  {language === 'ar' ? 'التمويل الذكي' : 'Smart Finance'}
                </span>
              </>
            ) : (
              <>
                <span className="block">The Future of</span>
                <span 
                  className="block bg-gradient-to-r from-[#F7941D] via-[#FDB913] to-[#F7941D] bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                >
                  Smart Finance
                </span>
              </>
            )}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {language === 'ar'
              ? 'منصة تمويلية متكاملة تجمع بين التقنية المتقدمة والتمويل المتوافق مع الشريعة الإسلامية'
              : 'An integrated financial platform combining advanced technology with Sharia-compliant financing'}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/apply">
              <motion.button
                className="group relative px-8 py-4 bg-[#F7941D] text-white font-bold rounded-2xl overflow-hidden flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                </span>
                {dir === 'rtl' ? (
                  <ArrowLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F7941D] to-[#FDB913] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </Link>
            
            <Link href="/calculator">
              <motion.button
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet className="w-5 h-5" />
                {language === 'ar' ? 'حاسبة التمويل' : 'Finance Calculator'}
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Stats row */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { value: '17+', label: language === 'ar' ? 'سنة خبرة' : 'Years' },
              { value: '100K+', label: language === 'ar' ? 'عميل' : 'Clients' },
              { value: '50+', label: language === 'ar' ? 'فرع' : 'Branches' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/40" />
      </motion.div>
    </section>
  );
}

// Features Grid Section
function FeaturesSection() {
  const { language } = useI18n();
  
  const features = [
    {
      icon: ShieldCheck,
      title: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant',
      description: language === 'ar' 
        ? 'جميع منتجاتنا معتمدة من الهيئة الشرعية' 
        : 'All products approved by Sharia Board',
      color: '#22C55E',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'موافقة فورية' : 'Instant Approval',
      description: language === 'ar'
        ? 'احصل على الموافقة في دقائق'
        : 'Get approved within minutes',
      color: COLORS.gold,
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'تغطية واسعة' : 'Wide Coverage',
      description: language === 'ar'
        ? '50+ فرع في جميع أنحاء المملكة'
        : '50+ branches across the Kingdom',
      color: COLORS.lightBlue,
    },
    {
      icon: Smartphone,
      title: language === 'ar' ? 'تطبيق ذكي' : 'Smart App',
      description: language === 'ar'
        ? 'إدارة حسابك من أي مكان'
        : 'Manage your account from anywhere',
      color: '#A855F7',
    },
  ];
  
  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0A1A] to-[#00377B] relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === 'ar' ? 'لماذا تختار أجل؟' : 'Why Choose AJIL?'}
          </h2>
          <p className="text-xl text-white/60">
            {language === 'ar'
              ? 'مميزات تجعلنا الخيار الأول للتمويل'
              : 'Features that make us the first choice for financing'}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ 
                  background: `${feature.color}20`,
                  border: `1px solid ${feature.color}30`,
                }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
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
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #00377B 0%, #001F3F 100%)',
        }}
      />
      
      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(247,148,29,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {language === 'ar' 
                ? 'مستعد للبدء؟' 
                : 'Ready to Start?'}
            </h2>
            <p className="text-xl text-white/60 mb-10">
              {language === 'ar'
                ? 'انضم إلى آلاف العملاء الذين وثقوا بنا'
                : 'Join thousands of clients who trusted us'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  className="px-10 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  800 244 2211
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Header Component
function StripeStyleHeader() {
  const { language, setLanguage, dir } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-[#0A0A1A]/90 backdrop-blur-xl border-b border-white/10" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#00377B]">
              <Image
                src="/images/AJIL_logo.png"
                alt="AJIL"
                fill
                className="object-contain p-1"
              />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">AJIL</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: '/individuals/personal-financing', label: language === 'ar' ? 'الأفراد' : 'Personal' },
              { href: '/business/cash-financing', label: language === 'ar' ? 'الأعمال' : 'Business' },
              { href: '/calculator', label: language === 'ar' ? 'الحاسبة' : 'Calculator' },
              { href: '/about/story', label: language === 'ar' ? 'عن أجل' : 'About' },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-white/70 hover:text-white transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="text-white/70 hover:text-white transition-colors font-medium"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
            
            <Link 
              href="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              {language === 'ar' ? 'الصفحة الرئيسية' : 'Main Home'}
            </Link>
            
            <Link href="/apply">
              <button className="px-6 py-2.5 bg-[#F7941D] text-white font-semibold rounded-xl hover:bg-[#F7941D]/90 transition-colors">
                {language === 'ar' ? 'تقدم الآن' : 'Apply'}
              </button>
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              className={cn(
                "fixed top-0 h-full w-80 bg-[#0A0A1A] z-50 p-6",
                dir === 'rtl' ? 'left-0' : 'right-0'
              )}
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <nav className="mt-16 space-y-4">
                {[
                  { href: '/individuals/personal-financing', label: language === 'ar' ? 'الأفراد' : 'Personal' },
                  { href: '/business/cash-financing', label: language === 'ar' ? 'الأعمال' : 'Business' },
                  { href: '/calculator', label: language === 'ar' ? 'الحاسبة' : 'Calculator' },
                  { href: '/about/story', label: language === 'ar' ? 'عن أجل' : 'About' },
                  { href: '/', label: language === 'ar' ? 'الصفحة الرئيسية' : 'Main Home' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block text-white/70 hover:text-white transition-colors font-medium text-lg py-3 border-b border-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <Link href="/apply" className="block mt-8">
                <button className="w-full px-6 py-3 bg-[#F7941D] text-white font-semibold rounded-xl">
                  {language === 'ar' ? 'تقدم الآن' : 'Apply Now'}
                </button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

// Footer
function StripeStyleFooter() {
  const { language } = useI18n();
  
  return (
    <footer className="bg-[#0A0A1A] text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#00377B] flex items-center justify-center">
                <Image
                  src="/images/AJIL_logo.png"
                  alt="AJIL"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-[#F7941D]">
                {language === 'ar' ? 'أجل للتمويل' : 'AJIL Finance'}
              </span>
            </div>
            <p className="text-white/50 max-w-md">
              {language === 'ar'
                ? 'شركة أجل للتمويل، رائدة في تقديم الحلول التمويلية المتوافقة مع الشريعة الإسلامية.'
                : 'AJIL Finance Company, a pioneer in providing Sharia-compliant financing solutions.'}
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-[#F7941D]">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/about/story', label: language === 'ar' ? 'عن أجل' : 'About' },
                { href: '/about/news', label: language === 'ar' ? 'الأخبار' : 'News' },
                { href: '/contact', label: language === 'ar' ? 'اتصل بنا' : 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-[#F7941D]">
              {language === 'ar' ? 'تواصل معنا' : 'Contact'}
            </h4>
            <a 
              href="tel:8002442211" 
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              dir="ltr"
            >
              <Phone className="w-4 h-4" />
              800 244 2211
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          {language === 'ar'
            ? '© 2008-2025 شركة أجل للتمويل - جميع الحقوق محفوظة'
            : '© 2008-2025 AJIL Finance Company - All Rights Reserved'}
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function StripeStyleHomepage() {
  return (
    <main className="min-h-screen bg-[#0A0A1A]">
      <StripeStyleHeader />
      <HeroSection />
      <StripeProductGrid />
      <StripeConnectedProducts />
      <FeaturesSection />
      <CTASection />
      <StripeStyleFooter />
    </main>
  );
}
