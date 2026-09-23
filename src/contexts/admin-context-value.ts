// src/contexts/admin-context-value.ts
import { createContext } from 'react'
import type { AdminState } from '../lib/admin-types'

export interface AdminContextValue {
  state: AdminState
  setState: (next: AdminState | ((prev: AdminState) => AdminState)) => void
  isAuthenticated: boolean
  isContentReady: boolean
  contentError: string | null
  isSaving: boolean
  saveError: string | null
  storageConfigured: boolean | null
  lastSavedAt: number | null
  login: (
    identifier: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  logout: () => void
  saveNow: () => Promise<void>
  resetToDefaults: () => void
  importState: (json: string) => { ok: boolean; error?: string }
  exportStateJson: () => string
}

export const AdminContext = createContext<AdminContextValue | null>(null)
