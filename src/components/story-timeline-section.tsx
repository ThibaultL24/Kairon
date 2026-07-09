// src/components/story-timeline-section.tsx
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'
import { SectionPhoto } from './section-photo'

export function StoryTimelineSection() {
  const { story } = useSiteData()

  return (
    <section
      id="histoire"
      className="bg-linear-to-b from-mist via-paper/80 to-ivory px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <div className="mb-8 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                {story.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {story.title}
              </h2>
            </div>

            <ol className="space-y-4">
              {story.entries.map((entry, index) => (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded-xl border-y border-r border-linen border-l-[3px] border-l-orange bg-paper px-5 py-4 shadow-sm"
                >
                  <h3 className="font-display text-xl text-ink">{entry.title}</h3>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">
                    {entry.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="md:sticky md:top-24">
            <SectionPhoto n={story.photoNumber} className="w-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
