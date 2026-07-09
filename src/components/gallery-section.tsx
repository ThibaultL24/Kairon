// src/components/gallery-section.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'

export function GallerySection() {
  const { gallery } = useSiteData()
  const photos = gallery.photoNumbers
  const total = photos.length
  const [lightbox, setLightbox] = useState<number | null>(null)

  function prev() {
    setLightbox((index) => {
      if (index === null) return null
      return index === 0 ? total - 1 : index - 1
    })
  }

  function next() {
    setLightbox((index) => {
      if (index === null) return null
      return index === total - 1 ? 0 : index + 1
    })
  }

  if (total === 0) return null

  return (
    <section
      id="galerie"
      className="bg-linear-to-b from-mint via-mist to-ivory px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
            {gallery.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            {gallery.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{gallery.intro}</p>
        </div>

        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
          {photos.map((n, index) => (
            <motion.button
              key={`${index}-${n}`}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
              onClick={() => setLightbox(index)}
              className="mb-3 block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              <img
                src={`/kairon${n}.jpeg`}
                alt={`Photo de Kaïron n°${n}`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition duration-300 hover:scale-105 hover:brightness-95"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90svh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/kairon${photos[lightbox]}.jpeg`}
                alt={`Photo de Kaïron n°${photos[lightbox]}`}
                className="max-h-[82svh] max-w-full rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-2 text-center text-sm text-paper/60">
                {lightbox + 1} / {total}
              </p>
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/15 p-3 text-paper hover:bg-paper/30"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/15 p-3 text-paper hover:bg-paper/30"
            >
              ›
            </button>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Fermer"
              className="absolute right-3 top-3 rounded-full bg-paper/15 p-2 text-sm text-paper hover:bg-paper/30"
            >
              ✕
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
