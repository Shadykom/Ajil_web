'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AjilLogoAnimated,
  AjilLoadingSpinner,
  AjilSuccessAnimation,
  AjilPulseAnimation,
  AjilConfettiAnimation,
  AjilProgressBar,
} from './AjilAnimations'
import type { LottieAnimationHandle } from './LottieAnimation'

/**
 * Animation Demo Component
 * 
 * This component showcases all available AJIL Lottie animations
 * with interactive controls for testing and demonstration.
 */
export default function AnimationDemo() {
  const confettiRef = useRef<LottieAnimationHandle>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePlayConfetti = () => {
    confettiRef.current?.stop()
    confettiRef.current?.play()
  }

  const handleShowSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          AJIL Lottie Animations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo Animation */}
          <AnimationCard
            title="Logo Animation"
            description="Animated AJIL V symbol with draw effect"
          >
            <AjilLogoAnimated variant="default" trigger="hover" />
          </AnimationCard>

          {/* Loading Spinner */}
          <AnimationCard
            title="Loading Spinner"
            description="Spinning loader with AJIL branding"
          >
            <AjilLoadingSpinner size={60} />
          </AnimationCard>

          {/* Success Animation */}
          <AnimationCard
            title="Success Animation"
            description="Animated checkmark for confirmations"
          >
            <div className="flex flex-col items-center gap-4">
              {showSuccess ? (
                <AjilSuccessAnimation size={80} />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Click below</span>
                </div>
              )}
              <button
                onClick={handleShowSuccess}
                className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Play Success
              </button>
            </div>
          </AnimationCard>

          {/* Pulse Animation */}
          <AnimationCard
            title="Pulse Animation"
            description="Hover over the icon to see pulse effect"
          >
            <AjilPulseAnimation size={100} trigger="hover">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </AjilPulseAnimation>
          </AnimationCard>

          {/* Confetti Animation */}
          <AnimationCard
            title="Confetti Celebration"
            description="Celebration animation for achievements"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32">
                <AjilConfettiAnimation
                  ref={confettiRef}
                  size={128}
                  trigger="manual"
                />
              </div>
              <button
                onClick={handlePlayConfetti}
                className="px-4 py-2 bg-secondary-500 text-white rounded-lg text-sm font-medium hover:bg-secondary-600 transition-colors"
              >
                🎉 Celebrate!
              </button>
            </div>
          </AnimationCard>

          {/* Progress Bar */}
          <AnimationCard
            title="Progress Bar"
            description="Scroll-triggered progress animation"
          >
            <AjilProgressBar width={250} height={24} trigger="scroll" />
          </AnimationCard>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Usage Examples</h3>
          
          <div className="space-y-6">
            <CodeExample
              title="Basic Logo Animation"
              code={`import { AjilLogoAnimated } from '@/components/animations'

<AjilLogoAnimated 
  variant="default" 
  trigger="hover"
  onComplete={() => console.log('Animation complete!')}
/>`}
            />

            <CodeExample
              title="Loading Spinner"
              code={`import { AjilLoadingSpinner } from '@/components/animations'

// In a button
<button disabled={isLoading}>
  {isLoading ? <AjilLoadingSpinner size={20} /> : 'Submit'}
</button>`}
            />

            <CodeExample
              title="Using Animation Hooks"
              code={`import { useHoverLottieAnimation } from '@/hooks'
import { ajilAnimations } from '@/components/animations'

function MyComponent() {
  const { ref, hoverProps, isPlaying } = useHoverLottieAnimation({
    reverseOnLeave: true,
  })
  
  return (
    <div {...hoverProps}>
      <Lottie 
        lottieRef={ref} 
        animationData={ajilAnimations.pulse} 
      />
    </div>
  )
}`}
            />

            <CodeExample
              title="Custom Animation Control"
              code={`import { useRef } from 'react'
import { LottieAnimation, LottieAnimationHandle } from '@/components/animations'
import { ajilAnimations } from '@/components/animations'

function MyComponent() {
  const animRef = useRef<LottieAnimationHandle>(null)
  
  const handlePlay = () => {
    animRef.current?.play()
  }
  
  const handlePause = () => {
    animRef.current?.pause()
  }
  
  return (
    <>
      <LottieAnimation
        ref={animRef}
        animationData={ajilAnimations.logo}
        trigger="manual"
        loop={false}
      />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </>
  )
}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper Components
function AnimationCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{description}</p>
      <div className="flex items-center justify-center min-h-[120px]">
        {children}
      </div>
    </motion.div>
  )
}

function CodeExample({ title, code }: { title: string; code: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
