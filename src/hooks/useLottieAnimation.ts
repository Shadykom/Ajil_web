'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import type { LottieRefCurrentProps } from 'lottie-react'
import type { 
  AnimationState, 
  AnimationDirection, 
  AnimationController 
} from '@/types/lottie'

interface UseLottieAnimationOptions {
  autoplay?: boolean
  loop?: boolean | number
  speed?: number
  direction?: AnimationDirection
  onComplete?: () => void
  onLoopComplete?: () => void
}

interface UseLottieAnimationReturn extends AnimationController {
  ref: React.RefObject<LottieRefCurrentProps>
  state: AnimationState
  currentFrame: number
  totalFrames: number
  progress: number
  isPlaying: boolean
  isPaused: boolean
  isStopped: boolean
}

export function useLottieAnimation(
  options: UseLottieAnimationOptions = {}
): UseLottieAnimationReturn {
  const {
    autoplay = true,
    loop = true,
    speed = 1,
    direction = 'forward',
    onComplete,
    onLoopComplete,
  } = options

  const ref = useRef<LottieRefCurrentProps>(null)
  const [state, setState] = useState<AnimationState>('stopped')
  const [currentFrame, setCurrentFrame] = useState(0)
  const [totalFrames, setTotalFrames] = useState(0)
  const [progress, setProgress] = useState(0)

  // Initialize animation
  useEffect(() => {
    if (ref.current) {
      ref.current.setSpeed(speed)
      ref.current.setDirection(direction === 'forward' ? 1 : -1)
      
      // Get total frames
      const duration = ref.current.getDuration(true)
      if (duration) {
        setTotalFrames(Math.floor(duration))
      }

      if (autoplay) {
        ref.current.play()
        setState('playing')
      }
    }
  }, [autoplay, speed, direction])

  // Animation controls
  const play = useCallback(() => {
    ref.current?.play()
    setState('playing')
  }, [])

  const pause = useCallback(() => {
    ref.current?.pause()
    setState('paused')
  }, [])

  const stop = useCallback(() => {
    ref.current?.stop()
    setState('stopped')
    setCurrentFrame(0)
    setProgress(0)
  }, [])

  const setSpeed = useCallback((newSpeed: number) => {
    ref.current?.setSpeed(newSpeed)
  }, [])

  const setDirection = useCallback((dir: AnimationDirection) => {
    ref.current?.setDirection(dir === 'forward' ? 1 : -1)
  }, [])

  const goToFrame = useCallback((frame: number, isFrame = true) => {
    ref.current?.goToAndStop(frame, isFrame)
    setCurrentFrame(frame)
    if (totalFrames > 0) {
      setProgress((frame / totalFrames) * 100)
    }
  }, [totalFrames])

  const goToAndPlay = useCallback((frame: number, isFrame = true) => {
    ref.current?.goToAndPlay(frame, isFrame)
    setState('playing')
  }, [])

  const goToAndStop = useCallback((frame: number, isFrame = true) => {
    ref.current?.goToAndStop(frame, isFrame)
    setState('stopped')
  }, [])

  const playSegments = useCallback((
    segments: [number, number] | [number, number][], 
    forceFlag = false
  ) => {
    ref.current?.playSegments(segments, forceFlag)
    setState('playing')
  }, [])

  const setSubframe = useCallback((useSubFrames: boolean) => {
    ref.current?.setSubframe(useSubFrames)
  }, [])

  const getDuration = useCallback((inFrames = false) => {
    return ref.current?.getDuration(inFrames) || 0
  }, [])

  const destroy = useCallback(() => {
    ref.current?.destroy()
    setState('stopped')
  }, [])

  return {
    ref,
    state,
    currentFrame,
    totalFrames,
    progress,
    isPlaying: state === 'playing',
    isPaused: state === 'paused',
    isStopped: state === 'stopped',
    play,
    pause,
    stop,
    setSpeed,
    setDirection,
    goToFrame,
    goToAndPlay,
    goToAndStop,
    playSegments,
    setSubframe,
    getDuration,
    destroy,
  }
}

// Hook for scroll-triggered animations
export function useScrollLottieAnimation(
  options: UseLottieAnimationOptions & { 
    threshold?: number
    rootMargin?: string 
  } = {}
) {
  const { threshold = 0.5, rootMargin = '0px', ...animationOptions } = options
  const animation = useLottieAnimation({ ...animationOptions, autoplay: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            animation.play()
            hasTriggered.current = true
          }
        })
      },
      { threshold, rootMargin }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [animation, threshold, rootMargin])

  return {
    ...animation,
    containerRef,
  }
}

// Hook for hover-triggered animations
export function useHoverLottieAnimation(
  options: UseLottieAnimationOptions & {
    playOnEnter?: boolean
    reverseOnLeave?: boolean
    segment?: [number, number]
  } = {}
) {
  const { 
    playOnEnter = true, 
    reverseOnLeave = false,
    segment,
    ...animationOptions 
  } = options
  
  const animation = useLottieAnimation({ ...animationOptions, autoplay: false })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    if (playOnEnter) {
      animation.setDirection('forward')
      if (segment) {
        animation.playSegments(segment, true)
      } else {
        animation.play()
      }
    }
  }, [playOnEnter, segment, animation])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (reverseOnLeave) {
      animation.setDirection('reverse')
      animation.play()
    } else {
      animation.stop()
    }
  }, [reverseOnLeave, animation])

  return {
    ...animation,
    isHovering,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}

// Hook for click-triggered animations
export function useClickLottieAnimation(
  options: UseLottieAnimationOptions & {
    toggleOnClick?: boolean
    segment?: [number, number]
  } = {}
) {
  const { 
    toggleOnClick = true, 
    segment,
    ...animationOptions 
  } = options
  
  const animation = useLottieAnimation({ ...animationOptions, autoplay: false })

  const handleClick = useCallback(() => {
    if (toggleOnClick) {
      if (animation.isPlaying) {
        animation.pause()
      } else {
        if (segment) {
          animation.playSegments(segment, true)
        } else {
          animation.play()
        }
      }
    } else {
      animation.stop()
      if (segment) {
        animation.playSegments(segment, true)
      } else {
        animation.play()
      }
    }
  }, [toggleOnClick, segment, animation])

  return {
    ...animation,
    clickProps: {
      onClick: handleClick,
    },
  }
}

export default useLottieAnimation
