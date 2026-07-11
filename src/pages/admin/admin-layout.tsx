// src/pages/admin/admin-layout.tsx
import { useRef, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AdminAutoSaveNote } from '../../components/admin/admin-auto-save-note'
import { useAdmin } from '../../hooks/use-admin'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Le plus utile',
    items: [
      { to: '/admin', label: 'Tableau de bord', end: true },
      { to: '/admin/evenements', label: 'Événements & foires' },
      { to: '/admin/articles', label: 'Actualités' },
      { to: '/admin/cagnotte', label: 'Cagnotte & dons' },
      { to: '/admin/sections', label: 'Afficher / masquer une partie' },
    ],
  },
  {
    title: 'Textes du site',
    items: [
      { to: '/admin/accueil', label: 'Page d’accueil' },
      { to: '/admin/qui', label: 'Qui est Kaïron ?' },
      { to: '/admin/histoire', label: 'Son histoire' },
      { to: '/admin/comprendre', label: 'GRIN2B' },
      { to: '/admin/besoins', label: 'Pourquoi aider ?' },
      { to: '/admin/temoignage', label: 'Témoignage maman' },
      { to: '/admin/galerie', label: 'Galerie photos' },
    ],
  },
  {
    title: 'Liens & partage',
    items: [{ to: '/admin/parametres', label: 'HelloAsso & partage' }],
  },
]

function navClass(active: boolean) {
  return [
    'block rounded-xl px-3 py-3 text-sm font-medium transition',
    active ? 'bg-leaf text-paper shadow-sm' : 'text-ink hover:bg-mint/80',
  ].join(' ')
}

export function AdminLayout() {
  const { logout, exportStateJson, importState, resetToDefaults } = useAdmin()
  const importRef = useRef<HTMLInputElement>(null)
  const [showBackup, setShowBackup] = useState(false)

  function downloadExport() {
    const blob = new Blob([exportStateJson()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `sauvegarde-site-kairon-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    window.alert('Sauvegarde téléchargée sur votre ordinateur.')
  }

  function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = importState(String(reader.result))
      window.alert(
        result.ok
          ? 'Sauvegarde chargée avec succès. Vérifiez le site avec le bouton « Voir le site ».'
          : 'Ce fichier ne peut pas être lu. Vérifiez qu’il s’agit bien d’une sauvegarde du site Kaïron.',
      )
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="admin-shell">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:py-8 lg:flex-row lg:gap-8 lg:px-6">
        <aside className="w-full shrink-0 lg:sticky lg:top-4 lg:w-60 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-sage/30 bg-paper shadow-md">
            <div className="bg-leaf px-4 py-4">
              <p className="font-display text-lg text-paper">Espace famille</p>
              <p className="mt-1 text-sm text-paper/85">Modifier le site Kaïron</p>
            </div>

            <div className="border-b border-sage/20 p-3">
              <Link
                to="/"
                target="_blank"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3.5 text-center text-base font-bold text-paper shadow-sm transition hover:bg-leaf"
              >
                Voir le site
                <span aria-hidden className="text-sm opacity-80">
                  ↗
                </span>
              </Link>
            </div>

            <nav className="max-h-[45vh] space-y-4 overflow-y-auto p-3 lg:max-h-[calc(100vh-22rem)]" aria-label="Menu">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-1.5 px-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                    {group.title}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => navClass(isActive)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="space-y-2 border-t border-sage/20 bg-mist/40 p-3">
              <button
                type="button"
                onClick={() => setShowBackup((v) => !v)}
                className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted hover:bg-paper/80"
              >
                {showBackup ? '▾ Masquer la sauvegarde' : '▸ Sauvegarder / restaurer (optionnel)'}
              </button>
              {showBackup ? (
                <div className="space-y-2 rounded-xl border border-sage/20 bg-paper p-3">
                  <p className="text-xs leading-relaxed text-muted">
                    Copie de secours sur votre ordinateur (optionnel). Le site en ligne se met à
                    jour automatiquement quand vous modifiez un texte dans l’admin.
                  </p>
                  <button
                    type="button"
                    onClick={downloadExport}
                    className="w-full rounded-lg border border-sage/30 bg-mint/50 px-3 py-2.5 text-sm font-medium text-forest"
                  >
                    Télécharger une copie
                  </button>
                  <button
                    type="button"
                    onClick={() => importRef.current?.click()}
                    className="w-full rounded-lg border border-sage/30 bg-mint/50 px-3 py-2.5 text-sm font-medium text-forest"
                  >
                    Charger une copie
                  </button>
                  <input
                    ref={importRef}
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={onImportFile}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Attention : cela remet tous les textes comme au départ. Continuer ?',
                        )
                      ) {
                        resetToDefaults()
                        window.alert('Textes remis par défaut.')
                      }
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-xs text-muted hover:text-orange"
                  >
                    Tout remettre à zéro
                  </button>
                </div>
              ) : null}
              <button
                type="button"
                onClick={logout}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted hover:bg-paper"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-6 pb-10">
          <AdminAutoSaveNote />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
