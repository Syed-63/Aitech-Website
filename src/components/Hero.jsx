import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Bot, BrainCircuit, TrendingUp, Database, Code2, Smartphone, Rocket, CheckCircle2 } from 'lucide-react'
import { Aurora } from './ui'

const SLIDE_MS = 6000

const slides = [
  {
    tag: 'AI & Automation',
    title: ['Smart AI for', 'Modern Businesses'],
    text: 'We help companies work smarter with practical AI, automation and intelligent tools — built around how your business actually runs.',
    Visual: AiVisual,
  },
  {
    tag: 'Data & Analytics',
    title: ['Turn Your Data', 'Into Decisions'],
    text: 'From messy spreadsheets to live dashboards. We build data pipelines and BI reports that show you what is happening — and what to do next.',
    Visual: DataVisual,
  },
  {
    tag: 'Software Development',
    title: ['Build Faster.', 'Scale Smarter.'],
    text: 'Custom web platforms, mobile apps and internal systems designed, built and supported by one focused team.',
    Visual: BuildVisual,
  },
]

export default function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const ref = useRef(null)
  const go = useCallback((n) => setI((n + slides.length) % slides.length), [])

  // Stop all hero animations once it has scrolled out of view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible) return
    const t = setTimeout(() => go(i + 1), SLIDE_MS)
    return () => clearTimeout(t)
  }, [i, paused, visible, go])

  const s = slides[i]

  return (
    <section
      id="home"
      ref={ref}
      className={`hero-flat ${visible ? '' : 'hero-offscreen'} relative overflow-hidden pb-32 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-40 lg:pt-40`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <Aurora />
      <Backdrop i={i} />
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Text */}
        <div className="min-h-[360px] sm:min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}>
              <motion.span
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-royal"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-royal" /> {s.tag}
              </motion.span>

              <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-[3.8rem] xl:text-[4.1rem]">
                {s.title.map((line, li) => (
                  <span key={li} className="block overflow-hidden pb-1">
                    <motion.span
                      className={`block ${li === 1 ? 'text-gradient' : ''}`}
                      initial={{ y: '105%' }} animate={{ y: 0 }}
                      transition={{ duration: 0.75, delay: 0.1 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
              >
                {s.text}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold sm:text-base">
              Book a Free Consultation <ArrowRight size={18} />
            </a>
            <a href="#solutions" className="btn-soft neu inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold sm:text-base">
              Explore Solutions
            </a>
          </div>

          {/* Controls */}
          <div className="mt-12 flex items-center gap-5">
            <div className="flex gap-2" role="tablist" aria-label="Slides">
              {slides.map((sl, n) => (
                <button key={n} onClick={() => go(n)} role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1}: ${sl.tag}`}
                  className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ${n === i ? 'w-14 bg-brand/20' : 'w-2 bg-navy/20 hover:bg-navy/40'}`}>
                  {n === i && (
                    <span key={`${i}-${paused}`} className="absolute inset-0 origin-left rounded-full bg-brand"
                      style={{ animation: paused ? 'none' : `progress ${SLIDE_MS}ms linear forwards`, transform: paused ? 'scaleX(1)' : undefined }} />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(i - 1)} className="btn-soft grid h-10 w-10 place-items-center rounded-full border border-navy/20 bg-white/60 transition hover:border-brand hover:bg-white" aria-label="Previous slide"><ChevronLeft size={18} /></button>
              <button onClick={() => go(i + 1)} className="btn-soft grid h-10 w-10 place-items-center rounded-full border border-navy/20 bg-white/60 transition hover:border-brand hover:bg-white" aria-label="Next slide"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <s.Visual />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ───────── Slide visuals ───────── */

function Chip({ icon: Icon, label, className = '' }) {
  return (
    <div className={`glass-strong absolute flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-navy ring-1 ring-royal/10 ${className}`}>
      <span className="bg-brand-gradient grid h-8 w-8 place-items-center rounded-xl text-white"><Icon size={16} /></span>
      {label}
    </div>
  )
}

function AiVisual() {
  const nodes = [
    [70, 80], [70, 180], [70, 280],
    [210, 50], [210, 140], [210, 230], [210, 320],
    [350, 120], [350, 250],
  ]
  const edges = [[0,3],[0,4],[1,4],[1,5],[2,5],[2,6],[0,5],[1,3],[2,4],[3,7],[4,7],[4,8],[5,8],[6,8],[5,7]]
  return (
    <div className="relative h-full w-full">
      <div className="glass absolute inset-x-4 inset-y-6 rounded-[32px] sm:inset-x-6">
        <svg viewBox="0 0 420 370" className="h-full w-full p-4">
          <defs>
            <linearGradient id="edge" x1="0" x2="1"><stop offset="0" stopColor="#114f99" stopOpacity=".25"/><stop offset="1" stopColor="#38bdf8" stopOpacity=".6"/></linearGradient>
            <radialGradient id="node"><stop offset="0" stopColor="#38bdf8"/><stop offset="1" stopColor="#026db9"/></radialGradient>
          </defs>
          {edges.map(([a, b], k) => (
            <motion.line key={k} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
              stroke="url(#edge)" strokeWidth="2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 + k * 0.05 }} />
          ))}
          {nodes.map(([x, y], k) => (
            <g key={k}>
              <circle cx={x} cy={y} r="18" fill="#38bdf8" opacity=".15" className="node-pulse"
                style={{ animationDelay: `${k * 0.3}s` }} />
              <circle cx={x} cy={y} r="9" fill="url(#node)" />
            </g>
          ))}
        </svg>
      </div>
      <Chip icon={Bot} label="AI Chatbots" className="floaty left-0 top-2" />
      <Chip icon={BrainCircuit} label="Smart Predictions" className="floaty-slow -right-1 top-1/2" />
      <Chip icon={Sparkles} label="Automation" className="floaty bottom-0 left-8" />
    </div>
  )
}

function DataVisual() {
  const bars = [42, 58, 50, 72, 64, 86, 78, 94]
  return (
    <div className="relative h-full w-full">
      <div className="glass absolute inset-x-4 inset-y-6 flex flex-col rounded-[32px] p-6 sm:inset-x-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Business Overview</p>
            <p className="font-display text-xl font-bold text-navy">Live Dashboard</p>
          </div>
          <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-sky" /><i className="h-2.5 w-2.5 rounded-full bg-brand" /><i className="h-2.5 w-2.5 rounded-full bg-navy" /></span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[['Sales', '124.5K'], ['Orders', '1,823'], ['Growth', '+22.4%']].map(([k, v], n) => (
            <div key={k} className="neu-sm rounded-2xl p-3">
              <div className="flex items-baseline justify-between gap-1"><p className="text-[11px] font-medium text-muted">{k}</p><p className="font-display text-xs font-bold text-royal sm:text-sm">{v}</p></div>
              <div className="mt-2 h-2 rounded-full bg-ice"><motion.div className="h-2 rounded-full bg-brand-gradient" initial={{ width: 0 }} animate={{ width: `${55 + n * 15}%` }} transition={{ duration: 1, delay: 0.3 + n * 0.1 }} /></div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-1 items-end gap-2.5 bg-[linear-gradient(rgba(17,79,153,.08)_1px,transparent_1px)] bg-[length:100%_25%] sm:gap-3">
          {bars.map((h, n) => (
            <motion.div key={n} className="flex-1 rounded-t-xl bg-gradient-to-t from-royal to-sky"
              initial={{ height: 0 }} animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: 0.25 + n * 0.07, ease: [0.22, 1, 0.36, 1] }} />
          ))}
        </div>
      </div>
      <Chip icon={TrendingUp} label="Real-time Insights" className="floaty -left-1 top-0" />
      <Chip icon={Database} label="Data Pipelines" className="floaty-slow -right-1 bottom-2" />
    </div>
  )
}

function BuildVisual() {
  const lines = [
    ['text-brand', 'const', 'text-navy', ' app = createApp({'],
    ['text-muted', '  name:', 'text-royal', " 'Your Business',"],
    ['text-muted', '  web:', 'text-royal', ' true,'],
    ['text-muted', '  mobile:', 'text-royal', ' true,'],
    ['text-muted', '  scale:', 'text-royal', " 'unlimited'"],
    ['text-navy', '})', 'text-navy', ''],
    ['text-brand', 'app', 'text-navy', '.launch() 🚀'],
  ]
  return (
    <div className="relative h-full w-full">
      <div className="glass absolute left-2 right-16 top-6 rounded-[28px] p-5 sm:right-24">
        <div className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-[#ff6b6b]" /><i className="h-3 w-3 rounded-full bg-[#ffd166]" /><i className="h-3 w-3 rounded-full bg-[#06d6a0]" /></div>
        <div className="mt-5 space-y-2.5 font-mono text-[13px] sm:text-sm">
          {lines.map(([c1, t1, c2, t2], n) => (
            <motion.p key={n} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + n * 0.12 }}>
              <span className="mr-3 text-muted/60">{n + 1}</span><span className={c1}>{t1}</span><span className={c2}>{t2}</span>
            </motion.p>
          ))}
        </div>
      </div>
      {/* Phone */}
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
        className="glass-strong absolute bottom-0 right-0 h-[250px] w-[140px] rounded-[30px] p-2.5 sm:h-[280px] sm:w-[155px]"
      >
        <div className="flex h-full flex-col gap-2 rounded-[22px] bg-gradient-to-b from-ice to-white p-3">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-navy/15" />
          <div className="bg-brand-gradient mt-1 rounded-xl p-2.5 text-white"><Rocket size={16} /><p className="mt-1 text-[10px] font-semibold">Your App</p></div>
          {[70, 85, 55].map((w, n) => (
            <div key={n} className="neu-sm flex items-center gap-2 rounded-lg p-2">
              <CheckCircle2 size={12} className="text-brand" /><div className="h-1.5 rounded bg-navy/15" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </motion.div>
      <Chip icon={Code2} label="Web Platforms" className="floaty bottom-10 left-0" />
      <Chip icon={Smartphone} label="Mobile Apps" className="floaty-slow right-6 top-0 sm:right-2" />
    </div>
  )
}

/* ───────── Per-slide backgrounds (cross-fade) ───────── */

function Backdrop({ i }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div key={i} className="pointer-events-none absolute inset-0" aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1 }}>
        {i === 1 ? <Waves /> : i === 2 ? <Peaks /> : null}
      </motion.div>
    </AnimatePresence>
  )
}

function Waves() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_38%,rgba(56,130,220,.26)_70%,rgba(17,79,153,.55)_100%)]" />
      <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0 540 C300 430 520 720 900 630 S1300 390 1440 470 V800 H0Z" fill="rgba(255,255,255,.35)" />
        <path d="M820 0 C900 190 1120 230 1440 120 V0Z" fill="rgba(255,255,255,.5)" />
        <path d="M1100 800 C1200 600 1320 560 1440 600 V800Z" fill="rgba(8,35,74,.12)" />
      </svg>
      <div className="floaty-slow absolute left-[44%] top-[46%] hidden h-28 w-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#d8f2ff,#38bdf8_38%,rgba(17,79,153,.75)_78%)] shadow-[0_0_60px_rgba(56,189,248,.65)] lg:block" />
      <div className="floaty absolute left-[66%] top-[14%] hidden h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,.8),transparent_68%)] lg:block" />
    </>
  )
}

function Peaks() {
  return (
    <>
      <div className="absolute -left-40 top-0 h-[520px] w-[620px] bg-[radial-gradient(closest-side,rgba(56,189,248,.16),transparent)]" />
      <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M640 800 L980 420 L1180 620 L1440 360 V800Z" fill="rgba(17,79,153,.07)" />
        <path d="M860 800 L1140 500 L1290 650 L1440 520 V800Z" fill="rgba(56,189,248,.12)" />
        <path d="M0 800 L260 640 L420 740 L600 600 L760 800Z" fill="rgba(165,184,255,.14)" />
      </svg>
    </>
  )
}
