// src/components/why-help-section.tsx
import { motion } from 'framer-motion'
import { SectionPhoto } from './section-photo'

interface NeedRow {
  need: string
  why: string
}

const rows: NeedRow[] = [
  {
    need: 'Stages intensifs (notamment à Barcelone)',
    why: 'Renforcer motricité, posture et autonomie au-delà du quotidien.',
  },
  {
    need: 'Kinésithérapie, psychomotricité, orthophonie',
    why: 'Accompagner le développement jour après jour, avec régularité.',
  },
  {
    need: 'Poussette médicalisée',
    why: 'Faciliter les déplacements et le confort dans la durée.',
  },
  {
    need: 'Outil de communication (tablette, contrôle du regard)',
    why: 'Donner d’autres voies pour exprimer besoins, envies, présence.',
  },
  {
    need: 'Frais de déplacement et de logement',
    why: 'Rendre possibles les soins spécialisés loin du domicile.',
  },
]

export function WhyHelpSection() {
  return (
    <section
      id="pourquoi"
      className="bg-linear-to-b from-ivory via-paper to-cream px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 grid items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
              Concret
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Pourquoi aider ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted md:mx-0">
              Les dons ne remplacent pas l’amour — ils l’épaulent. Voici où va
              l’énergie, le temps et l’argent que la famille investit déjà.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl bg-paper">
            <SectionPhoto n={17} className="aspect-video w-full object-contain" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((row, index) => (
            <motion.article
              key={row.need}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="flex flex-col rounded-xl border border-linen border-t-2 border-t-orange bg-paper p-6 text-left shadow-sm"
            >
              <h3 className="font-display text-lg text-ink">{row.need}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {row.why}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="mx-auto mt-10 max-w-3xl rounded-xl border border-blue/12 bg-blue-soft/50 px-6 py-5 text-center font-display text-xl italic leading-snug text-ink sm:text-2xl"
        >
          Pour beaucoup d’enfants, s’asseoir, manger ou se déplacer sont des
          étapes naturelles. Pour Kaïron, ce sont des montagnes. Votre aide peut
          l’aider à les gravir — sans spectacle, avec respect.
        </motion.p>
      </div>
    </section>
  )
}
