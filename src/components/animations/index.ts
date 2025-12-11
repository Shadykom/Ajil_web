// Main animation component
export { default as LottieAnimation } from './LottieAnimation'
export type { LottieAnimationHandle } from './LottieAnimation'

// Animation context for global management
export { AnimationProvider, useAnimationContext } from './AnimationContext'

// Animation data
export { 
  ajilAnimations,
  ajilLogoAnimation,
  loadingSpinnerAnimation,
  successAnimation,
  pulseAnimation,
  confettiAnimation,
  progressBarAnimation,
} from './data/ajilAnimations'

// Ready-to-use animation components
export { 
  AjilLogoAnimated,
  AjilLoadingSpinner,
  AjilSuccessAnimation,
  AjilPulseAnimation,
  AjilConfettiAnimation,
  AjilProgressBar,
} from './AjilAnimations'

// Demo component for testing
export { default as AnimationDemo } from './AnimationDemo'
