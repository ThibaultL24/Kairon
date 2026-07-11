// src/lib/content-api.ts
import type { AdminState } from './admin-types'

const ADMIN_CREDENTIALS_KEY = 'kairon-admin-credentials'

interface StoredCredentials {
  identifier: string
  password: string
}

export function storeAdminCredentials(identifier: string, password: string): void {
  sessionStorage.setItem(
    ADMIN_CREDENTIALS_KEY,
    JSON.stringify({ identifier, password } satisfies StoredCredentials),
  )
}

export function clearAdminCredentials(): void {
  sessionStorage.removeItem(ADMIN_CREDENTIALS_KEY)
}

function readAdminCredentials(): StoredCredentials | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_CREDENTIALS_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredCredentials
  } catch {
    return null
  }
}

export async function fetchSiteContent(): Promise<AdminState | null> {
  const response = await fetch('/api/content', {
    cache: 'no-store',
  })

  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error('Impossible de charger le contenu du site')
  }

  return (await response.json()) as AdminState
}

export async function saveSiteContent(state: AdminState): Promise<void> {
  const credentials = readAdminCredentials()
  if (!credentials) {
    throw new Error('Reconnectez-vous à l’espace admin pour enregistrer.')
  }

  const response = await fetch('/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Identifier': credentials.identifier,
      'X-Admin-Password': credentials.password,
    },
    body: JSON.stringify(state),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(payload?.error ?? 'Enregistrement impossible')
  }
}
