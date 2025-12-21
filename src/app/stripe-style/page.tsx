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

// SVG Wire Component with animated flow effect
function AnimatedWire({ 
  startX, 
  startY, 
  endX, 
  endY, 
  controlPoint1X, 
  controlPoint1Y, 
  controlPoint2X, 
  controlPoint2Y,
  color = COLORS.gold,
  delay = 0,
  isActive = false,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlPoint1X: number;
  controlPoint1Y: number;
  controlPoint2X: number;
  controlPoint2Y: number;
  color?: string;
  delay?: number;
  isActive?: boolean;
}) {
  const pathD = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;
  
  return (
    <g>
      {/* Background wire (static) */}
      <path
        d={pathD}
        fill="none"
        stroke={`${color}20`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Animated flow wire */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={isActive ? color : `${color}60`}
        strokeWidth={isActive ? 3 : 2}
        strokeLinecap="round"
        strokeDasharray="10 10"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -20 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
        style={{
          filter: isActive ? `drop-shadow(0 0 8px ${color})` : 'none',
        }}
      />
      {/* Glowing dot traveling along the path */}
      <motion.circle
        r={isActive ? 6 : 4}
        fill={color}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
        style={{
          offsetPath: `path('${pathD}')`,
          filter: `drop-shadow(0 0 ${isActive ? 12 : 6}px ${color})`,
        }}
      />
    </g>
  );
}

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

// Glass Service Card with hover lift effect
function GlassCard({ 
  icon: Icon, 
  title, 
  description, 
  color = COLORS.gold,
  delay = 0,
  isHovered,
  onHover,
  id,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: string;
  delay?: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  id: string;
}) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Card glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent, ${color}20)`,
          filter: 'blur(20px)',
        }}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />
      
      {/* Card content */}
      <motion.div
        className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden"
        style={{
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px ${color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
        animate={isHovered ? { y: -10 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top light gradient (simulating light from above) */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
          }}
        />
        
        {/* Icon container */}
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            border: `1px solid ${color}30`,
          }}
          animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8" style={{ color }} />
        </motion.div>
        
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
        
        {/* Active indicator */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-sm font-medium"
          style={{ color }}
          initial={{ opacity: 0, x: -10 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// CSS-Built Phone Frame Component
function PhoneFrame() {
  const { language } = useI18n();
  const [notifications, setNotifications] = useState<Array<{ id: number; amount: string; type: string }>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll transactions
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const interval = setInterval(() => {
      if (scrollContainer.scrollTop < scrollContainer.scrollHeight - scrollContainer.clientHeight) {
        scrollContainer.scrollTop += 1;
      } else {
        scrollContainer.scrollTop = 0;
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Random notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        amount: `SAR ${(Math.random() * 5000 + 500).toFixed(0)}`,
        type: Math.random() > 0.5 ? 'received' : 'sent',
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 2)]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  const transactions = [
    { name: language === 'ar' ? 'راتب' : 'Salary Deposit', amount: '+15,000', type: 'income' },
    { name: language === 'ar' ? 'تمويل سيارة' : 'Car Finance', amount: '-2,500', type: 'expense' },
    { name: language === 'ar' ? 'تحويل' : 'Transfer', amount: '-1,200', type: 'expense' },
    { name: language === 'ar' ? 'استرداد' : 'Refund', amount: '+350', type: 'income' },
    { name: language === 'ar' ? 'فاتورة' : 'Bill Payment', amount: '-800', type: 'expense' },
    { name: language === 'ar' ? 'إيداع' : 'Deposit', amount: '+5,000', type: 'income' },
    { name: language === 'ar' ? 'سحب' : 'Withdrawal', amount: '-3,000', type: 'expense' },
    { name: language === 'ar' ? 'مكافأة' : 'Bonus', amount: '+2,000', type: 'income' },
  ];
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Phone outer frame */}
      <div 
        className="relative w-[300px] md:w-[340px] h-[620px] md:h-[680px] rounded-[50px] p-2"
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          boxShadow: `
            0 50px 100px -20px rgba(0,0,0,0.7),
            0 30px 60px -15px rgba(0,0,0,0.5),
            inset 0 2px 4px rgba(255,255,255,0.1),
            inset 0 -2px 4px rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Side buttons */}
        <div 
          className="absolute left-[-3px] top-[100px] w-[3px] h-[60px] rounded-l-sm"
          style={{ background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)' }}
        />
        <div 
          className="absolute left-[-3px] top-[180px] w-[3px] h-[60px] rounded-l-sm"
          style={{ background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)' }}
        />
        <div 
          className="absolute right-[-3px] top-[140px] w-[3px] h-[80px] rounded-r-sm"
          style={{ background: 'linear-gradient(180deg, #3a3a3a, #2a2a2a)' }}
        />
        
        {/* Phone inner bezel */}
        <div 
          className="w-full h-full rounded-[42px] overflow-hidden relative"
          style={{
            background: '#000',
            border: '2px solid #333',
          }}
        >
          {/* Notch */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-20 flex items-center justify-center gap-4"
          >
            <div className="w-2 h-2 rounded-full bg-gray-800" />
            <div className="w-16 h-4 rounded-full bg-gray-900" />
          </div>
          
          {/* Screen content */}
          <div 
            className="w-full h-full pt-10 px-4 pb-6 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #00377B 0%, #001F3F 100%)',
            }}
          >
            {/* Notification popups */}
            <div className="absolute top-12 left-4 right-4 z-30 space-y-2">
              <AnimatePresence>
                {notifications.slice(0, 2).map((notif) => (
                  <motion.div
                    key={notif.id}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 shadow-xl"
                    initial={{ y: -50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -30, opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ 
                        background: notif.type === 'received' 
                          ? 'linear-gradient(135deg, #22C55E, #16A34A)' 
                          : 'linear-gradient(135deg, #F7941D, #FDB913)' 
                      }}
                    >
                      {notif.type === 'received' ? (
                        <TrendingUp className="w-5 h-5 text-white" />
                      ) : (
                        <Send className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">
                        {notif.type === 'received' 
                          ? (language === 'ar' ? 'تم استلام الدفعة' : 'Payment Received')
                          : (language === 'ar' ? 'تم إرسال الدفعة' : 'Payment Sent')
                        }
                      </p>
                      <p className="font-bold text-[#00377B]">{notif.amount}</p>
                    </div>
                    <Bell className="w-4 h-4 text-[#F7941D]" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Balance card */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <p className="text-white/60 text-sm mb-1">
                {language === 'ar' ? 'رصيدك الحالي' : 'Current Balance'}
              </p>
              <motion.h2 
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                SAR 45,780
              </motion.h2>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+12.5%</span>
                <span className="text-white/40 text-xs">{language === 'ar' ? 'هذا الشهر' : 'this month'}</span>
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="flex justify-around mt-6">
              {[
                { icon: Send, label: language === 'ar' ? 'تحويل' : 'Send' },
                { icon: CreditCard, label: language === 'ar' ? 'بطاقة' : 'Card' },
                { icon: RefreshCw, label: language === 'ar' ? 'تحويل' : 'Exchange' },
              ].map((action, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(247,148,29,0.3), rgba(247,148,29,0.1))',
                      border: '1px solid rgba(247,148,29,0.3)',
                    }}
                  >
                    <action.icon className="w-6 h-6 text-[#F7941D]" />
                  </div>
                  <span className="text-white/60 text-xs">{action.label}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Transactions list */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">
                  {language === 'ar' ? 'المعاملات الأخيرة' : 'Recent Transactions'}
                </h3>
                <span className="text-[#F7941D] text-sm">{language === 'ar' ? 'عرض الكل' : 'View All'}</span>
              </div>
              
              <div 
                ref={scrollRef}
                className="space-y-3 h-[180px] overflow-hidden"
                style={{ maskImage: 'linear-gradient(180deg, black 80%, transparent 100%)' }}
              >
                {[...transactions, ...transactions].map((tx, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 rounded-xl p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        tx.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                      )}
                    >
                      {tx.type === 'income' ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <Send className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{tx.name}</p>
                      <p className="text-white/40 text-xs">Today</p>
                    </div>
                    <span 
                      className={cn(
                        "font-semibold",
                        tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                      )}
                    >
                      {tx.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
      
      {/* Phone reflection/glow */}
      <div 
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[280px] h-[100px] rounded-[50%] opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(247,148,29,0.5) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </motion.div>
  );
}

// Connected Services Section with Wires
function ConnectedServicesSection() {
  const { language } = useI18n();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wirePositions, setWirePositions] = useState({
    wire1Active: false,
    wire2Active: false,
    wire3Active: false,
  });
  
  const services = [
    {
      id: 'financing',
      icon: Building2,
      title: language === 'ar' ? 'التمويل الشخصي' : 'Personal Finance',
      description: language === 'ar' 
        ? 'حلول تمويلية مرنة تناسب احتياجاتك' 
        : 'Flexible financing solutions for your needs',
      color: COLORS.gold,
    },
    {
      id: 'car',
      icon: Car,
      title: language === 'ar' ? 'تمويل السيارات' : 'Auto Finance',
      description: language === 'ar' 
        ? 'امتلك سيارة أحلامك بسهولة' 
        : 'Own your dream car with ease',
      color: COLORS.cyan,
    },
    {
      id: 'business',
      icon: Users,
      title: language === 'ar' ? 'تمويل الأعمال' : 'Business Finance',
      description: language === 'ar' 
        ? 'نمو أعمالك يبدأ من هنا' 
        : 'Your business growth starts here',
      color: COLORS.lightBlue,
    },
  ];
  
  useEffect(() => {
    setWirePositions({
      wire1Active: hoveredCard === 'financing',
      wire2Active: hoveredCard === 'car',
      wire3Active: hoveredCard === 'business',
    });
  }, [hoveredCard]);
  
  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <MeshGradientBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F7941D] text-sm font-semibold mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4" />
            {language === 'ar' ? 'منظومة متكاملة' : 'Connected Ecosystem'}
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? 'كل شيء متصل' : 'Everything Connected'}
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'منظومة تمويلية متكاملة تربط جميع خدماتك المالية في مكان واحد'
              : 'An integrated financial ecosystem connecting all your services in one place'}
          </p>
        </motion.div>
        
        {/* Main content: Cards + Phone + Wires */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left cards */}
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            {services.slice(0, 2).map((service, index) => (
              <GlassCard
                key={service.id}
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
                delay={index * 0.2}
                isHovered={hoveredCard === service.id}
                onHover={setHoveredCard}
              />
            ))}
          </div>
          
          {/* Center: Phone with SVG wires overlay */}
          <div className="relative">
            {/* SVG Wires Container */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block"
              style={{ overflow: 'visible' }}
              viewBox="-300 -50 900 800"
            >
              <defs>
                <linearGradient id="wireGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COLORS.gold} />
                  <stop offset="100%" stopColor={COLORS.gold} stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="wireGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COLORS.cyan} />
                  <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="wireGradient3" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor={COLORS.lightBlue} />
                  <stop offset="100%" stopColor={COLORS.lightBlue} stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {/* Wire from financing card to phone */}
              <AnimatedWire
                startX={-50}
                startY={100}
                endX={150}
                endY={200}
                controlPoint1X={50}
                controlPoint1Y={100}
                controlPoint2X={100}
                controlPoint2Y={200}
                color={COLORS.gold}
                delay={0}
                isActive={wirePositions.wire1Active}
              />
              
              {/* Wire from car card to phone */}
              <AnimatedWire
                startX={-50}
                startY={350}
                endX={150}
                endY={400}
                controlPoint1X={50}
                controlPoint1Y={350}
                controlPoint2X={100}
                controlPoint2Y={400}
                color={COLORS.cyan}
                delay={0.3}
                isActive={wirePositions.wire2Active}
              />
              
              {/* Wire from business card to phone */}
              <AnimatedWire
                startX={450}
                startY={300}
                endX={300}
                endY={350}
                controlPoint1X={400}
                controlPoint1Y={300}
                controlPoint2X={350}
                controlPoint2Y={350}
                color={COLORS.lightBlue}
                delay={0.6}
                isActive={wirePositions.wire3Active}
              />
            </svg>
            
            <PhoneFrame />
          </div>
          
          {/* Right card */}
          <div className="w-full lg:w-auto">
            {services.slice(2).map((service, index) => (
              <GlassCard
                key={service.id}
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
                delay={0.4}
                isHovered={hoveredCard === service.id}
                onHover={setHoveredCard}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
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
      <ConnectedServicesSection />
      <FeaturesSection />
      <CTASection />
      <StripeStyleFooter />
    </main>
  );
}
