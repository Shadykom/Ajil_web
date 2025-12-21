'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Car,
  Building2,
  Truck,
  DollarSign,
  Calendar,
  Percent,
  FileText,
  Download,
  Share2,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Info,
} from 'lucide-react';
import { cn, formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/design-system/components/atoms/Button/Button';
import Input from '@/design-system/components/atoms/Input/Input';
import { Slider } from '@/design-system/components/atoms/Slider/Slider';
import { Badge } from '@/design-system/components/atoms/Badge/Badge';
import {
  DisclosureBlock,
  SAMADisclosure,
  ShariahDisclosure,
  APRDisclosure,
} from '@/design-system/components/organisms/DisclosureBlock/DisclosureBlock';

// Calculator Types
export type CalculatorType = 'murabaha' | 'auto_lease' | 'sme_fleet' | 'personal' | 'equipment';

// Calculator Configuration (would come from CMS/database in production)
export interface CalculatorConfig {
  id: string;
  type: CalculatorType;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  minAmount: number;
  maxAmount: number;
  minTenure: number; // months
  maxTenure: number; // months
  tenureStep: number;
  baseRate: number; // APR
  adminFeeRate: number; // percentage of principal
  insuranceRate?: number; // percentage of principal
  minDownPayment?: number; // percentage
  maxDownPayment?: number; // percentage
  eligibility?: {
    minIncome: number;
    minAge: number;
    maxAge: number;
    employmentTypes: string[];
  };
}

// Default calculator configurations
const defaultConfigs: Record<CalculatorType, CalculatorConfig> = {
  murabaha: {
    id: 'murabaha_personal',
    type: 'murabaha',
    name: 'Personal Murabaha',
    nameAr: 'مرابحة شخصية',
    description: 'Shariah-compliant personal financing',
    descriptionAr: 'تمويل شخصي متوافق مع الشريعة الإسلامية',
    minAmount: 5000,
    maxAmount: 500000,
    minTenure: 12,
    maxTenure: 60,
    tenureStep: 6,
    baseRate: 15.99,
    adminFeeRate: 1,
    eligibility: {
      minIncome: 4000,
      minAge: 21,
      maxAge: 60,
      employmentTypes: ['government', 'private', 'self_employed'],
    },
  },
  auto_lease: {
    id: 'auto_lease',
    type: 'auto_lease',
    name: 'Auto Lease',
    nameAr: 'تأجير السيارات',
    description: 'Vehicle leasing with ownership option',
    descriptionAr: 'تأجير المركبات مع خيار التملك',
    minAmount: 30000,
    maxAmount: 800000,
    minTenure: 12,
    maxTenure: 60,
    tenureStep: 12,
    baseRate: 12.99,
    adminFeeRate: 1.5,
    insuranceRate: 2.5,
    minDownPayment: 10,
    maxDownPayment: 50,
    eligibility: {
      minIncome: 5000,
      minAge: 21,
      maxAge: 65,
      employmentTypes: ['government', 'private'],
    },
  },
  sme_fleet: {
    id: 'sme_fleet',
    type: 'sme_fleet',
    name: 'SME Fleet Financing',
    nameAr: 'تمويل أسطول الشركات',
    description: 'Fleet financing for small and medium enterprises',
    descriptionAr: 'تمويل الأساطيل للمنشآت الصغيرة والمتوسطة',
    minAmount: 100000,
    maxAmount: 5000000,
    minTenure: 24,
    maxTenure: 84,
    tenureStep: 12,
    baseRate: 11.5,
    adminFeeRate: 0.75,
    insuranceRate: 2,
    minDownPayment: 15,
    maxDownPayment: 40,
    eligibility: {
      minIncome: 50000, // Monthly revenue
      minAge: 1, // Company age in years
      maxAge: 50,
      employmentTypes: ['company'],
    },
  },
  personal: {
    id: 'personal_cash',
    type: 'personal',
    name: 'Personal Cash Financing',
    nameAr: 'التمويل النقدي الشخصي',
    minAmount: 5000,
    maxAmount: 250000,
    minTenure: 12,
    maxTenure: 48,
    tenureStep: 6,
    baseRate: 18.99,
    adminFeeRate: 1,
    eligibility: {
      minIncome: 4000,
      minAge: 21,
      maxAge: 55,
      employmentTypes: ['government', 'private'],
    },
  },
  equipment: {
    id: 'heavy_equipment',
    type: 'equipment',
    name: 'Heavy Equipment Financing',
    nameAr: 'تمويل المعدات الثقيلة',
    minAmount: 200000,
    maxAmount: 10000000,
    minTenure: 24,
    maxTenure: 84,
    tenureStep: 12,
    baseRate: 10.5,
    adminFeeRate: 0.5,
    minDownPayment: 20,
    maxDownPayment: 50,
    eligibility: {
      minIncome: 100000,
      minAge: 2,
      maxAge: 50,
      employmentTypes: ['company'],
    },
  },
};

// Calculation result interface
export interface CalculationResult {
  monthlyPayment: number;
  totalAmount: number;
  totalProfit: number;
  adminFee: number;
  insuranceFee: number;
  apr: number;
  downPayment: number;
  financedAmount: number;
  schedule: PaymentScheduleItem[];
}

export interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  profit: number;
  balance: number;
}

// Calculator Props
export interface LoanCalculatorProps {
  /** Calculator type */
  type?: CalculatorType;
  /** Custom configuration */
  config?: Partial<CalculatorConfig>;
  /** On calculation complete */
  onCalculate?: (result: CalculationResult, inputs: CalculatorInputs) => void;
  /** Show apply button */
  showApplyButton?: boolean;
  /** Apply button URL */
  applyUrl?: string;
  /** Show payment schedule */
  showSchedule?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Custom class name */
  className?: string;
}

interface CalculatorInputs {
  amount: number;
  tenure: number;
  downPayment: number;
}

// Type icons
const typeIcons: Record<CalculatorType, React.ReactNode> = {
  murabaha: <DollarSign className="w-6 h-6" />,
  auto_lease: <Car className="w-6 h-6" />,
  sme_fleet: <Truck className="w-6 h-6" />,
  personal: <DollarSign className="w-6 h-6" />,
  equipment: <Building2 className="w-6 h-6" />,
};

export function LoanCalculator({
  type = 'murabaha',
  config: customConfig,
  onCalculate,
  showApplyButton = true,
  applyUrl = '/apply',
  showSchedule = true,
  compact = false,
  className,
}: LoanCalculatorProps) {
  const { language, dir } = useI18n();
  const isRtl = dir === 'rtl';

  // Merge default and custom config
  const config = useMemo(() => ({
    ...defaultConfigs[type],
    ...customConfig,
  }), [type, customConfig]);

  // State
  const [amount, setAmount] = useState(config.minAmount + (config.maxAmount - config.minAmount) / 2);
  const [tenure, setTenure] = useState(config.minTenure);
  const [downPaymentPercent, setDownPaymentPercent] = useState(config.minDownPayment || 0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Calculate financing
  const calculate = useCallback((): CalculationResult => {
    const downPaymentAmount = (amount * downPaymentPercent) / 100;
    const financedAmount = amount - downPaymentAmount;
    const adminFee = (financedAmount * config.adminFeeRate) / 100;
    const insuranceFee = config.insuranceRate ? (financedAmount * config.insuranceRate) / 100 : 0;
    
    // Calculate monthly rate (APR / 12)
    const monthlyRate = config.baseRate / 100 / 12;
    
    // Calculate monthly payment using annuity formula
    const monthlyPayment = financedAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
      (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const totalAmount = monthlyPayment * tenure + adminFee + insuranceFee + downPaymentAmount;
    const totalProfit = totalAmount - amount;
    
    // Generate payment schedule
    const schedule: PaymentScheduleItem[] = [];
    let balance = financedAmount;
    
    for (let month = 1; month <= tenure; month++) {
      const profitPortion = balance * monthlyRate;
      const principalPortion = monthlyPayment - profitPortion;
      balance -= principalPortion;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPortion,
        profit: profitPortion,
        balance: Math.max(0, balance),
      });
    }
    
    return {
      monthlyPayment,
      totalAmount,
      totalProfit,
      adminFee,
      insuranceFee,
      apr: config.baseRate,
      downPayment: downPaymentAmount,
      financedAmount,
      schedule,
    };
  }, [amount, tenure, downPaymentPercent, config]);

  // Update calculation when inputs change
  useEffect(() => {
    const newResult = calculate();
    setResult(newResult);
    onCalculate?.(newResult, { amount, tenure, downPayment: downPaymentPercent });
  }, [amount, tenure, downPaymentPercent, calculate, onCalculate]);

  // Format value helpers
  const locale = language === 'ar' ? 'ar-SA' : 'en-SA';

  const displayName = language === 'ar' ? config.nameAr : config.name;
  const displayDescription = language === 'ar' ? config.descriptionAr : config.description;

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
          {typeIcons[type]}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-100">
            {displayName}
          </h2>
          {displayDescription && (
            <p className="text-sm text-primary-500 dark:text-primary-400">
              {displayDescription}
            </p>
          )}
        </div>
      </div>

      <div className={cn(
        'grid gap-8',
        compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
      )}>
        {/* Input Panel */}
        <div className="space-y-6">
          {/* Amount Slider */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
            <div className="flex items-center justify-between mb-4">
              <label className="font-semibold text-primary-700 dark:text-primary-300">
                {language === 'ar' ? 'مبلغ التمويل' : 'Financing Amount'}
              </label>
              <Badge color="primary" variant="soft">
                {formatCurrency(amount, locale)}
              </Badge>
            </div>
            
            <Slider
              value={amount}
              onChange={setAmount}
              min={config.minAmount}
              max={config.maxAmount}
              step={1000}
              showValue={false}
              formatMinMax={(v) => formatCurrency(v, locale)}
              showMinMax
              color="primary"
              dir={dir}
            />
          </div>

          {/* Tenure Slider */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
            <div className="flex items-center justify-between mb-4">
              <label className="font-semibold text-primary-700 dark:text-primary-300">
                {language === 'ar' ? 'مدة التمويل' : 'Financing Tenure'}
              </label>
              <Badge color="primary" variant="soft">
                {tenure} {language === 'ar' ? 'شهر' : 'months'}
              </Badge>
            </div>
            
            <Slider
              value={tenure}
              onChange={setTenure}
              min={config.minTenure}
              max={config.maxTenure}
              step={config.tenureStep}
              showValue={false}
              formatMinMax={(v) => `${v} ${language === 'ar' ? 'شهر' : 'mo'}`}
              showMinMax
              color="primary"
              dir={dir}
            />
          </div>

          {/* Down Payment (if applicable) */}
          {config.minDownPayment !== undefined && (
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
              <div className="flex items-center justify-between mb-4">
                <label className="font-semibold text-primary-700 dark:text-primary-300">
                  {language === 'ar' ? 'الدفعة الأولى' : 'Down Payment'}
                </label>
                <Badge color="secondary" variant="soft">
                  {downPaymentPercent}% ({formatCurrency((amount * downPaymentPercent) / 100, locale)})
                </Badge>
              </div>
              
              <Slider
                value={downPaymentPercent}
                onChange={setDownPaymentPercent}
                min={config.minDownPayment || 0}
                max={config.maxDownPayment || 50}
                step={5}
                showValue={false}
                formatMinMax={(v) => `${v}%`}
                showMinMax
                color="secondary"
                dir={dir}
              />
            </div>
          )}
        </div>

        {/* Result Panel */}
        <div className="space-y-6">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl p-6 shadow-xl"
            >
              {/* Monthly Payment */}
              <div className="text-center mb-6">
                <p className="text-sm opacity-80 mb-1">
                  {language === 'ar' ? 'القسط الشهري' : 'Monthly Payment'}
                </p>
                <p className="text-4xl md:text-5xl font-bold">
                  {formatCurrency(result.monthlyPayment, locale)}
                </p>
                <p className="text-sm opacity-80 mt-1">
                  {language === 'ar' ? `لمدة ${tenure} شهر` : `for ${tenure} months`}
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs opacity-70">
                    {language === 'ar' ? 'إجمالي المبلغ' : 'Total Amount'}
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(result.totalAmount, locale)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs opacity-70">
                    {language === 'ar' ? 'تكلفة التمويل' : 'Financing Cost'}
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(result.totalProfit, locale)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs opacity-70">
                    {language === 'ar' ? 'المبلغ الممول' : 'Financed Amount'}
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(result.financedAmount, locale)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs opacity-70">
                    {language === 'ar' ? 'معدل النسبة السنوي' : 'APR'}
                  </p>
                  <p className="text-lg font-bold">{result.apr}%</p>
                </div>
              </div>

              {/* Fees breakdown */}
              {(result.adminFee > 0 || result.insuranceFee > 0) && (
                <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                  <div className="flex justify-between opacity-80">
                    <span>{language === 'ar' ? 'الرسوم الإدارية' : 'Admin Fee'}</span>
                    <span>{formatCurrency(result.adminFee, locale)}</span>
                  </div>
                  {result.insuranceFee > 0 && (
                    <div className="flex justify-between opacity-80 mt-1">
                      <span>{language === 'ar' ? 'رسوم التأمين' : 'Insurance'}</span>
                      <span>{formatCurrency(result.insuranceFee, locale)}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {showApplyButton && (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                onClick={() => window.location.href = applyUrl}
              >
                {language === 'ar' ? 'قدم طلبك الآن' : 'Apply Now'}
              </Button>
            )}
            
            {showSchedule && (
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FileText className="w-5 h-5" />}
                onClick={() => setShowScheduleModal(true)}
              >
                {language === 'ar' ? 'جدول السداد' : 'Schedule'}
              </Button>
            )}
          </div>

          {/* Disclosures */}
          <div className="space-y-3">
            {result && (
              <APRDisclosure
                apr={result.apr}
                adminFee={result.adminFee}
                insuranceFee={result.insuranceFee}
                totalCost={result.totalAmount}
              />
            )}
            <ShariahDisclosure />
            <SAMADisclosure />
          </div>
        </div>
      </div>

      {/* Payment Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && result && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowScheduleModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-bold">
                  {language === 'ar' ? 'جدول السداد' : 'Payment Schedule'}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowScheduleModal(false)}>
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 dark:bg-neutral-800 sticky top-0">
                    <tr>
                      <th className="p-3 text-start font-medium">
                        {language === 'ar' ? 'الشهر' : 'Month'}
                      </th>
                      <th className="p-3 text-start font-medium">
                        {language === 'ar' ? 'القسط' : 'Payment'}
                      </th>
                      <th className="p-3 text-start font-medium">
                        {language === 'ar' ? 'الأصل' : 'Principal'}
                      </th>
                      <th className="p-3 text-start font-medium">
                        {language === 'ar' ? 'الربح' : 'Profit'}
                      </th>
                      <th className="p-3 text-start font-medium">
                        {language === 'ar' ? 'الرصيد' : 'Balance'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {result.schedule.map((item) => (
                      <tr key={item.month} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <td className="p-3">{item.month}</td>
                        <td className="p-3">{formatCurrency(item.payment, locale)}</td>
                        <td className="p-3">{formatCurrency(item.principal, locale)}</td>
                        <td className="p-3">{formatCurrency(item.profit, locale)}</td>
                        <td className="p-3">{formatCurrency(item.balance, locale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-3">
                <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                  {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
                </Button>
                <Button variant="outline" leftIcon={<Share2 className="w-4 h-4" />}>
                  {language === 'ar' ? 'مشاركة' : 'Share'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoanCalculator;
