// src/components/site-footer.tsx
export function SiteFooter() {
  return (
    <footer className="border-t border-linen bg-gradient-to-r from-cream via-ivory to-cream px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-muted md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl text-left leading-relaxed">
          <p className="font-display text-lg text-ink">Transparence & respect</p>
          <p className="mt-2">
            Cette page vise la confiance : texte validé par les parents, photos
            et récit médical avec accord écrit, lien officiel vers la cagnotte,
            usage des fonds expliqué.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="font-medium text-ink">Contact</p>
          <p className="mt-2">
            Pour toute question sérieuse, rapprochez-vous du canal indiqué par
            la famille sur la cagnotte ou par un proche de confiance.
          </p>
          <p className="mt-4 text-xs text-muted/90">
            © {new Date().getFullYear()} — Page soutien Kaïron.
          </p>
        </div>
      </div>
    </footer>
  )
}
