import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase, Scale, Building2, Home as HomeIcon, Gavel, Globe, Users, Shield,
  ArrowRight, ChevronDown, Phone, Quote
} from 'lucide-react'

/* ──────────────────────── Section 1: Hero ──────────────────────── */
function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src="/hero-home.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            animation: 'kenBurns 20s linear infinite alternate',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        <p
          className={`text-overline text-gold-500 mb-6 transition-all duration-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
          }`}
          style={{ transitionDelay: '200ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          CABINET D'AVOCATS &mdash; PARIS
        </p>

        <h1
          className={`font-display text-display-xl text-white transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
          }`}
          style={{ transitionDelay: '400ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          Votre d&eacute;fense, notre{' '}
          <span className="text-gold-500">excellence</span>
        </h1>

        <p
          className={`mt-6 text-lg text-navy-300 max-w-[640px] mx-auto leading-[1.7] transition-all duration-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'
          }`}
          style={{ transitionDelay: '800ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Depuis 1987, LeCrans &amp; Associes accompagne entreprises et particuliers dans leurs enjeux
          juridiques les plus complexes. Un engagement fond&eacute; sur l'excellence, la discr&eacute;tion et la
          r&eacute;ussite.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
          }`}
          style={{ transitionDelay: '1000ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <Link
            to="/contact"
            className="bg-gold-600 text-navy-950 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-500 hover:shadow-gold flex items-center gap-2 group"
          >
            PRENDRE RENDEZ-VOUS
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/expertises"
            className="border border-white text-white px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-white hover:text-navy-950 flex items-center gap-2"
          >
            D&Eacute;COUVRIR NOS EXPERTISES
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Trust Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transitionDelay: '1200ms',
          background: 'linear-gradient(transparent, rgba(10,22,40,0.8))',
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-8 container-law">
          {[
            "35 ANS D'EXISTENCE",
            '14 ASSOCIES',
            '3 500 AFFAIRES TRAIT&Eacute;ES',
          ].map((item, i) => (
            <div key={item} className="flex items-center gap-6 sm:gap-12">
              <span className="text-xs text-navy-300 uppercase tracking-[0.1em]">{item}</span>
              {i < 2 && (
                <span className="hidden sm:block w-px h-4 bg-navy-700" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}

function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <ChevronDown size={20} className="text-navy-400 animate-bounce-down" />
    </div>
  )
}

/* ──────────────────────── Section 2: Expertises ──────────────────────── */
const expertises = [
  { icon: Briefcase, title: 'Droit des Affaires', desc: "Fusions-acquisitions, droit des societes, private equity, financement, gouvernance. Un accompagnement strategique pour vos operations les plus complexes." },
  { icon: Scale, title: 'Droit Social', desc: "Relations individuelles et collectives, contentieux prud'homal, regimes de retraite. Expertise cote entreprise et cote salarie." },
  { icon: Building2, title: 'Droit Fiscal', desc: 'Conseil fiscal, contentieux fiscal, fiscalite internationale, due diligence. Anticiper et optimiser dans le respect de la reglementation.' },
  { icon: HomeIcon, title: 'Droit Immobilier', desc: "Transactions immobilieres, construction, urbanisme, bail commercial. Un accompagnement sur toute la chaine immobiliere." },
  { icon: Gavel, title: 'Droit Penal des Affaires', desc: "Defense des dirigeants, blanchiment, sanction financiere, compliance. La protection de votre integrite et de votre reputation." },
  { icon: Globe, title: 'Droit International', desc: "Arbitrage international, investissements etrangers, contentieux transfrontaliers. Votre partenaire pour vos enjeux mondiaux." },
  { icon: Users, title: 'Droit de la Famille', desc: "Divorce, succession, autorite parentale, patrimoine familial. Une approche humaine et rigoureuse des situations personnelles." },
  { icon: Shield, title: 'Contentieux', desc: "Strategies proces, mediations et arbitrages, execution des jugements. Une force de frappe juridictionnelle reconnue." },
]

function ExpertisesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="container-law">
        {/* Section Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">DOMAINES D'EXPERTISE</span>
          </div>
          <h2 className="font-display text-display-md text-neutral-900">
            Une expertise plurielle au service de vos enjeux
          </h2>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mt-4" />
          <p className="mt-4 text-lg text-neutral-600 max-w-[700px] mx-auto leading-relaxed">
            De la strategie d'entreprise a la defense des particuliers, nos equipes mobilisent des
            competences pointues dans huit domaines du droit.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {expertises.map((exp, i) => (
            <div
              key={exp.title}
              className={`group bg-white border border-neutral-200 rounded-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-t-2 hover:border-t-gold-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
              }`}
              style={{
                transitionDelay: `${i * 0.08}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <exp.icon size={48} className="text-gold-500 mb-4 transition-colors duration-300 group-hover:text-gold-400" />
              <h4 className="font-display text-xl font-medium text-neutral-900 mb-2">{exp.title}</h4>
              <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-4">{exp.desc}</p>
              <Link
                to="/expertises"
                className="text-xs font-medium text-gold-500 uppercase tracking-wider flex items-center gap-1 group/link"
              >
                En savoir plus
                <ArrowRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/expertises"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-900 uppercase tracking-wider hover:text-gold-600 transition-colors group"
          >
            VOIR TOUTES NOS EXPERTISES
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 3: Key Figures ──────────────────────── */
const stats = [
  { target: 35, suffix: '+', label: "Annees d'existence" },
  { target: 14, suffix: '', label: "Associes d'experience" },
  { target: 3500, suffix: '+', label: 'Affaires traitees' },
  { target: 98, suffix: '%', label: 'Taux de satisfaction client' },
]

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | undefined>(undefined)
  const startRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, target])

  return (
    <span>
      {count.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}

function KeyFiguresSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-navy-900 py-16 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-500/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-500/20" />

      <div className="container-law max-w-[1000px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`,
              }}
            >
              <span className="font-display text-5xl lg:text-[56px] text-gold-500 leading-none">
                <Counter target={stat.target} suffix={stat.suffix} inView={inView} />
              </span>
              <div className="w-8 h-0.5 bg-gold-500 mx-auto my-3" />
              <p className="text-sm text-navy-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 4: About Teaser ──────────────────────── */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-navy-50 py-24">
      <div className="container-law">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className="overflow-hidden rounded-xl shadow-md"
            style={{
              clipPath: inView ? 'inset(0)' : 'inset(100% 0 0 0)',
              transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <img
              src="/office-reception.jpg"
              alt="LeCrans & Associes - Reception"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-overline text-gold-500">LE CABINET</span>
            </div>
            <h2
              className="font-display text-4xl text-neutral-900"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
              }}
            >
              L'excellence juridique au service de votre ambition
            </h2>
            <div
              className="w-12 h-0.5 bg-gold-500 mt-4"
              style={{
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.5s ease 0.24s',
              }}
            />
            <div
              className="mt-6 space-y-4"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.36s',
              }}
            >
              <p className="text-base text-neutral-700 leading-[1.7]">
                Fond&eacute; en 1987, LeCrans &amp; Associes est un cabinet d'avocats d'affaires independant
                base au coeur de Paris. Notre equipe de quatorze associes et quarante collaborateurs
                accompagne entreprises et particuliers dans leurs enjeux strategiques et leurs
                contentieux les plus sensibles.
              </p>
              <p className="text-base text-neutral-700 leading-[1.7]">
                Notre approche allie rigueur technique, vision strategique et proximite. Chaque
                dossier beneficie d'une attention personnalisee et d'une mobilisation des competences
                pluridisciplinaires du cabinet.
              </p>
              <p className="text-base text-neutral-700 leading-[1.7]">
                Class&eacute; parmi les meilleurs cabinets francais par Chambers Europe et Legal 500,
                LeCrans &amp; Associes cultive l'excellence au service de la r&eacute;ussite de ses clients.
              </p>
            </div>
            <div
              className="mt-6"
              style={{
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.5s ease 0.48s',
              }}
            >
              <Link
                to="/equipe"
                className="text-sm font-medium text-gold-600 uppercase tracking-wider flex items-center gap-2 group hover:underline"
              >
                D&Eacute;COUVRIR NOTRE HISTOIRE
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 5: Rankings ──────────────────────── */
const rankings = [
  { name: 'Chambers Europe', detail: 'Band 1 — Droit des Affaires', sub: 'Band 2 — Droit Social', icon: 'CE' },
  { name: 'Legal 500', detail: 'Leading Firm — M&A', sub: 'Leading Firm — Immobilier', icon: 'L500' },
  { name: 'DECIDEURS', detail: 'Categorie Or — Contentieux', sub: '', icon: 'DM' },
  { name: 'Best Lawyers', detail: '3 associes recommandes', sub: '', icon: 'BL' },
]

function RankingsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white py-16">
      <div className="container-law">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">RECONNAISSANCE</span>
          </div>
          <h2 className="font-display text-4xl text-neutral-900">Distinctions et classements</h2>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {rankings.map((rank, i) => (
            <div
              key={rank.name}
              className={`w-[180px] border border-neutral-200 rounded-sm p-5 text-center transition-all duration-400 hover:-translate-y-1 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
              }`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-navy-100 flex items-center justify-center">
                <span className="font-display text-lg font-medium text-navy-600">{rank.icon}</span>
              </div>
              <p className="text-xs font-medium text-neutral-900 mb-1">{rank.name}</p>
              <p className="text-xs text-neutral-600">{rank.detail}</p>
              {rank.sub && <p className="text-xs text-gold-500 mt-1">{rank.sub}</p>}
            </div>
          ))}
        </div>

        {/* Chambers Quote */}
        <div
          className={`text-center max-w-[700px] mx-auto mt-12 transition-all duration-600 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <Quote size={48} className="text-gold-500/30 mx-auto mb-2" />
          <p className="font-display italic text-xl text-neutral-700 leading-relaxed">
            &ldquo;LeCrans &amp; Associes fait preuve d'une excellence technique remarquable et d'une
            comprehension fine des enjeux strategiques de ses clients. Une equipe de tout premier
            plan.&rdquo;
          </p>
          <p className="text-xs text-neutral-500 mt-4">&mdash; Chambers Europe, Edition 2024</p>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 6: Leadership Team ──────────────────────── */
const partners = [
  { name: 'Pierre Dubois', title: 'ASSOCIE — FONDATEUR', specialties: 'Droit des affaires, Fusions-acquisitions', photo: '/portrait-dubois.jpg' },
  { name: 'Claire Martin', title: 'ASSOCIEE', specialties: 'Droit social, Contentieux prudhomal', photo: '/portrait-martin.jpg' },
  { name: 'Antoine Leroy', title: 'ASSOCIE', specialties: 'Droit fiscal, Droit immobilier', photo: '/portrait-leroy.jpg' },
  { name: 'Sophie Petit', title: 'ASSOCIEE', specialties: 'Droit penal des affaires, Contentieux', photo: '/portrait-petit.jpg' },
]

function LeadershipSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-navy-950 py-24">
      <div className="container-law">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">EQUIPE DE DIRECTION</span>
          </div>
          <h2 className="font-display text-display-md text-white">Les associes</h2>
          <p className="mt-4 text-lg text-navy-400 max-w-[640px] leading-relaxed">
            Une equipe d'avocats chevronnes, unis par une culture d'excellence et une ethique de
            travail rigoureuse.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              className={`group bg-navy-900 border border-navy-700 rounded-t-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={partner.photo}
                  alt={partner.name}
                  className="w-full h-full object-cover grayscale transition-all duration-400 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h4 className="font-display text-lg font-medium text-white group-hover:text-gold-500 transition-colors">
                  {partner.name}
                </h4>
                <p className="text-xs text-gold-500 uppercase tracking-wider mt-1">{partner.title}</p>
                <p className="text-sm text-navy-400 mt-2">{partner.specialties}</p>
                <p className="text-xs text-navy-500 mt-2">Barreau de Paris</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            to="/equipe"
            className="inline-flex items-center gap-2 border border-gold-500 text-gold-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-gold-500 hover:text-navy-950"
          >
            VOIR TOUTE L'EQUIPE
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 7: Notable Results ──────────────────────── */
const results = [
  { domain: 'DROIT DES AFFAIRES', desc: "Accompagnement d'une operation de LBO dans le secteur de la sante, representant 450 M€. Structuration juridique complexe mobilisant droit des societes, fiscal et social.", year: '2024' },
  { domain: 'DROIT SOCIAL', desc: "Victoire en cassation dans un litige collectif impliquant 200 salaries. Reconnaissance de la nature abusive des clauses de mobilite geographique.", year: '2023' },
  { domain: 'DROIT IMMOBILIER', desc: "Conseil a l'acquisition d'un portefeuille immobilier de bureaux classe Paris 8eme, valeur globale 120 M€. Due diligence et structuration de la transaction.", year: '2024' },
]

function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container-law">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">RESULTATS</span>
          </div>
          <h2 className="font-display text-4xl text-neutral-900">
            Des resultats qui temoignent de notre engagement
          </h2>
          <p className="text-xs text-neutral-500 max-w-[600px] mx-auto mt-3">
            Les resultats presentes sont issus de dossiers reels mais ne constituent pas une garantie
            de resultats futurs. Chaque affaire est unique.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {results.map((result, i) => (
            <div
              key={result.domain}
              className={`border-l-[3px] border-l-gold-500 pl-6 py-2 transition-all duration-500 ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[20px]'
              }`}
              style={{
                transitionDelay: `${i * 0.15}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="text-overline text-gold-500 text-[10px]">{result.domain}</span>
              <p className="text-base text-neutral-700 leading-relaxed mt-3">{result.desc}</p>
              <p className="text-xs text-neutral-500 mt-4">{result.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 8: Testimonials ──────────────────────── */
const testimonials = [
  {
    quote: "Une equipe d'une competence remarquable, reactive et strategique. LeCrans & Associes a ete un partenaire decisif dans la reussite de notre cession.",
    attribution: 'DIRECTEUR JURIDIQUE, ETI INDUSTRIELLE',
  },
  {
    quote: "Dans une periode difficile de ma vie, j'ai trouve aupres de Me Martin un soutien a la fois humain et juridique d'une grande qualite.",
    attribution: 'CLIENT PARTICULIER, DROIT DE LA FAMILLE',
  },
  {
    quote: "Leur maitrise du droit fiscal international nous a permis d'optimiser notre structure de holding avec une securite juridique totale.",
    attribution: 'DAF, GROUPE IMMOBILIER',
  },
]

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const goTo = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setIsAnimating(false)
    }, 400)
  }, [isAnimating])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <section className="bg-navy-50 py-20">
      <div className="container-law">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">TEMOIGNAGES</span>
          </div>
          <h2 className="font-display text-4xl text-neutral-900">
            Ce que nos clients disent de nous
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-[800px] mx-auto text-center relative min-h-[220px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-400 ${
                i === current
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-[40px] pointer-events-none'
              }`}
            >
              <Quote size={48} className="text-gold-500/30 mb-4" />
              <p className="font-display italic text-[22px] text-neutral-800 leading-relaxed max-w-[700px]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm font-semibold text-neutral-900 mt-6 uppercase tracking-wider">
                {t.attribution}
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-gold-500 w-6' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-500 text-center mt-6 max-w-[600px] mx-auto">
          Les temoignages presentes reflectent l'experience individuelle de chaque client et ne
          constituent pas une garantie de resultat.
        </p>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 9: Publications Preview ──────────────────────── */
const publications = [
  { date: '15 JAN 2025', title: 'Reforme des retraites : impacts sur les accords d\'entreprise et les regimes supplementaires', domain: 'DROIT SOCIAL', author: 'Claire Martin' },
  { date: '08 JAN 2025', title: 'La directive CSRD et ses implications pour les entreprises non-cotees : un decryptage pratique', domain: 'DROIT DES AFFAIRES', author: 'Antoine Leroy' },
  { date: '20 DEC 2024', title: 'Contentieux immobilier : l\'evolution recente de la jurisprudence sur les vices caches', domain: 'DROIT IMMOBILIER', author: 'Sophie Petit' },
]

function PublicationsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container-law">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">PUBLICATIONS RECENTES</span>
          </div>
          <h2 className="font-display text-4xl text-neutral-900">Nos dernieres analyses juridiques</h2>
        </div>

        {/* Publication List */}
        <div className="flex flex-col gap-4">
          {publications.map((pub, i) => (
            <Link
              to="/publications"
              key={pub.title}
              className={`group flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-6 rounded-md border border-transparent transition-all duration-400 hover:bg-navy-50 hover:border-l-[3px] hover:border-l-gold-500 ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[20px]'
              }`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Date badge */}
              <div className="shrink-0 bg-gold-100 px-3 py-2 rounded-sm text-center min-w-[80px]">
                <span className="text-[10px] font-semibold text-gold-600 uppercase tracking-wider">
                  {pub.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-lg font-medium text-neutral-900 group-hover:text-gold-600 transition-colors">
                  {pub.title}
                </h4>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-[10px] font-medium text-gold-600 uppercase tracking-wider bg-gold-50 px-2 py-0.5 rounded-sm">
                    {pub.domain}
                  </span>
                  <span className="text-xs text-neutral-500">par {pub.author}</span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={18}
                className="text-navy-400 shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold-500"
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link
            to="/publications"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 uppercase tracking-wider group hover:underline"
          >
            VOIR TOUTES LES PUBLICATIONS
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Section 10: CTA Contact ──────────────────────── */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-navy-900 py-24 relative overflow-hidden">
      {/* Decorative radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(212, 160, 23, 0.03) 0%, transparent 70%)',
        }}
      />

      <div
        className="container-law max-w-[700px] text-center relative z-10"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-gold-500" />
          <span className="text-overline text-gold-500">PRENDRE CONTACT</span>
          <span className="w-8 h-px bg-gold-500" />
        </div>
        <h2 className="font-display text-display-md text-white">Discutons de votre situation</h2>
        <p className="mt-4 text-lg text-navy-300 leading-relaxed">
          Que vous soyez une entreprise face a un enjeu strategique ou un particulier dans une
          situation personnelle, notre equipe est a votre ecoute.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            to="/contact"
            className="bg-gold-600 text-navy-950 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-500 hover:shadow-gold flex items-center gap-2 group"
          >
            NOUS CONTACTER
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+33142680000"
            className="border border-white text-white px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-white hover:text-navy-950 flex items-center gap-2"
          >
            <Phone size={16} />
            01 42 68 00 00
          </a>
        </div>

        <p className="mt-6 text-sm text-navy-400">
          Pour les urgences : contactez-nous directement au 01 42 68 00 00 &mdash; le secret
          professionnel garantit la confidentialite absolue de nos echanges.
        </p>
      </div>
    </section>
  )
}

/* ──────────────────────── Home Page ──────────────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ExpertisesSection />
      <KeyFiguresSection />
      <AboutSection />
      <RankingsSection />
      <LeadershipSection />
      <ResultsSection />
      <TestimonialsSection />
      <PublicationsSection />
      <CTASection />
    </>
  )
}
