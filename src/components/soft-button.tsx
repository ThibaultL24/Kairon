// src/components/soft-button.tsx
import type { ReactNode } from 'react'

interface SoftButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'contrast'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const baseClass =
  'inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-[0.95rem] font-semibold tracking-wide transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue'

const variants: Record<NonNullable<SoftButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-br from-blue to-blue-deep text-paper shadow-[0_14px_32px_rgba(47,111,163,0.22)] hover:from-blue-deep hover:to-blue-night hover:shadow-[0_18px_40px_rgba(47,111,163,0.28)]',
  secondary:
    'border border-linen bg-paper text-ink hover:border-blue/35 hover:bg-blue-soft/60 hover:text-blue',
  ghost: 'text-muted hover:bg-cream hover:text-ink',
  contrast:
    'border border-paper/70 bg-paper text-blue shadow-lg hover:bg-apricot/50 hover:text-ink',
}

export function SoftButton({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: SoftButtonProps) {
  const classes = `${baseClass} ${variants[variant]} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} rel="noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
