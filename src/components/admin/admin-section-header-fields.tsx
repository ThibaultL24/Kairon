// src/components/admin/admin-section-header-fields.tsx
import { AdminField } from './admin-field'

interface AdminSectionHeaderFieldsProps {
  eyebrow: string
  title: string
  intro?: string
  onEyebrow: (v: string) => void
  onTitle: (v: string) => void
  onIntro?: (v: string) => void
}

export function AdminSectionHeaderFields({
  eyebrow,
  title,
  intro,
  onEyebrow,
  onTitle,
  onIntro,
}: AdminSectionHeaderFieldsProps) {
  return (
    <div className="grid gap-4">
      <AdminField
        label="Petit titre (en haut, en vert)"
        hint="Exemple : Association, Parcours, Concret…"
        value={eyebrow}
        onChange={onEyebrow}
      />
      <AdminField
        label="Grand titre de la section"
        value={title}
        onChange={onTitle}
      />
      {intro !== undefined && onIntro ? (
        <AdminField
          label="Texte d’introduction"
          hint="Quelques phrases qui expliquent la section."
          value={intro}
          onChange={onIntro}
          multiline
          rows={3}
        />
      ) : null}
    </div>
  )
}
