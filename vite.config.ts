// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage } from 'node:http'
import { defineConfig, type Plugin } from 'vite'
import { handleContentRequest } from './server/site-content'

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(raw) as unknown)
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function siteContentApiPlugin(): Plugin {
  return {
    name: 'site-content-api',
    configureServer(server) {
      server.middlewares.use('/api/content', (req, res, next) => {
        void (async () => {
          if (req.method === 'OPTIONS') {
            res.statusCode = 204
            res.end()
            return
          }

          if (req.method !== 'GET' && req.method !== 'POST') {
            next()
            return
          }

          try {
            const body = req.method === 'POST' ? await readJsonBody(req) : null
            const result = await handleContentRequest(
              req.method,
              req.headers as Record<string, string | string[] | undefined>,
              body,
            )

            res.setHeader('Content-Type', 'application/json')
            if (result.cacheControl) {
              res.setHeader('Cache-Control', result.cacheControl)
            }
            res.statusCode = result.status
            res.end(JSON.stringify(result.body))
          } catch {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Erreur serveur' }))
          }
        })()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteContentApiPlugin()],
})
