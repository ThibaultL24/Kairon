// src/pages/site-page.tsx
import { AboutKaironSection } from '../components/about-kairon-section'
import { ArticlesSection } from '../components/articles-section'
import { DonateCtaSection } from '../components/donate-cta-section'
import { EventsSection } from '../components/events-section'
import { GallerySection } from '../components/gallery-section'
import { GoalSection } from '../components/goal-section'
import { Grin2bSection } from '../components/grin2b-section'
import { HeroSection } from '../components/hero-section'
import { SectionWaveDivider } from '../components/section-wave-divider'
import { ShareSection } from '../components/share-section'
import { SiteFooter } from '../components/site-footer'
import { SiteHeader } from '../components/site-header'
import { StoryTimelineSection } from '../components/story-timeline-section'
import { TestimonySection } from '../components/testimony-section'
import { WhyHelpSection } from '../components/why-help-section'
import { useSiteData } from '../hooks/use-admin'

export function SitePage() {
  const { sections } = useSiteData()

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
        {sections.accueil ? (
          <>
            <HeroSection />
            <SectionWaveDivider bgClass="bg-ivory" waveClass="text-leaf" fillOpacity={0.22} />
          </>
        ) : null}

        {sections.qui ? (
          <>
            <AboutKaironSection />
            <SectionWaveDivider bgClass="bg-ivory" waveClass="text-forest" fillOpacity={0.18} />
          </>
        ) : null}

        {sections.histoire ? (
          <>
            <StoryTimelineSection />
            <SectionWaveDivider bgClass="bg-ivory" waveClass="text-leaf" fillOpacity={0.2} />
          </>
        ) : null}

        {sections.comprendre ? (
          <>
            <Grin2bSection />
            <SectionWaveDivider
              bgClass="bg-linear-to-b from-ivory via-mist/80 to-mint/90"
              waveClass="text-moss"
              fillOpacity={0.2}
            />
          </>
        ) : null}

        {sections.pourquoi ? (
          <>
            <WhyHelpSection />
            <SectionWaveDivider bgClass="bg-cream" waveClass="text-leaf" fillOpacity={0.22} />
          </>
        ) : null}

        {sections.objectif ? (
          <>
            <GoalSection />
            <SectionWaveDivider bgClass="bg-ivory" waveClass="text-forest" fillOpacity={0.16} />
          </>
        ) : null}

        {sections.evenements ? (
          <>
            <EventsSection />
            <SectionWaveDivider bgClass="bg-mist" waveClass="text-orange" fillOpacity={0.2} />
          </>
        ) : null}

        {sections.articles ? (
          <>
            <ArticlesSection />
            <SectionWaveDivider bgClass="bg-ivory" waveClass="text-leaf" fillOpacity={0.18} />
          </>
        ) : null}

        {sections.don ? (
          <>
            <DonateCtaSection />
            <SectionWaveDivider
              bgClass="bg-forest"
              waveClass="text-mint-off"
              fillOpacity={1}
              heightClass="h-16 sm:h-18"
            />
          </>
        ) : null}

        {sections.temoignage ? (
          <>
            <TestimonySection />
            <SectionWaveDivider bgClass="bg-cream" waveClass="text-leaf" fillOpacity={0.22} />
          </>
        ) : null}

        {sections.galerie ? (
          <>
            <GallerySection />
            <SectionWaveDivider bgClass="bg-ivory" waveClass="text-moss" fillOpacity={0.2} />
          </>
        ) : null}

        {sections.partager ? (
          <>
            <ShareSection />
            <SectionWaveDivider bgClass="bg-paper" waveClass="text-leaf" fillOpacity={0.18} />
          </>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  )
}
