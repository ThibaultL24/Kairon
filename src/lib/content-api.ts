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

export function readAdminCredentials(): StoredCredentials | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_CREDENTIALS_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredCredentials
  } catch {
    return null
  }
}

export function hasAdminCredentials(): boolean {
  const credentials = readAdminCredentials()
  return Boolean(credentials?.identifier && credentials?.password)
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

export type VerifyAdminResult =
  | { ok: true; storageConfigured: boolean }
  | { ok: false; error: string }

/** Probe POST /api/content with __authCheck so client and server credentials stay aligned. */
export async function verifyAdminCredentials(
  identifier: string,
  password: string,
): Promise<VerifyAdminResult> {
  try {
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Identifier': identifier,
        'X-Admin-Password': password,
      },
      body: JSON.stringify({ __authCheck: true }),
    })

    const payload = (await response.json().catch(() => null)) as
      | { ok?: boolean; storageConfigured?: boolean; error?: string }
      | null

    if (!response.ok) {
      return {
        ok: false,
        error: payload?.error ?? 'Identifiants incorrects',
      }
    }

    return {
      ok: true,
      storageConfigured: Boolean(payload?.storageConfigured),
    }
  } catch {
    return {
      ok: false,
      error: 'Impossible de joindre le serveur. Vérifiez votre connexion puis réessayez.',
    }
  }
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
