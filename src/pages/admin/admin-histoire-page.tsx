// src/pages/admin/admin-histoire-page.tsx
import { AdminAddButton, AdminDeleteButton } from '../../components/admin/admin-action-buttons'
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminPhotoPicker } from '../../components/admin/admin-photo-picker'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'
import { newAdminId } from '../../lib/admin-defaults'
import type { TimelineEntry } from '../../lib/admin-types'

export function AdminHistoirePage() {
  const { state, setState } = useAdmin()
  const story = state.story

  function patchStory(partial: Partial<typeof story>) {
    setState((s) => ({ ...s, story: { ...s.story, ...partial } }))
  }

  function updateEntry(index: number, patch: Partial<TimelineEntry>) {
    setState((s) => {
      const entries = [...s.story.entries]
      entries[index] = { ...entries[index], ...patch }
      return { ...s, story: { ...s.story, entries } }
    })
  }

  function addEntry() {
    setState((s) => ({
      ...s,
      story: {
        ...s.story,
        entries: [
          ...s.story.entries,
          { id: newAdminId(), title: 'Nouvelle étape', body: '' },
        ],
      },
    }))
  }

  function removeEntry(index: number) {
    if (!window.confirm('Supprimer cette étape ?')) return
    setState((s) => ({
      ...s,
      story: { ...s.story, entries: s.story.entries.filter((_, i) => i !== index) },
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Son histoire"
        subtitle="Les grandes étapes du parcours de Kaïron, affichées une par une."
      />
      <AdminHelpBox>
        Chaque « étape » est un encadré sur le site (Naissance, Diagnostic, Aujourd’hui…).
      </AdminHelpBox>
      <AdminSection title="Titre de la section" variant="leaf">
        <div className="grid gap-5">
          <AdminSectionHeaderFields
            eyebrow={story.eyebrow}
            title={story.title}
            onEyebrow={(v) => patchStory({ eyebrow: v })}
            onTitle={(v) => patchStory({ title: v })}
          />
          <AdminPhotoPicker
            label="Photo à côté de la timeline"
            value={story.photoNumber}
            onChange={(n) => patchStory({ photoNumber: n })}
          />
        </div>
      </AdminSection>
      <AdminSection title="Les étapes" variant="orange">
        <div className="space-y-6">
          {story.entries.map((entry, index) => (
            <div key={entry.id} className="rounded-xl border-2 border-sage/20 bg-ivory/60 p-5">
              <div className="mb-4 flex justify-between">
                <p className="text-base font-semibold text-ink">{entry.title || `Étape ${index + 1}`}</p>
                <AdminDeleteButton onClick={() => removeEntry(index)} />
              </div>
              <div className="grid gap-4">
                <AdminField
                  label="Titre de l’étape"
                  placeholder="Ex. Naissance, Le diagnostic…"
                  value={entry.title}
                  onChange={(v) => updateEntry(index, { title: v })}
                />
                <AdminField
                  label="Texte"
                  value={entry.body}
                  onChange={(v) => updateEntry(index, { body: v })}
                  multiline
                  rows={4}
                />
              </div>
            </div>
          ))}
          <AdminAddButton onClick={addEntry}>Ajouter une étape</AdminAddButton>
        </div>
      </AdminSection>
    </div>
  )
}
