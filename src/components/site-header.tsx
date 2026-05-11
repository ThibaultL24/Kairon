// src/components/site-header.tsx
import { motion } from 'framer-motion'

const navItems = [
  { id: 'qui', label: 'Qui est Kaïron ?' },
  { id: 'histoire', label: 'Son histoire' },
  { id: 'comprendre', label: 'GRIN2B' },
  { id: 'pourquoi', label: 'Pourquoi aider' },
  { id: 'objectif', label: 'Objectif' },
  { id: 'don', label: 'Faire un don' },
  { id: 'temoignage', label: 'Notre témoignage' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'partager', label: 'Partager' },
] as const

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-linen bg-paper/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => scrollToId('accueil')}
          className="font-display text-xl tracking-tight text-ink sm:text-2xl"
        >
          Kaïron
        </button>
        <nav
          aria-label="Navigation principale"
          className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm text-muted"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className="rounded-full px-2.5 py-1 transition hover:bg-blue-soft/70 hover:text-blue"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
