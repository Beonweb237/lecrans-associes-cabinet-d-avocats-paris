import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  Users,
  Calculator,
  Home,
  Gavel,
  Globe,
  Heart,
  Scale,
  ArrowRight,
  Building2,
  Landmark,
  Cpu,
  Pill,
  Factory,
  Building,
} from 'lucide-react'
/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Category = 'All' | 'B2B' | 'B2C' | 'Contentieux'

interface ExpertiseItem {
  slug: string
  title: string
  description: string
  category: Category[]
  icon: React.ReactNode
  tint: string
  points: string[]
  meta: { partners: number; publications: number; cases: number }
  services: { name: string; desc: string }[]
  faqs: { q: string; a: string }[]
  longDescription: string[]
  team: { name: string; title: string; slug: string; portrait: string; bio: string; specialties: string[] }[]
  publications: { title: string; excerpt: string; author: string; date: string }[]
  results: { domain: string; desc: string; year: string }[]
  stats: { label: string; value: number; suffix: string }[]
}

export const expertisesData: ExpertiseItem[] = [
  {
    slug: 'droit-des-affaires',
    title: 'Droit des Affaires',
    description:
      'Conseil et contentieux en droit des societes, fusions et acquisitions, private equity, financement et restructuration. Nous accompagnons dirigeants, fonds d\'investissement et grands groupes dans leurs operations strategiques les plus complexes, de la structuration a la negociation.',
    category: ['B2B'],
    icon: <Briefcase size={40} />,
    tint: '#1A2B47',
    points: [
      'Operations de M&A et LBO',
      'Droit des societes et gouvernance',
      'Private equity et financement',
    ],
    meta: { partners: 4, publications: 12, cases: 150 },
    services: [
      { name: 'Conseil en droit des societes', desc: 'Constitution, gouvernance, operations sur capital' },
      { name: 'Fusions et acquisitions', desc: 'Acquisitions, cessions, LBO, due diligence' },
      { name: 'Private equity', desc: 'Levees de fonds, pactes d\'associes, structuration' },
      { name: 'Financement', desc: 'Credit bancaire, obligations, financement de projet' },
      { name: 'Restructuration', desc: 'Preventive et judiciaire, sauvegarde, redressement' },
      { name: 'Compliance', desc: 'Programmes anticorruption, conformite reglementaire' },
    ],
    faqs: [
      { q: 'Quelle est la duree moyenne d\'une operation de fusion-acquisition ?', a: 'La duree d\'une operation M&A varie considerablement selon la complexite et la taille de la transaction. Une operation simple peut se conclure en 6 a 8 semaines, tandis qu\'une LBO complexe peut necessiter 4 a 6 mois. Notre equipe travaille en etroite collaboration avec vos conseils financiers pour optimiser le calendrier.' },
      { q: 'Comment sont facturees les prestations en droit des societes ?', a: 'Nous proposons differents modes de facturation adaptes a vos besoins : honoraires au temps passe, forfait pour les missions recurrentes, ou honoraires de resultat dans la limite autorisee par le reglement interieur du barreau. Chaque mission fait l\'objet d une convention d\'honoraires detaillee.' },
      { q: 'Le cabinet intervient-il en due diligence ?', a: 'Oui, nous realisons des due diligence juridiques completes (societaire, contractuelle, immobiliere, sociale, fiscale, IP/IT) dans le cadre d\'operations d\'acquisition. Notre equipe pluridisciplinaire permet de couvrir l\'integralite des volets juridiques en interne.' },
      { q: 'Quelle est votre experience dans le private equity ?', a: 'Nous accompagnons regulierement des fonds d\'investissement francais et internationaux dans leurs operations de LBO, growth capital et venture capital. Notre expertise couvre la structuration, la negociation des pactes d\'associes et l\'accompagnement jusqu\'a la sortie.' },
      { q: 'Le cabinet assiste-t-il les startups et scale-ups ?', a: 'Absolument. Nous avons developpe une offre dediee aux entreprises en croissance, couvrant les levees de fonds, la structuration du capital, la propriete intellectuelle et les relations contractuelles avec les partenaires.' },
    ],
    longDescription: [
      'Le droit des affaires constitue le coeur de l\'activite du cabinet LeCrans & Associes. Depuis plus de trente ans, nous accompagnons nos clients — grands groupes, entreprises familiales, fonds d\'investissement et dirigeants — dans leurs operations strategiques les plus complexes. Notre equipe de quatre associes et seize collaborateurs allie expertise technique pointue et comprehension profonde des enjeux economiques et sectoriels de chaque dossier.',
      'Notre pratique couvre l\'integralite du conseil en droit des societes et des operations de fusion-acquisition. Nous intervenons sur les operations de LBO, les cessions et acquisitions de participations majoritaires ou minoritaires, les apports partiels d\'actif, les fusions et les scissions. Chaque operation beneficie d\'une equipe dediee composee d\'avocats experimentes et de specialistes des disciplines connexes — droit fiscal, droit social, droit immobilier — pour garantir une approche transversale et coherente.',
      'Nous attachons une importance particuliere a la relation de confiance avec nos clients. Chaque dossier fait l\'objet d\'un suivi personnalise et d\'une communication reguliere. Notre methodologie repose sur une analyse rigoureuse des risques juridiques et une anticipation des difficultes potentielles, permettant a nos clients de prendre des decisions eclairees dans des delais optimises.',
      'Reconnus par les classements internationaux Chambers Europe et Legal 500, nos equipes sont regulierement sollicitees pour les operations les plus sophistiquees du marche. Notre differenciation repose sur notre capacite a conjuguer excellence technique, reactivite et comprehension des imperatifs business de nos clients.',
    ],
    team: [
      { name: 'Pierre Dubois', title: 'Associe', slug: 'pierre-dubois', portrait: '/portrait-dubois.jpg', bio: 'Plus de 25 ans d\'experience en droit des affaires et M&A. Ancien secretaire de la Conference des Avocats du Barreau de Paris.', specialties: ['Fusions & Acquisitions', 'Private Equity', 'Droit des Societes'] },
      { name: 'Sophie Martin', title: 'Associee', slug: 'sophie-martin', portrait: '/portrait-martin.jpg', bio: 'Expertise en financement et restructuration. Ancienne vice-presidente de l\'Association Francaise des Praticiens du Droit des Affaires.', specialties: ['Financement', 'Restructuration', 'Contrats'] },
      { name: 'Thomas Leroy', title: 'Of Counsel', slug: 'thomas-leroy', portrait: '/portrait-leroy.jpg', bio: 'Specialiste en compliance et conformite reglementaire. Formation BIG4.', specialties: ['Compliance', 'Gouvernance', 'FCPA'] },
    ],
    publications: [
      { title: 'La reforme du droit des suretes : analyse des impacts pour les entreprises', excerpt: 'Le nouveau cadre legislatif modifie profondement les mecanismes de garantie disponibles pour les operations de financement.', author: 'Pierre Dubois', date: '15 mars 2025' },
      { title: 'LBO et management packages : tendances 2025', excerpt: 'Les dernieres evolutions du marche du capital-investissement et les nouvelles structures de management packages.', author: 'Sophie Martin', date: '28 fevrier 2025' },
      { title: 'Due diligence en pratique : checklist actualisee pour les acquereurs', excerpt: 'Un guide pratique pour mener une due diligence juridique efficace dans le cadre d\'operations d\'acquisition.', author: 'Pierre Dubois', date: '10 fevrier 2025' },
    ],
    results: [
      { domain: 'Private Equity', desc: 'Accompagnement d\'un fonds d\'investissement dans le cadre d\'un LBO sur une cible industrielle de 250M€', year: '2024' },
      { domain: 'Restructuration', desc: 'Mise en oeuvre d\'une procedure de sauvegarde acceleree pour un groupe de distribution', year: '2024' },
      { domain: 'M&A', desc: 'Vente d\'une filiale internationale a un groupe americain pour un montant de 180M€', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 150, suffix: '+' },
      { label: 'taux de succes', value: 94, suffix: '%' },
      { label: 'annees d\'experience', value: 25, suffix: ' ans' },
    ],
  },
  {
    slug: 'droit-social',
    title: 'Droit Social',
    description:
      'Expertise complete en relations individuelles et collectives, contentieux prud\'homal, regimes de retraite et epargne salariale. Notre equipe conseille entreprises et salaries avec la meme rigueur et la meme exigence.',
    category: ['B2B', 'B2C'],
    icon: <Users size={40} />,
    tint: '#8B1A1A',
    points: [
      'Relations collectives et accords',
      'Contentieux prud\'homal',
      'Epargne salariale et retraite',
    ],
    meta: { partners: 3, publications: 8, cases: 200 },
    services: [
      { name: 'Relations individuelles', desc: 'Contrats, ruptures, harcelement, discrimination' },
      { name: 'Relations collectives', desc: 'Accords, representants du personnel, greves' },
      { name: 'Contentieux prud\'homal', desc: 'Defense employeurs et salaries, contentieux collectifs' },
      { name: 'Epargne salariale', desc: 'Interessement, participation, PERCO, actionnariat' },
      { name: 'Retraite et prevoyance', desc: 'Regimes complementaires, conventions, contentieux' },
      { name: 'Protection sociale', desc: 'Accidents du travail, maladies professionnelles, RSI' },
    ],
    faqs: [
      { q: 'Quel est le delai pour saisir le Conseil de prud\'hommes ?', a: 'Le delai pour saisir le Conseil de prud\'hommes est de deux ans a compter du fait generateur du litige. Ce delai est porte a cinq ans pour les litiges relatifs a la formation professionnelle continue. Une expertise juridique precoce permet d\'evaluer les chances de succes et d\'elaborer la strategie proces la plus adaptee.' },
      { q: 'Le cabinet represente-t-il aussi bien les employeurs que les salaries ?', a: 'Oui, notre equipe conseille et defend aussi bien les employeurs que les salaries. Cette double competence nous permet d\'avoir une vision complete des enjeux et d\'adopter la strategie la plus pertinente selon le profil de notre client. Chaque dossier beneficie d\'une analyse objective et d\'une recommandation transparente.' },
      { q: 'Comment se deroule une procedure de licenciement pour motif economique ?', a: 'La procedure de licenciement pour motif economique comprend plusieurs etapes obligatoires : notification de l\'entretien prealable, entretien, notification du licenciement, et eventuellement homologation aupres de la DIRECCTE. Notre equipe accompagne les employeurs a chaque etape pour securiser la procedure et les salaries pour faire valoir leurs droits.' },
      { q: 'Quelles sont les obligations en matiere d\'epargne salariale ?', a: 'Les obligations varient selon l\'effectif de l\'entreprise. A partir de 50 salaries, l\'interessement est obligatoire si un accord d\'entreprise est signe. A partir de 250 salaries, un accord de participation est requis. Nous assistons nos clients dans la negociation, la mise en place et le suivi de ces dispositifs.' },
      { q: 'Le cabinet intervient-il dans les audits sociaux ?', a: 'Oui, nous realisons des audits sociaux complets portant sur le respect des obligations legales et conventionnelles, la classification des salaries, les temps de travail, et les regimes de remuneration. Ces audits peuvent etre realises dans le cadre d\'une due diligence ou d\'une demarche preventive.' },
    ],
    longDescription: [
      'Le droit social est une discipline en perpetuelle evolution, au carrefour des enjeux economiques, humains et reglementaires. Le cabinet LeCrans & Associes a developpe une expertise de reference en la matiere, conseillant aussi bien les entreprises que les salaries dans leurs relations individuelles et collectives. Notre approche privilegie la prevention et la recherche de solutions negociees, tout en assurant une defense rigoureuse lorsque le contentieux ne peut etre evite.',
      'Notre equipe de trois associes et douze collaborateurs couvre l\'integralite du droit du travail et de la securite sociale. Nous accompagnons nos clients dans la gestion des relations individuelles (contrats, ruptures, harcelement, discrimination), des relations collectives (negociations, accords, representants du personnel), et dans la mise en place des dispositifs d\'epargne salariale et de retraite.',
      'En contentieux, nous defendons regulierement nos clients devant le Conseil de prud\'hommes, la Cour d\'appel et la Cour de cassation. Notre experience nous permet d\'elaborer des strategies proces adaptees a chaque situation, avec un souci constant d\'efficacite et de pragmatisme. Nous attachons une importance particuliere a la preparation minutieuse des dossiers et a la qualite des plaidoiries.',
      'Reconnus par les classements internationaux pour notre expertise en droit du travail, nous sommes particulierement apprecies pour notre capacite a anticiper les risques sociaux et a proposer des solutions creatives aux situations les plus delicates. Notre engagement : fournir a chaque client, entreprise ou salarie, un conseil d\'excellence, personnalise et operationnel.',
    ],
    team: [
      { name: 'Claire Petit', title: 'Associee', slug: 'claire-petit', portrait: '/portrait-petit.jpg', bio: 'Specialiste en relations collectives et contentieux social. Experte en negociations syndicales.', specialties: ['Relations Collectives', 'Contentieux', 'Epargne Salariale'] },
      { name: 'Marc Moreau', title: 'Associe', slug: 'marc-moreau', portrait: '/portrait-moreau.jpg', bio: 'Expert en contentieux prud\'homal et defense des employeurs. Plus de 15 ans de pratique.', specialties: ['Contentieux Prud\'homal', 'Licenciements', 'Audit Social'] },
      { name: 'Emilie Roux', title: 'Collaboratrice Senior', slug: 'emilie-roux', portrait: '/portrait-roux.jpg', bio: 'Experte en protection sociale et regimes de retraite.', specialties: ['Protection Sociale', 'Retraite', 'Accidents du Travail'] },
    ],
    publications: [
      { title: 'Reforme de l\'assurance chomage : ce qui change pour les entreprises', excerpt: 'Les nouvelles regles d\'indemnisation et leurs impacts sur la gestion des ressources humaines.', author: 'Claire Petit', date: '5 mars 2025' },
      { title: 'Le teletravail en 2025 : cadre legal et bonnes pratiques', excerpt: 'Un etat des lieux complet des obligations de l\'employeur et des droits des salaries en matiere de teletravail.', author: 'Marc Moreau', date: '20 fevrier 2025' },
      { title: 'Epargne salariale : les tendances du marche', excerpt: 'Analyse des dernieres evolutions reglementaires et des pratiques en matiere d\'interessement et de participation.', author: 'Claire Petit', date: '5 fevrier 2025' },
    ],
    results: [
      { domain: 'Contentieux', desc: 'Defense victorieuse d\'un employeur dans un contentieux collectif impliquant 45 salaries', year: '2024' },
      { domain: 'Relations Collectives', desc: 'Negociation et signature d\'un accord de performance collective dans un groupe industriel de 3 000 salaries', year: '2023' },
      { domain: 'Audit Social', desc: 'Audit social complet et mise en conformite d\'un groupe de distribution de 120 etablissements', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 200, suffix: '+' },
      { label: 'taux de succes', value: 91, suffix: '%' },
      { label: 'annees d\'experience', value: 18, suffix: ' ans' },
    ],
  },
  {
    slug: 'droit-fiscal',
    title: 'Droit Fiscal',
    description:
      'Conseil fiscal, contentieux fiscal, fiscalite immobiliere et internationale. Nous aidons nos clients a anticiper, structurer et defendre leurs interets dans un environnement fiscal en constante evolution.',
    category: ['B2B'],
    icon: <Calculator size={40} />,
    tint: '#1A5C3A',
    points: [
      'Fiscalite des entreprises et M&A',
      'Contentieux fiscal et penal fiscal',
      'Fiscalite immobiliere et internationale',
    ],
    meta: { partners: 3, publications: 10, cases: 120 },
    services: [
      { name: 'Conseil fiscal', desc: 'Optimisation, structuration, integration fiscale' },
      { name: 'Contentieux fiscal', desc: 'Redressements, amendes, transactions' },
      { name: 'Fiscalite M&A', desc: 'Due diligence fiscale, structuration, clauses' },
      { name: 'Fiscalite immobiliere', desc: 'ISF, plus-value, location, deficit foncier' },
      { name: 'Fiscalite internationale', desc: 'Conventions fiscales, prix de transfert' },
      { name: 'Penal fiscal', desc: 'Blanchiment, fraude fiscale, defense penale' },
    ],
    faqs: [
      { q: 'Quand consulter un avocat fiscaliste ?', a: 'Il est recommande de consulter un avocat fiscaliste des la conception de votre projet, qu\'il s\'agisse d\'une operation immobiliere, d\'une transmission d\'entreprise ou d\'un contentieux avec l\'administration. Une consultation precoce permet d\'optimiser la structure et d\'eviter les erreurs couteuses.' },
      { q: 'Comment contester un redressement fiscal ?', a: 'Le contentieux fiscal comporte plusieurs degres : reclamation gracieuse au chef de service, recours devant le tribunal administratif ou judiciaire selon la nature de l\'impot, et eventuellement appel. Notre equipe vous accompagne a chaque etape pour construire la strategie de defense la plus adaptee.' },
      { q: 'Le cabinet intervient-il en fiscalite internationale ?', a: 'Oui, nous conseillons de nombreux groupes internationaux en matiere de conventions fiscales, de prix de transfert et de structuration de filiales etrangeres. Notre reseau de correspondants a l\'etranger nous permet d\'assurer une coordination optimale des dossiers multijuridictionnels.' },
      { q: 'Quelle est la difference entre avocat fiscaliste et expert-comptable ?', a: 'L\'expert-comptable gere la comptabilite, la fiscalite courante et les declarations. L\'avocat fiscaliste intervient sur les questions complexes de structuration, le contentieux, la fiscalite internationale et la defense penale. Les deux professions sont complementaires.' },
      { q: 'Le cabinet propose-t-il des audits fiscaux ?', a: 'Oui, nous realisons des audits fiscaux complets pour identifier les risques et les opportunites d\'optimisation. Ces audits peuvent etre realises dans le cadre d\'une due diligence ou d\'une demarche preventive de mise en conformite.' },
    ],
    longDescription: [
      'La fiscalite est au coeur de chaque decision economique, qu\'il s\'agisse d\'une operation de croissance, d\'une transmission ou d\'un investissement personnel. Le cabinet LeCrans & Associes a constitue une equipe de reference en droit fiscal, capable d\'apporter a ses clients des solutions claires, innovantes et parfaitement adaptees a leur situation.',
      'Notre pratique fiscale couvre l\'ensemble des besoins des entreprises et des dirigeants : conseil fiscal courant et de haut niveau, fiscalite des operations de restructuration et de transmission, fiscalite immobiliere, fiscalite internationale et contentieux fiscal. Nous intervenons egalement en droit penal fiscal, domaine hautement specialise ou notre expertise est reconnue.',
      'Dans un environnement legislatif et reglementaire en perpetuelle evolution, nous privilegions une approche proactive. Nos clients beneficient d\'une veille fiscale personnalisee et d\'alertes anticipees sur les evolutions susceptibles d\'impacter leur situation. Nous travaillons en etroite collaboration avec les experts-comptables et les conseillers financiers de nos clients pour garantir une coherence globale de la strategie.',
      'Notre equipe fiscale, composee de trois associes et dix collaborateurs, est regulierement sollicitee pour les dossiers les plus complexes. Notre engagement : transformer la complexite fiscale en opportunites pour nos clients, tout en assurant une defense vigoureuse en cas de contentieux avec l\'administration.',
    ],
    team: [
      { name: 'Sophie Martin', title: 'Associee', slug: 'sophie-martin', portrait: '/portrait-martin.jpg', bio: 'Experte en fiscalite des affaires et contentieux fiscal. Ancienne magistrat a la Cour des comptes.', specialties: ['Fiscalite Entreprises', 'Contentieux', 'M&A'] },
      { name: 'Thomas Leroy', title: 'Of Counsel', slug: 'thomas-leroy', portrait: '/portrait-leroy.jpg', bio: 'Specialiste en fiscalite internationale et prix de transfert.', specialties: ['Fiscalite Internationale', 'Prix de Transfert', 'Structuration'] },
    ],
    publications: [
      { title: 'Fiscalite des crypto-actifs : le cadre 2025', excerpt: 'Les nouvelles obligations declaratives et le regime de taxation applicable aux particuliers et aux entreprises.', author: 'Thomas Leroy', date: '12 mars 2025' },
      { title: 'Prix de transfert : les attentes des administrations', excerpt: 'Comment preparer sa documentation et anticiper les controles.', author: 'Thomas Leroy', date: '25 fevrier 2025' },
    ],
    results: [
      { domain: 'Contentieux Fiscal', desc: 'Annulation d\'un redressement de 4,2M€ au profit d\'un groupe industriel', year: '2024' },
      { domain: 'Fiscalite M&A', desc: 'Structuration fiscale optimale d\'une operation de fusion dans le secteur bancaire', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 120, suffix: '+' },
      { label: 'taux de succes', value: 89, suffix: '%' },
      { label: 'annees d\'experience', value: 20, suffix: ' ans' },
    ],
  },
  {
    slug: 'droit-immobilier',
    title: 'Droit Immobilier',
    description:
      'Transactions, promotion immobiliere, construction, urbanisme et bail commercial. Notre maitrise de toute la chaine immobiliere nous permet d\'accompagner promoteurs, investisseurs et utilisateurs.',
    category: ['B2B', 'B2C'],
    icon: <Home size={40} />,
    tint: '#B8860B',
    points: [
      'Transactions et promotion immobiliere',
      'Construction et urbanisme',
      'Baux commerciaux et contentieux',
    ],
    meta: { partners: 2, publications: 6, cases: 90 },
    services: [
      { name: 'Transactions', desc: 'Vente, acquisition, promesse, compromis' },
      { name: 'Promotion immobiliere', desc: 'Vente en l\'etat futur d\'achevement, CCMI' },
      { name: 'Construction', desc: 'Contrats de construction, sous-traitance, GMI' },
      { name: 'Urbanisme', desc: 'Permis, declarations prealables, contentieux' },
      { name: 'Baux commerciaux', desc: 'Renouvellement, conge, indemnite, revision' },
      { name: 'Copropriete', desc: 'Assemblee, syndic, travaux, contentieux' },
    ],
    faqs: [
      { q: 'Quels sont les delais pour agir en cas de vice cache ?', a: 'L\'acheteur dispose d\'un delai de deux ans a compter de la decouverte du vice pour agir contre le vendeur. Le delai de prescription est de cinq ans a compter de la vente pour les biens immobiliers. Une expertise technique est souvent necessaire pour caracteriser le vice et en evaluer l\'etendue.' },
      { q: 'Comment se calcule l\'indemnite d\'eviction en bail commercial ?', a: 'L\'indemnite d\'eviction comprend l\'indemnite pour le fonds de commerce, le droit au renouvellement, et les perturbations de clientele. Son evaluation repose sur une expertise judiciaire ou amiable. Notre equipe vous accompagne pour negocier ou obtenir une indemnite equitable.' },
      { q: 'Le cabinet accompagne-t-il les operations de promotion immobiliere ?', a: 'Oui, nous assistons les promoteurs immobiliers dans la structuration de leurs operations, la redaction des contrats de vente en l\'etat futur d\'achevement, la gestion des relations avec les acquereurs et le traitement des contentieux eventuels.' },
      { q: 'Quelle est la procedure pour obtenir un permis de construire ?', a: 'Le permis de construire est delivre par le maire de la commune d\'implantation du projet. Le delai d\'instruction est de deux mois (trois mois en cas de desaccord de la commission d\'accessibilite). Notre equipe vous accompagne dans le montage du dossier et le suivi de l\'instruction.' },
      { q: 'Comment gerer un litige de copropriete ?', a: 'Les litiges de copropriete peuvent etre portes devant le tribunal judiciaire ou resolus par mediation. Notre equipe intervient dans les contentieux relatifs aux charges, aux travaux, aux troubles de voisinage et aux dysfonctionnements de l\'assemblee generale.' },
    ],
    longDescription: [
      'Le droit immobilier est un domaine transversal qui touche aussi bien les professionnels de la construction et de l\'amenagement que les particuliers dans leurs projets personnels. Le cabinet LeCrans & Associes a developpe une expertise reconnue dans l\'ensemble des disciplines immobilieres, du droit de l\'urbanisme aux baux commerciaux, en passant par la promotion immobiliere et la copropriete.',
      'Nous accompagnons promoteurs, investisseurs, constructeurs, bailleurs et preneurs dans leurs operations immobilieres les plus complexes. Notre pratique couvre les transactions immobilieres (acquisitions et cessions), la promotion immobiliere (vente en l\'etat futur d\'achevement, contrats de construction), le droit de la construction (contrats d\'entreprise, GMI, responsabilite decennale), l\'urbanisme et les baux commerciaux.',
      'Notre equipe de deux associes et huit collaborateurs combine expertise juridique et connaissance approfondie des pratiques du marche immobilier. Nous travaillons en etroite collaboration avec les notaires, les experts-comptables, les geometres et les autres professionnels de l\'immobilier pour offrir a nos clients un service complet et integre.',
      'Dans un secteur ou les enjeux financiers sont souvent considerables, nous attachons une importance particuliere a l\'anticipation des risques et a la securisation juridique des operations. Notre differenciation repose sur notre capacite a allier rigueur technique, reactivite et comprehension des imperatifs commerciaux de chaque projet.',
    ],
    team: [
      { name: 'Pierre Dubois', title: 'Associe', slug: 'pierre-dubois', portrait: '/portrait-dubois.jpg', bio: 'Expert en transactions immobilieres et baux commerciaux.', specialties: ['Transactions', 'Baux Commerciaux', 'Promotion'] },
      { name: 'Marc Moreau', title: 'Associe', slug: 'marc-moreau', portrait: '/portrait-moreau.jpg', bio: 'Specialiste en droit de la construction et urbanisme.', specialties: ['Construction', 'Urbanisme', 'Copropriete'] },
    ],
    publications: [
      { title: 'La responsabilite decennale : jurisprudence recente', excerpt: 'Les dernieres decisions de la Cour de cassation en matiere de responsabilite des constructeurs.', author: 'Marc Moreau', date: '8 mars 2025' },
    ],
    results: [
      { domain: 'Transaction', desc: 'Accompagnement d\'un investisseur dans l\'acquisition d\'un portefeuille de bureaux de 85M€', year: '2024' },
      { domain: 'Construction', desc: 'Victoire dans un contentieux de responsabilite decennale sur un complexe hotelier', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 90, suffix: '+' },
      { label: 'taux de succes', value: 92, suffix: '%' },
      { label: 'annees d\'experience', value: 15, suffix: ' ans' },
    ],
  },
  {
    slug: 'droit-penal-affaires',
    title: 'Droit Penal des Affaires',
    description:
      'Defense des dirigeants, contentieux en matiere de blanchiment, sanction financiere et compliance. Nous protegeons l\'integrite et la reputation de nos clients dans des contextes judiciaires sensibles.',
    category: ['B2B'],
    icon: <Gavel size={40} />,
    tint: '#5C1A1A',
    points: [
      'Defense des dirigeants et entreprises',
      'Blanchiment et sanction financiere',
      'Compliance et programmes anticorruption',
    ],
    meta: { partners: 2, publications: 7, cases: 80 },
    services: [
      { name: 'Defense des dirigeants', desc: 'Abus de biens sociaux, banqueroute, favoritisme' },
      { name: 'Blanchiment', desc: 'Mise en oeuvre, declaration, defense' },
      { name: 'Sanctions financieres', desc: 'AMF, ACPR, defense devant les sanctions' },
      { name: 'Compliance', desc: 'Programmes anticorruption, cartographie des risques' },
      { name: 'Infractions economiques', desc: 'Escroquerie, abus de confiance, contrefacon' },
      { name: 'Contentieux penal', desc: 'Strategie de defense, comparution, appel' },
    ],
    faqs: [
      { q: 'Quand un dirigeant peut-il etre poursuivi penalement ?', a: 'Un dirigeant peut etre poursuivi penalement pour des infractions commises dans l\'exercice de ses fonctions (abus de biens sociaux, banqueroute, delit de favoritisme) ou pour des infractions commises a titre personnel. La frontiere entre responsabilite penale et civile est souvent tenue ; une expertise juridique precoce est essentielle.' },
      { q: 'Le cabinet intervient-il en matiere de blanchiment ?', a: 'Oui, nous assistons nos clients dans la mise en conformite de leurs obligations LCB-FT, la preparation des declarations de soupcon aupres de TRACFIN, et la defense en cas de poursuites. Notre equipe comprend des avocats specialises en droit penal et en regulation financiere.' },
      { q: 'Qu\'est-ce qu\'un programme anticorruption ?', a: 'Un programme anticorruption comprend la cartographie des risques, un code de conduite, un dispositif d\'alerte interne, une formation des collaborateurs et un controle comptable. La loi Sapin II rend ces mesures obligatoires pour certaines entreprises. Nous assistons nos clients dans la mise en place et l\'evaluation de ces programmes.' },
      { q: 'Comment se deroule une procedure devant l\'AMF ?', a: 'La procedure devant l\'AMF comporte une phase d\'enquete, une phase d\'instruction par la Commission des sanctions, et eventuellement une phase de jugement. Notre equipe defend les professionnels et les personnes physiques a chaque etape de la procedure.' },
      { q: 'Le cabinet assure-t-il la defense en cas de comparution immediate ?', a: 'Oui, notre equipe assure une permanence pour les situations d\'urgence penale, y compris les comparutions immediates et les gardes a vue. Nous sommes disponibles 24h/24 pour nos clients en cas d\'urgence.' },
    ],
    longDescription: [
      'Le droit penal des affaires est une discipline hautement specialisee qui protege les dirigeants et les entreprises contre les risques penaux lies a l\'activite economique. Le cabinet LeCrans & Associes a developpe une expertise de premier plan dans ce domaine, combinant maitrise du droit penal, connaissance approfondie du droit des affaires et comprehension des enjeux reputationsls.',
      'Notre equipe defend les dirigeants et les entreprises dans les procedures penales les plus complexes : abus de biens sociaux, banqueroute, blanchiment, infractions boursieres, pratiques commerciales trompeuses, et infractions environnementales. Nous intervenons egalement en amont pour mettre en place des programmes de compliance anticorruption et antifraude.',
      'Dans un contexte de renforcement constant de la repression penale en matiere economique et financiere, nous attachons une importance capitale a la prevention. Nos clients beneficient d\'audits de conformite, de formations et d\'accompagnements personalises pour securiser leurs pratiques et minimiser les risques.',
      'Notre equipe de deux associes et six collaborateurs intervient devant l\'ensemble des juridictions penales, y compris en comparution immediate et en detention. Notre engagement : defendre avec determination l\'honneur, la liberte et les interets patrimoniaux de nos clients dans les moments les plus critiques.',
    ],
    team: [
      { name: 'Pierre Dubois', title: 'Associe', slug: 'pierre-dubois', portrait: '/portrait-dubois.jpg', bio: 'Specialiste en defense penale des dirigeants et contentieux AMF.', specialties: ['Defense Dirigeants', 'Sanctions Financieres', 'Compliance'] },
      { name: 'Marc Moreau', title: 'Associe', slug: 'marc-moreau', portrait: '/portrait-moreau.jpg', bio: 'Expert en droit penal economique et blanchiment.', specialties: ['Blanchiment', 'Infractions Economiques', 'Programmes Anticorruption'] },
    ],
    publications: [
      { title: 'La compliance anticorruption apres la loi Sapin II', excerpt: 'Mise a jour des obligations et des bonnes pratiques pour les entreprises assujetties.', author: 'Marc Moreau', date: '1 mars 2025' },
    ],
    results: [
      { domain: 'Defense Penale', desc: 'Acquittement d\'un dirigeant poursuivi pour abus de biens sociaux', year: '2024' },
      { domain: 'Blanchiment', desc: 'Classement sans suite dans une procedure de blanchiment complexe', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 80, suffix: '+' },
      { label: 'taux de succes', value: 87, suffix: '%' },
      { label: 'annees d\'experience', value: 12, suffix: ' ans' },
    ],
  },
  {
    slug: 'droit-international',
    title: 'Droit International',
    description:
      'Arbitrage international, investissements etrangers, contentieux transfrontaliers. Notre reseau de correspondants a l\'etranger nous permet de couvrir les principales juridictions.',
    category: ['B2B'],
    icon: <Globe size={40} />,
    tint: '#1A3A5C',
    points: [
      'Arbitrage international CCI, LCIA, ICSID',
      'Investissements etrangers et due diligence',
      'Contentieux transfrontaliers',
    ],
    meta: { partners: 2, publications: 9, cases: 60 },
    services: [
      { name: 'Arbitrage international', desc: 'Procedure, representation, sentence, execution' },
      { name: 'Investissements etrangers', desc: 'Due diligence, structuration, autorisation' },
      { name: 'Contentieux transfrontaliers', desc: 'Competence, droit applicable, execution' },
      { name: 'Contrats internationaux', desc: 'Negociation, clauses, incoterms, garanties' },
      { name: 'Sanctions internationales', desc: 'Conformite, licences, impact commercial' },
      { name: 'Droit europeen', desc: 'Liberte de circulation, concurrence, marches publics' },
    ],
    faqs: [
      { q: 'Quelle est la duree d\'une procedure d\'arbitrage international ?', a: 'La duree d\'une procedure d\'arbitrage international varie selon la complexite du dossier et le reglement d\'arbitrage applicable. En moyenne, une procedure d\'arbitrage CCI dure entre 12 et 18 mois. Notre equipe optimise chaque etape pour reduire les delais tout en preservant la qualite de la defense.' },
      { q: 'Le cabinet collabore-t-il avec des correspondants etrangers ?', a: 'Oui, nous entretenons un reseau de correspondants de premier plan dans les principales places financieres (Londres, New York, Hong Kong, Singapour, Dubai). Cette collaboration nous permet d\'assurer une coordination optimale des dossiers multijuridictionnels et de proposer a nos clients une couverture mondiale.' },
      { q: 'Comment sont gerees les questions de competence juridictionnelle ?', a: 'Les questions de competence juridictionnelle sont traitees selon les regles du droit international prive. Nous analysons les clauses de competence, les conventions applicables et les particularites de chaque ordre juridique pour determiner la strategie la plus favorable a nos clients.' },
      { q: 'Le cabinet intervient-il en matiere de sanctions internationales ?', a: 'Oui, nous conseillons les entreprises sur la conformite aux sanctions internationales (americaines, europeennes, onusiennes) et assistons nos clients dans la preparation des demandes de licences et l\'evaluation de l\'impact commercial des mesures restrictives.' },
      { q: 'Quels sont les avantages de l\'arbitrage par rapport au contentieux etatique ?', a: 'L\'arbitrage offre plusieurs avantages : confidentialite, rapidite, choix des arbitres, neutralite du lieu et de la langue de la procedure, execution facilitee par la Convention de New York. Notre equipe vous conseille sur la strategie la plus adaptee a votre situation.' },
    ],
    longDescription: [
      'Dans un monde de plus en plus globalise, les operations internationales sont devenues incontournables pour de nombreuses entreprises. Le cabinet LeCrans & Associes a developpe une expertise pointue en droit international, permettant a ses clients de naviguer avec serenite dans les environnements juridiques les plus complexes.',
      'Notre pratique internationale couvre l\'arbitrage commercial international (CCI, LCIA, ICSID), les investissements etrangers, les contentieux transfrontaliers et les contrats internationaux. Nous assistons egalement nos clients en matiere de conformite aux sanctions internationales et de droit europeen.',
      'Notre reseau de correspondants de premier plan, etabli dans les principales places financieres mondiales, nous permet d\'assurer une coordination optimale des dossiers multijuridictionnels. Quelle que soit la complexite du dossier, nous mettons en oeuvre une equipe dediee combinant expertise juridique et connaissance des specificites locales.',
      'Notre equipe de deux associes et cinq collaborateurs intervient regulierement dans des procedures d\'arbitrage de grande complexite et des contentieux internationaux a forts enjeux. Notre engagement : fournir a nos clients une representation de classe mondiale, avec la reactivite et la proximite d\'un cabinet parisien.',
    ],
    team: [
      { name: 'Sophie Martin', title: 'Associee', slug: 'sophie-martin', portrait: '/portrait-martin.jpg', bio: 'Experte en arbitrage international et contentieux transfrontaliers.', specialties: ['Arbitrage', 'Contentieux Transfrontaliers', 'Droit Europeen'] },
      { name: 'Thomas Leroy', title: 'Of Counsel', slug: 'thomas-leroy', portrait: '/portrait-leroy.jpg', bio: 'Specialiste en investissements etrangers et sanctions internationales.', specialties: ['Investissements Etrangers', 'Sanctions', 'Contrats Internationaux'] },
    ],
    publications: [
      { title: 'Arbitrage et climat : les nouveaux enjeux', excerpt: 'L\'adaptation de l\'arbitrage international aux litiges lies au changement climatique.', author: 'Sophie Martin', date: '18 mars 2025' },
    ],
    results: [
      { domain: 'Arbitrage', desc: 'Obtention d\'une sentence arbitrale favorable de 45M$ dans un differend commercial international', year: '2024' },
      { domain: 'Investissement', desc: 'Accompagnement d\'un groupe asiatique dans son implantation en France (250M€)', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 60, suffix: '+' },
      { label: 'taux de succes', value: 90, suffix: '%' },
      { label: 'annees d\'experience', value: 14, suffix: ' ans' },
    ],
  },
  {
    slug: 'droit-famille',
    title: 'Droit de la Famille',
    description:
      'Divorce, succession, autorite parentale, patrimoine familial. Une approche humaine et rigoureuse pour accompagner nos clients dans les moments decisifs de leur vie personnelle.',
    category: ['B2C'],
    icon: <Heart size={40} />,
    tint: '#C4785A',
    points: [
      'Divorce et separation',
      'Succession et liberalites',
      'Autorite parentale et pension',
    ],
    meta: { partners: 2, publications: 5, cases: 180 },
    services: [
      { name: 'Divorce', desc: 'Par consentement mutuel, faute, alteration, acceptation' },
      { name: 'Succession', desc: 'Inventaire, partage, donation, testament' },
      { name: 'Autorite parentale', desc: 'Garde, droit de visite, pension alimentaire' },
      { name: 'Regime matrimonial', desc: 'Separation, communaute, contrat, modification' },
      { name: 'Pension alimentaire', desc: 'Fixation, revision, recouvrement' },
      { name: 'Protection juridique', desc: 'Tutelle, curatelle, sauvegarde de justice' },
    ],
    faqs: [
      { q: 'Quelle est la duree d\'une procedure de divorce par consentement mutuel ?', a: 'Depuis la reforme de 2017, le divorce par consentement mutuel ne necessite plus de passage devant le juge. La procedure dure en moyenne 2 a 4 mois, incluant la redaction de la convention, la signature chez le notaire ou l\'avocat, et l\'enregistrement au greffe. Notre equipe vous accompagne pour negocier et rediger une convention protectrice de vos interets.' },
      { q: 'Comment sont calculees les pensions alimentaires ?', a: 'La pension alimentaire est calculee selon les besoins de l\'enfant et les ressources des parents. Le juge peut se referer aux barres publiees par le ministere de la Justice. Notre equipe vous assiste pour negocier ou faire fixer une pension equitable, et peut demander sa revision en cas de changement de circumstances.' },
      { q: 'Le cabinet intervient-il en matiere de succession internationale ?', a: 'Oui, nous assistons nos clients dans les successions presentant un element d\'extraneite (biens a l\'etranger, defunt de nationalite etrangere). Le Reglement europeen "Bruxelles IV" permet de choisir le droit applicable. Notre equipe vous conseille pour optimiser la strategie successorale.' },
      { q: 'Quel est le delai pour contester un testament ?', a: 'L\'action en nullite d\'un testament doit etre introduite dans un delai de 5 ans a compter de l\'ouverture de la succession pour les testaments authentiques, et de 2 ans pour les testaments olographes. Une expertise juridique precoce est recommandee pour evaluer les chances de succes.' },
      { q: 'Comment se deroule une procedure de tutelle ?', a: 'La procedure de tutelle commence par une demande adressee au juge des tutelles, suivie d\'une enquete sociale et d\'une expertise medicale. Le juge statue ensuite sur la mesure de protection adaptee (sauvegarde de justice, curatelle, tutelle). Notre equipe accompagne les familles tout au long de cette procedure delicate.' },
    ],
    longDescription: [
      'Le droit de la famille touche aux moments les plus intimes et les plus decisifs de la vie personnelle. Le cabinet LeCrans & Associes aborde chaque dossier familial avec une exigence de rigueur juridique et une sensibilite humaine exceptionnelle. Notre objectif : accompagner nos clients avec dignite et determination dans les moments les plus difficiles de leur vie.',
      'Notre pratique couvre l\'integralite du droit de la famille : divorce (par consentement mutuel, pour faute, pour alteration definitive du lien conjugal), succession (inventaire, partage, contestation de testament), autorite parentale (garde, droit de visite et hebergement, pension alimentaire), regimes matrimoniaux et protection juridique des majeurs.',
      'Nous privilegions les solutions negociees qui preservent les relations familiales et limitent le cout emotionnel et financier des procedures. Cependant, lorsqu\'un accord ne peut etre trouve, nous defendons les interets de nos clients avec determination devant l\'ensemble des juridictions competentes.',
      'Notre equipe de deux associes et sept collaborateurs est particulierement reconnue pour son approche a la fois humaine et strategique. Nous comprenons que chaque situation familiale est unique et merite une attention personnalisee. Notre engagement : vous ecouter, vous conseiller et vous defendre avec devouement et discretion.',
    ],
    team: [
      { name: 'Claire Petit', title: 'Associee', slug: 'claire-petit', portrait: '/portrait-petit.jpg', bio: 'Experte en droit de la famille et successions. Approche humaine et rigoureuse.', specialties: ['Divorce', 'Succession', 'Autorite Parentale'] },
      { name: 'Emilie Roux', title: 'Collaboratrice Senior', slug: 'emilie-roux', portrait: '/portrait-roux.jpg', bio: 'Specialiste en protection juridique des majeurs et regimes matrimoniaux.', specialties: ['Protection Juridique', 'Regimes Matrimoniaux', 'Pensions'] },
    ],
    publications: [
      { title: 'Le divorce par consentement mutuel : bilan apres 8 ans', excerpt: 'Un bilan de la reforme et des tendances actuelles en matiere de divorce sans juge.', author: 'Claire Petit', date: '22 fevrier 2025' },
    ],
    results: [
      { domain: 'Succession', desc: 'Succes dans un contentieux successoriel complexe impliquant des biens immobiliers en France et en Espagne', year: '2024' },
      { domain: 'Divorce', desc: 'Negociation favorable d\'une convention de divorce par consentement mutuel avec protection du patrimoine familial', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 180, suffix: '+' },
      { label: 'taux de succes', value: 93, suffix: '%' },
      { label: 'annees d\'experience', value: 16, suffix: ' ans' },
    ],
  },
  {
    slug: 'contentieux',
    title: 'Contentieux',
    description:
      'Strategies proces, mediations, arbitrages et execution des jugements. Une force de frappe juridictionnelle reconnue devant l\'ensemble des ordres de juridiction.',
    category: ['Contentieux'],
    icon: <Scale size={40} />,
    tint: '#2A3F5F',
    points: [
      'Contentieux commercial et civil',
      'Mediation et arbitrage',
      'Execution des jugements',
    ],
    meta: { partners: 3, publications: 11, cases: 250 },
    services: [
      { name: 'Contentieux commercial', desc: 'Contrats, concurrence deloyale, rupture' },
      { name: 'Contentieux civil', desc: 'Responsabilite, voisinage, immobilier' },
      { name: 'Mediation', desc: 'Mise en oeuvre, accompagnement, redaction' },
      { name: 'Arbitrage', desc: 'Clause, procedure, representation, sentence' },
      { name: 'Execution', desc: 'Saisie, inscription, opposition, voie d\'execution' },
      { name: 'Appel et cassation', desc: 'Pourvois, procedures devant les cours superieures' },
    ],
    faqs: [
      { q: 'Quel est le delai moyen d\'une procedure devant le tribunal judiciaire ?', a: 'Le delai moyen d\'une procedure devant le tribunal judiciaire en premiere instance est d\'environ 12 a 18 mois en procedure ordinaire et 4 a 6 mois en procedure de refere. Ces delais peuvent varier selon la juridiction et la complexite du dossier. Notre equipe optimise chaque etape pour reduire les delais.' },
      { q: 'Le cabinet propose-t-il la mediation comme alternative au proces ?', a: 'Oui, nous encourageons activement la mediation comme mode alternatif de resolution des conflits. La mediation offre l\'avantage d\'etre plus rapide, moins couteuse et plus preserve les relations entre les parties. Notre equipe accompagne les parties tout au long du processus de mediation.' },
      { q: 'Comment se deroule une procedure d\'arbitrage ?', a: 'Une procedure d\'arbitrage commence par la designation des arbitres, suivie d\'une phase procedurale (memoires, echanges de documents, audiences), et aboutit a la rendue de la sentence arbitrale. La sentence est definitive et opposable aux parties, avec des possibilites de recours limitees.' },
      { q: 'Quels sont les modes d\'execution d\'un jugement ?', a: 'Les modes d\'execution comprennent la saisie attribution, la saisie immobiliere, la saisie vente, l\'inscription d\'hypotheque judiciaire et l\'astreinte. Notre equipe vous conseille sur le mode d\'execution le plus adapte a votre situation et le plus efficace.' },
      { q: 'Le cabinet intervient-il en cassation ?', a: 'Oui, nous assistons nos clients dans les procedures d\'appel et de pourvoi en cassation. Ces procedures requierent une expertise technique particuliere en raison de la specificite des moyens de droit invoques. Notre equipe comprend des avocats au Conseil habilites a plaider devant la Cour de cassation et le Conseil d\'Etat.' },
    ],
    longDescription: [
      'Le contentieux est l\'epreuve finale qui met a l\'epreuve la qualite du conseil juridique. Le cabinet LeCrans & Associes s\'illustre par sa force de frappe juridictionnelle reconnue devant l\'ensemble des ordres de juridiction, des tribunaux judiciaires a la Cour de cassation, en passant par les juridictions administratives et commerciales.',
      'Notre equipe de contentieux, composee de trois associes et quatorze collaborateurs, intervient dans les contentieux commerciaux, civils, sociaux et administratifs les plus complexes. Nous defendons aussi bien les demandeurs que les defendeurs, avec la meme determination et la meme exigence de qualite.',
      'Nous privilegions une approche strategique du contentieux. Avant d\'engager une procedure, nous analysons les chances de succes, les couts, les delais et les risques reputationsls. Nous recherchons systematiquement une solution negociee lorsque celle-ci est dans l\'interet de notre client. Lorsque le contentieux est inevitable, nous le menons avec la plus grande rigueur.',
      'Reconnus par les classements internationaux pour notre excellence contentieuse, nous sommes particulierement apprecies pour notre capacite a mener des dossiers complexes, multijuridictionnels et a hauts enjeux. Notre engagement : obtenir pour nos clients le meilleur resultat possible, dans les meilleurs delais.',
    ],
    team: [
      { name: 'Pierre Dubois', title: 'Associe', slug: 'pierre-dubois', portrait: '/portrait-dubois.jpg', bio: 'Strategiste contentieux de reference. Plus de 25 ans de plaidoirie.', specialties: ['Contentieux Commercial', 'Arbitrage', 'Cassation'] },
      { name: 'Marc Moreau', title: 'Associe', slug: 'marc-moreau', portrait: '/portrait-moreau.jpg', bio: 'Expert en contentieux civil et execution des jugements.', specialties: ['Contentieux Civil', 'Execution', 'Mediation'] },
      { name: 'Sophie Martin', title: 'Associee', slug: 'sophie-martin', portrait: '/portrait-martin.jpg', bio: 'Specialiste des contentieux complexes et multijuridictionnels.', specialties: ['Contentieux Complexes', 'Appel', 'Refere'] },
    ],
    publications: [
      { title: 'La reforme de la justice civile : premier bilan', excerpt: 'Les impacts de la reforme sur les delais et les modes de traitement des contentieux.', author: 'Pierre Dubois', date: '3 mars 2025' },
      { title: 'Mediation et resolution amiable des litiges', excerpt: 'L\'essor de la mediation comme alternative efficace au proces classique.', author: 'Marc Moreau', date: '15 fevrier 2025' },
    ],
    results: [
      { domain: 'Contentieux Commercial', desc: 'Victoire dans un contentieux complexe opposant deux groupes industriels ( valeur : 28M€ )', year: '2024' },
      { domain: 'Arbitrage', desc: 'Sentence arbitrale favorable dans un differend relatif a un contrat de distribution internationale', year: '2023' },
      { domain: 'Execution', desc: 'Recouvrement integral d\'une creance de 3,5M€ par saisie attribution', year: '2023' },
    ],
    stats: [
      { label: 'affaires traitees', value: 250, suffix: '+' },
      { label: 'taux de succes', value: 92, suffix: '%' },
      { label: 'annees d\'experience', value: 22, suffix: ' ans' },
    ],
  },
]

const sectors = [
  { title: 'Immobilier', desc: 'Transactions, promotion, construction, baux commerciaux', icon: <Building2 size={36} /> },
  { title: 'Finance & Private Equity', desc: 'LBO, credit, gestion d\'actifs, fintech', icon: <Landmark size={36} /> },
  { title: 'Tech & Innovation', desc: 'Startup, propriete intellectuelle, data, IA', icon: <Cpu size={36} /> },
  { title: 'Sante & Pharma', desc: 'Reglementaire, M&A, contentieux produit', icon: <Pill size={36} /> },
  { title: 'Industrie', desc: 'Droit des contrats, contentieux fournisseurs, RSE', icon: <Factory size={36} /> },
  { title: 'Fonction Publique', desc: 'Marches publics, contentieux administratif, urbanisme', icon: <Building size={36} /> },
]

const filters: { label: string; value: Category }[] = [
  { label: 'TOUT', value: 'All' },
  { label: 'DROIT DES AFFAIRES', value: 'B2B' },
  { label: 'DROIT DES PARTICULIERS', value: 'B2C' },
  { label: 'CONTENTIEUX', value: 'Contentieux' },
]

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: easePremium },
  }),
}

const heroOverline = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6, ease: easePremium } },
}

const heroHeading = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.7, ease: easePremium } },
}

const heroSub = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6, ease: easePremium } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePremium } },
}

/* ------------------------------------------------------------------ */
/*  EXPERTISES HUB PAGE                                                */
/* ------------------------------------------------------------------ */

export default function Expertises() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  const [scrolled, setScrolled] = useState(false)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filtered =
    activeFilter === 'All'
      ? expertisesData
      : expertisesData.filter((e) => e.category.includes(activeFilter))

  return (
    <div className="min-h-[100dvh]">
      {/* ======== SECTION 1: HERO ======== */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: 'clamp(400px, 50vh, 600px)',
          backgroundImage:
            'linear-gradient(to bottom, rgba(10,22,40,0.9), rgba(10,22,40,0.6)), url(/hero-expertises.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-center max-w-[800px] px-6 py-24">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs text-navy-400">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li className="text-navy-300">Expertises</li>
            </ol>
          </nav>

          <motion.p
            className="text-overline text-gold-500 mb-4"
            style={{ letterSpacing: '0.15em', fontSize: '12px' }}
            initial="hidden"
            animate="visible"
            variants={heroOverline}
          >
            NOS DOMAINES D'EXPERTISE
          </motion.p>

          <motion.h1
            className="font-display text-display-md text-white"
            initial="hidden"
            animate="visible"
            variants={heroHeading}
          >
            Une expertise pointue dans huit domaines du droit
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-navy-300 max-w-[640px] mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={heroSub}
          >
            De la strategie d&apos;entreprise a la defense des particuliers, nos equipes mobilisent des competences reconnues par les classements internationaux.
          </motion.p>
        </div>
      </section>

      {/* ======== SECTION 2: FILTER BAR ======== */}
      <div
        ref={stickyRef}
        className={`sticky top-20 z-[90] bg-white border-b border-neutral-200 transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="container-law py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`relative px-5 py-2.5 text-xs font-medium uppercase tracking-[0.06em] rounded-sm transition-all duration-200 ${
                  activeFilter === f.value
                    ? 'bg-gold-100 text-navy-900'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {f.label}
                {activeFilter === f.value && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======== SECTION 3: EXPERTISE GRID ======== */}
      <section className="bg-white py-24">
        <div className="container-law">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((exp) => (
                <motion.div
                  key={exp.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                  variants={fadeUp}
                  custom={filtered.indexOf(exp)}
                  className="group bg-white border border-neutral-200 rounded-lg overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-400"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Image area with tint */}
                  <div
                    className="h-[200px] w-full relative overflow-hidden"
                    style={{ backgroundColor: exp.tint + '0D' }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full opacity-[0.03]"
                      viewBox="0 0 400 200"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <pattern id={`pattern-${exp.slug}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={exp.tint} strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="400" height="200" fill={`url(#pattern-${exp.slug})`} />
                    </svg>
                  </div>

                  {/* Content area */}
                  <div className="p-7 border-l-[3px] border-transparent group-hover:border-gold-500 transition-colors duration-300">
                    {/* Icon + Category */}
                    <div className="flex items-center justify-between">
                      <span className="text-gold-500">{exp.icon}</span>
                      <div className="flex gap-1">
                        {exp.category.map((cat) => (
                          <span
                            key={cat}
                            className="text-[10px] uppercase tracking-wider bg-gold-100 text-gold-600 px-2.5 py-1 rounded-sm font-medium"
                          >
                            {cat === 'Contentieux' ? 'CONTENTIEUX' : cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-display font-medium text-2xl text-neutral-900 mt-4">
                      {exp.title}
                    </h3>

                    <p className="mt-3 text-base text-neutral-600 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {exp.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm text-neutral-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/expertises/${exp.slug}`}
                      className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium uppercase tracking-wider text-gold-500 group/link"
                    >
                      EN SAVOIR PLUS
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ======== SECTION 4: SECTORS ======== */}
      <section className="bg-navy-50 py-20">
        <div className="container-law">
          {/* Section Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easePremium }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-overline text-gold-500">SECTEURS D&apos;INTERVENTION</span>
              <span className="w-8 h-px bg-gold-500" />
            </div>
            <h2 className="font-display text-display-lg text-neutral-900">Des expertises sectorielles</h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
              Notre connaissance approfondie de certains secteurs d&apos;activite renforce la pertinence de nos conseils.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {sectors.map((s) => (
              <motion.div
                key={s.title}
                variants={staggerChild}
                className="flex items-start gap-4 bg-white border border-neutral-200 rounded-lg p-6 hover:bg-navy-50 hover:translate-x-1 border-l-[3px] border-l-transparent hover:border-l-gold-500 transition-all duration-200 cursor-pointer"
              >
                <span className="text-gold-500 shrink-0 mt-0.5">{s.icon}</span>
                <div>
                  <h4 className="font-display font-medium text-lg text-neutral-900">{s.title}</h4>
                  <p className="mt-1 text-sm text-neutral-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:underline"
            >
              CONTACTEZ-NOUS POUR UN SECTEUR SPECIFIQUE
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======== JSON-LD SCHEMA ======== */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://lecrans-associes.fr/#/' },
            { '@type': 'ListItem', position: 2, name: 'Expertises', item: 'https://lecrans-associes.fr/#/expertises' },
          ],
        })}
      </script>
    </div>
  )
}
