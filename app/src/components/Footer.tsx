import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Linkedin, Twitter } from 'lucide-react'

const expertiseLinks = [
  'Droit des Affaires',
  'Droit Social',
  'Droit Fiscal',
  'Droit Immobilier',
  'Droit Penal des Affaires',
  'Droit International',
  'Droit de la Famille',
  'Contentieux',
]

const cabinetLinks = [
  { label: "L'Equipe", href: '/equipe' },
  { label: 'Publications', href: '/publications' },
  { label: 'Actualites', href: '/actualites' },
  { label: 'Carrieres', href: '/carrieres' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950">
      <div className="container-law pt-20 pb-10">
        {/* Top section - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="flex flex-col mb-4">
              <span className="font-display text-2xl font-medium text-white tracking-[0.08em]">
                LECRANS &amp; ASSOCIES
              </span>
            </Link>
            <p className="text-sm text-navy-400 mb-4 leading-relaxed">
              Excellence juridique au service de vos enjeux
            </p>
            <p className="text-xs text-navy-500 mb-1">
              SELARL au capital de 200 000 &euro; &mdash; Barreau de Paris
            </p>
            <p className="text-xs text-navy-500">
              RC Professionnelle : ALLIANZ &mdash; Couverture mondiale
            </p>
          </div>

          {/* Column 2 - Expertises */}
          <div>
            <h3 className="text-overline text-gold-500 mb-6">DOMAINES D'EXPERTISE</h3>
            <ul className="flex flex-col gap-2">
              {expertiseLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/expertises"
                    className="text-sm text-navy-400 hover:text-gold-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Cabinet */}
          <div>
            <h3 className="text-overline text-gold-500 mb-6">LE CABINET</h3>
            <ul className="flex flex-col gap-2">
              {cabinetLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-navy-400 hover:text-gold-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-overline text-gold-500 mb-6">CONTACT</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-navy-400 mt-0.5 shrink-0" />
                <span className="text-sm text-navy-400">
                  14 rue de la Paix, 75002 Paris
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-navy-400 shrink-0" />
                <a href="tel:+33142680000" className="text-sm text-navy-400 hover:text-gold-400 transition-colors">
                  +33 (0)1 42 68 00 00
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-navy-400 shrink-0" />
                <a href="mailto:contact@lecrans-associes.fr" className="text-sm text-navy-400 hover:text-gold-400 transition-colors">
                  contact@lecrans-associes.fr
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-navy-400 hover:text-gold-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-navy-400 hover:text-gold-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-navy-800 my-12" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-navy-500">
          <p>&copy; 2025 LECRANS &amp; ASSOCIES &mdash; Tous droits reserves</p>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-navy-300 transition-colors">Politique de confidentialite</a>
            <span>|</span>
            <a href="#" className="hover:text-navy-300 transition-colors">Mentions legales</a>
            <span>|</span>
            <a href="#" className="hover:text-navy-300 transition-colors">Gestion des cookies</a>
            <span>|</span>
            <a
              href="https://www.beonweb.cm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400 transition-colors"
            >
              Conçu par Beonweb
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
