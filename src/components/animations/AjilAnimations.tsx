'use client'

import { forwardRef } from 'react'
import LottieAnimation, { LottieAnimationHandle } from './LottieAnimation'
import {
  ajilLogoAnimation,
  loadingSpinnerAnimation,
  successAnimation,
  pulseAnimation,
  confettiAnimation,
  progressBarAnimation,
} from './data/ajilAnimations'
import type { LottieAnimationProps, AnimationTrigger } from '@/types/lottie'

// Common props for AJIL animations
interface AjilAnimationBaseProps {
  size?: number | string
  className?: string
  trigger?: AnimationTrigger
  onComplete?: () => void
}

// ============================================
// AJIL Logo Animation
// ============================================
interface AjilLogoAnimatedProps extends AjilAnimationBaseProps {
  variant?: 'default' | 'small' | 'large'
}

export const AjilLogoAnimated = forwardRef<LottieAnimationHandle, AjilLogoAnimatedProps>(
  ({ size, variant = 'default', className = '', trigger = 'autoplay', onComplete }, ref) => {
    const sizeMap = {
      small: 60,
      default: 100,
      large: 160,
    }
    const computedSize = size || sizeMap[variant]

    return (
      <LottieAnimation
        ref={ref}
        animationData={ajilLogoAnimation}
        name="ajil-logo"
        width={computedSize}
        height={computedSize}
        className={className}
        trigger={trigger}
        loop={false}
        onComplete={onComplete}
      />
    )
  }
)
AjilLogoAnimated.displayName = 'AjilLogoAnimated'

// ============================================
// Loading Spinner
// ============================================
interface AjilLoadingSpinnerProps extends AjilAnimationBaseProps {
  variant?: 'primary' | 'secondary' | 'white'
}

export const AjilLoadingSpinner = forwardRef<LottieAnimationHandle, AjilLoadingSpinnerProps>(
  ({ size = 40, className = '', trigger = 'autoplay' }, ref) => {
    return (
      <LottieAnimation
        ref={ref}
        animationData={loadingSpinnerAnimation}
        name="ajil-loading"
        width={size}
        height={size}
        className={className}
        trigger={trigger}
        loop={true}
        speed={1.2}
      />
    )
  }
)
AjilLoadingSpinner.displayName = 'AjilLoadingSpinner'

// ============================================
// Success Animation
// ============================================
interface AjilSuccessAnimationProps extends AjilAnimationBaseProps {
  autoPlay?: boolean
}

export const AjilSuccessAnimation = forwardRef<LottieAnimationHandle, AjilSuccessAnimationProps>(
  ({ size = 80, className = '', trigger = 'autoplay', onComplete }, ref) => {
    return (
      <LottieAnimation
        ref={ref}
        animationData={successAnimation}
        name="ajil-success"
        width={size}
        height={size}
        className={className}
        trigger={trigger}
        loop={false}
        onComplete={onComplete}
      />
    )
  }
)
AjilSuccessAnimation.displayName = 'AjilSuccessAnimation'

// ============================================
// Pulse Animation (for icons/buttons)
// ============================================
interface AjilPulseAnimationProps extends AjilAnimationBaseProps {
  children?: React.ReactNode
}

export const AjilPulseAnimation = forwardRef<LottieAnimationHandle, AjilPulseAnimationProps>(
  ({ size = 60, className = '', trigger = 'hover', children }, ref) => {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <LottieAnimation
          ref={ref}
          animationData={pulseAnimation}
          name="ajil-pulse"
          width={size}
          height={size}
          className="absolute inset-0"
          trigger={trigger}
          loop={true}
        />
        {children && (
          <div className="relative z-10">{children}</div>
        )}
      </div>
    )
  }
)
AjilPulseAnimation.displayName = 'AjilPulseAnimation'

// ============================================
// Confetti Celebration
// ============================================
interface AjilConfettiAnimationProps extends AjilAnimationBaseProps {
  play?: boolean
}

export const AjilConfettiAnimation = forwardRef<LottieAnimationHandle, AjilConfettiAnimationProps>(
  ({ size = 200, className = '', trigger = 'manual', onComplete }, ref) => {
    return (
      <LottieAnimation
        ref={ref}
        animationData={confettiAnimation}
        name="ajil-confetti"
        width={size}
        height={size}
        className={className}
        trigger={trigger}
        loop={false}
        onComplete={onComplete}
      />
    )
  }
)
AjilConfettiAnimation.displayName = 'AjilConfettiAnimation'

// ============================================
// Progress Bar
// ============================================
interface AjilProgressBarProps extends AjilAnimationBaseProps {
  width?: number | string
  height?: number | string
  progress?: number // 0-100
}

export const AjilProgressBar = forwardRef<LottieAnimationHandle, AjilProgressBarProps>(
  ({ width = 300, height = 30, className = '', trigger = 'scroll', onComplete }, ref) => {
    return (
      <LottieAnimation
        ref={ref}
        animationData={progressBarAnimation}
        name="ajil-progress"
        width={width}
        height={height}
        className={className}
        trigger={trigger}
        loop={false}
        onComplete={onComplete}
      />
    )
  }
)
AjilProgressBar.displayName = 'AjilProgressBar'

// ============================================
// Generic AJIL Animation Wrapper
// ============================================
interface AjilAnimationProps extends LottieAnimationProps {
  animation: 'logo' | 'loading' | 'success' | 'pulse' | 'confetti' | 'progress'
}

const animationMap = {
  logo: ajilLogoAnimation,
  loading: loadingSpinnerAnimation,
  success: successAnimation,
  pulse: pulseAnimation,
  confetti: confettiAnimation,
  progress: progressBarAnimation,
}

export const AjilAnimation = forwardRef<LottieAnimationHandle, AjilAnimationProps>(
  ({ animation, ...props }, ref) => {
    return (
      <LottieAnimation
        ref={ref}
        animationData={animationMap[animation]}
        name={`ajil-${animation}`}
        {...props}
      />
    )
  }
)
AjilAnimation.displayName = 'AjilAnimation'

const AjilAnimationsBundle = {
  Logo: AjilLogoAnimated,
  Loading: AjilLoadingSpinner,
  Success: AjilSuccessAnimation,
  Pulse: AjilPulseAnimation,
  Confetti: AjilConfettiAnimation,
  Progress: AjilProgressBar,
}

export default AjilAnimationsBundle
