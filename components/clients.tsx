"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Monitor } from "lucide-react"
import Image from "next/image"

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

const clients = [
  {
    name: "VaultMC",
    url: "https://vaultmc.org",
    domain: "vaultmc.org",
    hasLink: true,
  },
  {
    name: "Xorg",
    url: "https://xorg.dev",
    domain: "xorg.dev",
    hasLink: true,
  },
  {
    name: "Reboot Farm",
    url: "https://reboot.farm",
    domain: "reboot.farm",
    hasLink: true,
  },
  {
    name: "Reboot Tools",
    url: "https://reboot.tools",
    domain: "reboot.tools",
    hasLink: true,
  },
  {
    name: "Reboot News",
    url: null,
    domain: "reboot.news",
    hasLink: false,
  },
]

export function Clients() {
  return (
    <section id="clients" className="relative border-b border-border overflow-hidden">
      {/* Background pixel art */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/clients-pixel.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.03] dark:opacity-[0.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <AnimateOnScroll>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
              {"// CLIENTS"}
            </p>
            <h2 className="mt-4 font-pixel text-lg font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl text-balance">
              TRUSTED BY
            </h2>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed md:text-sm">
              We host and process data for the following projects.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 md:mt-14 md:gap-3">
          {clients.map((client, i) => {
            const inner = (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-secondary text-muted-foreground transition-colors group-hover:text-foreground group-hover:bg-foreground/10">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-pixel text-[11px] font-bold text-card-foreground transition-colors group-hover:text-foreground md:text-sm">
                      {client.name}
                    </span>
                    <span className="block text-[10px] text-muted-foreground md:text-xs">
                      {client.domain}
                    </span>
                  </div>
                </div>
                {client.hasLink && (
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
                {!client.hasLink && (
                  <span className="font-pixel text-[8px] text-muted-foreground/40 md:text-[9px]">
                    SERVICE
                  </span>
                )}
              </>
            )

            if (client.hasLink) {
              return (
                <AnimateOnScroll key={client.domain} delay={100 + i * 60}>
                  <a
                    href={client.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded border border-border bg-card px-4 py-3 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.02] md:px-5 md:py-4"
                  >
                    {inner}
                  </a>
                </AnimateOnScroll>
              )
            }

            return (
              <AnimateOnScroll key={client.domain} delay={100 + i * 60}>
                <div className="group flex items-center justify-between rounded border border-border/50 bg-card/50 px-4 py-3 md:px-5 md:py-4">
                  {inner}
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
