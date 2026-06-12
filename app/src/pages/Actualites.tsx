import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Download,
  Award,
  Gavel,
  Users,
  Calendar,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type NewsType = 'VICTOIRE' | 'DISTINCTION' | 'NOMINATION' | 'EVENEMENT'

interface NewsItem {
  id: number
  type: NewsType
  date: string
  title: string
  excerpt: string
  image?: string
}

const FEATURED = {
  type: 'DISTINCTION' as NewsType,
  date: '15 Janvier 2025',
  title: 'LeCrans & Associes confirme son classement Band 1 en Droit des Affaires par Chambers Europe 2025',
  excerpt: "Le cabinet est une nouvelle fois reconnu parmi les meilleures references francaises en conseil aux entreprises. Quatre associes individuellement distingues dans leurs specialites respectives. Ce classement illustre la qualite de l'accompagnement apporte a nos clients sur les dossiers les plus complexes du marche.",
  image: '/office-conference.jpg',
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    type: 'VICTOIRE',
    date: '10 Jan 2025',
    title: 'Victoire en Cour de cassation dans un litige social majeur',
    excerpt: 'La Cour de cassation a valide la position defendue par nos equipes dans un contentieux collectif portant sur la requalification de contrats de travail.',
    image: '/office-reception.jpg',
  },
  {
    id: 2,
    type: 'NOMINATION',
    date: '05 Jan 2025',
    title: 'Thomas Laurent nomme counsel au sein du departement Droit des Affaires',
    excerpt: 'Thomas Laurent rejoint le rang des counsels du cabinet, reconnaissant ainsi son expertise en droit des startups et des nouvelles technologies.',
  },
  {
    id: 3,
    type: 'EVENEMENT',
    date: '18 Dec 2024',
    title: 'LeCrans & Associes participe au salon International Bar Association 2024',
    excerpt: "Trois associes du cabinet interviendront lors des conferences de l'IBA qui se tiendra a Mexico du 3 au 8 novembre 2024.",
    image: '/hero-equipe.jpg',
  },
  {
    id: 4,
    type: 'DISTINCTION',
    date: '12 Dec 2024',
    title: 'Claire Martin distinguee par Best Lawyers 2025 en Droit du Travail',
    excerpt: 'Me Martin figure parmi les avocats les plus recommandes de l\'edition 2025 du guide Best Lawyers pour son expertise en droit social.',
  },
  {
    id: 5,
    type: 'VICTOIRE',
    date: '28 Nov 2024',
    title: 'Defense reussie d\'un dirigeant dans une procedure de blanchiment',
    excerpt: "Acquittement d'un dirigeant d'ETI mis en examen pour blanchiment de fraude fiscale. La Cour d'assises a suivi l'integralite des conclusions de la defense.",
    image: '/office-library.jpg',
  },
  {
    id: 6,
    type: 'EVENEMENT',
    date: '20 Nov 2024',
    title: 'Conference : "La reforme de la responsabilite civile" — 5 decembre 2024',
    excerpt: 'Le cabinet organise une conference sur les implications de la reforme de la responsabilite civile pour les entreprises. Inscription ouverte.',
  },
  {
    id: 7,
    type: 'NOMINATION',
    date: '15 Nov 2024',
    title: 'Le cabinet ouvre un bureau a Lyon',
    excerpt: 'Elargissement de notre presence geographique avec l\'ouverture d\'un bureau lyonnais dedie au droit immobilier et de la construction.',
    image: '/office-reception.jpg',
  },
  {
    id: 8,
    type: 'DISTINCTION',
    date: '08 Nov 2024',
    title: 'Legal 500 2024 : LeCrans & Associes classe Leading Firm en M&A',
    excerpt: "Le cabinet confirme son classement dans la categorie M&A du guide Legal 500 EMEA 2024. Deux associes individuellement recommandes.",
  },
  {
    id: 9,
    type: 'VICTOIRE',
    date: '30 Oct 2024',
    title: 'Accompagnement d\'une cession transfrontaliere dans le secteur de la sante',
    excerpt: "Le cabinet a accompagne le vendeur dans la cession d'un groupe de sante present dans 4 pays europeens, representant 280 M€.",
    image: '/hero-expertises.jpg',
  },
]

const FILTER_TABS: { label: string; value: string }[] = [
  { label: 'TOUT', value: 'ALL' },
  { label: 'VICTOIRES', value: 'VICTOIRE' },
  { label: 'DISTINCTIONS', value: 'DISTINCTION' },
  { label: 'NOMINATIONS', value: 'NOMINATION' },
  { label: 'EVENEMENTS', value: 'EVENEMENT' },
]

const BADGE_STYLES: Record<NewsType, string> = {
  VICTOIRE: 'bg-green-50 text-green-800',
  DISTINCTION: 'bg-gold-100 text-gold-600',
  NOMINATION: 'bg-red-50 text-red-800',
  EVENEMENT: 'bg-navy-100 text-navy-700',
}

const BADGE_ICONS: Record<NewsType, React.ReactNode> = {
  VICTOIRE: <Gavel size={12} />,
  DISTINCTION: <Award size={12} />,
  NOMINATION: <Users size={12} />,
  EVENEMENT: <Calendar size={12} />,
}

const PAGE_SIZE = 9
const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  ACTUALITES PAGE                                                    */
/* ------------------------------------------------------------------ */

export default function Actualites() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  /* Filtering */
  const filtered = useMemo(() => {
    if (activeFilter === 'ALL') return newsItems
    return newsItems.filter((n) => n.type === activeFilter)
  }, [activeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [activeFilter])

  return (
    <div className="min-h-[100dvh]">
      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-navy-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/hero-publications.jpg)' }}
        />
        <div className="absolute inset-0 bg-[var(--overlay-dark)]" />
        <div className="relative z-10 container-law text-center py-32 pt-40">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-navy-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-navy-300">Actualites</span>
          </nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easePremium }}
            className="text-overline text-gold-500 mb-4"
          >
            ACTUALITES DU CABINET
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easePremium }}
            className="font-display text-display-md text-white max-w-[900px] mx-auto"
          >
            Nos victoires, nos distinctions, nos evenements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easePremium }}
            className="mt-4 text-lg text-navy-300 max-w-[640px] mx-auto font-body"
          >
            L'actualite de LeCrans & Associes : victoires judiciaires, nominations, distinctions internationales et manifestations juridiques.
          </motion.p>
        </div>
      </section>

      {/* ============ SECTION 2: FEATURED NEWS ============ */}
      <section className="bg-white py-20 pb-16">
        <div className="container-law max-w-[1280px]">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easePremium }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">A LA UNE</span>
          </motion.div>

          {/* Featured Card */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easePremium }}
            className="bg-navy-50 border border-neutral-200 rounded-lg overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: easePremium }}
                  className="aspect-video md:aspect-auto md:h-full"
                >
                  <img
                    src={FEATURED.image}
                    alt={FEATURED.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gold-500/5" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span
                  className={`inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-sm text-[11px] font-medium uppercase tracking-wider font-body ${BADGE_STYLES[FEATURED.type]}`}
                >
                  {BADGE_ICONS[FEATURED.type]}
                  {FEATURED.type}
                </span>

                <p className="mt-3 text-xs text-neutral-500 font-body">
                  {FEATURED.date}
                </p>

                <h2 className="mt-3 font-display text-2xl md:text-[28px] text-neutral-900 leading-snug">
                  {FEATURED.title}
                </h2>

                <p className="mt-4 text-base text-neutral-600 font-body leading-relaxed">
                  {FEATURED.excerpt}
                </p>

                <Link
                  to="#"
                  className="inline-flex items-center gap-2 mt-5 text-xs font-semibold uppercase tracking-wider text-gold-500 font-body group/link hover:underline underline-offset-4"
                >
                  LIRE LA SUITE
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ============ SECTION 3: FILTER & NEWS GRID ============ */}
      <section className="bg-navy-50 py-16 pb-24">
        <div className="container-law max-w-[1280px]">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: easePremium }}
            className="flex items-center gap-2 mb-8 flex-wrap"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`relative px-4 py-2 rounded-sm text-[11px] font-medium font-body tracking-[0.04em] uppercase transition-all duration-200 ${
                  activeFilter === tab.value
                    ? 'bg-gold-100 text-navy-900'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {tab.label}
                {activeFilter === tab.value && (
                  <motion.span
                    layoutId="news-filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500"
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* News Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginated.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: easePremium,
                  }}
                  className="group bg-white border border-neutral-200 rounded-md overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Image area */}
                  {item.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Type badge */}
                      <span
                        className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-medium uppercase tracking-wider font-body text-white backdrop-blur-sm ${
                          item.type === 'VICTOIRE'
                            ? 'bg-green-700/80'
                            : item.type === 'DISTINCTION'
                            ? 'bg-gold-600/80'
                            : item.type === 'NOMINATION'
                            ? 'bg-red-700/80'
                            : 'bg-navy-700/80'
                        }`}
                      >
                        {BADGE_ICONS[item.type]}
                        {item.type}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-neutral-500 font-body">
                      {item.date}
                    </p>

                    <h3 className="mt-2 font-display text-lg font-medium text-neutral-900 leading-snug group-hover:text-gold-600 transition-colors duration-200 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-600 font-body line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-2 rounded-md text-neutral-600 hover:bg-white hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Page precedente"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`min-w-[36px] h-9 px-2.5 rounded-md text-[13px] font-body transition-all duration-200 ${
                    p === safePage
                      ? 'bg-gold-100 text-navy-900 font-medium'
                      : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-2 rounded-md text-neutral-600 hover:bg-white hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Page suivante"
              >
                <ChevronRight size={18} />
              </button>

              <span className="text-[13px] text-neutral-500 font-body ml-2">
                Page {safePage} sur {totalPages}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ============ SECTION 4: PRESS CONTACT ============ */}
      <section className="relative py-20 bg-navy-900 overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800" />

        <div className="relative z-10 container-law max-w-[1000px]">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easePremium }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold-500" />
                <span className="text-overline text-gold-500">PRESSE & MEDIAS</span>
              </div>
              <h2 className="font-display text-3xl text-white leading-snug">
                Espace presse
              </h2>
              <p className="mt-4 text-base text-navy-300 font-body leading-relaxed">
                Journalistes et correspondants medias, notre equipe communication est a votre disposition pour toute demande d'interview, de commentaire juridique ou de dossier de presse.
              </p>
            </motion.div>

            {/* Right — Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easePremium }}
              className="space-y-4"
            >
              <div>
                <p className="text-base font-semibold text-white font-body">
                  Isabelle Girard
                </p>
                <p className="text-sm text-navy-400 font-body">
                  Responsable Communication & Marketing
                </p>
              </div>

              <div className="space-y-2">
                <a
                  href="mailto:presse@lecrans-associes.fr"
                  className="flex items-center gap-2 text-sm text-gold-500 font-body hover:underline underline-offset-4"
                >
                  <Mail size={16} />
                  presse@lecrans-associes.fr
                </a>
                <a
                  href="tel:+33142680015"
                  className="flex items-center gap-2 text-sm text-navy-300 font-body hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  01 42 68 00 15
                </a>
              </div>

              {/* Download CTA */}
              <button
                onClick={() => alert('Telechargement du dossier de presse')}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 border border-gold-500 text-gold-500 text-xs font-semibold uppercase tracking-[0.06em] font-body transition-all duration-200 hover:bg-gold-500 hover:text-navy-950"
              >
                <Download size={14} />
                TELECHARGER LE DOSSIER DE PRESSE
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
