// src/components/admin/string-list-editor.tsx
import { AdminField } from './admin-field'
import { AdminAddButton } from './admin-action-buttons'

interface StringListEditorProps {
  label: string
  hint?: string
  items: string[]
  onChange: (items: string[]) => void
  addLabel?: string
  multiline?: boolean
}

export function StringListEditor({
  label,
  hint,
  items,
  onChange,
  addLabel = 'Ajouter un paragraphe',
  multiline = false,
}: StringListEditorProps) {
  function updateAt(index: number, value: string) {
    const next = [...items]
    next[index] = value
    onChange(next)
  }

  function removeAt(index: number) {
    if (!window.confirm('Supprimer ce paragraphe ?')) return
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-base font-semibold text-ink">{label}</p>
        {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      </div>
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-sage/25 bg-ivory/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-muted">Paragraphe {index + 1}</p>
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="text-sm font-medium text-orange hover:underline"
            >
              Supprimer
            </button>
          </div>
          <AdminField
            label=""
            value={item}
            onChange={(v) => updateAt(index, v)}
            multiline={multiline}
            rows={multiline ? 4 : undefined}
          />
        </div>
      ))}
      <AdminAddButton onClick={() => onChange([...items, ''])}>{addLabel}</AdminAddButton>
    </div>
  )
}
