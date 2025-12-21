'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  Wallet,
  Building2,
  Calculator,
  CreditCard,
  FileText,
  Settings,
  Clock,
  TrendingUp,
  ShieldCheck,
  Globe,
  Lock,
  Zap,
  BarChart3,
  Layers,
  Smartphone,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';

// Colors matching Stripe's palette
const COLORS = {
  orange: '#FF6B35',
  blue: '#0066FF',
  purple: '#9B5DE5',
  cyan: '#00D4FF',
  green: '#00D68F',
  pink: '#FF5CAA',
};

// Grid configuration - 7 columns x 5 rows
const GRID_COLS = 7;
const GRID_ROWS = 5;
const CARD_SIZE = 80; // px
const GAP = 16; // px

// Active products with their grid positions (1-indexed for clarity)
const activeProducts = [
  {
    id: 'car',
    icon: Car,
    label: { ar: 'السيارات', en: 'Auto' },
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8F6B 100%)',
    gridCol: 4,
    gridRow: 1,
    href: '/individuals/car-financing',
  },
  {
    id: 'financing',
    icon: Wallet,
    label: { ar: 'التمويل', en: 'Finance' },
    gradient: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
    gridCol: 4,
    gridRow: 2,
    href: '/individuals/personal-financing',
  },
  {
    id: 'business',
    icon: Building2,
    label: { ar: 'الأعمال', en: 'Business' },
    gradient: 'linear-gradient(135deg, #9B5DE5 0%, #C77DFF 100%)',
    gridCol: 3,
    gridRow: 3,
    href: '/business/cash-financing',
  },
  {
    id: 'calculator',
    icon: Calculator,
    label: { ar: 'الحاسبة', en: 'Calculator' },
    gradient: 'linear-gradient(135deg, #00D4FF 0%, #00F5FF 100%)',
    gridCol: 4,
    gridRow: 4,
    href: '/calculator',
  },
];

// Wire connections with colors
const wireConnections = [
  { from: 'car', to: 'financing', color: '#FF6B35' },
  { from: 'financing', to: 'business', color: '#0066FF' },
  { from: 'financing', to: 'calculator', color: '#0066FF' },
  { from: 'business', to: 'calculator', color: '#9B5DE5' },
];

// Ghost cards positions
const ghostCards = [
  { icon: Layers, gridCol: 2, gridRow: 1 },
  { icon: FileText, gridCol: 3, gridRow: 1 },
  { icon: CreditCard, gridCol: 6, gridRow: 1 },
  { icon: Settings, gridCol: 1, gridRow: 2 },
  { icon: Clock, gridCol: 3, gridRow: 2 },
  { icon: TrendingUp, gridCol: 5, gridRow: 2 },
  { icon: ShieldCheck, gridCol: 7, gridRow: 2 },
  { icon: Globe, gridCol: 5, gridRow: 3 },
  { icon: Lock, gridCol: 7, gridRow: 3 },
  { icon: Zap, gridCol: 2, gridRow: 4 },
  { icon: BarChart3, gridCol: 3, gridRow: 4 },
  { icon: Smartphone, gridCol: 6, gridRow: 4 },
];

// Calculate pixel position from grid position
function getPosition(gridCol: number, gridRow: number) {
  return {
    x: (gridCol - 1) * (CARD_SIZE + GAP) + CARD_SIZE / 2,
    y: (gridRow - 1) * (CARD_SIZE + GAP) + CARD_SIZE / 2,
  };
}

// Ghost Card Component
function GhostCard({ icon: Icon, gridCol, gridRow }: { icon: React.ElementType; gridCol: number; gridRow: number }) {
  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        width: CARD_SIZE,
        height: CARD_SIZE,
        left: (gridCol - 1) * (CARD_SIZE + GAP),
        top: (gridRow - 1) * (CARD_SIZE + GAP),
        borderRadius: 16,
        border: '1.5px solid #E5E7EB',
        background: 'rgba(255,255,255,0.5)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
    >
      <Icon className="w-7 h-7 text-gray-300" strokeWidth={1.5} />
    </motion.div>
  );
}

// Active Card Component
function ActiveCard({
  product,
  isHovered,
  onHover,
}: {
  product: typeof activeProducts[0];
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const { language } = useI18n();
  const Icon = product.icon;

  return (
    <Link href={product.href}>
      <motion.div
        className="absolute cursor-pointer"
        style={{
          left: (product.gridCol - 1) * (CARD_SIZE + GAP) - 10,
          top: (product.gridRow - 1) * (CARD_SIZE + GAP) - 10,
        }}
        onMouseEnter={() => onHover(product.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center bg-white rounded-2xl"
          style={{
            width: CARD_SIZE + 20,
            height: CARD_SIZE + 30,
            boxShadow: isHovered
              ? '0 20px 40px -10px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)'
              : '0 10px 30px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
          }}
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Icon with gradient background */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
            style={{ background: product.gradient }}
          >
            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          
          {/* Label */}
          <span className="text-xs font-semibold text-gray-700">
            {language === 'ar' ? product.label.ar : product.label.en}
          </span>
        </motion.div>
        
        {/* Connection dot */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            bottom: -6,
            background: product.gradient.includes('#FF6B35') ? '#FF6B35' : 
                        product.gradient.includes('#0066FF') ? '#0066FF' : 
                        product.gradient.includes('#9B5DE5') ? '#9B5DE5' : '#00D4FF',
            boxShadow: `0 0 10px ${product.gradient.includes('#FF6B35') ? '#FF6B35' : 
                        product.gradient.includes('#0066FF') ? '#0066FF' : 
                        product.gradient.includes('#9B5DE5') ? '#9B5DE5' : '#00D4FF'}`,
          }}
          animate={{ scale: isHovered ? 1.3 : 1 }}
        />
      </motion.div>
    </Link>
  );
}

// Animated Wire Component with proper path animation
function AnimatedWire({
  from,
  to,
  color,
  isActive,
  index,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  isActive: boolean;
  index: number;
}) {
  // Calculate curved path
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // Start and end points with offset for card edges
  const startY = from.y + 55;
  const endY = to.y - 25;
  
  // Create smooth bezier curve
  let path: string;
  
  if (Math.abs(dx) < 30) {
    // Nearly vertical - simple curved line
    const curveX = from.x + (Math.random() > 0.5 ? 20 : -20);
    path = `M ${from.x} ${startY} Q ${curveX} ${(startY + endY) / 2}, ${to.x} ${endY}`;
  } else {
    // Diagonal connection - S-curve
    const midY = (startY + endY) / 2;
    path = `M ${from.x} ${startY} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${endY}`;
  }

  return (
    <g>
      {/* Static background line */}
      <path
        d={path}
        fill="none"
        stroke={`${color}15`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Animated dashed line */}
      <motion.path
        d={path}
        fill="none"
        stroke={isActive ? color : `${color}40`}
        strokeWidth={isActive ? 2.5 : 1.5}
        strokeLinecap="round"
        strokeDasharray="5 5"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -10 }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          filter: isActive ? `drop-shadow(0 0 3px ${color})` : 'none',
        }}
      />
      
      {/* Traveling dot using CSS animation */}
      <circle r="0" fill="transparent">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={path}
          begin={`${index * 0.5}s`}
        >
          <mpath href={`#wire-path-${index}`} />
        </animateMotion>
      </circle>
      
      {/* Define path for animateMotion */}
      <path id={`wire-path-${index}`} d={path} fill="none" stroke="none" />
      
      {/* Animated dot */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2 }}
      >
        <circle
          r={isActive ? 5 : 4}
          fill={color}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        >
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin={`${index * 0.3}s`}
          >
            <mpath href={`#wire-path-${index}`} />
          </animateMotion>
        </circle>
      </motion.g>
    </g>
  );
}

// Main Component
export default function StripeProductGrid() {
  const { language, dir } = useI18n();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Calculate grid dimensions
  const gridWidth = GRID_COLS * (CARD_SIZE + GAP) - GAP;
  const gridHeight = GRID_ROWS * (CARD_SIZE + GAP) - GAP;

  // Get positions for wires
  const getProductPosition = (id: string) => {
    const product = activeProducts.find((p) => p.id === id);
    if (!product) return { x: 0, y: 0 };
    return getPosition(product.gridCol, product.gridRow);
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            {language === 'ar' ? 'منظومة متكاملة' : 'Integrated Suite'}
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? (
              <>
                منظومة متكاملة من
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  المنتجات المالية
                </span>
              </>
            ) : (
              <>
                A fully integrated suite of
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  financial products
                </span>
              </>
            )}
          </h2>
          
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'جميع خدماتنا متصلة ومتكاملة لتوفير تجربة تمويلية سلسة ومميزة'
              : 'All our services work together seamlessly to provide a unified financing experience'}
          </p>
        </motion.div>

        {/* Product Grid Container */}
        <div className="flex justify-center">
          <div 
            className="relative"
            style={{ 
              width: gridWidth + 40, 
              height: gridHeight + 60,
            }}
          >
            {/* SVG Layer for Wires */}
            <svg 
              className="absolute inset-0 pointer-events-none"
              style={{ 
                width: gridWidth + 40, 
                height: gridHeight + 60,
                overflow: 'visible',
              }}
            >
              {wireConnections.map((wire, index) => {
                const fromPos = getProductPosition(wire.from);
                const toPos = getProductPosition(wire.to);
                const isActive = hoveredProduct === wire.from || hoveredProduct === wire.to;
                
                return (
                  <AnimatedWire
                    key={`${wire.from}-${wire.to}`}
                    from={fromPos}
                    to={toPos}
                    color={wire.color}
                    isActive={isActive}
                    index={index}
                  />
                );
              })}
            </svg>

            {/* Ghost Cards */}
            {ghostCards.map((ghost, index) => (
              <GhostCard
                key={index}
                icon={ghost.icon}
                gridCol={ghost.gridCol}
                gridRow={ghost.gridRow}
              />
            ))}

            {/* Active Product Cards */}
            {activeProducts.map((product) => (
              <ActiveCard
                key={product.id}
                product={product}
                isHovered={hoveredProduct === product.id}
                onHover={setHoveredProduct}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/apply">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 40px -10px rgba(0, 102, 255, 0.5)',
              }}
            >
              <span>{language === 'ar' ? 'استكشف جميع المنتجات' : 'Explore all products'}</span>
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
