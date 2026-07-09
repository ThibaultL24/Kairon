// src/lib/admin-merge.ts
import { getDefaultAdminState } from './admin-defaults'
import type { AdminState, SectionId } from './admin-types'
import { SECTION_IDS } from './admin-types'

function mergeSections(
  defaults: AdminState['sections'],
  partial?: Partial<AdminState['sections']>,
): AdminState['sections'] {
  if (!partial) return defaults
  const next = { ...defaults }
  for (const id of SECTION_IDS) {
    if (typeof partial[id] === 'boolean') next[id as SectionId] = partial[id]!
  }
  return next
}

function pickArray<T>(saved: T[] | undefined, fallback: T[]): T[] {
  return Array.isArray(saved) ? saved : fallback
}

export function mergeImportedAdminState(parsed: Partial<AdminState>): AdminState {
  const defaults = getDefaultAdminState()
  return {
    ...defaults,
    ...parsed,
    sections: mergeSections(defaults.sections, parsed.sections),
    urls: { ...defaults.urls, ...parsed.urls },
    hero: { ...defaults.hero, ...parsed.hero },
    about: { ...defaults.about, ...parsed.about },
    story: {
      ...defaults.story,
      ...parsed.story,
      entries: pickArray(parsed.story?.entries, defaults.story.entries),
    },
    grin2b: { ...defaults.grin2b, ...parsed.grin2b },
    whyHelp: {
      ...defaults.whyHelp,
      ...parsed.whyHelp,
      rows: pickArray(parsed.whyHelp?.rows, defaults.whyHelp.rows),
    },
    goal: { ...defaults.goal, ...parsed.goal },
    events: {
      ...defaults.events,
      ...parsed.events,
      items: pickArray(parsed.events?.items, defaults.events.items),
    },
    articles: {
      ...defaults.articles,
      ...parsed.articles,
      items: pickArray(parsed.articles?.items, defaults.articles.items),
    },
    testimony: {
      ...defaults.testimony,
      ...parsed.testimony,
      paragraphs: pickArray(parsed.testimony?.paragraphs, defaults.testimony.paragraphs),
    },
    gallery: {
      ...defaults.gallery,
      ...parsed.gallery,
      photoNumbers: pickArray(parsed.gallery?.photoNumbers, defaults.gallery.photoNumbers),
    },
    share: { ...defaults.share, ...parsed.share },
    donate: { ...defaults.donate, ...parsed.donate },
  }
}

export function persistedAdminPayload(state: AdminState): AdminState {
  return state
}
