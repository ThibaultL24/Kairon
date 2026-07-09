// src/components/admin/admin-section.tsx
import type { ReactNode } from 'react'

export type AdminSectionVariant = 'leaf' | 'orange' | 'forest' | 'sage'

const barClass: Record<AdminSectionVariant, string> = {
  leaf: 'bg-leaf',
  orange: 'bg-orange',
  forest: 'bg-forest',
  sage: 'bg-sage',
}

interface AdminSectionProps {
  title: string
  description?: string
  variant?: AdminSectionVariant
  children: ReactNode
}

export function AdminSection({
  title,
  description,
  variant = 'leaf',
  children,
}: AdminSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-sage/30 bg-paper shadow-sm">
      <div className={`h-1 w-full ${barClass[variant]}`} aria-hidden />
      <div className="space-y-4 p-5">
        <div>
          <h2 className="font-display text-xl text-ink">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
