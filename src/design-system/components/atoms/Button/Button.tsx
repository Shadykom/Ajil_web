'use client';

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Button variants following AJIL brand guidelines
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Children */
  children: ReactNode;
  /** Disable animations */
  disableAnimation?: boolean;
}

// Variant styles
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-500 text-white 
    hover:bg-primary-600 
    active:bg-primary-700
    disabled:bg-neutral-300 disabled:text-neutral-500
    focus-visible:ring-primary-500/50
    shadow-sm hover:shadow-md
  `,
  secondary: `
    bg-secondary-500 text-neutral-900
    hover:bg-secondary-600
    active:bg-secondary-700
    disabled:bg-neutral-300 disabled:text-neutral-500
    focus-visible:ring-secondary-500/50
    shadow-sm hover:shadow-md
  `,
  outline: `
    bg-transparent border-2 border-primary-500 text-primary-500
    hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600
    active:bg-primary-100
    disabled:border-neutral-300 disabled:text-neutral-400 disabled:bg-transparent
    focus-visible:ring-primary-500/50
  `,
  ghost: `
    bg-transparent text-primary-500
    hover:bg-primary-50 hover:text-primary-600
    active:bg-primary-100
    disabled:text-neutral-400 disabled:bg-transparent
    focus-visible:ring-primary-500/50
  `,
  link: `
    bg-transparent text-primary-500 underline-offset-4
    hover:underline hover:text-primary-600
    active:text-primary-700
    disabled:text-neutral-400 disabled:no-underline
    focus-visible:ring-primary-500/50
    p-0 h-auto
  `,
  danger: `
    bg-red-600 text-white
    hover:bg-red-700
    active:bg-red-800
    disabled:bg-neutral-300 disabled:text-neutral-500
    focus-visible:ring-red-500/50
    shadow-sm hover:shadow-md
  `,
};

// Size styles
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
  xl: 'h-14 px-8 text-lg gap-3 rounded-2xl',
};

// Icon size mapping
const iconSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

// Loader size mapping
const loaderSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      disableAnimation = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const buttonContent = (
      <>
        {/* Loading spinner or left icon */}
        {isLoading ? (
          <Loader2 
            className="animate-spin" 
            size={loaderSizes[size]} 
          />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        ) : null}
        
        {/* Button text */}
        <span className={cn(isLoading && loadingText && 'sr-only')}>
          {children}
        </span>
        
        {/* Loading text */}
        {isLoading && loadingText && (
          <span>{loadingText}</span>
        )}
        
        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </>
    );

    const baseStyles = cn(
      // Base styles
      'inline-flex items-center justify-center',
      'font-semibold whitespace-nowrap',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:pointer-events-none',
      // RTL support
      'rtl:flex-row-reverse',
      // Variant & size
      variantStyles[variant],
      variant !== 'link' && sizeStyles[size],
      // Full width
      fullWidth && 'w-full',
      className
    );

    // Without animation
    if (disableAnimation) {
      return (
        <button
          ref={ref}
          className={baseStyles}
          disabled={isDisabled}
          aria-busy={isLoading}
          {...props}
        >
          {buttonContent}
        </button>
      );
    }

    // With animation (using motion.button)
    return (
      <motion.button
        ref={ref as any}
        className={baseStyles}
        disabled={isDisabled}
        aria-busy={isLoading}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...(props as any)}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// Icon Button variant
export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    const iconButtonSizes: Record<ButtonSize, string> = {
      sm: 'h-8 w-8 p-0',
      md: 'h-10 w-10 p-0',
      lg: 'h-12 w-12 p-0',
      xl: 'h-14 w-14 p-0',
    };

    return (
      <Button
        ref={ref}
        size={size}
        className={cn(iconButtonSizes[size], 'rounded-full', className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;
