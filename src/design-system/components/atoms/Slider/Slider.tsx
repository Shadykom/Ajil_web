'use client';

import React, { forwardRef, useCallback, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SliderProps {
  /** Current value */
  value: number;
  /** On value change callback */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show value label */
  showValue?: boolean;
  /** Format value for display */
  formatValue?: (value: number) => string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Format min/max labels */
  formatMinMax?: (value: number) => string;
  /** Marks on the slider */
  marks?: Array<{ value: number; label?: string }>;
  /** Color variant */
  color?: 'primary' | 'secondary';
  /** Custom class name */
  className?: string;
  /** RTL support */
  dir?: 'rtl' | 'ltr';
  /** Aria label */
  'aria-label'?: string;
  /** Aria labelledby */
  'aria-labelledby'?: string;
}

const sizeStyles = {
  sm: {
    track: 'h-1',
    thumb: 'w-4 h-4',
    label: 'text-xs',
  },
  md: {
    track: 'h-2',
    thumb: 'w-5 h-5',
    label: 'text-sm',
  },
  lg: {
    track: 'h-3',
    thumb: 'w-6 h-6',
    label: 'text-base',
  },
};

const colorStyles = {
  primary: {
    track: 'bg-primary-500',
    thumb: 'bg-primary-500 border-primary-600',
    focus: 'focus-visible:ring-primary-500/50',
  },
  secondary: {
    track: 'bg-secondary-500',
    thumb: 'bg-secondary-500 border-secondary-600',
    focus: 'focus-visible:ring-secondary-500/50',
  },
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      size = 'md',
      showValue = false,
      formatValue = (v) => v.toString(),
      showMinMax = false,
      formatMinMax = (v) => v.toString(),
      marks,
      color = 'primary',
      className,
      dir = 'ltr',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    },
    ref
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const percentage = ((value - min) / (max - min)) * 100;
    const isRtl = dir === 'rtl';

    const getValueFromPosition = useCallback(
      (clientX: number) => {
        if (!trackRef.current) return value;

        const rect = trackRef.current.getBoundingClientRect();
        let percentage = (clientX - rect.left) / rect.width;

        // Flip for RTL
        if (isRtl) {
          percentage = 1 - percentage;
        }

        percentage = Math.max(0, Math.min(1, percentage));
        const rawValue = min + percentage * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.max(min, Math.min(max, steppedValue));
      },
      [min, max, step, value, isRtl]
    );

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      const newValue = getValueFromPosition(e.clientX);
      onChange(newValue);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      const touch = e.touches[0];
      const newValue = getValueFromPosition(touch.clientX);
      onChange(newValue);
    };

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        const newValue = getValueFromPosition(e.clientX);
        onChange(newValue);
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const newValue = getValueFromPosition(touch.clientX);
        onChange(newValue);
      };

      const handleEnd = () => {
        setIsDragging(false);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleEnd);
      };
    }, [isDragging, getValueFromPosition, onChange]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue = value;
      const largeStep = (max - min) / 10;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = isRtl ? value - step : value + step;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = isRtl ? value + step : value - step;
          break;
        case 'PageUp':
          newValue = value + largeStep;
          break;
        case 'PageDown':
          newValue = value - largeStep;
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      onChange(Math.max(min, Math.min(max, newValue)));
    };

    return (
      <div ref={ref} className={cn('w-full', className)} dir={dir}>
        {/* Min/Max Labels */}
        {showMinMax && (
          <div className="flex justify-between mb-2">
            <span className={cn('text-neutral-500', sizeStyles[size].label)}>
              {formatMinMax(min)}
            </span>
            <span className={cn('text-neutral-500', sizeStyles[size].label)}>
              {formatMinMax(max)}
            </span>
          </div>
        )}

        {/* Slider track */}
        <div
          ref={trackRef}
          className={cn(
            'relative w-full rounded-full bg-neutral-200 cursor-pointer',
            sizeStyles[size].track,
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Filled track */}
          <motion.div
            className={cn('absolute top-0 h-full rounded-full', colorStyles[color].track)}
            style={{
              [isRtl ? 'right' : 'left']: 0,
              width: `${percentage}%`,
            }}
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          {/* Marks */}
          {marks?.map((mark) => {
            const markPercentage = ((mark.value - min) / (max - min)) * 100;
            return (
              <div
                key={mark.value}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ [isRtl ? 'right' : 'left']: `${markPercentage}%` }}
              >
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full -translate-x-1/2',
                    mark.value <= value ? colorStyles[color].track : 'bg-neutral-400'
                  )}
                />
                {mark.label && (
                  <span
                    className={cn(
                      'absolute top-full mt-2 -translate-x-1/2 whitespace-nowrap',
                      sizeStyles[size].label,
                      'text-neutral-500'
                    )}
                  >
                    {mark.label}
                  </span>
                )}
              </div>
            );
          })}

          {/* Thumb */}
          <motion.div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full shadow-md',
              'border-2 transition-shadow',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              sizeStyles[size].thumb,
              colorStyles[color].thumb,
              colorStyles[color].focus,
              disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
            )}
            style={{
              [isRtl ? 'right' : 'left']: `${percentage}%`,
              transform: `translate(${isRtl ? '50%' : '-50%'}, -50%)`,
            }}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={formatValue(value)}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-disabled={disabled}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => !isDragging && setShowTooltip(false)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => !isDragging && setShowTooltip(false)}
            whileHover={!disabled ? { scale: 1.1 } : undefined}
            whileTap={!disabled ? { scale: 0.95 } : undefined}
          >
            {/* Value tooltip */}
            {showValue && (showTooltip || isDragging) && (
              <motion.div
                className={cn(
                  'absolute -top-8 left-1/2 -translate-x-1/2',
                  'px-2 py-1 rounded-lg',
                  'bg-neutral-800 text-white text-xs font-medium',
                  'whitespace-nowrap'
                )}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
              >
                {formatValue(value)}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rotate-45" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Current value display (alternative to tooltip) */}
        {showValue && !showTooltip && !isDragging && (
          <div className="mt-2 text-center">
            <span className={cn('font-semibold text-neutral-700', sizeStyles[size].label)}>
              {formatValue(value)}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
