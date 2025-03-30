import { BottomFeaturesSection } from './bottom-section'
import { TopFeaturesSection } from './top-section'

export const Features = () => {
  return (
    <section className="bg-background w-full px-4 py-12 md:py-24 lg:py-32">
      <TopFeaturesSection />
      <BottomFeaturesSection />
    </section>
  )
}
