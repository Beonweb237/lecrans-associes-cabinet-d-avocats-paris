import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, AlertTriangle } from 'lucide-react'

const navLinks = [
  { label: 'EXPERTISES', href: '/expertises' },
  { label: 'EQUIPE', href: '/equipe' },
  { label: 'PUBLICATIONS', href: '/publications' },
  { label: 'ACTUALITES', href: '/actualites' },
  { label: 'CARRIERES', href: '/carrieres' },
  { label: 'CONTACT', href: '/contact' },
]

const practiceAreas = [
  { title: 'Droit des Affaires', desc: 'Fusions-acquisitions, droit des societes' },
  { title: 'Droit Social', desc: 'Relations individuelles et collectives' },
  { title: 'Droit Fiscal', desc: 'Conseil fiscal et contentieux' },
  { title: 'Droit Immobilier', desc: 'Transactions et construction' },
  { title: 'Droit Penal des Affaires', desc: 'Defense des dirigeants' },
  { title: 'Droit International', desc: 'Arbitrage et investissements' },
  { title: 'Droit de la Famille', desc: 'Divorce et succession' },
  { title: 'Contentieux', desc: 'Strategies proces et mediations' },
]

const sectors = [
  'Industrie',
  'Immobilier',
  'Banque & Finance',
  'Technologie',
  'Sante',
  'Energie',
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = useCallback((href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
          scrolled
            ? 'bg-[var(--glass-dark)] backdrop-blur-[12px] border-b border-[var(--border-subtle)]'
            : 'bg-transparent border-b border-white/10'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="flex items-center justify-between h-20 container-law">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="font-display text-xl font-medium text-white tracking-[0.08em]">
              LECRANS &amp; ASSOCIES
            </span>
            <span className="text-[11px] text-navy-400 font-body tracking-wide">
              AVOCATS A LA COUR
            </span>
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.label === 'EXPERTISES' && setMegaOpen(true)}
                onMouseLeave={() => link.label === 'EXPERTISES' && setMegaOpen(false)}
              >
                <Link
                  to={link.href}
                  className={`text-[13px] font-medium tracking-[0.06em] transition-colors duration-200 relative group ${
                    isActive(link.href) ? 'text-gold-400' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gold-500 transition-transform duration-200 origin-center ${
                      isActive(link.href) ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>

                {/* Mega Menu */}
                {link.label === 'EXPERTISES' && megaOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div
                      className="bg-navy-900 border-t-2 border-gold-500 shadow-xl flex gap-12 px-10 py-8 min-w-[700px]"
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                    >
                      <div className="flex-1">
                        <h3 className="text-overline text-gold-500 mb-4">DOMAINES D'EXPERTISE</h3>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {practiceAreas.map((area) => (
                            <Link
                              key={area.title}
                              to="/expertises"
                              className="group/area flex flex-col py-2 px-3 -mx-3 rounded transition-all duration-200 hover:bg-navy-800 hover:translate-x-1"
                            >
                              <span className="text-white text-sm font-medium group-hover/area:text-gold-400 transition-colors">
                                {area.title}
                              </span>
                              <span className="text-navy-400 text-xs">{area.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="w-px bg-navy-700" />
                      <div className="w-48">
                        <h3 className="text-overline text-gold-500 mb-4">SECTEURS</h3>
                        <div className="flex flex-col gap-2">
                          {sectors.map((sector) => (
                            <span
                              key={sector}
                              className="text-navy-300 text-sm py-1 px-2 -mx-2 rounded transition-all duration-200 hover:bg-navy-800 hover:text-white cursor-pointer"
                            >
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right CTAs - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="border border-gold-500 text-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-500 hover:text-navy-950 flex items-center gap-2 group"
            >
              NOUS CONTACTER
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="bg-[#8B1A1A] text-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-[#6B1414] flex items-center gap-2"
            >
              <AlertTriangle size={14} />
              URGENCE
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-gold-500 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-navy-950 flex flex-col">
          <div className="flex items-center justify-between h-20 container-law">
            <Link to="/" className="flex flex-col" onClick={() => setMobileOpen(false)}>
              <span className="font-display text-xl font-medium text-white tracking-[0.08em]">
                LECRANS &amp; ASSOCIES
              </span>
              <span className="text-[11px] text-navy-400 font-body tracking-wide">
                AVOCATS A LA COUR
              </span>
            </Link>
            <button
              className="text-gold-500 p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-[28px] text-white hover:text-gold-400 transition-colors duration-200"
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 p-6">
            <Link
              to="/contact"
              className="border border-gold-500 text-white px-5 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-gold-500 hover:text-navy-950"
              onClick={() => setMobileOpen(false)}
            >
              NOUS CONTACTER
            </Link>
            <Link
              to="/contact"
              className="bg-[#8B1A1A] text-white px-5 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-[#6B1414]"
              onClick={() => setMobileOpen(false)}
            >
              URGENCE
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
