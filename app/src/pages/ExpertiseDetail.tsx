import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  FileText,
  Briefcase,
  Phone,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { expertisesData } from './Expertises'

/* ------------------------------------------------------------------ */
/*  HELPER: useScrollReveal                                            */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  }
}

/* ------------------------------------------------------------------ */
/*  FALLBACK DATA                                                      */
/* ------------------------------------------------------------------ */

const fallbackExpertise = {
  slug: 'not-found',
  title: 'Domaine d\'expertise',
  description: 'Ce domaine d\'expertise n\'est pas disponible. Decouvrez nos autres specialites.',
  category: ['B2B'] as ('B2B' | 'B2C' | 'Contentieux' | 'All')[],
  icon: <Briefcase size={64} />,
  tint: '#2A3F5F',
  points: ['Expertise juridique', 'Conseil personnalise', 'Contentieux'],
  meta: { partners: 2, publications: 5, cases: 50 },
  services: [
    { name: 'Consultation', desc: 'Analyse de votre situation juridique' },
    { name: 'Conseil', desc: 'Strategie adaptee a vos besoins' },
    { name: 'Contentieux', desc: 'Representation devant les juridictions' },
  ],
  faqs: [
    { q: 'Comment prendre rendez-vous ?', a: 'Vous pouvez nous contacter par telephone au 01 42 68 00 00 ou via notre formulaire en ligne. Notre equipe vous repondra dans les 24 heures.' },
    { q: 'Quels sont vos honoraires ?', a: 'Nos honoraires sont etablis en fonction de la complexite du dossier. Une convention d\'honoraires detaillee est signee avant tout debut de mission.' },
    { q: 'Le cabinet offre-t-il une premiere consultation gratuite ?', a: 'Oui, nous proposons un premier entretien de 30 minutes permettant d\'evaluer votre situation et de vous proposer une strategie adaptee.' },
  ],
  longDescription: [
    'Le cabinet LeCrans & Associes met son expertise au service de ses clients depuis plus de vingt-cinq ans. Notre equipe d\'avocats specialises accompagne entreprises et particuliers dans leurs projets les plus complexes.',
    'Nous privilegions une approche personnalisee, chaque dossier faisant l\'objet d\'une attention particuliere et d\'une strategie sur mesure. Notre engagement : excellence juridique et proximite avec nos clients.',
    'Reconnus par les classements internationaux Chambers Europe et Legal 500, nous assurons une defense rigoureuse et un conseil de haut niveau dans toutes nos specialites.',
    'Nous vous invitons a consulter nos domaines d\'expertise ou a nous contacter directement pour discuter de votre situation.',
  ],
  team: [
    { name: 'Pierre Dubois', title: 'Associe', slug: 'pierre-dubois', portrait: '/portrait-dubois.jpg', bio: 'Plus de 25 ans d\'experience.', specialties: ['Droit des Affaires', 'Contentieux'] },
    { name: 'Sophie Martin', title: 'Associee', slug: 'sophie-martin', portrait: '/portrait-martin.jpg', bio: 'Experte en droit fiscal et social.', specialties: ['Droit Fiscal', 'Droit Social'] },
  ],
  publications: [
    { title: 'Tendances juridiques 2025', excerpt: 'Les grandes evolutions du droit des affaires.', author: 'Pierre Dubois', date: '1 mars 2025' },
  ],
  results: [
    { domain: 'General', desc: 'Accompagnement de nombreux clients dans des dossiers complexes', year: '2024' },
  ],
  stats: [
    { label: 'affaires traitees', value: 50, suffix: '+' },
    { label: 'taux de satisfaction', value: 95, suffix: '%' },
    { label: 'annees d\'experience', value: 15, suffix: ' ans' },
  ],
}

/* ------------------------------------------------------------------ */
/*  EXPERTISE DETAIL PAGE                                              */
/* ------------------------------------------------------------------ */

export default function ExpertiseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const expertise = expertisesData.find((e) => e.slug === slug) || fallbackExpertise
  const isFallback = expertise.slug === 'not-found'

  const fadeUp = useScrollReveal()

  const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number]

  /* Taglines per expertise */
  const taglines: Record<string, string> = {
    'droit-des-affaires': 'L\'excellence en conseil et contentieux des operations d\'entreprise',
    'droit-social': 'Expertise complete en relations sociales et contentieux du travail',
    'droit-fiscal': 'Conseil fiscal, contentieux et optimisation dans un environnement complexe',
    'droit-immobilier': 'Maitrise de toute la chaine immobiliere, de l\'urbanisme aux baux commerciaux',
    'droit-penal-affaires': 'Defense des dirigeants et des entreprises dans les contextes les plus sensibles',
    'droit-international': 'Arbitrage international et contentieux transfrontaliers de classe mondiale',
    'droit-famille': 'Un accompagnement humain et rigoureux dans les moments decisifs',
    'contentieux': 'Une force de frappe juridictionnelle reconnue devant tous les ordres de juridiction',
  }
  const tagline = taglines[slug || ''] || 'Expertise juridique d\'excellence a votre service'

  /* JSON-LD FAQ schema */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: expertise.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://lecrans-associes.fr/#/' },
      { '@type': 'ListItem', position: 2, name: 'Expertises', item: 'https://lecrans-associes.fr/#/expertises' },
      { '@type': 'ListItem', position: 3, name: expertise.title, item: `https://lecrans-associes.fr/#/expertises/${expertise.slug}` },
    ],
  }

  return (
    <div className="min-h-[100dvh]">
      {/* ======== SECTION 1: HERO ======== */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: 'clamp(360px, 45vh, 540px)',
          backgroundColor: expertise.tint,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="relative z-10 text-center max-w-[800px] px-6 py-20">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs text-navy-400">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/expertises" className="hover:text-gold-400 transition-colors duration-200">
                  Expertises
                </Link>
              </li>
              <li>/</li>
              <li className="text-navy-300">{expertise.title}</li>
            </ol>
          </nav>

          {/* Icon */}
          <motion.div
            className="text-gold-500 mx-auto mb-4"
            style={{ opacity: 0.6 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easePremium }}
          >
            {expertise.icon}
          </motion.div>

          <motion.p
            className="text-overline text-gold-500 mb-3"
            style={{ letterSpacing: '0.15em', fontSize: '12px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easePremium }}
          >
            DOMAINES D&apos;EXPERTISE
          </motion.p>

          <motion.h1
            className="font-display text-display-md text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: easePremium }}
          >
            {expertise.title}
          </motion.h1>

          <motion.p
            className="mt-5 text-lg text-navy-300 max-w-[600px] mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: easePremium }}
          >
            {tagline}
          </motion.p>

          {/* Meta bar */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-6 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: easePremium }}
          >
            <div className="flex items-center gap-2 text-sm text-navy-400">
              <Users size={16} />
              <span>{expertise.meta.partners} associes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-navy-400">
              <FileText size={16} />
              <span>{expertise.meta.publications} publications</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-navy-400">
              <Briefcase size={16} />
              <span>{expertise.meta.cases} affaires/an</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======== FALLBACK: redirect suggestion ======== */}
      {isFallback && (
        <section className="bg-white py-24">
          <div className="container-law text-center">
            <h2 className="font-display text-display-lg text-neutral-900 mb-4">
              Domaine non trouve
            </h2>
            <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
              Le domaine d&apos;expertise que vous recherchez n&apos;existe pas. Decouvrez nos specialites ci-dessous.
            </p>
            <Link
              to="/expertises"
              className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-gold-400 transition-colors duration-200"
            >
              VOIR NOS EXPERTISES
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {!isFallback && (
        <>
          {/* ======== SECTION 2: DESCRIPTION & APPROACH ======== */}
          <section className="bg-white py-24">
            <div className="container-law">
              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16">
                {/* Left — Text */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-gold-500" />
                    <span className="text-overline text-gold-500">PRESENTATION</span>
                  </motion.div>

                  <motion.h2
                    variants={fadeUp}
                    className="font-display text-display-lg text-neutral-900"
                  >
                    Notre approche en {expertise.title.toLowerCase()}
                  </motion.h2>

                  <motion.div variants={fadeUp} className="mt-4 mb-8">
                    <span className="inline-block w-12 h-0.5 bg-gold-500" />
                  </motion.div>

                  <motion.div variants={fadeUp} className="space-y-4">
                    {expertise.longDescription.map((para, i) => (
                      <p key={i} className="text-base text-neutral-700 leading-[1.7]">
                        {para}
                      </p>
                    ))}
                  </motion.div>

                  {/* Service list */}
                  <motion.div variants={fadeUp} className="mt-10">
                    <h3 className="font-display font-medium text-xl text-neutral-900 mb-5">
                      Nos missions
                    </h3>
                    <ul className="space-y-4">
                      {expertise.services.map((svc) => (
                        <li key={svc.name} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 shrink-0" />
                          <div>
                            <p className="text-[15px] font-semibold text-neutral-800">
                              {svc.name}
                            </p>
                            <p className="text-sm text-neutral-600">{svc.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Right — Image + Contact card */}
                <motion.div
                  initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: easePremium }}
                >
                  <div className="sticky top-28">
                    <img
                      src="/office-conference.jpg"
                      alt="Conference room"
                      className="w-full rounded-lg shadow-md object-cover"
                      style={{ maxHeight: '400px' }}
                    />

                    {/* Contact card */}
                    <div className="mt-6 bg-gold-50 rounded-lg p-5">
                      <p className="text-sm font-semibold text-neutral-900 mb-1">
                        Contactez un specialiste
                      </p>
                      <p className="text-[13px] text-neutral-600 mb-3">
                        {expertise.team[0]?.name}, {expertise.team[0]?.title}
                      </p>
                      <a
                        href="tel:+33142680000"
                        className="flex items-center gap-2 text-sm font-medium text-gold-600 mb-4"
                      >
                        <Phone size={14} />
                        01 42 68 00 00
                      </a>
                      <Link
                        to={`/contact?domain=${expertise.slug}`}
                        className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-gold-400 transition-colors duration-200"
                      >
                        PRENDRE RENDEZ-VOUS
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ======== SECTION 3: FAQ ======== */}
          <section className="bg-navy-50 py-20">
            <div className="container-law max-w-[900px]">
              <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easePremium }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="w-8 h-px bg-gold-500" />
                  <span className="text-overline text-gold-500">QUESTIONS FREQUENTES</span>
                  <span className="w-8 h-px bg-gold-500" />
                </div>
                <h2 className="font-display text-3xl text-neutral-900">
                  Ce que nos clients se demandent
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: easePremium }}
              >
                <Accordion type="single" collapsible className="w-full">
                  {expertise.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-b border-neutral-200">
                      <AccordionTrigger className="text-left text-[15px] font-medium text-neutral-800 hover:no-underline py-5">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-neutral-600 leading-[1.7] pb-5 pl-6">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </section>

          {/* ======== SECTION 4: ASSOCIATED TEAM ======== */}
          <section className="bg-white py-20">
            <div className="container-law">
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easePremium }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-gold-500" />
                  <span className="text-overline text-gold-500">EQUIPE DEDIEE</span>
                </div>
                <h2 className="font-display text-display-lg text-neutral-900">
                  Les specialistes en {expertise.title.toLowerCase()}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expertise.team.map((member, i) => (
                  <motion.div
                    key={member.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: easePremium }}
                  >
                    <Link to={`/equipe/${member.slug}`} className="group block">
                      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        {/* Portrait */}
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={member.portrait}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
                          />
                        </div>
                        {/* Content */}
                        <div className="p-5">
                          <h4 className="font-display font-medium text-lg text-neutral-900 group-hover:text-gold-600 transition-colors duration-200">
                            {member.name}
                          </h4>
                          <p className="text-xs uppercase text-gold-500 font-medium tracking-wider mt-1">
                            {member.title}
                          </p>
                          <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                            {member.bio}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {member.specialties.map((sp) => (
                              <span
                                key={sp}
                                className="text-[11px] bg-navy-50 text-navy-600 px-2 py-0.5 rounded-sm"
                              >
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/equipe"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:underline"
                >
                  VOIR TOUTE L&apos;EQUIPE
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          {/* ======== SECTION 5: RELATED PUBLICATIONS ======== */}
          <section className="bg-navy-50 py-20">
            <div className="container-law">
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easePremium }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-gold-500" />
                  <span className="text-overline text-gold-500">PUBLICATIONS RECENTES</span>
                </div>
                <h2 className="font-display text-display-lg text-neutral-900">
                  Analyses et decryptages en {expertise.title.toLowerCase()}
                </h2>
              </motion.div>

              <div className="space-y-3">
                {expertise.publications.map((pub, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: easePremium }}
                  >
                    <Link
                      to="/publications"
                      className="flex items-start gap-5 bg-white border border-neutral-200 rounded-lg p-5 hover:bg-navy-50 hover:border-l-[3px] hover:border-l-gold-500 transition-all duration-200 group"
                    >
                      {/* Date badge */}
                      <div className="hidden sm:flex flex-col items-center bg-gold-100 text-gold-600 text-[10px] uppercase tracking-wider font-medium rounded-sm px-3 py-2 shrink-0 self-start">
                        <span>{pub.date.split(' ')[0]}</span>
                        <span>{pub.date.split(' ')[1]}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-medium text-lg text-neutral-900 group-hover:text-gold-600 transition-colors duration-200">
                          {pub.title}
                        </h4>
                        <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                          {pub.excerpt}
                        </p>
                        <p className="text-xs text-neutral-500 mt-2">
                          Par {pub.author} &mdash; {pub.date}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight
                        size={18}
                        className="text-neutral-400 group-hover:translate-x-1 transition-transform duration-200 shrink-0 mt-1"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to={`/publications?domain=${expertise.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:underline"
                >
                  VOIR TOUTES LES PUBLICATIONS
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          {/* ======== SECTION 6: ANONYMIZED RESULTS ======== */}
          <section className="bg-white py-20">
            <div className="container-law">
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easePremium }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-gold-500" />
                  <span className="text-overline text-gold-500">AFFAIRES SIGNIFICATIVES</span>
                </div>
                <h2 className="font-display text-display-lg text-neutral-900">
                  Notre experience en chiffres
                </h2>
                <p className="text-xs text-neutral-500 mt-2">
                  Les resultats presentes ne constituent pas une garantie de resultats futurs.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {expertise.results.map((res, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.15, duration: 0.5, ease: easePremium }}
                    className="border-l-[3px] border-l-gold-500 pl-6"
                  >
                    <span className="text-[10px] uppercase tracking-wider bg-gold-100 text-gold-600 px-2 py-0.5 rounded-sm font-medium">
                      {res.domain}
                    </span>
                    <p className="mt-3 text-base text-neutral-700 leading-relaxed">
                      {res.desc}
                    </p>
                    <p className="mt-2 text-xs text-neutral-500">{res.year}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stats row */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-12 mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: easePremium }}
              >
                {expertise.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-4xl text-gold-500">
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ======== SECTION 7: CTA ======== */}
          <section className="bg-navy-900 py-20">
            <div className="container-law">
              <motion.div
                className="text-center max-w-[700px] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easePremium }}
              >
                <h2 className="font-display text-display-lg text-white">
                  Besoin d&apos;un avocat en {expertise.title.toLowerCase()} ?
                </h2>
                <p className="mt-5 text-base text-navy-300 leading-relaxed">
                  Notre equipe de specialistes est a votre ecoute pour analyser votre situation et vous proposer une strategie adaptee.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                  <Link
                    to={`/contact?domain=${expertise.slug}`}
                    className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-gold-400 transition-colors duration-200"
                  >
                    PRENDRE RENDEZ-VOUS
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href="tel:+33142680000"
                    className="inline-flex items-center gap-2 border border-gold-500 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-gold-500 hover:text-navy-950 transition-all duration-200"
                  >
                    <Phone size={14} />
                    01 42 68 00 00
                  </a>
                </div>

                <p className="mt-5 text-xs text-navy-500">
                  Le secret professionnel garantit la confidentialite absolue de vos echanges.
                </p>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* ======== JSON-LD SCHEMAS ======== */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </div>
  )
}
