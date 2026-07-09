// src/components/site-footer.tsx
import { useSiteData } from '../hooks/use-admin'
import { resolveAssociationUrl } from '../lib/resolve-urls'

export function SiteFooter() {
  const { urls } = useSiteData()
  const associationHelloAssoUrl = resolveAssociationUrl(urls.associationHelloAsso)
  return (
    <footer className="border-t border-sage/25 bg-linear-to-r from-mist via-ivory to-mint/50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-muted md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl text-left leading-relaxed">
          <p className="font-display text-lg text-ink">Transparence & respect</p>
          <p className="mt-2">
            Page soutenue par l’association « Un souffle d’espoir pour Kaïron » :
            texte et photos avec accord, objectifs des dons expliqués.
          </p>
          <p className="mt-4">
            <a
              href={associationHelloAssoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-sage/45 bg-mint/80 px-4 py-2.5 text-sm font-semibold text-forest shadow-sm transition hover:border-leaf/50 hover:bg-mint"
            >
              Page officielle HelloAsso de l’association
              <span aria-hidden className="text-xs opacity-80">
                ↗
              </span>
            </a>
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="font-medium text-ink">Contact</p>
          <p className="mt-2">
            Pour toute question sérieuse, écrivez via les coordonnées indiquées sur
            HelloAsso ou rapprochez-vous d’un proche de l’association.
          </p>
          <p className="mt-4 text-xs text-muted/90">
            © {new Date().getFullYear()} — Association Un souffle d’espoir pour Kaïron.
          </p>
        </div>
      </div>
    </footer>
  )
}
