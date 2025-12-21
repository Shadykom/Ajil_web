'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/sections/HeroSlider'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Offers from '@/components/sections/Offers'
import Statistics from '@/components/sections/Statistics'
import News from '@/components/sections/News'
import AppDownload from '@/components/sections/AppDownload'
import Newsletter from '@/components/sections/Newsletter'

export default function ClassicHome() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <Hero />
      <Services />
      <Offers />
      <Statistics />
      <News />
      <AppDownload />
      <Newsletter />
      <Footer />
    </main>
  )
}
