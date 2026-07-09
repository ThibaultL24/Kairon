// src/components/admin/admin-auto-save-note.tsx
export function AdminAutoSaveNote() {
  return (
    <p className="rounded-xl border border-sage/25 bg-paper px-4 py-3 text-sm text-muted">
      <span className="font-semibold text-leaf">✓ Enregistrement automatique</span>
      {' — '}
      Dès que vous modifiez un texte, c’est sauvegardé. Cliquez sur{' '}
      <strong className="text-ink">Voir le site</strong> pour vérifier le résultat.
    </p>
  )
}
