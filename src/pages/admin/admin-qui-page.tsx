// src/pages/admin/admin-qui-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminPhotoPicker } from '../../components/admin/admin-photo-picker'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'

export function AdminQuiPage() {
  const { state, setState } = useAdmin()
  const about = state.about

  function patch(partial: Partial<typeof about>) {
    setState((s) => ({ ...s, about: { ...s.about, ...partial } }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Qui est Kaïron ?"
        subtitle="Présentation de Kaïron — qui il est, ce qu’il aime, sa force."
      />
      <AdminSection title="Textes" variant="orange">
        <div className="grid gap-5">
          <AdminSectionHeaderFields
            eyebrow={about.eyebrow}
            title={about.title}
            onEyebrow={(v) => patch({ eyebrow: v })}
            onTitle={(v) => patch({ title: v })}
          />
          <AdminField
            label="Premier paragraphe"
            value={about.paragraph1}
            onChange={(v) => patch({ paragraph1: v })}
            multiline
            rows={4}
          />
          <AdminField
            label="Second paragraphe"
            value={about.paragraph2}
            onChange={(v) => patch({ paragraph2: v })}
            multiline
            rows={4}
          />
          <AdminField
            label="Phrase sur l’association"
            hint="Rappel que l’association porte les actions et la transparence."
            value={about.associationNote}
            onChange={(v) => patch({ associationNote: v })}
            multiline
            rows={2}
          />
          <AdminField
            label="Note sur la photo (facultatif)"
            hint="Ex. message sur une future photo de famille."
            value={about.photoNote}
            onChange={(v) => patch({ photoNote: v })}
            multiline
            rows={2}
          />
        </div>
      </AdminSection>
      <AdminSection title="Photo" variant="leaf">
        <AdminPhotoPicker
          value={about.photoNumber}
          onChange={(n) => patch({ photoNumber: n })}
        />
      </AdminSection>
    </div>
  )
}
