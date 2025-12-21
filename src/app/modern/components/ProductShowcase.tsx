'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import {
  Car,
  Wallet,
  Building2,
  Truck,
  ArrowRight,
  ArrowLeft,
  Check,
  Calculator,
  Clock,
  Shield,
  Percent,
} from 'lucide-react';
import {
  AnimatedCarFinancing,
  AnimatedPersonalFinancing,
  AnimatedBusinessFinancing,
  IconCarFinancing,
  IconPersonalFinancing,
  IconBusinessFinancing,
} from '@/components/icons';

interface Product {
  id: string;
  icon: typeof Car;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  image: string;
  video?: string;
  color: string;
  gradient: string;
  href: string;
  rateFrom: string;
  maxAmount: string;
  maxTenure: string;
}

const products: Product[] = [
  {
    id: 'auto',
    icon: Car,
    titleAr: 'تمويل السيارات',
    titleEn: 'Auto Financing',
    descriptionAr: 'احصل على سيارة أحلامك بأقساط مريحة ومرنة تناسب ميزانيتك',
    descriptionEn: 'Get your dream car with comfortable, flexible installments that fit your budget',
    featuresAr: ['موافقة سريعة خلال 24 ساعة', 'تأمين شامل مجاني', 'خدمة التوصيل للمنزل'],
    featuresEn: ['Quick approval within 24 hours', 'Free comprehensive insurance', 'Home delivery service'],
    // Real luxury car - Toyota Land Cruiser / Premium sedan popular in Saudi
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80',
    video: 'https://cdn.coverr.co/videos/coverr-driving-through-city-at-night-4405/1080p.mp4',
    color: '#0066B3',
    gradient: 'from-[#0066B3] to-[#00377B]',
    href: '/individuals/car-financing',
    rateFrom: '2.25%',
    maxAmount: '500,000',
    maxTenure: '60',
  },
  {
    id: 'personal',
    icon: Wallet,
    titleAr: 'التمويل الشخصي',
    titleEn: 'Personal Finance',
    descriptionAr: 'حقق أهدافك المالية مع تمويل شخصي سريع وبدون ضمانات',
    descriptionEn: 'Achieve your financial goals with quick personal financing without guarantees',
    featuresAr: ['بدون كفيل أو ضمانات', 'صرف فوري للمبلغ', 'أقساط ثابتة طوال المدة'],
    featuresEn: ['No guarantor or collateral', 'Instant disbursement', 'Fixed installments throughout'],
    // Saudi professional/family lifestyle
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80',
    color: '#F7941D',
    gradient: 'from-[#F7941D] to-[#E5850A]',
    href: '/individuals/personal-financing',
    rateFrom: '2.75%',
    maxAmount: '250,000',
    maxTenure: '60',
  },
  {
    id: 'business',
    icon: Building2,
    titleAr: 'تمويل الأعمال',
    titleEn: 'Business Finance',
    descriptionAr: 'نمِّ أعمالك مع حلول تمويلية مصممة خصيصاً لاحتياجاتك',
    descriptionEn: 'Grow your business with financing solutions designed specifically for your needs',
    featuresAr: ['حلول مخصصة للشركات', 'فترات سداد مرنة', 'دعم متخصص للأعمال'],
    featuresEn: ['Custom solutions for companies', 'Flexible repayment periods', 'Dedicated business support'],
    // Modern Saudi business district - Riyadh style
    image: 'https://images.unsplash.com/photo-1565623006220-9f9e61fa4e3f?w=1200&q=80',
    color: '#00377B',
    gradient: 'from-[#00377B] to-[#001D40]',
    href: '/business/cash-financing',
    rateFrom: '3.00%',
    maxAmount: '2,000,000',
    maxTenure: '84',
  },
  {
    id: 'equipment',
    icon: Truck,
    titleAr: 'تمويل المعدات',
    titleEn: 'Equipment Financing',
    descriptionAr: 'احصل على المعدات الثقيلة التي تحتاجها لتوسيع أعمالك',
    descriptionEn: 'Get the heavy equipment you need to expand your business',
    featuresAr: ['تمويل جميع أنواع المعدات', 'شروط ميسرة', 'تأمين شامل على المعدات'],
    featuresEn: ['Finance all types of equipment', 'Easy terms', 'Comprehensive equipment insurance'],
    // Heavy equipment / construction
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    color: '#4DA3E0',
    gradient: 'from-[#4DA3E0] to-[#0066B3]',
    href: '/business/heavy-equipment',
    rateFrom: '3.25%',
    maxAmount: '5,000,000',
    maxTenure: '84',
  },
];

export default function ProductShowcase() {
  const { language, dir } = useI18n();
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const isRTL = dir === 'rtl';

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00377B" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            {language === 'ar' ? 'منتجاتنا المميزة' : 'Our Premium Products'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#00377B] mb-4">
            {language === 'ar' ? 'حلول تمويلية متكاملة' : 'Complete Financing Solutions'}
          </h2>
          <p className="text-xl text-[#0066B3] max-w-2xl mx-auto">
            {language === 'ar'
              ? 'اكتشف مجموعة واسعة من الحلول التمويلية المتوافقة مع الشريعة الإسلامية'
              : 'Discover a wide range of Sharia-compliant financing solutions'}
          </p>
        </motion.div>

        {/* Product Tabs - Gold text on active (blue) tabs for visibility */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-2 rounded-2xl">
            {products.map((product) => {
              const Icon = product.icon;
              const isActive = activeProduct.id === product.id;
              return (
                <motion.button
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  className={`relative px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors ${
                    isActive ? 'text-[#F7941D]' : 'text-[#00377B] hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${product.gradient}`}
                      layoutId="activeProductTab"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[#F7941D]' : ''}`} />
                  <span className="relative z-10 hidden sm:inline">
                    {language === 'ar' ? product.titleAr : product.titleEn}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Product Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image/Video Side */}
            <div className={`relative ${isRTL ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                {activeProduct.video ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={activeProduct.video} type="video/mp4" />
                    <Image
                      src={activeProduct.image}
                      alt={language === 'ar' ? activeProduct.titleAr : activeProduct.titleEn}
                      fill
                      className="object-cover"
                    />
                  </video>
                ) : (
                  <Image
                    src={activeProduct.image}
                    alt={language === 'ar' ? activeProduct.titleAr : activeProduct.titleEn}
                    fill
                    className="object-cover"
                  />
                )}
                
                {/* Overlay Gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t ${activeProduct.gradient} opacity-60`}
                />

                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                  <motion.div
                    className="flex-1 bg-white/95 backdrop-blur-md rounded-xl p-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Percent className="w-5 h-5 text-[#F7941D] mb-1" />
                    <div className="text-2xl font-bold text-[#00377B]">{activeProduct.rateFrom}</div>
                    <div className="text-xs text-[#0066B3]">
                      {language === 'ar' ? 'معدل النسبة السنوي من' : 'APR from'}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex-1 bg-white/95 backdrop-blur-md rounded-xl p-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Clock className="w-5 h-5 text-[#F7941D] mb-1" />
                    <div className="text-2xl font-bold text-[#00377B]">{activeProduct.maxTenure}</div>
                    <div className="text-xs text-[#0066B3]">
                      {language === 'ar' ? 'شهراً كحد أقصى' : 'months max'}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div 
                className="absolute -top-6 -right-6 w-32 h-32 rounded-3xl -z-10"
                style={{ backgroundColor: activeProduct.color, opacity: 0.1 }}
              />
              <div 
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full -z-10"
                style={{ backgroundColor: '#F7941D', opacity: 0.2 }}
              />
            </div>

            {/* Content Side */}
            <div className={isRTL ? 'lg:order-1' : ''}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F7941D]/10 to-[#F7941D]/20 text-[#F7941D] text-sm font-semibold mb-4">
                <activeProduct.icon className="w-4 h-4" />
                {language === 'ar' ? 'حتى' : 'Up to'} {activeProduct.maxAmount} {language === 'ar' ? 'ر.س' : 'SAR'}
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-[#00377B] mb-4">
                {language === 'ar' ? activeProduct.titleAr : activeProduct.titleEn}
              </h3>

              <p className="text-lg text-[#0066B3] mb-8">
                {language === 'ar' ? activeProduct.descriptionAr : activeProduct.descriptionEn}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {(language === 'ar' ? activeProduct.featuresAr : activeProduct.featuresEn).map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: activeProduct.color }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#00377B] font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href={activeProduct.href}>
                  <motion.button
                    className={`px-8 py-4 bg-gradient-to-r ${activeProduct.gradient} text-white font-bold rounded-xl flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {language === 'ar' ? 'تقدم بطلبك' : 'Apply Now'}
                    {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </motion.button>
                </Link>
                <Link href="/calculator">
                  <motion.button
                    className="px-8 py-4 border-2 border-[#00377B] text-[#00377B] font-semibold rounded-xl flex items-center gap-2 hover:bg-[#00377B]/5 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calculator className="w-5 h-5" />
                    {language === 'ar' ? 'احسب قسطك' : 'Calculate'}
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
