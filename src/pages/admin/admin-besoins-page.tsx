// src/pages/admin/admin-besoins-page.tsx
import { AdminAddButton, AdminDeleteButton } from '../../components/admin/admin-action-buttons'
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminPhotoPicker } from '../../components/admin/admin-photo-picker'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'
import { newAdminId } from '../../lib/admin-defaults'
import type { NeedRow } from '../../lib/admin-types'

export function AdminBesoinsPage() {
  const { state, setState } = useAdmin()
  const whyHelp = state.whyHelp

  function patchWhyHelp(partial: Partial<typeof whyHelp>) {
    setState((s) => ({ ...s, whyHelp: { ...s.whyHelp, ...partial } }))
  }

  function updateRow(index: number, patch: Partial<NeedRow>) {
    setState((s) => {
      const rows = [...s.whyHelp.rows]
      rows[index] = { ...rows[index], ...patch }
      return { ...s, whyHelp: { ...s.whyHelp, rows } }
    })
  }

  function addRow() {
    setState((s) => ({
      ...s,
      whyHelp: {
        ...s.whyHelp,
        rows: [...s.whyHelp.rows, { id: newAdminId(), need: 'Nouveau besoin', why: '' }],
      },
    }))
  }

  function removeRow(index: number) {
    if (!window.confirm('Supprimer ce besoin ?')) return
    setState((s) => ({
      ...s,
      whyHelp: { ...s.whyHelp, rows: s.whyHelp.rows.filter((_, i) => i !== index) },
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Pourquoi aider ?"
        subtitle="Listez les dépenses que l’association aide à financer (stages, matériel, etc.)."
      />
      <AdminHelpBox>
        Exemple : « Chaque stage coûte 4 400 €, hors hébergement » dans la description du besoin.
      </AdminHelpBox>
      <AdminSection title="Introduction" variant="leaf">
        <div className="grid gap-5">
          <AdminSectionHeaderFields
            eyebrow={whyHelp.eyebrow}
            title={whyHelp.title}
            intro={whyHelp.intro}
            onEyebrow={(v) => patchWhyHelp({ eyebrow: v })}
            onTitle={(v) => patchWhyHelp({ title: v })}
            onIntro={(v) => patchWhyHelp({ intro: v })}
          />
          <AdminField
            label="Phrase en encadré vert (en bas de section)"
            value={whyHelp.closingQuote}
            onChange={(v) => patchWhyHelp({ closingQuote: v })}
            multiline
            rows={3}
          />
          <AdminPhotoPicker
            label="Photo de la section"
            value={whyHelp.photoNumber}
            onChange={(n) => patchWhyHelp({ photoNumber: n })}
          />
        </div>
      </AdminSection>
      <AdminSection title="Liste des besoins" variant="orange">
        <div className="space-y-6">
          {whyHelp.rows.map((row, index) => (
            <div key={row.id} className="rounded-xl border-2 border-sage/20 bg-ivory/60 p-5">
              <div className="mb-4 flex justify-between">
                <p className="text-base font-semibold text-ink">{row.need || `Besoin ${index + 1}`}</p>
                <AdminDeleteButton onClick={() => removeRow(index)} />
              </div>
              <div className="grid gap-4">
                <AdminField
                  label="Titre du besoin"
                  placeholder="Ex. Stages de rééducation"
                  value={row.need}
                  onChange={(v) => updateRow(index, { need: v })}
                />
                <AdminField
                  label="Explication"
                  hint="Pourquoi ce besoin est important et combien ça coûte si besoin."
                  value={row.why}
                  onChange={(v) => updateRow(index, { why: v })}
                  multiline
                  rows={3}
                />
              </div>
            </div>
          ))}
          <AdminAddButton onClick={addRow}>Ajouter un besoin</AdminAddButton>
        </div>
      </AdminSection>
    </div>
  )
}
