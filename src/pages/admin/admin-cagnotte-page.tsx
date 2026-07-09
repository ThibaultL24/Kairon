// src/pages/admin/admin-cagnotte-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminPhotoPicker } from '../../components/admin/admin-photo-picker'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'

export function AdminCagnottePage() {
  const { state, setState } = useAdmin()
  const goal = state.goal
  const donate = state.donate

  function patchGoal(partial: Partial<typeof goal>) {
    setState((s) => ({ ...s, goal: { ...s.goal, ...partial } }))
  }

  function patchDonate(partial: Partial<typeof donate>) {
    setState((s) => ({ ...s, donate: { ...s.donate, ...partial } }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Cagnotte & dons"
        subtitle="Mettez à jour les montants affichés et les textes autour des dons."
      />
      <AdminHelpBox>
        Les montants sont <strong>indicatifs</strong> sur le site. Mettez-les à jour quand
        l’association vous communique un nouveau total.
      </AdminHelpBox>
      <AdminSection title="Objectif affiché (jauge)" variant="leaf">
        <div className="grid gap-5">
          <AdminSectionHeaderFields
            eyebrow={goal.eyebrow}
            title={goal.title}
            intro={goal.intro}
            onEyebrow={(v) => patchGoal({ eyebrow: v })}
            onTitle={(v) => patchGoal({ title: v })}
            onIntro={(v) => patchGoal({ intro: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField
              label="Montant déjà collecté (€)"
              hint="Chiffre affiché à gauche de la jauge."
              value={String(goal.collectedEuros)}
              onChange={(v) =>
                patchGoal({ collectedEuros: Number.parseInt(v.replace(/\s/g, ''), 10) || 0 })
              }
              type="number"
            />
            <AdminField
              label="Objectif total (€)"
              hint="Ex. 15000 pour 15 000 €"
              value={String(goal.goalEuros)}
              onChange={(v) =>
                patchGoal({ goalEuros: Number.parseInt(v.replace(/\s/g, ''), 10) || 0 })
              }
              type="number"
            />
          </div>
          <AdminField
            label="Texte sous la jauge"
            value={goal.footer}
            onChange={(v) => patchGoal({ footer: v })}
            multiline
            rows={3}
          />
          <AdminPhotoPicker
            label="Photo de cette section"
            value={goal.photoNumber}
            onChange={(n) => patchGoal({ photoNumber: n })}
          />
        </div>
      </AdminSection>
      <AdminSection title="Bloc vert « Faire un don »" variant="forest">
        <div className="grid gap-5">
          <AdminField label="Petit titre" value={donate.eyebrow} onChange={(v) => patchDonate({ eyebrow: v })} />
          <AdminField label="Grand titre" value={donate.title} onChange={(v) => patchDonate({ title: v })} />
          <AdminField
            label="Texte principal"
            value={donate.body}
            onChange={(v) => patchDonate({ body: v })}
            multiline
            rows={4}
          />
          <AdminField
            label="Texte en bas de page"
            value={donate.footer}
            onChange={(v) => patchDonate({ footer: v })}
            multiline
            rows={3}
          />
          <AdminPhotoPicker
            label="Photo du bloc don"
            value={donate.photoNumber}
            onChange={(n) => patchDonate({ photoNumber: n })}
          />
        </div>
      </AdminSection>
    </div>
  )
}
