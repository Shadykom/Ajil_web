'use client'

import { 
  createContext, 
  useContext, 
  useCallback, 
  useRef, 
  ReactNode 
} from 'react'
import type { LottieRefCurrentProps } from 'lottie-react'
import type { AnimationContextState } from '@/types/lottie'

const AnimationContext = createContext<AnimationContextState | null>(null)

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const animationsRef = useRef<Map<string, LottieRefCurrentProps>>(new Map())

  const registerAnimation = useCallback((id: string, ref: LottieRefCurrentProps) => {
    animationsRef.current.set(id, ref)
  }, [])

  const unregisterAnimation = useCallback((id: string) => {
    animationsRef.current.delete(id)
  }, [])

  const playAnimation = useCallback((id: string) => {
    const animation = animationsRef.current.get(id)
    if (animation) {
      animation.play()
    }
  }, [])

  const pauseAnimation = useCallback((id: string) => {
    const animation = animationsRef.current.get(id)
    if (animation) {
      animation.pause()
    }
  }, [])

  const stopAnimation = useCallback((id: string) => {
    const animation = animationsRef.current.get(id)
    if (animation) {
      animation.stop()
    }
  }, [])

  const playAll = useCallback(() => {
    animationsRef.current.forEach((animation) => {
      animation.play()
    })
  }, [])

  const pauseAll = useCallback(() => {
    animationsRef.current.forEach((animation) => {
      animation.pause()
    })
  }, [])

  const stopAll = useCallback(() => {
    animationsRef.current.forEach((animation) => {
      animation.stop()
    })
  }, [])

  const value: AnimationContextState = {
    animations: animationsRef.current,
    registerAnimation,
    unregisterAnimation,
    playAnimation,
    pauseAnimation,
    stopAnimation,
    playAll,
    pauseAll,
    stopAll,
  }

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimationContext() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider')
  }
  return context
}

export default AnimationContext
