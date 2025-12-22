'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  CreditCard,
  Smartphone,
  Wallet,
  ShieldCheck,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Car,
  Calculator,
  Banknote,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface CardConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  href: string;
  // Absolute positioning for desktop (percentage-based)
  desktop: {
    top: string;
    left: string;
    width: string;
    height: string;
    zIndex: number;
  };
  isPrimary?: boolean;
  relatedTo: string[];
}

// ============================================
// CARD CONFIGURATION - DIAGRAM LAYOUT
// ============================================

const CARDS: CardConfig[] = [
  // ========== PRIMARY CARDS (CENTER) ==========
  {
    id: 'payments',
    title: 'Payments',
    icon: CreditCard,
    accentColor: '#635BFF',
    href: '/individuals/personal-financing',
    isPrimary: true,
    desktop: {
      top: '18%',
      left: '28%',
      width: '220px',
      height: '180px',
      zIndex: 20,
    },
    relatedTo: ['checkout', 'elements', 'radar', 'billing', 'terminal'],
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: Smartphone,
    accentColor: '#00D4AA',
    href: '/business/cash-financing',
    isPrimary: true,
    desktop: {
      top: '45%',
      left: '50%',
      width: '220px',
      height: '180px',
      zIndex: 20,
    },
    relatedTo: ['payments', 'connect', 'radar', 'capital'],
  },
  
  // ========== SECONDARY CARDS (SURROUNDING) ==========
  // Top-left cluster
  {
    id: 'radar',
    title: 'Radar',
    icon: ShieldCheck,
    accentColor: '#F7B32D',
    href: '/about/story',
    desktop: {
      top: '5%',
      left: '8%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['payments', 'terminal', 'checkout'],
  },
  {
    id: 'checkout',
    title: 'Checkout',
    icon: Wallet,
    accentColor: '#635BFF',
    href: '/individuals/car-financing',
    desktop: {
      top: '22%',
      left: '5%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['payments', 'elements', 'radar'],
  },
  {
    id: 'elements',
    title: 'Elements',
    icon: Zap,
    accentColor: '#FF6B6B',
    href: '/apply',
    desktop: {
      top: '42%',
      left: '10%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['payments', 'checkout'],
  },
  
  // Top-right cluster
  {
    id: 'connect',
    title: 'Connect',
    icon: Users,
    accentColor: '#0A2540',
    href: '/contact',
    desktop: {
      top: '3%',
      left: '55%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['terminal', 'atlas', 'capital'],
  },
  {
    id: 'billing',
    title: 'Billing',
    icon: FileText,
    accentColor: '#00D4AA',
    href: '/calculator',
    desktop: {
      top: '8%',
      left: '75%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['payments', 'treasury', 'sigma'],
  },
  {
    id: 'atlas',
    title: 'Atlas',
    icon: Globe,
    accentColor: '#635BFF',
    href: '/branches',
    desktop: {
      top: '28%',
      left: '72%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['connect', 'capital'],
  },
  
  // Bottom cluster
  {
    id: 'capital',
    title: 'Capital',
    icon: TrendingUp,
    accentColor: '#00D4AA',
    href: '/business/heavy-equipment',
    desktop: {
      top: '52%',
      left: '78%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['terminal', 'connect', 'atlas', 'treasury'],
  },
  {
    id: 'issuing',
    title: 'Issuing',
    icon: Car,
    accentColor: '#0A2540',
    href: '/business/car-financing',
    desktop: {
      top: '68%',
      left: '15%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['payments', 'treasury'],
  },
  {
    id: 'treasury',
    title: 'Treasury',
    icon: Banknote,
    accentColor: '#00D4AA',
    href: '/individuals/rates',
    desktop: {
      top: '72%',
      left: '38%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['capital', 'issuing', 'billing', 'sigma'],
  },
  {
    id: 'sigma',
    title: 'Sigma',
    icon: Calculator,
    accentColor: '#635BFF',
    href: '/calculator',
    desktop: {
      top: '75%',
      left: '62%',
      width: '160px',
      height: '130px',
      zIndex: 10,
    },
    relatedTo: ['billing', 'treasury'],
  },
];

// ============================================
// SPRING CONFIG
// ============================================

const springConfig = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

const springConfigSoft = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
};

// ============================================
// ANIMATED CONNECTOR COMPONENT
// ============================================

interface ConnectorLineProps {
  sourceCard: CardConfig;
  targetCard: CardConfig;
  containerRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  delay: number;
}

function ConnectorLine({ sourceCard, targetCard, containerRef, isVisible, delay }: ConnectorLineProps) {
  const [path, setPath] = useState('');
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Calculate path between cards
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    
    // Parse percentage positions to pixels
    const parsePos = (pos: string, dimension: number) => {
      if (pos.endsWith('%')) {
        return (parseFloat(pos) / 100) * dimension;
      }
      return parseFloat(pos);
    };
    
    // Source card center
    const sourceX = parsePos(sourceCard.desktop.left, container.width) + parseFloat(sourceCard.desktop.width) / 2;
    const sourceY = parsePos(sourceCard.desktop.top, container.height) + parseFloat(sourceCard.desktop.height) / 2;
    
    // Target card center
    const targetX = parsePos(targetCard.desktop.left, container.width) + parseFloat(targetCard.desktop.width) / 2;
    const targetY = parsePos(targetCard.desktop.top, container.height) + parseFloat(targetCard.desktop.height) / 2;
    
    // Calculate control points for smooth curve
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const curvature = Math.min(distance * 0.3, 100);
    
    // Perpendicular offset for natural curve
    const angle = Math.atan2(dy, dx);
    const perpAngle = angle + Math.PI / 2;
    
    const ctrl1X = sourceX + dx * 0.3 + Math.cos(perpAngle) * curvature * 0.4;
    const ctrl1Y = sourceY + dy * 0.3 + Math.sin(perpAngle) * curvature * 0.4;
    const ctrl2X = sourceX + dx * 0.7 - Math.cos(perpAngle) * curvature * 0.4;
    const ctrl2Y = sourceY + dy * 0.7 - Math.sin(perpAngle) * curvature * 0.4;
    
    const newPath = `M ${sourceX} ${sourceY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${targetX} ${targetY}`;
    setPath(newPath);
  }, [sourceCard, targetCard, containerRef]);
  
  // Get path length for stroke animation
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);
  
  if (!path) return null;
  
  return (
    <g>
      {/* Glow layer */}
      <motion.path
        d={path}
        fill="none"
        stroke={sourceCard.accentColor}
        strokeWidth={6}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? 0.2 : 0,
        }}
        transition={{ ...springConfigSoft, delay }}
        style={{ filter: 'blur(8px)' }}
      />
      
      {/* Main line with stroke animation */}
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={sourceCard.accentColor}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ 
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0,
        }}
        animate={{ 
          strokeDashoffset: isVisible ? 0 : pathLength,
          opacity: isVisible ? 0.8 : 0,
        }}
        transition={{ 
          strokeDashoffset: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay,
          },
          opacity: { duration: 0.2, delay },
        }}
        style={{ strokeDasharray: pathLength }}
      />
      
      {/* Animated pulse dot */}
      {isVisible && pathLength > 0 && (
        <motion.circle
          r={4}
          fill="white"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            delay: delay + 0.3,
          }}
          style={{
            offsetPath: `path('${path}')`,
            filter: `drop-shadow(0 0 6px ${sourceCard.accentColor}) drop-shadow(0 0 3px white)`,
          }}
        />
      )}
    </g>
  );
}

// ============================================
// SINGLE CARD COMPONENT (ENHANCED)
// ============================================

interface CardProps {
  card: CardConfig;
  variant: 'desktop' | 'mobile-active' | 'mobile-related' | 'mobile-background';
  activeCardId: string | null;
  relatedCardIds: string[];
  onActivate: (id: string | null) => void;
  floatDelay?: number;
}

function Card({ card, variant, activeCardId, relatedCardIds, onActivate, floatDelay = 0 }: CardProps) {
  const Icon = card.icon;
  const isActive = activeCardId === card.id;
  const isRelated = relatedCardIds.includes(card.id);
  const isAnyActive = activeCardId !== null;
  const [isPressed, setIsPressed] = useState(false);
  
  // Calculate opacity state
  const getOpacity = () => {
    if (!isAnyActive) return 1;
    if (isActive) return 1;
    if (isRelated) return 0.9;
    return 0.25;
  };
  
  // Calculate scale state
  const getScale = () => {
    if (isPressed) return 0.97;
    if (isActive) return 1.04;
    return 1;
  };
  
  // Desktop absolute positioning with animation
  if (variant === 'desktop') {
    return (
      <motion.div
        className="absolute cursor-pointer outline-none"
        style={{
          top: card.desktop.top,
          left: card.desktop.left,
          width: card.desktop.width,
          height: card.desktop.height,
          zIndex: isActive ? 50 : card.desktop.zIndex,
        }}
        // Idle floating animation
        animate={{
          y: isActive ? -8 : [0, -6, 0],
        }}
        transition={isActive ? springConfig : {
          duration: 4 + floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        }}
        onMouseEnter={() => onActivate(card.id)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(card.id)}
        onBlur={() => onActivate(null)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        tabIndex={0}
        role="button"
        aria-label={`${card.title} - Click to explore`}
      >
        <Link href={card.href} className="block w-full h-full focus:outline-none">
          <motion.div
            className={`
              w-full h-full rounded-2xl bg-white
              border border-gray-100
              flex flex-col justify-between
              ${card.isPrimary ? 'p-6' : 'p-4'}
            `}
            animate={{
              opacity: getOpacity(),
              scale: getScale(),
              boxShadow: isActive
                ? `0 30px 60px -15px rgba(0,0,0,0.2), 0 0 0 2px ${card.accentColor}40, 0 0 40px ${card.accentColor}15`
                : isRelated && isAnyActive
                ? `0 20px 40px -10px rgba(0,0,0,0.12), 0 0 0 1px ${card.accentColor}30`
                : card.isPrimary
                ? '0 25px 50px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)'
                : '0 10px 30px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
            }}
            transition={springConfig}
          >
            {/* Top highlight bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{
                background: `linear-gradient(90deg, ${card.accentColor}, ${card.accentColor}80)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={springConfig}
            />
            
            {/* Icon */}
            <motion.div
              className={`
                flex items-center justify-center rounded-xl
                ${card.isPrimary ? 'w-14 h-14' : 'w-10 h-10'}
              `}
              style={{
                background: `${card.accentColor}12`,
              }}
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? 3 : 0,
              }}
              transition={springConfig}
            >
              <Icon
                className={card.isPrimary ? 'w-7 h-7' : 'w-5 h-5'}
                style={{ color: card.accentColor }}
              />
            </motion.div>
            
            {/* Title */}
            <motion.h3
              className={`
                font-semibold tracking-tight
                ${card.isPrimary ? 'text-xl' : 'text-base'}
              `}
              animate={{
                color: isActive ? card.accentColor : '#111827',
              }}
              transition={{ duration: 0.2 }}
            >
              {card.title}
            </motion.h3>
          </motion.div>
        </Link>
        
        {/* Connection node indicator */}
        <motion.div
          className="absolute top-1/2 -right-2 w-4 h-4 rounded-full -translate-y-1/2"
          style={{
            background: card.accentColor,
            boxShadow: `0 0 12px ${card.accentColor}`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={springConfig}
        />
        <motion.div
          className="absolute top-1/2 -left-2 w-4 h-4 rounded-full -translate-y-1/2"
          style={{
            background: card.accentColor,
            boxShadow: `0 0 12px ${card.accentColor}`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ ...springConfig, delay: 0.05 }}
        />
      </motion.div>
    );
  }
  
  // Mobile variants with animation
  const mobileVariants = {
    'mobile-active': {
      opacity: 1,
      scale: 1,
      y: 0,
      zIndex: 30,
    },
    'mobile-related': {
      opacity: 0.4,
      scale: 0.88,
      y: -15,
      zIndex: 20,
    },
    'mobile-background': {
      opacity: 0.12,
      scale: 0.7,
      y: -30,
      zIndex: 10,
    },
  };
  
  const targetVariant = mobileVariants[variant];
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={targetVariant}
      transition={springConfigSoft}
      onClick={() => variant === 'mobile-active' ? null : onActivate(card.id)}
    >
      <Link href={card.href} className="block">
        <motion.div
          className="w-[280px] h-[220px] rounded-2xl bg-white border border-gray-100 p-6 flex flex-col justify-between"
          style={{
            boxShadow: variant === 'mobile-active' 
              ? `0 30px 60px -15px rgba(0,0,0,0.2), 0 0 0 2px ${card.accentColor}30`
              : '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={springConfig}
        >
          {/* Top highlight */}
          {variant === 'mobile-active' && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ background: card.accentColor }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={springConfig}
            />
          )}
          
          {/* Icon */}
          <motion.div
            className="w-14 h-14 flex items-center justify-center rounded-xl"
            style={{ background: `${card.accentColor}12` }}
            animate={{
              scale: variant === 'mobile-active' ? 1 : 0.9,
            }}
            transition={springConfig}
          >
            <Icon className="w-7 h-7" style={{ color: card.accentColor }} />
          </motion.div>
          
          {/* Title */}
          <div>
            <motion.h3 
              className="text-xl font-semibold tracking-tight mb-1"
              animate={{
                color: variant === 'mobile-active' ? card.accentColor : '#111827',
              }}
              transition={{ duration: 0.2 }}
            >
              {card.title}
            </motion.h3>
            <p className="text-sm text-gray-500">
              {variant === 'mobile-active' ? 'Tap to explore' : 'Tap to focus'}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ============================================
// MOBILE DIAGRAM VIEW (WITH SWIPE)
// ============================================

function MobileDiagramView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const activeCard = CARDS[activeIndex];
  const relatedIds = activeCard.relatedTo;
  
  // Get related cards
  const relatedCards = CARDS.filter(c => relatedIds.includes(c.id));
  // Get background cards (not active, not related)
  const backgroundCards = CARDS.filter(
    c => c.id !== activeCard.id && !relatedIds.includes(c.id)
  );
  
  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  }, []);
  
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  }, []);
  
  const goToCard = useCallback((id: string | null) => {
    if (!id) return;
    const index = CARDS.findIndex(c => c.id === id);
    if (index !== -1) setActiveIndex(index);
  }, []);
  
  // Swipe detection
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };
  
  return (
    <motion.div 
      className="relative w-full h-[500px] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background cards - faded layers with animation */}
      <AnimatePresence mode="popLayout">
        {backgroundCards.slice(0, 3).map((card, i) => (
          <motion.div
            key={card.id}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{
              opacity: 0.08 - i * 0.02,
              scale: 0.6 - i * 0.05,
              y: -25 - i * 12,
            }}
            exit={{ opacity: 0, scale: 0.4, y: -60 }}
            transition={springConfigSoft}
            style={{ zIndex: 5 - i }}
          >
            <div
              className="w-[280px] h-[220px] rounded-2xl bg-white border border-gray-200"
              style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Related cards - semi-visible layers */}
      <AnimatePresence mode="popLayout">
        {relatedCards.slice(0, 2).map((card) => (
          <Card
            key={card.id}
            card={card}
            variant="mobile-related"
            activeCardId={activeCard.id}
            relatedCardIds={relatedIds}
            onActivate={goToCard}
          />
        ))}
      </AnimatePresence>
      
      {/* Active card - fully visible */}
      <AnimatePresence mode="wait">
        <Card 
          key={activeCard.id}
          card={activeCard} 
          variant="mobile-active"
          activeCardId={activeCard.id}
          relatedCardIds={relatedIds}
          onActivate={goToCard}
        />
      </AnimatePresence>
      
      {/* Swipe hint indicator */}
      <motion.div
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30"
        animate={{ x: [-5, 0, -5], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronLeft className="w-8 h-8 text-gray-300" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30"
        animate={{ x: [5, 0, 5], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronRight className="w-8 h-8 text-gray-300" />
      </motion.div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-40">
        <motion.button
          onClick={goToPrev}
          className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg"
          whileTap={{ scale: 0.9 }}
          transition={springConfig}
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </motion.button>
        
        {/* Dots indicator */}
        <div className="flex items-center gap-1.5">
          {CARDS.map((card, i) => (
            <motion.button
              key={card.id}
              onClick={() => setActiveIndex(i)}
              className="h-2 rounded-full"
              animate={{
                width: i === activeIndex ? 24 : 8,
                backgroundColor: i === activeIndex ? card.accentColor : '#d1d5db',
              }}
              transition={springConfig}
              aria-label={`Go to ${card.title}`}
            />
          ))}
        </div>
        
        <motion.button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg"
          whileTap={{ scale: 0.9 }}
          transition={springConfig}
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>
      
      {/* Card counter with title */}
      <motion.div 
        className="absolute top-4 left-0 right-0 text-center z-40"
        key={activeCard.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfigSoft}
      >
        <span className="text-sm text-gray-400 font-medium">
          {activeIndex + 1} of {CARDS.length}
        </span>
        <span className="mx-2 text-gray-300">•</span>
        <span 
          className="text-sm font-semibold"
          style={{ color: activeCard.accentColor }}
        >
          {activeCard.title}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// DESKTOP DIAGRAM VIEW (WITH INTERACTION)
// ============================================

function DesktopDiagramView() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get active card data
  const activeCard = activeCardId ? CARDS.find(c => c.id === activeCardId) : null;
  const relatedCardIds = activeCard?.relatedTo || [];
  
  // Get related card objects for connectors
  const relatedCards = relatedCardIds.map(id => CARDS.find(c => c.id === id)).filter(Boolean) as CardConfig[];
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: '700px', height: '75vh', maxHeight: '900px' }}
    >
      {/* Static background connection lines (subtle, always visible) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {/* Faint background grid lines */}
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#e5e7eb" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />
        
        {/* Static hint lines - very subtle */}
        {CARDS.map(card => 
          card.relatedTo.slice(0, 2).map(targetId => {
            const target = CARDS.find(c => c.id === targetId);
            if (!target) return null;
            
            // Simple straight lines as hints
            const parsePos = (pos: string) => parseFloat(pos);
            const x1 = parsePos(card.desktop.left) + parseFloat(card.desktop.width) / 2 / 10;
            const y1 = parsePos(card.desktop.top) + parseFloat(card.desktop.height) / 2 / 7;
            const x2 = parsePos(target.desktop.left) + parseFloat(target.desktop.width) / 2 / 10;
            const y2 = parsePos(target.desktop.top) + parseFloat(target.desktop.height) / 2 / 7;
            
            return (
              <line
                key={`${card.id}-${targetId}-hint`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2 6"
                opacity="0.4"
              />
            );
          })
        )}
      </svg>
      
      {/* Animated connection lines (visible on hover) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 40 }}
      >
        <AnimatePresence>
          {activeCard && relatedCards.map((targetCard, index) => (
            <ConnectorLine
              key={`${activeCardId}-${targetCard.id}`}
              sourceCard={activeCard}
              targetCard={targetCard}
              containerRef={containerRef}
              isVisible={true}
              delay={index * 0.05}
            />
          ))}
        </AnimatePresence>
      </svg>
      
      {/* All cards with absolute positioning */}
      {CARDS.map((card, index) => (
        <Card 
          key={card.id} 
          card={card} 
          variant="desktop"
          activeCardId={activeCardId}
          relatedCardIds={relatedCardIds}
          onActivate={setActiveCardId}
          floatDelay={index * 0.3}
        />
      ))}
      
      {/* Active card label overlay */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={springConfigSoft}
          >
            <div 
              className="px-6 py-3 rounded-full bg-white shadow-xl border flex items-center gap-3"
              style={{ borderColor: `${activeCard.accentColor}30` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${activeCard.accentColor}15` }}
              >
                <activeCard.icon className="w-4 h-4" style={{ color: activeCard.accentColor }} />
              </div>
              <span className="font-semibold text-gray-900">{activeCard.title}</span>
              <span className="text-sm text-gray-400">
                {relatedCardIds.length} connected
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ModularSolutionsLayout() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: '#F6F9FC' }}
    >
      {/* Ambient background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 91, 255, 0.06) 0%, transparent 70%)',
            top: '5%',
            left: '5%',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 170, 0.05) 0%, transparent 70%)',
            bottom: '10%',
            right: '5%',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with entrance animation */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springConfigSoft, delay: 0.1 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'rgba(99, 91, 255, 0.1)',
              color: '#635BFF',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...springConfig, delay: 0.2 }}
          >
            Modular by design
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springConfigSoft, delay: 0.3 }}
          >
            A fully integrated suite of
            <br />
            <motion.span 
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, #635BFF 0%, #00D4AA 50%, #635BFF 100%)',
                backgroundSize: '200% auto',
              }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              financial products
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ ...springConfigSoft, delay: 0.5 }}
          >
            Choose the products that work best for your business. 
            They all work together seamlessly.
          </motion.p>
        </motion.div>
        
        {/* Desktop Diagram Layout */}
        <motion.div 
          className="hidden lg:block"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springConfigSoft, delay: 0.6 }}
        >
          <DesktopDiagramView />
        </motion.div>
        
        {/* Mobile/Tablet Diagram Layout */}
        <motion.div 
          className="lg:hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springConfigSoft, delay: 0.4 }}
        >
          <MobileDiagramView />
        </motion.div>
        
        {/* Instruction hint */}
        <motion.div
          className="text-center mt-8 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p className="text-sm text-gray-400">
            Hover over any product to see connections
          </p>
        </motion.div>
      </div>
    </section>
  );
}
