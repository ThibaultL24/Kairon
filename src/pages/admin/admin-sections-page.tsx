// src/pages/admin/admin-sections-page.tsx
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'
import { SECTION_IDS, type SectionId } from '../../lib/admin-types'

const sectionLabels: Record<SectionId, string> = {
  accueil: 'Page d’accueil (en haut du site)',
  qui: 'Qui est Kaïron ?',
  histoire: 'Son histoire',
  comprendre: 'Comprendre GRIN2B',
  pourquoi: 'Pourquoi aider ?',
  objectif: 'Objectif de la cagnotte',
  evenements: 'Événements & foires',
  articles: 'Actualités',
  don: 'Bloc « Faire un don »',
  temoignage: 'Témoignage de la maman',
  galerie: 'Galerie photos',
  partager: 'Partager la page',
}

export function AdminSectionsPage() {
  const { state, setState } = useAdmin()

  function toggle(id: SectionId) {
    setState((prev) => ({
      ...prev,
      sections: { ...prev.sections, [id]: !prev.sections[id] },
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Afficher ou masquer une partie"
        subtitle="Décochez une case pour cacher temporairement une section sur le site. Vous pourrez la réafficher quand vous voulez — les textes ne sont pas effacés."
      />
      <AdminHelpBox>
        Utile si vous préparez une nouvelle section ou si vous voulez simplifier la page un
        moment.
      </AdminHelpBox>
      <AdminSection title="Sections du site" variant="sage">
        <ul className="space-y-2">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-sage/25 px-4 py-4 transition hover:bg-mint/40">
                <input
                  type="checkbox"
                  checked={state.sections[id]}
                  onChange={() => toggle(id)}
                  className="size-5 accent-leaf"
                />
                <span className="text-base font-medium text-ink">{sectionLabels[id]}</span>
              </label>
            </li>
          ))}
        </ul>
      </AdminSection>
    </div>
  )
}
