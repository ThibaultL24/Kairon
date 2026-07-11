// src/pages/admin/admin-index-page.tsx
import { Link } from 'react-router-dom'
import { AdminHelpBox } from '../../components/admin/admin-help-box'
import { AdminPageHeader } from '../../components/admin/admin-page-header'

const quickActions = [
  {
    to: '/admin/evenements',
    title: 'Ajouter un événement',
    desc: 'Foire, stand, date… avec une affiche si vous en avez une.',
    accent: 'bg-orange',
  },
  {
    to: '/admin/articles',
    title: 'Publier une actualité',
    desc: 'Un petit mot, une nouvelle, un compte-rendu.',
    accent: 'bg-leaf',
  },
  {
    to: '/admin/cagnotte',
    title: 'Mettre à jour la cagnotte',
    desc: 'Montant collecté et objectif affichés sur le site.',
    accent: 'bg-forest',
  },
  {
    to: '/admin/galerie',
    title: 'Gérer les photos',
    desc: 'Choisir quelles photos apparaissent dans la galerie.',
    accent: 'bg-sage',
  },
] as const

const allSections = [
  { to: '/admin/sections', title: 'Afficher ou masquer une partie du site' },
  { to: '/admin/accueil', title: 'Page d’accueil' },
  { to: '/admin/qui', title: 'Qui est Kaïron ?' },
  { to: '/admin/histoire', title: 'Son histoire' },
  { to: '/admin/comprendre', title: 'Comprendre GRIN2B' },
  { to: '/admin/besoins', title: 'Pourquoi aider ?' },
  { to: '/admin/temoignage', title: 'Témoignage de la maman' },
  { to: '/admin/parametres', title: 'Liens HelloAsso & partage' },
] as const

export function AdminIndexPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Bonjour !"
        subtitle="Choisissez ce que vous voulez modifier. Chaque changement est enregistré en ligne et visible par tous les visiteurs du site."
      />

      <AdminHelpBox title="Comment faire en 3 étapes">
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Cliquez sur ce que vous voulez changer (événement, texte, photo…)</li>
          <li>Modifiez les champs — l’enregistrement se fait tout seul</li>
          <li>Ouvrez <strong>Voir le site</strong> sur un autre téléphone pour vérifier</li>
        </ol>
      </AdminHelpBox>

      <section>
        <h2 className="mb-4 font-display text-2xl text-ink">Actions les plus courantes</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {quickActions.map((card) => (
            <li key={card.to}>
              <Link
                to={card.to}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sage/25 bg-paper shadow-sm transition hover:border-leaf/40 hover:shadow-md"
              >
                <div className={`h-1.5 w-full ${card.accent}`} aria-hidden />
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-display text-xl font-semibold text-ink group-hover:text-leaf">
                    {card.title}
                  </span>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-muted">{card.desc}</p>
                  <span className="mt-5 text-base font-semibold text-leaf">Modifier →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl text-ink">Toutes les sections</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {allSections.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block rounded-xl border border-sage/20 bg-paper px-4 py-3.5 text-base font-medium text-ink transition hover:border-leaf/35 hover:bg-mint/40"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
