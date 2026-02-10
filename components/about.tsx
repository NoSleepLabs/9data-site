"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { Lock, ShieldCheck, Clock, Shield } from "lucide-react"

function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
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
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const stats = [
  { label: "PRIVATE", desc: "Invite-only clients", icon: Lock },
  { label: "SECURE", desc: "End-to-end protection", icon: ShieldCheck },
  { label: "24/7", desc: "Always-on support", icon: Clock },
  { label: "DDOS", desc: "Protected network", icon: Shield },
]

export function About() {
  return (
    <section id="about" className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll>
            <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
              // ABOUT
            </p>
            <h2 className="mt-4 font-pixel text-lg font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl text-balance">
              A PRIVATE INFRASTRUCTURE GROUP
            </h2>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground md:text-sm">
              9Data.US is not a public hosting provider. We are a private data
              processing and hosting group that works exclusively with select
              clients. Our infrastructure is purpose-built to serve the specific
              needs of the projects we support.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
              We focus on reliability, security, and direct support for the
              teams that trust us with their data and services.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <AnimateOnScroll key={stat.label} delay={150 + i * 100}>
                  <div className="group rounded border border-border bg-card p-4 transition-all duration-300 hover:border-foreground/20 md:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-foreground/70 transition-colors group-hover:text-foreground" />
                      <div className="font-pixel text-sm font-bold text-foreground transition-transform duration-300 group-hover:translate-x-0.5 md:text-lg">
                        {stat.label}
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground md:text-xs">
                      {stat.desc}
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
