// src/components/events-section.tsx
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'
import { resolveAssociationUrl } from '../lib/resolve-urls'

export function EventsSection() {
  const { events, urls } = useSiteData()
  const associationHelloAssoUrl = resolveAssociationUrl(urls.associationHelloAsso)

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
            {events.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            {events.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {events.intro}
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

        <ul className="mt-10 grid gap-6">
          {events.items.length === 0 ? (
            <li className="rounded-xl border border-dashed border-sage/35 bg-paper/70 p-8 text-center text-muted">
              Aucun événement annoncé pour le moment.
            </li>
          ) : null}
          {events.items.map((event, index) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="overflow-hidden rounded-xl border border-sage/35 border-t-2 border-t-sage bg-paper/85 shadow-sm"
            >
              {event.posterSrc ? (
                <img
                  src={event.posterSrc}
                  alt={event.posterAlt ?? event.title}
                  className="w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div className="p-6 text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-sage-deep">
                  {event.dateLabel}
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{event.detail}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
