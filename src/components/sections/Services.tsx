'use client'

import { useRef, ComponentType, SVGProps } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import {
  AnimatedCarFinancing,
  AnimatedPersonalFinancing,
  AnimatedBusinessFinancing,
  AnimatedQuickApproval,
  AnimatedFlexiblePayments,
  AnimatedShariaCompliant,
  AnimatedService247,
} from '@/components/icons/AnimatedIcons'
import Link from 'next/link'

// AJIL Brand Colors
const AJIL_BLUE = '#00377B'
const AJIL_BLUE_LIGHT = '#0066b3'
const AJIL_GOLD = '#F7941D'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

// Mini A Shape Component
function MiniAShape({ size = 24, color = AJIL_GOLD, strokeWidth = 3, filled = false }: { size?: number; color?: string; strokeWidth?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M20 80 L50 20 L80 80"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={filled ? 0.2 : 1}
      />
      {!filled && (
        <path
          d="M32 60 L68 60"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 1.5}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

// Large A Shape for backgrounds
function LargeAShape({ size = 200, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="aGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={AJIL_BLUE} stopOpacity="0.1" />
          <stop offset="100%" stopColor={AJIL_GOLD} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        d="M15 85 L50 15 L85 85 Z"
        fill="url(#aGradient)"
        stroke={AJIL_BLUE}
        strokeWidth="1"
        strokeOpacity="0.1"
      />
      <path
        d="M25 75 L50 25 L75 75"
        fill="none"
        stroke={AJIL_GOLD}
        strokeWidth="2"
        strokeOpacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 65 L65 65"
        fill="none"
        stroke={AJIL_GOLD}
        strokeWidth="1.5"
        strokeOpacity="0.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

const services: Array<{
  key: string
  icon: IconComponent
  titleAr: string
  titleEn: string
  descAr: string
  descEn: string
  featuresAr: string[]
  featuresEn: string[]
  href: string
  accentColor: string
  delay: number
}> = [
  {
    key: 'car',
    icon: AnimatedCarFinancing,
    titleAr: 'تمويل السيارات',
    titleEn: 'Car Financing',
    descAr: 'احصل على سيارة أحلامك مع خيارات تمويل مرنة وأقساط ميسرة تناسب ميزانيتك',
    descEn: 'Get your dream car with flexible financing options and easy installments that fit your budget',
    featuresAr: ['موافقة سريعة', 'بدون دفعة أولى', 'تأمين شامل'],
    featuresEn: ['Quick Approval', 'Zero Down Payment', 'Full Insurance'],
    href: '/individuals/car-financing',
    accentColor: AJIL_GOLD,
    delay: 0,
  },
  {
    key: 'cash',
    icon: AnimatedPersonalFinancing,
    titleAr: 'التمويل الشخصي',
    titleEn: 'Personal Financing',
    descAr: 'تمويل نقدي سريع لتحقيق أهدافك الشخصية بإجراءات سهلة وسريعة',
    descEn: 'Quick cash financing to achieve your personal goals with easy and fast procedures',
    featuresAr: ['بدون كفيل', 'تحويل فوري', 'أقساط مرنة'],
    featuresEn: ['No Guarantor', 'Instant Transfer', 'Flexible Payments'],
    href: '/individuals/personal-financing',
    accentColor: AJIL_GOLD,
    delay: 0.15,
  },
  {
    key: 'business',
    icon: AnimatedBusinessFinancing,
    titleAr: 'تمويل الأعمال',
    titleEn: 'Business Financing',
    descAr: 'حلول تمويلية متكاملة لتنمية أعمالك وتوسيع نشاطك التجاري',
    descEn: 'Complete financing solutions to grow your business and expand your commercial activities',
    featuresAr: ['حلول مخصصة', 'شروط مرنة', 'دعم متواصل'],
    featuresEn: ['Custom Solutions', 'Flexible Terms', 'Ongoing Support'],
    href: '/business/cash-financing',
    accentColor: AJIL_GOLD,
    delay: 0.3,
  },
]

function ServiceCard({ 
  service, 
  index,
  dir,
  language
}: { 
  service: typeof services[0]
  index: number
  dir: string
  language: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const Icon = service.icon
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: 10 }}
      transition={{ duration: 0.8, delay: service.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative perspective-1000"
    >
      {/* Main Card */}
      <div className="relative h-full">
        {/* Glowing border effect */}
        <div 
          className="absolute -inset-[2px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
          style={{ 
            background: `linear-gradient(135deg, ${AJIL_BLUE}40, ${AJIL_GOLD}60, ${AJIL_BLUE}40)`,
          }}
        />
        
        {/* Card body */}
        <div 
          className="relative h-full rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-2xl"
          style={{ 
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            boxShadow: '0 10px 40px rgba(0,55,123,0.08), 0 0 0 1px rgba(0,55,123,0.05)',
          }}
        >
          {/* Top A-shaped accent bar */}
          <div className="relative h-2 overflow-hidden">
            <svg viewBox="0 0 400 20" className="w-full h-full" preserveAspectRatio="none">
              <path 
                d="M0,20 L200,0 L400,20 Z" 
                fill={AJIL_BLUE}
              />
              <path 
                d="M100,18 L200,5 L300,18" 
                fill="none"
                stroke={AJIL_GOLD}
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Background A Shape decorations */}
          <div className="absolute top-8 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
            <LargeAShape size={180} />
          </div>
          <motion.div 
            className="absolute bottom-4 left-4 opacity-[0.03]"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <LargeAShape size={100} />
          </motion.div>

          {/* Content */}
          <div className="relative p-8 pt-6">
            {/* Icon Container with A-shape frame */}
            <div className="relative mb-8">
              <motion.div 
                className="relative w-24 h-24"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* A-shaped background */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id={`iconGrad-${index}`} x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={AJIL_BLUE} stopOpacity="0.1" />
                      <stop offset="100%" stopColor={AJIL_GOLD} stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M15 85 L50 10 L85 85 Z"
                    fill={`url(#iconGrad-${index})`}
                    className="group-hover:fill-[#00377B15] transition-all duration-300"
                  />
                  <path
                    d="M15 85 L50 10 L85 85"
                    fill="none"
                    stroke={AJIL_BLUE}
                    strokeWidth="2"
                    strokeOpacity="0.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <motion.path
                    d="M28 65 L72 65"
                    fill="none"
                    stroke={AJIL_GOLD}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.8, delay: service.delay + 0.5 }}
                  />
                </svg>
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                  <Icon 
                    size={44} 
                    className="transition-colors duration-300"
                    style={{ color: AJIL_BLUE }}
                  />
                </div>

                {/* Floating mini A */}
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: AJIL_GOLD }}
                  >
                    <MiniAShape size={14} color="white" strokeWidth={2} />
                  </div>
                </motion.div>
              </motion.div>

              {/* Service number with A accent */}
              <div 
                className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} flex items-center gap-1`}
              >
                <span 
                  className="text-6xl font-black opacity-[0.06] group-hover:opacity-[0.1] transition-opacity"
                  style={{ color: AJIL_BLUE }}
                >
                  0{index + 1}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 
              className="text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-[#0066b3]"
              style={{ color: AJIL_BLUE }}
            >
              {language === 'ar' ? service.titleAr : service.titleEn}
            </h3>
            
            {/* Description */}
            <p className="text-gray-500 leading-relaxed mb-6">
              {language === 'ar' ? service.descAr : service.descEn}
            </p>

            {/* Features list with A checkmarks */}
            <div className="space-y-3 mb-8">
              {(language === 'ar' ? service.featuresAr : service.featuresEn).map((feature, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: service.delay + 0.3 + i * 0.1 }}
                >
                  <div 
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${AJIL_GOLD}15` }}
                  >
                    <MiniAShape size={12} color={AJIL_GOLD} strokeWidth={2} />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button with A shape */}
            <Link 
              href={service.href}
              className="group/btn relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold overflow-hidden transition-all duration-300"
              style={{ backgroundColor: `${AJIL_BLUE}08` }}
            >
              {/* Hover fill */}
              <div 
                className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"
                style={{ backgroundColor: AJIL_GOLD }}
              />
              
              <MiniAShape size={18} color={AJIL_BLUE} strokeWidth={2} />
              <span 
                className="relative z-10 group-hover/btn:text-gray-900 transition-colors duration-300"
                style={{ color: AJIL_BLUE }}
              >
                {language === 'ar' ? 'تقدم الآن' : 'Apply Now'}
              </span>
              <ArrowIcon 
                className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-all duration-300 group-hover/btn:text-gray-900"
                style={{ color: AJIL_BLUE }}
              />
            </Link>
          </div>

          {/* Bottom A-wave accent */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 400 30" className="w-full" preserveAspectRatio="none">
              <path 
                d="M0,30 L0,25 Q100,30 200,15 Q300,30 400,25 L400,30 Z" 
                fill={`${AJIL_GOLD}10`}
                className="group-hover:fill-[#F7941D20] transition-colors duration-500"
              />
              <path 
                d="M150,25 L200,12 L250,25" 
                fill="none"
                stroke={AJIL_GOLD}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
                className="group-hover:opacity-60 transition-opacity duration-500"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FeatureCard({ 
  label, 
  Icon, 
  index, 
  isInView 
}: { 
  label: string
  Icon: IconComponent
  index: number
  isInView: boolean 
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
      whileHover={{ y: -10, scale: 1.05 }}
    >
      {/* Card */}
      <div 
        className="relative p-6 rounded-2xl overflow-hidden transition-all duration-500"
        style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0 4px 20px rgba(0,55,123,0.06)',
        }}
      >
        {/* A-shaped top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <svg viewBox="0 0 200 10" className="w-full h-full" preserveAspectRatio="none">
            <path 
              d="M0,10 L100,0 L200,10" 
              fill={AJIL_GOLD}
              opacity="0.5"
              className="group-hover:opacity-100 transition-opacity duration-300"
            />
          </svg>
        </div>

        {/* Background A */}
        <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
          <MiniAShape size={80} color={AJIL_BLUE} strokeWidth={1} />
        </div>

        {/* Icon with A frame */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <path
              d="M20 80 L50 15 L80 80 Z"
              fill={`${AJIL_BLUE}08`}
              className="group-hover:fill-[#00377B15] transition-colors duration-300"
            />
            <path
              d="M35 60 L65 60"
              fill="none"
              stroke={AJIL_GOLD}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
              className="group-hover:opacity-100 transition-opacity duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pt-2">
            <Icon 
              size={28} 
              className="transition-colors duration-300"
              style={{ color: AJIL_BLUE }}
            />
          </div>
        </div>

        {/* Label */}
        <span 
          className="block text-sm font-bold text-center transition-colors duration-300"
          style={{ color: AJIL_BLUE }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t, dir, language } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const features = [
    { labelAr: 'موافقة سريعة', labelEn: 'Quick Approval', Icon: AnimatedQuickApproval },
    { labelAr: 'أقساط مرنة', labelEn: 'Flexible Payments', Icon: AnimatedFlexiblePayments },
    { labelAr: 'متوافق مع الشريعة', labelEn: 'Sharia Compliant', Icon: AnimatedShariaCompliant },
    { labelAr: 'خدمة 24/7', labelEn: '24/7 Service', Icon: AnimatedService247 },
  ]

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)' }}
    >
      {/* Background A Shape Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large floating A shapes */}
        <motion.div 
          className="absolute -top-20 -right-20"
          animate={{ rotate: [0, 10, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <LargeAShape size={400} />
        </motion.div>
        <motion.div 
          className="absolute -bottom-20 -left-20"
          animate={{ rotate: [0, -10, 0], y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        >
          <LargeAShape size={350} />
        </motion.div>

        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_BLUE}06 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${AJIL_GOLD}06 0%, transparent 70%)` }}
        />

        {/* Floating mini A shapes */}
        {[
          { x: '10%', y: '20%', size: 40, delay: 0 },
          { x: '85%', y: '30%', size: 30, delay: 2 },
          { x: '15%', y: '70%', size: 35, delay: 4 },
          { x: '90%', y: '75%', size: 45, delay: 1 },
          { x: '50%', y: '10%', size: 25, delay: 3 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.06]"
            style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: item.delay }}
          >
            <MiniAShape size={item.size} color={i % 2 === 0 ? AJIL_BLUE : AJIL_GOLD} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge with A shape */}
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: `${AJIL_BLUE}08`, color: AJIL_BLUE }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <MiniAShape size={18} color={AJIL_GOLD} strokeWidth={2} />
            <span>{t('services.badge')}</span>
            <Sparkles className="w-4 h-4" style={{ color: AJIL_GOLD }} />
          </motion.div>

          {/* Title with A accent */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2"
              style={{ color: AJIL_BLUE }}
            >
              {t('services.title')}
            </h2>
            {/* A-shaped underline */}
            <svg 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-6"
              viewBox="0 0 200 25"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 20 L100 5 L200 20"
                fill="none"
                stroke={AJIL_GOLD}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M50 18 L100 8 L150 18"
                fill="none"
                stroke={AJIL_BLUE}
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
            </svg>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-500 leading-relaxed mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('services.description')}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.key}
              service={service}
              index={index}
              dir={dir}
              language={language}
            />
          ))}
        </div>

        {/* Features Grid */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Features header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3">
              <div className="h-[2px] w-12" style={{ backgroundColor: AJIL_GOLD }} />
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: AJIL_BLUE }}>
                {language === 'ar' ? 'مميزاتنا' : 'Our Features'}
              </span>
              <div className="h-[2px] w-12" style={{ backgroundColor: AJIL_GOLD }} />
            </div>
          </div>

          {/* Features cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                label={language === 'ar' ? feature.labelAr : feature.labelEn}
                Icon={feature.Icon}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link
            href="/calculator"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ 
              backgroundColor: AJIL_BLUE,
              boxShadow: `0 10px 30px ${AJIL_BLUE}30`
            }}
          >
            <MiniAShape size={20} color="rgba(255,255,255,0.5)" strokeWidth={2} />
            <span>{language === 'ar' ? 'احسب تمويلك الآن' : 'Calculate Your Financing'}</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
