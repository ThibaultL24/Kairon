// src/components/site-header.tsx
import { motion } from 'framer-motion'
import {
  associationHelloAssoUrl,
  kaironLogoAlt,
  kaironLogoSrc,
} from '../config/site-config'

const navItems = [
  { id: 'qui', label: 'Qui est Kaïron ?' },
  { id: 'histoire', label: 'Son histoire' },
  { id: 'comprendre', label: 'GRIN2B' },
  { id: 'pourquoi', label: 'Pourquoi aider' },
  { id: 'objectif', label: 'Objectif' },
  { id: 'evenements', label: 'Événements' },
  { id: 'don', label: 'Faire un don' },
  { id: 'temoignage', label: 'Témoignage' },
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
      className="sticky top-0 z-40 border-b border-sage/25 bg-mist/92 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center gap-x-1 overflow-x-auto overscroll-x-contain px-3 py-2 [scrollbar-width:none] sm:gap-x-2 sm:px-6 sm:py-2.5 [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => scrollToId('accueil')}
          className="shrink-0 font-display text-lg tracking-tight text-ink sm:text-2xl"
        >
          Kaïron
        </button>
        <a
          href={associationHelloAssoUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Un souffle d’espoir pour Kaïron — page HelloAsso"
          className="shrink-0 rounded-md transition hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          <img
            src={kaironLogoSrc}
            alt={kaironLogoAlt}
            className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            width={36}
            height={36}
            decoding="async"
          />
        </a>
        <span
          aria-hidden
          className="mx-0.5 h-5 w-px shrink-0 bg-sage/35 sm:mx-1"
        />
        <nav
          aria-label="Navigation principale"
          className="flex shrink-0 flex-nowrap items-center gap-x-0.5 sm:gap-x-1"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className="shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-xs text-muted transition hover:bg-mint/90 hover:text-forest sm:px-2.5 sm:text-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
