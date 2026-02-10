"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import {
  X,
  Mail,
  MessageSquare,
  ExternalLink,
  Server,
  Network,
  Building2,
  Check,
  Copy,
} from "lucide-react"

function AnimateOnScroll({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}

function ContactModal({
  isOpen,
  onClose,
  tierName,
}: {
  isOpen: boolean
  onClose: () => void
  tierName: string
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const copyEmail = () => {
    navigator.clipboard.writeText("contact@9data.us")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        style={{ animation: "modal-backdrop 0.2s ease-out" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-lg border border-border bg-card overflow-hidden shadow-2xl"
        style={{ animation: "modal-in 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-secondary/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-foreground/30" />
            <span className="font-pixel text-[10px] text-muted-foreground">
              CONTACT // {tierName}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="font-pixel text-sm font-bold text-foreground md:text-base">
            GET IN TOUCH
          </h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed md:text-sm">
            Reach out through any of the channels below to discuss the{" "}
            <span className="text-foreground font-medium">{tierName}</span>{" "}
            plan for your project.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {/* Email */}
            <a
              href="mailto:contact@9data.us"
              className="group flex items-center gap-3 rounded border border-border bg-secondary/50 px-4 py-3.5 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.03]"
            >
              <Mail className="h-4 w-4 text-foreground/70 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-pixel text-[10px] text-foreground md:text-xs block">
                  EMAIL
                </span>
                <span className="block text-xs text-muted-foreground md:text-sm font-mono">
                  contact@9data.us
                </span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 transition-all duration-300 group-hover:text-foreground shrink-0" />
            </a>

            {/* Copy email */}
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center gap-3 rounded border border-border bg-secondary/50 px-4 py-3.5 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.03] text-left"
            >
              <Copy className="h-4 w-4 text-foreground/70 shrink-0" />
              <div className="flex-1">
                <span className="font-pixel text-[10px] text-foreground md:text-xs block">
                  {copied ? "COPIED!" : "COPY EMAIL"}
                </span>
                <span className="block text-xs text-muted-foreground md:text-sm font-mono">
                  contact@9data.us
                </span>
              </div>
            </button>

            {/* Discord */}
            <a
              href="https://discord.gg/9data"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded border border-border bg-secondary/50 px-4 py-3.5 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.03]"
            >
              <MessageSquare className="h-4 w-4 text-foreground/70 shrink-0" />
              <div className="flex-1">
                <span className="font-pixel text-[10px] text-foreground md:text-xs block">
                  DISCORD
                </span>
                <span className="block text-xs text-muted-foreground md:text-sm">
                  Join our server
                </span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 transition-all duration-300 group-hover:text-foreground shrink-0" />
            </a>
          </div>

          <p className="mt-5 text-center font-pixel text-[8px] text-muted-foreground/50 md:text-[9px]">
            ALL INQUIRIES ARE HANDLED PRIVATELY
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

const tiers = [
  {
    name: "STARTER",
    price: "$50",
    period: "/mo",
    desc: "For small projects with basic data processing needs.",
    features: [
      "Single relay node",
      "Up to 500GB data/mo",
      "Standard processing",
      "Email support",
    ],
    icon: Server,
    highlight: false,
  },
  {
    name: "STANDARD",
    price: "$200",
    period: "/mo",
    desc: "For growing projects needing reliable throughput.",
    features: [
      "2 relay nodes",
      "Up to 5TB data/mo",
      "Priority processing",
      "Direct support",
      "DDoS protection",
    ],
    icon: Network,
    highlight: true,
  },
  {
    name: "ENTERPRISE",
    price: "CUSTOM",
    period: "",
    desc: "For large-scale operations requiring dedicated infrastructure.",
    features: [
      "Full relay network",
      "Unlimited data",
      "Dedicated main server",
      "24/7 direct line",
      "DDoS protection",
      "Custom pipeline",
    ],
    icon: Building2,
    highlight: false,
  },
]

export function Budgets() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState("")

  const openModal = (tierName: string) => {
    setSelectedTier(tierName)
    setModalOpen(true)
  }

  return (
    <section id="budgets" className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <AnimateOnScroll>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
              {"// MONTHLY BUDGETS"}
            </p>
            <h2 className="mt-4 font-pixel text-lg font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl text-balance">
              POSSIBLE BUDGETS
            </h2>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed md:text-sm">
              Estimated monthly ranges depending on your project scale. All
              budgets are discussed privately.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="delay-200">
          <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
            {tiers.map((t) => {
              const Icon = t.icon
              return (
                <div
                  key={t.name}
                  className={`group relative flex flex-col rounded-lg border p-5 transition-all duration-300 md:p-7 ${
                    t.highlight
                      ? "border-foreground/20 bg-foreground/[0.03]"
                      : "border-border bg-card hover:border-foreground/10"
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute -top-px left-4 right-4 h-[2px] bg-foreground" />
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-pixel text-[10px] text-muted-foreground md:text-xs">
                        {t.name}
                      </span>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span
                          className={`font-pixel text-xl font-bold md:text-2xl ${
                            t.highlight
                              ? "text-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {t.price}
                        </span>
                        {t.period && (
                          <span className="font-pixel text-[10px] text-muted-foreground md:text-xs">
                            {t.period}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
                        t.highlight
                          ? "bg-foreground/10 text-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed md:text-xs">
                    {t.desc}
                  </p>

                  <div className="mt-4 h-px bg-border" />

                  <ul className="mt-4 flex flex-col gap-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check
                          className={`h-3 w-3 shrink-0 ${
                            t.highlight
                              ? "text-foreground"
                              : "text-muted-foreground/50"
                          }`}
                        />
                        <span className="text-[11px] text-muted-foreground md:text-xs">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex-1" />

                  <button
                    type="button"
                    onClick={() => openModal(t.name)}
                    className={`mt-4 rounded border px-4 py-2.5 text-center font-pixel text-[10px] transition-all duration-300 cursor-pointer md:text-xs ${
                      t.highlight
                        ? "border-foreground bg-foreground text-background hover:opacity-90"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {t.price === "CUSTOM" ? "GET IN TOUCH" : "INQUIRE"}
                  </button>
                </div>
              )
            })}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="delay-300">
          <p className="mt-8 text-center font-pixel text-[9px] text-muted-foreground/50 md:text-[10px]">
            ALL BUDGETS ARE ESTIMATES. FINAL PRICING IS DISCUSSED PRIVATELY WITH
            EACH CLIENT.
          </p>
        </AnimateOnScroll>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tierName={selectedTier}
      />
    </section>
  )
}
