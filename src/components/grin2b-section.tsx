// src/components/grin2b-section.tsx
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'
import { SectionPhoto } from './section-photo'

export function Grin2bSection() {
  const { grin2b } = useSiteData()

  return (
    <section
      id="comprendre"
      className="border-t border-sage/30 bg-linear-to-r from-mist via-ivory to-mint-off px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-sage/40 bg-paper p-8 shadow-sm sm:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="md:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {grin2b.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {grin2b.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{grin2b.paragraph1}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{grin2b.paragraph2}</p>
            </div>
            <div className="overflow-hidden rounded-xl bg-ivory/60 md:order-1">
              <SectionPhoto n={grin2b.photoNumber} className="aspect-video w-full object-contain" />
            </div>
          </div>
          <blockquote className="mt-8 border-l-4 border-l-orange bg-ivory px-5 py-4 text-left text-[1.02rem] italic leading-relaxed text-muted">
            {grin2b.quote}
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
