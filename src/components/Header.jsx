import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#process', label: 'Process' },
  { href: '#why', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y <= 24) setOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 ${scrolled ? 'pointer-events-none' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-6">
        <a
          href="#home"
          className={`pointer-events-auto flex items-center gap-2.5 transition-all duration-300 ${scrolled ? 'glass-strong -ml-2 rounded-2xl p-2 sm:-ml-3' : ''}`}
          aria-label="AI Tech home"
        >
          <img src="./favicon.png" alt="" className="h-10 w-10 object-contain" />
          <span className={`leading-tight ${scrolled ? 'hidden' : ''}`}>
            <span className="block font-display text-lg font-extrabold text-navy">AI <span className="text-brand">tech</span></span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-muted sm:block">Technology Consulting</span>
          </span>
        </a>

        <ul className={`hidden items-center gap-1 ${scrolled ? '' : 'lg:flex'}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-xl px-4 py-2 text-sm font-medium text-ink/80 transition hover:bg-white/70 hover:text-brand">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className={`btn-primary hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold ${scrolled ? '' : 'sm:inline-flex'}`}>
            Get Started <ArrowRight size={16} />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`neu-sm pointer-events-auto grid h-11 w-11 place-items-center rounded-xl text-navy ${scrolled ? '-mr-2 sm:-mr-3' : 'lg:hidden'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-strong pointer-events-auto ml-auto mt-2 w-full max-w-xs rounded-2xl p-3 sm:max-w-sm"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-medium text-ink hover:bg-white/80 hover:text-brand">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="btn-primary mt-2 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
              Get Started <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
