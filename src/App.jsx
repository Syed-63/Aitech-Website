import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Header from './components/Header'
import Hero from './components/Hero'
import { Highlights, About, Solutions, Process, WhyUs } from './components/Sections'
import { Contact, CTA, Footer } from './components/Contact'

export default function App() {
  // Buttery smooth scrolling (disabled for users who prefer reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -88 } })
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Solutions />
        <Process />
        <WhyUs />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
