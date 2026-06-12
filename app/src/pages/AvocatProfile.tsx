import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail, Phone, Linkedin, Calendar, Globe, FileText, ArrowRight, ChevronRight,
} from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────────
interface FocusArea {
  number: string
  title: string
  description: string
}

interface Publication {
  date: string
  title: string
  excerpt: string
  domain: string
}

interface Ranking {
  org: string
  level: string
  domain: string
  year: string
}

interface LawyerProfile {
  slug: string
  name: string
  firstName: string
  title: string
  titleDisplay: string
  specialties: string[]
  bar: string
  barYear: string
  languages: string
  languagesDetail: { lang: string; level: string }[]
  portrait: string | null
  email: string
  linkedin: string
  publicationsCount: number

  biography: string[]

  education: { institution: string; degree: string }[]
  memberships: string[]
  rankings: Ranking[]

  focusAreas: FocusArea[]
  publications: Publication[]

  relatedSlugs: string[]
}

// ─── Animation Helpers ──────────────────────────────────────────────────
const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: easePremium },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easePremium } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3, ease: easePremium } },
}

// ─── Team Members Data (for related section) ────────────────────────────
const allTeamMembers = [
  { slug: 'pierre-dubois', name: 'Pierre Dubois', role: 'ASSOCIE — FONDATEUR', specialties: ['Droit des affaires', 'M&A'], bar: 'Barreau de Paris', portrait: '/portrait-dubois.jpg' },
  { slug: 'claire-martin', name: 'Claire Martin', role: 'ASSOCIEE', specialties: ['Droit social'], bar: 'Barreau de Paris', portrait: '/portrait-martin.jpg' },
  { slug: 'antoine-leroy', name: 'Antoine Leroy', role: 'ASSOCIE', specialties: ['Droit fiscal', 'Immobilier'], bar: 'Barreau de Paris', portrait: '/portrait-leroy.jpg' },
  { slug: 'sophie-petit', name: 'Sophie Petit', role: 'ASSOCIEE', specialties: ['Droit penal', 'Contentieux'], bar: 'Barreau de Paris', portrait: '/portrait-petit.jpg' },
  { slug: 'jean-moreau', name: 'Jean Moreau', role: 'ASSOCIE', specialties: ['Droit immobilier', 'Construction'], bar: 'Barreau de Lyon', portrait: '/portrait-moreau.jpg' },
  { slug: 'marie-roux', name: 'Marie Roux', role: 'ASSOCIEE', specialties: ['Droit de la famille'], bar: 'Barreau de Paris', portrait: '/portrait-roux.jpg' },
  { slug: 'philippe-blanc', name: 'Philippe Blanc', role: 'COUNSEL', specialties: ['Droit international', 'Arbitrage'], bar: 'Barreau de Paris', portrait: null },
  { slug: 'isabelle-girard', name: 'Isabelle Girard', role: 'COUNSEL', specialties: ['Droit fiscal', 'Patrimoine'], bar: 'Barreau de Paris', portrait: null },
  { slug: 'thomas-laurent', name: 'Thomas Laurent', role: 'COLLABORATEUR', specialties: ['Droit des affaires', 'Startup'], bar: 'Barreau de Paris', portrait: null },
  { slug: 'camille-chevalier', name: 'Camille Chevalier', role: 'COLLABORATRICE', specialties: ['Droit social'], bar: 'Barreau de Paris', portrait: null },
  { slug: 'nicolas-fournier', name: 'Nicolas Fournier', role: 'COLLABORATEUR', specialties: ['Contentieux', 'Droit penal'], bar: 'Barreau de Paris', portrait: null },
  { slug: 'julie-bonnet', name: 'Julie Bonnet', role: 'COLLABORATRICE', specialties: ['Droit immobilier'], bar: 'Barreau de Versailles', portrait: null },
  { slug: 'alexandre-mercier', name: 'Alexandre Mercier', role: 'COLLABORATEUR', specialties: ['Droit des affaires', 'Finance'], bar: 'Barreau de Paris', portrait: null },
  { slug: 'laura-dumas', name: 'Laura Dumas', role: 'COLLABORATRICE', specialties: ['Droit de la famille', 'Succession'], bar: 'Barreau de Paris', portrait: null },
]

// ─── Profile Data ───────────────────────────────────────────────────────
const profiles: Record<string, LawyerProfile> = {
  'pierre-dubois': {
    slug: 'pierre-dubois',
    name: 'Pierre Dubois',
    firstName: 'Pierre',
    title: 'Associe — Fondateur',
    titleDisplay: 'ASSOCIE — FONDATEUR',
    specialties: ['Droit des affaires', 'M&A', 'Private equity'],
    bar: 'Barreau de Paris',
    barYear: '1992',
    languages: 'FR · EN · DE',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'bilingue' },
      { lang: 'Allemand', level: 'courant' },
    ],
    portrait: '/portrait-dubois.jpg',
    email: 'pierre.dubois@lecrans-associes.fr',
    linkedin: 'https://linkedin.com',
    publicationsCount: 6,

    biography: [
      "Apres des etudes a la faculte de droit de Paris II Pantheon-Assas ou il obtient un DEA en droit des affaires avec les felicitations du jury, Pierre Dubois poursuit sa formation a la New York University School of Law (NYU) ou il est diplome d'un LLM en International Legal Studies. Cette formation anglo-saxonne lui confere une approche transnationale du droit des affaires qu'il met au service de ses clients tout au long de sa carriere.",
      "Pierre debute sa carriere au sein du departement fusions-acquisitions d'un cabinet anglo-saxon de premier plan, ou il passe sept annees et acquiert une solide experience des operations transfrontalieres. En 1987, il fonde LeCrans & Associes avec la conviction qu'un cabinet a taille humaine peut offrir une excellence comparable aux grandes maisons internationales, tout en preservant une relation de proximite avec ses clients. Il en assure la direction depuis plus de trente-cinq annees, ayant transforme un petit cabinet parisien en une structure de quatorze associes et quarante collaborateurs reconnue sur le marche.",
      "Specialiste reconnu du droit des affaires et des operations de fusion-acquisition, Pierre Dubois conseille des dirigeants, fonds d'investissement et grands groupes dans leurs projets strategiques les plus complexes. Il a developpe une expertise particuliere dans les LBO et le private equity, ayant accompagne plus de 150 operations au cours de sa carriere, depuis les premieres levees de fonds jusqu'aux cessions en bourse. Son portefeuille clients comprend notamment des fonds d'investissement de premier plan, des groupes industriels familiaux et des entreprises innovantes du secteur technologique.",
      "Son approche allie rigueur technique, vision strategique et disponibilite. Il privilegie une comprehension approfondie des enjeux metier de ses clients pour proposer des solutions juridiques creatives et pragmatiques. Cette philosophie lui vaut la reconnaissance de ses pairs et des directories internationaux, et lui permet de nouer des relations de confiance durables avec ses clients, certains l'accompagnant depuis la creation du cabinet.",
      "Pierre enseigne le droit des societes et le private equity en Master 2 a l'Universite Paris II Pantheon-Assas et intervient regulierement dans des conferences professionnelles (IFA, IBA). Il est membre du conseil d'administration de plusieurs fondations d'interet general et consacre une part significative de son activite au pro bono, notamment en accompagnant des associations dans leurs projets de developpement.",
    ],

    education: [
      { institution: 'Universite Paris II Pantheon-Assas', degree: 'DEA Droit des Affaires — 1987' },
      { institution: 'New York University School of Law', degree: 'LLM International Legal Studies — 1988' },
      { institution: "Institut d'Etudes Politiques de Paris (Sciences Po)", degree: 'DEA — 1985' },
    ],
    memberships: [
      'Barreau de Paris (depuis 1992)',
      'International Bar Association (IBA)',
      "Institut Francais des Administrateurs (IFA)",
      'Association Francaise des Entreprises Privees (AFEP)',
    ],
    rankings: [
      { org: 'Chambers Europe', level: 'Band 1', domain: 'Droit des Affaires', year: '2024 Edition' },
      { org: 'Legal 500', level: 'Leading Individual', domain: 'M&A', year: '2024 Edition' },
      { org: "DECIDEURS Magazine", level: 'Excellence', domain: 'Private Equity', year: '2024 Edition' },
    ],

    focusAreas: [
      { number: '01', title: 'Fusions & Acquisitions', description: "Acquisitions, cessions, LBO, due diligence juridique. Accompagnement de la structuration a la signature dans des operations de petite, moyenne et grande taille." },
      { number: '02', title: 'Private Equity', description: "Levees de fonds, structuration de fonds, pactes d'associes, sorties. Conseil aux fonds et aux entrepreneurs dans le cycle complet de l'investissement." },
      { number: '03', title: 'Droit des Societes', description: "Constitution, gouvernance, operations sur capital, conventions reglementees. Assistance aux conseils d'administration et de surveillance." },
      { number: '04', title: 'Financement', description: "Credit bancaire, obligations, financement de projet, restructuration financiere. Negociation et documentation de facilities syndiquees." },
    ],

    publications: [
      { date: 'Dec 2024', title: "Les nouvelles dispositions du code de commerce sur les avantages particuliers", excerpt: "Analyse des recentes modifications legislatives impactant les conventions reglementees et leur traitement en assemblee generale.", domain: 'Droit des societes' },
      { date: 'Oct 2024', title: "L'evolution du LBO en France : tendances 2024", excerpt: "Bilan du marche des operations de LBO en France, avec un focus sur les nouvelles structures de garantie et les evolutions de la documentation.", domain: 'Private equity' },
      { date: 'Juin 2024', title: "Due diligence fiscale dans les operations de fusion-acquisition", excerpt: "Guide pratique pour identifier et securiser les risques fiscaux dans le cadre d'une acquisition d'entreprise.", domain: 'Fiscalite' },
      { date: 'Mars 2024', title: "Le pacte Dutreil renove : quel impact sur la transmission d'entreprises ?", excerpt: "Decodage des reformes recentes et conseils pratiques pour les cedants de PME et ETI familiales.", domain: 'Droit des affaires' },
    ],

    relatedSlugs: ['thomas-laurent', 'alexandre-mercier', 'jean-moreau'],
  },

  'claire-martin': {
    slug: 'claire-martin',
    name: 'Claire Martin',
    firstName: 'Claire',
    title: 'Associee',
    titleDisplay: 'ASSOCIEE',
    specialties: ['Droit social', "Contentieux prud'homal"],
    bar: 'Barreau de Paris',
    barYear: '1998',
    languages: 'FR · EN',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'bilingue' },
    ],
    portrait: '/portrait-martin.jpg',
    email: 'claire.martin@lecrans-associes.fr',
    linkedin: 'https://linkedin.com',
    publicationsCount: 5,

    biography: [
      "Claire Martin est diplomee de l'Universite Paris X Nanterre ou elle a obtenu un DESS en droit social, mention tres bien. Elle a enrichi son parcours par un Master 2 en droit compare du travail a la London School of Economics (LSE), une experience qui lui a permis de developper une comprehension fine des systemes juridiques europeens et anglo-saxons en matiere sociale.",
      "Apres son admission au Barreau de Paris en 1998, Claire rejoint un cabinet specialise en droit social ou elle perfectionne son expertise des relations individuelles et collectives du travail. Elle integre LeCrans & Associes en 2005 comme associee et y developpe le departement droit social, devenu aujourd'hui l'un des poles d'excellence du cabinet. Elle y conseille une clientele diversifiee de grandes entreprises, ETI et groupes internationaux sur l'ensemble des questions de droit social.",
      "Claire possede une expertise reconnue en contentieux prud'homal, ou elle defend les interets des employeurs dans des litiges complexes mettant en jeu des questions sensibles de harcelement, de licenciement pour faute grave, ou de contestation de clauses de non-concurrence. Elle accompagne egalement ses clients dans les operations de restructuration, de plans de sauvegarde de l'emploi, et de negociations collectives, en veillant toujours a concilier imperatifs strategiques et respect du dialogue social.",
      "Sa approche est a la fois combative et pragmatique. Elle encourage la prevention et la mediation chaque fois que possible, mais se revele une redoutable litigeuse lorsque les interets de ses clients l'exigent. Elle accorde une importance toute particuliere a la comprehension du contexte economique et humain de chaque dossier, ce qui lui permet de proposer des solutions sur mesure adaptees a la culture de chaque entreprise.",
      "Claire enseigne le droit social a l'Universite Paris X Nanterre et anime regulierement des formations pour les Directions des Ressources Humaines. Elle est l'auteure de nombreuses publications dans la presse juridique specialisee et intervient comme conferenciere lors des grands rendez-vous du droit social. Elle est membre de l'Association des Avocats Praticiens du Droit Social (APDFS).",
    ],

    education: [
      { institution: 'Universite Paris X Nanterre', degree: "DESS Droit Social — 1997" },
      { institution: 'London School of Economics (LSE)', degree: "Master 2 Droit Compare du Travail — 1998" },
      { institution: 'Institut des Etudes Judiciaires (IEJ)', degree: 'Diplome — 1996' },
    ],
    memberships: [
      'Barreau de Paris (depuis 1998)',
      "Association des Avocats Praticiens du Droit Social (APDFS)",
      'Association Francaise du Droit du Travail et de la Securite Sociale',
    ],
    rankings: [
      { org: 'Chambers Europe', level: 'Band 2', domain: 'Droit Social', year: '2024 Edition' },
      { org: 'Legal 500', level: 'Recommended', domain: 'Contentieux Social', year: '2024 Edition' },
    ],

    focusAreas: [
      { number: '01', title: 'Relations Individuelles', description: "Contrats de travail, clauses de non-concurrence, harcelement, licenciements. Accompagnement des employeurs dans la gestion des relations individuelles." },
      { number: '02', title: 'Relations Collectives', description: "Negociations collectives, accords d'entreprise, representants du personnel, comite social et economique." },
      { number: '03', title: 'Contentieux Prudhomal', description: "Defense des employeurs devant le conseil de prud'hommes en cas de litiges relatifs au contrat de travail." },
      { number: '04', title: 'Restructurations', description: "Plans de sauvegarde de l'emploi, licenciements collectifs, cessions d'entreprise, accompagnement juridique des operations de restructuration." },
    ],

    publications: [
      { date: 'Nov 2024', title: "La reforme des accords collectifs : premier bilan", excerpt: "Analyse des impacts de la reforme sur la negociation collective dans les entreprises de plus de 50 salaries.", domain: 'Droit social' },
      { date: 'Sept 2024', title: "Teletravail et droit a la deconnexion : mise a jour", excerpt: "Point sur les obligations de l'employeur et les bonnes pratiques de mise en oeuvre du droit a la deconnexion.", domain: 'Droit social' },
      { date: 'Mai 2024', title: "Le harcelement moral au travail : nouvelles tendances jurisprudentielles", excerpt: "Revue des dernieres decisions de la Cour de cassation et conseils pratiques pour les employeurs.", domain: 'Contentieux' },
      { date: 'Fev 2024', title: "L'entretien professionnel obligatoire : guide pratique", excerpt: "Modele de mise en oeuvre et pieges a eviter dans l'organisation des entretiens professionnels.", domain: 'Droit social' },
    ],

    relatedSlugs: ['camille-chevalier', 'marie-roux', 'laura-dumas'],
  },

  'antoine-leroy': {
    slug: 'antoine-leroy',
    name: 'Antoine Leroy',
    firstName: 'Antoine',
    title: 'Associe',
    titleDisplay: 'ASSOCIE',
    specialties: ['Droit fiscal', 'Droit immobilier'],
    bar: 'Barreau de Paris',
    barYear: '2001',
    languages: 'FR · EN',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'courant' },
    ],
    portrait: '/portrait-leroy.jpg',
    email: 'antoine.leroy@lecrans-associes.fr',
    linkedin: 'https://linkedin.com',
    publicationsCount: 4,

    biography: [
      "Antoine Leroy est diplome de l'Universite Paris IX Dauphine ou il a obtenu un DESS en fiscalite avec la mention tres bien. Il a complete sa formation par le DESA (Doctorat) en droit prive et sciences criminelles, avec une specialisation en droit fiscal des affaires. Son parcours academique lui confere une expertise theorique solide qu'il a su enrichir par une pratique intensive du conseil fiscal.",
      "Admis au Barreau de Paris en 2001, Antoine debute au sein du departement fiscal d'un cabinet de renom ou il conseille des groupes internationaux sur des montages complexes de structuration et d'optimisation fiscale. Il rejoint LeCrans & Associes en 2010 comme associe, apportant avec lui une expertise pointue en fiscalite d'entreprise et en droit immobilier. Il y a developpe un pole fiscal reconnu pour son excellence technique et sa capacite a traiter des dossiers transversaux faisant intervenir le droit fiscal, le droit immobilier et le droit des societes.",
      "Antoine accompagne ses clients dans l'optimisation de leur structure fiscale, la due diligence fiscale dans les operations de fusion-acquisition, et le contentieux fiscal devant les administrations et les juridictions. Il a developpe une expertise particuliere dans la fiscalite immobiliere, conseillant des promoteurs, des investisseurs institutionnels et des familles patrimoniales dans leurs operations immobilieres les plus complexes, incluant les montages SCPI, OPCI, et les investissements locatifs structures.",
      "Sa methode repose sur l'anticipation et la prevention. Il travaille en etroite collaboration avec les directions financieres et les cabinets d'expertise-comptable de ses clients pour integrer la dimension fiscale dans la strategie globale de l'entreprise. Son approche pedagogique et sa capacite a expliquer des mecanismes complexes de maniere accessible font de lui un conseil particulierement apprecie des dirigeants et des families entrepreneurs.",
      "Antoine enseigne le droit fiscal a l'Universite Paris IX Dauphine en Master 2 et intervient regulierement dans des seminaires de formation continue pour les professions juridiques et comptables. Il est membre de l'Institut des Avocats Conseils Fiscaux (IACF) et participe activement aux travaux de la Commission Fiscalite du Barreau de Paris.",
    ],

    education: [
      { institution: 'Universite Paris IX Dauphine', degree: 'DESS Fiscalite — 2000' },
      { institution: 'Universite Paris IX Dauphine', degree: 'DESA Droit Prive — 2001' },
      { institution: 'Institut des Etudes Judiciaires (IEJ)', degree: 'Diplome — 1999' },
    ],
    memberships: [
      'Barreau de Paris (depuis 2001)',
      "Institut des Avocats Conseils Fiscaux (IACF)",
      'Association Francaise de Droit Fiscal',
      'International Fiscal Association (IFA)',
    ],
    rankings: [
      { org: 'Chambers Europe', level: 'Band 2', domain: 'Droit Fiscal', year: '2024 Edition' },
      { org: 'Legal 500', level: 'Recommended', domain: 'Fiscalite Immobiliere', year: '2024 Edition' },
    ],

    focusAreas: [
      { number: '01', title: 'Fiscalite des Entreprises', description: "Conseil en structuration fiscale, montages d'acquisition, due diligence fiscale, restructurations de groupe et traitement des pertes fiscales." },
      { number: '02', title: 'Fiscalite Immobiliere', description: "Conseil aux investisseurs immobiliers, montages SCPI/OPCI, taxation des cessions immobilieres, optimisation de la detention immobiliere." },
      { number: '03', title: 'Contentieux Fiscal', description: "Recours contentieux devant les tribunaux administratifs et judiciaires, redressements fiscaux, transactions avec l'administration." },
      { number: '04', title: 'Patrimoine', description: "Transmission du patrimoine professionnel et familial, holding familiale, ISF, optimisation successorale pour les familles entrepreneures." },
    ],

    publications: [
      { date: 'Dec 2024', title: "La reforme de la fiscalite immobiliere : impacts 2025", excerpt: "Decodage des nouvelles mesures fiscales applicables aux investissements immobiliers et aux cessions.", domain: 'Fiscalite' },
      { date: 'Oct 2024', title: "Controle fiscal : les droits du contribuable renforces", excerpt: "Analyse des evolutions jurisprudentielles en matiere de controle fiscal et de prescription.", domain: 'Contentieux fiscal' },
      { date: 'Juil 2024', title: "Structuration fiscale des acquisitions de PME", excerpt: "Guide pratique des montages d'acquisition optimises pour les repreneurs et fonds d'investissement.", domain: 'Droit fiscal' },
    ],

    relatedSlugs: ['isabelle-girard', 'jean-moreau', 'julie-bonnet'],
  },

  'sophie-petit': {
    slug: 'sophie-petit',
    name: 'Sophie Petit',
    firstName: 'Sophie',
    title: 'Associee',
    titleDisplay: 'ASSOCIEE',
    specialties: ['Droit penal des affaires', 'Contentieux'],
    bar: 'Barreau de Paris',
    barYear: '2005',
    languages: 'FR · EN · ES',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'bilingue' },
      { lang: 'Espagnol', level: 'courant' },
    ],
    portrait: '/portrait-petit.jpg',
    email: 'sophie.petit@lecrans-associes.fr',
    linkedin: 'https://linkedin.com',
    publicationsCount: 7,

    biography: [
      "Sophie Petit est diplomee de l'Universite Paris I Pantheon-Sorbonne ou elle a obtenu un DEA en droit penal et sciences criminelles. Elle a ensuite poursuivi sa formation a King's College London avec un LLM en International Criminal Law, une experience qui lui a permis d'acquerir une vision comparee du droit penal et de developper son expertise en contentieux internationaux complexes.",
      "Admise au Barreau de Paris en 2005, Sophie debute au sein de la criminal defense practice d'un cabinet anglo-saxon de renom, ou elle defend des dirigeants d'entreprise et des personnes morales dans des procedures penales sensibles. Elle rejoint LeCrans & Associes en 2013 comme associee, apportant avec elle une expertise pointue en droit penal des affaires et en contentieux complexes. Elle y a constitue et dirige le pole penal du cabinet, devenu une reference dans ce domaine.",
      "Sophie defend des dirigeants, entreprises et etablissements financiers dans des procedures penales sensibles : abus de biens sociaux, corruption, blanchiment, fraude fiscale, delits boursiers, et infractions a la legislation sur la concurrence. Elle intervient egalement dans la prevention du risque penal, en auditant les dispositifs de conformite et en formant les equipes dirigeantes. Elle a developpe une expertise particuliere dans les procedures transfrontalieres de blanchiment et de corruption, coordonnant les defenses dans plusieurs jurisdictions.",
      "Sa approche est strategique et discrete. Elle intervient en amont pour prevenir les risques et, en cas de procedure, met en oeuvre une defense rigoureuse et methodique. Sa formation comparee et son experience des systemes juridiques anglo-saxons lui confere un avantage distinct dans les dossiers internationaux. Elle accorde une importance primordiale a la preservation de la reputation et de l'interet moral de ses clients.",
      "Sophie enseigne le droit penal des affaires en Master 2 a l'Universite Paris I Pantheon-Sorbonne. Elle est l'auteure de nombreux articles sur le droit penal des affaires et intervient regulierement dans des conferences sur la compliance et la prevention du risque penal. Elle est membre de l'Association des Avocats Penalistes et du European Criminal Bar Association.",
    ],

    education: [
      { institution: "Universite Paris I Pantheon-Sorbonne", degree: 'DEA Droit Penal — 2004' },
      { institution: "King's College London", degree: "LLM International Criminal Law — 2005" },
      { institution: 'Institut des Etudes Judiciaires (IEJ)', degree: 'Diplome — 2003' },
    ],
    memberships: [
      'Barreau de Paris (depuis 2005)',
      'Association des Avocats Penalistes (AAP)',
      'European Criminal Bar Association (ECBA)',
      'International Association of Defence Counsel (IADC)',
    ],
    rankings: [
      { org: 'Chambers Europe', level: 'Band 2', domain: 'Droit Penal des Affaires', year: '2024 Edition' },
      { org: 'Legal 500', level: 'Leading Individual', domain: 'Criminal Defense', year: '2024 Edition' },
    ],

    focusAreas: [
      { number: '01', title: 'Droit Penal des Affaires', description: "Defense des dirigeants et entreprises dans des procedures pour abus de biens sociaux, corruption, blanchiment, et infractions boursieres." },
      { number: '02', title: 'Contentieux Complexes', description: "Strategies de defense dans les litiges multi-parties, coordination des procedures civiles et penales, contentieux transfrontaliers." },
      { number: '03', title: 'Compliance & Prevention', description: "Audit des programmes de conformite, formation des equipes, mise en place de dispositifs anti-corruption (Sapin II) et anti-blanchiment." },
      { number: '04', title: 'Droit Penal Fiscal', description: "Defense en cas de poursuites pour fraude fiscale, procedures de regularisation (CIF), contentieux avec l'administration fiscale." },
    ],

    publications: [
      { date: 'Nov 2024', title: "La loi Sapin II : bilan apres 8 ans de mise en oeuvre", excerpt: "Analyse critique des dispositifs anti-corruption et retour d'experience des entreprises soumises a l'obligation de compliance.", domain: 'Compliance' },
      { date: 'Sept 2024', title: "Le blanchiment de fraude fiscale : evolution de la repression", excerpt: "Point sur les evolutions legislatives et jurisprudentielles en matiere de blanchiment de fraude fiscale.", domain: 'Droit penal' },
      { date: 'Juin 2024', title: "Defense des dirigeants en cas d'abus de biens sociaux", excerpt: "Guide pratique pour les dirigeants mis en examen : droits, strategies et pieces a conviction.", domain: 'Droit penal des affaires' },
      { date: 'Avr 2024', title: "La convention judiciaire d'interet public (CJIP) : mode d'emploi", excerpt: "Analyse des mecanismes et des consequences de la CJIP pour les entreprises.", domain: 'Droit penal des affaires' },
    ],

    relatedSlugs: ['nicolas-fournier', 'philippe-blanc', 'pierre-dubois'],
  },

  'jean-moreau': {
    slug: 'jean-moreau',
    name: 'Jean Moreau',
    firstName: 'Jean',
    title: 'Associe',
    titleDisplay: 'ASSOCIE',
    specialties: ['Droit immobilier', 'Construction'],
    bar: 'Barreau de Lyon',
    barYear: '2005',
    languages: 'FR · EN',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'courant' },
    ],
    portrait: '/portrait-moreau.jpg',
    email: 'jean.moreau@lecrans-associes.fr',
    linkedin: 'https://linkedin.com',
    publicationsCount: 3,

    biography: [
      "Jean Moreau est diplome de l'Universite Jean Moulin Lyon III ou il a obtenu un DESS en droit immobilier et urbanisme. Son parcours academique, enrichi par une specialisation en droit de la construction, lui a permis de developper une expertise reconnue dans les domaines immobilier et de la construction, tant en conseil qu'en contentieux.",
      "Admis au Barreau de Lyon en 2005, Jean debute dans un cabinet lyonnais specialise en droit immobilier ou il acquiert une solide experience des operations de promotion immobiliere, de transactions et de contentieux de la construction. Il rejoint LeCrans & Associes en 2015, apportant une expertise complementaire au pole immobilier et construction du cabinet. Il y conseille des promoteurs, constructeurs, investisseurs institutionnels et maitres d'ouvrage publics.",
      "Jean intervient sur l'ensemble des operations immobilieres, depuis la structuration des montages d'acquisition jusqu'a la livraison des projets de construction. Il possede une expertise particuliere dans les contrats de construction complexe (CCMI, marches publics, contrats de partenariat), les litiges de construction (garanties decennales, responsabilite des maitres d'oeuvre), et les operations de promotion immobiliere. Il accompagne egalement ses clients dans les contentieux voisins et immobiliers.",
      "Son approche est pragmatique et orientee resultats. Il privilegie la prevention des litiges par une redaction rigoureuse des contrats et une anticipation des risques, mais se montre un redoutable litigeur lorsque les parties ne parviennent pas a s'entendre. Sa connaissance approfondie du secteur de la construction et de ses acteurs lui permet de proposer des solutions adaptees aux realites du terrain.",
      "Jean enseigne le droit de la construction a l'Universite Lyon III et intervient regulierement dans des seminaires professionnels pour la Fédération Française du Batiment (FFB) et la Chambre Nationale des Promoteurs Constructeurs (CNPC).",
    ],

    education: [
      { institution: 'Universite Lyon III', degree: 'DESS Droit Immobilier — 2004' },
      { institution: 'Universite Lyon III', degree: 'Master 2 Droit de la Construction — 2005' },
    ],
    memberships: [
      'Barreau de Lyon (depuis 2005)',
      'Association des Avocats Conseils en Droit Immobilier (ACDI)',
    ],
    rankings: [
      { org: 'Legal 500', level: 'Recommended', domain: 'Droit Immobilier', year: '2024 Edition' },
    ],

    focusAreas: [
      { number: '01', title: 'Transactions Immobilieres', description: "Vente et acquisition de biens immobiliers, due diligence immobiliere, montages de detention (SCI, OPCI, SCPI)." },
      { number: '02', title: 'Droit de la Construction', description: "Contrats de construction, marches publics, garanties decennales, responsabilite des constructeurs et maitres d'oeuvre." },
      { number: '03', title: 'Contentieux Immobilier', description: "Litiges de voisinage, troubles de jouissance, expropriation, contentieux des baux commerciaux et d'habitation." },
      { number: '04', title: 'Urbanisme & Environnement', description: "Autorisations d'urbanisme, contentieux environnemental, operations d'amenagement, contrats de partenariat public-prive." },
    ],

    publications: [
      { date: 'Oct 2024', title: 'La garantie decennale : nouvelles tendances', excerpt: "Analyse des evolutions jurisprudentielles en matiere de garantie decennale et de responsabilite des constructeurs.", domain: 'Construction' },
      { date: 'Juin 2024', title: "Baux commerciaux : les cles de la negociation", excerpt: "Guide pratique pour la negociation et la redaction des baux commerciaux.", domain: 'Immobilier' },
    ],

    relatedSlugs: ['antoine-leroy', 'julie-bonnet', 'isabelle-girard'],
  },

  'marie-roux': {
    slug: 'marie-roux',
    name: 'Marie Roux',
    firstName: 'Marie',
    title: 'Associee',
    titleDisplay: 'ASSOCIEE',
    specialties: ["Droit de la famille"],
    bar: 'Barreau de Paris',
    barYear: '2010',
    languages: 'FR · EN',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'bilingue' },
    ],
    portrait: '/portrait-roux.jpg',
    email: 'marie.roux@lecrans-associes.fr',
    linkedin: 'https://linkedin.com',
    publicationsCount: 4,

    biography: [
      "Marie Roux est diplomee de l'Universite Paris II Pantheon-Assas ou elle a obtenu un DEA en droit de la famille et des successions. Elle a ensuite complete sa formation par un Master 2 en mediation familiale, lui permettant d'aborder les litiges familiaux avec une double competence juridique et relationnelle.",
      "Admise au Barreau de Paris en 2010, Marie rejoint LeCrans & Associes en 2015 apres cinq annees de pratique dans un cabinet specialise en droit de la famille. Elle y a developpe un pole droit de la famille qui conseille des familles patrimoniales, des dirigeants d'entreprise et des particuliers dans leurs questions familiales et successorales les plus sensibles.",
      "Marie intervient sur l'ensemble des dossiers de droit de la famille : divorce et separation, garde des enfants, filiation, successions complexes, donations et partages. Elle possede une expertise particuliere dans les successions de dirigeants d'entreprise, ou les enjeux familiaux, patrimoniaux et sociaux sont intriques. Elle privilegie les solutions negociees et la mediation, tout en etant capable de mener un contentieux avec determination lorsque les interets de ses clients l'exigent.",
      "Son approche est a l'ecoute et empathique, sans jamais perdre de vue l'objectif strategique. Elle accompagne ses clients dans des moments difficiles de leur vie personnelle avec tact et professionnalisme, en veillant a preserver les liens familiaux chaque fois que possible. Sa capacite a gerer des situations emotionnellement chargees fait d'elle une conseil particulierement appreciee des familles patrimoniales.",
      "Marie enseigne le droit de la famille en Master 2 a l'Universite Paris II et anime des formations sur la mediation familiale. Elle est membre de l'Association des Avocats Praticiens du Droit de la Famille et intervient regulierement dans des conferences sur la protection du patrimoine familial.",
    ],

    education: [
      { institution: 'Universite Paris II Pantheon-Assas', degree: 'DEA Droit de la Famille — 2009' },
      { institution: 'Universite Paris II Pantheon-Assas', degree: 'Master 2 Mediation Familiale — 2010' },
    ],
    memberships: [
      'Barreau de Paris (depuis 2010)',
      'Association des Avocats Praticiens du Droit de la Famille',
      'Union Internationale des Avocats (UIA)',
    ],
    rankings: [],

    focusAreas: [
      { number: '01', title: 'Divorce & Separation', description: "Procedure de divorce par consentement mutuel ou contentieux, pension alimentaire, prestation compensatoire, garde des enfants." },
      { number: '02', title: 'Successions & Partages', description: "Gestion des successions complexes, contestations d'heritiers, partages successoraux, donations entre epoux." },
      { number: '03', title: 'Protection du Patrimoine', description: "Strategies de protection du patrimoine familial, donations, SCI familiale, regime matrimonial, contrat de mariage." },
      { number: '04', title: 'Filiation & Adoption', description: "Reconnaissance de paternite, adoption nationale et internationale, contestation de filiation." },
    ],

    publications: [
      { date: 'Nov 2024', title: "Le divorce par consentement mutuel : bilan de la reforme", excerpt: "Analyse des six ans de pratique du divorce sans juge et conseils pour les avocats.", domain: 'Droit de la famille' },
      { date: 'Juil 2024', title: "Successions internationales : guide pratique", excerpt: "Comment gerer une succession comportant des elements d'extraneite apres le reglement europeen.", domain: 'Succession' },
    ],

    relatedSlugs: ['laura-dumas', 'claire-martin', 'isabelle-girard'],
  },

  'philippe-blanc': {
    slug: 'philippe-blanc',
    name: 'Philippe Blanc',
    firstName: 'Philippe',
    title: 'Counsel',
    titleDisplay: 'COUNSEL',
    specialties: ['Droit international', 'Arbitrage'],
    bar: 'Barreau de Paris',
    barYear: '1995',
    languages: 'FR · EN · ES',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'bilingue' },
      { lang: 'Espagnol', level: 'courant' },
    ],
    portrait: null,
    email: 'philippe.blanc@lecrans-associes.fr',
    linkedin: 'https://linkedin.com',
    publicationsCount: 5,

    biography: [
      "Philippe Blanc est diplome de l'Universite Paris I Pantheon-Sorbonne avec un LLM en droit international. Il a poursuivi sa formation par un DES en droit europeen, lui conferant une expertise pointue des relations juridiques internationales et europeennes.",
      "Admis au Barreau de Paris en 1995, Philippe a consacre l'essentiel de sa carriere au droit international des affaires et a l'arbitrage international. Avant de rejoindre LeCrans & Associes en 2018 comme Counsel, il a exerce pendant quinze ans au sein d'un cabinet anglo-saxon de renom, ou il a developpe une expertise reconnue des litiges transfrontaliers complexes.",
      "Philippe represente des entreprises francaises et etrangeres dans des litiges commerciaux internationaux et des procedures d'arbitrage (CCI, CIRDI, LCIA, UNCITRAL). Il intervient egalement en conseil pour la structuration de contrats internationaux et la gestion des risques juridiques lies aux operations a l'etranger. Son expertise couvre l'ensemble des regions du monde, avec une specialisation particuliere pour l'Europe, l'Amerique latine et l'Afrique francophone.",
      "Son approche est strategique et pragmatique. Il met son experience des differentes cultures juridiques au service de ses clients pour concevoir des strategies adaptees au contexte de chaque affaire. Sa maitrise de l'anglais et de l'espagnol lui permet d'intervenir directement dans des procedures conduites dans ces langues.",
      "Philippe enseigne l'arbitrage international en Master 2 et intervient regulierement comme expert dans des conferences internationales. Il est membre de la Cour Internationale d'Arbitrage de la CCI et de plusieurs autres institutions arbitrales.",
    ],

    education: [
      { institution: 'Universite Paris I Pantheon-Sorbonne', degree: 'LLM Droit International — 1994' },
      { institution: 'Universite Paris I Pantheon-Sorbonne', degree: 'DES Droit Europeen — 1995' },
    ],
    memberships: [
      'Barreau de Paris (depuis 1995)',
      "Comite Francais de l'Arbitrage (CFA)",
      'International Council for Commercial Arbitration (ICCA)',
      'London Court of International Arbitration (LCIA)',
    ],
    rankings: [
      { org: 'Chambers Europe', level: 'Band 3', domain: 'Arbitrage International', year: '2024 Edition' },
    ],

    focusAreas: [
      { number: '01', title: 'Arbitrage International', description: "Representation dans des procedures d'arbitrage commercial international (CCI, LCIA, CIRDI, ad hoc), en tant que conseil et co-arbitre." },
      { number: '02', title: 'Contentieux Transfrontaliers', description: "Litiges commerciaux internationaux, execution de sentences etrangeres, procedures de saisie conservatoire internationale." },
      { number: '03', title: 'Droit des Investissements', description: "Protection des investissements etrangers, procedures CIRDI, litiges Etat-investisseur, negociation de traites bilateraux." },
      { number: '04', title: "Contrats Internationaux", description: "Redaction et negociation de contrats internationaux, clauses de choix de juridiction, clauses compromissoires, due diligence internationale." },
    ],

    publications: [
      { date: 'Dec 2024', title: "L'arbitrage international face aux enjeux ESG", excerpt: "Analyse de l'impact des criteres environnementaux, sociaux et de gouvernance sur les litiges commerciaux internationaux.", domain: 'Arbitrage' },
      { date: 'Sept 2024', title: "Execution des sentences arbitrales etrangeres en France", excerpt: "Guide pratique des procedures d'exequatur et des resistances opposables.", domain: 'Droit international' },
    ],

    relatedSlugs: ['pierre-dubois', 'sophie-petit', 'alexandre-mercier'],
  },
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

// ─── Fallback Profile Generator ─────────────────────────────────────────
function generateFallbackProfile(slug: string): LawyerProfile {
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const firstName = slug.split('-')[0].charAt(0).toUpperCase() + slug.split('-')[0].slice(1)
  return {
    slug,
    name,
    firstName,
    title: 'Collaborateur',
    titleDisplay: 'COLLABORATEUR',
    specialties: ['Droit des affaires'],
    bar: 'Barreau de Paris',
    barYear: '2015',
    languages: 'FR · EN',
    languagesDetail: [
      { lang: 'Francais', level: 'langue maternelle' },
      { lang: 'Anglais', level: 'courant' },
    ],
    portrait: null,
    email: `${slug.replace(/-/g, '.')}@lecrans-associes.fr`,
    linkedin: 'https://linkedin.com',
    publicationsCount: 2,
    biography: [
      `${name} est diplome de l'Universite Paris II Pantheon-Assas et admis au Barreau de Paris. Il rejoint LeCrans & Associes ou il developpe son expertise en droit des affaires et accompagne les clients du cabinet dans leurs projets juridiques.`,
      `Au sein du cabinet, ${firstName} intervient sur l'ensemble des missions de droit des affaires, depuis la redaction de contrats jusqu'au conseil en gouvernance. Il met son savoir-faire au service des entreprises de toutes tailles, avec un esprit d'analyse et un sens du service reconnu.`,
      `Son approche allie rigueur et disponibilite. Il privilegie une comprehension approfondie des besoins de ses clients pour proposer des solutions juridiques adaptees et operationnelles.`,
      `${name} participe activement a la vie du cabinet et contribue a ses publications. Il est membre de plusieurs associations professionnelles.`,
    ],
    education: [
      { institution: 'Universite Paris II Pantheon-Assas', degree: 'Master 2 Droit des Affaires' },
      { institution: 'Institut des Etudes Judiciaires (IEJ)', degree: 'Diplome' },
    ],
    memberships: [
      'Barreau de Paris',
      'Association des Jeunes Avocats',
    ],
    rankings: [],
    focusAreas: [
      { number: '01', title: 'Droit des Affaires', description: 'Conseil aux entreprises, redaction de contrats, gouvernance, operations courantes.' },
      { number: '02', title: 'Droit des Societes', description: 'Constitution de societes, operations sur capital, cessions de titres.' },
      { number: '03', title: 'Contentieux Commercial', description: 'Strategies de resolution des litiges commerciaux, mediation, representation devant les juridictions.' },
    ],
    publications: [
      { date: '2024', title: 'Article a venir', excerpt: 'Publication en cours de redaction.', domain: 'Droit des affaires' },
    ],
    relatedSlugs: ['pierre-dubois', 'thomas-laurent', 'alexandre-mercier'],
  }
}

// ─── Related Team Card ──────────────────────────────────────────────────
function RelatedCard({ member }: { member: typeof allTeamMembers[0] }) {
  return (
    <Link
      to={`/equipe/${member.slug}`}
      className="group bg-white border border-neutral-200 rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
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
        <h4 className="font-display text-lg font-medium text-neutral-900 group-hover:text-gold-600 transition-colors">
          {member.name}
        </h4>
        <p className="text-[11px] font-medium uppercase text-gold-500 mt-0.5 tracking-wide">
          {member.role}
        </p>
        <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
          {member.specialties.join(', ')}
        </p>
        <p className="text-xs text-neutral-500 mt-1">{member.bar}</p>
      </div>
    </Link>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────
export default function AvocatProfile() {
  const { slug } = useParams<{ slug: string }>()
  const profile = useMemo(() => {
    if (!slug) return null
    return profiles[slug] || generateFallbackProfile(slug)
  }, [slug])

  const relatedMembers = useMemo(() => {
    if (!profile) return []
    return profile.relatedSlugs
      .map((s) => allTeamMembers.find((m) => m.slug === s))
      .filter(Boolean) as typeof allTeamMembers
  }, [profile])

  if (!profile) {
    return (
      <div className="min-h-[100dvh] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-display-md text-neutral-900">Profil non trouve</h1>
          <Link to="/equipe" className="text-gold-500 hover:underline mt-4 inline-block">
            Retour a l&apos;equipe
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh]">
      {/* ─── Section 1: Profile Header ─────────────────────────────── */}
      <section className="bg-navy-950 pt-16 pb-16">
        <div className="container-law max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-12 items-start">
            {/* Left - Portrait */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easePremium }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl border border-gold-500/20 max-w-[400px] mx-auto md:mx-0">
                {profile.portrait ? (
                  <img
                    src={profile.portrait}
                    alt={profile.name}
                    className="w-full aspect-[4/5] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-gradient-to-br from-navy-700 to-navy-500 flex items-center justify-center">
                    <span className="font-display text-8xl text-white/40 select-none">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right - Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="pt-4"
            >
              <nav className="text-xs text-navy-400 mb-4">
                <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
                <span className="mx-2">/</span>
                <Link to="/equipe" className="hover:text-white transition-colors">L&apos;Equipe</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{profile.name}</span>
              </nav>

              <motion.h1 variants={staggerItem} className="font-display text-display-md text-white">
                {profile.name}
              </motion.h1>
              <motion.p variants={staggerItem} className="text-[13px] font-medium uppercase tracking-[0.08em] text-gold-500 mt-2">
                {profile.titleDisplay}
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-1.5 mt-3">
                {profile.specialties.map((s) => (
                  <span key={s} className="text-[11px] bg-navy-800 text-navy-300 px-2.5 py-0.5 rounded-sm border border-navy-700">
                    {s}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-6 mt-4 text-[13px] text-navy-300">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-navy-500" />
                  {profile.bar}, {profile.barYear}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe size={14} className="text-navy-500" />
                  {profile.languages}
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText size={14} className="text-navy-500" />
                  {profile.publicationsCount} publications
                </span>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 mt-6">
                <Link
                  to={`/contact?avocat=${profile.slug}`}
                  className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-400"
                >
                  CONTACTER
                  <ArrowRight size={12} />
                </Link>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-navy-600 text-navy-300 px-5 py-2.5 text-xs font-medium uppercase tracking-wide transition-all duration-200 hover:border-gold-500 hover:text-gold-400"
                >
                  <Linkedin size={14} />
                  LINKEDIN
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 text-navy-300 text-xs hover:text-gold-400 transition-colors"
                >
                  <Mail size={14} />
                  {profile.email}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Biography & Credentials ────────────────────── */}
      <section className="bg-white py-24">
        <div className="container-law max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16">
            {/* Left - Biography */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-gold-500" />
                <span className="text-overline text-gold-500">PARCOURS</span>
              </div>
              <h2 className="font-display text-[30px] text-neutral-900">Biographie</h2>
              <div className="w-12 h-0.5 bg-gold-500 mt-4 mb-8" />

              {profile.biography.map((para, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="text-base text-neutral-700 leading-relaxed mb-4"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Right - Credentials */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideInRight}
              className="lg:sticky lg:top-[120px] self-start"
            >
              <div className="bg-navy-50 rounded-lg p-7 space-y-6">
                {/* Education */}
                <div>
                  <h4 className="font-display text-lg font-medium text-neutral-900 mb-3">FORMATION</h4>
                  <ul className="space-y-2">
                    {profile.education.map((edu, i) => (
                      <li key={i}>
                        <p className="text-sm font-semibold text-neutral-800">{edu.institution}</p>
                        <p className="text-[13px] text-neutral-600">{edu.degree}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Memberships */}
                <div>
                  <h4 className="font-display text-lg font-medium text-neutral-900 mb-3">MEMBRES</h4>
                  <ul className="space-y-1">
                    {profile.memberships.map((m, i) => (
                      <li key={i} className="text-[13px] text-neutral-600">{m}</li>
                    ))}
                  </ul>
                </div>

                {/* Rankings */}
                {profile.rankings.length > 0 && (
                  <div>
                    <h4 className="font-display text-lg font-medium text-neutral-900 mb-3">CLASSEMENTS</h4>
                    <ul className="space-y-2">
                      {profile.rankings.map((r, i) => (
                        <li key={i}>
                          <p className="text-[13px] text-gold-600 font-medium">
                            {r.org} — {r.level}
                          </p>
                          <p className="text-[13px] text-neutral-600">{r.domain}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Languages */}
                <div>
                  <h4 className="font-display text-lg font-medium text-neutral-900 mb-3">LANGUES</h4>
                  <ul className="space-y-1">
                    {profile.languagesDetail.map((l, i) => (
                      <li key={i} className="text-[13px] text-neutral-600">
                        <span className="font-medium text-neutral-800">{l.lang}</span>
                        <span className="text-neutral-400 mx-2">—</span>
                        {l.level}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Areas of Focus ─────────────────────────────── */}
      <section className="bg-navy-50 py-20">
        <div className="container-law max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">DOMAINES D&apos;INTERVENTION</span>
          </div>
          <h2 className="font-display text-[30px] text-neutral-900">Expertises et missions</h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          >
            {profile.focusAreas.map((area) => (
              <motion.div
                key={area.number}
                variants={staggerItem}
                className="bg-white border border-neutral-200 rounded-md p-5 flex gap-4 transition-all duration-200 hover:border-l-[3px] hover:border-l-gold-500 hover:translate-x-1"
              >
                <span className="font-display text-2xl text-gold-500 shrink-0">{area.number}</span>
                <div>
                  <h4 className="font-display text-lg font-medium text-neutral-900">{area.title}</h4>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Publications ───────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-law max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">PUBLICATIONS</span>
          </div>
          <h2 className="font-display text-[30px] text-neutral-900">Analyses et contributions</h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="space-y-3 mt-6"
          >
            {profile.publications.map((pub, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex gap-4 bg-white border border-neutral-200 rounded-sm p-5 transition-all duration-200 hover:bg-navy-50 hover:border-l-[3px] hover:border-l-gold-500 group cursor-pointer"
              >
                <div className="shrink-0 w-16 bg-gold-100 rounded-sm flex flex-col items-center justify-center py-2">
                  <span className="text-[10px] text-gold-600 font-medium uppercase text-center leading-tight px-1">
                    {pub.date}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-lg font-medium text-neutral-900 group-hover:text-gold-600 transition-colors">
                    {pub.title}
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{pub.excerpt}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] bg-navy-100 text-navy-700 px-2 py-0.5 rounded-sm">{pub.domain}</span>
                    <span className="text-[11px] text-neutral-500">Par {profile.firstName} {profile.name.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
                <div className="shrink-0 self-center">
                  <ChevronRight size={18} className="text-navy-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6">
            <Link
              to={`/publications?auteur=${profile.slug}`}
              className="inline-flex items-center gap-1 text-sm text-gold-600 hover:underline font-medium"
            >
              VOIR TOUTES SES PUBLICATIONS
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Rankings Showcase ──────────────────────────── */}
      {profile.rankings.length > 0 && (
        <section className="bg-navy-900 py-16">
          <div className="container-law max-w-[1280px] mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-overline text-gold-500">CLASSEMENTS</span>
              <span className="w-8 h-px bg-gold-500" />
            </div>
            <h2 className="font-display text-[30px] text-white">
              Reconnu par les referents internationaux
            </h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6 mt-6"
            >
              {profile.rankings.map((r, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="w-[200px] bg-navy-800 border border-navy-700 rounded-md p-5 text-center"
                >
                  <p className="text-xs font-medium text-navy-400 uppercase tracking-wide mb-2">{r.org}</p>
                  <p className="text-base font-semibold text-gold-500">{r.level}</p>
                  <p className="text-[13px] text-navy-300 mt-1">{r.domain}</p>
                  <p className="text-[11px] text-navy-500 mt-2">{r.year}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── Section 6: Related Team ───────────────────────────────── */}
      {relatedMembers.length > 0 && (
        <section className="bg-navy-50 py-20">
          <div className="container-law max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-overline text-gold-500">EQUIPE</span>
            </div>
            <h2 className="font-display text-[30px] text-neutral-900">Collabore avec</h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
            >
              {relatedMembers.map((m) => (
                <motion.div key={m.slug} variants={staggerItem}>
                  <RelatedCard member={m} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── Section 7: Contact CTA ────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-law max-w-[600px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="font-display text-[36px] text-neutral-900">
              Contacter {profile.firstName}
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base text-neutral-600 mt-4">
              Pour toute question relative a {profile.specialties[0].toLowerCase()}, {profile.firstName} est a votre ecoute sous le secret professionnel.
            </motion.p>

            <motion.div variants={staggerItem} className="mt-8">
              <Link
                to={`/contact?avocat=${profile.slug}`}
                className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-400"
              >
                ENVOYER UN MESSAGE
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-sm text-neutral-600">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-gold-600 transition-colors">
                <Mail size={14} />
                {profile.email}
              </a>
              <a href="tel:0142680000" className="flex items-center gap-1.5 hover:text-gold-600 transition-colors">
                <Phone size={14} />
                01 42 68 00 00
              </a>
            </motion.div>

            <motion.p variants={staggerItem} className="text-xs text-neutral-500 mt-4">
              Le secret professionnel garantit la confidentialite absolue de votre demande.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
