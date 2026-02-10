"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="border-b border-border">
      <div
        className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28"
        ref={ref}
      >
        <div
          className={`rounded-lg border border-foreground/10 bg-card p-8 text-center transition-all duration-700 md:p-16 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-pixel text-base font-bold tracking-tight text-card-foreground md:text-2xl text-balance">
            INTERESTED IN WORKING WITH US?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground md:mt-4 md:text-sm">
            We work with select clients on a private basis. Reach out to discuss
            whether 9Data is the right fit for your project.
          </p>
          <a
            href="mailto:contact@9data.us"
            className="group mt-6 inline-flex items-center gap-2.5 rounded border border-foreground/20 bg-foreground/[0.04] px-5 py-2.5 font-pixel text-xs text-foreground transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/30 md:mt-8"
          >
            <Mail className="h-4 w-4" />
            <span>contact@9data.us</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
