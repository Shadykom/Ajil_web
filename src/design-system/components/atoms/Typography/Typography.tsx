'use client';

import React, { forwardRef, HTMLAttributes, ElementType } from 'react';
import { cn } from '@/lib/utils';

// Typography variants matching design system
export type TypographyVariant =
  | 'display-2xl'
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-xl'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'label-lg'
  | 'label-md'
  | 'label-sm'
  | 'caption';

export type TypographyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'inverse';

export type TypographyWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

export type TypographyAlign = 'left' | 'center' | 'right' | 'start' | 'end';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography variant */
  variant?: TypographyVariant;
  /** Text color */
  color?: TypographyColor;
  /** Font weight override */
  weight?: TypographyWeight;
  /** Text alignment */
  align?: TypographyAlign;
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** Number of lines to clamp */
  lineClamp?: number;
  /** Render as different element */
  as?: ElementType;
  /** Balance text wrapping */
  balance?: boolean;
  /** Render with gradient */
  gradient?: boolean;
}

// Variant to element mapping
const variantElementMap: Record<TypographyVariant, ElementType> = {
  'display-2xl': 'h1',
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h2',
  'display-sm': 'h2',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-xl': 'p',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'label-lg': 'span',
  'label-md': 'span',
  'label-sm': 'span',
  caption: 'span',
};

// Variant styles
const variantStyles: Record<TypographyVariant, string> = {
  'display-2xl': 'text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight',
  'display-xl': 'text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight',
  'display-lg': 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
  'display-md': 'text-3xl md:text-4xl font-bold leading-tight tracking-tight',
  'display-sm': 'text-2xl md:text-3xl font-semibold leading-tight',
  h1: 'text-3xl md:text-4xl font-bold leading-snug',
  h2: 'text-2xl md:text-3xl font-bold leading-snug',
  h3: 'text-xl md:text-2xl font-semibold leading-snug',
  h4: 'text-lg md:text-xl font-semibold leading-normal',
  h5: 'text-base md:text-lg font-medium leading-normal',
  h6: 'text-sm md:text-base font-medium leading-normal',
  'body-xl': 'text-xl leading-relaxed',
  'body-lg': 'text-lg leading-relaxed',
  'body-md': 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  'body-xs': 'text-xs leading-relaxed',
  'label-lg': 'text-sm font-medium leading-none',
  'label-md': 'text-xs font-medium leading-none',
  'label-sm': 'text-[11px] font-medium leading-none tracking-wide',
  caption: 'text-xs leading-normal',
};

// Color styles
const colorStyles: Record<TypographyColor, string> = {
  default: 'text-neutral-900 dark:text-neutral-50',
  primary: 'text-neutral-900 dark:text-neutral-50',
  secondary: 'text-neutral-600 dark:text-neutral-300',
  tertiary: 'text-neutral-500 dark:text-neutral-400',
  brand: 'text-primary-600 dark:text-primary-400',
  accent: 'text-secondary-700 dark:text-secondary-400',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-amber-600 dark:text-amber-400',
  inverse: 'text-white dark:text-neutral-900',
};

// Weight styles
const weightStyles: Record<TypographyWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

// Alignment styles
const alignStyles: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  start: 'text-start',
  end: 'text-end',
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body-md',
      color = 'default',
      weight,
      align,
      truncate = false,
      lineClamp,
      as,
      balance = false,
      gradient = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || variantElementMap[variant];

    const styles = cn(
      variantStyles[variant],
      colorStyles[color],
      weight && weightStyles[weight],
      align && alignStyles[align],
      truncate && 'truncate',
      lineClamp && `line-clamp-${lineClamp}`,
      balance && 'text-balance',
      gradient && 'bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent',
      className
    );

    return (
      <Component ref={ref} className={styles} {...props}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

// Convenience components
export const DisplayText = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }>(
  ({ size = 'lg', ...props }, ref) => (
    <Typography ref={ref} variant={`display-${size}` as TypographyVariant} {...props} />
  )
);
DisplayText.displayName = 'DisplayText';

export const Heading = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level = 2, ...props }, ref) => (
    <Typography ref={ref} variant={`h${level}` as TypographyVariant} {...props} />
  )
);
Heading.displayName = 'Heading';

export const BodyText = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'> & { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>(
  ({ size = 'md', ...props }, ref) => (
    <Typography ref={ref} variant={`body-${size}` as TypographyVariant} {...props} />
  )
);
BodyText.displayName = 'BodyText';

export const Label = forwardRef<HTMLSpanElement, Omit<TypographyProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' }>(
  ({ size = 'md', ...props }, ref) => (
    <Typography ref={ref} variant={`label-${size}` as TypographyVariant} as="label" {...props} />
  )
);
Label.displayName = 'Label';

export const Caption = forwardRef<HTMLSpanElement, Omit<TypographyProps, 'variant'>>((props, ref) => (
  <Typography ref={ref} variant="caption" color="tertiary" {...props} />
));
Caption.displayName = 'Caption';

export default Typography;
