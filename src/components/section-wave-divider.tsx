// src/components/section-wave-divider.tsx
/** Courbe identique à la transition hero → « Qui est Kaïron » */
const WAVE_PATH =
  'M0,28 C220,60 460,6 720,24 C980,42 1220,8 1440,32 L1440,64 L0,64 Z'

interface SectionWaveDividerProps {
  /** Fond de la bandelette (souvent la fin de la section précédente) */
  bgClass: string
  /** Couleur de l’onde via `currentColor` (ex. text-leaf) */
  waveClass: string
  /** Opacité du remplissage de l’onde (0–1) */
  fillOpacity?: number
  /** Hauteur de la bande (défaut : même courbe que hero → qui est Kaïron) */
  heightClass?: string
}

export function SectionWaveDivider({
  bgClass,
  waveClass,
  fillOpacity = 0.12,
  heightClass = 'h-14',
}: SectionWaveDividerProps) {
  return (
    <div
      aria-hidden
      className={`relative w-full shrink-0 overflow-hidden ${heightClass} ${bgClass}`}
    >
      <svg
        className={`absolute bottom-0 left-0 w-[120%] max-w-none translate-x-[-8%] sm:w-full sm:translate-x-0 ${waveClass}`}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          fillOpacity={fillOpacity}
          d={WAVE_PATH}
        />
      </svg>
    </div>
  )
}
