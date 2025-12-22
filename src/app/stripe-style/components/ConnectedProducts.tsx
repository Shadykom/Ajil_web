'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Wallet,
  Building2,
  CreditCard,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Users,
  Banknote,
  Calculator,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// AJIL Brand Colors
const COLORS = {
  navy: '#00377B',
  blue: '#0066B3',
  lightBlue: '#4DA3E0',
  gold: '#F7941D',
  cyan: '#22D3EE',
  purple: '#8B5CF6',
  green: '#22C55E',
  pink: '#EC4899',
};

// Service card data
const services = [
  {
    id: 'car-financing',
    icon: Car,
    title: { ar: 'تمويل السيارات', en: 'Auto Financing' },
    description: { 
      ar: 'احصل على سيارة أحلامك مع خطط سداد مرنة وموافقة سريعة',
      en: 'Get your dream car with flexible payment plans and quick approval'
    },
    color: COLORS.gold,
    href: '/individuals/car-financing',
    position: { row: 1, col: 1 },
  },
  {
    id: 'personal-financing',
    icon: Wallet,
    title: { ar: 'التمويل الشخصي', en: 'Personal Finance' },
    description: { 
      ar: 'حلول تمويلية مخصصة لاحتياجاتك الشخصية',
      en: 'Customized financing solutions for your personal needs'
    },
    color: COLORS.cyan,
    href: '/individuals/personal-financing',
    position: { row: 1, col: 2 },
  },
  {
    id: 'business-financing',
    icon: Building2,
    title: { ar: 'تمويل الأعمال', en: 'Business Finance' },
    description: { 
      ar: 'نمو أعمالك مع حلول تمويلية متكاملة',
      en: 'Grow your business with integrated financing solutions'
    },
    color: COLORS.purple,
    href: '/business/cash-financing',
    position: { row: 1, col: 3 },
  },
  {
    id: 'heavy-equipment',
    icon: TrendingUp,
    title: { ar: 'المعدات الثقيلة', en: 'Heavy Equipment' },
    description: { 
      ar: 'تمويل المعدات والآليات الثقيلة لمشاريعك',
      en: 'Finance heavy equipment and machinery for your projects'
    },
    color: COLORS.green,
    href: '/business/heavy-equipment',
    position: { row: 2, col: 1 },
  },
  {
    id: 'fleet-financing',
    icon: Users,
    title: { ar: 'تمويل الأساطيل', en: 'Fleet Financing' },
    description: { 
      ar: 'حلول متكاملة لتمويل أسطول المركبات',
      en: 'Complete solutions for fleet vehicle financing'
    },
    color: COLORS.pink,
    href: '/business/car-financing',
    position: { row: 2, col: 3 },
  },
  {
    id: 'digital-services',
    icon: Smartphone,
    title: { ar: 'الخدمات الرقمية', en: 'Digital Services' },
    description: { 
      ar: 'إدارة حسابك ومعاملاتك من أي مكان',
      en: 'Manage your account and transactions from anywhere'
    },
    color: COLORS.lightBlue,
    href: '/apply',
    position: { row: 2, col: 2 },
  },
];

// Wire path component with animation
function AnimatedWirePath({
  d,
  color,
  isActive,
  delay = 0,
}: {
  d: string;
  color: string;
  isActive: boolean;
  delay?: number;
}) {
  return (
    <g>
      {/* Background wire */}
      <path
        d={d}
        fill="none"
        stroke={`${color}15`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Animated flow wire */}
      <motion.path
        d={d}
        fill="none"
        stroke={isActive ? color : `${color}40`}
        strokeWidth={isActive ? 2.5 : 1.5}
        strokeLinecap="round"
        strokeDasharray="8 8"
        initial={{ strokeDashoffset: 0 }}
        animate={{ 
          strokeDashoffset: -16,
          stroke: isActive ? color : `${color}40`,
        }}
        transition={{
          strokeDashoffset: {
            duration: 0.8,
            repeat: Infinity,
            ease: 'linear',
            delay,
          },
          stroke: {
            duration: 0.3,
          }
        }}
        style={{
          filter: isActive ? `drop-shadow(0 0 6px ${color})` : 'none',
        }}
      />
      
      {/* Glowing traveling dot */}
      {isActive && (
        <motion.circle
          r={4}
          fill={color}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay,
          }}
          style={{
            offsetPath: `path('${d}')`,
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      )}
    </g>
  );
}

// Central hub component
function CentralHub({ isAnyHovered }: { isAnyHovered: boolean }) {
  const { language } = useI18n();
  
  return (
    <motion.div
      className="relative w-32 h-32 md:w-40 md:h-40"
      animate={{
        scale: isAnyHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${COLORS.gold}20 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${COLORS.blue}30 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      
      {/* Main hub circle */}
      <div
        className="absolute inset-4 md:inset-6 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.blue} 100%)`,
          boxShadow: `
            0 0 60px ${COLORS.blue}40,
            inset 0 2px 4px rgba(255,255,255,0.2),
            inset 0 -2px 4px rgba(0,0,0,0.3)
          `,
        }}
      >
        <div className="text-center">
          <motion.div
            className="text-2xl md:text-3xl font-bold text-white"
            animate={{
              textShadow: isAnyHovered 
                ? `0 0 20px ${COLORS.gold}` 
                : '0 0 0px transparent',
            }}
          >
            AJIL
          </motion.div>
          <div className="text-[10px] md:text-xs text-white/60 mt-1">
            {language === 'ar' ? 'منظومة متكاملة' : 'Integrated'}
          </div>
        </div>
      </div>
      
      {/* Connection points */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: services[i]?.color || COLORS.gold,
            left: `calc(50% + ${Math.cos((angle - 90) * Math.PI / 180) * 56}px)`,
            top: `calc(50% + ${Math.sin((angle - 90) * Math.PI / 180) * 56}px)`,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 10px ${services[i]?.color || COLORS.gold}`,
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}

// Service card component
function ServiceCard({
  service,
  isHovered,
  onHover,
  index,
}: {
  service: typeof services[0];
  isHovered: boolean;
  onHover: (id: string | null) => void;
  index: number;
}) {
  const { language, dir } = useI18n();
  const Icon = service.icon;
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link href={service.href}>
        <motion.div
          className={cn(
            "relative bg-white rounded-2xl p-6 cursor-pointer overflow-hidden",
            "border border-gray-100 transition-all duration-300"
          )}
          style={{
            boxShadow: isHovered 
              ? `0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px ${service.color}40, 0 0 30px ${service.color}20`
              : '0 4px 20px rgba(0,0,0,0.08)',
          }}
          animate={{
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Top highlight line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: service.color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Gradient background on hover */}
          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              background: `linear-gradient(135deg, ${service.color}05 0%, ${service.color}10 100%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: `${service.color}15`,
                border: `1px solid ${service.color}30`,
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-6 h-6" style={{ color: service.color }} />
            </motion.div>
            
            {/* Title */}
            <h3 
              className="text-lg font-bold mb-2 transition-colors duration-300"
              style={{ color: isHovered ? service.color : COLORS.navy }}
            >
              {language === 'ar' ? service.title.ar : service.title.en}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {language === 'ar' ? service.description.ar : service.description.en}
            </p>
            
            {/* Learn more link */}
            <motion.div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: service.color }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                x: isHovered ? 0 : -10 
              }}
              transition={{ duration: 0.2 }}
            >
              <span>{language === 'ar' ? 'اعرف المزيد' : 'Learn more'}</span>
              {dir === 'rtl' ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </motion.div>
          </div>
          
          {/* Corner decoration */}
          <div
            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10"
            style={{ background: service.color }}
          />
        </motion.div>
      </Link>
      
      {/* Connection dot */}
      <motion.div
        className="absolute w-4 h-4 rounded-full z-20"
        style={{
          background: service.color,
          left: '50%',
          bottom: '-8px',
          transform: 'translateX(-50%)',
          boxShadow: isHovered ? `0 0 15px ${service.color}` : `0 0 5px ${service.color}50`,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Main Connected Products Section
export default function ConnectedProducts() {
  const { language } = useI18n();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Generate wire paths from center to each card
  const generateWirePath = useCallback((index: number, totalCards: number) => {
    const centerX = dimensions.width / 2;
    const centerY = 200; // Hub position
    
    // Card positions (approximate)
    const positions = [
      { x: dimensions.width * 0.17, y: 450 }, // Car financing
      { x: dimensions.width * 0.5, y: 450 },  // Personal financing
      { x: dimensions.width * 0.83, y: 450 }, // Business financing
      { x: dimensions.width * 0.17, y: 700 }, // Heavy equipment
      { x: dimensions.width * 0.5, y: 700 },  // Digital services
      { x: dimensions.width * 0.83, y: 700 }, // Fleet financing
    ];
    
    const pos = positions[index] || { x: centerX, y: 500 };
    
    // Create curved path with control points
    const midY = (centerY + pos.y) / 2;
    const curveOffset = (pos.x - centerX) * 0.3;
    
    return `M ${centerX} ${centerY + 70} Q ${centerX + curveOffset} ${midY}, ${pos.x} ${pos.y - 50}`;
  }, [dimensions]);
  
  const isAnyHovered = hoveredService !== null;
  
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${COLORS.blue}20 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${COLORS.gold}30 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative" ref={containerRef}>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="w-4 h-4" />
            {language === 'ar' ? 'منظومة متكاملة' : 'Integrated Suite'}
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00377B] mb-6">
            {language === 'ar' 
              ? 'منظومة خدمات مالية متكاملة' 
              : 'A Fully Integrated Suite of'}
            <br />
            <span className="bg-gradient-to-r from-[#F7941D] to-[#FDB913] bg-clip-text text-transparent">
              {language === 'ar' ? 'ومنتجات تمويلية' : 'Financial Products'}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'ar'
              ? 'من تمويل السيارات إلى حلول الأعمال، نقدم لك منظومة متكاملة من الخدمات المالية المتوافقة مع الشريعة الإسلامية'
              : 'From auto financing to business solutions, we offer a complete ecosystem of Sharia-compliant financial services'}
          </p>
        </motion.div>
        
        {/* Central hub */}
        <div className="flex justify-center mb-8">
          <CentralHub isAnyHovered={isAnyHovered} />
        </div>
        
        {/* SVG Wires Layer */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ top: 0 }}
        >
          <defs>
            {services.map((service) => (
              <linearGradient 
                key={`gradient-${service.id}`}
                id={`wire-gradient-${service.id}`}
                x1="50%" y1="0%" x2="50%" y2="100%"
              >
                <stop offset="0%" stopColor={service.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={service.color} stopOpacity="0.3" />
              </linearGradient>
            ))}
          </defs>
          
          {dimensions.width > 0 && services.map((service, index) => (
            <AnimatedWirePath
              key={service.id}
              d={generateWirePath(index, services.length)}
              color={service.color}
              isActive={hoveredService === service.id}
              delay={index * 0.15}
            />
          ))}
        </svg>
        
        {/* Service cards grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              isHovered={hoveredService === service.id}
              onHover={setHoveredService}
              index={index}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/apply">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#00377B] text-white font-bold rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 40px rgba(0,55,123,0.3)',
              }}
            >
              <span>{language === 'ar' ? 'ابدأ رحلتك المالية' : 'Start Your Financial Journey'}</span>
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
