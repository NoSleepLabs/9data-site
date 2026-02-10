"use client"

import { useState, useCallback } from "react"
import { SplashIntro } from "@/components/splash-intro"
import PortalOverlay from "@/components/portal-overlay"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { HowItWorks } from "@/components/how-it-works"
import { Services } from "@/components/services"
import { Clients } from "@/components/clients"
import { Budgets } from "@/components/budgets"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { SSHDemo } from "@/components/ssh-demo"

export default function Page() {
  const [splashDone, setSplashDone] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const handleSplashComplete = useCallback(() => setSplashDone(true), [])

  return (
    <>
      {!splashDone && <SplashIntro onComplete={handleSplashComplete} />}
      <main
        className={`transition-all duration-700 ease-out ${
          splashDone
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <Navbar onOpenDemo={() => setDemoOpen(true)} />
        <Hero />
        <About />
        <HowItWorks />
        <Services />
        <Clients />
        <Budgets />
        <CTA />
        <Footer />
      </main>

      <SSHDemo isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      {portalOpen && <PortalOverlay onClose={() => setPortalOpen(false)} duration={6000} />}
      <button onClick={() => setPortalOpen(true)} style={{ position:'fixed', right: 20, bottom: 20, padding: '8px 12px', borderRadius: 6, background: '#fff', border: '1px solid #ccc', fontFamily: 'Open Sans, sans-serif' }}>Aperture Help Desk</button>
    </>
  )
}
