// src/contexts/admin-context.tsx
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AdminContext } from './admin-context-value'
import { getDefaultAdminState } from '../lib/admin-defaults'
import { mergeImportedAdminState, persistedAdminPayload } from '../lib/admin-merge'
import {
  clearAdminCredentials,
  fetchSiteContent,
  hasAdminCredentials,
  saveSiteContent,
  storeAdminCredentials,
  verifyAdminCredentials,
} from '../lib/content-api'
import { ADMIN_SESSION_KEY, type AdminState } from '../lib/admin-types'

function readSession(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1' && hasAdminCredentials()
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setStateInternal] = useState<AdminState>(getDefaultAdminState())
  const [isAuthenticated, setIsAuthenticated] = useState(readSession)
  const [isContentReady, setIsContentReady] = useState(false)
  const [contentError, setContentError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [storageConfigured, setStorageConfigured] = useState<boolean | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)
  const skipNextSave = useRef(true)
  const stateRef = useRef(state)
  stateRef.current = state

  // Drop stale session flag if credentials were cleared (e.g. new tab without sessionStorage pair).
  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_SESSION_KEY) === '1' && !hasAdminCredentials()) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY)
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const remote = await fetchSiteContent()
        if (cancelled) return
        if (remote) {
          setStateInternal(mergeImportedAdminState(remote))
        }
        setContentError(null)
      } catch {
        if (!cancelled) {
          setContentError('Le contenu en ligne n’a pas pu être chargé. Affichage par défaut.')
        }
      } finally {
        if (!cancelled) {
          setIsContentReady(true)
          skipNextSave.current = true
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const persistNow = useCallback(async (nextState: AdminState) => {
    setIsSaving(true)
    setSaveError(null)
    try {
      await saveSiteContent(persistedAdminPayload(nextState))
      setSaveError(null)
      setLastSavedAt(Date.now())
    } catch (error: unknown) {
      setSaveError(
        error instanceof Error ? error.message : 'Enregistrement impossible pour le moment.',
      )
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [])

  useEffect(() => {
    if (!isContentReady || !isAuthenticated) return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }

    const timer = window.setTimeout(() => {
      void persistNow(state).catch(() => {
        /* saveError already set */
      })
    }, 700)

    return () => window.clearTimeout(timer)
  }, [state, isContentReady, isAuthenticated, persistNow])

  const setState = useCallback((next: AdminState | ((prev: AdminState) => AdminState)) => {
    setStateInternal(next)
  }, [])

  const login = useCallback(async (identifier: string, password: string) => {
    const result = await verifyAdminCredentials(identifier, password)
    if (!result.ok) {
      return { ok: false as const, error: result.error }
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
    storeAdminCredentials(identifier, password)
    setStorageConfigured(result.storageConfigured)
    setIsAuthenticated(true)
    skipNextSave.current = true

    if (!result.storageConfigured) {
      setSaveError(
        'Connexion OK, mais Redis (Upstash) n’est pas configuré sur le serveur : les modifications ne seront pas visibles pour les autres visiteurs tant que UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN ne sont pas définis sur Vercel.',
      )
    } else {
      setSaveError(null)
    }

    return { ok: true as const }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    clearAdminCredentials()
    setIsAuthenticated(false)
    setStorageConfigured(null)
    setLastSavedAt(null)
    setSaveError(null)
  }, [])

  const saveNow = useCallback(async () => {
    if (!isAuthenticated) return
    skipNextSave.current = true
    try {
      await persistNow(stateRef.current)
    } catch {
      /* saveError already set */
    }
  }, [isAuthenticated, persistNow])

  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultAdminState()
    setStateInternal(defaults)
    if (isAuthenticated) {
      skipNextSave.current = true
      void persistNow(defaults).catch(() => {
        /* saveError already set */
      })
    }
  }, [isAuthenticated, persistNow])

  const exportStateJson = useCallback(
    () => JSON.stringify(persistedAdminPayload(state), null, 2),
    [state],
  )

  const importState = useCallback(
    (json: string) => {
      try {
        const parsed = mergeImportedAdminState(JSON.parse(json) as Partial<AdminState>)
        setStateInternal(parsed)
        if (isAuthenticated) {
          skipNextSave.current = true
          void persistNow(parsed).catch(() => {
            /* saveError already set */
          })
        }
        return { ok: true as const }
      } catch (e) {
        return {
          ok: false as const,
          error: e instanceof Error ? e.message : 'Fichier invalide',
        }
      }
    },
    [isAuthenticated, persistNow],
  )

  const value = useMemo(
    () => ({
      state,
      setState,
      isAuthenticated,
      isContentReady,
      contentError,
      isSaving,
      saveError,
      storageConfigured,
      lastSavedAt,
      login,
      logout,
      saveNow,
      resetToDefaults,
      importState,
      exportStateJson,
    }),
    [
      state,
      setState,
      isAuthenticated,
      isContentReady,
      contentError,
      isSaving,
      saveError,
      storageConfigured,
      lastSavedAt,
      login,
      logout,
      saveNow,
      resetToDefaults,
      importState,
      exportStateJson,
    ],
  )

  if (!isContentReady) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-mist px-4">
        <div className="max-w-sm rounded-2xl border border-sage/30 bg-paper p-8 text-center shadow-sm">
          <p className="font-display text-2xl text-ink">Chargement du site…</p>
          <p className="mt-2 text-sm text-muted">Récupération du contenu en ligne.</p>
        </div>
      </div>
    )
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
