import { Suspense } from 'react'

import { Features } from './components/features/features'
import { Hero } from './components/hero'
import { HowItWorks } from './components/how-it-works'
import { Footer } from '@/components/layout/home/footer/footer'
import { HomeHeader, HomeHeaderSkeleton } from '@/components/layout/home/header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<HomeHeaderSkeleton />}>
        <HomeHeader />
      </Suspense>

      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  )
}
