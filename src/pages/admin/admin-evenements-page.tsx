// src/pages/admin/admin-evenements-page.tsx
import { AdminAddButton, AdminDeleteButton } from '../../components/admin/admin-action-buttons'
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'
import { newAdminId } from '../../lib/admin-defaults'
import type { SiteEvent } from '../../lib/admin-types'

export function AdminEvenementsPage() {
  const { state, setState } = useAdmin()
  const events = state.events

  function patchEvents(partial: Partial<typeof events>) {
    setState((s) => ({ ...s, events: { ...s.events, ...partial } }))
  }

  function updateItem(index: number, patch: Partial<SiteEvent>) {
    setState((s) => {
      const items = [...s.events.items]
      items[index] = { ...items[index], ...patch }
      return { ...s, events: { ...s.events, items } }
    })
  }

  function addItem() {
    setState((s) => ({
      ...s,
      events: {
        ...s.events,
        items: [
          ...s.events.items,
          {
            id: newAdminId(),
            title: 'Nouvel événement',
            dateLabel: 'Exemple : 7 juin 2026 · Althen-des-Paluds',
            detail: 'Décrivez l’événement en quelques phrases.',
          },
        ],
      },
    }))
  }

  function removeItem(index: number) {
    if (!window.confirm('Supprimer cet événement du site ?')) return
    setState((s) => ({
      ...s,
      events: { ...s.events, items: s.events.items.filter((_, i) => i !== index) },
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Événements & foires"
        subtitle="Annoncez les dates où l’association sera présente (foire du printemps, stand, etc.)."
      />
      <AdminHelpBox title="Exemple">
        Foire du printemps — 7 juin 2026 à Althen-des-Paluds, avec l’affiche si vous l’avez.
      </AdminHelpBox>
      <AdminSection title="Titre de la section sur le site" variant="sage">
        <AdminSectionHeaderFields
          eyebrow={events.eyebrow}
          title={events.title}
          intro={events.intro}
          onEyebrow={(v) => patchEvents({ eyebrow: v })}
          onTitle={(v) => patchEvents({ title: v })}
          onIntro={(v) => patchEvents({ intro: v })}
        />
      </AdminSection>
      <AdminSection title="Vos événements" variant="leaf">
        <div className="space-y-6">
          {events.items.map((item, index) => (
            <div key={item.id} className="rounded-xl border-2 border-sage/20 bg-ivory/60 p-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <p className="text-base font-semibold text-ink">
                  Événement {index + 1} — {item.title || 'Sans titre'}
                </p>
                <AdminDeleteButton onClick={() => removeItem(index)} label="Supprimer" />
              </div>
              <div className="grid gap-4">
                <AdminField
                  label="Nom de l’événement"
                  placeholder="Ex. Foire du printemps"
                  value={item.title}
                  onChange={(v) => updateItem(index, { title: v })}
                />
                <AdminField
                  label="Date et lieu"
                  placeholder="Ex. 7 juin 2026 · Althen-des-Paluds"
                  value={item.dateLabel}
                  onChange={(v) => updateItem(index, { dateLabel: v })}
                />
                <AdminField
                  label="Description"
                  hint="Quelques mots pour inviter les visiteurs à venir."
                  value={item.detail}
                  onChange={(v) => updateItem(index, { detail: v })}
                  multiline
                  rows={3}
                />
                <AdminField
                  label="Affiche (facultatif)"
                  hint="Si Thibault vous a envoyé une image : /foire-althen-2026.png — sinon laissez vide."
                  placeholder="/foire-althen-2026.png"
                  value={item.posterSrc ?? ''}
                  onChange={(v) => updateItem(index, { posterSrc: v || undefined })}
                />
                {item.posterSrc ? (
                  <img
                    src={item.posterSrc}
                    alt=""
                    className="max-h-48 rounded-lg border border-sage/30 object-contain"
                  />
                ) : null}
              </div>
            </div>
          ))}
          <AdminAddButton onClick={addItem}>Ajouter un événement</AdminAddButton>
        </div>
      </AdminSection>
    </div>
  )
}
