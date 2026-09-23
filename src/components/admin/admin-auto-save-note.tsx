// src/components/admin/admin-auto-save-note.tsx
import { useAdmin } from '../../hooks/use-admin'

function formatSavedAt(ts: number): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(ts))
  } catch {
    return new Date(ts).toLocaleTimeString('fr-FR')
  }
}

export function AdminAutoSaveNote() {
  const { isSaving, saveError, storageConfigured, lastSavedAt, saveNow } = useAdmin()

  return (
    <div className="space-y-2">
      <p className="rounded-xl border border-sage/25 bg-paper px-4 py-3 text-sm text-muted">
        <span className="font-semibold text-leaf">✓ Enregistrement en ligne</span>
        {' — '}
        Vos modifications sont enregistrées pour <strong className="text-ink">tous les visiteurs</strong>
        , sur tous les téléphones et ordinateurs. Cliquez sur{' '}
        <strong className="text-ink">Voir le site</strong> pour vérifier.
      </p>

      {storageConfigured === false ? (
        <p className="rounded-lg border border-orange/40 bg-orange/10 px-3 py-2 text-sm font-medium text-orange">
          Attention : Redis (Upstash) n’est pas configuré sur Vercel. Les changements peuvent
          s’enregistrer en local de développement, mais ne seront pas publiés pour les autres
          visiteurs tant que UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN ne sont pas
          définis.
        </p>
      ) : null}

      {saveError ? (
        <p className="rounded-lg border border-orange/50 bg-orange/15 px-3 py-2 text-sm font-semibold text-orange">
          {saveError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            void saveNow()
          }}
          disabled={isSaving}
          className="rounded-full bg-leaf px-4 py-2 text-sm font-bold text-paper shadow-sm transition hover:bg-forest disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? 'Enregistrement…' : 'Enregistrer maintenant'}
        </button>
        {isSaving ? (
          <span className="text-sm font-medium text-leaf">Enregistrement en cours…</span>
        ) : lastSavedAt ? (
          <span className="text-sm text-muted">Dernier enregistrement : {formatSavedAt(lastSavedAt)}</span>
        ) : null}
      </div>
    </div>
  )
}
