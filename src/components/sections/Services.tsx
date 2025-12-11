'use client'

import { useRef, ComponentType, SVGProps } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { 
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import {
  IconLoanProducts,
  AjilSymbol,
  AjilLogoBackground,
} from '@/components/icons'
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
import { 
  PolygonBlob, 
  DualLayerOval, 
  RoundedTriangle 
} from '@/components/decorative/Soft3DShapes'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

const services: Array<{
  key: string
  icon: IconComponent
  titleKey: string
  descKey: string
  href: string
  gradient: string
  iconBg: string
  delay: number
}> = [
  {
    key: 'car',
    icon: AnimatedCarFinancing,
    titleKey: 'services.car_title',
    descKey: 'services.car_desc',
    href: '/individuals/car-financing',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10',
    delay: 0,
  },
  {
    key: 'cash',
    icon: AnimatedPersonalFinancing,
    titleKey: 'services.cash_title',
    descKey: 'services.cash_desc',
    href: '/individuals/personal-financing',
    gradient: 'from-green-500 to-emerald-500',
    iconBg: 'bg-green-500/10',
    delay: 0.1,
  },
  {
    key: 'business',
    icon: AnimatedBusinessFinancing,
    titleKey: 'services.business_title',
    descKey: 'services.business_desc',
    href: '/business/cash-financing',
    gradient: 'from-purple-500 to-violet-500',
    iconBg: 'bg-purple-500/10',
    delay: 0.2,
  },
]

function ServiceCard({ 
  service, 
  index,
  dir,
  t
}: { 
  service: typeof services[0]
  index: number
  dir: string
  t: (key: string) => string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })
  const Icon = service.icon
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: service.delay }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 overflow-hidden h-full">
        {/* Animated Border Top */}
        <div 
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-${dir === 'rtl' ? 'right' : 'left'}`}
        />

        {/* Background Glow on Hover */}
        <div 
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}
        />

        {/* Icon */}
        <motion.div 
          className={`relative w-20 h-20 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 overflow-hidden`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <Icon size={40} className="text-primary-500 group-hover:text-white relative z-10 transition-colors duration-500" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
          {t(service.titleKey)}
        </h3>
        
        <p className="text-gray-500 leading-relaxed mb-6">
          {t(service.descKey)}
        </p>

        {/* CTA Link */}
        <Link 
          href={service.href}
          className={`inline-flex items-center gap-2 text-primary-600 font-semibold group/link hover:gap-4 transition-all duration-300`}
        >
          <span>{t('services.apply_btn')}</span>
          <ArrowIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
        </Link>

        {/* Card Number */}
        <div className={`absolute bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} text-8xl font-black text-gray-50 group-hover:text-gray-100 transition-colors duration-300 select-none`}>
          0{index + 1}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t, dir } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      
      {/* AJIL Logo Background Decorations */}
      <div className="absolute top-10 right-0 opacity-[0.02]">
        <AjilLogoBackground size={350} animated />
      </div>
      <div className="absolute bottom-10 left-0 opacity-[0.015] -rotate-12">
        <AjilLogoBackground size={300} animated />
      </div>

      {/* Soft 3D Decorative Shapes */}
      <PolygonBlob 
        className="top-[10%] left-[5%] opacity-40"
        size={180}
        delay={0.2}
      />
      <DualLayerOval 
        className="bottom-[20%] right-[3%] opacity-30"
        width={220}
        height={150}
        delay={0.5}
      />
      <RoundedTriangle 
        className="top-[40%] right-[8%] opacity-25"
        size={140}
        delay={0.8}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 bg-primary-500/10 rounded-full"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 bg-secondary-500/10 rounded-xl"
        animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-5 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <IconLoanProducts size={16} />
            <span>{t('services.badge')}</span>
            <AjilSymbol size={16} />
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('services.title')}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('services.description')}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.key}
              service={service}
              index={index}
              dir={dir}
              t={t}
            />
          ))}
        </div>

        {/* Additional Features */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { label: language === 'ar' ? 'موافقة سريعة' : 'Quick Approval', Icon: AnimatedQuickApproval, color: 'text-emerald-600 bg-emerald-50', hoverBg: 'group-hover:bg-emerald-500', animDelay: 0 },
            { label: language === 'ar' ? 'أقساط مرنة' : 'Flexible Payments', Icon: AnimatedFlexiblePayments, color: 'text-blue-600 bg-blue-50', hoverBg: 'group-hover:bg-blue-500', animDelay: 0.1 },
            { label: language === 'ar' ? 'متوافق مع الشريعة' : 'Sharia Compliant', Icon: AnimatedShariaCompliant, color: 'text-violet-600 bg-violet-50', hoverBg: 'group-hover:bg-violet-500', animDelay: 0.2 },
            { label: language === 'ar' ? 'خدمة على مدار الساعة' : '24/7 Service', Icon: AnimatedService247, color: 'text-amber-600 bg-amber-50', hoverBg: 'group-hover:bg-amber-500', animDelay: 0.3 },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color} ${feature.hoverBg} group-hover:text-white transition-all duration-300 shadow-sm`}>
                <feature.Icon size={32} delay={feature.animDelay} />
              </div>
              <span className="text-sm font-bold text-gray-700 text-center group-hover:text-gray-900 transition-colors">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const language = 'ar' // Default for server-side rendering
