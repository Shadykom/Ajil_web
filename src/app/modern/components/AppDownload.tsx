'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import {
  Smartphone,
  QrCode,
  Check,
  Bell,
  Calculator,
  FileText,
  MapPin,
  CreditCard,
} from 'lucide-react';

const features = [
  { icon: Calculator, labelAr: 'حاسبة التمويل', labelEn: 'Loan Calculator' },
  { icon: FileText, labelAr: 'تقديم الطلبات', labelEn: 'Submit Applications' },
  { icon: MapPin, labelAr: 'مواقع الفروع', labelEn: 'Branch Locations' },
  { icon: Bell, labelAr: 'إشعارات فورية', labelEn: 'Instant Notifications' },
  { icon: CreditCard, labelAr: 'إدارة الحساب', labelEn: 'Account Management' },
  { icon: Check, labelAr: 'متابعة الطلبات', labelEn: 'Track Applications' },
];

export default function AppDownload() {
  const { language, dir } = useI18n();
  const isRTL = dir === 'rtl';

  return (
    <section className="py-24 bg-gradient-to-br from-[#00377B] to-[#001D40] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px),
                              linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#0066B3] rounded-full opacity-20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#F7941D] rounded-full opacity-10 blur-[80px]" />
        
        {/* Floating A Shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              width: 60 + i * 20,
              height: 60 + i * 20,
            }}
            viewBox="0 0 100 100"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <path
              d="M20 80 L50 20 L80 80 M32 55 L68 55"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'lg:order-2' : ''}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F7941D] text-sm font-semibold mb-6">
              <Smartphone className="w-4 h-4" />
              {language === 'ar' ? 'تطبيق أجل' : 'AJIL App'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {language === 'ar' 
                ? 'خدماتنا في جيبك' 
                : 'Our Services in Your Pocket'}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {language === 'ar'
                ? 'حمّل تطبيق أجل واستمتع بتجربة تمويل سهلة وسريعة من أي مكان'
                : 'Download the AJIL app and enjoy an easy, fast financing experience from anywhere'}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <feature.icon className="w-5 h-5 text-[#F7941D]" />
                  <span className="text-white text-sm font-medium">
                    {language === 'ar' ? feature.labelAr : feature.labelEn}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* App Store */}
              <motion.a
                href="#"
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00377B">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className={`text-${isRTL ? 'right' : 'left'}`}>
                  <div className="text-xs text-gray-500">{language === 'ar' ? 'حمّل من' : 'Download on'}</div>
                  <div className="font-bold text-[#00377B]">App Store</div>
                </div>
              </motion.a>

              {/* Google Play */}
              <motion.a
                href="#"
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00377B">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className={`text-${isRTL ? 'right' : 'left'}`}>
                  <div className="text-xs text-gray-500">{language === 'ar' ? 'احصل عليه من' : 'Get it on'}</div>
                  <div className="font-bold text-[#00377B]">Google Play</div>
                </div>
              </motion.a>

              {/* QR Code */}
              <motion.div
                className="hidden md:flex items-center gap-3 px-6 py-3 bg-white/10 rounded-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <QrCode className="w-12 h-12 text-white" />
                <div className={`text-${isRTL ? 'right' : 'left'}`}>
                  <div className="text-sm text-white/70">{language === 'ar' ? 'امسح للتحميل' : 'Scan to Download'}</div>
                  <div className="font-bold text-white text-sm">{language === 'ar' ? 'رمز QR' : 'QR Code'}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative ${isRTL ? 'lg:order-1' : ''}`}
          >
            <div className="relative mx-auto max-w-[300px]">
              {/* Phone Frame */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Phone Body */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl">
                  {/* Screen */}
                  <div className="relative bg-gradient-to-br from-[#00377B] to-[#001D40] rounded-[2.5rem] overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
                    
                    {/* Screen Content */}
                    <div className="aspect-[9/19] p-4 pt-10">
                      {/* App Header */}
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-3">
                          <svg width="40" height="40" viewBox="0 0 100 100">
                            <defs>
                              <linearGradient id="appLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0066B3" />
                                <stop offset="100%" stopColor="#00377B" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M20 80 L50 20 L80 80"
                              fill="none"
                              stroke="url(#appLogoGrad)"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M32 55 L68 55"
                              fill="none"
                              stroke="#F7941D"
                              strokeWidth="6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg">
                          {language === 'ar' ? 'أهلاً بك' : 'Welcome'}
                        </h3>
                        <p className="text-white/60 text-xs">
                          {language === 'ar' ? 'أجل للتمويل' : 'AJIL Finance'}
                        </p>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { icon: Calculator, labelAr: 'حاسبة', labelEn: 'Calc' },
                          { icon: FileText, labelAr: 'طلب', labelEn: 'Apply' },
                          { icon: MapPin, labelAr: 'فروع', labelEn: 'Branch' },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="p-3 bg-white/10 rounded-xl text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <item.icon className="w-5 h-5 text-[#F7941D] mx-auto mb-1" />
                            <span className="text-white text-[10px]">
                              {language === 'ar' ? item.labelAr : item.labelEn}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Sample Card */}
                      <motion.div
                        className="bg-gradient-to-r from-[#F7941D] to-[#E5850A] rounded-xl p-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-white/80 text-[10px]">
                              {language === 'ar' ? 'القسط الشهري' : 'Monthly'}
                            </p>
                            <p className="text-white font-bold text-lg">2,450 SAR</p>
                          </div>
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-white rounded-full" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#F7941D]/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#0066B3]/30 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
