// src/pages/admin/admin-accueil-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminPhotoPicker } from '../../components/admin/admin-photo-picker'
import { AdminSection } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'

export function AdminAccueilPage() {
  const { state, setState } = useAdmin()
  const hero = state.hero

  function patch(partial: Partial<typeof hero>) {
    setState((s) => ({ ...s, hero: { ...s.hero, ...partial } }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Page d’accueil"
        subtitle="C’est la première chose que les visiteurs voient en arrivant sur le site."
      />
      <AdminHelpBox>
        Le badge « Un souffle d’espoir pour Kaïron » et le logo restent visibles en haut.
      </AdminHelpBox>
      <AdminSection title="Textes principaux" variant="leaf">
        <div className="grid gap-5">
          <AdminField
            label="Nom de l’association (petit bandeau)"
            value={hero.associationBadge}
            onChange={(v) => patch({ associationBadge: v })}
          />
          <AdminField label="Grand titre" value={hero.title} onChange={(v) => patch({ title: v })} />
          <AdminField
            label="Phrase en orange (sous le titre)"
            value={hero.titleAccent}
            onChange={(v) => patch({ titleAccent: v })}
          />
          <AdminField
            label="Texte de présentation"
            hint="Présentez Kaïron en quelques phrases."
            value={hero.intro}
            onChange={(v) => patch({ intro: v })}
            multiline
            rows={5}
          />
          <AdminField
            label="Phrase sous le lien HelloAsso"
            value={hero.helloAssoNote}
            onChange={(v) => patch({ helloAssoNote: v })}
          />
          <AdminField
            label="Texte du bouton vert « don »"
            value={hero.ctaPrimary}
            onChange={(v) => patch({ ctaPrimary: v })}
          />
          <AdminField
            label="Texte du second bouton"
            value={hero.ctaSecondary}
            onChange={(v) => patch({ ctaSecondary: v })}
          />
        </div>
      </AdminSection>
      <AdminSection title="Grande photo à droite" variant="orange">
        <AdminPhotoPicker
          label="Photo de la page d’accueil"
          value={hero.photoNumber}
          onChange={(n) => patch({ photoNumber: n })}
        />
      </AdminSection>
    </div>
  )
}
