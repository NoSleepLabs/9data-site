"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Database,
  Shield,
  ServerCog,
  Lock,
  Cpu,
  Headphones,
} from "lucide-react"

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
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const services = [
  {
    icon: Database,
    title: "DATA PROCESSING",
    description:
      "We process terabytes of data for our clients with high-throughput infrastructure built for scale.",
  },
  {
    icon: Shield,
    title: "DDOS PROTECTION",
    description:
      "Multi-layered DDoS mitigation protects every client from volumetric and application-layer attacks.",
  },
  {
    icon: ServerCog,
    title: "PRIVATE HOSTING",
    description:
      "Dedicated infrastructure for select clients. No shared resources, no public access.",
  },
  {
    icon: Lock,
    title: "SECURITY",
    description:
      "End-to-end encrypted data pipelines with strict access controls and audit logging.",
  },
  {
    icon: Cpu,
    title: "RELAY NETWORK",
    description:
      "Distributed relay nodes accelerate data delivery and provide redundancy across regions.",
  },
  {
    icon: Headphones,
    title: "DIRECT SUPPORT",
    description:
      "Every client gets direct access to our infrastructure team. No tickets, no queues.",
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="relative border-b border-border bg-secondary/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <AnimateOnScroll>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
              {"// SERVICES"}
            </p>
            <h2 className="mt-4 font-pixel text-lg font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl text-balance">
              WHAT WE DO
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 md:mt-14 md:gap-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <AnimateOnScroll key={service.title} delay={100 + i * 80}>
                <div className="group h-full rounded border border-border bg-card p-4 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.02] md:p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-foreground/[0.06] text-foreground transition-colors duration-300 group-hover:bg-foreground/10 md:h-10 md:w-10">
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="mt-3 font-pixel text-[10px] font-bold text-foreground md:mt-4 md:text-xs">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground md:mt-3 md:text-xs">
                    {service.description}
                  </p>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
