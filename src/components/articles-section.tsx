// src/components/articles-section.tsx
import { motion } from 'framer-motion'
import { useSiteData } from '../hooks/use-admin'

export function ArticlesSection() {
  const { articles } = useSiteData()
  const published = articles.items.filter((item) => item.published)

  return (
    <section
      id="articles"
      className="bg-linear-to-b from-ivory via-paper/90 to-mist px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
            {articles.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            {articles.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {articles.intro}
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-4">
          {published.length === 0 ? (
            <li className="rounded-xl border border-dashed border-sage/35 bg-paper/70 p-8 text-center text-muted">
              Aucune actualité publiée pour le moment.
            </li>
          ) : null}
          {published.map((article, index) => (
            <motion.li
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-xl border border-sage/35 border-t-2 border-t-orange bg-paper p-6 text-left shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-sage-deep">
                {article.dateLabel}
              </p>
              <h3 className="mt-2 font-display text-xl text-ink">{article.title}</h3>
              {article.excerpt ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
              ) : null}
              {article.body ? (
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted whitespace-pre-wrap">
                  {article.body}
                </div>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
