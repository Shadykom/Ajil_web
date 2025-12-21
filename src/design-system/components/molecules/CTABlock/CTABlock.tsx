'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { Button } from '../../atoms/Button/Button';

export type CTAVariant = 'primary' | 'secondary' | 'gradient' | 'card' | 'inline' | 'banner';

export interface CTAAction {
  label: string;
  labelAr?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
}

export interface CTABlockProps {
  /** CTA variant style */
  variant?: CTAVariant;
  /** Title */
  title: string;
  /** Arabic title */
  titleAr?: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Arabic subtitle */
  subtitleAr?: string;
  /** Badge text */
  badge?: string;
  /** Arabic badge */
  badgeAr?: string;
  /** Primary action */
  primaryAction: CTAAction;
  /** Secondary action */
  secondaryAction?: CTAAction;
  /** Background image URL */
  backgroundImage?: string;
  /** Custom class name */
  className?: string;
  /** Show phone number */
  showPhone?: boolean;
  /** Phone number */
  phone?: string;
}

export function CTABlock({
  variant = 'primary',
  title,
  titleAr,
  subtitle,
  subtitleAr,
  badge,
  badgeAr,
  primaryAction,
  secondaryAction,
  backgroundImage,
  className,
  showPhone = false,
  phone = '8002442211',
}: CTABlockProps) {
  const { language, dir } = useI18n();
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const displayTitle = language === 'ar' && titleAr ? titleAr : title;
  const displaySubtitle = language === 'ar' && subtitleAr ? subtitleAr : subtitle;
  const displayBadge = language === 'ar' && badgeAr ? badgeAr : badge;

  const renderAction = (action: CTAAction, isPrimary: boolean) => {
    const displayLabel = language === 'ar' && action.labelAr ? action.labelAr : action.label;

    const buttonProps = {
      variant: action.variant || (isPrimary ? 'primary' : 'outline'),
      size: 'lg' as const,
      rightIcon: action.icon || (isPrimary ? <ArrowIcon className="w-5 h-5" /> : undefined),
    };

    if (action.href) {
      return (
        <Link href={action.href}>
          <Button {...buttonProps}>{displayLabel}</Button>
        </Link>
      );
    }

    return (
      <Button {...buttonProps} onClick={action.onClick}>
        {displayLabel}
      </Button>
    );
  };

  // Variant styles
  const variantStyles: Record<CTAVariant, string> = {
    primary: 'bg-primary-600 text-white',
    secondary: 'bg-secondary-500 text-neutral-900',
    gradient: 'bg-gradient-to-r from-primary-600 to-primary-800 text-white',
    card: 'bg-white border border-neutral-200 shadow-lg text-neutral-900',
    inline: 'bg-transparent',
    banner: 'bg-primary-900 text-white',
  };

  // Primary variant
  if (variant === 'primary' || variant === 'gradient') {
    return (
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-3xl',
          variantStyles[variant],
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="cta-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M5 0L10 10L5 5L0 10L5 0Z" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center">
            {displayBadge && (
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium mb-4"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {displayBadge}
              </motion.span>
            )}

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {displayTitle}
            </motion.h2>

            {displaySubtitle && (
              <motion.p
                className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {displaySubtitle}
              </motion.p>
            )}

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {renderAction(
                { ...primaryAction, variant: 'secondary' },
                true
              )}
              {secondaryAction && renderAction(
                { ...secondaryAction, variant: 'ghost' },
                false
              )}
            </motion.div>

            {showPhone && (
              <motion.div
                className="mt-8 flex items-center justify-center gap-3 text-sm opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                transition={{ delay: 0.5 }}
              >
                <Phone className="w-4 h-4" />
                <span>
                  {language === 'ar' ? 'أو اتصل بنا:' : 'Or call us:'}{' '}
                  <a href={`tel:${phone}`} className="font-bold hover:underline" dir="ltr">
                    {phone}
                  </a>
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <motion.div
        className={cn(
          'rounded-2xl p-6 md:p-8',
          variantStyles.card,
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {displayBadge && (
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
            {displayBadge}
          </span>
        )}

        <h3 className="text-xl md:text-2xl font-bold mb-2">{displayTitle}</h3>

        {displaySubtitle && (
          <p className="text-neutral-600 mb-6">{displaySubtitle}</p>
        )}

        <div className="flex flex-wrap gap-3">
          {renderAction(primaryAction, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </div>
      </motion.div>
    );
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <div className={cn('flex flex-wrap items-center gap-4', className)}>
        <span className="text-lg font-medium">{displayTitle}</span>
        {renderAction(primaryAction, true)}
        {secondaryAction && renderAction(secondaryAction, false)}
      </div>
    );
  }

  // Banner variant
  return (
    <motion.div
      className={cn(
        'py-4 px-6',
        variantStyles.banner,
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {displayBadge && (
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-secondary-500 text-neutral-900 text-xs font-bold">
              {displayBadge}
            </span>
          )}
          <span className="font-medium">{displayTitle}</span>
        </div>
        <div className="flex items-center gap-3">
          {renderAction(
            { ...primaryAction, variant: 'secondary' },
            true
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CTABlock;
