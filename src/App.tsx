// src/App.tsx
import { AboutKaironSection } from './components/about-kairon-section'
import { DonateCtaSection } from './components/donate-cta-section'
import { GallerySection } from './components/gallery-section'
import { GoalSection } from './components/goal-section'
import { Grin2bSection } from './components/grin2b-section'
import { HeroSection } from './components/hero-section'
import { ShareSection } from './components/share-section'
import { SiteFooter } from './components/site-footer'
import { SiteHeader } from './components/site-header'
import { StoryTimelineSection } from './components/story-timeline-section'
import { TestimonySection } from './components/testimony-section'
import { WhyHelpSection } from './components/why-help-section'

function SectionWave() {
  return (
    <div
      aria-hidden
      className="relative h-14 w-full overflow-hidden bg-ivory"
    >
      <svg
        className="absolute bottom-0 left-0 w-[120%] max-w-none -translate-x-[8%] text-blue sm:w-full sm:translate-x-0"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          fillOpacity="0.12"
          d="M0,28 C220,60 460,6 720,24 C980,42 1220,8 1440,32 L1440,64 L0,64 Z"
        />
      </svg>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-svh text-ink">
      <a
        href="#accueil"
        className="fixed left-4 top-0 z-[100] -translate-y-full rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink shadow-md ring-1 ring-linen transition focus-visible:translate-y-4 focus-visible:outline-none"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main>
        <HeroSection />
        <SectionWave />
        <AboutKaironSection />
        <StoryTimelineSection />
        <Grin2bSection />
        <WhyHelpSection />
        <GoalSection />
        <DonateCtaSection />
        <TestimonySection />
        <GallerySection />
        <ShareSection />
      </main>
      <SiteFooter />
    </div>
  )
}
