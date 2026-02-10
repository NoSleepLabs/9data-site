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
        className={`absolute left-0 h-[2px] w-full bg-foreground transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          isOpen ? "top-[9px] rotate-45" : "top-[2px] rotate-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[9px] h-[2px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          isOpen ? "w-full opacity-0 translate-x-3" : "w-4 opacity-100 translate-x-0"
        }`}
      />
      <span
        className={`absolute left-0 h-[2px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          isOpen ? "top-[9px] w-full -rotate-45" : "top-[16px] w-5 rotate-0"
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
            className={`fixed inset-0 z-40 transition-opacity duration-500 ${
              closing ? "opacity-0" : "opacity-100"
            }`}
            style={{ backgroundColor: "hsl(var(--background) / 0.4)", backdropFilter: "blur(8px)" }}
            onClick={handleClose}
            onKeyDown={(e) => e.key === "Escape" && handleClose()}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />

          {/* Menu panel */}
          <div
            ref={menuRef}
            className={`fixed top-20 right-6 z-50 w-64 origin-top-right ${
              closing
                ? "animate-menu-close"
                : "animate-menu-open"
            }`}
          >
            <div className="overflow-hidden rounded-xl border border-border/40 bg-background/90 backdrop-blur-2xl shadow-2xl">
              {/* Menu header */}
              <div className="border-b border-border/30 px-5 py-3">
                <span className="font-pixel text-[9px] text-muted-foreground tracking-widest">NAVIGATION</span>
              </div>

              {/* Links */}
              <nav className="p-2">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-accent/60"
                    style={{
                      animationDelay: closing ? "0ms" : `${i * 50}ms`,
                      animation: closing
                        ? "none"
                        : `menuItemSlide 0.4s ease-out ${i * 50}ms both`,
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
                <div className="border-t border-border/30 p-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose()
                      setTimeout(() => onOpenDemo(), 650)
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-accent/60 sm:hidden"
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
