// src/components/share-section.tsx
import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'

function buildUrl(base: string, params: Record<string, string>): string {
  const u = new URL(base)
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v)
  return u.toString()
}

const shareActions = [
  { label: 'Facebook', kind: 'facebook' as const },
  { label: 'WhatsApp', kind: 'whatsapp' as const },
  { label: 'SMS', kind: 'sms' as const },
  { label: 'X', kind: 'x' as const },
  { label: 'LinkedIn', kind: 'linkedin' as const },
] as const

export function ShareSection() {
  const { share } = useSiteData()
  const [copied, setCopied] = useState(false)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const sharePage = useCallback(
    (kind: (typeof shareActions)[number]['kind']) => {
      const text = `${share.shareMessage} ${pageUrl}`.trim()

      const urls: Record<typeof kind, string> = {
        facebook: buildUrl('https://www.facebook.com/sharer/sharer.php', { u: pageUrl }),
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
        x: buildUrl('https://twitter.com/intent/tweet', {
          url: pageUrl,
          text: share.shareMessage,
        }),
        linkedin: buildUrl('https://www.linkedin.com/sharing/share-offsite/', {
          url: pageUrl,
        }),
        sms: `sms:?body=${encodeURIComponent(text)}`,
      }

      window.open(urls[kind], '_blank', 'noopener,noreferrer')
    },
    [pageUrl, share.shareMessage],
  )

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }, [pageUrl])

  return (
    <section
      id="partager"
      className="border-t border-sage/20 bg-mist/60 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
            {share.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            {share.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{share.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {shareActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => sharePage(action.kind)}
                className="rounded-lg border border-sage/40 bg-ivory px-4 py-2.5 text-sm font-medium text-ink transition hover:border-leaf/45 hover:bg-mint/80 hover:text-forest"
              >
                {action.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => void copyLink()}
              className="rounded-full bg-linear-to-r from-leaf to-forest px-4 py-2.5 text-sm font-semibold text-paper transition hover:from-moss hover:to-leaf"
            >
              {copied ? 'Lien copié' : 'Copier le lien'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
