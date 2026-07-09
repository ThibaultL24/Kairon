// src/lib/admin-types.ts
export const SECTION_IDS = [
  'accueil',
  'qui',
  'histoire',
  'comprendre',
  'pourquoi',
  'objectif',
  'evenements',
  'articles',
  'don',
  'temoignage',
  'galerie',
  'partager',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export type SectionVisibility = Record<SectionId, boolean>

export interface TimelineEntry {
  id: string
  title: string
  body: string
}

export interface NeedRow {
  id: string
  need: string
  why: string
}

export interface SiteEvent {
  id: string
  title: string
  dateLabel: string
  detail: string
  posterSrc?: string
  posterAlt?: string
}

export interface SiteArticle {
  id: string
  title: string
  dateLabel: string
  excerpt: string
  body: string
  published: boolean
}

export interface HeroContent {
  associationBadge: string
  title: string
  titleAccent: string
  intro: string
  helloAssoNote: string
  ctaPrimary: string
  ctaSecondary: string
  photoNumber: number
}

export interface AboutContent {
  eyebrow: string
  title: string
  paragraph1: string
  paragraph2: string
  associationNote: string
  photoNote: string
  photoNumber: number
}

export interface StoryContent {
  eyebrow: string
  title: string
  photoNumber: number
  entries: TimelineEntry[]
}

export interface Grin2bContent {
  eyebrow: string
  title: string
  paragraph1: string
  paragraph2: string
  quote: string
  photoNumber: number
}

export interface WhyHelpContent {
  eyebrow: string
  title: string
  intro: string
  closingQuote: string
  photoNumber: number
  rows: NeedRow[]
}

export interface GoalContent {
  eyebrow: string
  title: string
  intro: string
  footer: string
  photoNumber: number
  goalEuros: number
  collectedEuros: number
}

export interface EventsContent {
  eyebrow: string
  title: string
  intro: string
  items: SiteEvent[]
}

export interface ArticlesContent {
  eyebrow: string
  title: string
  intro: string
  items: SiteArticle[]
}

export interface TestimonyContent {
  eyebrow: string
  title: string
  signature: string
  paragraphs: string[]
}

export interface GalleryContent {
  eyebrow: string
  title: string
  intro: string
  photoNumbers: number[]
}

export interface ShareContent {
  eyebrow: string
  title: string
  intro: string
  shareMessage: string
}

export interface DonateContent {
  eyebrow: string
  title: string
  body: string
  footer: string
  photoNumber: number
}

export interface SiteUrls {
  associationHelloAsso: string
  donation: string
}

export interface AdminState {
  sections: SectionVisibility
  urls: SiteUrls
  hero: HeroContent
  about: AboutContent
  story: StoryContent
  grin2b: Grin2bContent
  whyHelp: WhyHelpContent
  goal: GoalContent
  events: EventsContent
  articles: ArticlesContent
  testimony: TestimonyContent
  gallery: GalleryContent
  share: ShareContent
  donate: DonateContent
}

export const ADMIN_STORAGE_KEY = 'kairon-admin-state-v1'
export const ADMIN_SESSION_KEY = 'kairon-admin-session'
