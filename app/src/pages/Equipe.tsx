import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ChevronRight, ArrowRight } from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────────
interface TeamMember {
  id: string
  slug: string
  name: string
  role: 'Partner' | 'Counsel' | 'Associate'
  roleLabel: string
  titleDisplay: string
  specialties: string[]
  bar: string
  education: string
  languages: string
  portrait: string | null
}

// ─── Data ───────────────────────────────────────────────────────────────
const founders: TeamMember[] = [
  {
    id: '1', slug: 'pierre-dubois', name: 'Pierre Dubois', role: 'Partner', roleLabel: 'associes',
    titleDisplay: 'ASSOCIE — FONDATEUR',
    specialties: ['Droit des affaires', 'M&A', 'Private equity'],
    bar: 'Barreau de Paris, 1992',
    education: 'DEA Droit des Affaires — Paris II, LLM — NYU',
    languages: 'FR · EN · DE',
    portrait: '/portrait-dubois.jpg',
  },
  {
    id: '2', slug: 'claire-martin', name: 'Claire Martin', role: 'Partner', roleLabel: 'associes',
    titleDisplay: 'ASSOCIEE',
    specialties: ['Droit social', "Contentieux prud'homal"],
    bar: 'Barreau de Paris, 1998',
    education: 'DESS Droit Social — Paris X, Master 2 — LSE',
    languages: 'FR · EN',
    portrait: '/portrait-martin.jpg',
  },
  {
    id: '3', slug: 'antoine-leroy', name: 'Antoine Leroy', role: 'Partner', roleLabel: 'associes',
    titleDisplay: 'ASSOCIE',
    specialties: ['Droit fiscal', 'Droit immobilier'],
    bar: 'Barreau de Paris, 2001',
    education: 'DESS Fiscalite — Paris IX Dauphine',
    languages: 'FR · EN',
    portrait: '/portrait-leroy.jpg',
  },
  {
    id: '4', slug: 'sophie-petit', name: 'Sophie Petit', role: 'Partner', roleLabel: 'associes',
    titleDisplay: 'ASSOCIEE',
    specialties: ['Droit penal des affaires', 'Contentieux'],
    bar: 'Barreau de Paris, 2005',
    education: "DEA Droit Penal — Paris I, LLM — King's College",
    languages: 'FR · EN · ES',
    portrait: '/portrait-petit.jpg',
  },
]

const fullTeam: TeamMember[] = [
  ...founders,
  {
    id: '5', slug: 'jean-moreau', name: 'Jean Moreau', role: 'Partner', roleLabel: 'associes',
    titleDisplay: 'ASSOCIE',
    specialties: ['Droit immobilier', 'Construction'],
    bar: 'Barreau de Lyon',
    education: 'DESS Droit Immobilier — Lyon III',
    languages: 'FR · EN',
    portrait: '/portrait-moreau.jpg',
  },
  {
    id: '6', slug: 'marie-roux', name: 'Marie Roux', role: 'Partner', roleLabel: 'associes',
    titleDisplay: 'ASSOCIEE',
    specialties: ["Droit de la famille"],
    bar: 'Barreau de Paris',
    education: 'DEA Droit de la Famille — Paris II',
    languages: 'FR · EN',
    portrait: '/portrait-roux.jpg',
  },
  {
    id: '7', slug: 'philippe-blanc', name: 'Philippe Blanc', role: 'Counsel', roleLabel: 'counsel',
    titleDisplay: 'COUNSEL',
    specialties: ['Droit international', 'Arbitrage'],
    bar: 'Barreau de Paris',
    education: 'LLM Droit International — Paris I',
    languages: 'FR · EN · ES',
    portrait: null,
  },
  {
    id: '8', slug: 'isabelle-girard', name: 'Isabelle Girard', role: 'Counsel', roleLabel: 'counsel',
    titleDisplay: 'COUNSEL',
    specialties: ['Droit fiscal', 'Patrimoine'],
    bar: 'Barreau de Paris',
    education: 'DESS Fiscalite — Paris IX Dauphine',
    languages: 'FR · EN',
    portrait: null,
  },
  {
    id: '9', slug: 'thomas-laurent', name: 'Thomas Laurent', role: 'Associate', roleLabel: 'collaborateurs',
    titleDisplay: 'COLLABORATEUR',
    specialties: ['Droit des affaires', 'Startup'],
    bar: 'Barreau de Paris',
    education: 'Master 2 Droit des Affaires — Paris II',
    languages: 'FR · EN',
    portrait: null,
  },
  {
    id: '10', slug: 'camille-chevalier', name: 'Camille Chevalier', role: 'Associate', roleLabel: 'collaborateurs',
    titleDisplay: 'COLLABORATRICE',
    specialties: ['Droit social'],
    bar: 'Barreau de Paris',
    education: "Master 2 Droit Social — Paris X",
    languages: 'FR · EN',
    portrait: null,
  },
  {
    id: '11', slug: 'nicolas-fournier', name: 'Nicolas Fournier', role: 'Associate', roleLabel: 'collaborateurs',
    titleDisplay: 'COLLABORATEUR',
    specialties: ['Contentieux', 'Droit penal'],
    bar: 'Barreau de Paris',
    education: "Master 2 Contentieux — Paris I",
    languages: 'FR · EN',
    portrait: null,
  },
  {
    id: '12', slug: 'julie-bonnet', name: 'Julie Bonnet', role: 'Associate', roleLabel: 'collaborateurs',
    titleDisplay: 'COLLABORATRICE',
    specialties: ['Droit immobilier'],
    bar: 'Barreau de Versailles',
    education: 'Master 2 Droit Immobilier — Paris II',
    languages: 'FR · EN',
    portrait: null,
  },
  {
    id: '13', slug: 'alexandre-mercier', name: 'Alexandre Mercier', role: 'Associate', roleLabel: 'collaborateurs',
    titleDisplay: 'COLLABORATEUR',
    specialties: ['Droit des affaires', 'Finance'],
    bar: 'Barreau de Paris',
    education: 'Master 2 Finance — Paris IX Dauphine',
    languages: 'FR · EN · DE',
    portrait: null,
  },
  {
    id: '14', slug: 'laura-dumas', name: 'Laura Dumas', role: 'Associate', roleLabel: 'collaborateurs',
    titleDisplay: 'COLLABORATRICE',
    specialties: ['Droit de la famille', 'Succession'],
    bar: 'Barreau de Paris',
    education: 'Master 2 Droit de la Famille — Paris II',
    languages: 'FR · EN',
    portrait: null,
  },
]

const specialtyOptions = [
  'Toutes les specialites',
  'Droit des affaires',
  'M&A',
  'Private equity',
  'Droit social',
  'Droit fiscal',
  'Droit immobilier',
  'Droit penal des affaires',
  'Contentieux',
  'Droit international',
  "Droit de la famille",
  'Construction',
  'Arbitrage',
  'Startup',
  'Finance',
  'Patrimoine',
  'Succession',
]

const filterTabs = [
  { label: 'TOUS', value: 'tous' },
  { label: 'ASSOCIES', value: 'associes' },
  { label: 'COUNSEL', value: 'counsel' },
  { label: 'COLLABORATEURS', value: 'collaborateurs' },
]

// ─── Animation Variants ─────────────────────────────────────────────────
const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePremium } },
}

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
}

const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const filterItem = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: easePremium } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

// ─── Portrait Placeholder ───────────────────────────────────────────────
function PortraitPlaceholder({ name }: { name: string }) {
  const initial = name.charAt(0)
  return (
    <div className="w-full aspect-square bg-gradient-to-br from-navy-200 to-navy-400 flex items-center justify-center">
      <span className="font-display text-6xl text-white/60 select-none">{initial}</span>
    </div>
  )
}

// ─── Founder Card ───────────────────────────────────────────────────────
function FounderCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={staggerItem}
      className="group bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <Link to={`/equipe/${member.slug}`} className="block">
        <div className="aspect-square overflow-hidden">
          {member.portrait ? (
            <img
              src={member.portrait}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
            />
          ) : (
            <PortraitPlaceholder name={member.name} />
          )}
        </div>
        <div className="p-6">
          <h3 className="font-display text-[22px] font-medium text-neutral-900 group-hover:text-gold-600 transition-colors duration-200">
            {member.name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-gold-500 mt-1">
            {member.titleDisplay}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {member.specialties.map((s) => (
              <span key={s} className="text-[11px] bg-navy-100 text-navy-700 px-2.5 py-0.5 rounded-sm">
                {s}
              </span>
            ))}
          </div>
          <p className="text-[13px] text-neutral-500 mt-3">{member.bar}</p>
          <p className="text-[13px] text-neutral-600 mt-1">{member.education}</p>
          <p className="text-xs text-neutral-500 mt-2">{member.languages}</p>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-gold-500 mt-3 group-hover:underline">
            VOIR LE PROFIL
            <ChevronRight size={12} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Team Member Card ───────────────────────────────────────────────────
function TeamMemberCard({ member }: { member: TeamMember }) {
  const email = `${member.name.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@lecrans-associes.fr`
  return (
    <motion.div
      layout
      variants={filterItem}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group bg-white border border-neutral-200 rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-md"
    >
      <Link to={`/equipe/${member.slug}`} className="block">
        <div className="aspect-square overflow-hidden">
          {member.portrait ? (
            <img
              src={member.portrait}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
            />
          ) : (
            <PortraitPlaceholder name={member.name} />
          )}
        </div>
        <div className="p-4">
          <h4 className="font-display text-lg font-medium text-neutral-900 group-hover:text-gold-600 transition-colors duration-200">
            {member.name}
          </h4>
          <p className="text-[11px] font-medium uppercase text-gold-500 mt-0.5 tracking-wide">
            {member.titleDisplay}
          </p>
          <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2">
            {member.specialties.join(', ')}
          </p>
          <p className="text-xs text-neutral-500 mt-1">{member.bar}</p>
        </div>
      </Link>
      <div className="px-4 pb-3 flex justify-end">
        <a
          href={`mailto:${email}`}
          onClick={(e) => e.stopPropagation()}
          className="text-navy-400 hover:text-gold-500 transition-colors duration-200"
          aria-label={`Email ${member.name}`}
        >
          <Mail size={16} />
        </a>
      </div>
    </motion.div>
  )
}

// ─── Animated Counter ───────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────
export default function Equipe() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeRole, setActiveRole] = useState(searchParams.get('role') || 'tous')
  const [activeSpecialty, setActiveSpecialty] = useState(searchParams.get('specialite') || 'Toutes les specialites')
  const filterRef = useRef<HTMLDivElement>(null)

  // Sync URL params
  useEffect(() => {
    const params: Record<string, string> = {}
    if (activeRole !== 'tous') params.role = activeRole
    if (activeSpecialty !== 'Toutes les specialites') params.specialite = activeSpecialty
    setSearchParams(params, { replace: true })
  }, [activeRole, activeSpecialty, setSearchParams])

  const filteredTeam = useMemo(() => {
    return fullTeam.filter((m) => {
      const roleMatch = activeRole === 'tous' || m.roleLabel === activeRole
      const specMatch = activeSpecialty === 'Toutes les specialites' || m.specialties.some(
        (s) => s.toLowerCase().includes(activeSpecialty.toLowerCase()) || activeSpecialty.toLowerCase().includes(s.toLowerCase())
      )
      return roleMatch && specMatch
    })
  }, [activeRole, activeSpecialty])

  return (
    <div className="min-h-[100dvh]">
      {/* ─── Section 1: Hero ─────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: 'max(45vh, 360px)',
          backgroundImage: 'linear-gradient(var(--overlay-dark), var(--overlay-dark)), url(/hero-equipe.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-center px-6 py-32 max-w-[800px] mx-auto">
          <nav className="text-xs text-navy-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">L&apos;Equipe</span>
          </nav>
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={heroItem} className="text-overline text-gold-500 mb-4">
              L&apos;EQUIPE
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="font-display text-display-md text-white"
            >
              Quatorze associes, quarante collaborateurs, une seule ambition
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="text-lg text-navy-300 mt-6 mx-auto"
              style={{ maxWidth: 700 }}
            >
              Des avocats chevronnes unis par une culture d&apos;excellence, d&apos;ethique et de disponibilite. Chaque dossier beneficie de la mobilisation des competences collectives du cabinet.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Leadership Highlight ─────────────────────────── */}
      <section className="bg-white pt-24 pb-16">
        <div className="container-law max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-overline text-gold-500">EQUIPE DE DIRECTION</span>
              <span className="w-8 h-px bg-gold-500" />
            </div>
            <h2 className="font-display text-[30px] text-neutral-900">Les associes fondateurs</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {founders.map((f, i) => (
              <FounderCard key={f.id} member={f} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3: Filter Bar ───────────────────────────────────── */}
      <div
        ref={filterRef}
        className="sticky top-20 z-[90] bg-white border-b border-neutral-200"
      >
        <div className="container-law max-w-[1280px] mx-auto py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveRole(tab.value)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wide rounded-sm transition-all duration-200 ${
                  activeRole === tab.value
                    ? 'bg-gold-100 text-navy-900 border-b-2 border-gold-500'
                    : 'text-neutral-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <select
            value={activeSpecialty}
            onChange={(e) => setActiveSpecialty(e.target.value)}
            className="text-[13px] text-neutral-600 bg-white border border-neutral-200 rounded-sm px-3 py-2 outline-none focus:border-gold-500 cursor-pointer"
          >
            {specialtyOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'Toutes les specialites' ? 'FILTRER PAR SPECIALITE' : opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── Section 4: Full Team Grid ───────────────────────────────── */}
      <section className="bg-navy-50 pt-20 pb-24">
        <div className="container-law max-w-[1280px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole + activeSpecialty}
              variants={gridStagger}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filteredTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredTeam.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-neutral-500">Aucun membre ne correspond a ces criteres.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Section 5: Recruitment CTA ──────────────────────────────── */}
      <section className="bg-navy-900 py-20">
        <div className="container-law max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easePremium }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-gold-500" />
                <span className="text-overline text-gold-500">RECRUTEMENT</span>
              </div>
              <h2 className="font-display text-[36px] text-white mb-4">
                Rejoignez LeCrans &amp; Associes
              </h2>
              <p className="text-base text-navy-300 leading-relaxed mb-6">
                Nous recherchons des talents passionnes, ambitieux et attaches a l&apos;excellence. Qu&apos;il s&apos;agisse de votre premiere collaboration ou d&apos;un recrutement d&apos;associe, nous offrons un environnement de travail stimulant et des perspectives de developpement reconnues.
              </p>
              <Link
                to="/carrieres"
                className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-400"
              >
                VOIR NOS OFFRES
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: easePremium }}
              className="flex flex-col items-center gap-10"
            >
              <div className="text-center">
                <span className="font-display text-[56px] text-gold-500 leading-none">
                  <AnimatedCounter target={14} />
                </span>
                <p className="text-sm text-navy-300 mt-1">associes</p>
              </div>
              <div className="text-center">
                <span className="font-display text-[56px] text-gold-500 leading-none">
                  <AnimatedCounter target={40} suffix="+" />
                </span>
                <p className="text-sm text-navy-300 mt-1">collaborateurs</p>
              </div>
              <div className="text-center">
                <span className="font-display text-[56px] text-gold-500 leading-none">
                  <AnimatedCounter target={6} />
                </span>
                <p className="text-sm text-navy-300 mt-1">annees moyenne de collaboration</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
