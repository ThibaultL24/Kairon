// src/contexts/admin-context.tsx
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AdminContext } from './admin-context-value'
import { getDefaultAdminState } from '../lib/admin-defaults'
import { mergeImportedAdminState, persistedAdminPayload } from '../lib/admin-merge'
import {
  clearAdminCredentials,
  fetchSiteContent,
  saveSiteContent,
  storeAdminCredentials,
} from '../lib/content-api'
import { ADMIN_SESSION_KEY, type AdminState } from '../lib/admin-types'

const DEFAULT_ADMIN_IDENTIFIER = 'kairon123'
const DEFAULT_ADMIN_PASSWORD = 'kairon123'

function readSession(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setStateInternal] = useState<AdminState>(getDefaultAdminState())
  const [isAuthenticated, setIsAuthenticated] = useState(readSession)
  const [isContentReady, setIsContentReady] = useState(false)
  const [contentError, setContentError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const skipNextSave = useRef(true)

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

  useEffect(() => {
    if (!isContentReady || !isAuthenticated) return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }

    const timer = window.setTimeout(() => {
      setIsSaving(true)
      setSaveError(null)
      void saveSiteContent(persistedAdminPayload(state))
        .then(() => setSaveError(null))
        .catch((error: unknown) => {
          setSaveError(
            error instanceof Error ? error.message : 'Enregistrement impossible pour le moment.',
          )
        })
        .finally(() => setIsSaving(false))
    }, 700)

    return () => window.clearTimeout(timer)
  }, [state, isContentReady, isAuthenticated])

  const setState = useCallback((next: AdminState | ((prev: AdminState) => AdminState)) => {
    setStateInternal(next)
  }, [])

  const login = useCallback((identifier: string, password: string) => {
    const expectedId =
      (import.meta.env.VITE_ADMIN_IDENTIFIER as string | undefined) ?? DEFAULT_ADMIN_IDENTIFIER
    const expectedPw =
      (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? DEFAULT_ADMIN_PASSWORD
    if (identifier !== expectedId || password !== expectedPw) return false
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
    storeAdminCredentials(identifier, password)
    setIsAuthenticated(true)
    return true
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    clearAdminCredentials()
    setIsAuthenticated(false)
  }, [])

  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultAdminState()
    setStateInternal(defaults)
    if (isAuthenticated) {
      setIsSaving(true)
      void saveSiteContent(persistedAdminPayload(defaults))
        .catch((error: unknown) => {
          setSaveError(error instanceof Error ? error.message : 'Réinitialisation non enregistrée.')
        })
        .finally(() => setIsSaving(false))
    }
  }, [isAuthenticated])

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
          setIsSaving(true)
          void saveSiteContent(persistedAdminPayload(parsed))
            .catch((error: unknown) => {
              setSaveError(error instanceof Error ? error.message : 'Import non enregistré en ligne.')
            })
            .finally(() => setIsSaving(false))
        }
        return { ok: true as const }
      } catch (e) {
        return {
          ok: false as const,
          error: e instanceof Error ? e.message : 'Fichier invalide',
        }
      }
    },
    [isAuthenticated],
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
      login,
      logout,
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
      login,
      logout,
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
