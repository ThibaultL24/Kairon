// src/components/admin/admin-action-buttons.tsx
interface AdminAddButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export function AdminAddButton({ children, onClick }: AdminAddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border-2 border-dashed border-leaf/45 bg-mint/40 px-4 py-4 text-base font-semibold text-forest transition hover:border-leaf hover:bg-mint/70 sm:w-auto sm:px-6"
    >
      + {children}
    </button>
  )
}

interface AdminDeleteButtonProps {
  onClick: () => void
  label?: string
}

export function AdminDeleteButton({
  onClick,
  label = 'Supprimer',
}: AdminDeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-sm font-medium text-orange transition hover:bg-orange/10"
    >
      {label}
    </button>
  )
}
