// src/components/testimony-section.tsx
import { motion } from 'framer-motion'

const paragraphs = [
  "Kaïron a aujourd'hui trois ans et demi.",
  "Trois années de combat, de doutes, d'attente… mais surtout trois années d'un amour immense, indéfectible.",
  "Sa vie a commencé comme celle de beaucoup d'autres bébés. Une grossesse globalement sans particularité, malgré un Covid assez marqué en début de parcours. Rien qui ne laissait imaginer la suite.",
  "Et pourtant…",
  "Dès sa naissance, quelque chose en moi s'est serré. Un pressentiment. Cet instinct de maman, silencieux mais puissant, qui murmure que quelque chose ne va pas.",
  "Kaïron pleurait énormément. Mais surtout, à chaque crise, il arrêtait de respirer… son petit corps devenait bleu. Des instants suspendus, terrifiants. Il avait un besoin constant de contact, de chaleur, de moi. Le sein était son seul refuge. Il refusait la tétine, refusait le biberon… et très vite, même se nourrir devenait difficile.",
  "Les jours passent, les nuits se confondent. Ou plutôt… les nuits n'existent presque pas.",
  "Depuis sa naissance, Kaïron dort très peu. Encore aujourd'hui, il peut rester éveillé 4 à 5 heures d'affilée en pleine nuit. Les nuits sont courtes, hachées, épuisantes. Mais comme depuis le début… je m'accroche.",
  "On parle de coliques du nourrisson, de reflux gastro-œsophagien… Mais au fond de moi, je sais que ce n'est pas ça.",
  "Puis un jour, tout s'accélère.",
  "Un malaise, devant la pédiatre. Cette fois, elle voit. Elle comprend. Ce n'est pas qu'un simple spasme du sanglot. Et sans hésiter, elle nous envoie immédiatement aux urgences.",
  "Kaïron n'a que trois semaines.",
  "Commence alors une plongée brutale dans le monde médical. Les examens, les attentes, l'inconnu. En pleine période Covid, je suis seule avec lui. Son papa doit rester dehors.",
  "Puis cette phrase, qui fige le temps : « Madame, votre fils a quelque chose au cœur. Il faut l'héliporter en urgence. »",
  "Le monde s'écroule.",
  "Et comme si cela ne suffisait pas, une autre épreuve nous attend : nous ne pouvons pas l'accompagner.",
  "Laisser partir son nouveau-né, seul, dans un hélicoptère… C'est une douleur que les mots ne peuvent pas vraiment raconter.",
  "Nous le regardons partir, impuissants, le cœur arraché. Puis nous roulons, sans vraiment respirer, pour le rejoindre.",
  "À notre arrivée, l'attente. Encore. Toujours.",
  "Puis enfin, un peu de clarté.",
  "On nous explique que Kaïron a bien une anomalie cardiaque. Une pathologie qui peut être sérieuse, mais qui, à son stade aujourd'hui, ne nécessite pas d'intervention et n'est pas la cause de ses malaises. Elle est surveillée régulièrement, mais ce n'est pas là que se trouve l'origine de ce que vit Kaïron.",
  "Le soulagement est mêlé à une autre angoisse : si ce n'est pas ça… alors quoi ?",
  "Nous restons hospitalisés. Et les jours deviennent des semaines, puis des mois rythmés par les examens : prises de sang, IRM, scanners, électroencéphalogrammes, ponctions lombaires, tests génétiques…",
  "Kaïron endure tout. Si petit, et déjà si fort.",
  "C'est lui qui nous porte. C'est lui qui nous apprend à tenir.",
  "À ses côtés, je deviens une mère différente. Une mère prête à tout. Son papa, lui aussi, reste présent à chaque instant, même lorsque tout cela lui semble insurmontable. Il ne nous lâche jamais. Mamie est également présente, autant que possible malgré le contexte du Covid. Son soutien, même à distance, nous aide à tenir.",
  "Très vite, Kaïron doit être nourri par sonde. Il ne parvient plus à téter suffisamment et efficacement, sa succion diminue, son développement est ralenti. Il ne tient pas sa tête, suit peu du regard, son tonus est atypique.",
  "Et puis, après de longs mois d'attente…",
  "Le diagnostic tombe.",
  "Une mutation du gène GRIN2B.",
  "Le syndrome GRIN2B est une maladie génétique rare qui affecte le fonctionnement du cerveau. Ce gène joue un rôle essentiel dans la communication entre les neurones. Lorsqu'il est altéré, cela peut entraîner des troubles du développement, du tonus, de l'alimentation, de la motricité, et parfois des difficultés de communication ou des crises neurologiques.",
  "Chaque enfant atteint est unique. L'évolution est imprévisible.",
  "On nous annonce alors que personne ne peut dire si Kaïron parlera un jour, s'il marchera, ni jusqu'où il pourra progresser.",
  "Nous avons enfin une réponse… mais pas de certitudes.",
  "Ce jour-là, quelque chose en moi se ferme. Les mots deviennent lointains. Je me raccroche à mon bébé, comme à une bouée.",
  "Puis doucement… on apprend à revenir à la surface.",
  "On choisit de se battre.",
  "Très vite, les prises en charge s'enchaînent : kiné, orthophonie, psychomotricité… Les progrès sont lents, parfois invisibles pour les autres, souvent éprouvants. Mais ils sont là.",
  "Et chaque petit pas devient une immense victoire.",
  "Peu à peu, Kaïron commence aussi la diversification alimentaire.",
  "À un an passé, nous vivons une immense victoire : le retrait de la sonde. Un moment qu'on n'osait presque plus espérer.",
  "Une victoire immense… malheureusement temporaire.",
  "Avec le temps, l'alimentation redevient difficile. Kaïron ne ressent ni la faim, ni l'envie de manger. Les repas deviennent une épreuve, une source de stress.",
  "À ses trois ans, nous faisons le choix d'une gastrostomie. Un choix lourd, souvent repoussé… mais fait avec amour, pour lui apporter du confort.",
  "Aujourd'hui, Kaïron avance, à son rythme.",
  "Il commence à se mettre à quatre pattes. Il tient assis quelques instants avec appui. Il se met parfois debout en poussant du mieux qu'il peut sur ses jambes, avec notre aide.",
  "Des gestes simples pour certains. Des montagnes pour nous.",
  "Nous mettons tout en œuvre pour l'aider, allant jusqu'à partir en Espagne pour des stages de rééducation intensive. Et à chaque fois, il nous surprend.",
  "Kaïron a la chance immense d'être entouré d'une famille présente, soudée, qui se bat avec nous chaque jour. Toujours là pour nous soutenir, nous aider, nous porter quand c'est trop lourd. Toujours là pour nous accompagner dans ces projets, souvent coûteux. Leur amour et leur engagement nous permettent d'avancer, même dans les moments les plus difficiles. Nous ne les remercierons jamais assez pour tout ce qu'ils font pour Kaïron et pour nous.",
  "Il a aussi une petite sœur, Louciana, sa deuxième plus grande fan après maman. Du haut de son jeune âge, elle l'encourage, l'applaudit, le pousse à donner le meilleur de lui-même. Elle est si fière de lui, elle lui dit bravo à chaque petite victoire.",
  "Elle voit en lui ce que nous voyons : un enfant extraordinaire.",
  "Et leur lien, si pur, si fort, est sans doute l'une des plus belles forces dans cette aventure.",
  "Et au milieu de tout ça, il y a aussi une personne que nous n'oublierons jamais.",
  "Sa pédiatre.",
  "Depuis le tout début, elle ne nous a jamais lâchés. Toujours présente, toujours à l'écoute, toujours à chercher des solutions, elle a été un soutien précieux dans les moments les plus difficiles.",
  "Aujourd'hui encore, nous ne savons pas de quoi demain sera fait.",
  "Nous ne savons pas jusqu'où Kaïron pourra aller.",
  "Mais nous savons une chose.",
  "Nous ne cesserons jamais de nous battre pour lui.",
  "Parce que chaque petit progrès est une victoire. Parce que chaque sourire efface un peu la fatigue. Parce que lui, n'abandonne jamais.",
  "Et dans ce combat, il nous apprend chaque jour l'essentiel : la force, la patience, la résilience… et cet amour brut, puissant, inconditionnel.",
  "Kaïron avance à son rythme. Et nous, nous avançons avec lui.",
  "Un jour après l'autre… toujours avec le sourire.",
  "Et au fond, peut-être que c'est ça, le plus important.",
  "Parce que Kaïron n'est pas seulement un petit garçon extraordinaire. Il est, et restera, notre plus grande leçon de vie.",
]

export function TestimonySection() {
  return (
    <section
      id="temoignage"
      className="bg-linear-to-b from-mist via-mint-off to-ivory px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
            Paroles de maman
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Témoignage de la maman
          </h2>
        </motion.div>

        <div className="space-y-5">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.3) }}
              className={
                text.length < 60
                  ? 'font-display text-xl italic text-ink'
                  : 'text-lg leading-relaxed text-muted'
              }
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-right font-display text-lg italic text-muted"
        >
          — La maman de Kaïron
        </motion.p>
      </div>
    </section>
  )
}
