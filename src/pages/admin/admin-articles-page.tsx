// src/pages/admin/admin-articles-page.tsx
import { AdminAddButton, AdminDeleteButton } from '../../components/admin/admin-action-buttons'
import { AdminField } from '../../components/admin/admin-field'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'
import { newAdminId } from '../../lib/admin-defaults'
import type { SiteArticle } from '../../lib/admin-types'

export function AdminArticlesPage() {
  const { state, setState } = useAdmin()
  const articles = state.articles

  function patchArticles(partial: Partial<typeof articles>) {
    setState((s) => ({ ...s, articles: { ...s.articles, ...partial } }))
  }

  function updateItem(index: number, patch: Partial<SiteArticle>) {
    setState((s) => {
      const items = [...s.articles.items]
      items[index] = { ...items[index], ...patch }
      return { ...s, articles: { ...s.articles, items } }
    })
  }

  function addItem() {
    setState((s) => ({
      ...s,
      articles: {
        ...s.articles,
        items: [
          ...s.articles.items,
          {
            id: newAdminId(),
            title: 'Nouvelle actualité',
            dateLabel: new Date().toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            excerpt: '',
            body: '',
            published: true,
          },
        ],
      },
    }))
  }

  function removeItem(index: number) {
    if (!window.confirm('Supprimer cette actualité ?')) return
    setState((s) => ({
      ...s,
      articles: { ...s.articles, items: s.articles.items.filter((_, i) => i !== index) },
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Actualités"
        subtitle="Publiez des nouvelles : compte-rendu de foire, nouvelle de Kaïron, infos de l’association…"
      />
      <AdminHelpBox>
        Cochez <strong>Afficher sur le site</strong> pour que l’actualité soit visible. Décochez
        pour la garder en brouillon.
      </AdminHelpBox>
      <AdminSection title="Titre de la section" variant="orange">
        <AdminSectionHeaderFields
          eyebrow={articles.eyebrow}
          title={articles.title}
          intro={articles.intro}
          onEyebrow={(v) => patchArticles({ eyebrow: v })}
          onTitle={(v) => patchArticles({ title: v })}
          onIntro={(v) => patchArticles({ intro: v })}
        />
      </AdminSection>
      <AdminSection title="Vos actualités" variant="leaf">
        <div className="space-y-6">
          {articles.items.length === 0 ? (
            <p className="text-base text-muted">Aucune actualité pour l’instant — ajoutez-en une ci-dessous.</p>
          ) : null}
          {articles.items.map((item, index) => (
            <div key={item.id} className="rounded-xl border-2 border-sage/20 bg-ivory/60 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-base font-semibold text-ink">{item.title || `Actualité ${index + 1}`}</p>
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-sage/30 bg-paper px-3 py-2 text-sm font-medium text-ink">
                    <input
                      type="checkbox"
                      checked={item.published}
                      onChange={(e) => updateItem(index, { published: e.target.checked })}
                      className="size-4 accent-leaf"
                    />
                    Afficher sur le site
                  </label>
                  <AdminDeleteButton onClick={() => removeItem(index)} />
                </div>
              </div>
              <div className="grid gap-4">
                <AdminField label="Titre" value={item.title} onChange={(v) => updateItem(index, { title: v })} />
                <AdminField
                  label="Date affichée"
                  hint="Ex. 7 juin 2026"
                  value={item.dateLabel}
                  onChange={(v) => updateItem(index, { dateLabel: v })}
                />
                <AdminField
                  label="Résumé (court)"
                  hint="Une ou deux phrases visibles en premier."
                  value={item.excerpt}
                  onChange={(v) => updateItem(index, { excerpt: v })}
                  multiline
                  rows={2}
                />
                <AdminField
                  label="Texte complet"
                  value={item.body}
                  onChange={(v) => updateItem(index, { body: v })}
                  multiline
                  rows={6}
                />
              </div>
            </div>
          ))}
          <AdminAddButton onClick={addItem}>Ajouter une actualité</AdminAddButton>
        </div>
      </AdminSection>
    </div>
  )
}
