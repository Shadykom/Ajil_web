'use client';

import React, { forwardRef, ReactNode, cloneElement, isValidElement, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Typography } from '../../atoms/Typography/Typography';

export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Label for (associate with input) */
  htmlFor?: string;
  /** Required indicator */
  required?: boolean;
  /** Optional indicator */
  optional?: boolean;
  /** Optional text override */
  optionalText?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Helper text */
  helperText?: string;
  /** Hint/info text */
  hint?: string;
  /** Character count */
  characterCount?: { current: number; max: number };
  /** Children (input component) */
  children: ReactNode;
  /** Custom class name */
  className?: string;
  /** Full width */
  fullWidth?: boolean;
  /** Direction */
  dir?: 'rtl' | 'ltr';
  /** Disabled state */
  disabled?: boolean;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      required = false,
      optional = false,
      optionalText,
      error,
      success,
      helperText,
      hint,
      characterCount,
      children,
      className,
      fullWidth = true,
      dir,
      disabled = false,
    },
    ref
  ) => {
    const hasError = !!error;
    const hasSuccess = !!success;

    // Clone child and pass error/success state
    const enhancedChildren = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          ...child.props,
          id: htmlFor || child.props.id,
          error: hasError ? error : undefined,
          success: hasSuccess ? success : undefined,
          disabled: disabled || child.props.disabled,
          'aria-invalid': hasError,
          'aria-describedby': error
            ? `${htmlFor}-error`
            : helperText
            ? `${htmlFor}-helper`
            : undefined,
        } as any);
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1.5',
          fullWidth && 'w-full',
          disabled && 'opacity-60',
          className
        )}
        dir={dir}
      >
        {/* Label Row */}
        {(label || hint) && (
          <div className="flex items-center justify-between gap-2">
            {label && (
              <label
                htmlFor={htmlFor}
                className={cn(
                  'text-sm font-medium text-neutral-700 dark:text-neutral-300',
                  'flex items-center gap-1'
                )}
              >
                {label}
                {required && (
                  <span className="text-red-500" aria-label="required">
                    *
                  </span>
                )}
                {optional && (
                  <span className="text-neutral-400 font-normal text-xs">
                    ({optionalText || 'اختياري'})
                  </span>
                )}
              </label>
            )}
            {hint && (
              <button
                type="button"
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label={hint}
                tabIndex={-1}
              >
                <Info size={16} />
              </button>
            )}
          </div>
        )}

        {/* Input */}
        {enhancedChildren}

        {/* Footer Row */}
        <div className="flex items-start justify-between gap-2 min-h-[20px]">
          <AnimatePresence mode="wait">
            {/* Error Message */}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1 text-red-600"
              >
                <AlertCircle size={14} />
                <span id={`${htmlFor}-error`} className="text-sm" role="alert">
                  {error}
                </span>
              </motion.div>
            )}

            {/* Success Message */}
            {success && !error && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1 text-green-600"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-sm">{success}</span>
              </motion.div>
            )}

            {/* Helper Text */}
            {helperText && !error && !success && (
              <motion.p
                key="helper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                id={`${htmlFor}-helper`}
                className="text-sm text-neutral-500"
              >
                {helperText}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Character Count */}
          {characterCount && (
            <span
              className={cn(
                'text-xs ml-auto rtl:ml-0 rtl:mr-auto',
                characterCount.current > characterCount.max
                  ? 'text-red-500'
                  : 'text-neutral-400'
              )}
            >
              {characterCount.current}/{characterCount.max}
            </span>
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Fieldset for grouping related fields
export interface FieldsetProps {
  legend?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  error?: string;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, description, children, className, error }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn(
          'border border-neutral-200 rounded-xl p-4 md:p-6',
          error && 'border-red-300 bg-red-50/50',
          className
        )}
      >
        {legend && (
          <legend className="px-2 text-lg font-semibold text-neutral-800">
            {legend}
          </legend>
        )}
        {description && (
          <p className="text-sm text-neutral-500 mb-4">{description}</p>
        )}
        <div className="space-y-4">{children}</div>
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </fieldset>
    );
  }
);

Fieldset.displayName = 'Fieldset';

export default FormField;
