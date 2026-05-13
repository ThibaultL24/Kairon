// src/config/site-config.ts
/** Centralise URLs et chiffres affichés (à ajuster via `.env` ou ici après validation famille). */

function parseEuros(value: string | undefined, fallback: number): number {
  if (!value) return fallback
  const n = Number.parseInt(value.replace(/\s/g, ''), 10)
  return Number.isFinite(n) ? n : fallback
}

/** Page vitrine de l’association sur HelloAsso (adhésions, infos, dons). */
export const associationHelloAssoUrl =
  import.meta.env.VITE_ASSOCIATION_HELLOASSO_URL ??
  'https://www.helloasso.com/associations/un-souffle-d-espoir-pour-kairon'

/** Formulaire de don officiel de l’association (HelloAsso). Surcharge possible via `.env`. */
export const donationUrl =
  import.meta.env.VITE_DONATION_URL ??
  'https://www.helloasso.com/associations/un-souffle-d-espoir-pour-kairon/formulaires/2'

export interface UpcomingEvent {
  title: string
  dateLabel: string
  detail: string
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    title: 'Foire du printemps',
    dateLabel: 'Printemps 2026 — date à confirmer',
    detail:
      'Stand de l’association : la date exacte sera annoncée ici dès qu’elle sera fixée.',
  },
]

export const goalEuros = parseEuros(import.meta.env.VITE_GOAL_EUROS, 15_000)

export const collectedEuros = parseEuros(
  import.meta.env.VITE_COLLECTED_EUROS,
  0,
)

export const shareMessage =
  'Kaïron avance à son rythme — découvrez son histoire et comment l’aider.'
