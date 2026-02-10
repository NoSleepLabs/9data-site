"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Moon, Sun, Terminal } from "lucide-react"
import { useTheme } from "next-themes"

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "SERVICES", href: "#services" },
  { label: "CLIENTS", href: "#clients" },
  { label: "BUDGETS", href: "#budgets" },
  { label: "CONTACT", href: "#contact" },
]



export function Navbar({ onOpenDemo }: { onOpenDemo?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isDark = resolvedTheme === "dark"



  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_0_0_hsl(var(--border))]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="https://files.catbox.moe/xmthif.png"
              alt="9Data logo"
              width={28}
              height={28}
              className="dark:invert transition-transform duration-300 group-hover:rotate-[360deg]"
            />
            <span className="font-pixel text-xs font-bold tracking-tight text-foreground">
              9DATA<span className="text-muted-foreground">.US</span>
            </span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {onOpenDemo && (
              <button
                type="button"
                onClick={onOpenDemo}
                className="flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 font-pixel text-[10px] text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground hover:bg-accent/50"
              >
                <Terminal className="h-3 w-3" />
                <span className="hidden sm:inline">DEMO</span>
              </button>
            )}

            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 font-pixel text-[10px] text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground hover:bg-accent/50"
              >
                {isDark ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                <span className="hidden sm:inline">{isDark ? "GO LIGHT" : "GO DARK"}</span>
              </button>
            )}
          </div>
        </div>
      </header>


    </>
  )
}
