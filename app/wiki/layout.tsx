import { Sidebar } from "@/components/wiki/sidebar"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumb className="mb-6" />
          {children}
        </div>
      </main>
    </div>
  )
}