// src/App.tsx
import { AboutKaironSection } from './components/about-kairon-section'
import { DonateCtaSection } from './components/donate-cta-section'
import { GallerySection } from './components/gallery-section'
import { GoalSection } from './components/goal-section'
import { Grin2bSection } from './components/grin2b-section'
import { HeroSection } from './components/hero-section'
import { SectionWaveDivider } from './components/section-wave-divider'
import { ShareSection } from './components/share-section'
import { SiteFooter } from './components/site-footer'
import { SiteHeader } from './components/site-header'
import { StoryTimelineSection } from './components/story-timeline-section'
import { TestimonySection } from './components/testimony-section'
import { WhyHelpSection } from './components/why-help-section'

export default function App() {
  return (
    <div className="min-h-svh text-ink">
      <a
        href="#accueil"
        className="fixed left-4 top-0 z-100 -translate-y-full rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink shadow-md ring-1 ring-linen transition focus-visible:translate-y-4 focus-visible:outline-none"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main>
        <HeroSection />
        <SectionWaveDivider bgClass="bg-ivory" waveClass="text-blue" />

        <AboutKaironSection />
        <SectionWaveDivider bgClass="bg-ivory" waveClass="text-orange" />

        <StoryTimelineSection />
        <SectionWaveDivider bgClass="bg-ivory" waveClass="text-blue" />

        <Grin2bSection />
        <SectionWaveDivider
          bgClass="bg-linear-to-b from-ivory via-paper/35 to-cream/50"
          waveClass="text-blue"
        />

        <WhyHelpSection />
        <SectionWaveDivider bgClass="bg-cream" waveClass="text-blue" />

        <GoalSection />
        <SectionWaveDivider bgClass="bg-ivory" waveClass="text-orange" />

        <DonateCtaSection />
        {/* Bleu uni (même famille que le bas du bloc don) + onde ivory : pas de dégradé grisâtre */}
        <SectionWaveDivider
          bgClass="bg-blue"
          waveClass="text-ivory"
          fillOpacity={1}
          heightClass="h-16 sm:h-18"
        />

        <TestimonySection />
        <SectionWaveDivider bgClass="bg-cream" waveClass="text-blue" />

        <GallerySection />
        <SectionWaveDivider bgClass="bg-ivory" waveClass="text-orange" />

        <ShareSection />
        <SectionWaveDivider bgClass="bg-paper" waveClass="text-blue" />
      </main>
      <SiteFooter />
    </div>
  )
}
