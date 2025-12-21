'use client';

import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge color */
  color?: BadgeColor;
  /** Badge size */
  size?: BadgeSize;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Dot indicator */
  dot?: boolean;
  /** Pill shape */
  pill?: boolean;
}

const variantColorStyles: Record<BadgeVariant, Record<BadgeColor, string>> = {
  solid: {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-secondary-500 text-neutral-900',
    success: 'bg-green-500 text-white',
    warning: 'bg-amber-500 text-neutral-900',
    error: 'bg-red-500 text-white',
    neutral: 'bg-neutral-500 text-white',
  },
  soft: {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  },
  outline: {
    primary: 'border border-primary-500 text-primary-500',
    secondary: 'border border-secondary-500 text-secondary-600',
    success: 'border border-green-500 text-green-600',
    warning: 'border border-amber-500 text-amber-600',
    error: 'border border-red-500 text-red-600',
    neutral: 'border border-neutral-400 text-neutral-600',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3 py-1.5 gap-2',
};

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'soft',
      color = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      dot = false,
      pill = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium whitespace-nowrap',
          pill ? 'rounded-full' : 'rounded-md',
          variantColorStyles[variant][color],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'rounded-full',
              dotSizeStyles[size],
              variant === 'solid' ? 'bg-white/80' : 'bg-current opacity-80'
            )}
          />
        )}
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge for common use cases
export interface StatusBadgeProps extends Omit<BadgeProps, 'color'> {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'processing';
  labels?: Record<string, string>;
}

const statusColorMap: Record<StatusBadgeProps['status'], BadgeColor> = {
  active: 'success',
  inactive: 'neutral',
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  processing: 'primary',
};

const defaultStatusLabels: Record<StatusBadgeProps['status'], { ar: string; en: string }> = {
  active: { ar: 'نشط', en: 'Active' },
  inactive: { ar: 'غير نشط', en: 'Inactive' },
  pending: { ar: 'قيد الانتظار', en: 'Pending' },
  approved: { ar: 'موافق عليه', en: 'Approved' },
  rejected: { ar: 'مرفوض', en: 'Rejected' },
  processing: { ar: 'قيد المعالجة', en: 'Processing' },
};

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, labels, children, ...props }, ref) => {
    return (
      <Badge ref={ref} color={statusColorMap[status]} dot {...props}>
        {children || (labels ? labels[status] : defaultStatusLabels[status].ar)}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

export default Badge;
