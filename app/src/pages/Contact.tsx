import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Accessibility,
  ChevronRight,
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

/* ─── Case type options ─── */
const urgencyOptions = [
  'Garde a vue / Convocation',
  'Assignation en justice',
  'Ordonnance de protection',
  'Licenciement immediat',
  'Saisie immobiliere',
  'Autre urgence',
]

const domainOptions = [
  'Droit des Affaires',
  'Droit Social',
  'Droit Fiscal',
  'Droit Immobilier',
  'Droit Penal des Affaires',
  'Droit International',
  'Droit de la Famille',
  'Contentieux',
  'Autre / Je ne sais pas',
]

const callbackOptions = [
  'Des que possible',
  'Dans l\'heure',
  'Aujourd\'hui',
  'Demain',
]

const hearAboutOptions = [
  'Recommandation',
  'Moteur de recherche',
  'Classement (Chambers, Legal 500)',
  'Reseaux sociaux',
  'Article / Publication',
  'Autre',
]

/* ─── Form Field Components ─── */
function InputField({
  label,
  required,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string
  required?: boolean
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: boolean
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-neutral-800 mb-1.5">
        {label}
        {required && <span className="text-gold-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm border rounded-sm transition-all duration-200 outline-none ${
          error
            ? 'border-[#8B1A1A] focus:border-[#8B1A1A] focus:ring-2 focus:ring-red-200'
            : 'border-neutral-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200'
        } bg-white`}
      />
    </div>
  )
}

function SelectField({
  label,
  required,
  options,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string
  required?: boolean
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: boolean
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-neutral-800 mb-1.5">
        {label}
        {required && <span className="text-gold-500 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2.5 text-sm border rounded-sm transition-all duration-200 outline-none bg-white ${
          error
            ? 'border-[#8B1A1A] focus:border-[#8B1A1A] focus:ring-2 focus:ring-red-200'
            : 'border-neutral-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200'
        }`}
      >
        <option value="">{placeholder || 'Selectionner...'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

function TextareaField({
  label,
  required,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
}: {
  label: string
  required?: boolean
  placeholder?: string
  value: string
  onChange: (v: string) => void
  rows?: number
  error?: boolean
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-neutral-800 mb-1.5">
        {label}
        {required && <span className="text-gold-500 ml-0.5">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2.5 text-sm border rounded-sm transition-all duration-200 outline-none resize-vertical ${
          error
            ? 'border-[#8B1A1A] focus:border-[#8B1A1A] focus:ring-2 focus:ring-red-200'
            : 'border-neutral-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200'
        } bg-white`}
      />
    </div>
  )
}

function GDPRCheckbox({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={`w-4 h-4 border rounded-sm transition-all duration-200 ${
            checked
              ? 'bg-gold-500 border-gold-500'
              : 'border-neutral-300 bg-white group-hover:border-neutral-400'
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-xs text-neutral-600 leading-relaxed">
        J&apos;accepte que mes donnees personnelles soient traitees par LeCrans &amp; Associes dans
        le cadre de ma demande. J&apos;ai pris connaissance de la{' '}
        <Link to="/" className="text-gold-600 hover:text-gold-500 underline">
          politique de confidentialite
        </Link>
        .
      </span>
    </label>
  )
}

/* ─── Section 1: Hero ─── */
function HeroSection() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-navy-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-contact.jpg)' }}
      />
      <div className="absolute inset-0 bg-[var(--overlay-dark)]" />

      <div className="relative z-10 container-law text-center py-28">
        <nav className="mb-6">
          <span className="text-navy-400 text-sm">
            <Link to="/" className="hover:text-gold-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-navy-300">Contact</span>
          </span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: easePremium }}
          className="text-overline text-gold-500 mb-4"
        >
          CONTACT
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: easePremium }}
          className="font-display text-display-md text-white max-w-[800px] mx-auto"
        >
          Prenons contact
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easePremium }}
          className="mt-6 text-lg text-navy-300 max-w-[640px] mx-auto"
        >
          Quelle que soit votre situation, notre equipe est a votre ecoute sous le secret
          professionnel. Choisissez le formulaire adapte a votre besoin.
        </motion.p>
      </div>
    </section>
  )
}

/* ─── Section 2: Dual Form ─── */
function FormSection() {
  const [activeTab, setActiveTab] = useState<'urgent' | 'planned'>('planned')
  const [submitted, setSubmitted] = useState(false)

  // Urgent form state
  const [uPrenom, setUPrenom] = useState('')
  const [uNom, setUNom] = useState('')
  const [uEmail, setUEmail] = useState('')
  const [uPhone, setUPhone] = useState('')
  const [uUrgency, setUUrgency] = useState('')
  const [uMessage, setUMessage] = useState('')
  const [uCallback, setUCallback] = useState('')
  const [uGdpr, setUGdpr] = useState(false)
  const [uErrors, setUErrors] = useState<Record<string, boolean>>({})

  // Planned form state
  const [pPrenom, setPPrenom] = useState('')
  const [pNom, setPNom] = useState('')
  const [pEmail, setPEmail] = useState('')
  const [pPhone, setPPhone] = useState('')
  const [pCompany, setPCompany] = useState('')
  const [pClientType, setPClientType] = useState('')
  const [pDomain, setPDomain] = useState('')
  const [pSubject, setPSubject] = useState('')
  const [pMessage, setPMessage] = useState('')
  const [pHearAbout, setPHearAbout] = useState('')
  const [pGdpr, setPGdpr] = useState(false)
  const [pErrors, setPErrors] = useState<Record<string, boolean>>({})

  // Pre-fill from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const domain = params.get('domain')
    const avocat = params.get('avocat')
    const sujet = params.get('sujet')
    if (domain) setPDomain(domain)
    if (avocat) {
      // Map avocat slug to display name
      const avocatNames: Record<string, string> = {
        dubois: 'Pierre Dubois',
        martin: 'Claire Martin',
        leroy: 'Marc Leroy',
        petit: 'Sophie Petit',
        moreau: 'Jean Moreau',
        roux: 'Anne Roux',
      }
      // Just store as a string reference
      void avocat
      void avocatNames
    }
    if (sujet === 'recrutement') {
      setActiveTab('planned')
      setPSubject('Candidature / Recrutement')
    }
  }, [])

  const validateUrgent = () => {
    const errors: Record<string, boolean> = {}
    if (!uPrenom.trim()) errors.prenom = true
    if (!uNom.trim()) errors.nom = true
    if (!uEmail.trim()) errors.email = true
    if (!uPhone.trim()) errors.phone = true
    if (!uUrgency) errors.urgency = true
    if (!uMessage.trim()) errors.message = true
    if (!uGdpr) errors.gdpr = true
    setUErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePlanned = () => {
    const errors: Record<string, boolean> = {}
    if (!pPrenom.trim()) errors.prenom = true
    if (!pNom.trim()) errors.nom = true
    if (!pEmail.trim()) errors.email = true
    if (!pPhone.trim()) errors.phone = true
    if (!pDomain) errors.domain = true
    if (!pSubject.trim()) errors.subject = true
    if (!pMessage.trim()) errors.message = true
    if (!pGdpr) errors.gdpr = true
    setPErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleUrgentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateUrgent()) setSubmitted(true)
  }

  const handlePlannedSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePlanned()) setSubmitted(true)
  }

  return (
    <section className="bg-white py-24">
      <div className="container-law max-w-[1100px] mx-auto">
        {/* Tab Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Urgent tab */}
          <button
            onClick={() => { setActiveTab('urgent'); setSubmitted(false) }}
            className={`flex-1 flex items-start gap-4 p-5 border rounded-md text-left transition-all duration-200 cursor-pointer ${
              activeTab === 'urgent'
                ? 'bg-[#FEF2F2] border-l-[3px] border-l-[#8B1A1A] border-t-transparent border-r-transparent border-b-transparent shadow-md'
                : 'bg-white border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <AlertTriangle
              size={24}
              className={activeTab === 'urgent' ? 'text-[#8B1A1A]' : 'text-neutral-400'}
              style={{ marginTop: '2px' }}
            />
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                activeTab === 'urgent' ? 'text-[#8B1A1A]' : 'text-neutral-800'
              }`}>
                CAS D&apos;URGENCE
              </h3>
              <p className="text-sm text-neutral-600 mt-1">
                Garde a vue, convocation, assignation, ordonnance de protection, licenciement
                immediat...
              </p>
            </div>
          </button>

          {/* Planned tab */}
          <button
            onClick={() => { setActiveTab('planned'); setSubmitted(false) }}
            className={`flex-1 flex items-start gap-4 p-5 border rounded-md text-left transition-all duration-200 cursor-pointer ${
              activeTab === 'planned'
                ? 'bg-gold-50 border-l-[3px] border-l-gold-500 border-t-transparent border-r-transparent border-b-transparent shadow-md'
                : 'bg-white border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <Calendar
              size={24}
              className={activeTab === 'planned' ? 'text-gold-500' : 'text-neutral-400'}
              style={{ marginTop: '2px' }}
            />
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                activeTab === 'planned' ? 'text-gold-600' : 'text-neutral-800'
              }`}>
                CONSULTATION PREVUE
              </h3>
              <p className="text-sm text-neutral-600 mt-1">
                Conseil strategique, audit juridique, due diligence, projet immobilier...
              </p>
            </div>
          </button>
        </div>

        {/* Success state */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: easePremium }}
              className="bg-white border border-neutral-200 rounded-lg p-12 text-center"
            >
              <CheckCircle size={48} className="text-[#1A5C3A] mx-auto mb-4" />
              <h3 className="font-display text-xl text-neutral-900">Votre demande a bien ete transmise</h3>
              <p className="mt-2 text-neutral-600">
                Notre equipe vous contactera dans les plus brefs delais.
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                En cas d&apos;urgence, contactez-nous directement au{' '}
                <a href="tel:+33142680000" className="text-gold-600 hover:text-gold-500 font-medium">
                  01 42 68 00 00
                </a>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-gold-600 hover:text-gold-500 underline"
              >
                Envoyer une nouvelle demande
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: easePremium }}
              className="bg-white border border-neutral-200 rounded-lg p-8"
            >
              {activeTab === 'urgent' ? (
                <form onSubmit={handleUrgentSubmit} className="space-y-4">
                  {/* Alert banner */}
                  <div className="bg-[#FEF2F2] border-l-4 border-[#8B1A1A] rounded-sm p-3 px-4">
                    <p className="text-sm font-medium text-[#8B1A1A]">
                      En cas d&apos;urgence extreme, contactez-nous directement au{' '}
                      <a href="tel:+33142680000" className="underline hover:no-underline">
                        01 42 68 00 00
                      </a>{' '}
                      (24h/24).
                    </p>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField
                      label="Prenom"
                      required
                      value={uPrenom}
                      onChange={setUPrenom}
                      error={uErrors.prenom}
                    />
                    <InputField
                      label="Nom"
                      required
                      value={uNom}
                      onChange={setUNom}
                      error={uErrors.nom}
                    />
                  </div>

                  <InputField
                    label="Email"
                    required
                    type="email"
                    placeholder="votre@email.fr"
                    value={uEmail}
                    onChange={setUEmail}
                    error={uErrors.email}
                  />

                  <InputField
                    label="Telephone"
                    required
                    type="tel"
                    placeholder="01 23 45 67 89"
                    value={uPhone}
                    onChange={setUPhone}
                    error={uErrors.phone}
                  />

                  <SelectField
                    label="Nature de l'urgence"
                    required
                    options={urgencyOptions}
                    value={uUrgency}
                    onChange={setUUrgency}
                    error={uErrors.urgency}
                  />

                  <TextareaField
                    label="Description de la situation"
                    required
                    placeholder="Decrivez brievement votre situation et l'echeance a laquelle vous etes confronte..."
                    value={uMessage}
                    onChange={setUMessage}
                    error={uErrors.message}
                  />

                  <SelectField
                    label="Heure de rappel preferee"
                    options={callbackOptions}
                    value={uCallback}
                    onChange={setUCallback}
                    placeholder="Choisir..."
                  />

                  <div className={uErrors.gdpr ? 'p-3 border border-[#8B1A1A] rounded-sm' : ''}>
                    <GDPRCheckbox checked={uGdpr} onChange={setUGdpr} />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#8B1A1A] text-white py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-[#6B1414] rounded-sm"
                  >
                    <AlertTriangle size={16} />
                    ENVOYER MA DEMANDE
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePlannedSubmit} className="space-y-4">
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField
                      label="Prenom"
                      required
                      value={pPrenom}
                      onChange={setPPrenom}
                      error={pErrors.prenom}
                    />
                    <InputField
                      label="Nom"
                      required
                      value={pNom}
                      onChange={setPNom}
                      error={pErrors.nom}
                    />
                  </div>

                  <InputField
                    label="Email"
                    required
                    type="email"
                    placeholder="votre@email.fr"
                    value={pEmail}
                    onChange={setPEmail}
                    error={pErrors.email}
                  />

                  <InputField
                    label="Telephone"
                    required
                    type="tel"
                    placeholder="01 23 45 67 89"
                    value={pPhone}
                    onChange={setPPhone}
                    error={pErrors.phone}
                  />

                  <InputField
                    label="Societe"
                    placeholder="Societe (facultatif)"
                    value={pCompany}
                    onChange={setPCompany}
                  />

                  {/* Client type radio */}
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-800 mb-2">
                      Type de client
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {['Particulier', 'Entreprise', 'Institution', 'Confrere'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="radio"
                              name="clientType"
                              value={type}
                              checked={pClientType === type}
                              onChange={(e) => setPClientType(e.target.value)}
                              className="sr-only peer"
                            />
                            <div className="w-4 h-4 rounded-full border-2 border-neutral-300 peer-checked:border-gold-500 peer-checked:bg-gold-500 transition-all duration-200">
                              {pClientType === type && (
                                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-neutral-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <SelectField
                    label="Domaine d'expertise"
                    required
                    options={domainOptions}
                    value={pDomain}
                    onChange={setPDomain}
                    error={pErrors.domain}
                  />

                  <InputField
                    label="Objet de votre demande"
                    required
                    value={pSubject}
                    onChange={setPSubject}
                    error={pErrors.subject}
                  />

                  <TextareaField
                    label="Message detaille"
                    required
                    placeholder="Decrivez votre besoin juridique avec autant de details que possible. Toute information est couverte par le secret professionnel."
                    value={pMessage}
                    onChange={setPMessage}
                    rows={6}
                    error={pErrors.message}
                  />

                  <SelectField
                    label="Comment nous avez-vous connus ?"
                    options={hearAboutOptions}
                    value={pHearAbout}
                    onChange={setPHearAbout}
                    placeholder="Selectionner..."
                  />

                  <div className={pErrors.gdpr ? 'p-3 border border-[#8B1A1A] rounded-sm' : ''}>
                    <GDPRCheckbox checked={pGdpr} onChange={setPGdpr} />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gold-500 text-navy-950 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-400 hover:shadow-gold rounded-sm"
                  >
                    ENVOYER MA DEMANDE
                    <ChevronRight size={16} />
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ─── Section 3: Office Coordinates ─── */
function OfficeSection() {
  return (
    <section className="bg-navy-50 py-20">
      <div className="container-law max-w-[1280px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-8"
        >
          <motion.div variants={staggerItem} className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-overline text-gold-500">NOS COORDONNEES</span>
            <span className="w-8 h-px bg-gold-500" />
          </motion.div>
          <motion.h2 variants={staggerItem} className="font-display text-display-lg text-neutral-900">
            Ou nous trouver
          </motion.h2>
        </motion.div>

        {/* Info Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {/* Paris */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-md p-6 border border-neutral-200"
          >
            <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mb-4">
              <MapPin size={32} className="text-gold-500" />
            </div>
            <h4 className="font-display text-lg font-medium text-neutral-900">PARIS</h4>
            <p className="text-sm text-neutral-600 mt-1">14 rue de la Paix, 75002 Paris</p>
            <div className="mt-3 space-y-1.5">
              <a
                href="tel:+33142680000"
                className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-500 transition-colors"
              >
                <Phone size={14} />
                +33 (0)1 42 68 00 00
              </a>
              <p className="flex items-center gap-2 text-sm text-neutral-500">
                <Phone size={14} />
                Fax: +33 (0)1 42 68 00 01
              </p>
              <a
                href="mailto:contact@lecrans-associes.fr"
                className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-500 transition-colors"
              >
                <Mail size={14} />
                contact@lecrans-associes.fr
              </a>
              <p className="flex items-center gap-2 text-sm text-neutral-500">
                <Clock size={14} />
                Lun-Ven : 9h00-19h00
              </p>
              <p className="flex items-center gap-2 text-sm text-neutral-500">
                <MapPin size={14} />
                Metro Opera (L3, L7, L8)
              </p>
            </div>
          </motion.div>

          {/* Lyon */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-md p-6 border border-neutral-200"
          >
            <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mb-4">
              <MapPin size={32} className="text-gold-500" />
            </div>
            <h4 className="font-display text-lg font-medium text-neutral-900">LYON</h4>
            <p className="text-sm text-neutral-600 mt-1">25 rue de la Republique, 69002 Lyon</p>
            <div className="mt-3 space-y-1.5">
              <a
                href="tel:+33478420000"
                className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-500 transition-colors"
              >
                <Phone size={14} />
                +33 (0)4 78 42 00 00
              </a>
              <p className="flex items-center gap-2 text-sm text-neutral-500">
                <Phone size={14} />
                Fax: +33 (0)4 78 42 00 01
              </p>
              <a
                href="mailto:lyon@lecrans-associes.fr"
                className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-500 transition-colors"
              >
                <Mail size={14} />
                lyon@lecrans-associes.fr
              </a>
              <p className="flex items-center gap-2 text-sm text-neutral-500">
                <Clock size={14} />
                Lun-Ven : 9h00-18h00
              </p>
              <p className="flex items-center gap-2 text-sm text-neutral-500">
                <MapPin size={14} />
                Metro Cordeliers (A)
              </p>
            </div>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-md p-6 border border-neutral-200"
          >
            <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mb-4">
              <Accessibility size={32} className="text-gold-500" />
            </div>
            <h4 className="font-display text-lg font-medium text-neutral-900">ACCESSIBILITE</h4>
            <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
              Nos bureaux sont accessibles aux personnes a mobilite reduite. Des adaptations peuvent
              etre prevues sur demande pour les personnes malentendantes ou malvoyantes.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 mt-3 text-sm text-gold-600 hover:text-gold-500 transition-colors font-medium"
            >
              Demander une adaptation
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Section 4: Map ─── */
function MapSection() {
  return (
    <section className="relative w-full h-[400px] bg-neutral-200 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: easePremium }}
        className="absolute inset-0"
      >
        {/* Dark-styled map placeholder */}
        <iframe
          title="LeCrans & Associes - Paris"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.8!2d2.3316!3d48.8689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUyJzA4LjAiTiAywrAxOSc1My44IkU!5e0!3m2!1sfr!2sfr!4v1!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>

      {/* Overlay card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3, ease: easePremium }}
        className="absolute top-4 left-4 md:top-6 md:left-8 bg-white rounded-md shadow-lg p-4 max-w-[260px] z-10"
      >
        <p className="text-[13px] font-semibold text-neutral-900">LECRANS &amp; ASSOCIES</p>
        <p className="text-xs text-neutral-600 mt-1">14 rue de la Paix, 75002 Paris</p>
        <a
          href="https://www.google.com/maps/dir//14+rue+de+la+Paix,+75002+Paris"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-gold-600 hover:text-gold-500 font-medium"
        >
          Itineraire
          <ChevronRight size={12} />
        </a>
      </motion.div>
    </section>
  )
}

/* ─── Section 5: Emergency Banner ─── */
function EmergencyBanner() {
  return (
    <section className="bg-navy-900 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: easePremium }}
        className="container-law max-w-[1280px] mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center md:text-left">
          <div className="flex items-center gap-4">
            <Phone size={24} className="text-gold-500 shrink-0" />
            <div>
              <p className="text-base font-semibold text-white">Ligne d&apos;urgence 24h/24</p>
              <p className="text-[13px] text-navy-400">
                Pour les situations necessitant une intervention immediate
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="tel:+33142680000"
              className="font-display text-4xl text-gold-500 hover:text-gold-400 transition-colors"
            >
              01 42 68 00 00
            </a>
            <p className="text-xs text-navy-400 mt-1">Secret professionnel garanti</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Main Page ─── */
export default function Contact() {
  return (
    <main>
      <HeroSection />
      <FormSection />
      <OfficeSection />
      <MapSection />
      <EmergencyBanner />
    </main>
  )
}
