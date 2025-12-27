'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
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
  ArrowRight,
  Banknote,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES & DATA STRUCTURES
// ============================================

interface CardData {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  href: string;
  isPrimary?: boolean;
  position: {
    gridArea: string;
    floatDelay?: number;
  };
}

interface RelationsMap {
  [key: string]: string[];
}

// Card positions mapping for the modular grid layout
const CARDS: CardData[] = [
  // Primary/Central Cards
  {
    id: 'payments',
    title: 'Payments',
    icon: CreditCard,
    accentColor: '#635BFF',
    gradientFrom: '#635BFF',
    gradientTo: '#A960EE',
    href: '/individuals/personal-financing',
    isPrimary: true,
    position: { gridArea: 'payments', floatDelay: 0 },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: Smartphone,
    accentColor: '#00D4AA',
    gradientFrom: '#00D4AA',
    gradientTo: '#00A67E',
    href: '/business/cash-financing',
    isPrimary: true,
    position: { gridArea: 'terminal', floatDelay: 0.5 },
  },
  // Secondary Cards - Top Row
  {
    id: 'radar',
    title: 'Radar',
    icon: ShieldCheck,
    accentColor: '#F7B32D',
    gradientFrom: '#F7B32D',
    gradientTo: '#E89B0C',
    href: '/about/story',
    position: { gridArea: 'radar', floatDelay: 0.2 },
  },
  {
    id: 'connect',
    title: 'Connect',
    icon: Users,
    accentColor: '#0A2540',
    gradientFrom: '#0A2540',
    gradientTo: '#1A3A5C',
    href: '/contact',
    position: { gridArea: 'connect', floatDelay: 0.7 },
  },
  {
    id: 'billing',
    title: 'Billing',
    icon: FileText,
    accentColor: '#00D4AA',
    gradientFrom: '#00D4AA',
    gradientTo: '#00A67E',
    href: '/calculator',
    position: { gridArea: 'billing', floatDelay: 0.3 },
  },
  // Secondary Cards - Left Column
  {
    id: 'checkout',
    title: 'Checkout',
    icon: Wallet,
    accentColor: '#635BFF',
    gradientFrom: '#635BFF',
    gradientTo: '#8B80FF',
    href: '/individuals/car-financing',
    position: { gridArea: 'checkout', floatDelay: 0.4 },
  },
  {
    id: 'elements',
    title: 'Elements',
    icon: Zap,
    accentColor: '#FF6B6B',
    gradientFrom: '#FF6B6B',
    gradientTo: '#EE5A5A',
    href: '/apply',
    position: { gridArea: 'elements', floatDelay: 0.6 },
  },
  // Secondary Cards - Right Column
  {
    id: 'atlas',
    title: 'Atlas',
    icon: Globe,
    accentColor: '#635BFF',
    gradientFrom: '#635BFF',
    gradientTo: '#9D94FF',
    href: '/branches',
    position: { gridArea: 'atlas', floatDelay: 0.8 },
  },
  {
    id: 'capital',
    title: 'Capital',
    icon: TrendingUp,
    accentColor: '#00D4AA',
    gradientFrom: '#00D4AA',
    gradientTo: '#00FFCC',
    href: '/business/heavy-equipment',
    position: { gridArea: 'capital', floatDelay: 0.1 },
  },
  // Bottom Row
  {
    id: 'issuing',
    title: 'Issuing',
    icon: Car,
    accentColor: '#0A2540',
    gradientFrom: '#0A2540',
    gradientTo: '#2D5A7B',
    href: '/business/car-financing',
    position: { gridArea: 'issuing', floatDelay: 0.9 },
  },
  {
    id: 'treasury',
    title: 'Treasury',
    icon: Banknote,
    accentColor: '#00D4AA',
    gradientFrom: '#00D4AA',
    gradientTo: '#00FFCC',
    href: '/individuals/rates',
    position: { gridArea: 'treasury', floatDelay: 0.35 },
  },
  {
    id: 'sigma',
    title: 'Sigma',
    icon: Calculator,
    accentColor: '#635BFF',
    gradientFrom: '#635BFF',
    gradientTo: '#A085FF',
    href: '/calculator',
    position: { gridArea: 'sigma', floatDelay: 0.55 },
  },
];

// Relationships between cards (which cards are related when one is hovered)
const RELATIONS: RelationsMap = {
  payments: ['checkout', 'elements', 'radar', 'billing', 'terminal'],
  terminal: ['payments', 'connect', 'radar'],
  radar: ['payments', 'terminal', 'checkout', 'elements'],
  connect: ['payments', 'terminal', 'atlas', 'capital'],
  billing: ['payments', 'treasury', 'sigma'],
  checkout: ['payments', 'elements', 'radar'],
  elements: ['payments', 'checkout', 'radar'],
  atlas: ['connect', 'capital'],
  capital: ['connect', 'atlas', 'treasury'],
  issuing: ['payments', 'treasury', 'connect'],
  treasury: ['capital', 'issuing', 'billing', 'sigma'],
  sigma: ['billing', 'treasury', 'payments'],
};

// ============================================
// ANIMATED GRADIENT ICON COMPONENT
// ============================================

function GradientIcon({ 
  icon: Icon, 
  gradientFrom, 
  gradientTo, 
  id,
  isHovered,
}: { 
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  gradientFrom: string;
  gradientTo: string;
  id: string;
  isHovered: boolean;
}) {
  const gradientId = `gradient-${id}`;
  
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop 
              offset="0%" 
              stopColor={gradientFrom}
              animate={{ stopColor: isHovered ? gradientTo : gradientFrom }}
              transition={{ duration: 0.3 }}
            />
            <motion.stop 
              offset="100%" 
              stopColor={gradientTo}
              animate={{ stopColor: isHovered ? gradientFrom : gradientTo }}
              transition={{ duration: 0.3 }}
            />
          </linearGradient>
        </defs>
      </svg>
      <Icon 
        className="w-6 h-6" 
        style={{ 
          stroke: `url(#${gradientId})`,
          fill: 'none',
          strokeWidth: 2,
        }} 
      />
    </div>
  );
}

// ============================================
// CONNECTOR LINE COMPONENT (SVG)
// ============================================

interface ConnectorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  isActive: boolean;
  delay?: number;
}

function Connector({ startX, startY, endX, endY, color, isActive, delay = 0 }: ConnectorProps) {
  // Calculate control points for a smooth, organic bezier curve
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Curve intensity based on distance
  const curveIntensity = Math.min(distance * 0.3, 80);
  
  // Calculate perpendicular offset for natural curves
  const angle = Math.atan2(dy, dx);
  const perpAngle = angle + Math.PI / 2;
  
  // Create smooth S-curve control points
  const ctrl1X = startX + dx * 0.25 + Math.cos(perpAngle) * curveIntensity * 0.3;
  const ctrl1Y = startY + dy * 0.25 + Math.sin(perpAngle) * curveIntensity * 0.3;
  const ctrl2X = startX + dx * 0.75 - Math.cos(perpAngle) * curveIntensity * 0.3;
  const ctrl2Y = startY + dy * 0.75 - Math.sin(perpAngle) * curveIntensity * 0.3;
  
  const pathD = `M ${startX} ${startY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${endX} ${endY}`;
  
  return (
    <g>
      {/* Outer glow effect layer */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 0.15 : 0,
        }}
        transition={{
          pathLength: { 
            duration: 0.5, 
            ease: [0.32, 0, 0.67, 0],
            delay: delay,
          },
          opacity: { duration: 0.2, delay: delay },
        }}
        style={{ filter: 'blur(12px)' }}
      />
      
      {/* Inner glow effect layer */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 0.4 : 0,
        }}
        transition={{
          pathLength: { 
            duration: 0.5, 
            ease: [0.32, 0, 0.67, 0],
            delay: delay,
          },
          opacity: { duration: 0.2, delay: delay },
        }}
        style={{ filter: 'blur(4px)' }}
      />
      
      {/* Main connector line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 0.9 : 0,
        }}
        transition={{
          pathLength: { 
            duration: 0.5, 
            ease: [0.32, 0, 0.67, 0],
            delay: delay,
          },
          opacity: { duration: 0.2, delay: delay },
        }}
      />
      
      {/* Animated energy pulse traveling along the path */}
      {isActive && (
        <>
          <motion.circle
            r={5}
            fill="white"
            initial={{ offsetDistance: '0%', opacity: 0 }}
            animate={{ 
              offsetDistance: '100%',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              repeat: Infinity,
              delay: delay + 0.2,
            }}
            style={{
              offsetPath: `path('${pathD}')`,
              filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 4px white)`,
            }}
          />
          {/* Secondary smaller pulse */}
          <motion.circle
            r={3}
            fill={color}
            initial={{ offsetDistance: '0%', opacity: 0 }}
            animate={{ 
              offsetDistance: '100%',
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              repeat: Infinity,
              delay: delay + 0.7,
            }}
            style={{
              offsetPath: `path('${pathD}')`,
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </>
      )}
    </g>
  );
}

// ============================================
// SINGLE CARD COMPONENT
// ============================================

interface CardProps {
  card: CardData;
  isActive: boolean;
  isRelated: boolean;
  isAnyHovered: boolean;
  onHover: (id: string | null) => void;
  onFocus: (id: string | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

function Card({ card, isActive, isRelated, isAnyHovered, onHover, onFocus, cardRef }: CardProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  // Calculate opacity based on hover state
  const getOpacity = () => {
    if (!isAnyHovered) return 1;
    if (isActive) return 1;
    if (isRelated) return 0.9;
    return 0.25;
  };
  
  // Calculate scale based on state
  const getScale = () => {
    if (isPressed) return 0.97;
    if (isActive) return 1.04;
    return 1;
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative group cursor-pointer outline-none",
        card.isPrimary ? "col-span-2 row-span-2" : ""
      )}
      style={{ gridArea: card.position.gridArea }}
      // Idle floating animation
      animate={{
        y: isActive ? -6 : [0, -6, 0],
      }}
      transition={isActive ? {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      } : {
        duration: 5 + (card.position.floatDelay || 0),
        repeat: Infinity,
        ease: 'easeInOut',
        delay: card.position.floatDelay || 0,
      }}
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onFocus(card.id)}
      onBlur={() => onFocus(null)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsPressed(true);
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsPressed(false);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${card.title} - Click to learn more`}
      aria-pressed={isActive}
    >
      <Link href={card.href} className="block h-full focus:outline-none">
        <motion.div
          className={cn(
            "relative h-full rounded-2xl overflow-hidden",
            "bg-white",
            "border border-gray-100/80",
            card.isPrimary ? "p-6 md:p-8 min-h-[180px] md:min-h-[220px]" : "p-4 md:p-5 min-h-[100px] md:min-h-[120px]"
          )}
          animate={{
            opacity: getOpacity(),
            scale: getScale(),
            boxShadow: isActive
              ? `0 30px 60px -15px rgba(0,0,0,0.2), 0 0 0 2px ${card.accentColor}30, 0 0 30px ${card.accentColor}15`
              : isRelated
              ? `0 15px 35px -10px rgba(0,0,0,0.1), 0 0 0 1px ${card.accentColor}20`
              : '0 4px 25px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)',
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.23, 1, 0.32, 1],
            scale: { type: 'spring', stiffness: 500, damping: 30 }
          }}
        >
          {/* Subtle gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${card.gradientFrom}10 0%, ${card.gradientTo}05 100%)`,
            }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Top edge highlight on hover */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{
              background: `linear-gradient(90deg, ${card.gradientFrom}, ${card.gradientTo})`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          />
          
          {/* Card content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <motion.div
              className={cn(
                "flex items-center justify-center rounded-xl mb-3 md:mb-4",
                card.isPrimary ? "w-12 h-12 md:w-14 md:h-14" : "w-9 h-9 md:w-10 md:h-10"
              )}
              style={{
                background: `linear-gradient(135deg, ${card.gradientFrom}15 0%, ${card.gradientTo}08 100%)`,
              }}
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? 3 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <card.icon
                className={card.isPrimary ? "w-6 h-6 md:w-7 md:h-7" : "w-4 h-4 md:w-5 md:h-5"}
                style={{ color: card.accentColor }}
              />
            </motion.div>
            
            {/* Title */}
            <motion.h3
              className={cn(
                "font-semibold tracking-tight",
                card.isPrimary ? "text-lg md:text-xl" : "text-sm md:text-base"
              )}
              animate={{
                color: isActive ? card.accentColor : '#0f172a',
              }}
              transition={{ duration: 0.25 }}
            >
              {card.title}
            </motion.h3>
            
            {/* Arrow indicator for primary cards */}
            {card.isPrimary && (
              <motion.div
                className="mt-auto pt-3 md:pt-4 flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -10,
                }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <span 
                  className="text-xs md:text-sm font-medium"
                  style={{ color: card.accentColor }}
                >
                  Learn more
                </span>
                <motion.div
                  animate={{ x: isActive ? [0, 4, 0] : 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight 
                    className="w-3 h-3 md:w-4 md:h-4"
                    style={{ color: card.accentColor }}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
          
          {/* Connection points - multiple for visual interest */}
          <motion.div
            className="absolute top-1/2 -right-1.5 w-3 h-3 rounded-full -translate-y-1/2"
            style={{
              background: card.accentColor,
              boxShadow: `0 0 12px ${card.accentColor}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          />
          <motion.div
            className="absolute -left-1.5 top-1/2 w-3 h-3 rounded-full -translate-y-1/2"
            style={{
              background: card.accentColor,
              boxShadow: `0 0 12px ${card.accentColor}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.2, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ============================================
// CONNECTORS LAYER COMPONENT
// ============================================

interface ConnectorsLayerProps {
  activeCard: string | null;
  cardPositions: Map<string, DOMRect>;
  containerRect: DOMRect | null;
}

function ConnectorsLayer({ activeCard, cardPositions, containerRect }: ConnectorsLayerProps) {
  if (!activeCard || !containerRect) return null;
  
  const activeCardRect = cardPositions.get(activeCard);
  if (!activeCardRect) return null;
  
  const relatedCards = RELATIONS[activeCard] || [];
  const activeCardData = CARDS.find(c => c.id === activeCard);
  
  // Calculate the best connection points based on relative positions
  const getConnectionPoint = (sourceRect: DOMRect, targetRect: DOMRect, isSource: boolean) => {
    const sourceCenter = {
      x: sourceRect.left - containerRect.left + sourceRect.width / 2,
      y: sourceRect.top - containerRect.top + sourceRect.height / 2,
    };
    const targetCenter = {
      x: targetRect.left - containerRect.left + targetRect.width / 2,
      y: targetRect.top - containerRect.top + targetRect.height / 2,
    };
    
    const dx = targetCenter.x - sourceCenter.x;
    const dy = targetCenter.y - sourceCenter.y;
    const rect = isSource ? sourceRect : targetRect;
    const center = isSource ? sourceCenter : targetCenter;
    
    // Determine which edge to connect from based on angle
    const angle = Math.atan2(isSource ? dy : -dy, isSource ? dx : -dx);
    const absAngle = Math.abs(angle);
    
    if (absAngle < Math.PI / 4) {
      // Connect from right
      return { x: center.x + rect.width / 2, y: center.y };
    } else if (absAngle > 3 * Math.PI / 4) {
      // Connect from left
      return { x: center.x - rect.width / 2, y: center.y };
    } else if (angle > 0) {
      // Connect from bottom
      return { x: center.x, y: center.y + rect.height / 2 };
    } else {
      // Connect from top
      return { x: center.x, y: center.y - rect.height / 2 };
    }
  };
  
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Glow filter for connector lines */}
        <filter id="connector-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {relatedCards.map((relatedId, index) => {
        const relatedRect = cardPositions.get(relatedId);
        if (!relatedRect) return null;
        
        // Get smart connection points
        const start = getConnectionPoint(activeCardRect, relatedRect, true);
        const end = getConnectionPoint(relatedRect, activeCardRect, false);
        
        return (
          <Connector
            key={`${activeCard}-${relatedId}`}
            startX={start.x}
            startY={start.y}
            endX={end.x}
            endY={end.y}
            color={activeCardData?.accentColor || '#635BFF'}
            isActive={true}
            delay={index * 0.04}
          />
        );
      })}
    </svg>
  );
}

// ============================================
// MAIN MODULAR SOLUTIONS COMPONENT
// ============================================

export default function ModularSolutions() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [cardPositions, setCardPositions] = useState<Map<string, DOMRect>>(new Map());
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const controls = useAnimation();
  
  // Combined active state (hover or focus)
  const currentActive = activeCard || focusedCard;
  
  // Update card positions for connector lines
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    
    const newPositions = new Map<string, DOMRect>();
    cardRefs.current.forEach((element, id) => {
      if (element) {
        newPositions.set(id, element.getBoundingClientRect());
      }
    });
    setCardPositions(newPositions);
    setContainerRect(containerRef.current.getBoundingClientRect());
  }, []);
  
  // Update positions on mount and resize
  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);
    
    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [updatePositions]);
  
  // Update positions when active card changes
  useEffect(() => {
    updatePositions();
  }, [currentActive, updatePositions]);
  
  // Trigger entrance animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  // Check if a card is related to the active card
  const isRelated = useCallback((cardId: string) => {
    if (!currentActive) return false;
    return RELATIONS[currentActive]?.includes(cardId) || false;
  }, [currentActive]);
  
  // Register card ref
  const registerCardRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  }, []);
  
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };
  
  const cardEntranceVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };
  
  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#F6F9FC' }}
    >
      {/* Subtle background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 91, 255, 0.05) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
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
            right: '10%',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -25, 0],
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
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'rgba(99, 91, 255, 0.1)',
              color: '#635BFF',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Modular by design
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            A fully integrated suite of
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #635BFF 0%, #00D4AA 50%, #635BFF 100%)',
                backgroundSize: '200% auto',
              }}
            >
              financial products
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Choose the products that work best for your business. 
            They all work together seamlessly.
          </p>
        </motion.div>
        
        {/* Cards Grid */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          {/* Connectors SVG Layer */}
          <AnimatePresence>
            {currentActive && (
              <ConnectorsLayer
                activeCard={currentActive}
                cardPositions={cardPositions}
                containerRect={containerRect}
              />
            )}
          </AnimatePresence>
          
          {/* Cards Grid - Desktop */}
          <motion.div
            className="hidden lg:grid gap-4 xl:gap-5"
            style={{
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridTemplateRows: 'repeat(4, auto)',
              gridTemplateAreas: `
                "radar radar payments payments connect connect"
                "checkout checkout payments payments atlas atlas"
                "elements elements terminal terminal capital capital"
                "issuing issuing treasury treasury sigma sigma"
              `,
            }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {CARDS.map((card) => (
              <motion.div
                key={card.id}
                style={{ gridArea: card.position.gridArea }}
                variants={cardEntranceVariants}
              >
                <Card
                  card={card}
                  isActive={currentActive === card.id}
                  isRelated={isRelated(card.id)}
                  isAnyHovered={!!currentActive}
                  onHover={setActiveCard}
                  onFocus={setFocusedCard}
                  cardRef={registerCardRef(card.id)}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Cards Grid - Mobile/Tablet */}
          <motion.div
            className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Primary cards first on mobile */}
            {CARDS.filter(c => c.isPrimary).map((card) => (
              <motion.div
                key={card.id}
                className="col-span-2 sm:col-span-3"
                variants={cardEntranceVariants}
              >
                <Card
                  card={card}
                  isActive={currentActive === card.id}
                  isRelated={isRelated(card.id)}
                  isAnyHovered={!!currentActive}
                  onHover={setActiveCard}
                  onFocus={setFocusedCard}
                  cardRef={registerCardRef(card.id)}
                />
              </motion.div>
            ))}
            {/* Secondary cards */}
            {CARDS.filter(c => !c.isPrimary).map((card) => (
              <motion.div
                key={card.id}
                variants={cardEntranceVariants}
              >
                <Card
                  card={card}
                  isActive={currentActive === card.id}
                  isRelated={isRelated(card.id)}
                  isAnyHovered={!!currentActive}
                  onHover={setActiveCard}
                  onFocus={setFocusedCard}
                  cardRef={registerCardRef(card.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/apply">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg"
              style={{
                background: 'linear-gradient(135deg, #635BFF 0%, #8B7DFF 100%)',
                boxShadow: '0 20px 40px -15px rgba(99, 91, 255, 0.4)',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 25px 50px -15px rgba(99, 91, 255, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span>Get started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
