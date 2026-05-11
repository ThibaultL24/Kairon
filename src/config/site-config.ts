// src/config/site-config.ts
/** Centralise URLs et chiffres affichés (à ajuster via `.env` ou ici après validation famille). */

function parseEuros(value: string | undefined, fallback: number): number {
  if (!value) return fallback
  const n = Number.parseInt(value.replace(/\s/g, ''), 10)
  return Number.isFinite(n) ? n : fallback
}

export const donationUrl =
  import.meta.env.VITE_DONATION_URL ?? 'https://www.leetchi.com/'

export const goalEuros = parseEuros(import.meta.env.VITE_GOAL_EUROS, 15_000)

export const collectedEuros = parseEuros(
  import.meta.env.VITE_COLLECTED_EUROS,
  0,
)

export const shareMessage =
  'Kaïron avance à son rythme — découvrez son histoire et comment l’aider.'
