// src/components/donate-cta-section.tsx
import { motion } from 'framer-motion'
import { SectionPhoto } from './section-photo'
import { donationUrl } from '../config/site-config'
import { SoftButton } from './soft-button'

export function DonateCtaSection() {
  return (
    <section
      id="don"
      className="relative overflow-hidden px-4 py-16 text-paper sm:px-6 sm:py-20"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(216, 138, 75, 0.12), transparent 22rem),
          linear-gradient(135deg, #1a3550 0%, #24557d 50%, #2f6fa3 100%)
        `,
      }}
    >
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-apricot">
                Agir
              </p>
              <h2 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
                Faire un don
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-paper/90">
                Aider Kaïron, c’est offrir à sa famille un peu d’air, un peu
                d’espoir, et surtout les moyens de poursuivre ce combat quotidien
                — avec sobriété et gratitude.
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <SoftButton href={donationUrl} variant="contrast">
                  Je fais un don
                </SoftButton>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-paper/75">
                Remplacez l’URL de don par le lien officiel de la cagnotte validé
                par la famille. Les fonds sont destinés aux besoins médicaux,
                paramédicaux et matériels de Kaïron — la plateforme utilisée
                porte sa propre sécurisation.
              </p>
            </div>
            <div className="mx-auto w-full max-w-lg md:order-2">
              <SectionPhoto
                n={15}
                className="max-h-104 w-full object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
