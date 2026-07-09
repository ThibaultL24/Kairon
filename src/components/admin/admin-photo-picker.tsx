// src/components/admin/admin-photo-picker.tsx
interface AdminPhotoPickerProps {
  label?: string
  value: number
  onChange: (n: number) => void
}

const PHOTO_COUNT = 33

export function AdminPhotoPicker({
  label = 'Choisir une photo',
  value,
  onChange,
}: AdminPhotoPickerProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="mt-1 text-xs text-muted">
          Cliquez sur une miniature pour la sélectionner. La photo choisie s’affiche en grand à
          droite.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="overflow-hidden rounded-xl border-2 border-leaf/40 bg-ivory sm:w-40 shrink-0">
          <img
            src={`/kairon${value}.jpeg`}
            alt={`Photo sélectionnée ${value}`}
            className="aspect-square w-full object-cover"
          />
          <p className="bg-paper px-2 py-1.5 text-center text-xs font-medium text-muted">
            Photo n° {value}
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex max-h-52 flex-wrap gap-2 overflow-y-auto rounded-xl border border-sage/25 bg-ivory/50 p-3">
            {Array.from({ length: PHOTO_COUNT }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                title={`Photo ${n}`}
                className={[
                  'overflow-hidden rounded-lg border-2 transition',
                  value === n
                    ? 'border-leaf ring-2 ring-leaf/25'
                    : 'border-transparent opacity-80 hover:border-sage/50 hover:opacity-100',
                ].join(' ')}
              >
                <img
                  src={`/kairon${n}.jpeg`}
                  alt=""
                  loading="lazy"
                  className="size-14 object-cover sm:size-16"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
