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
  'inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-[0.95rem] font-semibold tracking-wide transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf'

const variants: Record<NonNullable<SoftButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-br from-leaf to-forest text-paper shadow-[0_14px_32px_rgba(15,61,38,0.28)] hover:from-moss hover:to-forest hover:shadow-[0_18px_40px_rgba(15,61,38,0.35)]',
  secondary:
    'border border-sage/50 bg-paper text-ink hover:border-leaf/55 hover:bg-mint/90 hover:text-forest',
  ghost: 'text-muted hover:bg-mist hover:text-forest',
  contrast:
    'border border-paper/80 bg-paper text-forest shadow-lg hover:bg-apricot/55 hover:text-ink',
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
