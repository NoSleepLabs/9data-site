"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  BookOpen, 
  Database, 
  Shield, 
  Cpu, 
  HardDrive, 
  Users, 
  BarChart3, 
  Webhook, 
  AlertTriangle, 
  Code,
  Home,
  Key,
  FileText,
  Activity,
  Settings,
  Globe,
  Lock,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react"

const navigation = [
  {
    title: "Getting Started",
    icon: Home,
    items: [
      { title: "Overview", href: "/wiki", icon: BookOpen },
      { title: "Quick Start", href: "/wiki/quick-start", icon: Zap },
      { title: "API Basics", href: "/wiki/api-basics", icon: FileText },
    ]
  },
  {
    title: "Authentication",
    icon: Shield,
    items: [
      { title: "API Keys", href: "/wiki/authentication/api-keys", icon: Key },
      { title: "OAuth 2.0", href: "/wiki/authentication/oauth", icon: Lock },
      { title: "Security Best Practices", href: "/wiki/authentication/security", icon: CheckCircle },
    ]
  },
  {
    title: "Data Processing",
    icon: Cpu,
    items: [
      { title: "Data Upload", href: "/wiki/data-processing/upload", icon: HardDrive },
      { title: "Batch Processing", href: "/wiki/data-processing/batch", icon: Activity },
      { title: "Real-time Processing", href: "/wiki/data-processing/realtime", icon: Clock },
      { title: "Data Transformation", href: "/wiki/data-processing/transformation", icon: Settings },
    ]
  },
  {
    title: "Storage & Database",
    icon: Database,
    items: [
      { title: "Storage API", href: "/wiki/storage/storage-api", icon: HardDrive },
      { title: "Database Operations", href: "/wiki/storage/database", icon: Database },
      { title: "Backup & Recovery", href: "/wiki/storage/backup", icon: Shield },
    ]
  },
  {
    title: "Client Management",
    icon: Users,
    items: [
      { title: "Client CRUD", href: "/wiki/clients/crud", icon: Users },
      { title: "Client Analytics", href: "/wiki/clients/analytics", icon: BarChart3 },
      { title: "Client Permissions", href: "/wiki/clients/permissions", icon: Lock },
    ]
  },
  {
    title: "Monitoring & Analytics",
    icon: BarChart3,
    items: [
      { title: "Metrics API", href: "/wiki/monitoring/metrics", icon: BarChart3 },
      { title: "Logs & Events", href: "/wiki/monitoring/logs", icon: FileText },
      { title: "Health Checks", href: "/wiki/monitoring/health", icon: Activity },
    ]
  },
  {
    title: "Webhooks & Integration",
    icon: Webhook,
    items: [
      { title: "Webhook Setup", href: "/wiki/webhooks/setup", icon: Webhook },
      { title: "Event Types", href: "/wiki/webhooks/events", icon: Globe },
      { title: "Integration Guides", href: "/wiki/webhooks/integrations", icon: Code },
    ]
  },
  {
    title: "Error Handling",
    icon: AlertTriangle,
    items: [
      { title: "Error Codes", href: "/wiki/errors/codes", icon: AlertTriangle },
      { title: "Troubleshooting", href: "/wiki/errors/troubleshooting", icon: Settings },
      { title: "Rate Limiting", href: "/wiki/errors/rate-limiting", icon: Clock },
    ]
  },
  {
    title: "SDK & Libraries",
    icon: Code,
    items: [
      { title: "JavaScript/Node.js", href: "/wiki/sdk/javascript", icon: Code },
      { title: "Python", href: "/wiki/sdk/python", icon: Code },
      { title: "Go", href: "/wiki/sdk/go", icon: Code },
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/wiki" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>9Data Wiki</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-4">
            {navigation.map((section) => (
              <div key={section.title} className="pb-4">
                <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold flex items-center gap-2">
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <item.icon className="h-3 w-3" />
                      {item.title}
                    </Link>
                  ))}
                </div>
                {section.title !== navigation[navigation.length - 1].title && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}