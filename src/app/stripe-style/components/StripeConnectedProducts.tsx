'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Car,
  Wallet,
  Building2,
  CreditCard,
  Smartphone,
  Banknote,
  TrendingUp,
  Users,
  Calculator,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Colors
const COLORS = {
  navy: '#00377B',
  blue: '#0066B3',
  gold: '#F7941D',
  cyan: '#06B6D4',
  purple: '#8B5CF6',
  green: '#10B981',
  pink: '#EC4899',
  orange: '#F97316',
};

// Product data matching Stripe's layout
const products = {
  left: [
    {
      id: 'car-financing',
      icon: Car,
      title: { ar: 'تمويل السيارات', en: 'Auto Financing' },
      subtitle: { ar: 'امتلك سيارة أحلامك', en: 'Own your dream car' },
      color: COLORS.gold,
      href: '/individuals/car-financing',
    },
    {
      id: 'personal-financing',
      icon: Wallet,
      title: { ar: 'التمويل الشخصي', en: 'Personal Finance' },
      subtitle: { ar: 'حلول مرنة لاحتياجاتك', en: 'Flexible solutions for your needs' },
      color: COLORS.cyan,
      href: '/individuals/personal-financing',
    },
    {
      id: 'business-financing',
      icon: Building2,
      title: { ar: 'تمويل الأعمال', en: 'Business Finance' },
      subtitle: { ar: 'نمو أعمالك يبدأ هنا', en: 'Your business growth starts here' },
      color: COLORS.purple,
      href: '/business/cash-financing',
    },
  ],
  right: [
    {
      id: 'heavy-equipment',
      icon: TrendingUp,
      title: { ar: 'المعدات الثقيلة', en: 'Heavy Equipment' },
      subtitle: { ar: 'تمويل الآليات والمعدات', en: 'Machinery & equipment financing' },
      color: COLORS.green,
      href: '/business/heavy-equipment',
    },
    {
      id: 'fleet-financing',
      icon: Users,
      title: { ar: 'تمويل الأساطيل', en: 'Fleet Financing' },
      subtitle: { ar: 'حلول للشركات', en: 'Corporate solutions' },
      color: COLORS.pink,
      href: '/business/car-financing',
    },
    {
      id: 'calculator',
      icon: Calculator,
      title: { ar: 'حاسبة التمويل', en: 'Finance Calculator' },
      subtitle: { ar: 'احسب قسطك الشهري', en: 'Calculate your monthly payment' },
      color: COLORS.orange,
      href: '/calculator',
    },
  ],
};

// Animated Wire Component
function Wire({
  startX,
  startY,
  endX,
  endY,
  color,
  isActive,
  direction = 'left',
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  isActive: boolean;
  direction?: 'left' | 'right';
}) {
  // Create smooth bezier curve
  const midX = (startX + endX) / 2;
  const controlOffset = direction === 'left' ? 80 : -80;
  
  const d = `M ${startX} ${startY} 
             C ${startX + controlOffset} ${startY}, 
               ${endX - controlOffset} ${endY}, 
               ${endX} ${endY}`;
  
  return (
    <g>
      {/* Background wire */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Active/hover wire */}
      <motion.path
        d={d}
        fill="none"
        strokeWidth={isActive ? 2.5 : 1.5}
        strokeLinecap="round"
        strokeDasharray="6 6"
        initial={{ 
          stroke: 'rgba(255,255,255,0.1)',
          strokeDashoffset: 0,
        }}
        animate={{ 
          stroke: isActive ? color : 'rgba(255,255,255,0.15)',
          strokeDashoffset: direction === 'left' ? -12 : 12,
        }}
        transition={{
          stroke: { duration: 0.3 },
          strokeDashoffset: {
            duration: 0.6,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{
          filter: isActive ? `drop-shadow(0 0 8px ${color})` : 'none',
        }}
      />
      
      {/* Traveling dot */}
      <motion.circle
        r={isActive ? 5 : 3}
        initial={{ offsetDistance: '0%' }}
        animate={{ 
          offsetDistance: '100%',
          fill: isActive ? color : 'rgba(255,255,255,0.3)',
        }}
        transition={{
          offsetDistance: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          },
          fill: { duration: 0.3 },
        }}
        style={{
          offsetPath: `path('${d}')`,
          filter: isActive ? `drop-shadow(0 0 10px ${color})` : 'none',
        }}
      />
    </g>
  );
}

// Product Card Component
function ProductCard({
  product,
  isHovered,
  onHover,
  side,
  index,
}: {
  product: typeof products.left[0];
  isHovered: boolean;
  onHover: (id: string | null) => void;
  side: 'left' | 'right';
  index: number;
}) {
  const { language, dir } = useI18n();
  const Icon = product.icon;
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link href={product.href}>
        <motion.div
          className={cn(
            "relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer",
            "bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]",
            "hover:bg-white/[0.06] transition-all duration-300"
          )}
          animate={{
            scale: isHovered ? 1.02 : 1,
            borderColor: isHovered ? `${product.color}40` : 'rgba(255,255,255,0.06)',
          }}
          style={{
            boxShadow: isHovered 
              ? `0 20px 40px -15px rgba(0,0,0,0.3), 0 0 20px ${product.color}20`
              : '0 4px 20px -5px rgba(0,0,0,0.2)',
          }}
        >
          {/* Icon */}
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${product.color}20, ${product.color}10)`,
              border: `1px solid ${product.color}30`,
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-6 h-6" style={{ color: product.color }} />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-white text-sm md:text-base transition-colors duration-300"
              style={{ color: isHovered ? product.color : 'white' }}
            >
              {language === 'ar' ? product.title.ar : product.title.en}
            </h3>
            <p className="text-white/50 text-xs md:text-sm truncate">
              {language === 'ar' ? product.subtitle.ar : product.subtitle.en}
            </p>
          </div>
          
          {/* Arrow */}
          <motion.div
            animate={{
              x: isHovered ? (dir === 'rtl' ? -4 : 4) : 0,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight 
              className="w-5 h-5 text-white/50 rtl:rotate-180" 
              style={{ color: isHovered ? product.color : undefined }}
            />
          </motion.div>
          
          {/* Connection point */}
          <div
            className={cn(
              "absolute w-3 h-3 rounded-full",
              side === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
            )}
            style={{
              top: '50%',
              transform: `translateY(-50%) ${side === 'left' ? 'translateX(50%)' : 'translateX(-50%)'}`,
              background: isHovered ? product.color : 'rgba(255,255,255,0.2)',
              boxShadow: isHovered ? `0 0 15px ${product.color}` : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Central Phone/App Display
function CentralDisplay({ hoveredProduct }: { hoveredProduct: string | null }) {
  const { language } = useI18n();
  const activeProduct = [...products.left, ...products.right].find(p => p.id === hoveredProduct);
  
  return (
    <motion.div
      className="relative w-full max-w-[280px] mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-[40px]"
        style={{
          background: activeProduct 
            ? `radial-gradient(circle, ${activeProduct.color}30 0%, transparent 70%)`
            : `radial-gradient(circle, ${COLORS.gold}20 0%, transparent 70%)`,
          filter: 'blur(40px)',
          transform: 'scale(1.2)',
        }}
        animate={{
          opacity: hoveredProduct ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Phone frame */}
      <div 
        className="relative rounded-[40px] p-1.5 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          boxShadow: `
            0 50px 100px -20px rgba(0,0,0,0.8),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Screen */}
        <div 
          className="relative rounded-[34px] overflow-hidden aspect-[9/16]"
          style={{
            background: 'linear-gradient(180deg, #00377B 0%, #001F3F 100%)',
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-b-2xl z-10" />
          
          {/* Screen content */}
          <div className="p-6 pt-10">
            {/* Balance display */}
            <div className="text-center mb-8">
              <p className="text-white/40 text-xs mb-1">
                {language === 'ar' ? 'رصيدك المتاح' : 'Available Balance'}
              </p>
              <motion.h2 
                className="text-3xl font-bold text-white"
                animate={{
                  color: activeProduct ? activeProduct.color : 'white',
                }}
                transition={{ duration: 0.3 }}
              >
                SAR 125,000
              </motion.h2>
            </div>
            
            {/* Active service indicator */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6"
              animate={{
                borderColor: activeProduct ? `${activeProduct.color}40` : 'transparent',
                boxShadow: activeProduct ? `0 0 20px ${activeProduct.color}20` : 'none',
              }}
              style={{
                border: '1px solid transparent',
              }}
              transition={{ duration: 0.3 }}
            >
              {activeProduct ? (
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${activeProduct.color}30` }}
                  >
                    <activeProduct.icon className="w-5 h-5" style={{ color: activeProduct.color }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {language === 'ar' ? activeProduct.title.ar : activeProduct.title.en}
                    </p>
                    <p className="text-white/50 text-xs">
                      {language === 'ar' ? 'مفعّل' : 'Active'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-white/60 text-sm">
                    {language === 'ar' ? 'اختر خدمة للتفاصيل' : 'Hover a service for details'}
                  </p>
                </div>
              )}
            </motion.div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: language === 'ar' ? 'الموافقة' : 'Approval', value: '24h' },
                { label: language === 'ar' ? 'الأقساط' : 'Terms', value: '60m' },
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="bg-white/5 rounded-xl p-3 text-center"
                >
                  <p className="text-white/40 text-xs">{stat.label}</p>
                  <p className="text-white font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

// Main Component
export default function StripeConnectedProducts() {
  const { language, dir } = useI18n();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0F1A 0%, #0F172A 50%, #0A0F1A 100%)',
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Gradient blobs */}
        <motion.div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${COLORS.blue}40 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, ${COLORS.gold}50 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#F7941D] text-sm font-medium mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            {language === 'ar' ? 'خدمات متكاملة' : 'Integrated Services'}
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {language === 'ar' ? (
              <>
                منظومة خدمات مالية
                <br />
                <span className="bg-gradient-to-r from-[#F7941D] via-[#FDB913] to-[#F7941D] bg-clip-text text-transparent">
                  متكاملة ومترابطة
                </span>
              </>
            ) : (
              <>
                A Fully Integrated Suite
                <br />
                <span className="bg-gradient-to-r from-[#F7941D] via-[#FDB913] to-[#F7941D] bg-clip-text text-transparent">
                  of Financial Products
                </span>
              </>
            )}
          </h2>
          
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'كل خدماتنا متصلة ومتكاملة لتوفير تجربة مالية سلسة ومتميزة'
              : 'All our services are connected and integrated to provide a seamless financial experience'}
          </p>
        </motion.div>
        
        {/* Main content: Cards + Phone + Wires */}
        <div className="relative">
          {/* SVG Wires */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            style={{ overflow: 'visible' }}
          >
            {/* Left side wires */}
            {products.left.map((product, index) => {
              const startY = 80 + index * 120;
              return (
                <Wire
                  key={product.id}
                  startX={380}
                  startY={startY}
                  endX={540}
                  endY={200}
                  color={product.color}
                  isActive={hoveredProduct === product.id}
                  direction="left"
                />
              );
            })}
            
            {/* Right side wires */}
            {products.right.map((product, index) => {
              const startY = 80 + index * 120;
              return (
                <Wire
                  key={product.id}
                  startX={760}
                  startY={startY}
                  endX={600}
                  endY={200}
                  color={product.color}
                  isActive={hoveredProduct === product.id}
                  direction="right"
                />
              );
            })}
          </svg>
          
          {/* Three column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left column - Products */}
            <div className="space-y-4 order-2 lg:order-1">
              {products.left.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isHovered={hoveredProduct === product.id}
                  onHover={setHoveredProduct}
                  side="left"
                  index={index}
                />
              ))}
            </div>
            
            {/* Center - Phone display */}
            <div className="order-1 lg:order-2 flex justify-center py-8">
              <CentralDisplay hoveredProduct={hoveredProduct} />
            </div>
            
            {/* Right column - Products */}
            <div className="space-y-4 order-3">
              {products.right.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isHovered={hoveredProduct === product.id}
                  onHover={setHoveredProduct}
                  side="right"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/apply">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F7941D] to-[#FDB913] text-white font-bold rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 20px 50px -15px rgba(247,148,29,0.4)',
              }}
            >
              <span>{language === 'ar' ? 'استكشف جميع الخدمات' : 'Explore All Services'}</span>
              {dir === 'rtl' ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
