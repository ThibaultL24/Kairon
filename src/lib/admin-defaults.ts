// src/lib/admin-defaults.ts
import { defaultTestimonyParagraphs } from '../data/testimony-defaults'
import type {
  AdminState,
  NeedRow,
  SectionId,
  SiteEvent,
  TimelineEntry,
} from './admin-types'
import { SECTION_IDS } from './admin-types'

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function id(): string {
  return crypto.randomUUID()
}

function defaultSections(): AdminState['sections'] {
  return Object.fromEntries(
    SECTION_IDS.map((sectionId) => [sectionId, true]),
  ) as Record<SectionId, boolean>
}

function defaultTimeline(): TimelineEntry[] {
  return [
    {
      id: id(),
      title: 'Naissance',
      body: "Les premiers signes apparaissent très tôt : pleurs intenses, épisodes où il arrête de respirer, besoin constant de contact. L'alimentation devient vite compliquée ; les nuits, presque absentes.",
    },
    {
      id: id(),
      title: 'Trois semaines',
      body: "Un malaise devant la pédiatre mène aux urgences. En pleine période Covid, la famille affronte seule l'hôpital, les examens, l'inconnu. Puis vient l'urgence : Kaïron doit être transféré en hélicoptère vers un centre spécialisé — un moment si brutal pour des jeunes parents qu'il dépasse ce qu'on peut exprimer avec des mots.",
    },
    {
      id: id(),
      title: 'Les premiers mois',
      body: "Hospitalisations, prises de sang, imagerie, EEG, ponctions, tests génétiques… Kaïron endure tout, tout petit et déjà très fort. Une alimentation par sonde s'impose ; le tonus et le regard posent question.",
    },
    {
      id: id(),
      title: 'Le diagnostic',
      body: "Après de longs mois d'attente : une mutation du gène GRIN2B. Une réponse, mais peu de certitudes sur la parole, la marche ou l'ampleur des progrès possibles — une famille qui choisit malgré tout de se battre.",
    },
    {
      id: id(),
      title: "Aujourd'hui",
      body: "Stages intensifs à l'étranger (notamment en Espagne), matériel adapté, séances spécialisées, et la présence du papa, de la maman, de la mamie, et de Louciana — sa petite sœur — qui applaudit chaque petit pas et célèbre chaque victoire. Kaïron avance, un jour après l'autre.",
    },
  ]
}

function defaultNeeds(): NeedRow[] {
  return [
    {
      id: id(),
      need: 'Stages de rééducation spécialisée (Barcelone, Pologne…)',
      why: "Seuls certains centres proposent une prise en charge ciblée GRIN2B avec des résultats concrets pour Kaïron — l'association aide à financer ces séjours. Chaque stage coûte 4 400 €, hors hébergement et frais annexes.",
    },
    {
      id: id(),
      need: 'Séances Snoezelen',
      why: 'Un espace de calme et de découvertes sensorielles pour apaiser, rassurer et créer du lien.',
    },
    {
      id: id(),
      need: 'Matériel adapté du quotidien',
      why: 'Chaussures adaptées et coques, bodys adaptés à la gastrostomie, équipements sur mesure : beaucoup de frais restent à la charge de la famille.',
    },
    {
      id: id(),
      need: 'Poussette médicalisée',
      why: 'Faciliter les déplacements et le confort dans la durée.',
    },
    {
      id: id(),
      need: 'Outil de communication (tablette, contrôle du regard)',
      why: 'Donner d’autres voies pour exprimer besoins, envies, présence.',
    },
    {
      id: id(),
      need: 'Frais de déplacement',
      why: 'Rendre possibles les soins spécialisés loin du domicile et les allers-retours du quotidien.',
    },
  ]
}

function defaultEvents(): SiteEvent[] {
  return [
    {
      id: id(),
      title: 'Foire du printemps',
      dateLabel: '7 juin 2026 · Althen-des-Paluds',
      detail:
        'L’association « Un souffle d’espoir pour Kaïron » sera présente sur un stand — venez nous rencontrer !',
      posterSrc: '/foire-althen-2026.png',
      posterAlt:
        'Affiche : l’association sera présente à la foire du printemps à Althen-des-Paluds le 7 juin 2026',
    },
  ]
}

export function getDefaultAdminState(): AdminState {
  return {
    sections: defaultSections(),
    urls: {
      associationHelloAsso:
        'https://www.helloasso.com/associations/un-souffle-d-espoir-pour-kairon',
      donation:
        'https://www.helloasso.com/associations/un-souffle-d-espoir-pour-kairon/formulaires/2',
    },
    hero: {
      associationBadge: 'Un souffle d’espoir pour Kaïron',
      title: 'Kaïron avance à son rythme.',
      titleAccent: 'Aidons-le à aller plus loin.',
      intro:
        'Kaïron a trois ans et demi. Une mutation rare du gène GRIN2B bouleverse son développement, son alimentation, son sommeil et sa motricité. L’association familiale collecte les dons pour financer stages, matériel et frais non pris en charge — afin que chaque progrès reste possible.',
      helloAssoNote: 'Page HelloAsso de l’association : actualités, adhésions et transparence.',
      ctaPrimary: 'Faire un don pour Kaïron',
      ctaSecondary: 'Découvrir son histoire',
      photoNumber: 6,
    },
    about: {
      eyebrow: 'Avant les mots du diagnostic',
      title: 'Qui est Kaïron ?',
      paragraph1:
        'Kaïron est un petit garçon lumineux, câlin et courageux. Il aime la musique, les livres, les jouets qui brillent et les objets qui tournent. Malgré les épreuves, il garde ce sourire qui donne à sa famille la force d’avancer.',
      paragraph2:
        'Derrière chaque geste simple — tenir assis, se mettre à quatre pattes, manger, communiquer — il y a pour lui un immense travail. Et chaque petit progrès devient une grande victoire.',
      associationNote:
        'L’association « Un souffle d’espoir pour Kaïron » sur HelloAsso porte les actions et la transparence des fonds.',
      photoNote:
        'Une photo plus récente de la famille (avec Louciana) remplacera bientôt les visuels dès notre shooting photo.',
      photoNumber: 25,
    },
    story: {
      eyebrow: 'Parcours',
      title: 'Son histoire, en quelques étapes',
      photoNumber: 24,
      entries: defaultTimeline(),
    },
    grin2b: {
      eyebrow: 'Pédagogique, sans promesse irréaliste',
      title: 'Comprendre GRIN2B',
      paragraph1:
        'Le gène GRIN2B joue un rôle important dans la communication entre les neurones. Lorsqu’il est altéré, cela peut entraîner des troubles du développement, du tonus, de l’alimentation, du sommeil, de la motricité, du langage ou encore des crises neurologiques.',
      paragraph2:
        'Chaque enfant atteint évolue différemment. Pour Kaïron, cela signifie beaucoup de soins, une surveillance constante et un accompagnement quotidien exigeant pour la famille.',
      quote:
        'Les soins et les stages ne garantissent rien, mais ils offrent à Kaïron les meilleures chances de progresser à son rythme — avec dignité, tendresse et exigence de vérité.',
      photoNumber: 21,
    },
    whyHelp: {
      eyebrow: 'Concret',
      title: 'Pourquoi aider ?',
      intro:
        'Les dons à l’association ne remplacent pas l’amour — ils l’épaulent. Voici les besoins que l’association aide à financer pour Kaïron.',
      closingQuote:
        'Pour beaucoup d’enfants, s’asseoir, manger ou se déplacer sont des étapes naturelles. Pour Kaïron, ce sont des montagnes. Votre aide peut l’aider à les gravir — sans spectacle, avec respect.',
      photoNumber: 17,
      rows: defaultNeeds(),
    },
    goal: {
      eyebrow: 'Transparence',
      title: 'Objectif de la cagnotte',
      intro:
        'Les dons à l’association « Un souffle d’espoir pour Kaïron » financent environ deux stages intensifs par an, du matériel adapté et les frais non remboursés liés au parcours de Kaïron. Les montants affichés pourront être affinés avec l’association : mieux vaut une estimation honnête qu’un appel flou.',
      footer:
        'Chaque don, même modeste, contribue aux soins, au matériel et aux stages. 5 €, 10 €, 20 € ou plus : chaque geste compte.',
      photoNumber: 8,
      goalEuros: 15_000,
      collectedEuros: 0,
    },
    events: {
      eyebrow: 'Association',
      title: 'Projets & événements à venir',
      intro:
        'Rencontrez-nous sur nos actions : les fonds collectés par l’association « Un souffle d’espoir pour Kaïron » financent directement les besoins de Kaïron (stages, matériel, déplacements).',
      items: defaultEvents(),
    },
    articles: {
      eyebrow: 'Actualités',
      title: 'Infos & articles',
      intro:
        'Nouvelles de l’association, comptes-rendus d’événements et informations utiles pour suivre le parcours de Kaïron.',
      items: [],
    },
    testimony: {
      eyebrow: 'Paroles de maman',
      title: 'Témoignage de la maman',
      signature: '— La maman de Kaïron',
      paragraphs: clone(defaultTestimonyParagraphs),
    },
    gallery: {
      eyebrow: 'Souvenirs',
      title: 'Galerie',
      intro: 'Quelques instants de la vie de Kaïron, partagés avec amour.',
      photoNumbers: Array.from({ length: 33 }, (_, i) => i + 1),
    },
    share: {
      eyebrow: 'Solidarité',
      title: 'Partager',
      intro:
        'Si vous ne pouvez pas donner, partager cette page est déjà une aide précieuse.',
      shareMessage:
        'Kaïron avance à son rythme — découvrez son histoire et comment l’aider.',
    },
    donate: {
      eyebrow: 'Agir',
      title: 'Faire un don',
      body:
        'Les dons passent par l’association « Un souffle d’espoir pour Kaïron » sur HelloAsso : ils financent directement les projets de Kaïron (stages spécialisés, matériel, déplacements) — pas un cadeau à la famille, un levier concret pour son parcours de soin.',
      footer:
        'Lien vers le formulaire HelloAsso de l’association (même cagnotte que sur les événements). Les fonds servent aux besoins de Kaïron selon les priorités validées par l’association.',
      photoNumber: 15,
    },
  }
}

export function newAdminId(): string {
  return crypto.randomUUID()
}
