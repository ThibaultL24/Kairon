// src/components/testimony-section.tsx
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'

export function TestimonySection() {
  const { testimony } = useSiteData()

  return (
    <section
      id="temoignage"
      className="bg-linear-to-b from-mist via-mint-off to-ivory px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
            {testimony.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            {testimony.title}
          </h2>
        </motion.div>

        <div className="space-y-5">
          {testimony.paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.3) }}
              className={
                text.length < 60
                  ? 'font-display text-xl italic text-ink'
                  : 'text-lg leading-relaxed text-muted'
              }
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-right font-display text-lg italic text-muted"
        >
          {testimony.signature}
        </motion.p>
      </div>
    </section>
  )
}
