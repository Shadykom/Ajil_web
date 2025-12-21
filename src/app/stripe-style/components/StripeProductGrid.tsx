'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Wallet,
  Building2,
  CreditCard,
  Smartphone,
  Calculator,
  TrendingUp,
  Users,
  ShieldCheck,
  Banknote,
  FileText,
  Settings,
  Globe,
  Lock,
  BarChart3,
  PieChart,
  Layers,
  Zap,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';

// Colors
const COLORS = {
  navy: '#00377B',
  blue: '#0066B3',
  gold: '#F7941D',
  purple: '#635BFF',
  cyan: '#00D4FF',
  pink: '#FF5CAA',
  green: '#00D68F',
  orange: '#FF9F43',
};

// Active product cards (like Stripe's Tax, Payments, Radar)
const activeProducts = [
  {
    id: 'financing',
    icon: Wallet,
    label: { ar: 'التمويل', en: 'Financing' },
    color: COLORS.purple,
    gradient: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)',
    position: { row: 2, col: 4 }, // Center position
    href: '/individuals/personal-financing',
  },
  {
    id: 'car',
    icon: Car,
    label: { ar: 'السيارات', en: 'Auto' },
    color: COLORS.gold,
    gradient: 'linear-gradient(135deg, #F7941D 0%, #FF5CAA 100%)',
    position: { row: 1, col: 4 },
    href: '/individuals/car-financing',
  },
  {
    id: 'business',
    icon: Building2,
    label: { ar: 'الأعمال', en: 'Business' },
    color: COLORS.pink,
    gradient: 'linear-gradient(135deg, #FF5CAA 0%, #635BFF 100%)',
    position: { row: 3, col: 5 },
    href: '/business/cash-financing',
  },
  {
    id: 'calculator',
    icon: Calculator,
    label: { ar: 'الحاسبة', en: 'Calculator' },
    color: COLORS.cyan,
    gradient: 'linear-gradient(135deg, #00D4FF 0%, #00D68F 100%)',
    position: { row: 4, col: 4 },
    href: '/calculator',
  },
];

// Ghost/inactive icons for the grid background
const ghostIcons = [
  { icon: CreditCard, position: { row: 1, col: 2 } },
  { icon: FileText, position: { row: 1, col: 5 } },
  { icon: Layers, position: { row: 1, col: 6 } },
  { icon: ShieldCheck, position: { row: 2, col: 1 } },
  { icon: TrendingUp, position: { row: 2, col: 3 } },
  { icon: PieChart, position: { row: 2, col: 5 } },
  { icon: Settings, position: { row: 2, col: 7 } },
  { icon: Lock, position: { row: 3, col: 1 } },
  { icon: Globe, position: { row: 3, col: 3 } },
  { icon: Banknote, position: { row: 4, col: 2 } },
  { icon: BarChart3, position: { row: 4, col: 5 } },
  { icon: Zap, position: { row: 4, col: 6 } },
  { icon: Users, position: { row: 5, col: 3 } },
  { icon: Smartphone, position: { row: 5, col: 5 } },
  { icon: FileText, position: { row: 5, col: 6 } },
  { icon: Layers, position: { row: 5, col: 7 } },
];

// Wire connections between active products
const wireConnections = [
  { from: 'car', to: 'financing' },
  { from: 'financing', to: 'business' },
  { from: 'financing', to: 'calculator' },
];

// Ghost Icon Card Component
function GhostCard({ icon: Icon, row, col }: { icon: React.ElementType; row: number; col: number }) {
  return (
    <div
      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-gray-200/60 flex items-center justify-center bg-white/30"
      style={{
        gridRow: row,
        gridColumn: col,
      }}
    >
      <Icon className="w-7 h-7 md:w-8 md:h-8 text-gray-300 stroke-[1.5]" />
    </div>
  );
}

// Active Product Card Component
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
        className="relative cursor-pointer"
        style={{
          gridRow: product.position.row,
          gridColumn: product.position.col,
        }}
        onMouseEnter={() => onHover(product.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="w-20 h-24 md:w-24 md:h-28 rounded-2xl bg-white flex flex-col items-center justify-center gap-2 relative overflow-hidden"
          style={{
            boxShadow: isHovered
              ? `0 20px 40px -10px rgba(0,0,0,0.15), 0 0 20px ${product.color}30`
              : '0 8px 30px -5px rgba(0,0,0,0.1), 0 2px 10px -3px rgba(0,0,0,0.05)',
          }}
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Gradient icon background */}
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
            style={{ background: product.gradient }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          
          {/* Label */}
          <span className="text-xs md:text-sm font-semibold text-gray-700">
            {language === 'ar' ? product.label.ar : product.label.en}
          </span>
        </motion.div>
        
        {/* Connection dot */}
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: product.color,
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: `0 0 10px ${product.color}`,
          }}
        />
      </motion.div>
    </Link>
  );
}

// Animated Wire Component
function AnimatedWire({
  fromPos,
  toPos,
  color,
  isActive,
}: {
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
  color: string;
  isActive: boolean;
}) {
  // Calculate control points for smooth curve
  const midX = (fromPos.x + toPos.x) / 2;
  const midY = (fromPos.y + toPos.y) / 2;
  
  // Determine curve direction based on relative positions
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;
  
  let path: string;
  
  if (Math.abs(dy) > Math.abs(dx)) {
    // Vertical dominant - curve horizontally
    const offset = dx > 0 ? 30 : -30;
    path = `M ${fromPos.x} ${fromPos.y} Q ${fromPos.x + offset} ${midY}, ${toPos.x} ${toPos.y}`;
  } else {
    // Horizontal dominant - curve vertically
    const offset = dy > 0 ? 30 : -30;
    path = `M ${fromPos.x} ${fromPos.y} Q ${midX} ${fromPos.y + offset}, ${toPos.x} ${toPos.y}`;
  }

  return (
    <g>
      {/* Background wire */}
      <path
        d={path}
        fill="none"
        stroke={`${color}20`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Animated wire */}
      <motion.path
        d={path}
        fill="none"
        stroke={isActive ? color : `${color}60`}
        strokeWidth={isActive ? 3 : 2}
        strokeLinecap="round"
        strokeDasharray="8 8"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -16 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          filter: isActive ? `drop-shadow(0 0 6px ${color})` : 'none',
        }}
      />
      
      {/* Traveling dot */}
      <motion.circle
        r={isActive ? 5 : 4}
        fill={color}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          offsetPath: `path('${path}')`,
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
      />
    </g>
  );
}

// Main Component
export default function StripeProductGrid() {
  const { language, dir } = useI18n();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [wirePositions, setWirePositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  // Calculate wire positions based on card positions
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      const positions: { [key: string]: { x: number; y: number } } = {};
      
      activeProducts.forEach((product) => {
        const card = container.querySelector(`[data-product-id="${product.id}"]`);
        if (card) {
          const rect = card.getBoundingClientRect();
          positions[product.id] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height,
          };
        }
      });
      
      setWirePositions(positions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    
    // Small delay to ensure cards are rendered
    const timeout = setTimeout(updatePositions, 100);
    
    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
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
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#635BFF]/10 text-[#635BFF] text-sm font-medium mb-6"
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
                <span className="bg-gradient-to-r from-[#635BFF] to-[#00D4FF] bg-clip-text text-transparent">
                  المنتجات المالية
                </span>
              </>
            ) : (
              <>
                A fully integrated suite of
                <br />
                <span className="bg-gradient-to-r from-[#635BFF] to-[#00D4FF] bg-clip-text text-transparent">
                  financial products
                </span>
              </>
            )}
          </h2>
          
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'كل خدماتنا متصلة ومتكاملة لتوفير تجربة تمويلية سلسة'
              : 'All our services work together seamlessly to provide a unified financing experience'}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div 
          ref={containerRef}
          className="relative max-w-4xl mx-auto"
          style={{ minHeight: '500px' }}
        >
          {/* SVG for wires */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ overflow: 'visible' }}
          >
            {Object.keys(wirePositions).length > 0 && wireConnections.map((connection, index) => {
              const fromPos = wirePositions[connection.from];
              const toPos = wirePositions[connection.to];
              
              if (!fromPos || !toPos) return null;
              
              const fromProduct = activeProducts.find(p => p.id === connection.from);
              const isActive = hoveredProduct === connection.from || hoveredProduct === connection.to;
              
              return (
                <AnimatedWire
                  key={`${connection.from}-${connection.to}`}
                  fromPos={fromPos}
                  toPos={{ ...toPos, y: toPos.y - 10 }}
                  color={fromProduct?.color || COLORS.purple}
                  isActive={isActive}
                />
              );
            })}
          </svg>

          {/* Grid */}
          <div 
            className="grid gap-4 md:gap-6 relative z-20"
            style={{
              gridTemplateColumns: 'repeat(7, 1fr)',
              gridTemplateRows: 'repeat(5, 1fr)',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            {/* Ghost cards */}
            {ghostIcons.map((ghost, index) => (
              <GhostCard
                key={index}
                icon={ghost.icon}
                row={ghost.position.row}
                col={ghost.position.col}
              />
            ))}
            
            {/* Active product cards */}
            {activeProducts.map((product) => (
              <div
                key={product.id}
                data-product-id={product.id}
                style={{
                  gridRow: product.position.row,
                  gridColumn: product.position.col,
                }}
              >
                <ActiveCard
                  product={product}
                  isHovered={hoveredProduct === product.id}
                  onHover={setHoveredProduct}
                />
              </div>
            ))}
          </div>
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#635BFF] text-white font-semibold rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 10px 40px -10px rgba(99,91,255,0.5)',
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
