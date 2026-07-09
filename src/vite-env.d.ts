/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSOCIATION_HELLOASSO_URL?: string
  readonly VITE_DONATION_URL?: string
  readonly VITE_GOAL_EUROS?: string
  readonly VITE_COLLECTED_EUROS?: string
  readonly VITE_ADMIN_IDENTIFIER?: string
  readonly VITE_ADMIN_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
