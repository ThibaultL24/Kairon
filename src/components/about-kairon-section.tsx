// src/components/about-kairon-section.tsx
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'
import { resolveAssociationUrl } from '../lib/resolve-urls'
import { SectionPhoto } from './section-photo'

export function AboutKaironSection() {
  const { about, urls } = useSiteData()
  const associationHelloAssoUrl = resolveAssociationUrl(urls.associationHelloAsso)

  return (
    <section
      id="qui"
      className="bg-linear-to-b from-mist/80 to-cream px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-sage/40 bg-paper p-8 shadow-sm sm:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="overflow-hidden">
              <SectionPhoto n={about.photoNumber} className="max-h-104 w-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                {about.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {about.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted sm:text-[1.05rem]">
                {about.paragraph1}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted sm:text-[1.05rem]">
                {about.paragraph2}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {about.associationNote}{' '}
                <a
                  href={associationHelloAssoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-leaf underline decoration-leaf/40 underline-offset-2 hover:text-forest"
                >
                  HelloAsso ↗
                </a>
              </p>
              {about.photoNote ? (
                <p className="mt-4 text-sm italic leading-relaxed text-muted">
                  {about.photoNote}
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
