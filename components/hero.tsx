"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { WebGLCanvas } from "./webgl-canvas"

export function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pt-16 overflow-hidden md:px-6 md:pt-20">
      {/* Background pixel art datacenter */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/datacenter-pixel.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.06] dark:opacity-[0.08]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 h-32 animate-scan-line bg-gradient-to-b from-transparent via-foreground/[0.01] to-transparent" />
      </div>

      <div
        className={`mx-auto flex max-w-3xl flex-col items-center text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative mb-8 md:mb-10">
          <Image
            src="https://files.catbox.moe/xmthif.png"
            alt="9Data logo"
            width={64}
            height={64}
            className="dark:invert md:h-20 md:w-20"
            priority
          />
          <div className="absolute -inset-4 -z-10 rounded-full bg-foreground/5 blur-2xl" />
        </div>

        <h1 className="font-pixel text-xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl text-balance">
          PRIVATE DATA
          <br />
          <span className="text-muted-foreground">PROCESSING GROUP</span>
        </h1>

        <p className="mx-auto mt-6 max-w-sm text-xs leading-relaxed text-muted-foreground sm:max-w-lg sm:text-sm md:mt-8">
          We process and host data for select clients. Reliable, secure, and
          built for the projects that depend on us.
        </p>

        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-5 transition-all duration-1000 delay-500 sm:gap-8 md:mt-12 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {["PRIVATE", "SECURE", "RELIABLE"].map((label, i) => (
            <span key={label} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-foreground sm:h-2 sm:w-2"
                style={{
                  animation: "pulse-glow 2s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
              <span className="font-pixel text-[10px] text-muted-foreground sm:text-xs">
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div
        className={`mt-12 transition-all duration-1000 delay-700 md:mt-20 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-pixel text-xs text-muted-foreground animate-blink">
          {">"}_
        </span>
      </div>

      {/* 3D WebGL Visualization */}
      <div
        className={`absolute inset-0 opacity-20 transition-opacity duration-1000 delay-1000 ${
          visible ? "opacity-20" : "opacity-0"
        }`}
      >
        <WebGLCanvas className="w-full h-full" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
