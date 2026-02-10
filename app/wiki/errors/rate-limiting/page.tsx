import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  Copy, 
  CheckCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Shield
} from "lucide-react"

export const metadata: Metadata = {
  title: "Rate Limiting - 9Data API",
  description: "Understanding rate limits and how to handle them",
}

const rateLimitTiers = [
  {
    tier: "Free",
    requests: "1,000",
    window: "hour",
    burst: "100/minute",
    features: ["Basic endpoints", "Community support"],
    color: "secondary"
  },
  {
    tier: "Pro",
    requests: "10,000",
    window: "hour",
    burst: "500/minute",
    features: ["All endpoints", "Priority support", "Advanced features"],
    color: "default"
  },
  {
    tier: "Enterprise",
    requests: "Unlimited",
    window: "custom",
    burst: "Custom",
    features: ["Custom limits", "Dedicated support", "SLA guarantee"],
    color: "destructive"
  }
]

const bestPractices = [
  {
    practice: "Implement Exponential Backoff",
    description: "Use exponential backoff when encountering rate limits"
  },
  {
    practice: "Cache Responses",
    description: "Cache API responses when possible to reduce requests"
  },
  {
    practice: "Batch Operations",
    description: "Combine multiple operations into single requests"
  },
  {
    practice: "Monitor Usage",
    description: "Track your API usage to avoid hitting limits"
  }
]

export default function RateLimitingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Rate Limiting</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Understand rate limits across different subscription tiers and learn how to handle them gracefully in your applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rate Limit Tiers</CardTitle>
          <CardDescription>API rate limits by subscription tier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {rateLimitTiers.map((tier) => (
              <Card key={tier.tier}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{tier.tier}</CardTitle>
                  <CardDescription>{tier.requests} requests/{tier.window}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Burst Rate:</span>
                    <Badge variant="outline" className="ml-2">{tier.burst}</Badge>
                  </div>
                  <div className="space-y-1">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>How to handle rate limits effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {bestPractices.map((practice) => (
              <div key={practice.practice} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{practice.practice}</h3>
                <p className="text-sm text-muted-foreground">{practice.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}