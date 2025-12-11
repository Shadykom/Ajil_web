import { LottieRefCurrentProps } from 'lottie-react'

// Animation playback states
export type AnimationState = 'playing' | 'paused' | 'stopped'

// Animation direction
export type AnimationDirection = 'forward' | 'reverse'

// Animation trigger types
export type AnimationTrigger = 
  | 'autoplay'      // Start immediately
  | 'hover'         // Play on hover
  | 'click'         // Play on click
  | 'scroll'        // Play when scrolled into view
  | 'manual'        // Controlled programmatically

// Animation loop modes
export type LoopMode = 
  | boolean         // true = infinite, false = no loop
  | number          // Specific number of loops

// Animation segment - defines a portion of the animation
export interface AnimationSegment {
  name: string
  start: number     // Start frame
  end: number       // End frame
}

// Animation marker - named points in the animation
export interface AnimationMarker {
  name: string
  time: number      // Time in seconds
  frame: number     // Frame number
}

// Main animation configuration
export interface LottieAnimationConfig {
  // Core settings
  name: string
  src: string | object    // URL or JSON object
  
  // Playback settings
  autoplay?: boolean
  loop?: LoopMode
  speed?: number          // 1 = normal, 0.5 = half speed, 2 = double speed
  direction?: AnimationDirection
  
  // Trigger settings
  trigger?: AnimationTrigger
  
  // Visual settings
  width?: number | string
  height?: number | string
  className?: string
  
  // Advanced settings
  segments?: AnimationSegment[]
  initialSegment?: [number, number]  // [start, end] frames
  
  // Interaction settings
  hoverSegment?: [number, number]    // Segment to play on hover
  clickSegment?: [number, number]    // Segment to play on click
  
  // Callbacks
  onComplete?: () => void
  onLoopComplete?: () => void
  onEnterFrame?: (frame: number) => void
  onSegmentStart?: (segment: AnimationSegment) => void
}

// Props for the LottieAnimation component
export interface LottieAnimationProps extends Partial<LottieAnimationConfig> {
  animationData?: object
  preserveAspectRatio?: string
  rendererSettings?: {
    preserveAspectRatio?: string
    progressiveLoad?: boolean
    hideOnTransparent?: boolean
    className?: string
  }
  
  // State callbacks
  onReady?: (ref: LottieRefCurrentProps) => void
  onDataReady?: () => void
  onDOMLoaded?: () => void
  onDestroy?: () => void
  onError?: (error: Error) => void
}

// Animation controller interface for external control
export interface AnimationController {
  play: () => void
  pause: () => void
  stop: () => void
  setSpeed: (speed: number) => void
  setDirection: (direction: AnimationDirection) => void
  goToFrame: (frame: number, isFrame?: boolean) => void
  goToAndPlay: (frame: number, isFrame?: boolean) => void
  goToAndStop: (frame: number, isFrame?: boolean) => void
  playSegments: (segments: [number, number] | [number, number][], forceFlag?: boolean) => void
  setSubframe: (useSubFrames: boolean) => void
  getDuration: (inFrames?: boolean) => number
  destroy: () => void
}

// Predefined AJIL animation presets
export interface AjilAnimationPreset {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  category: 'icon' | 'loader' | 'transition' | 'celebration' | 'background'
  animationData: object
  defaultConfig: Partial<LottieAnimationConfig>
}

// Animation library entry
export interface AnimationLibraryEntry {
  id: string
  name: string
  category: string
  tags: string[]
  animationData: object | string  // JSON object or URL
  thumbnail?: string
  duration: number        // in seconds
  frameRate: number
  totalFrames: number
}

// Context for managing animations globally
export interface AnimationContextState {
  animations: Map<string, LottieRefCurrentProps>
  registerAnimation: (id: string, ref: LottieRefCurrentProps) => void
  unregisterAnimation: (id: string) => void
  playAnimation: (id: string) => void
  pauseAnimation: (id: string) => void
  stopAnimation: (id: string) => void
  playAll: () => void
  pauseAll: () => void
  stopAll: () => void
}
