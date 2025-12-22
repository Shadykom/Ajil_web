'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Wallet,
  Building2,
  Calculator,
  ShieldCheck,
  Zap,
  CreditCard,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Smartphone,
  Users,
  TrendingUp,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';

// Colors
const COLORS = {
  purple: '#635BFF',
  green: '#00D68F',
  cyan: '#00D4FF',
  navy: '#00377B',
  gold: '#F7941D',
};

// See also links data
const seeAlsoLinks = [
  {
    id: 'car',
    icon: Car,
    label: { ar: 'تمويل السيارات', en: 'Auto Financing' },
    description: { ar: 'للحصول على سيارة أحلامك', en: 'for getting your dream car' },
    color: COLORS.gold,
    href: '/individuals/car-financing',
  },
  {
    id: 'business',
    icon: Building2,
    label: { ar: 'تمويل الأعمال', en: 'Business Finance' },
    description: { ar: 'لنمو وتوسع أعمالك', en: 'for business growth and expansion' },
    color: COLORS.purple,
    href: '/business/cash-financing',
  },
  {
    id: 'calculator',
    icon: Calculator,
    label: { ar: 'حاسبة التمويل', en: 'Calculator' },
    description: { ar: 'لحساب أقساطك الشهرية', en: 'for calculating your monthly payments' },
    color: COLORS.cyan,
    href: '/calculator',
  },
];

// Ghost icons for the connecting area
const ghostIcons = [
  { icon: CreditCard, top: '15%', left: '20%' },
  { icon: FileText, top: '35%', left: '30%' },
  { icon: ShieldCheck, top: '55%', left: '15%' },
  { icon: Smartphone, top: '75%', left: '25%' },
  { icon: Users, top: '25%', right: '25%' },
  { icon: TrendingUp, top: '60%', right: '20%' },
];

// Animated vertical line component
function AnimatedVerticalLine({ 
  x, 
  height = '100%',
  delay = 0,
  color = COLORS.purple,
}: { 
  x: string; 
  height?: string;
  delay?: number;
  color?: string;
}) {
  return (
    <div 
      className="absolute"
      style={{ 
        left: x, 
        top: 0, 
        height,
        width: '2px',
      }}
    >
      {/* Static dashed line */}
      <div 
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            ${color}15 0px,
            ${color}15 8px,
            transparent 8px,
            transparent 16px
          )`,
        }}
      />
      
      {/* Animated flowing dots */}
      <motion.div
        className="absolute w-2 h-2 rounded-full -left-[3px]"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        initial={{ top: '0%', opacity: 0 }}
        animate={{ 
          top: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Ghost icon card
function GhostIconCard({ 
  icon: Icon, 
  style,
}: { 
  icon: React.ElementType;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute w-14 h-14 rounded-xl border border-gray-200/50 bg-white/50 backdrop-blur-sm flex items-center justify-center"
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="w-6 h-6 text-gray-300 stroke-[1.5]" />
    </motion.div>
  );
}

// Mobile Phone Component with Ajil App
function MobilePhoneShowcase() {
  const { language } = useI18n();
  const [step, setStep] = useState(0);
  
  // Animate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Phone frame */}
      <div 
        className="relative w-[280px] md:w-[320px] rounded-[40px] p-2 bg-gray-100"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
        }}
      >
        {/* Phone inner bezel */}
        <div className="w-full rounded-[32px] overflow-hidden bg-white">
          {/* Status bar */}
          <div className="h-6 bg-white flex items-center justify-between px-6">
            <span className="text-[10px] font-medium text-gray-900">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-gray-900 rounded-sm">
                <div className="w-3/4 h-full bg-gray-900 rounded-sm" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="p-4">
            {/* Product card */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-center mb-3">
                {/* Car illustration placeholder */}
                <div className="w-24 h-16 flex items-center justify-center">
                  <Car className="w-16 h-12 text-[#00377B]" strokeWidth={1} />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                {language === 'ar' ? 'تمويل سيارة 2024' : 'Car Finance 2024'}
              </p>
              <p className="text-center text-lg font-bold text-gray-900">
                SAR 2,500/{language === 'ar' ? 'شهرياً' : 'month'}
              </p>
            </div>

            {/* Apply button */}
            <button 
              className="w-full py-3 rounded-xl text-white font-semibold mb-3 flex items-center justify-center gap-2"
              style={{ background: '#00377B' }}
            >
              {language === 'ar' ? 'تقدم الآن' : 'Apply Now'}
            </button>

            {/* Quick apply button */}
            <button 
              className="w-full py-3 rounded-xl text-white font-semibold mb-4 flex items-center justify-center gap-2"
              style={{ background: COLORS.green }}
            >
              <Zap className="w-4 h-4" />
              {language === 'ar' ? 'موافقة سريعة' : 'Quick Approval'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">
                {language === 'ar' ? 'أو أكمل طلبك' : 'Or complete your application'}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Form fields */}
            <div className="space-y-3">
              {/* Name field */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-white">
                  <span className="text-sm text-gray-400">
                    {language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'}
                  </span>
                </div>
              </div>

              {/* ID field */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {language === 'ar' ? 'رقم الهوية' : 'ID Number'}
                </label>
                <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-white flex items-center justify-between">
                  <span className="text-sm text-gray-900">1234 5678 9012</span>
                  <span className="text-xs text-green-500 font-medium">✓</span>
                </div>
              </div>

              {/* Salary field */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {language === 'ar' ? 'الراتب الشهري' : 'Monthly Salary'}
                </label>
                <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-white flex items-center gap-2">
                  <span className="text-sm text-gray-900">15,000</span>
                  <span className="text-xs text-gray-400">SAR</span>
                </div>
              </div>

              {/* Employer dropdown */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {language === 'ar' ? 'جهة العمل' : 'Employer'}
                </label>
                <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-white flex items-center justify-between">
                  <span className="text-sm text-gray-900">
                    {language === 'ar' ? 'شركة أرامكو' : 'Aramco Company'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button 
              className="w-full py-3 rounded-xl text-white font-semibold mt-4 flex items-center justify-center gap-2"
              style={{ background: '#0F172A' }}
            >
              {language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
            </button>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-28 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -right-4 top-1/4 bg-white rounded-2xl p-3 shadow-xl border border-gray-100"
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${COLORS.purple}15` }}
        >
          <ShieldCheck className="w-5 h-5" style={{ color: COLORS.purple }} />
        </div>
      </motion.div>

      {/* Floating approval badge */}
      <motion.div
        className="absolute -left-4 bottom-1/4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${COLORS.green}20` }}
        >
          <CheckCircle className="w-4 h-4" style={{ color: COLORS.green }} />
        </div>
        <div>
          <p className="text-xs text-gray-500">{language === 'ar' ? 'تمت الموافقة' : 'Approved'}</p>
          <p className="text-sm font-bold text-gray-900">24h</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Component
export default function PaymentShowcase() {
  const { language, dir } = useI18n();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left content */}
          <motion.div 
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Main heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {language === 'ar' ? (
                <>
                  زيادة معدلات الموافقة،
                  <br />
                  وتقديم حلول تمويلية مرنة
                  <br />
                  باستخدام التقنية الذكية.
                </>
              ) : (
                <>
                  Increase approval rates,
                  <br />
                  offer flexible financing,
                  <br />
                  powered by smart technology.
                </>
              )}
            </h2>

            {/* CTA Button */}
            <Link href="/apply">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold mb-10"
                style={{ background: COLORS.purple }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'ابدأ طلبك' : 'Start Application'}
                {dir === 'rtl' ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </motion.button>
            </Link>

            {/* See also section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {language === 'ar' ? 'انظر أيضاً' : 'See also'}
              </h3>
              
              <div className="space-y-3">
                {seeAlsoLinks.map((link) => (
                  <Link key={link.id} href={link.href}>
                    <motion.div
                      className="flex items-center gap-1 group"
                      onMouseEnter={() => setHoveredLink(link.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span 
                        className="font-semibold transition-colors"
                        style={{ color: link.color }}
                      >
                        {language === 'ar' ? link.label.ar : link.label.en}
                      </span>
                      <span className="text-gray-600">
                        {' '}{language === 'ar' ? link.description.ar : link.description.en}
                      </span>
                      <motion.span
                        animate={{ x: hoveredLink === link.id ? 4 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {dir === 'rtl' ? (
                          <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: link.color }} />
                        ) : (
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: link.color }} />
                        )}
                      </motion.span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom icon with label */}
            <motion.div 
              className="flex items-center gap-3 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.green})`,
                }}
              >
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">
                {language === 'ar' ? 'إدارة التمويل' : 'Finance Management'}
              </span>
            </motion.div>
          </motion.div>

          {/* Middle connecting area */}
          <div className="hidden lg:block relative w-48 h-[600px]">
            {/* Vertical animated lines */}
            <AnimatedVerticalLine x="25%" delay={0} color={COLORS.purple} />
            <AnimatedVerticalLine x="50%" delay={0.5} color={COLORS.cyan} />
            <AnimatedVerticalLine x="75%" delay={1} color={COLORS.gold} />
            
            {/* Ghost icons */}
            {ghostIcons.map((ghost, index) => (
              <GhostIconCard
                key={index}
                icon={ghost.icon}
                style={{
                  top: ghost.top,
                  left: ghost.left,
                  right: ghost.right,
                }}
              />
            ))}
          </div>

          {/* Right phone showcase */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <MobilePhoneShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
