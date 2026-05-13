// src/components/about-kairon-section.tsx
import { motion } from 'framer-motion'
import { associationHelloAssoUrl } from '../config/site-config'
import { SectionPhoto } from './section-photo'

export function AboutKaironSection() {
  return (
    <section
      id="qui"
      className="bg-linear-to-b from-mist/80 to-cream px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-sage/40 bg-paper p-8 shadow-sm sm:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="overflow-hidden">
              <SectionPhoto n={25} className="max-h-104 w-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                Avant les mots du diagnostic
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                Qui est Kaïron ?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted sm:text-[1.05rem]">
                Kaïron est un petit garçon lumineux, câlin et courageux. Il aime
                la musique, les livres, les jouets qui brillent et les objets
                qui tournent. Malgré les épreuves, il garde ce sourire qui donne
                à sa famille la force d’avancer.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted sm:text-[1.05rem]">
                Derrière chaque geste simple — tenir assis, se mettre à quatre
                pattes, manger, communiquer — il y a pour lui un immense travail.
                Et chaque petit progrès devient une{' '}
                <span className="font-semibold text-amber-soft">
                  grande victoire
                </span>
                .
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                L’association{' '}
                <a
                  href={associationHelloAssoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-leaf underline decoration-leaf/40 underline-offset-2 hover:text-forest"
                >
                  « Un souffle d’espoir pour Kaïron » sur HelloAsso
                </a>{' '}
                porte les actions et la transparence des fonds.
              </p>
              <p className="mt-4 text-sm italic leading-relaxed text-muted">
                Une photo plus récente de la famille (avec Louciana) remplacera
                bientôt les visuels dès notre shooting photo.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
