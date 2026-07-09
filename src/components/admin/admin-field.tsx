// src/components/admin/admin-field.tsx
import type { ChangeEvent } from 'react'

interface AdminFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  hint?: string
  multiline?: boolean
  rows?: number
  type?: 'text' | 'number' | 'url'
  placeholder?: string
}

export function AdminField({
  label,
  value,
  onChange,
  hint,
  multiline,
  rows = 4,
  type = 'text',
  placeholder,
}: AdminFieldProps) {
  return (
    <label className="block">
      {label ? (
        <>
          <span className="text-base font-semibold text-ink">{label}</span>
          {hint ? (
            <span className="mt-0.5 block text-xs leading-relaxed text-muted">{hint}</span>
          ) : null}
        </>
      ) : null}
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          rows={rows}
          className={`admin-input text-base${label || hint ? ' mt-2' : ''}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className={`admin-input text-base${label || hint ? ' mt-2' : ''}`}
        />
      )}
    </label>
  )
}
