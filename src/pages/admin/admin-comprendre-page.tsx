// src/pages/admin/admin-comprendre-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminPhotoPicker } from '../../components/admin/admin-photo-picker'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'

export function AdminComprendrePage() {
  const { state, setState } = useAdmin()
  const grin2b = state.grin2b

  function patch(partial: Partial<typeof grin2b>) {
    setState((s) => ({ ...s, grin2b: { ...s.grin2b, ...partial } }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Comprendre GRIN2B"
        subtitle="Explication simple de la maladie, sans promesses irréalistes."
      />
      <AdminSection title="Textes" variant="forest">
        <div className="grid gap-5">
          <AdminSectionHeaderFields
            eyebrow={grin2b.eyebrow}
            title={grin2b.title}
            onEyebrow={(v) => patch({ eyebrow: v })}
            onTitle={(v) => patch({ title: v })}
          />
          <AdminField
            label="Premier paragraphe"
            value={grin2b.paragraph1}
            onChange={(v) => patch({ paragraph1: v })}
            multiline
            rows={4}
          />
          <AdminField
            label="Second paragraphe"
            value={grin2b.paragraph2}
            onChange={(v) => patch({ paragraph2: v })}
            multiline
            rows={4}
          />
          <AdminField
            label="Citation en bas (encadré orange)"
            value={grin2b.quote}
            onChange={(v) => patch({ quote: v })}
            multiline
            rows={3}
          />
        </div>
      </AdminSection>
      <AdminSection title="Photo" variant="leaf">
        <AdminPhotoPicker
          value={grin2b.photoNumber}
          onChange={(n) => patch({ photoNumber: n })}
        />
      </AdminSection>
    </div>
  )
}
