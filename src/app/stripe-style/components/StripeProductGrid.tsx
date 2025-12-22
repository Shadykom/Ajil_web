'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// Stripe's exact sizes
const INACTIVE_SIZE = 78;
const ACTIVE_SIZE = 88;
const GAP = 12;
const BORDER_RADIUS = 8;

// Stripe's exact colors
const COLORS = {
  outlineBorder: '#c4ccd8',
  outlineBackground: '#f6f9fc',
  solidBackground: '#ffffff',
  labelColor: '#2e3a55',
};

// Product definitions with their colors and grid positions
const products = [
  {
    id: 'car',
    icon: Car,
    label: { ar: 'السيارات', en: 'Auto' },
    gradient: ['#11EFE3', '#FF6B35'],
    color: '#FF6B35',
    href: '/individuals/car-financing',
    row: 1,
    col: 3,
  },
  {
    id: 'financing',
    icon: Wallet,
    label: { ar: 'التمويل', en: 'Finance' },
    gradient: ['#0073E6', '#00A3FF'],
    color: '#0066FF',
    href: '/individuals/personal-financing',
    row: 2,
    col: 3,
  },
  {
    id: 'business',
    icon: Building2,
    label: { ar: 'الأعمال', en: 'Business' },
    gradient: ['#9B5DE5', '#C77DFF'],
    color: '#9B5DE5',
    href: '/business/cash-financing',
    row: 3,
    col: 2,
  },
  {
    id: 'calculator',
    icon: Calculator,
    label: { ar: 'الحاسبة', en: 'Calculator' },
    gradient: ['#00D4FF', '#11EFE3'],
    color: '#00D4FF',
    href: '/calculator',
    row: 4,
    col: 3,
  },
];

// Ghost icons with their grid positions
const ghostIcons = [
  { icon: Layers, row: 1, col: 1 },
  { icon: FileText, row: 1, col: 2 },
  { icon: CreditCard, row: 1, col: 5 },
  { icon: Settings, row: 2, col: 1 },
  { icon: Clock, row: 2, col: 4 },
  { icon: TrendingUp, row: 2, col: 5 },
  { icon: ShieldCheck, row: 2, col: 6 },
  { icon: Globe, row: 3, col: 4 },
  { icon: Lock, row: 3, col: 6 },
  { icon: Zap, row: 4, col: 1 },
  { icon: BarChart3, row: 4, col: 2 },
  { icon: Smartphone, row: 4, col: 5 },
];

// Wire connections between products
const connections = [
  { from: 'car', to: 'financing' },
  { from: 'financing', to: 'business' },
  { from: 'financing', to: 'calculator' },
];

// Background Grid Pattern
function GridPattern() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(#E6E9F0 1px, transparent 1px), linear-gradient(90deg, #E6E9F0 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,255,255,0.8) 100%)'
        }}
      />
    </div>
  );
}

// Ghost Icon Component - Matches Stripe's outline style exactly
function GhostIcon({
  icon: Icon,
  row,
  col,
}: {
  icon: React.ElementType;
  row: number;
  col: number;
}) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        width: INACTIVE_SIZE,
        height: INACTIVE_SIZE,
        borderRadius: BORDER_RADIUS,
        border: `1px solid ${COLORS.outlineBorder}`,
        background: COLORS.outlineBackground,
        left: (col - 1) * (INACTIVE_SIZE + GAP),
        top: (row - 1) * (INACTIVE_SIZE + GAP),
      }}
    >
      <Icon
        className="text-gray-400"
        style={{ width: 28, height: 28 }}
        strokeWidth={1.5}
      />
    </div>
  );
}

// Active Product Icon Component - Matches Stripe's solid style exactly
function ProductIcon({
  product,
  isActive,
  onHover,
}: {
  product: (typeof products)[0];
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  const { language } = useI18n();
  const Icon = product.icon;

  // Position calculations - center the larger active icon
  const offset = (ACTIVE_SIZE - INACTIVE_SIZE) / 2;
  const left = (product.col - 1) * (INACTIVE_SIZE + GAP) - offset;
  const top = (product.row - 1) * (INACTIVE_SIZE + GAP) - offset;

  return (
    <Link href={product.href}>
      <motion.div
        className="absolute cursor-pointer"
        style={{
          left,
          top,
          width: ACTIVE_SIZE,
          height: ACTIVE_SIZE + 24, // Extra space for label
        }}
        onMouseEnter={() => onHover(product.id)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Icon container */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: ACTIVE_SIZE,
            height: ACTIVE_SIZE,
            borderRadius: BORDER_RADIUS,
            background: COLORS.solidBackground,
            boxShadow: isActive
              ? '0 20px 40px -12px rgba(50,50,93,.35), 0 12px 24px -8px rgba(0,0,0,.15)'
              : '0 12.6px 25.2px -11.5px rgba(50,50,93,.25), 0 7.56px 15.12px -7.56px rgba(0,0,0,.1)',
          }}
          animate={{
            scale: isActive ? 1.08 : 1,
            y: isActive ? -4 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Gradient icon background */}
          <div
            className="flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${product.gradient[0]} 0%, ${product.gradient[1]} 100%)`,
            }}
          >
            <Icon className="text-white" style={{ width: 24, height: 24 }} strokeWidth={2} />
          </div>
        </motion.div>

        {/* Label - Stripe style */}
        <motion.div
          className="absolute text-center w-full"
          style={{
            bottom: 0,
            fontWeight: 600,
            fontSize: 12,
            lineHeight: '15px',
            letterSpacing: '0.2px',
            color: COLORS.labelColor,
          }}
          animate={{ opacity: isActive ? 1 : 0.8 }}
        >
          {language === 'ar' ? product.label.ar : product.label.en}
        </motion.div>
      </motion.div>
    </Link>
  );
}

// SVG Wire with gradient stroke - Matches Stripe exactly
function Wire({
  from,
  to,
  gradient,
  id,
  isActive,
}: {
  from: { row: number; col: number };
  to: { row: number; col: number };
  gradient: [string, string];
  id: string;
  isActive: boolean;
}) {
  // Calculate center positions of icons
  const fromX = (from.col - 1) * (INACTIVE_SIZE + GAP) + INACTIVE_SIZE / 2;
  const fromY = (from.row - 1) * (INACTIVE_SIZE + GAP) + INACTIVE_SIZE / 2;
  const toX = (to.col - 1) * (INACTIVE_SIZE + GAP) + INACTIVE_SIZE / 2;
  const toY = (to.row - 1) * (INACTIVE_SIZE + GAP) + INACTIVE_SIZE / 2;

  // Edge offsets (from edge of icon, not center)
  const startY = fromY + INACTIVE_SIZE / 2 + 4;
  const endY = toY - INACTIVE_SIZE / 2 - 4;

  // Calculate path - curved line from bottom of source to top of destination
  const midY = (startY + endY) / 2;
  const path =
    from.col === to.col
      ? // Vertical connection
        `M ${fromX} ${startY} L ${toX} ${endY}`
      : // Diagonal connection with curve
        `M ${fromX} ${startY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${endY}`;

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient
          id={`gradient-${id}`}
          gradientUnits="userSpaceOnUse"
          x1={fromX}
          y1={startY}
          x2={toX}
          y2={endY}
        >
          <stop offset="0" stopColor={gradient[0]} />
          <stop offset="1" stopColor={gradient[1]} />
        </linearGradient>
      </defs>

      {/* Base track - always visible */}
      <path
        d={path}
        fill="none"
        stroke="#E6E9F0"
        strokeWidth={2}
        strokeLinecap="round"
        className="opacity-50"
      />

      {/* Main wire path */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#gradient-${id})`}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
        style={{
          filter: isActive ? `drop-shadow(0 0 4px ${gradient[0]})` : 'none',
        }}
      />

      {/* Animated dot traveling along the path */}
      {isActive && (
        <circle r={4} fill="#fff" stroke={gradient[1]} strokeWidth={2}>
          <animateMotion 
            dur="1.5s" 
            repeatCount="indefinite" 
            path={path}
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4 0 0.2 1"
          >
            <mpath xlinkHref={`#path-${id}`} />
          </animateMotion>
        </circle>
      )}

      {/* Hidden path for animateMotion */}
      <path id={`path-${id}`} d={path} fill="none" stroke="none" />
    </svg>
  );
}

// Main Component
export default function StripeProductGrid() {
  const { language, dir } = useI18n();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Grid dimensions
  const gridCols = 6;
  const gridRows = 4;
  const gridWidth = gridCols * INACTIVE_SIZE + (gridCols - 1) * GAP;
  const gridHeight = gridRows * (INACTIVE_SIZE + GAP) + 24; // Extra for labels

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 relative z-10">
        <GridPattern />
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
              ? 'جميع خدماتنا متصلة ومتكاملة لتوفير تجربة تمويلية سلسة'
              : 'All our services work together to provide a seamless financing experience'}
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="flex justify-center">
          <motion.div
            ref={containerRef}
            className="relative"
            style={{
              width: gridWidth,
              height: gridHeight,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Wires (rendered first, behind icons) */}
            {connections.map((conn) => {
              const fromProduct = products.find((p) => p.id === conn.from)!;
              const toProduct = products.find((p) => p.id === conn.to)!;

              return (
                <Wire
                  key={`${conn.from}-${conn.to}`}
                  from={{ row: fromProduct.row, col: fromProduct.col }}
                  to={{ row: toProduct.row, col: toProduct.col }}
                  gradient={fromProduct.gradient as [string, string]}
                  id={`${conn.from}-${conn.to}`}
                  isActive={hoveredProduct === conn.from || hoveredProduct === conn.to}
                />
              );
            })}

            {/* Ghost Icons */}
            {ghostIcons.map((ghost, index) => (
              <GhostIcon key={index} icon={ghost.icon} row={ghost.row} col={ghost.col} />
            ))}

            {/* Product Icons */}
            {products.map((product) => (
              <ProductIcon
                key={product.id}
                product={product}
                isActive={hoveredProduct === product.id}
                onHover={setHoveredProduct}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
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
