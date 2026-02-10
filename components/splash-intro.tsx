"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { WebGPUCanvas } from "./webgpu-canvas"

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
      {/* WebGPU Background */}
      <div className="absolute inset-0">
        <WebGPUCanvas className="w-full h-full" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Simple spinning logo container */}
        <div
          className="relative z-10"
        >
          <div
            className="relative"
            style={{
              animation:
                phase === "spin"
                  ? "splash-3d-spin 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards, splash-3d-rotate 3s linear infinite"
                  : phase === "text" || phase === "hold"
                  ? "splash-3d-rotate 3s linear infinite"
                  : undefined,
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Main logo */}
            <Image
              src="https://files.catbox.moe/xmthif.png"
              alt="9Data"
              width={80}
              height={80}
              className="dark:invert relative z-20"
              priority
              style={{
                transform: "translateZ(0px)",
                filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
              }}
            />
            
            {/* Glow ring */}
            <div
              className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${
                phase === "hold" || phase === "exit"
                  ? "opacity-60"
                  : "opacity-20"
              }`}
              style={{
                background: "radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
                transform: "scale(1.5) translateZ(-10px)",
              }}
            />
          </div>
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
        @keyframes splash-3d-spin {
          0% {
            transform: scale(0.3) rotateY(-360deg) rotateX(-180deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) rotateY(0deg) rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotateY(0deg) rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes splash-3d-rotate {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(15deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(-15deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  )
}
