import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ArrowRight,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Mail,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Publication {
  id: number
  date: string
  day: string
  month: string
  year: string
  domain: string
  domainShort: string
  title: string
  excerpt: string
  author: string
  authorSlug: string
  readTime: string
}

const publications: Publication[] = [
  {
    id: 1,
    date: '15 Jan 2025',
    day: '15',
    month: 'JAN',
    year: '2025',
    domain: 'DROIT SOCIAL',
    domainShort: 'SOCIAL',
    title: "Reforme des retraites : impacts sur les accords d'entreprise et les regimes supplementaires",
    excerpt: "La reforme des retraites modifie profondement le paysage de l'epargne salariale et des regimes supplementaires. Analyse des consequences pratiques pour les entreprises.",
    author: 'Claire Martin',
    authorSlug: 'claire-martin',
    readTime: '8 min',
  },
  {
    id: 2,
    date: '08 Jan 2025',
    day: '08',
    month: 'JAN',
    year: '2025',
    domain: 'DROIT DES AFFAIRES',
    domainShort: 'AFFAIRES',
    title: 'La directive CSRD et ses implications pour les entreprises non-cotees : un decryptage pratique',
    excerpt: "Le perimetre de la directive CSRD s'elargit aux PME cotees et aux grandes filiales. Comment se preparer ?",
    author: 'Antoine Leroy',
    authorSlug: 'antoine-leroy',
    readTime: '6 min',
  },
  {
    id: 3,
    date: '20 Dec 2024',
    day: '20',
    month: 'DEC',
    year: '2024',
    domain: 'DROIT IMMOBILIER',
    domainShort: 'IMMOBILIER',
    title: "Contentieux immobilier : l'evolution recente de la jurisprudence sur les vices caches",
    excerpt: 'La Cour de cassation a recomment precise les conditions de la garantie des vices caches dans la vente d\'immeubles. Decryptage.',
    author: 'Sophie Petit',
    authorSlug: 'sophie-petit',
    readTime: '5 min',
  },
  {
    id: 4,
    date: '12 Dec 2024',
    day: '12',
    month: 'DEC',
    year: '2024',
    domain: 'DROIT PENAL',
    domainShort: 'PENAL',
    title: 'Blanchiment : les nouvelles obligations de vigilance renforcees par l\'AMF',
    excerpt: "L'AMF a publie de nouvelles directives renforcant les obligations de LCB-FT pour les professionnels du secteur financier.",
    author: 'Sophie Petit',
    authorSlug: 'sophie-petit',
    readTime: '7 min',
  },
  {
    id: 5,
    date: '05 Dec 2024',
    day: '05',
    month: 'DEC',
    year: '2024',
    domain: 'DROIT FISCAL',
    domainShort: 'FISCAL',
    title: 'Fiscalite immobiliere : l\'impact de la reforme de la plus-value sur les investisseurs etrangers',
    excerpt: 'La reforme de la fiscalite des plus-values immobilieres modifie les conditions d\'exoneration pour les residents hors UE.',
    author: 'Antoine Leroy',
    authorSlug: 'antoine-leroy',
    readTime: '6 min',
  },
  {
    id: 6,
    date: '28 Nov 2024',
    day: '28',
    month: 'NOV',
    year: '2024',
    domain: 'DROIT INTERNATIONAL',
    domainShort: 'INTERNATIONAL',
    title: 'Arbitrage commercial international : la nouvelle revision des regles de la CCI',
    excerpt: "La Chambre de Commerce Internationale a adopte des modifications substantielles de son reglement d'arbitrage. Analyse des changements cles.",
    author: 'Philippe Blanc',
    authorSlug: 'philippe-blanc',
    readTime: '9 min',
  },
  {
    id: 7,
    date: '20 Nov 2024',
    day: '20',
    month: 'NOV',
    year: '2024',
    domain: 'DROIT DES AFFAIRES',
    domainShort: 'AFFAIRES',
    title: 'Levees de fonds Serie A et B : les clauses de gouvernance a negocier en 2024',
    excerpt: "Retour d'experience sur les term sheets les plus frequemment negocies dans les operations de capital-risque cette annee.",
    author: 'Pierre Dubois',
    authorSlug: 'pierre-dubois',
    readTime: '7 min',
  },
  {
    id: 8,
    date: '14 Nov 2024',
    day: '14',
    month: 'NOV',
    year: '2024',
    domain: 'DROIT SOCIAL',
    domainShort: 'SOCIAL',
    title: 'Forfait jours : les dernieres decisions jurisprudentielles et leur impact sur les entreprises',
    excerpt: 'La Cour de cassation a recomment valide le nouveau dispositif de controle du forfait jours. Ce qu\'il faut retenir.',
    author: 'Claire Martin',
    authorSlug: 'claire-martin',
    readTime: '5 min',
  },
  {
    id: 9,
    date: '07 Nov 2024',
    day: '07',
    month: 'NOV',
    year: '2024',
    domain: 'DROIT DE LA FAMILLE',
    domainShort: 'FAMILLE',
    title: 'Divorce par consentement mutuel : deux ans apres la reforme, un premier bilan',
    excerpt: 'La reforme du divorce par consentement mutuel sans juge fete ses deux ans. Premier bilan quantitatif et qualitatif.',
    author: 'Marie Roux',
    authorSlug: 'marie-roux',
    readTime: '6 min',
  },
  {
    id: 10,
    date: '30 Oct 2024',
    day: '30',
    month: 'OCT',
    year: '2024',
    domain: 'CONTENTIEUX',
    domainShort: 'CONTENTIEUX',
    title: "L'execution des jugements etrangers en France : procedure et difficultes pratiques",
    excerpt: 'La reconnaissance et l\'execution des decisions judiciaires etrangeres en France : guide pratique a l\'intention des praticiens.',
    author: 'Pierre Dubois',
    authorSlug: 'pierre-dubois',
    readTime: '8 min',
  },
  {
    id: 11,
    date: '22 Oct 2024',
    day: '22',
    month: 'OCT',
    year: '2024',
    domain: 'DROIT IMMOBILIER',
    domainShort: 'IMMOBILIER',
    title: 'Baux commerciaux : la jurisprudence recente sur le fonds de commerce et la clientele',
    excerpt: 'Analyse des derniers arrets de la Cour de cassation relatives a l\'indemnite d\'eviction et au fonds de commerce.',
    author: 'Jean Moreau',
    authorSlug: 'jean-moreau',
    readTime: '5 min',
  },
  {
    id: 12,
    date: '15 Oct 2024',
    day: '15',
    month: 'OCT',
    year: '2024',
    domain: 'DROIT FISCAL',
    domainShort: 'FISCAL',
    title: 'Tax ruling : comment obtenir une securite juridique fiscale en France et en Europe',
    excerpt: "La procedure de rescrit et de tax ruling permet d'obtenir une securite juridique sur des operations complexes. Mode d'emploi.",
    author: 'Antoine Leroy',
    authorSlug: 'antoine-leroy',
    readTime: '6 min',
  },
]

const DOMAINS = [
  { label: 'TOUT', value: 'ALL' },
  { label: 'AFFAIRES', value: 'AFFAIRES' },
  { label: 'SOCIAL', value: 'SOCIAL' },
  { label: 'FISCAL', value: 'FISCAL' },
  { label: 'IMMOBILIER', value: 'IMMOBILIER' },
  { label: 'PENAL', value: 'PENAL' },
  { label: 'INTERNATIONAL', value: 'INTERNATIONAL' },
  { label: 'FAMILLE', value: 'FAMILLE' },
  { label: 'CONTENTIEUX', value: 'CONTENTIEUX' },
]

const DOMAINS_NEWSLETTER = [
  'Affaires',
  'Social',
  'Fiscal',
  'Immobilier',
  'Penal',
  'International',
  'Famille',
  'Contentieux',
]

const PAGE_SIZE = 12

const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  PUBLICATIONS PAGE                                                  */
/* ------------------------------------------------------------------ */

export default function Publications() {
  const [search, setSearch] = useState('')
  const [activeDomain, setActiveDomain] = useState('ALL')
  const [sort, setSort] = useState('recent')
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState('')
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [gdprConsent, setGdprConsent] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  /* Filtering */
  const filtered = useMemo(() => {
    let data = [...publications]

    if (activeDomain !== 'ALL') {
      data = data.filter((p) => p.domainShort === activeDomain)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      )
    }

    if (sort === 'az') {
      data.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'old') {
      data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    // 'recent' is default order (already sorted)

    return data
  }, [search, activeDomain, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  /* Reset page on filter change */
  useEffect(() => {
    setPage(1)
  }, [search, activeDomain, sort])

  /* Scroll to list top on page change */
  useEffect(() => {
    if (listRef.current) {
      const y = listRef.current.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [safePage])

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    )
  }

  return (
    <div className="min-h-[100dvh]">
      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-navy-950">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero-publications.jpg)' }}
        />
        <div className="absolute inset-0 bg-[var(--overlay-dark)]" />
        <div className="relative z-10 container-law text-center py-32 pt-40">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-navy-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-navy-300">Publications</span>
          </nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easePremium }}
            className="text-overline text-gold-500 mb-4"
          >
            INSIGHTS JURIDIQUES
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easePremium }}
            className="font-display text-display-md text-white max-w-[800px] mx-auto"
          >
            Nos analyses et publications
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easePremium }}
            className="mt-4 text-lg text-navy-300 max-w-[640px] mx-auto font-body"
          >
            Decryptages legislatifs, analyses de jurisprudence et lettres d'information thematiques rediges par nos equipes.
          </motion.p>
        </div>
      </section>

      {/* ============ SECTION 2: SEARCH & FILTER BAR ============ */}
      <section className="sticky top-20 z-[90] bg-white border-b border-neutral-200 py-4">
        <div className="container-law flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="Rechercher une publication..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm font-body w-full"
            />
          </div>

          {/* Domain Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {DOMAINS.map((d) => (
              <button
                key={d.value}
                onClick={() => setActiveDomain(d.value)}
                className={`relative whitespace-nowrap px-3.5 py-2 rounded-sm text-[11px] font-medium font-body tracking-[0.04em] uppercase transition-all duration-200 flex-shrink-0 ${
                  activeDomain === d.value
                    ? 'bg-gold-100 text-navy-900'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {d.label}
                {activeDomain === d.value && (
                  <motion.span
                    layoutId="pub-domain-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Sort */}
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-40 text-[13px] font-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus recentes</SelectItem>
              <SelectItem value="old">Plus anciennes</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* ============ SECTION 3: PUBLICATIONS LIST ============ */}
      <section ref={listRef} className="bg-white py-16 pb-24">
        <div className="container-law max-w-[1280px]">
          {/* Results count */}
          <p className="text-[13px] text-neutral-500 font-body mb-6">
            {filtered.length} publication{filtered.length > 1 ? 's' : ''}
          </p>

          {/* Publication Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDomain}-${search}-${sort}-${safePage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {paginated.map((pub, i) => (
                <motion.article
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: easePremium,
                  }}
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 border-b border-neutral-200 last:border-b-0 px-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-navy-50 hover:border-l-[3px] hover:border-l-gold-500 cursor-pointer"
                >
                  {/* Date column */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0 w-full sm:w-20 flex-shrink-0">
                    <span className="text-2xl font-semibold text-neutral-900 font-body">
                      {pub.day}
                    </span>
                    <span className="text-[11px] font-medium uppercase text-gold-500 font-body tracking-wide">
                      {pub.month}
                    </span>
                    <span className="text-xs text-neutral-500 font-body">
                      {pub.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2.5 py-1 bg-gold-50 text-gold-600 text-[11px] font-medium uppercase tracking-wider font-body rounded-sm">
                      {pub.domain}
                    </span>

                    <h3 className="mt-2 font-display text-xl font-medium text-neutral-900 group-hover:text-gold-600 transition-colors duration-200 leading-tight">
                      {pub.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-600 font-body line-clamp-2 leading-relaxed">
                      {pub.excerpt}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-body">
                        <User size={14} />
                        <Link
                          to={`/equipe/${pub.authorSlug}`}
                          className="hover:text-gold-600 transition-colors underline-offset-2 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {pub.author}
                        </Link>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-body">
                        <Clock size={14} />
                        {pub.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center w-10 flex-shrink-0">
                    <ArrowRight
                      size={20}
                      className="text-neutral-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-2 rounded-md text-neutral-600 hover:bg-navy-50 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
                      : 'text-neutral-600 hover:bg-navy-50 hover:text-neutral-900'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-2 rounded-md text-neutral-600 hover:bg-navy-50 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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

      {/* ============ SECTION 4: NEWSLETTER SUBSCRIPTION ============ */}
      <section
        className="relative py-20 bg-navy-900 overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/office-library.jpg)' }}
        />
        <div className="absolute inset-0 bg-navy-900/80" />

        <div className="relative z-10 container-law max-w-[1000px]">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easePremium }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold-500" />
                <span className="text-overline text-gold-500">NEWSLETTER</span>
              </div>
              <h2 className="font-display text-3xl text-white leading-snug">
                Restez informe des evolutions juridiques
              </h2>
              <p className="mt-4 text-base text-navy-300 font-body leading-relaxed">
                Recevez nos alertes legislatives et analyses de jurisprudence directement dans votre boite mail. Inscription gratuite et desinscription a tout moment.
              </p>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easePremium }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Mail size={16} className="text-navy-400" />
                <Input
                  type="email"
                  placeholder="votre@email.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-sm font-body bg-navy-800 border-navy-700 text-white placeholder:text-navy-400"
                />
              </div>

              {/* Domain checkboxes */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                {DOMAINS_NEWSLETTER.map((domain) => (
                  <label
                    key={domain}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <Checkbox
                      checked={selectedDomains.includes(domain)}
                      onCheckedChange={() => toggleDomain(domain)}
                      className="border-navy-600 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
                    />
                    <span className="text-xs text-navy-300 font-body">{domain}</span>
                  </label>
                ))}
              </div>

              {/* Submit */}
              <button
                onClick={() => {
                  if (email && gdprConsent) {
                    alert('Inscription confirmee !')
                    setEmail('')
                    setGdprConsent(false)
                    setSelectedDomains([])
                  }
                }}
                className="w-full mt-5 py-3 bg-gold-500 text-navy-950 text-sm font-semibold uppercase tracking-[0.06em] font-body transition-all duration-200 hover:bg-gold-400"
              >
                S'INSCRIRE
              </button>

              {/* GDPR */}
              <label className="flex items-start gap-2 mt-3 cursor-pointer">
                <Checkbox
                  checked={gdprConsent}
                  onCheckedChange={(checked) => setGdprConsent(checked === true)}
                  className="border-navy-600 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500 mt-0.5"
                />
                <span className="text-xs text-navy-500 font-body leading-relaxed">
                  En vous inscrivant, vous acceptez notre{' '}
                  <Link to="/" className="text-gold-500 hover:underline">
                    politique de confidentialite
                  </Link>
                  .
                </span>
              </label>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
