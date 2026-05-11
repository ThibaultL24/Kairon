// src/components/hero-section.tsx
import { motion } from 'framer-motion'
import { SectionPhoto } from './section-photo'
import { SoftButton } from './soft-button'
import { donationUrl } from '../config/site-config'

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-ivory px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-0 h-[24rem] w-[24rem] rounded-full bg-apricot/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[20rem] w-[20rem] rounded-full bg-blue-soft/90 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-left"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-linen bg-apricot/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Une page familiale
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem]">
            Kaïron avance à son rythme.
            <span className="mt-2 block text-3xl text-orange sm:text-4xl">
              Aidons-le à aller plus loin.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-[1.05rem]">
            Kaïron a trois ans et demi. Une mutation rare du gène{' '}
            <span className="rounded-md border border-linen bg-blue-soft/80 px-1.5 py-0.5 font-semibold text-ink">
              GRIN2B
            </span>{' '}
            bouleverse son développement, son alimentation, son sommeil et sa
            motricité. Sa famille se bat chaque jour pour lui offrir soins,
            thérapies et stages de rééducation : chaque progrès est une victoire,
            chaque aide compte.
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
          <div className="relative overflow-hidden rounded-[1.65rem] border-2 border-blue/18 bg-paper shadow-lg shadow-blue/10 ring-1 ring-linen">
            <SectionPhoto
              n={28}
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
