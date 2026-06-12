import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  BookOpen,
  Users,
  Globe,
  Heart,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Quote,
  Mail,
  ArrowRight,
} from 'lucide-react'

/* ─── Animation helpers ─── */
const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePremium } },
}

/* ─── Value Cards Data (user-specified 6 cards) ─── */
const valueCards = [
  {
    icon: Award,
    title: 'Excellence',
    description:
      'Class\u00e9e parmi les meilleurs cabinets fran\u00e7ais par Chambers Europe et Legal 500. Une r\u00e9putation qui valorise votre parcours professionnel.',
  },
  {
    icon: BookOpen,
    title: 'D\u00e9veloppement',
    description:
      'Un programme de formation interne ambitieux : veille juridique, s\u00e9minaires sectoriels, pr\u00e9paration aux certifications et mentoring personnalis\u00e9.',
  },
  {
    icon: Users,
    title: 'Responsabilit\u00e9',
    description:
      'Une structure \u00e0 taille humaine o\u00f9 chaque collaborateur b\u00e9n\u00e9ficie d\u0027une exposition directe aux clients et d\u00e8s sa premi\u00e8re ann\u00e9e.',
  },
  {
    icon: Globe,
    title: 'Innovation',
    description:
      'Des dossiers transfrontaliers, un r\u00e9seau de correspondants \u00e0 l\u0027\u00e9tranger et des outils legal tech de pointe pour transformer la pratique.',
  },
  {
    icon: Heart,
    title: 'Diversit\u00e9',
    description:
      'Une politique de bien-\u00eatre au travail attentive, du t\u00e9l\u00e9travail encadr\u00e9 et une culture de respect des temps de d\u00e9connexion.',
  },
  {
    icon: TrendingUp,
    title: 'Impact',
    description:
      'Un parcours de carri\u00e8re transparent de la collaboration \u00e0 l\u0027association, avec des crit\u00e8res d\u0027avancement objectifs et mesurables.',
  },
]

/* ─── Testimonials Data ─── */
const testimonials = [
  {
    quote:
      "J\u0027ai rejoint le cabinet comme collaboratrice de premi\u00e8re ann\u00e9e et j\u0027ai rapidement \u00e9t\u00e9 mise en responsabilit\u00e9 sur des dossiers complexes. La confiance et l\u0027accompagnement sont r\u00e9els.",
    author: 'Camille Chevalier',
    role: 'Collaboratrice \u2014 Droit Social',
    tenure: '3 ans au cabinet',
  },
  {
    quote:
      "La culture d\u0027ouverture intellectuelle et la qualit\u00e9 des \u00e9changes internes font de ce cabinet un lieu d\u0027apprentissage exceptionnel pour un jeune avocat.",
    author: 'Thomas Laurent',
    role: 'Counsel \u2014 Droit des Affaires',
    tenure: '6 ans au cabinet',
  },
]

/* ─── Job Postings Data (user-specified 4 positions) ─── */
const jobPostings = [
  {
    id: 1,
    title: 'Associ\u00e9 \u2014 Droit des Affaires (M&A)',
    tags: ['DROIT DES AFFAIRES', '5+ ANS', 'PARIS'],
    description:
      'Nous recherchons un associ\u00e9 exp\u00e9riment\u00e9 en droit des soci\u00e9t\u00e9s et M&A pour renforcer notre \u00e9quipe et d\u00e9velopper son portefeuille clients. Vous interviendrez sur des op\u00e9rations de fusion-acquisition, de private equity et de conseil en droit des soci\u00e9t\u00e9s.',
    requirements: [
      'Minimum 5 ans d\u0027exp\u00e9rience en M&A',
      'Formation sup\u00e9rieure en droit des affaires (Barreau de Paris)',
      'Anglais courant (n\u00e9gociations complexes)',
      'Capacit\u00e9 \u00e0 d\u00e9velopper un portefeuille clients',
      'Leadership et esprit d\u0027\u00e9quipe',
    ],
    offer: [
      'R\u00e9mun\u00e9ration attractive et participation',
      'Autonomie dans le d\u00e9veloppement commercial',
      '\u00c9quipe d\u00e9di\u00e9e de collaborateurs',
      'Visibilit\u00e9 nationale et internationale',
    ],
  },
  {
    id: 2,
    title: 'Collaborateur/trice \u2014 Droit Social',
    tags: ['DROIT SOCIAL', '2-5 ANS', 'PARIS'],
    description:
      'Nous recherchons un(e) collaborateur(trice) avec 2 \u00e0 5 ans d\u0027exp\u00e9rience en droit social pour rejoindre notre \u00e9quipe. Vous accompagnerez nos clients sur les relations individuelles et collectives, la r\u00e9daction de accords et le contentieux prud\u0027homal.',
    requirements: [
      'De 2 \u00e0 5 ans d\u0027exp\u00e9rience en droit social',
      'Formation sup\u00e9rieure en droit (DES ou Master II appr\u00e9ci\u00e9)',
      'Anglais professionnel',
      'Rigueur, r\u00e9activit\u00e9 et esprit d\u0027\u00e9quipe',
      'Excellent relationnel client',
    ],
    offer: [
      'Int\u00e9gration au sein d\u0027une \u00e9quipe dynamique',
      'Responsabilit\u00e9 rapide sur les dossiers',
      'Formation continue et veille juridique',
      'Package attractif selon profil',
    ],
  },
  {
    id: 3,
    title: 'Stagiaire \u2014 Contentieux',
    tags: ['CONTENTIEUX', 'STAGE 6 MOIS', 'PARIS'],
    description:
      'Nous proposons un stage de 6 mois au sein de notre d\u00e9partement contentieux. Vous participerez activement \u00e0 la pr\u00e9paration des dossiers, la r\u00e9daction d\u0027actes et le suivi des proc\u00e9dures.',
    requirements: [
      '\u00c9tudiant(e) en Master 2 ou \u00e9l\u00e8ve-avocat(e)',
      'Int\u00e9r\u00eat prononc\u00e9 pour le contentieux',
      'Rigueur et sens de l\u0027analyse',
      'Bon niveau d\u0027anglais',
      'Stage conventionn\u00e9 obligatoire',
    ],
    offer: [
      'Encadrement par des avocats exp\u00e9riment\u00e9s',
      'Participation aux audiences',
      'Formation pratique sur le terrain',
      'Possibilit\u00e9 d\u0027embauche \u00e0 l\u0027issue',
    ],
  },
  {
    id: 4,
    title: 'Legal Tech Analyst',
    tags: ['LEGAL TECH', '2+ ANS', 'PARIS'],
    description:
      'Nous recherchons un Legal Tech Analyst pour accompagner notre transformation digitale. Vous serez en charge de d\u00e9ployer et optimiser nos outils technologiques au service de l\u0027excellence juridique.',
    requirements: [
      '2+ ans d\u0027exp\u00e9rience en legal tech ou IT juridique',
      'Connaissance des outils de contract management et eDiscovery',
      'Comp\u00e9tences en programmation (Python, SQL) appr\u00e9ci\u00e9es',
      'Sens de l\u0027innovation et capacit\u00e9 de formation',
      'Anglais professionnel',
    ],
    offer: [
      'Poste hybride tech / droit',
      'Formation aux derni\u00e8res technologies',
      'Environnement stimulant et innovant',
      '\u00c9volution vers des postes de conseil legal tech',
    ],
  },
]

/* ─── Career Path Steps (user-specified 4 steps) ─── */
const careerSteps = [
  {
    step: 1,
    title: 'Candidature',
    description:
      'Envoyez-nous votre CV et lettre de motivation. Notre \u00e9quipe des ressources humaines examine chaque dossier avec attention et vous recontacte sous 48h.',
  },
  {
    step: 2,
    title: 'Entretiens',
    description:
      'Rencontrez nos \u00e9quipes lors de plusieurs entretiens. Nous \u00e9valuons vos comp\u00e9tences techniques, votre personnalit\u00e9 et votre adh\u00e9sion \u00e0 nos valeurs.',
  },
  {
    step: 3,
    title: 'Int\u00e9gration',
    description:
      'B\u00e9n\u00e9ficiez d\u0027un programme d\u0027int\u00e9gration structur\u00e9 : formation interne, parrainage par un associ\u00e9 et premiers dossiers encadr\u00e9s.',
  },
  {
    step: 4,
    title: 'D\u00e9veloppement',
    description:
      '\u00c9voluez vers l\u0027autonomie, puis vers des postes de counsel et d\u0027associ\u00e9 avec un parcours transparent et des crit\u00e8res objectifs.',
  },
]

/* ─── Section: Hero ─── */
function HeroSection() {
  const scrollToPositions = () => {
    const el = document.getElementById('postes-a-pourvoir')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/office-conference.jpg)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--overlay-dark)]" />

      <div className="relative z-10 container-law text-center py-32">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <span className="text-navy-400 text-sm">
            <Link to="/" className="hover:text-gold-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-navy-300">Carrieres</span>
          </span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: easePremium }}
          className="text-overline text-gold-500 mb-4"
        >
          REJOINDRE LE CABINET
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: easePremium }}
          className="font-display text-display-md text-white max-w-[800px] mx-auto"
        >
          Construisez votre excellence avec nous
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easePremium }}
          className="mt-6 text-lg text-navy-300 max-w-[640px] mx-auto"
        >
          LeCrans &amp; Associes recrute des talents passionnes, ambitieux et attaches a
          l&apos;excellence juridique. Decouvrez nos opportunites et notre culture.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: easePremium }}
          onClick={scrollToPositions}
          className="mt-8 inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-400 hover:shadow-gold"
        >
          VOIR LES OFFRES
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </section>
  )
}

/* ─── Section: Value Propositions ─── */
function ValueSection() {
  return (
    <section className="bg-white py-24">
      <div className="container-law max-w-[1280px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.div variants={staggerItem} className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">POURQUOI NOUS REJOINDRE</span>
            <span className="w-8 h-px bg-gold-500" />
          </motion.div>
          <motion.h2 variants={staggerItem} className="font-display text-display-lg text-neutral-900">
            Une carriere differenciante
          </motion.h2>
          <motion.div
            variants={staggerItem}
            className="w-12 h-0.5 bg-gold-500 mx-auto mt-4"
          />
        </motion.div>

        {/* Value Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          {valueCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-white border border-neutral-200 rounded-md p-7 text-center transition-shadow duration-300 hover:shadow-lg hover:border-gold-500/30"
            >
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-4">
                <card.icon size={48} className="text-gold-500" strokeWidth={1.5} />
              </div>
              <h4 className="font-display text-lg font-medium text-neutral-900">{card.title}</h4>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Section: Culture + Testimonials ─── */
function CultureSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-navy-50 py-24">
      <div className="container-law max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easePremium }}
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <img
              src="/office-reception.jpg"
              alt="Le cabinet LeCrans &amp; Associes"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Right — Text + Testimonials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-overline text-gold-500">NOTRE CULTURE</span>
            </motion.div>

            <motion.h2 variants={staggerItem} className="font-display text-h2 text-neutral-900">
              Ce qui nous rassemble
            </motion.h2>

            <motion.p variants={staggerItem} className="mt-4 text-neutral-700 leading-relaxed">
              Chez LeCrans &amp; Associes, nous cultivons une culture fondee sur l&apos;excellence
              technique, l&apos;ethique professionnelle et la solidarite. Chaque collaborateur est un
              acteur a part entiere de la reussite collective.
            </motion.p>

            {/* Testimonial Carousel */}
            <motion.div variants={staggerItem} className="mt-8 relative">
              <div className="relative min-h-[140px]">
                <Quote
                  size={48}
                  className="text-gold-500 opacity-30 absolute -top-2 -left-2"
                  strokeWidth={1}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, ease: easePremium }}
                    className="pl-8"
                  >
                    <p className="font-display italic text-lg text-neutral-800 leading-relaxed">
                      &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                    </p>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-neutral-900">
                        {testimonials[activeTestimonial].author}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].tenure}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-4 pl-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === activeTestimonial ? 'bg-gold-500 w-4' : 'bg-neutral-300 hover:bg-neutral-400'
                    }`}
                    aria-label={`Temoignage ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: easePremium }}
          className="mt-16 rounded-lg overflow-hidden shadow-lg"
        >
          <video
            src="/video-firm.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Section: Open Positions ─── */
function JobCard({ job, index }: { job: typeof jobPostings[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: easePremium }}
      className="bg-white border border-neutral-200 rounded-md overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex-1">
          <h4 className="font-display text-lg font-medium text-neutral-900">{job.title}</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 bg-navy-50 text-navy-600 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-500 border border-gold-500 px-4 py-2 transition-all duration-200 hover:bg-gold-500 hover:text-navy-950">
            POSTULER
            <ChevronRight size={14} />
          </span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} className="text-neutral-500" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-neutral-100 pt-4">
              <p className="text-sm text-neutral-700 leading-relaxed">{job.description}</p>

              <div className="mt-4">
                <h5 className="text-sm font-semibold text-neutral-800 mb-2">Profil recherche</h5>
                <ul className="space-y-1">
                  {job.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-neutral-600">
                      <ChevronRight size={14} className="text-gold-500 mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h5 className="text-sm font-semibold text-neutral-800 mb-2">Ce que nous offrons</h5>
                <ul className="space-y-1">
                  {job.offer.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                      <ChevronRight size={14} className="text-gold-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="mailto:recrutement@lecrans-associes.fr?subject=Candidature — ${encodeURIComponent(job.title)}"
                className="mt-5 inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-400 hover:shadow-gold"
              >
                POSTULER MAINTENANT
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function OpenPositionsSection() {
  return (
    <section id="postes-a-pourvoir" className="bg-white py-24">
      <div className="container-law max-w-[1280px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">POSTES A POURVOIR</span>
          </motion.div>
          <motion.h2 variants={staggerItem} className="font-display text-display-lg text-neutral-900">
            Nos opportunites
          </motion.h2>
        </motion.div>

        {/* Job List */}
        <div className="flex flex-col gap-3 mt-8">
          {jobPostings.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>

        {/* Spontaneous application note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-sm text-neutral-600"
        >
          Vous ne trouvez pas de poste correspondant a votre profil ? Nous etudions les candidatures
          spontanees. Envoyez votre CV et lettre de motivation a :{' '}
          <a
            href="mailto:recrutement@lecrans-associes.fr"
            className="inline-flex items-center gap-1 text-gold-600 hover:text-gold-500 transition-colors font-medium"
          >
            <Mail size={14} />
            recrutement@lecrans-associes.fr
          </a>
        </motion.p>
      </div>
    </section>
  )
}

/* ─── Section: Career Path Timeline ─── */
function CareerPathSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineHeight(100)
        }
      },
      { threshold: 0.2 }
    )
    if (lineRef.current) observer.observe(lineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-navy-900 py-24">
      <div className="container-law max-w-[1000px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">PARCOURS DE CARRIERE</span>
            <span className="w-8 h-px bg-gold-500" />
          </motion.div>
          <motion.h2 variants={staggerItem} className="font-display text-display-lg text-white">
            De la collaboration a l&apos;association
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy-700 md:-translate-x-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: lineHeight / 100 }}
              transition={{ duration: 0.8, ease: easePremium }}
              className="absolute inset-0 w-full bg-gold-500/30 origin-top"
            />
          </div>

          <div className="space-y-12">
            {careerSteps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: easePremium }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row gap-6 md:gap-12`}
                >
                  {/* Step node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-navy-900 -translate-x-1/2 z-10" />

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[45%] ${
                      isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="bg-navy-800 rounded-md p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider">
                          Etape {step.step}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-medium text-white">{step.title}</h4>
                      <p className="mt-1 text-sm text-navy-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section: CTA ─── */
function CTASection() {
  return (
    <section className="bg-white py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="container-law max-w-[600px] mx-auto text-center"
      >
        <motion.h2 variants={staggerItem} className="font-display text-display-lg text-neutral-900">
          Pret a nous rejoindre ?
        </motion.h2>
        <motion.p variants={staggerItem} className="mt-4 text-neutral-600">
          Envoyez-nous votre candidature spontanee ou postulez a l&apos;une de nos offres. Nous
          etudions chaque dossier avec attention.
        </motion.p>
        <motion.div
          variants={staggerItem}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:recrutement@lecrans-associes.fr"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-400 hover:shadow-gold"
          >
            POSTULER
            <ArrowRight size={14} />
          </a>
          <Link
            to="/contact?sujet=recrutement"
            className="inline-flex items-center gap-2 border border-navy-900 text-navy-900 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-navy-900 hover:text-white"
          >
            CONTACTEZ NOS RH
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Main Page ─── */
export default function Carrieres() {
  return (
    <main>
      <HeroSection />
      <ValueSection />
      <CultureSection />
      <OpenPositionsSection />
      <CareerPathSection />
      <CTASection />
    </main>
  )
}
