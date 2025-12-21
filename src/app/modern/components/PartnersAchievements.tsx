'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import {
  Award,
  Shield,
  Building,
  Trophy,
  CheckCircle2,
  Star,
} from 'lucide-react';

const achievements = [
  {
    icon: Award,
    valueAr: 'أفضل شركة تمويل',
    valueEn: 'Best Finance Company',
    labelAr: 'جوائز الشرق الأوسط 2024',
    labelEn: 'Middle East Awards 2024',
  },
  {
    icon: Shield,
    valueAr: 'معتمدة من ساما',
    valueEn: 'SAMA Licensed',
    labelAr: 'البنك المركزي السعودي',
    labelEn: 'Saudi Central Bank',
  },
  {
    icon: Trophy,
    valueAr: 'أفضل تجربة عملاء',
    valueEn: 'Best Customer Experience',
    labelAr: 'جائزة التميز 2024',
    labelEn: 'Excellence Award 2024',
  },
];

const partners = [
  { name: 'Toyota', logo: '/partners/toyota.svg' },
  { name: 'Honda', logo: '/partners/honda.svg' },
  { name: 'Mercedes', logo: '/partners/mercedes.svg' },
  { name: 'BMW', logo: '/partners/bmw.svg' },
  { name: 'Hyundai', logo: '/partners/hyundai.svg' },
  { name: 'Nissan', logo: '/partners/nissan.svg' },
  { name: 'Kia', logo: '/partners/kia.svg' },
  { name: 'Ford', logo: '/partners/ford.svg' },
];

const certifications = [
  { nameAr: 'ISO 27001', nameEn: 'ISO 27001', descAr: 'أمن المعلومات', descEn: 'Information Security' },
  { nameAr: 'ISO 9001', nameEn: 'ISO 9001', descAr: 'إدارة الجودة', descEn: 'Quality Management' },
  { nameAr: 'PCI DSS', nameEn: 'PCI DSS', descAr: 'حماية بيانات البطاقات', descEn: 'Card Data Security' },
];

export default function PartnersAchievements() {
  const { language } = useI18n();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="#00377B"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Achievements Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7941D]/10 text-[#F7941D] text-sm font-semibold mb-4">
            <Star className="w-4 h-4" />
            {language === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00377B] mb-4">
            {language === 'ar' ? 'ثقة تتجدد' : 'Trust Renewed'}
          </h2>
          <p className="text-xl text-[#0066B3] max-w-2xl mx-auto">
            {language === 'ar'
              ? 'نفخر بالجوائز والشهادات التي حصلنا عليها تقديراً لجودة خدماتنا'
              : 'We are proud of the awards and certifications we have received in recognition of our service quality'}
          </p>
        </motion.div>

        {/* Achievements Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7941D] to-[#E5850A] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:shadow-2xl transition-shadow text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#00377B] to-[#0066B3] rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <achievement.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-[#00377B] mb-2">
                  {language === 'ar' ? achievement.valueAr : achievement.valueEn}
                </h3>
                <p className="text-[#0066B3]">
                  {language === 'ar' ? achievement.labelAr : achievement.labelEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 px-6 py-4 bg-[#00377B]/5 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <div className="font-bold text-[#00377B]">
                  {language === 'ar' ? cert.nameAr : cert.nameEn}
                </div>
                <div className="text-sm text-[#0066B3]">
                  {language === 'ar' ? cert.descAr : cert.descEn}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-4">
            <Building className="w-4 h-4" />
            {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#00377B] mb-4">
            {language === 'ar' ? 'شراكات استراتيجية' : 'Strategic Partnerships'}
          </h2>
        </motion.div>

        {/* Partner Logos - Infinite Scroll */}
        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
          {/* Scrolling Container */}
          <motion.div
            className="flex gap-12"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Duplicate partners for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center w-32 h-20 bg-gray-50 rounded-xl px-6 shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-2xl font-bold text-gray-400">{partner.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust Banner */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-[#00377B] to-[#0066B3] rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '17+', labelAr: 'سنة من الخبرة', labelEn: 'Years Experience' },
              { value: '100K+', labelAr: 'عميل راضٍ', labelEn: 'Happy Clients' },
              { value: '2B+', labelAr: 'ريال تمويل', labelEn: 'SAR Financed' },
              { value: '50+', labelAr: 'فرع في المملكة', labelEn: 'Branches' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="text-5xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/70">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
