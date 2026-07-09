// src/components/admin/admin-help-box.tsx
import type { ReactNode } from 'react'

interface AdminHelpBoxProps {
  title?: string
  children: ReactNode
}

export function AdminHelpBox({
  title = 'Bon à savoir',
  children,
}: AdminHelpBoxProps) {
  return (
    <div className="rounded-xl border border-leaf/25 bg-mint/50 px-4 py-3 text-sm leading-relaxed text-forest">
      <p className="font-semibold">{title}</p>
      <div className="mt-1 text-muted [&_strong]:text-ink">{children}</div>
    </div>
  )
}
