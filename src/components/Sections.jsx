import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BrainCircuit, BarChart3, Zap, Headset, CheckCircle2, ArrowUpRight, Target, Eye,
  Bot, Share2, Code2, Smartphone, Rocket,
  Search, Lightbulb, Hammer, LifeBuoy,
  Users, BadgeDollarSign, Layers, Puzzle, Clock3, Handshake,
} from 'lucide-react'
import { site } from '../config'
import { Reveal, PlainHeading } from './ui'

/* ───────── 4 highlights (minimal, below hero) ───────── */
const highlights = [
  { icon: BrainCircuit, title: 'AI-First Approach', text: 'Every solution is designed with AI and automation at its core.' },
  { icon: BarChart3, title: 'Data Expertise', text: 'Deep experience turning raw data into clear business insight.' },
  { icon: Zap, title: 'Fast Delivery', text: 'Agile sprints and quick releases, so you see value early.' },
  { icon: Headset, title: 'Dedicated Support', text: 'We stay with you after launch — maintenance, updates and growth.' },
]

export function Highlights() {
  return (
    <section className="relative z-10 bg-white px-5 pb-20 pt-6 sm:px-8 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, title, text }, n) => (
          <Reveal key={title} delay={n * 0.08}>
            <div className="group h-full">
              <div className="relative h-px bg-navy/10">
                <span className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </div>
              <span className="mt-7 grid h-12 w-12 place-items-center rounded-full border border-royal/40 text-royal transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                <Icon size={21} strokeWidth={1.7} />
              </span>
              <h3 className="mt-6 font-display text-lg font-extrabold tracking-tight text-ink">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink/75">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ───────── About (2 auto-switching slides) ───────── */
const ABOUT_MS = 7000
const aboutTitles = [['We build', 'practical AI.'], ['AI that', 'actually ships.']]
const eyebrow = 'text-xs font-semibold uppercase tracking-[0.2em] text-royal'

// Static decorative wire-mesh (computed once)
const meshPaths = Array.from({ length: 46 }, (_, k) => {
  const t = k / 45
  const y0 = 40 + t * 260
  return `M0 ${y0} C 200 ${y0 - 120 + t * 90}, 330 ${y0 + 150 - t * 120}, 520 ${y0 - 40 + t * 60} S 760 ${y0 + 20 - t * 90}, 900 ${y0 - 60 + t * 140}`
})

function Mesh() {
  return (
    <svg viewBox="0 0 900 360" preserveAspectRatio="xMaxYMin slice" className="absolute -right-10 -top-6 h-[70%] w-[75%] opacity-60 [mask-image:linear-gradient(225deg,black_25%,transparent_80%)]" aria-hidden="true">
      <defs>
        <linearGradient id="meshg" x1="0" x2="1"><stop offset="0" stopColor="#38bdf8" stopOpacity=".2" /><stop offset="1" stopColor="#026db9" stopOpacity=".7" /></linearGradient>
      </defs>
      {meshPaths.map((d, k) => <path key={k} d={d} fill="none" stroke="url(#meshg)" strokeWidth=".7" />)}
    </svg>
  )
}

function AboutHeadline({ n }) {
  return (
    <h2 className="font-display text-[3rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-ink sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
      {aboutTitles[n].map((line, li) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" initial={{ y: '108%' }} animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.05 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}>
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

function AboutLeft({ n }) {
  return (
    <div>
      {n === 1 && (
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-block rounded-full border border-brand/40 bg-ice/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          Kuwait
        </motion.span>
      )}
      <AboutHeadline n={n} />
      {n === 1 && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
          <p className="mt-6 text-xl text-muted sm:text-2xl">AI Tech • Technology Consulting</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="rounded-xl border border-navy/10 bg-white/80 px-4 py-3 font-mono text-[13px] leading-6 text-ink shadow-[0_10px_30px_rgba(8,35,74,0.08)]">
              <span className="text-brand">const</span> plan = build()<br />
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />ship.deploy()
            </div>
            <span className="rounded-md border border-dashed border-brand/50 px-3.5 py-2 font-mono text-[13px] text-brand">build → ship → monitor</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function AboutRight({ n }) {
  const focus = [
    ['Strategy', 'Find where AI and automation can help your business, and plan a clear roadmap.'],
    ['Implementation', 'Build and connect AI tools, data pipelines and software around how you work.'],
    ['Support', 'Launch, train your team and keep improving after go-live.'],
  ]
  return n === 0 ? (
    <div>
      <p className={eyebrow}>About</p>
      <p className="mt-5 text-[17px] leading-relaxed text-ink/85">
        AI Tech is a Kuwait-based startup helping businesses adopt AI, data and modern software with confidence. We combine strategic consulting with hands-on engineering — so you get the right advice and a team that can actually build it.
      </p>
      <p className={`${eyebrow} mt-10`}>Our focus</p>
      <ul className="mt-5 space-y-4">
        {focus.map(([t, d]) => (
          <li key={t} className="flex gap-3 text-[16px] leading-snug text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
            <span><span className="font-semibold">{t} —</span> <span className="text-ink/75">{d}</span></span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[15px] text-muted">Based in {site.location}</p>
      <p className="mt-6 text-[13px] text-ink/80">AI &amp; Automation · Data &amp; BI · Custom Software · Web &amp; Mobile Apps</p>
    </div>
  ) : (
    <div>
      <p className={`${eyebrow} flex items-center gap-2`}><Target size={15} /> Our mission</p>
      <p className="mt-4 text-[17px] leading-relaxed text-ink/85">Make AI, data and modern software practical and affordable for every growing business.</p>
      <p className={`${eyebrow} mt-9 flex items-center gap-2`}><Eye size={15} /> Our vision</p>
      <p className="mt-4 text-[17px] leading-relaxed text-ink/85">To become the most trusted technology partner for businesses across Kuwait and the GCC.</p>
      <p className={`${eyebrow} mt-9`}>How we work</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {['Consulting + implementation', 'Modern, proven tech stack', 'Transparent communication', 'Long-term partnership'].map((t) => (
          <li key={t} className="flex items-center gap-2.5 text-[15px] font-medium text-ink"><CheckCircle2 size={17} className="text-brand" /> {t}</li>
        ))}
      </ul>
    </div>
  )
}

export function About() {
  const [n, setN] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible) return
    const t = setTimeout(() => setN((x) => (x + 1) % 2), ABOUT_MS)
    return () => clearTimeout(t)
  }, [n, paused, visible])

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 lg:py-32"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence>
        {n === 1 && (
          <motion.div key="mesh" className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
            <Mesh />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div className="flex flex-col justify-center lg:min-h-[520px]">
          <div className="min-h-[300px] sm:min-h-[380px] lg:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div key={n} exit={{ opacity: 0, y: -14, transition: { duration: 0.3 } }}>
                <AboutLeft n={n} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 h-[2px] w-full max-w-xl overflow-hidden rounded-full bg-navy/10">
            <span key={`${n}-${paused}`} className="block h-full origin-left bg-gradient-to-r from-royal to-transparent"
              style={{ animation: paused || !visible ? 'none' : `progress ${ABOUT_MS}ms linear forwards`, transform: paused || !visible ? 'scaleX(1)' : undefined }} />
          </div>
          <div className="mt-7 flex gap-3" role="tablist" aria-label="About slides">
            {[0, 1].map((k) => (
              <button key={k} role="tab" aria-selected={k === n} aria-label={`Show slide ${k + 1}`} onClick={() => setN(k)}
                className={`h-2.5 rounded-full transition-all duration-500 ${k === n ? 'w-8 bg-royal' : 'w-2.5 bg-royal/30 hover:bg-royal/60'}`} />
            ))}
          </div>
        </div>

        <div className="lg:min-h-[520px] lg:pt-10">
          <AnimatePresence mode="wait">
            <motion.div key={n} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
              <AboutRight n={n} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ───────── 6 Solutions (minimal grid) ───────── */
const solutions = [
  { icon: Bot, title: 'AI & Automation', text: 'AI chatbots, document processing and workflow automation that save your team hours every week.' },
  { icon: Share2, title: 'Data Engineering & ETL', text: 'Reliable pipelines that collect, clean and connect data from all your systems.' },
  { icon: BarChart3, title: 'BI & Analytics Dashboards', text: 'Power BI and custom dashboards that put live KPIs in front of decision-makers.' },
  { icon: Code2, title: 'Custom Software Development', text: 'Business systems, portals and internal tools built exactly around your process.' },
  { icon: Smartphone, title: 'Web & Mobile Apps', text: 'Fast, modern websites and iOS / Android apps your customers will enjoy using.' },
  { icon: Rocket, title: 'Digital Transformation', text: 'A clear roadmap to move from manual work and legacy tools to modern, connected systems.' },
]

export function Solutions() {
  return (
    <section id="solutions" className="relative bg-white px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <PlainHeading label="Our Solutions" title="Everything You Need to" highlight="Grow Digitally"
          text="Six core services, one team. Pick what you need today and scale up as your business grows." />

        <div className="mt-20 grid gap-x-14 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map(({ icon: Icon, title, text }, n) => (
            <Reveal key={title} delay={(n % 3) * 0.08}>
              <a href="#contact" className="group block h-full">
                <div className="relative h-px bg-navy/10">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </div>
                <div className="mt-8 flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-royal/40 text-royal transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <ArrowUpRight size={22} className="text-royal opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <p className="mt-7 text-sm font-semibold text-royal">{String(n + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display text-xl font-extrabold uppercase leading-snug tracking-tight text-ink">{title}</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink/75">{text}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── How we work (minimal timeline) ───────── */
const steps = [
  { icon: Search, title: 'Discover', text: 'We learn your business, goals and current systems.' },
  { icon: Lightbulb, title: 'Strategy', text: 'We design the right solution, scope and timeline.' },
  { icon: Hammer, title: 'Build', text: 'We develop in short sprints and show progress often.' },
  { icon: LifeBuoy, title: 'Support', text: 'We launch, train your team and keep improving.' },
]

export function Process() {
  return (
    <section id="process" className="relative bg-white px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl border-t border-navy/10 pt-24 lg:pt-32">
        <PlainHeading label="How We Work" title="A Simple Process," highlight="Real Results"
          text="Four clear steps from first conversation to a working solution." />

        <div className="relative mt-20">
          {/* connecting line (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-navy/10 lg:block" aria-hidden="true">
            <motion.div className="h-full origin-left bg-gradient-to-r from-navy via-brand to-sky/40"
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }} />
          </div>
          {/* connecting line (mobile) */}
          <div className="absolute bottom-10 left-8 top-8 w-px bg-navy/10 lg:hidden" aria-hidden="true">
            <motion.div className="h-full w-full origin-top bg-gradient-to-b from-navy via-brand to-sky/40"
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }} />
          </div>

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ icon: Icon, title, text }, n) => (
              <Reveal key={title} delay={0.2 + n * 0.18}>
                <div className="group relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-navy text-white ring-8 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand">
                    <Icon size={24} strokeWidth={1.7} />
                  </span>
                  <div className="lg:mt-7">
                    <p className="text-xs font-semibold tracking-[0.2em] text-royal">STEP {n + 1}</p>
                    <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink">{title}</h3>
                    <p className="mt-2 max-w-[16rem] text-[15px] leading-relaxed text-ink/75 lg:mx-auto">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── Why AI Tech ───────── */
const reasons = [
  { icon: Users, title: 'Expert Team', text: 'Engineers and consultants with hands-on industry experience.' },
  { icon: BadgeDollarSign, title: 'Transparent Pricing', text: 'Clear scope and fixed quotes — no hidden surprises.' },
  { icon: Layers, title: 'Modern Tech Stack', text: 'Python, Django, React, cloud and leading AI tools.' },
  { icon: Puzzle, title: 'Tailored Solutions', text: 'Built for your workflow, not a one-size-fits-all template.' },
  { icon: Clock3, title: 'On-Time Delivery', text: 'Realistic plans, weekly updates and dependable deadlines.' },
  { icon: Handshake, title: 'Long-Term Partner', text: 'We grow with you long after the first project ships.' },
]

export function WhyUs() {
  return (
    <section id="why" className="relative bg-white px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto grid max-w-7xl gap-14 border-t border-navy/10 pt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:pt-32">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <PlainHeading center={false} label="Why AI Tech" title="Why Businesses" highlight="Choose AI Tech"
            text="We are a young, focused team — which means senior attention on every project, quick decisions and a genuine stake in your success." />
          <Reveal delay={0.25}>
            <a href="#contact" className="btn-primary mt-9 inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-semibold">
              Start Your Project <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }, n) => (
            <Reveal key={title} delay={(n % 2) * 0.1 + Math.floor(n / 2) * 0.06}>
              <div className="group h-full">
                <div className="relative h-px bg-navy/10">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </div>
                <div className="mt-8 flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-royal/40 text-royal transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <span className="text-sm font-semibold text-royal/70">{String(n + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-7 font-display text-xl font-extrabold tracking-tight text-ink">{title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink/75">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
