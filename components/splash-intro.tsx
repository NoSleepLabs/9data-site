"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function SplashIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<
    "spin" | "text" | "hold" | "exit"
  >("spin")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 1200)
    const t2 = setTimeout(() => setPhase("hold"), 2000)
    const t3 = setTimeout(() => setPhase("exit"), 2800)
    const t4 = setTimeout(() => onComplete(), 3500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* Spinning logo */}
        <div
          className="relative"
          style={{
            animation:
              phase === "spin"
                ? "splash-spin 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards"
                : undefined,
          }}
        >
          <Image
            src="https://files.catbox.moe/xmthif.png"
            alt="9Data"
            width={80}
            height={80}
            className="dark:invert"
            priority
          />
          {/* Glow ring */}
          <div
            className={`absolute -inset-4 -z-10 rounded-full blur-2xl transition-opacity duration-1000 bg-primary/10 ${
              phase === "hold" || phase === "exit"
                ? "opacity-40"
                : "opacity-0"
            }`}
          />
        </div>

        {/* Text slides up from beneath the logo */}
        <div className="overflow-hidden mt-1">
          <div
            className="flex items-center gap-1 transition-all duration-700 ease-out"
            style={{
              transform:
                phase === "spin"
                  ? "translateY(100%)"
                  : "translateY(0)",
              opacity: phase === "spin" ? 0 : 1,
            }}
          >
            <span className="font-pixel text-lg tracking-[0.15em] text-foreground">
              9Data
            </span>
            <span className="font-pixel text-lg tracking-[0.15em] text-muted-foreground">
              .US
            </span>
          </div>
        </div>

        {/* Thin loading bar */}
        <div className="mt-8 w-40 h-px bg-border overflow-hidden rounded-full">
          <div
            className="h-full bg-foreground rounded-full transition-all ease-linear"
            style={{
              width:
                phase === "spin"
                  ? "20%"
                  : phase === "text"
                    ? "60%"
                    : "100%",
              transitionDuration:
                phase === "spin" ? "1200ms" : "800ms",
            }}
          />
        </div>

        {/* Status */}
        <p
          className={`mt-4 font-pixel text-[9px] tracking-[0.2em] text-muted-foreground transition-opacity duration-500 ${
            phase === "exit" ? "opacity-0" : "opacity-100"
          }`}
        >
          {phase === "spin" && "INITIALIZING"}
          {phase === "text" && "CONNECTING"}
          {(phase === "hold" || phase === "exit") && "READY"}
          <span className="animate-blink">_</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes splash-spin {
          0% {
            transform: scale(0.3) rotate(-360deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.05) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
