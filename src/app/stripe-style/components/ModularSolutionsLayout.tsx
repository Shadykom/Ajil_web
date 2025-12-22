'use client';

import React, { useState } from 'react';
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
// SINGLE CARD COMPONENT
// ============================================

interface CardProps {
  card: CardConfig;
  variant: 'desktop' | 'mobile-active' | 'mobile-related' | 'mobile-background';
}

function Card({ card, variant }: CardProps) {
  const Icon = card.icon;
  
  // Desktop absolute positioning
  if (variant === 'desktop') {
    return (
      <div
        className="absolute"
        style={{
          top: card.desktop.top,
          left: card.desktop.left,
          width: card.desktop.width,
          height: card.desktop.height,
          zIndex: card.desktop.zIndex,
        }}
      >
        <Link href={card.href} className="block w-full h-full">
          <div
            className={`
              w-full h-full rounded-2xl bg-white
              border border-gray-100
              flex flex-col justify-between
              ${card.isPrimary ? 'p-6' : 'p-4'}
            `}
            style={{
              boxShadow: card.isPrimary
                ? '0 25px 50px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)'
                : '0 10px 30px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
            }}
          >
            {/* Icon */}
            <div
              className={`
                flex items-center justify-center rounded-xl
                ${card.isPrimary ? 'w-14 h-14' : 'w-10 h-10'}
              `}
              style={{
                background: `${card.accentColor}12`,
              }}
            >
              <Icon
                className={card.isPrimary ? 'w-7 h-7' : 'w-5 h-5'}
                style={{ color: card.accentColor }}
              />
            </div>
            
            {/* Title */}
            <h3
              className={`
                font-semibold text-gray-900 tracking-tight
                ${card.isPrimary ? 'text-xl' : 'text-base'}
              `}
            >
              {card.title}
            </h3>
          </div>
        </Link>
      </div>
    );
  }
  
  // Mobile variants
  const mobileStyles = {
    'mobile-active': {
      opacity: 1,
      transform: 'scale(1) translateX(0)',
      zIndex: 30,
    },
    'mobile-related': {
      opacity: 0.4,
      transform: 'scale(0.85) translateX(0)',
      zIndex: 20,
    },
    'mobile-background': {
      opacity: 0.15,
      transform: 'scale(0.7) translateX(0)',
      zIndex: 10,
    },
  };
  
  const style = mobileStyles[variant];
  
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: style.opacity,
        transform: style.transform,
        zIndex: style.zIndex,
      }}
    >
      <Link href={card.href} className="block">
        <div
          className="w-[280px] h-[220px] rounded-2xl bg-white border border-gray-100 p-6 flex flex-col justify-between"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03)',
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 flex items-center justify-center rounded-xl"
            style={{ background: `${card.accentColor}12` }}
          >
            <Icon className="w-7 h-7" style={{ color: card.accentColor }} />
          </div>
          
          {/* Title */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-1">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500">
              Tap to explore
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ============================================
// MOBILE DIAGRAM VIEW
// ============================================

function MobileDiagramView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = CARDS[activeIndex];
  const relatedIds = activeCard.relatedTo;
  
  // Get related cards
  const relatedCards = CARDS.filter(c => relatedIds.includes(c.id));
  // Get background cards (not active, not related)
  const backgroundCards = CARDS.filter(
    c => c.id !== activeCard.id && !relatedIds.includes(c.id)
  );
  
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };
  
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background cards - faded layers */}
      {backgroundCards.slice(0, 3).map((card, i) => (
        <div
          key={card.id}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: 0.1 - i * 0.03,
            transform: `scale(${0.6 - i * 0.05}) translateY(${-20 - i * 10}px)`,
            zIndex: 5 - i,
          }}
        >
          <div
            className="w-[280px] h-[220px] rounded-2xl bg-white border border-gray-200"
            style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
          />
        </div>
      ))}
      
      {/* Related cards - semi-visible layers */}
      {relatedCards.slice(0, 2).map((card, i) => (
        <Card
          key={card.id}
          card={card}
          variant="mobile-related"
        />
      ))}
      
      {/* Active card - fully visible */}
      <Card card={activeCard} variant="mobile-active" />
      
      {/* Navigation controls */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-40">
        <button
          onClick={goToPrev}
          className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Dots indicator */}
        <div className="flex items-center gap-2">
          {CARDS.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(i)}
              className={`
                w-2 h-2 rounded-full transition-all
                ${i === activeIndex 
                  ? 'w-6 bg-gray-800' 
                  : 'bg-gray-300'
                }
              `}
              aria-label={`Go to ${card.title}`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Card counter */}
      <div className="absolute top-4 left-0 right-0 text-center z-40">
        <span className="text-sm text-gray-500 font-medium">
          {activeIndex + 1} / {CARDS.length}
        </span>
      </div>
    </div>
  );
}

// ============================================
// DESKTOP DIAGRAM VIEW
// ============================================

function DesktopDiagramView() {
  return (
    <div 
      className="relative w-full"
      style={{ minHeight: '700px', height: '75vh', maxHeight: '900px' }}
    >
      {/* All cards with absolute positioning */}
      {CARDS.map((card) => (
        <Card key={card.id} card={card} variant="desktop" />
      ))}
      
      {/* Connection lines placeholder - static visual lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      >
        {/* Payments connections */}
        <line x1="38%" y1="28%" x2="16%" y2="28%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="38%" y1="28%" x2="18%" y2="12%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="48%" y1="28%" x2="63%" y2="10%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="48%" y1="28%" x2="83%" y2="15%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Terminal connections */}
        <line x1="60%" y1="55%" x2="63%" y2="18%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="70%" y1="55%" x2="86%" y2="60%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="60%" y1="63%" x2="46%" y2="78%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Cross connections */}
        <line x1="43%" y1="36%" x2="55%" y2="45%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="25%" y1="74%" x2="38%" y2="78%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="52%" y1="78%" x2="62%" y2="81%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="72%" y1="81%" x2="83%" y2="68%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="80%" y1="35%" x2="86%" y2="52%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ModularSolutionsLayout() {
  return (
    <section 
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: '#F6F9FC' }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'rgba(99, 91, 255, 0.1)',
              color: '#635BFF',
            }}
          >
            Modular by design
          </span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
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
        </div>
        
        {/* Desktop Diagram Layout */}
        <div className="hidden lg:block">
          <DesktopDiagramView />
        </div>
        
        {/* Mobile/Tablet Diagram Layout */}
        <div className="lg:hidden">
          <MobileDiagramView />
        </div>
      </div>
    </section>
  );
}
