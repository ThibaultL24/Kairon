// src/pages/admin/admin-temoignage-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { StringListEditor } from '../../components/admin/string-list-editor'
import { useAdmin } from '../../hooks/use-admin'

export function AdminTemoignagePage() {
  const { state, setState } = useAdmin()
  const testimony = state.testimony

  function patch(partial: Partial<typeof testimony>) {
    setState((s) => ({ ...s, testimony: { ...s.testimony, ...partial } }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Témoignage de la maman"
        subtitle="Le récit long de la maman — chaque paragraphe est un bloc séparé sur le site."
      />
      <AdminHelpBox>
        Les phrases courtes (ex. « Et pourtant… ») s’affichent en italique plus grand. Ne supprimez
        un paragraphe que si vous êtes sûr·e.
      </AdminHelpBox>
      <AdminSection title="En-tête" variant="orange">
        <div className="grid gap-4">
          <AdminField
            label="Petit titre (en haut)"
            value={testimony.eyebrow}
            onChange={(v) => patch({ eyebrow: v })}
          />
          <AdminField label="Grand titre" value={testimony.title} onChange={(v) => patch({ title: v })} />
          <AdminField
            label="Signature en bas de page"
            placeholder="— La maman de Kaïron"
            value={testimony.signature}
            onChange={(v) => patch({ signature: v })}
          />
        </div>
      </AdminSection>
      <AdminSection title="Texte du témoignage" variant="leaf">
        <StringListEditor
          label="Paragraphes (dans l’ordre)"
          hint="Un paragraphe = un bloc de texte. Utilisez « Ajouter un paragraphe » pour insérer."
          items={testimony.paragraphs}
          onChange={(paragraphs) => patch({ paragraphs })}
          addLabel="Ajouter un paragraphe"
          multiline
        />
      </AdminSection>
    </div>
  )
}
