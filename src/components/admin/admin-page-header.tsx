// src/components/admin/admin-page-header.tsx
interface AdminPageHeaderProps {
  title: string
  subtitle?: string
}

export function AdminPageHeader({ title, subtitle }: AdminPageHeaderProps) {
  return (
    <header className="space-y-3">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </header>
  )
}
