"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { MessageSquare, Server, Cpu, Send, ArrowRight } from "lucide-react"

const STEPS = [
  {
    num: "01",
    icon: MessageSquare,
    title: "CLIENT REQUEST",
    desc: "A client submits a data processing request through our secure portal. The request is encrypted and routed to the nearest available node.",
    detail: "Encrypted handshake established. Request queued for processing.",
  },
  {
    num: "02",
    icon: Server,
    title: "NODE ASSIGNMENT",
    desc: "Our relay network assigns the request to the optimal server based on load, proximity, and data requirements.",
    detail: "Relay nodes balance traffic across the network automatically.",
  },
  {
    num: "03",
    icon: Cpu,
    title: "DATA PROCESSING",
    desc: "The assigned server processes the data through our core pipeline - parsing, transforming, and validating at high throughput.",
    detail: "Pipeline stages: ingest, transform, validate, store.",
  },
  {
    num: "04",
    icon: Send,
    title: "SECURE DELIVERY",
    desc: "Processed data is encrypted and delivered back to the client through the relay network, split across paths for speed.",
    detail: "End-to-end encryption maintained throughout delivery.",
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setActiveStep((p) => (p + 1) % STEPS.length),
      4000
    )
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const selectStep = useCallback((i: number) => {
    setActiveStep(i)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(
      () => setActiveStep((p) => (p + 1) % STEPS.length),
      4000
    )
  }, [])

  const ActiveIcon = STEPS[activeStep].icon

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative border-b border-border overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
            {"// HOW IT WORKS"}
          </p>
          <h2 className="mt-4 font-pixel text-lg font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl text-balance">
            THE PROCESS
          </h2>
          <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground leading-relaxed md:text-sm">
            From request to delivery, every step is optimized for speed and
            security.
          </p>
        </div>

        {/* Main content */}
        <div
          className={`mt-10 grid gap-6 lg:grid-cols-2 md:mt-14 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Active step display */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
              <span className="ml-2 font-pixel text-[9px] text-muted-foreground md:text-[10px]">
                PROCESS_VIEW.SYS
              </span>
            </div>

            <div className="relative p-6 md:p-8 min-h-[280px] flex flex-col justify-center">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-pixel text-3xl font-bold text-foreground md:text-4xl">
                    {STEPS[activeStep].num}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-pixel text-[9px] text-muted-foreground">
                    STEP {activeStep + 1} OF {STEPS.length}
                  </span>
                </div>

                <div className="mb-5 flex items-center justify-center">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded border border-foreground/15 bg-foreground/[0.04] md:h-20 md:w-20">
                      <ActiveIcon className="h-7 w-7 text-foreground md:h-9 md:w-9" />
                    </div>
                    <div className="absolute -inset-3 -z-10 rounded bg-foreground/5 blur-xl" />
                  </div>
                </div>

                <h3 className="font-pixel text-sm font-bold text-foreground md:text-base text-center">
                  {STEPS[activeStep].title}
                </h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed text-center md:text-sm">
                  {STEPS[activeStep].desc}
                </p>

                <div className="mt-5 flex items-center gap-2 justify-center rounded border border-border/50 bg-secondary/50 px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-pixel text-[8px] text-muted-foreground md:text-[10px]">
                    {STEPS[activeStep].detail}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full overflow-hidden bg-border/50 cursor-pointer"
                    onClick={() => selectStep(i)}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        i === activeStep
                          ? "bg-foreground w-full"
                          : i < activeStep
                            ? "bg-foreground/30 w-full"
                            : "bg-transparent w-0"
                      }`}
                      style={
                        i === activeStep
                          ? { animation: "progress-fill 4s linear" }
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step list */}
          <div className="flex flex-col gap-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => selectStep(i)}
                  className={`group flex items-start gap-4 rounded-lg border p-4 text-left transition-all duration-300 md:p-5 ${
                    activeStep === i
                      ? "border-foreground/20 bg-foreground/[0.03]"
                      : "border-border bg-card hover:border-foreground/10"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded transition-all duration-300 ${
                      activeStep === i
                        ? "bg-foreground/10 text-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-pixel text-[10px] transition-colors md:text-xs ${
                          activeStep === i
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {step.num}
                      </span>
                      <h3
                        className={`font-pixel text-[10px] font-bold transition-colors md:text-xs ${
                          activeStep === i
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className={`mt-1.5 text-[10px] leading-relaxed transition-colors md:text-xs ${
                        activeStep === i
                          ? "text-muted-foreground"
                          : "text-muted-foreground/40"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>

                  <ArrowRight
                    className={`mt-1 h-4 w-4 shrink-0 transition-all duration-300 ${
                      activeStep === i
                        ? "text-foreground translate-x-0 opacity-100"
                        : "text-muted-foreground/20 -translate-x-1 opacity-0"
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress-fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  )
}
