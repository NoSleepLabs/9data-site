import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Zap, 
  Shield, 
  Cpu, 
  Database, 
  Users, 
  BarChart3, 
  Search,
  ArrowRight,
  CheckCircle,
  Clock,
  Globe
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "9Data API Documentation",
  description: "Complete API documentation for 9Data Private Data Processing Group",
}

const quickLinks = [
  { title: "Quick Start", href: "/wiki/quick-start", icon: Zap, description: "Get up and running in minutes" },
  { title: "Authentication", href: "/wiki/authentication/api-keys", icon: Shield, description: "Secure your API access" },
  { title: "Data Processing", href: "/wiki/data-processing/upload", icon: Cpu, description: "Process your data efficiently" },
  { title: "Storage API", href: "/wiki/storage/storage-api", icon: Database, description: "Store and retrieve data" },
]

const features = [
  { title: "RESTful API", description: "Clean, intuitive REST endpoints" },
  { title: "Real-time Processing", description: "Stream data processing capabilities" },
  { title: "Enterprise Security", description: "Bank-level encryption and security" },
  { title: "Scalable Infrastructure", description: "Handle any data volume" },
  { title: "24/7 Monitoring", description: "Constant uptime and performance tracking" },
  { title: "Multi-region Support", description: "Global data distribution" },
]

const stats = [
  { label: "API Endpoints", value: "150+" },
  { label: "Uptime", value: "99.99%" },
  { label: "Response Time", value: "<50ms" },
  { label: "Data Processed", value: "1PB+" },
]

export default function WikiHome() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-3xl font-bold">9Data API Documentation</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete documentation for the 9Data Private Data Processing API. 
          Build powerful data-driven applications with our secure, scalable infrastructure.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documentation..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Card key={link.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <link.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </div>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={link.href}>
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            API Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Base URL</h4>
            <Badge variant="outline" className="font-mono">https://api.9data.com/v1</Badge>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Supported Formats</h4>
            <div className="flex gap-2">
              <Badge>JSON</Badge>
              <Badge>XML</Badge>
              <Badge>CSV</Badge>
              <Badge>Protocol Buffers</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Authentication</h4>
            <div className="flex gap-2">
              <Badge variant="secondary">API Keys</Badge>
              <Badge variant="secondary">OAuth 2.0</Badge>
              <Badge variant="secondary">JWT</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Rate Limits</h4>
            <div className="text-sm text-muted-foreground">
              <p>Standard: 1,000 requests/hour</p>
              <p>Pro: 10,000 requests/hour</p>
              <p>Enterprise: Unlimited</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">v2.1.0</Badge>
              <span className="text-sm">Added webhook retry logic and improved error handling</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">v2.0.5</Badge>
              <span className="text-sm">New streaming endpoints for real-time data processing</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">v2.0.0</Badge>
              <span className="text-sm">Major release with enhanced security features</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}