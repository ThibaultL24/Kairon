// src/pages/admin/admin-parametres-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'

export function AdminParametresPage() {
  const { state, setState } = useAdmin()
  const { urls, share } = state

  function patchUrls(partial: Partial<typeof urls>) {
    setState((s) => ({ ...s, urls: { ...s.urls, ...partial } }))
  }

  function patchShare(partial: Partial<typeof share>) {
    setState((s) => ({ ...s, share: { ...s.share, ...partial } }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="HelloAsso & partage"
        subtitle="Liens vers la cagnotte et texte quand on partage la page sur Facebook, WhatsApp, etc."
      />
      <AdminHelpBox>
        En cas de doute sur les liens HelloAsso, demandez à la personne qui a créé la cagnotte —
        ne les changez que si on vous le demande.
      </AdminHelpBox>
      <AdminSection title="Liens HelloAsso" variant="leaf">
        <div className="grid gap-5">
          <AdminField
            label="Page de l’association"
            hint="Lien vers la page générale HelloAsso."
            value={urls.associationHelloAsso}
            onChange={(v) => patchUrls({ associationHelloAsso: v })}
            type="url"
          />
          <AdminField
            label="Lien direct pour faire un don"
            hint="Lien du formulaire de don (bouton vert du site)."
            value={urls.donation}
            onChange={(v) => patchUrls({ donation: v })}
            type="url"
          />
        </div>
      </AdminSection>
      <AdminSection title="Section « Partager »" variant="orange">
        <div className="grid gap-5">
          <AdminSectionHeaderFields
            eyebrow={share.eyebrow}
            title={share.title}
            intro={share.intro}
            onEyebrow={(v) => patchShare({ eyebrow: v })}
            onTitle={(v) => patchShare({ title: v })}
            onIntro={(v) => patchShare({ intro: v })}
          />
          <AdminField
            label="Message quand on partage le site"
            hint="Apparaît sur WhatsApp, SMS, etc. avec le lien du site."
            value={share.shareMessage}
            onChange={(v) => patchShare({ shareMessage: v })}
            multiline
            rows={2}
          />
        </div>
      </AdminSection>
    </div>
  )
}
