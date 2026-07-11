// src/components/admin/admin-auto-save-note.tsx
import { useAdmin } from '../../hooks/use-admin'

export function AdminAutoSaveNote() {
  const { isSaving, saveError } = useAdmin()

  return (
    <div className="space-y-2">
      <p className="rounded-xl border border-sage/25 bg-paper px-4 py-3 text-sm text-muted">
        <span className="font-semibold text-leaf">✓ Enregistrement en ligne</span>
        {' — '}
        Vos modifications sont enregistrées pour <strong className="text-ink">tous les visiteurs</strong>
        , sur tous les téléphones et ordinateurs. Cliquez sur{' '}
        <strong className="text-ink">Voir le site</strong> pour vérifier.
      </p>
      {isSaving ? (
        <p className="text-sm font-medium text-leaf">Enregistrement en cours…</p>
      ) : null}
      {saveError ? (
        <p className="rounded-lg bg-orange/10 px-3 py-2 text-sm font-medium text-orange">
          {saveError}
        </p>
      ) : null}
    </div>
  )
}
