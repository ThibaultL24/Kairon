// src/components/goal-section.tsx
import { motion } from 'framer-motion'
import { SectionPhoto } from './section-photo'
import {
  collectedEuros,
  goalEuros,
} from '../config/site-config'

function formatEuros(n: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function GoalSection() {
  const pct = Math.min(
    100,
    goalEuros > 0 ? Math.round((collectedEuros / goalEuros) * 100) : 0,
  )

  return (
    <section
      id="objectif"
      className="bg-linear-to-br from-mint/70 via-mist to-pale-sage/35 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="md:order-2 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                Transparence
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                Objectif de la cagnotte
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted sm:text-[1.05rem]">
                Les dons à l’association « Un souffle d’espoir pour Kaïron »
                financent environ{' '}
                <span className="font-semibold text-ink">
                  deux stages intensifs par an
                </span>
                , du matériel adapté et les frais non remboursés liés au parcours
                de Kaïron. Les montants affichés pourront être affinés avec
                l’association : mieux vaut une estimation honnête qu’un appel
                flou.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl bg-paper md:order-1">
              <SectionPhoto n={8} className="aspect-video w-full object-contain" />
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-sage/35 bg-paper p-6 text-left shadow-md shadow-forest/10">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">
                  Suivi indicatif
                </p>
                <p className="mt-1 font-display text-2xl text-ink">
                  <span className="text-amber-soft">{formatEuros(collectedEuros)}</span>{' '}
                  <span className="text-base font-body text-muted">
                    collectés sur {formatEuros(goalEuros)}
                  </span>
                </p>
              </div>
              <p className="rounded-md border border-leaf/40 bg-mint/80 px-2.5 py-1 text-sm font-semibold text-forest">
                {pct} %
              </p>
            </div>
            <div
              className="mt-4 h-3 overflow-hidden rounded-full bg-cream ring-1 ring-linen"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression vers l’objectif de la cagnotte"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-linear-to-r from-leaf via-moss to-pale-sage"
              />
            </div>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-muted">
            Chaque don, même modeste, contribue aux soins, au matériel et aux
            stages. 5 €, 10 €, 20 € ou plus : chaque geste compte.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
