// src/components/donate-cta-section.tsx
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'
import { resolveAssociationUrl, resolveDonationUrl } from '../lib/resolve-urls'
import { SectionPhoto } from './section-photo'
import { SoftButton } from './soft-button'

export function DonateCtaSection() {
  const { donate, urls } = useSiteData()
  const associationHelloAssoUrl = resolveAssociationUrl(urls.associationHelloAsso)
  const donationUrl = resolveDonationUrl(urls.donation)

  return (
    <section
      id="don"
      className="relative overflow-hidden px-4 py-16 text-paper sm:px-6 sm:py-20"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(232, 115, 42, 0.2), transparent 22rem),
          radial-gradient(circle at bottom right, rgba(31, 109, 68, 0.28), transparent 26rem),
          linear-gradient(135deg, #0a2e1c 0%, #13402a 36%, #1f6d44 72%, #2d8254 100%)
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
                {donate.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
                {donate.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-paper/90">{donate.body}</p>
              <div className="mt-8 flex justify-center md:justify-start">
                <SoftButton href={donationUrl} variant="contrast">
                  Je fais un don
                </SoftButton>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-paper/75">{donate.footer}</p>
              <p className="mt-4">
                <a
                  href={associationHelloAssoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-apricot underline decoration-apricot/50 underline-offset-[5px] transition hover:text-paper"
                >
                  Découvrir la page de l’association sur HelloAsso
                  <span aria-hidden>↗</span>
                </a>
              </p>
            </div>
            <div className="mx-auto w-full max-w-lg md:order-2">
              <SectionPhoto n={donate.photoNumber} className="max-h-104 w-full object-contain" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
