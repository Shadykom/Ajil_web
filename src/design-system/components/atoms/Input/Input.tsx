'use client';

import React, { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success' | 'disabled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size */
  size?: InputSize;
  /** Input state */
  state?: InputState;
  /** Left addon (icon or text) */
  leftAddon?: ReactNode;
  /** Right addon (icon or text) */
  rightAddon?: ReactNode;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Helper text */
  helperText?: string;
  /** Label */
  label?: string;
  /** Required indicator */
  required?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Show clear button */
  clearable?: boolean;
  /** Clear callback */
  onClear?: () => void;
  /** RTL direction */
  dir?: 'rtl' | 'ltr';
}

// Size styles
const sizeStyles: Record<InputSize, string> = {
  sm: 'h-9 text-sm px-3',
  md: 'h-11 text-base px-4',
  lg: 'h-14 text-lg px-5',
};

// State styles
const stateStyles: Record<InputState, string> = {
  default: `
    border-neutral-200 
    hover:border-neutral-300 
    focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
  `,
  error: `
    border-red-500 
    hover:border-red-600 
    focus:border-red-500 focus:ring-2 focus:ring-red-500/20
    bg-red-50/50
  `,
  success: `
    border-green-500 
    hover:border-green-600 
    focus:border-green-500 focus:ring-2 focus:ring-green-500/20
    bg-green-50/50
  `,
  disabled: `
    border-neutral-200 
    bg-neutral-100 
    cursor-not-allowed 
    opacity-60
  `,
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      state = 'default',
      leftAddon,
      rightAddon,
      error,
      success,
      helperText,
      label,
      required,
      fullWidth = true,
      clearable = false,
      onClear,
      className,
      type = 'text',
      disabled,
      id,
      dir,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;
    const isPasswordType = type === 'password';
    const currentState = disabled ? 'disabled' : error ? 'error' : success ? 'success' : state;
    
    const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

    const containerStyles = cn(
      'relative flex items-center gap-2',
      'rounded-xl border-2 transition-all duration-200',
      'bg-white',
      sizeStyles[size],
      stateStyles[currentState],
      fullWidth && 'w-full',
      isFocused && 'shadow-sm',
      className
    );

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')} dir={dir}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-red-500 mr-1 rtl:ml-1 rtl:mr-0">*</span>}
          </label>
        )}

        {/* Input container */}
        <div className={containerStyles}>
          {/* Left addon */}
          {leftAddon && (
            <span className="flex items-center text-neutral-500 shrink-0">
              {leftAddon}
            </span>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={cn(
              'flex-1 min-w-0',
              'bg-transparent border-0 outline-none',
              'placeholder:text-neutral-400',
              'text-neutral-900',
              disabled && 'cursor-not-allowed'
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {/* Password toggle */}
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center text-neutral-400 hover:text-neutral-600 transition-colors shrink-0"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {/* Clear button */}
          {clearable && props.value && !disabled && (
            <button
              type="button"
              onClick={onClear}
              className="flex items-center text-neutral-400 hover:text-neutral-600 transition-colors shrink-0"
              tabIndex={-1}
              aria-label="Clear input"
            >
              <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.54 10.46L10.46 11.54 8 9.09l-2.46 2.45-1.08-1.08L6.91 8 4.46 5.54l1.08-1.08L8 6.91l2.46-2.45 1.08 1.08L9.09 8l2.45 2.46z"/>
              </svg>
            </button>
          )}

          {/* State icons */}
          {currentState === 'error' && !rightAddon && (
            <AlertCircle className="text-red-500 shrink-0" size={20} />
          )}
          {currentState === 'success' && !rightAddon && (
            <CheckCircle className="text-green-500 shrink-0" size={20} />
          )}

          {/* Right addon */}
          {rightAddon && !isPasswordType && (
            <span className="flex items-center text-neutral-500 shrink-0">
              {rightAddon}
            </span>
          )}
        </div>

        {/* Messages */}
        <AnimatePresence mode="wait">
          {(error || success || helperText) && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {error && (
                <p id={`${inputId}-error`} className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {error}
                </p>
              )}
              {success && !error && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle size={14} />
                  {success}
                </p>
              )}
              {helperText && !error && !success && (
                <p id={`${inputId}-helper`} className="text-sm text-neutral-500">
                  {helperText}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

// Number Input with formatting
export interface NumberInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      min,
      max,
      step = 1,
      formatOptions,
      locale = 'ar-SA',
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(
      value !== undefined ? value.toString() : ''
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^\d.-]/g, '');
      setDisplayValue(rawValue);
      
      const numValue = parseFloat(rawValue);
      if (!isNaN(numValue)) {
        let finalValue = numValue;
        if (min !== undefined) finalValue = Math.max(min, finalValue);
        if (max !== undefined) finalValue = Math.min(max, finalValue);
        onChange?.(finalValue);
      }
    };

    const handleBlur = () => {
      if (value !== undefined && formatOptions) {
        setDisplayValue(new Intl.NumberFormat(locale, formatOptions).format(value));
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default Input;
