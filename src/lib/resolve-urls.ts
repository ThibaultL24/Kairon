// src/lib/resolve-urls.ts
export function resolveAssociationUrl(fallback: string): string {
  return import.meta.env.VITE_ASSOCIATION_HELLOASSO_URL ?? fallback
}

export function resolveDonationUrl(fallback: string): string {
  return import.meta.env.VITE_DONATION_URL ?? fallback
}
