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
    <div className="relative h-6 w-7 cursor-pointer">
      <span
        className={`absolute left-0 h-0.5 w-7 bg-foreground transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "top-[11px] -rotate-45" : "top-[8px] rotate-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[11px] h-0.5 bg-foreground transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "w-0 opacity-0" : "w-5 opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 bg-foreground transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "top-[11px] w-7 rotate-45" : "top-[14px] w-6 rotate-0"
        }`}
      />
    </div>
  )
}

export function Navbar({ onOpenDemo }: { onOpenDemo?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [closing, setClosing] = useState(false)
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
    setClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setClosing(false)
    }, 600)
  }

  const handleToggle = () => {
    if (isOpen) {
      handleClose()
    } else {
      setIsOpen(true)
    }
  }

  const handleLinkClick = () => {
    handleClose()
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
          <div className="flex items-center gap-2">
            {onOpenDemo && (
              <button
                type="button"
                onClick={onOpenDemo}
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2 font-pixel text-[10px] text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:bg-accent/30 hover:shadow-sm backdrop-blur-sm"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">DEMO</span>
              </button>
            )}

            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2 font-pixel text-[10px] text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:bg-accent/30 hover:shadow-sm backdrop-blur-sm"
              >
                {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{isDark ? "LIGHT" : "DARK"}</span>
              </button>
            )}

            {/* Hamburger */}
            <button
              type="button"
              onClick={handleToggle}
              className={`relative z-[60] rounded-lg p-2 transition-all duration-300 hover:bg-accent/50 ${
                isOpen ? "bg-accent/50" : ""
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon isOpen={isOpen && !closing} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating overlay menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 transition-all duration-300 ease-out ${
              closing ? "opacity-0" : "opacity-100"
            }`}
            style={{ backgroundColor: "hsl(var(--background) / 0.3)", backdropFilter: "blur(12px)" }}
            onClick={handleClose}
            onKeyDown={(e) => e.key === "Escape" && handleClose()}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />

          {/* Menu panel */}
          <div
            ref={menuRef}
            className={`fixed top-1/2 left-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
              closing
                ? "scale-95 opacity-0"
                : "scale-100 opacity-100"
            }`}
          >
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-2xl shadow-[0_25px_50px_-12px_hsl(var(--foreground)/0.25)]">
              {/* Menu header with gradient border */}
              <div className="relative border-b border-border/30 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 px-6 py-4">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                <span className="font-pixel text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Menu</span>
              </div>

              {/* Links container */}
              <nav className="p-3 space-y-1">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`group relative flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-accent/50 hover:shadow-sm ${
                      closing
                        ? "opacity-0 translate-x-4"
                        : "opacity-100 translate-x-0"
                    }`}
                    style={{
                      transitionDelay: closing ? "0ms" : `${i * 60}ms`,
                    }}
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Animated dot */}
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-muted-foreground/50 transition-all duration-300 group-hover:bg-primary group-hover:scale-150" />
                    </span>
                    
                    {/* Link text */}
                    <span className="font-pixel text-[11px] text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:font-medium tracking-wide">
                      {link.label}
                    </span>
                    
                    {/* Hover indicator */}
                    <span className="ml-auto h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-8" />
                  </Link>
                ))}
              </nav>

              {/* Mobile demo button */}
              {onOpenDemo && (
                <div className="relative border-t border-border/30">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                  <div className="p-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleClose()
                        setTimeout(() => onOpenDemo(), 400)
                      }}
                      className={`group relative flex w-full items-center gap-4 rounded-xl bg-primary/5 px-4 py-3 transition-all duration-300 hover:bg-primary/10 hover:shadow-sm sm:hidden ${
                        closing
                          ? "opacity-0 translate-y-4"
                          : "opacity-100 translate-y-0"
                      }`}
                      style={{
                        transitionDelay: closing ? "0ms" : `${navLinks.length * 60}ms`,
                      }}
                    >
                      <Terminal className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-pixel text-[11px] text-primary font-medium tracking-wide">Open Terminal Demo</span>
                      <span className="ml-auto h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-8" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
