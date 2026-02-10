import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/9data-logo.png"
              alt="9Data logo"
              width={24}
              height={24}
              className="dark:invert"
            />
            <span className="font-pixel text-xs font-bold tracking-tight text-foreground">
              9DATA<span className="text-muted-foreground">.US</span>
            </span>
          </Link>

          <p className="font-pixel text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} 9DATA.US
          </p>
        </div>
      </div>
    </footer>
  )
}
