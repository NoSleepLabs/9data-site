import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Copy, 
  Github,
  Slack,
  Zap,
  Database,
  CheckCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Integration Guides - 9Data API",
  description: "Integration guides for popular platforms and tools",
}

const integrations = [
  {
    name: "Slack",
    description: "Receive notifications in Slack channels",
    icon: Slack,
    setup: "Create Slack app and configure webhook URL",
    features: ["Real-time notifications", "Channel routing", "Interactive buttons"]
  },
  {
    name: "GitHub",
    description: "Trigger processing from GitHub events",
    icon: Github,
    setup: "Configure GitHub Actions with 9Data API",
    features: ["CI/CD integration", "Dataset processing", "Automated workflows"]
  },
  {
    name: "Zapier",
    description: "Connect 1000+ apps with 9Data",
    icon: Zap,
    setup: "Use 9Data Zapier integration",
    features: ["No-code workflows", "Multi-app connections", "Automation rules"]
  },
  {
    name: "Custom Apps",
    description: "Build custom integrations",
    icon: Code,
    setup: "Use our SDKs and webhooks",
    features: ["Full API access", "Custom logic", "SDK support"]
  }
]

export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Integration Guides</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Learn how to integrate 9Data with popular platforms and tools. Build powerful workflows and automate your data processing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <integration.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{integration.name}</CardTitle>
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">Setup:</h4>
                <p className="text-sm text-muted-foreground">{integration.setup}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Features:</h4>
                <div className="space-y-1">
                  {integration.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}