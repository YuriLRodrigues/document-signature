import { LeftHeroSection } from './left-section'
import { RightHeroSection } from './right-section'

export const Hero = () => {
  return (
    <section className="from-background to-muted grid min-h-full w-full gap-6 bg-gradient-to-b px-4 py-12 md:py-24 lg:grid-cols-2 lg:py-32 xl:py-48">
      <LeftHeroSection />
      <RightHeroSection />
    </section>
  )
}
