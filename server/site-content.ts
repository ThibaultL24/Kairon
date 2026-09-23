// server/site-content.ts
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { Redis } from '@upstash/redis'

const REDIS_KEY = 'kairon:site-content'
const FILE_NAME = 'site-content.json'

function contentFilePath(): string {
  return join(process.cwd(), 'public', FILE_NAME)
}

function hasRedis(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

function redisClient(): Redis {
  return Redis.fromEnv()
}

/** Normalize a header that may be string | string[] | undefined. */
function headerValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

async function readStaticDeployedFile(): Promise<unknown | null> {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.SITE_URL ?? null

  if (!base) return null

  try {
    const response = await fetch(`${base}/${FILE_NAME}`, { cache: 'no-store' })
    if (!response.ok) return null
    return (await response.json()) as unknown
  } catch {
    return null
  }
}

export function validateAdminCredentials(identifier: string, password: string): boolean {
  const expectedId = process.env.ADMIN_IDENTIFIER ?? process.env.VITE_ADMIN_IDENTIFIER ?? 'kairon123'
  const expectedPw = process.env.ADMIN_PASSWORD ?? process.env.VITE_ADMIN_PASSWORD ?? 'kairon123'
  return identifier === expectedId && password === expectedPw
}

export async function readSiteContent(): Promise<unknown | null> {
  if (hasRedis()) {
    try {
      const stored = await redisClient().get(REDIS_KEY)
      if (stored) return stored
    } catch {
      /* fallback below */
    }
  }

  const filePath = contentFilePath()
  if (existsSync(filePath)) {
    try {
      return JSON.parse(readFileSync(filePath, 'utf8')) as unknown
    } catch {
      /* fallback below */
    }
  }

  return readStaticDeployedFile()
}

export async function writeSiteContent(data: unknown): Promise<void> {
  if (hasRedis()) {
    await redisClient().set(REDIS_KEY, data)
    return
  }

  if (process.env.VERCEL) {
    throw new Error(
      'Stockage Redis manquant : les modifications ne peuvent pas être publiées pour les autres visiteurs. Sur Vercel, ajoutez l’intégration Upstash Redis (UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN), puis redéployez.',
    )
  }

  writeFileSync(contentFilePath(), JSON.stringify(data), 'utf8')
}

export function isRemoteStorageConfigured(): boolean {
  return hasRedis()
}

export async function handleContentRequest(
  method: string,
  headers: Record<string, string | string[] | undefined>,
  body: unknown,
): Promise<{ status: number; body: unknown; cacheControl?: string }> {
  if (method === 'GET') {
    const content = await readSiteContent()
    if (!content) {
      return { status: 404, body: { error: 'Contenu introuvable' } }
    }
    return {
      status: 200,
      body: content,
      cacheControl: 'public, s-maxage=15, stale-while-revalidate=30',
    }
  }

  if (method === 'POST') {
    const identifier = headerValue(headers['x-admin-identifier'])
    const password = headerValue(headers['x-admin-password'])

    if (!validateAdminCredentials(identifier, password)) {
      return { status: 401, body: { error: 'Identifiants incorrects' } }
    }

    if (!body || typeof body !== 'object') {
      return { status: 400, body: { error: 'Données invalides' } }
    }

    const payload = body as Record<string, unknown>

    // Auth-only probe: validate credentials without writing content.
    if (payload.__authCheck === true) {
      return {
        status: 200,
        body: { ok: true, storageConfigured: isRemoteStorageConfigured() },
      }
    }

    try {
      await writeSiteContent(body)
      return { status: 200, body: { ok: true, storageConfigured: isRemoteStorageConfigured() } }
    } catch (error) {
      return {
        status: 500,
        body: {
          error: error instanceof Error ? error.message : 'Impossible d’enregistrer le contenu',
        },
      }
    }
  }

  return { status: 405, body: { error: 'Méthode non autorisée' } }
}
