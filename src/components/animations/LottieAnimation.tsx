'use client'

import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useInView } from 'framer-motion'
import type { 
  LottieAnimationProps, 
  AnimationController, 
  AnimationDirection,
  AnimationState 
} from '@/types/lottie'

export interface LottieAnimationHandle extends AnimationController {
  getState: () => AnimationState
  getRef: () => LottieRefCurrentProps | null
}

const LottieAnimation = forwardRef<LottieAnimationHandle, LottieAnimationProps>(({
  // Animation source
  animationData,
  name = 'animation',
  
  // Playback settings
  autoplay = true,
  loop = true,
  speed = 1,
  direction = 'forward',
  
  // Trigger settings
  trigger = 'autoplay',
  
  // Visual settings
  width,
  height,
  className = '',
  
  // Segments
  initialSegment,
  hoverSegment,
  clickSegment,
  
  // Renderer settings
  preserveAspectRatio = 'xMidYMid slice',
  rendererSettings,
  
  // Callbacks
  onComplete,
  onLoopComplete,
  onEnterFrame,
  onReady,
  onDataReady,
  onDOMLoaded,
  onDestroy,
}, ref) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationState, setAnimationState] = useState<AnimationState>('stopped')
  const [isHovering, setIsHovering] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  
  // Check if in view for scroll trigger
  const isInView = useInView(containerRef, { 
    once: trigger === 'scroll',
    margin: '-10%'
  })

  // Animation control functions
  const play = useCallback(() => {
    lottieRef.current?.play()
    setAnimationState('playing')
  }, [])

  const pause = useCallback(() => {
    lottieRef.current?.pause()
    setAnimationState('paused')
  }, [])

  const stop = useCallback(() => {
    lottieRef.current?.stop()
    setAnimationState('stopped')
  }, [])

  const setSpeedValue = useCallback((newSpeed: number) => {
    lottieRef.current?.setSpeed(newSpeed)
  }, [])

  const setDirectionValue = useCallback((dir: AnimationDirection) => {
    lottieRef.current?.setDirection(dir === 'forward' ? 1 : -1)
  }, [])

  const goToFrame = useCallback((frame: number, isFrame = true) => {
    lottieRef.current?.goToAndStop(frame, isFrame)
  }, [])

  const goToAndPlay = useCallback((frame: number, isFrame = true) => {
    lottieRef.current?.goToAndPlay(frame, isFrame)
    setAnimationState('playing')
  }, [])

  const goToAndStop = useCallback((frame: number, isFrame = true) => {
    lottieRef.current?.goToAndStop(frame, isFrame)
    setAnimationState('stopped')
  }, [])

  const playSegments = useCallback((
    segments: [number, number] | [number, number][], 
    forceFlag = false
  ) => {
    lottieRef.current?.playSegments(segments, forceFlag)
    setAnimationState('playing')
  }, [])

  const setSubframe = useCallback((useSubFrames: boolean) => {
    lottieRef.current?.setSubframe(useSubFrames)
  }, [])

  const getDuration = useCallback((inFrames = false) => {
    return lottieRef.current?.getDuration(inFrames) || 0
  }, [])

  const destroy = useCallback(() => {
    lottieRef.current?.destroy()
    onDestroy?.()
  }, [onDestroy])

  // Expose controller methods via ref
  useImperativeHandle(ref, () => ({
    play,
    pause,
    stop,
    setSpeed: setSpeedValue,
    setDirection: setDirectionValue,
    goToFrame,
    goToAndPlay,
    goToAndStop,
    playSegments,
    setSubframe,
    getDuration,
    destroy,
    getState: () => animationState,
    getRef: () => lottieRef.current,
  }), [
    play, pause, stop, setSpeedValue, setDirectionValue,
    goToFrame, goToAndPlay, goToAndStop, playSegments,
    setSubframe, getDuration, destroy, animationState
  ])

  // Handle initial setup
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed)
      lottieRef.current.setDirection(direction === 'forward' ? 1 : -1)
      onReady?.(lottieRef.current)
    }
  }, [speed, direction, onReady])

  // Handle trigger-based playback
  useEffect(() => {
    if (!lottieRef.current) return

    switch (trigger) {
      case 'autoplay':
        if (autoplay) {
          play()
        }
        break
      
      case 'scroll':
        if (isInView && !hasPlayed) {
          play()
          setHasPlayed(true)
        }
        break
      
      case 'manual':
        // Do nothing - controlled externally
        break
      
      default:
        break
    }
  }, [trigger, autoplay, isInView, hasPlayed, play])

  // Handle hover interactions
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    
    if (trigger === 'hover') {
      if (hoverSegment) {
        playSegments(hoverSegment, true)
      } else {
        play()
      }
    }
  }, [trigger, hoverSegment, playSegments, play])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    
    if (trigger === 'hover') {
      if (hoverSegment) {
        // Play reverse or stop
        lottieRef.current?.setDirection(-1)
        play()
      } else {
        stop()
      }
    }
  }, [trigger, hoverSegment, play, stop])

  // Handle click interactions
  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      if (clickSegment) {
        playSegments(clickSegment, true)
      } else {
        if (animationState === 'playing') {
          pause()
        } else {
          play()
        }
      }
    }
  }, [trigger, clickSegment, animationState, playSegments, pause, play])

  // Event handlers for Lottie
  const handleComplete = useCallback(() => {
    setAnimationState('stopped')
    onComplete?.()
  }, [onComplete])

  const handleLoopComplete = useCallback(() => {
    onLoopComplete?.()
  }, [onLoopComplete])

  const handleEnterFrame = useCallback((event: unknown) => {
    const frameEvent = event as { currentTime?: number }
    if (frameEvent?.currentTime !== undefined) {
      onEnterFrame?.(Math.floor(frameEvent.currentTime))
    }
  }, [onEnterFrame])

  const handleDataReady = useCallback(() => {
    onDataReady?.()
  }, [onDataReady])

  const handleDOMLoaded = useCallback(() => {
    onDOMLoaded?.()
  }, [onDOMLoaded])

  // Style object
  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || '100%',
  }

  // Determine autoplay based on trigger
  const shouldAutoplay = trigger === 'autoplay' && autoplay

  return (
    <div
      ref={containerRef}
      className={`lottie-animation-container ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-animation-name={name}
      data-animation-state={animationState}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={shouldAutoplay}
        initialSegment={initialSegment}
        rendererSettings={{
          preserveAspectRatio,
          progressiveLoad: true,
          hideOnTransparent: true,
          ...rendererSettings,
        }}
        onComplete={handleComplete}
        onLoopComplete={handleLoopComplete}
        onEnterFrame={handleEnterFrame}
        onDataReady={handleDataReady}
        onDOMLoaded={handleDOMLoaded}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
})

LottieAnimation.displayName = 'LottieAnimation'

export default LottieAnimation
