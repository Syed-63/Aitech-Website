import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

export function SectionLabel({ children }) {
  return (
    <span className="neu-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  )
}

export function SectionHeading({ label, title, highlight, text, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <Reveal><SectionLabel>{label}</SectionLabel></Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">{text}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ───────── Shared minimal section heading ───────── */
export function PlainHeading({ label, title, highlight, text, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-xl'}>
      <Reveal>
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-royal">
          <span className="h-1.5 w-1.5 rounded-full bg-royal" />{label}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.6rem]">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p className={`${center ? 'mx-auto' : ''} mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="a1" /><span className="a2" /><span className="a3" /><span className="a4" />
    </div>
  )
}

/* Simple brand icons (lucide no longer ships logos) */
export const SocialIcons = {
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
  ),
  instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
  ),
  x: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"/></svg>
  ),
}
