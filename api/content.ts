// api/content.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleContentRequest } from '../server/site-content.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Identifier, X-Admin-Password')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    const result = await handleContentRequest(
      req.method ?? 'GET',
      req.headers as Record<string, string | string[] | undefined>,
      req.body,
    )

    if (result.cacheControl) {
      res.setHeader('Cache-Control', result.cacheControl)
    }

    return res.status(result.status).json(result.body)
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
