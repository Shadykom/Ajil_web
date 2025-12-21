'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calculator, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';

export interface ProductFeature {
  text: string;
  textAr?: string;
  icon?: React.ReactNode;
}

export interface ProductCardProps {
  /** Product ID */
  id: string;
  /** Product title */
  title: string;
  /** Arabic title */
  titleAr?: string;
  /** Product description */
  description: string;
  /** Arabic description */
  descriptionAr?: string;
  /** Product image URL */
  imageUrl?: string;
  /** Product icon */
  icon?: React.ReactNode;
  /** Badge text (e.g., "جديد", "شائع") */
  badge?: string;
  /** Arabic badge */
  badgeAr?: string;
  /** Badge color */
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning';
  /** Key features list */
  features?: ProductFeature[];
  /** Starting rate (APR) */
  startingRate?: number;
  /** Rate description */
  rateLabel?: string;
  /** Arabic rate label */
  rateLabelAr?: string;
  /** CTA label */
  ctaLabel?: string;
  /** Arabic CTA label */
  ctaLabelAr?: string;
  /** Product detail page URL */
  href: string;
  /** Calculator URL */
  calculatorHref?: string;
  /** Card variant */
  variant?: 'default' | 'horizontal' | 'featured' | 'compact';
  /** Custom class name */
  className?: string;
}

export function ProductCard({
  id,
  title,
  titleAr,
  description,
  descriptionAr,
  imageUrl,
  icon,
  badge,
  badgeAr,
  badgeColor = 'primary',
  features = [],
  startingRate,
  rateLabel = 'Starting from',
  rateLabelAr = 'ابتداءً من',
  ctaLabel = 'Learn More',
  ctaLabelAr = 'اعرف المزيد',
  href,
  calculatorHref,
  variant = 'default',
  className,
}: ProductCardProps) {
  const { language, dir } = useI18n();
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const displayTitle = language === 'ar' && titleAr ? titleAr : title;
  const displayDescription = language === 'ar' && descriptionAr ? descriptionAr : description;
  const displayBadge = language === 'ar' && badgeAr ? badgeAr : badge;
  const displayRateLabel = language === 'ar' ? rateLabelAr : rateLabel;
  const displayCta = language === 'ar' && ctaLabelAr ? ctaLabelAr : ctaLabel;

  // Default card variant
  if (variant === 'default') {
    return (
      <motion.article
        className={cn(
          'group relative bg-white dark:bg-neutral-900',
          'rounded-2xl overflow-hidden',
          'border border-neutral-200 dark:border-neutral-800',
          'shadow-sm hover:shadow-xl',
          'transition-all duration-300',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
      >
        {/* Badge */}
        {displayBadge && (
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
            <Badge color={badgeColor} variant="solid">
              {displayBadge}
            </Badge>
          </div>
        )}

        {/* Image or Icon Area */}
        <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={displayTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : icon ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-2xl bg-white/80 dark:bg-neutral-800/80 shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {icon}
              </motion.div>
            </div>
          ) : null}

          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id={`pattern-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 0L20 20L10 10L0 20L10 0Z" fill="currentColor" className="text-primary-200" />
              </pattern>
              <rect width="100%" height="100%" fill={`url(#pattern-${id})`} />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Rate */}
          {startingRate !== undefined && (
            <div className="mb-3">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                {displayRateLabel}
              </span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {startingRate}%
              </span>
              <span className="text-sm text-neutral-500 mr-1 rtl:ml-1 rtl:mr-0">
                {language === 'ar' ? 'معدل النسبة السنوي' : 'APR'}
              </span>
            </div>
          )}

          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-600 transition-colors">
            {displayTitle}
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4">
            {displayDescription}
          </p>

          {/* Features */}
          {features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {features.slice(0, 3).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {feature.icon || (
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  )}
                  <span>{language === 'ar' && feature.textAr ? feature.textAr : feature.text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href={href} className="flex-1">
              <Button variant="primary" fullWidth rightIcon={<ArrowIcon className="w-4 h-4" />}>
                {displayCta}
              </Button>
            </Link>
            {calculatorHref && (
              <Link href={calculatorHref}>
                <Button variant="outline" className="px-3" aria-label={language === 'ar' ? 'حاسبة التمويل' : 'Calculator'}>
                  <Calculator className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.article>
    );
  }

  // Horizontal variant
  if (variant === 'horizontal') {
    return (
      <motion.article
        className={cn(
          'group flex flex-col md:flex-row bg-white dark:bg-neutral-900',
          'rounded-2xl overflow-hidden',
          'border border-neutral-200 dark:border-neutral-800',
          'shadow-sm hover:shadow-xl',
          'transition-all duration-300',
          className
        )}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        whileHover={{ x: 4 }}
      >
        {/* Image */}
        <div className="relative w-full md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-primary-50 to-primary-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={displayTitle}
              fill
              className="object-cover"
            />
          ) : icon ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {icon}
            </div>
          ) : null}
          {displayBadge && (
            <Badge
              color={badgeColor}
              variant="solid"
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4"
            >
              {displayBadge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {startingRate !== undefined && (
            <div className="mb-2">
              <span className="text-2xl font-bold text-primary-600">{startingRate}%</span>
              <span className="text-sm text-neutral-500 mr-2">{language === 'ar' ? 'معدل النسبة السنوي' : 'APR'}</span>
            </div>
          )}

          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
            {displayTitle}
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-1">
            {displayDescription}
          </p>

          <div className="flex items-center gap-3">
            <Link href={href}>
              <Button variant="primary" rightIcon={<ArrowIcon className="w-4 h-4" />}>
                {displayCta}
              </Button>
            </Link>
            {calculatorHref && (
              <Link href={calculatorHref}>
                <Button variant="ghost" leftIcon={<Calculator className="w-4 h-4" />}>
                  {language === 'ar' ? 'احسب' : 'Calculate'}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <motion.article
        className={cn(
          'group relative bg-gradient-to-br from-primary-600 to-primary-800 text-white',
          'rounded-3xl overflow-hidden',
          'shadow-xl',
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id={`featured-pattern-${id}`} width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M15 0L30 30L15 15L0 30L15 0Z" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#featured-pattern-${id})`} />
          </svg>
        </div>

        {displayBadge && (
          <Badge
            color="secondary"
            variant="solid"
            className="absolute top-6 right-6 rtl:right-auto rtl:left-6 z-10"
          >
            {displayBadge}
          </Badge>
        )}

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Icon */}
            {icon && (
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}

            <div className="flex-1">
              {startingRate !== undefined && (
                <div className="mb-4">
                  <span className="text-xs opacity-80 block">{displayRateLabel}</span>
                  <span className="text-4xl font-bold">{startingRate}%</span>
                  <span className="text-sm opacity-80 mr-2">
                    {language === 'ar' ? 'معدل النسبة السنوي' : 'APR'}
                  </span>
                </div>
              )}

              <h3 className="text-2xl md:text-3xl font-bold mb-3">{displayTitle}</h3>
              <p className="opacity-90 mb-6 max-w-lg">{displayDescription}</p>

              {features.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-sm"
                    >
                      {feature.icon || <CheckCircle className="w-4 h-4" />}
                      {language === 'ar' && feature.textAr ? feature.textAr : feature.text}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link href={href}>
                  <Button variant="secondary" size="lg" rightIcon={<ArrowIcon className="w-5 h-5" />}>
                    {displayCta}
                  </Button>
                </Link>
                {calculatorHref && (
                  <Link href={calculatorHref}>
                    <Button
                      variant="ghost"
                      size="lg"
                      leftIcon={<Calculator className="w-5 h-5" />}
                      className="text-white hover:bg-white/20"
                    >
                      {language === 'ar' ? 'احسب تمويلك' : 'Calculate'}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Compact variant
  return (
    <Link href={href}>
      <motion.article
        className={cn(
          'group flex items-center gap-4 p-4',
          'bg-white dark:bg-neutral-900',
          'rounded-xl border border-neutral-200 dark:border-neutral-800',
          'hover:border-primary-300 dark:hover:border-primary-700',
          'transition-all duration-200',
          className
        )}
        whileHover={{ x: isRtl ? -4 : 4 }}
      >
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 truncate group-hover:text-primary-600 transition-colors">
            {displayTitle}
          </h4>
          {startingRate !== undefined && (
            <span className="text-sm text-primary-600 font-medium">
              {language === 'ar' ? `ابتداءً من ${startingRate}%` : `From ${startingRate}%`}
            </span>
          )}
        </div>
        <ArrowIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
      </motion.article>
    </Link>
  );
}

export default ProductCard;
