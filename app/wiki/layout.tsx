"use client"

import { useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/wiki/sidebar"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Home } from "lucide-react"

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // For now, just open a new tab with Google search for the query
      window.open(`https://www.google.com/search?q=site:9data.us+${encodeURIComponent(searchQuery)}`, '_blank')
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <Breadcrumb />
              <div className="flex items-center gap-2">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search documentation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button type="submit" size="sm" variant="outline">Search</Button>
                </form>
                <Link href="/">
                  <Button size="sm" variant="ghost">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 max-w-5xl min-h-full">
          {children}
        </div>
      </main>
    </div>
  )
}