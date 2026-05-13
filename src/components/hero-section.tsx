// src/components/hero-section.tsx
import { motion } from 'framer-motion'
import { SectionPhoto } from './section-photo'
import { SoftButton } from './soft-button'
import { associationHelloAssoUrl, donationUrl } from '../config/site-config'

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-linear-to-br from-mint-off via-mist to-mint px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-0 h-[24rem] w-[24rem] rounded-full bg-leaf/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[20rem] w-[20rem] rounded-full bg-pale-sage/55 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-left"
        >
          <a
            href={associationHelloAssoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-sage/40 bg-mint/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sage-deep transition hover:border-leaf/50 hover:bg-mint"
          >
            Un souffle d’espoir pour Kaïron
            <span aria-hidden className="font-body text-[0.7rem] font-normal normal-case tracking-normal opacity-75">
              HelloAsso ↗
            </span>
          </a>
          <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem]">
            Kaïron avance à son rythme.
            <span className="mt-2 block text-3xl text-orange sm:text-4xl">
              Aidons-le à aller plus loin.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-[1.05rem]">
            Kaïron a trois ans et demi. Une mutation rare du gène{' '}
            <span className="rounded-md border border-sage/50 bg-mint/90 px-1.5 py-0.5 font-semibold text-forest">
              GRIN2B
            </span>{' '}
            bouleverse son développement, son alimentation, son sommeil et sa
            motricité. L’association familiale collecte les dons pour financer
            stages, matériel et frais non pris en charge — afin que chaque progrès
            reste possible.
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted">
            <a
              href={associationHelloAssoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-leaf underline decoration-leaf/40 underline-offset-2 hover:text-forest"
            >
              Page HelloAsso de l’association
            </a>{' '}
            : actualités, adhésions et transparence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SoftButton href={donationUrl}>Faire un don pour Kaïron</SoftButton>
            <SoftButton
              variant="secondary"
              onClick={() =>
                document.getElementById('histoire')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            >
              Découvrir son histoire
            </SoftButton>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-orange/20 to-blue/12 blur-xl" />
          <div className="relative overflow-hidden rounded-[1.65rem] border-2 border-leaf/35 bg-paper shadow-lg shadow-forest/15 ring-1 ring-sage/30">
            <SectionPhoto
              n={6}
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
        </motion.figure>
      </div>
    </section>
  )
}
