// src/components/story-timeline-section.tsx
import { motion } from 'framer-motion'
import { SectionPhoto } from './section-photo'

interface TimelineEntry {
  title: string
  body: string
}

const entries: TimelineEntry[] = [
  {
    title: 'Naissance',
    body: "Les premiers signes apparaissent très tôt : pleurs intenses, épisodes où il arrête de respirer, besoin constant de contact. L'alimentation devient vite compliquée ; les nuits, presque absentes.",
  },
  {
    title: 'Trois semaines',
    body: "Un malaise devant la pédiatre mène aux urgences. En pleine période Covid, la famille affronte seule l'hôpital, les examens, l'inconnu. Puis vient l'urgence : Kaïron doit être transféré en hélicoptère vers un centre spécialisé — un moment si brutal pour des jeunes parents qu'il dépasse ce qu'on peut exprimer avec des mots.",
  },
  {
    title: 'Les premiers mois',
    body: "Hospitalisations, prises de sang, imagerie, EEG, ponctions, tests génétiques… Kaïron endure tout, tout petit et déjà très fort. Une alimentation par sonde s'impose ; le tonus et le regard posent question.",
  },
  {
    title: 'Le diagnostic',
    body: "Après de longs mois d'attente : une mutation du gène GRIN2B. Une réponse, mais peu de certitudes sur la parole, la marche ou l'ampleur des progrès possibles — une famille qui choisit malgré tout de se battre.",
  },
  {
    title: "Aujourd'hui",
    body: "Stages intensifs à l'étranger (notamment en Espagne), matériel adapté, séances spécialisées, et la présence du papa, de la maman, de la mamie, et de Louciana — sa petite sœur — qui applaudit chaque petit pas et célèbre chaque victoire. Kaïron avance, un jour après l'autre.",
  },
]

export function StoryTimelineSection() {
  return (
    <section
      id="histoire"
      className="bg-linear-to-b from-mist via-paper/80 to-ivory px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 md:grid-cols-2">

          {/* Colonne gauche : titre + timeline */}
          <div>
            <div className="mb-8 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                Parcours
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                Son histoire, en quelques étapes
              </h2>
            </div>

            <ol className="space-y-4">
              {entries.map((entry, index) => (
                <motion.li
                  key={entry.title}
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

          {/* Colonne droite : photo collante */}
          <div className="md:sticky md:top-24">
            <SectionPhoto
              n={24}
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
