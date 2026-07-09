// src/pages/admin/admin-galerie-page.tsx
import { AdminAddButton } from '../../components/admin/admin-action-buttons'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { AdminSectionHeaderFields } from '../../components/admin/admin-section-header-fields'
import { useAdmin } from '../../hooks/use-admin'

export function AdminGaleriePage() {
  const { state, setState } = useAdmin()
  const gallery = state.gallery

  function patch(partial: Partial<typeof gallery>) {
    setState((s) => ({ ...s, gallery: { ...s.gallery, ...partial } }))
  }

  function updatePhotoNumber(index: number, value: number) {
    const photoNumbers = [...gallery.photoNumbers]
    photoNumbers[index] = value
    patch({ photoNumbers })
  }

  function addPhoto() {
    patch({ photoNumbers: [...gallery.photoNumbers, 1] })
  }

  function removePhoto(index: number) {
    if (!window.confirm('Retirer cette photo de la galerie ?')) return
    patch({ photoNumbers: gallery.photoNumbers.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Galerie photos"
        subtitle="Choisissez quelles photos apparaissent sur le site et dans quel ordre."
      />
      <AdminHelpBox>
        Chaque photo correspond à un numéro (photo 1, photo 2…). Cliquez sur la miniature pour
        changer, ou supprimez une ligne pour retirer une photo de la galerie.
      </AdminHelpBox>
      <AdminSection title="Titre de la galerie" variant="orange">
        <AdminSectionHeaderFields
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          intro={gallery.intro}
          onEyebrow={(v) => patch({ eyebrow: v })}
          onTitle={(v) => patch({ title: v })}
          onIntro={(v) => patch({ intro: v })}
        />
      </AdminSection>
      <AdminSection title="Photos affichées" variant="leaf">
        <div className="space-y-4">
          {gallery.photoNumbers.map((num, index) => (
            <div
              key={`${index}-${num}`}
              className="flex flex-col gap-3 rounded-xl border border-sage/25 bg-ivory/50 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={`/kairon${num}.jpeg`}
                alt=""
                className="size-20 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-sm font-medium text-muted">Photo {index + 1} dans la galerie</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 33 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => updatePhotoNumber(index, n)}
                      className={[
                        'size-10 overflow-hidden rounded-md border-2',
                        num === n ? 'border-leaf' : 'border-transparent opacity-70 hover:opacity-100',
                      ].join(' ')}
                    >
                      <img src={`/kairon${n}.jpeg`} alt="" className="size-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="shrink-0 text-sm font-medium text-orange hover:underline"
              >
                Retirer
              </button>
            </div>
          ))}
          <AdminAddButton onClick={addPhoto}>Ajouter une photo à la galerie</AdminAddButton>
        </div>
      </AdminSection>
    </div>
  )
}
