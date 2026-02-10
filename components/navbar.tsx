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

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative h-5 w-6 cursor-pointer">
      <span
        className={`absolute left-0 h-[2px] w-full bg-foreground transition-all duration-300 ease-in-out ${
          isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-foreground transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-[2px] w-full bg-foreground transition-all duration-300 ease-in-out ${
          isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0 rotate-0"
        }`}
      />
    </div>
  )
}

export function Navbar({ onOpenDemo }: { onOpenDemo?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const [scrolled, setScrolled] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isDark = resolvedTheme === "dark"

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

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

            {/* Hamburger */}
            <button
              type="button"
              onClick={handleToggle}
              className="relative z-[60] p-1"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating overlay menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleClose}
            onKeyDown={(e) => e.key === "Escape" && handleClose()}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />

          {/* Menu panel */}
          <div
            ref={menuRef}
            className="fixed top-1/2 left-1/2 z-50 w-80 transition-all duration-300 ease-out"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
              {/* Menu header */}
              <div className="border-b border-border px-5 py-3">
                <span className="font-pixel text-[9px] text-muted-foreground tracking-widest">NAVIGATION</span>
              </div>

              {/* Links */}
              <nav className="p-2">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-accent"
                    style={{
                      animationDelay: `${i * 50}ms`,
                      animation: "fadeInUp 0.3s ease-out forwards",
                      opacity: 0,
                      transform: "translateY(10px)",
                    }}
                  >
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40 transition-all duration-200 group-hover:bg-foreground group-hover:w-2" />
                    <span className="font-pixel text-[11px] text-muted-foreground transition-colors duration-200 group-hover:text-foreground tracking-wide">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Mobile demo button */}
              {onOpenDemo && (
                <div className="border-t border-border p-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose()
                      setTimeout(() => onOpenDemo(), 400)
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-accent sm:hidden"
                    style={{
                      animationDelay: `${navLinks.length * 50}ms`,
                      animation: "fadeInUp 0.3s ease-out forwards",
                      opacity: 0,
                      transform: "translateY(10px)",
                    }}
                  >
                    <Terminal className="h-3 w-3 text-muted-foreground" />
                    <span className="font-pixel text-[11px] text-muted-foreground tracking-wide">DEMO</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
