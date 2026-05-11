// src/components/section-photo.tsx
interface SectionPhotoProps {
  /** Numéro du fichier `/public/kairon{n}.jpeg` */
  n: number
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function SectionPhoto({
  n,
  alt = 'Kaïron',
  className = '',
  loading = 'lazy',
  fetchPriority,
}: SectionPhotoProps) {
  return (
    <img
      src={`/kairon${n}.jpeg`}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      {...(fetchPriority ? { fetchPriority } : {})}
    />
  )
}
