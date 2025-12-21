'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import {
  Calculator,
  Car,
  Wallet,
  Building2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Clock,
  Shield,
} from 'lucide-react';

type FinanceType = 'auto' | 'personal' | 'business';

const financeTypes = [
  { id: 'auto' as FinanceType, icon: Car, labelAr: 'تمويل السيارات', labelEn: 'Auto' },
  { id: 'personal' as FinanceType, icon: Wallet, labelAr: 'التمويل الشخصي', labelEn: 'Personal' },
  { id: 'business' as FinanceType, icon: Building2, labelAr: 'تمويل الأعمال', labelEn: 'Business' },
];

const ratesByType: Record<FinanceType, number> = {
  auto: 2.25,
  personal: 2.75,
  business: 3.0,
};

const maxAmountByType: Record<FinanceType, number> = {
  auto: 500000,
  personal: 250000,
  business: 2000000,
};

export default function InteractiveCalculator() {
  const { language, dir } = useI18n();
  const [financeType, setFinanceType] = useState<FinanceType>('auto');
  const [amount, setAmount] = useState(200000);
  const [tenure, setTenure] = useState(48);
  const isRTL = dir === 'rtl';

  // Calculate monthly payment
  const calculateMonthlyPayment = useCallback(() => {
    const rate = ratesByType[financeType] / 100 / 12;
    const n = tenure;
    const monthlyPayment = (amount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    return Math.round(monthlyPayment);
  }, [amount, tenure, financeType]);

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * tenure;
  const totalProfit = totalPayment - amount;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-SA').format(num);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #00377B 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, #F7941D 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-[#0066B3]/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-[#F7941D]/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'lg:order-2' : ''}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00377B]/10 text-[#00377B] text-sm font-semibold mb-6">
              <Calculator className="w-4 h-4" />
              {language === 'ar' ? 'حاسبة التمويل التفاعلية' : 'Interactive Calculator'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00377B] mb-6 leading-tight">
              {language === 'ar' 
                ? 'احسب تمويلك في ثوانٍ' 
                : 'Calculate Your Finance in Seconds'}
            </h2>
            <p className="text-xl text-[#0066B3] mb-8">
              {language === 'ar'
                ? 'جرّب حاسبتنا التفاعلية واكتشف القسط الشهري المناسب لك'
                : 'Try our interactive calculator and discover the monthly payment that suits you'}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Sparkles, labelAr: 'نتائج فورية', labelEn: 'Instant Results' },
                { icon: TrendingUp, labelAr: 'أسعار تنافسية', labelEn: 'Competitive Rates' },
                { icon: Clock, labelAr: 'موافقة سريعة', labelEn: 'Quick Approval' },
                { icon: Shield, labelAr: 'متوافق مع الشريعة', labelEn: 'Sharia Compliant' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F7941D]/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#F7941D]" />
                  </div>
                  <span className="font-medium text-[#00377B] text-sm">
                    {language === 'ar' ? feature.labelAr : feature.labelEn}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link href="/calculator">
              <motion.button
                className="px-8 py-4 bg-[#00377B] text-white font-bold rounded-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ar' ? 'استخدم الحاسبة الكاملة' : 'Use Full Calculator'}
                {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </Link>
          </motion.div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'lg:order-1' : ''}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Type Selector - Gold text on active blue tabs */}
              <div className="flex gap-2 p-2 bg-gray-100 rounded-2xl mb-8">
                {financeTypes.map((type) => {
                  const Icon = type.icon;
                  const isActive = financeType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setFinanceType(type.id);
                        setAmount(Math.min(amount, maxAmountByType[type.id]));
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                        isActive
                          ? 'bg-[#00377B] text-[#F7941D] shadow-lg'
                          : 'text-[#00377B] hover:bg-white/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#F7941D]' : ''}`} />
                      <span className="hidden sm:inline">{language === 'ar' ? type.labelAr : type.labelEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Amount Slider */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="font-semibold text-[#00377B]">
                    {language === 'ar' ? 'مبلغ التمويل' : 'Finance Amount'}
                  </label>
                  <span className="text-2xl font-bold text-[#00377B]">
                    {formatNumber(amount)} <span className="text-sm font-normal">{language === 'ar' ? 'ر.س' : 'SAR'}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max={maxAmountByType[financeType]}
                  step="5000"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#F7941D]"
                  style={{
                    background: `linear-gradient(to right, #F7941D 0%, #F7941D ${(amount / maxAmountByType[financeType]) * 100}%, #e5e5e5 ${(amount / maxAmountByType[financeType]) * 100}%, #e5e5e5 100%)`,
                  }}
                />
                <div className="flex justify-between mt-1 text-xs text-[#0066B3]">
                  <span>10,000</span>
                  <span>{formatNumber(maxAmountByType[financeType])}</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="font-semibold text-[#00377B]">
                    {language === 'ar' ? 'مدة التمويل' : 'Finance Tenure'}
                  </label>
                  <span className="text-2xl font-bold text-[#00377B]">
                    {tenure} <span className="text-sm font-normal">{language === 'ar' ? 'شهر' : 'months'}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="6"
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00377B 0%, #00377B ${((tenure - 12) / 48) * 100}%, #e5e5e5 ${((tenure - 12) / 48) * 100}%, #e5e5e5 100%)`,
                  }}
                />
                <div className="flex justify-between mt-1 text-xs text-[#0066B3]">
                  <span>12</span>
                  <span>60</span>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-r from-[#00377B] to-[#0066B3] rounded-2xl p-6 text-white">
                <div className="text-center mb-6">
                  <p className="text-white/70 text-sm mb-1">
                    {language === 'ar' ? 'القسط الشهري المتوقع' : 'Expected Monthly Payment'}
                  </p>
                  <motion.p
                    key={monthlyPayment}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold"
                  >
                    {formatNumber(monthlyPayment)}
                    <span className="text-lg font-normal"> {language === 'ar' ? 'ر.س' : 'SAR'}</span>
                  </motion.p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1">
                      {language === 'ar' ? 'إجمالي المبلغ' : 'Total Amount'}
                    </p>
                    <p className="font-bold text-lg">{formatNumber(totalPayment)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1">
                      {language === 'ar' ? 'معدل النسبة السنوي' : 'APR'}
                    </p>
                    <p className="font-bold text-lg">{ratesByType[financeType]}%</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link href="/apply">
                <motion.button
                  className="w-full mt-6 py-4 bg-[#F7941D] text-white font-bold rounded-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'ar' ? 'تقدم بطلبك الآن' : 'Apply Now'}
                  {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </motion.button>
              </Link>

              {/* Disclaimer */}
              <p className="text-xs text-center text-[#0066B3]/60 mt-4">
                {language === 'ar'
                  ? '* الأرقام المعروضة تقريبية وقد تختلف عن العرض الفعلي'
                  : '* Displayed numbers are approximate and may differ from actual offer'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
