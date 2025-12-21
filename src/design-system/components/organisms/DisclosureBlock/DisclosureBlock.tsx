'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, Info, FileText, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

export type DisclosureType = 'info' | 'warning' | 'legal' | 'shariah' | 'sama';

export interface DisclosureBlockProps {
  /** Disclosure type */
  type?: DisclosureType;
  /** Title */
  title: string;
  /** Arabic title */
  titleAr?: string;
  /** Content (can be string or ReactNode for rich content) */
  content: React.ReactNode;
  /** Whether expandable */
  expandable?: boolean;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Show regulatory badge (e.g., "SAMA Regulated") */
  regulatoryBadge?: string;
  /** Arabic regulatory badge */
  regulatoryBadgeAr?: string;
  /** Custom class name */
  className?: string;
}

const typeStyles: Record<DisclosureType, { bg: string; border: string; icon: React.ReactNode; iconBg: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    icon: <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
  },
  legal: {
    bg: 'bg-neutral-50 dark:bg-neutral-900',
    border: 'border-neutral-200 dark:border-neutral-700',
    icon: <FileText className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />,
    iconBg: 'bg-neutral-100 dark:bg-neutral-800',
  },
  shariah: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    icon: (
      <svg className="w-5 h-5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 4.84 10.74 10 12 5.16-1.26 10-6.45 10-12V7l-10-5zm0 4l6.5 3.25V17c0 3.68-2.78 7.09-6.5 8.14V6z" />
      </svg>
    ),
    iconBg: 'bg-green-100 dark:bg-green-900/50',
  },
  sama: {
    bg: 'bg-primary-50 dark:bg-primary-950/30',
    border: 'border-primary-200 dark:border-primary-800',
    icon: <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />,
    iconBg: 'bg-primary-100 dark:bg-primary-900/50',
  },
};

export function DisclosureBlock({
  type = 'info',
  title,
  titleAr,
  content,
  expandable = true,
  defaultExpanded = false,
  icon,
  regulatoryBadge,
  regulatoryBadgeAr,
  className,
}: DisclosureBlockProps) {
  const { language } = useI18n();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const displayTitle = language === 'ar' && titleAr ? titleAr : title;
  const displayBadge = language === 'ar' && regulatoryBadgeAr ? regulatoryBadgeAr : regulatoryBadge;
  const styles = typeStyles[type];

  return (
    <div
      className={cn(
        'rounded-xl border overflow-hidden',
        styles.bg,
        styles.border,
        className
      )}
    >
      {/* Header */}
      <button
        type="button"
        className={cn(
          'w-full flex items-center gap-3 p-4 text-left rtl:text-right',
          expandable && 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors'
        )}
        onClick={() => expandable && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        disabled={!expandable}
      >
        {/* Icon */}
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', styles.iconBg)}>
          {icon || styles.icon}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-primary-800 dark:text-primary-100">
            {displayTitle}
          </h4>
          {displayBadge && (
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
              {displayBadge}
            </span>
          )}
        </div>

        {/* Expand icon */}
        {expandable && (
          <ChevronDown
            className={cn(
              'w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        )}
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {(!expandable || isExpanded) && (
          <motion.div
            initial={expandable ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div className="text-sm text-primary-600 dark:text-primary-400 leading-relaxed">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SAMA Disclosure specifically for financing products
export function SAMADisclosure() {
  const { language } = useI18n();

  return (
    <DisclosureBlock
      type="sama"
      title="SAMA Regulatory Disclosure"
      titleAr="إفصاح تنظيمي من البنك المركزي السعودي"
      regulatoryBadge="SAMA Regulated"
      regulatoryBadgeAr="مرخصة من ساما"
      defaultExpanded={false}
      content={
        language === 'ar' ? (
          <div className="space-y-3">
            <p>
              شركة أجل للتمويل مرخصة ومنظمة من قبل البنك المركزي السعودي (ساما).
              جميع منتجاتنا التمويلية متوافقة مع أحكام الشريعة الإسلامية ومعتمدة
              من هيئتنا الشرعية.
            </p>
            <p>
              <strong>تحذير مهم:</strong> قد يؤدي التأخر في السداد إلى فرض رسوم
              إضافية وتأثير سلبي على تصنيفك الائتماني لدى سمة.
            </p>
            <p className="text-xs text-neutral-500">
              رقم الترخيص: [XX/XXXX] | تاريخ الترخيص: XX/XX/XXXX
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p>
              AJIL Finance Company is licensed and regulated by the Saudi Central
              Bank (SAMA). All our financing products are Shariah-compliant and
              approved by our Shariah Board.
            </p>
            <p>
              <strong>Important Warning:</strong> Late payments may result in
              additional fees and negatively impact your credit score with SIMAH.
            </p>
            <p className="text-xs text-neutral-500">
              License No: [XX/XXXX] | License Date: XX/XX/XXXX
            </p>
          </div>
        )
      }
    />
  );
}

// Shariah Compliance Disclosure
export function ShariahDisclosure() {
  const { language } = useI18n();

  return (
    <DisclosureBlock
      type="shariah"
      title="Shariah Compliance Statement"
      titleAr="بيان التوافق مع الشريعة الإسلامية"
      defaultExpanded={false}
      content={
        language === 'ar' ? (
          <p>
            تم اعتماد هذا المنتج التمويلي من قبل الهيئة الشرعية لشركة أجل
            للتمويل وهو متوافق مع أحكام ومبادئ الشريعة الإسلامية. يعتمد المنتج
            على عقد المرابحة الإسلامي.
          </p>
        ) : (
          <p>
            This financing product has been approved by AJIL Finance's Shariah
            Board and complies with the principles and provisions of Islamic
            Shariah. The product is based on the Islamic Murabaha contract.
          </p>
        )
      }
    />
  );
}

// APR Disclosure (required by SAMA)
export interface APRDisclosureProps {
  apr: number;
  adminFee?: number;
  insuranceFee?: number;
  totalCost?: number;
}

export function APRDisclosure({ apr, adminFee, insuranceFee, totalCost }: APRDisclosureProps) {
  const { language } = useI18n();

  return (
    <DisclosureBlock
      type="warning"
      title="Annual Percentage Rate (APR) Disclosure"
      titleAr="إفصاح معدل النسبة السنوي"
      expandable={false}
      content={
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <span>{language === 'ar' ? 'معدل النسبة السنوي (APR):' : 'APR:'}</span>
            <span className="font-bold text-amber-700 dark:text-amber-400">{apr}%</span>
          </div>
          {adminFee !== undefined && (
            <div className="grid grid-cols-2 gap-2">
              <span>{language === 'ar' ? 'الرسوم الإدارية:' : 'Admin Fee:'}</span>
              <span>{adminFee.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-SA')} {language === 'ar' ? 'ر.س' : 'SAR'}</span>
            </div>
          )}
          {insuranceFee !== undefined && (
            <div className="grid grid-cols-2 gap-2">
              <span>{language === 'ar' ? 'رسوم التأمين:' : 'Insurance:'}</span>
              <span>{insuranceFee.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-SA')} {language === 'ar' ? 'ر.س' : 'SAR'}</span>
            </div>
          )}
          {totalCost !== undefined && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200 dark:border-amber-800 font-semibold">
              <span>{language === 'ar' ? 'إجمالي المبلغ المستحق:' : 'Total Amount Due:'}</span>
              <span>{totalCost.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-SA')} {language === 'ar' ? 'ر.س' : 'SAR'}</span>
            </div>
          )}
        </div>
      }
    />
  );
}

export default DisclosureBlock;
