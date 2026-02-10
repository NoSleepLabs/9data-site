"use client"

import { useState, useCallback } from "react"
import { SplashIntro } from "@/components/splash-intro"
import { FlowingDotsBanner } from "@/components/flowing-dots-banner"
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
        <div className="relative">
          {/* Flowing dots banner */}
          <FlowingDotsBanner className="absolute inset-0 w-full h-24" />
          
          <div className="relative z-10">
            <Navbar onOpenDemo={() => setDemoOpen(true)} />
            <Hero />
            <About />
            <HowItWorks />
            <Services />
            <Clients />
            <Budgets />
            <CTA />
            <Footer />
          </div>
        </div>
      </main>

      <SSHDemo isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}