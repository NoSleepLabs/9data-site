import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Terminal,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap
} from "lucide-react"

export const metadata: Metadata = {
  title: "Developer Console - 9Data",
  description: "Developer tools and console for 9Data platform",
}

const devTools = [
  {
    title: "API Explorer",
    description: "Interactive API testing tool",
    status: "Coming Soon",
    icon: Terminal
  },
  {
    title: "Database Manager",
    description: "Browse and manage your databases",
    status: "Coming Soon", 
    icon: Code
  },
  {
    title: "Real-time Logs",
    description: "Live application logs and monitoring",
    status: "Coming Soon",
    icon: Zap
  },
  {
    title: "Performance Analytics",
    description: "Detailed performance metrics and insights",
    status: "Coming Soon",
    icon: Clock
  }
]

export default function DevPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Developer Console</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Access powerful developer tools and utilities for managing your 9Data projects. 
          Interactive console for debugging, testing, and monitoring your applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Tools</CardTitle>
          <CardDescription>
            Interactive developer utilities for the 9Data platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {devTools.map((tool) => (
              <div key={tool.title} className="border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{tool.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {tool.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Early Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The developer console is currently in development. Features will be rolling out over the coming weeks:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">API Explorer (Week 1)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Database Manager (Week 2)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Real-time Logs (Week 3)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Performance Analytics (Week 4)</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">
                Want early access? Join our developer beta program.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}