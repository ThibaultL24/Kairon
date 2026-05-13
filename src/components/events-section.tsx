// src/components/events-section.tsx
import { motion } from 'framer-motion'
import { associationHelloAssoUrl, upcomingEvents } from '../config/site-config'

export function EventsSection() {
  return (
    <section
      id="evenements"
      className="bg-linear-to-b from-mint/90 via-mist to-ivory px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-deep">
            Association
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Projets & événements à venir
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Rencontrez-nous sur nos actions : les fonds collectés par l’association
            « Un souffle d’espoir pour Kaïron » financent directement les besoins de
            Kaïron (stages, matériel, déplacements).
          </p>
          <p className="mx-auto mt-5 max-w-2xl">
            <a
              href={associationHelloAssoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-leaf/40 bg-mint/70 px-4 py-2.5 text-sm font-semibold text-forest shadow-sm transition hover:border-leaf/60 hover:bg-mint"
            >
              Voir l’association sur HelloAsso
              <span aria-hidden className="text-xs opacity-80">
                ↗
              </span>
            </a>
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {upcomingEvents.map((event, index) => (
            <motion.li
              key={event.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex flex-col rounded-xl border border-sage/35 border-t-2 border-t-sage bg-paper/85 p-6 text-left shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-sage-deep">
                {event.dateLabel}
              </p>
              <h3 className="mt-2 font-display text-xl text-ink">{event.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{event.detail}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
