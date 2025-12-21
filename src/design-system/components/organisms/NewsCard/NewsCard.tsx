'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft, User } from 'lucide-react';
import { cn, formatDate, formatHijriDate } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { Badge } from '../../atoms/Badge/Badge';

export interface NewsCardProps {
  /** Article ID */
  id: string;
  /** Article title */
  title: string;
  /** Arabic title */
  titleAr?: string;
  /** Article excerpt */
  excerpt: string;
  /** Arabic excerpt */
  excerptAr?: string;
  /** Featured image URL */
  imageUrl?: string;
  /** Article category */
  category?: string;
  /** Arabic category */
  categoryAr?: string;
  /** Publication date */
  publishedAt: Date | string;
  /** Author name */
  author?: string;
  /** Arabic author name */
  authorAr?: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Article URL */
  href: string;
  /** Show Hijri date */
  showHijriDate?: boolean;
  /** Card variant */
  variant?: 'default' | 'horizontal' | 'featured' | 'compact';
  /** Custom class name */
  className?: string;
}

export function NewsCard({
  id,
  title,
  titleAr,
  excerpt,
  excerptAr,
  imageUrl,
  category,
  categoryAr,
  publishedAt,
  author,
  authorAr,
  readingTime,
  href,
  showHijriDate = false,
  variant = 'default',
  className,
}: NewsCardProps) {
  const { language, dir } = useI18n();
  const isRtl = dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const displayTitle = language === 'ar' && titleAr ? titleAr : title;
  const displayExcerpt = language === 'ar' && excerptAr ? excerptAr : excerpt;
  const displayCategory = language === 'ar' && categoryAr ? categoryAr : category;
  const displayAuthor = language === 'ar' && authorAr ? authorAr : author;

  const formattedDate = formatDate(publishedAt, language === 'ar' ? 'ar-SA' : 'en-SA');
  const hijriDate = showHijriDate ? formatHijriDate(publishedAt, language === 'ar' ? 'ar-SA' : 'en-SA') : null;

  // Default card variant
  if (variant === 'default') {
    return (
      <motion.article
        className={cn(
          'group bg-white dark:bg-neutral-900',
          'rounded-2xl overflow-hidden',
          'border border-neutral-200 dark:border-neutral-800',
          'shadow-sm hover:shadow-lg',
          'transition-all duration-300',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
      >
        <Link href={href} className="block">
          {/* Image */}
          <div className="relative h-48 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={displayTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                </svg>
              </div>
            )}

            {/* Category badge */}
            {displayCategory && (
              <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                <Badge color="primary" variant="solid" size="sm">
                  {displayCategory}
                </Badge>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Date & Reading time */}
            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              {readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {language === 'ar' ? `${readingTime} دقائق للقراءة` : `${readingTime} min read`}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {displayTitle}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
              {displayExcerpt}
            </p>

            {/* Author & Read more */}
            <div className="flex items-center justify-between">
              {displayAuthor && (
                <span className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <User className="w-4 h-4" />
                  {displayAuthor}
                </span>
              )}
              <span className="flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                <ArrowIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Horizontal variant
  if (variant === 'horizontal') {
    return (
      <motion.article
        className={cn(
          'group flex flex-col sm:flex-row bg-white dark:bg-neutral-900',
          'rounded-2xl overflow-hidden',
          'border border-neutral-200 dark:border-neutral-800',
          'shadow-sm hover:shadow-lg',
          'transition-all duration-300',
          className
        )}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Link href={href} className="flex flex-col sm:flex-row w-full">
          {/* Image */}
          <div className="relative w-full sm:w-1/3 h-48 sm:h-auto bg-neutral-100 dark:bg-neutral-800">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={displayTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {displayCategory && (
                <Badge color="primary" variant="soft" size="sm">
                  {displayCategory}
                </Badge>
              )}
              <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            </div>

            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {displayTitle}
            </h3>

            <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
              {displayExcerpt}
            </p>

            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
              {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
              <ArrowIcon className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <motion.article
        className={cn(
          'group relative rounded-3xl overflow-hidden',
          'shadow-xl',
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Link href={href} className="block">
          {/* Full image background */}
          <div className="relative h-[400px] md:h-[500px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={displayTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {displayCategory && (
                  <Badge color="secondary" variant="solid">
                    {displayCategory}
                  </Badge>
                )}
                <span className="text-sm opacity-90 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                {showHijriDate && hijriDate && (
                  <span className="text-sm opacity-80">({hijriDate})</span>
                )}
              </div>

              <h2 className="text-2xl md:text-4xl font-bold mb-3 line-clamp-3 group-hover:text-secondary-400 transition-colors">
                {displayTitle}
              </h2>

              <p className="text-base md:text-lg opacity-90 line-clamp-2 mb-4 max-w-2xl">
                {displayExcerpt}
              </p>

              <div className="flex items-center justify-between">
                {displayAuthor && (
                  <span className="flex items-center gap-2 text-sm opacity-80">
                    <User className="w-4 h-4" />
                    {displayAuthor}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium group-hover:bg-secondary-500 group-hover:text-neutral-900 transition-all">
                  {language === 'ar' ? 'اقرأ المقال' : 'Read Article'}
                  <ArrowIcon className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Compact variant
  return (
    <Link href={href}>
      <motion.article
        className={cn(
          'group flex items-start gap-4 p-4',
          'bg-white dark:bg-neutral-900',
          'rounded-xl border border-neutral-200 dark:border-neutral-800',
          'hover:border-primary-300 dark:hover:border-primary-700',
          'transition-all duration-200',
          className
        )}
        whileHover={{ x: isRtl ? -4 : 4 }}
      >
        {/* Thumbnail */}
        {imageUrl && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
            <Image
              src={imageUrl}
              alt={displayTitle}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {formattedDate}
          </span>
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {displayTitle}
          </h4>
          {displayCategory && (
            <Badge color="primary" variant="soft" size="sm" className="mt-2">
              {displayCategory}
            </Badge>
          )}
        </div>
      </motion.article>
    </Link>
  );
}

// JSON-LD Schema for news article (SEO)
export function NewsArticleSchema({
  title,
  excerpt,
  imageUrl,
  publishedAt,
  author,
  href,
}: Pick<NewsCardProps, 'title' | 'excerpt' | 'imageUrl' | 'publishedAt' | 'author' | 'href'>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: excerpt,
    image: imageUrl,
    datePublished: typeof publishedAt === 'string' ? publishedAt : publishedAt.toISOString(),
    author: author
      ? {
          '@type': 'Person',
          name: author,
        }
      : undefined,
    url: `https://ajil.com${href}`,
    publisher: {
      '@type': 'Organization',
      name: 'AJIL Finance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ajil.com/images/AJIL_logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default NewsCard;
