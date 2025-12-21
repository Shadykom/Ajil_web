'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

export interface BreadcrumbItem {
  /** Label to display */
  label: string;
  /** Arabic label (optional) */
  labelAr?: string;
  /** URL to link to (optional - if not provided, item is not clickable) */
  href?: string;
  /** Icon to display before label */
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator */
  separator?: React.ReactNode;
  /** Show home icon at start */
  showHome?: boolean;
  /** Home URL */
  homeUrl?: string;
  /** Custom class name */
  className?: string;
  /** Max items to show (rest will be collapsed) */
  maxItems?: number;
}

export function Breadcrumbs({
  items,
  separator,
  showHome = true,
  homeUrl = '/',
  className,
  maxItems = 4,
}: BreadcrumbsProps) {
  const { dir, language } = useI18n();
  const isRtl = dir === 'rtl';

  // Default separator based on direction
  const defaultSeparator = isRtl ? (
    <ChevronLeft className="w-4 h-4 text-neutral-400" />
  ) : (
    <ChevronRight className="w-4 h-4 text-neutral-400" />
  );

  const separatorElement = separator || defaultSeparator;

  // Handle collapsing if too many items
  const shouldCollapse = items.length > maxItems;
  const visibleItems = shouldCollapse
    ? [...items.slice(0, 1), { label: '...', href: undefined }, ...items.slice(-2)]
    : items;

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const label = language === 'ar' && item.labelAr ? item.labelAr : item.label;

    const content = (
      <span className="flex items-center gap-1.5">
        {item.icon}
        <span>{label}</span>
      </span>
    );

    if (isLast || !item.href) {
      return (
        <span
          key={index}
          className={cn(
            'text-sm',
            isLast
              ? 'font-semibold text-primary-800 dark:text-primary-200'
              : 'text-primary-500 dark:text-primary-400'
          )}
          aria-current={isLast ? 'page' : undefined}
        >
          {content}
        </span>
      );
    }

    return (
      <Link
        key={index}
        href={item.href}
        className={cn(
          'text-sm text-primary-500 dark:text-primary-400',
          'hover:text-primary-600 dark:hover:text-primary-400',
          'transition-colors duration-150'
        )}
      >
        {content}
      </Link>
    );
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
    >
      <ol
        className="flex items-center gap-2 flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home */}
        {showHome && (
          <>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href={homeUrl}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg',
                  'text-neutral-500 hover:text-primary-600',
                  'hover:bg-primary-50 dark:hover:bg-primary-900/20',
                  'transition-colors duration-150'
                )}
                aria-label={language === 'ar' ? 'الرئيسية' : 'Home'}
                itemProp="item"
              >
                <Home className="w-4 h-4" />
                <meta itemProp="name" content={language === 'ar' ? 'الرئيسية' : 'Home'} />
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            {items.length > 0 && (
              <li aria-hidden="true" className="flex items-center">
                {separatorElement}
              </li>
            )}
          </>
        )}

        {/* Items */}
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const position = showHome ? index + 2 : index + 1;

          return (
            <React.Fragment key={index}>
              <li
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {item.href ? (
                  <>
                    <Link href={item.href} itemProp="item">
                      {renderItem(item, index, isLast)}
                      <meta
                        itemProp="name"
                        content={language === 'ar' && item.labelAr ? item.labelAr : item.label}
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    {renderItem(item, index, isLast)}
                    <meta
                      itemProp="name"
                      content={language === 'ar' && item.labelAr ? item.labelAr : item.label}
                    />
                  </>
                )}
                <meta itemProp="position" content={String(position)} />
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center">
                  {separatorElement}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// JSON-LD Schema for breadcrumbs (SEO)
export function BreadcrumbsSchema({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.href ? `https://ajil.com${item.href}` : undefined,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default Breadcrumbs;
