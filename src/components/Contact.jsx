import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import { site } from '../config'
import { Reveal, PlainHeading } from './ui'

const services = [
  'AI & Automation', 'Data Engineering & ETL', 'BI & Analytics Dashboards',
  'Custom Software Development', 'Web & Mobile Apps', 'Digital Transformation', 'Not sure yet',
]

const inputCls = 'w-full border-0 border-b border-navy/20 bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-muted/70 outline-none transition focus:border-royal'

export function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.botcheck) return

    // No form key yet → open the visitor's email app with the message filled in
    if (!site.web3formsKey) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nService: ${data.service}\n\n${data.message}`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('New enquiry — ' + data.service)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, access_key: site.web3formsKey, subject: `New enquiry — ${data.service}`, from_name: 'AI Tech Website' }),
      })
      const json = await res.json()
      if (json.success) { setStatus('sent'); form.reset() } else setStatus('error')
    } catch { setStatus('error') }
  }

  const details = [
    { icon: MapPin, label: 'Location', value: site.location },
  ]

  return (
    <section id="contact" className="relative bg-white px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl border-t border-navy/10 pt-24 lg:pt-32">
        <PlainHeading label="Contact Us" title="Let's Talk About" highlight="Your Project"
          text="Tell us what you're working on. We'll get back to you within one business day with ideas and next steps." />

        <div className="mt-20 grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Left: details */}
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">Get in touch</p>
            <p className="mt-4 text-[17px] text-ink/80">Send us a message using the form. Free first consultation — no commitment.</p>
            <ul className="mt-9">
              {details.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-royal/40 text-royal transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white"><Icon width={19} height={19} size={19} /></span>
                    <span><span className="block text-xs uppercase tracking-wider text-muted">{label}</span><span className="block font-semibold text-ink">{value}</span></span>
                  </>
                )
                return (
                  <li key={label} className="border-t border-navy/10 py-5">
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-4">{inner}</a>
                      : <div className="group flex items-center gap-4">{inner}</div>}
                  </li>
                )
              })}
            </ul>
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-navy/10 pt-6 text-sm">
              {Object.entries(site.social).map(([k, url]) => (
                <a key={k} href={url} className="font-medium capitalize text-muted transition hover:text-brand">{k === 'x' ? 'X' : k}</a>
              ))}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.12}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-navy text-white"><CheckCircle2 size={36} /></motion.span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-ink/75">Thank you for reaching out. Our team will contact you within one business day.</p>
                  <button onClick={() => setStatus('idle')} className="mt-7 rounded-xl border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition hover:border-navy">Send another message</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                  <Field label="Full name"><input required name="name" placeholder="Your name" className={inputCls} autoComplete="name" /></Field>
                  <Field label="Email"><input required type="email" name="email" placeholder="you@company.com" className={inputCls} autoComplete="email" /></Field>
                  <Field label="Phone"><input name="phone" type="tel" placeholder="+965 ..." className={inputCls} autoComplete="tel" /></Field>
                  <Field label="Company"><input name="company" placeholder="Company name" className={inputCls} autoComplete="organization" /></Field>
                  <Field label="Service you need" full>
                    <select required name="service" defaultValue="" className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 fill=%22none%22 stroke=%22%23114f99%22 stroke-width=%222%22><path d=%22m6 8 4 4 4-4%22/></svg>')] bg-[length:20px] bg-[right_0px_center] bg-no-repeat pr-8`}>
                      <option value="" disabled>Select a service</option>
                      {services.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Message" full>
                    <textarea required name="message" rows={4} placeholder="Tell us a little about your project..." className={`${inputCls} resize-none`} />
                  </Field>
                  <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted">We reply within 1 business day.</p>
                    <button disabled={status === 'sending'} className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 font-semibold disabled:opacity-70 sm:w-auto">
                      {status === 'sending' ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <>Send Message <Send size={17} /></>}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-sm font-medium text-red-600 sm:col-span-2">Something went wrong. Please try again in a moment.</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, full, children }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-royal">{label}</span>
      {children}
    </label>
  )
}

/* ───────── CTA ───────── */
export function CTA() {
  return (
    <section className="relative overflow-hidden bg-white px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl border-t border-navy/10 pt-24 text-center lg:pt-32">
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[5rem]">
            Ready to Transform <span className="text-gradient">Your Business?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">Let's turn your ideas into smart, scalable technology — starting with a free consultation.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-semibold">
              Get Started Today <ArrowRight size={18} />
            </a>
            <a href="#solutions"
              className="inline-flex items-center gap-2 rounded-2xl border border-navy/20 px-8 py-4 font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white">
              Explore Solutions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── Footer ───────── */
export function Footer() {
  const year = new Date().getFullYear()
  const col = (title, items) => (
    <div>
      <h4 className="text-[15px] font-medium text-muted">{title}</h4>
      <ul className="mt-6 space-y-3.5">
        {items.map(([label, href]) => (
          <li key={label}><a href={href} className="text-[15px] font-medium text-ink transition hover:text-brand">{label}</a></li>
        ))}
      </ul>
    </div>
  )
  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <h3 className="max-w-xs text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">Let's build what's next</h3>
          {col('Company', [['Home', '#home'], ['About Us', '#about'], ['How We Work', '#process'], ['Why AI Tech', '#why'], ['Contact', '#contact']])}
          {col('Solutions', [['AI & Automation', '#solutions'], ['Data Engineering', '#solutions'], ['BI Dashboards', '#solutions'], ['Custom Software', '#solutions'], ['Web & Mobile Apps', '#solutions']])}
          {col('Contact', [['Contact form', '#contact'], [site.location, '#contact']])}
        </div>

        {/* Giant wordmark */}
        <svg viewBox="0 0 1000 340" className="mt-14 block w-full select-none lg:mt-20" role="img" aria-label="Aitech">
          <defs>
            <linearGradient id="wm" x1="0" x2="1">
              <stop offset="0" stopColor="#08234a" /><stop offset=".55" stopColor="#114f99" /><stop offset="1" stopColor="#026db9" />
            </linearGradient>
          </defs>
          <text x="0" y="278" fill="url(#wm)" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="320"
            letterSpacing="-10" textLength="1000" lengthAdjust="spacing">
            Aitec<tspan dy="-48">h</tspan>
          </text>
        </svg>
      </div>

      <div className="border-t border-navy/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm text-muted sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
            <p className="font-medium text-ink/80">© {year} {site.legalName}</p>
            <p dir="rtl" lang="ar">شركة اية أي تيك للاستشارات التكنولوجية</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {Object.entries(site.social).map(([k, url]) => (
              <a key={k} href={url} className="font-medium capitalize transition hover:text-brand">{k === 'x' ? 'X' : k}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
