import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Copy, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Heart
} from "lucide-react"

export const metadata: Metadata = {
  title: "Health Checks - 9Data API",
  description: "Monitor system health and service status",
}

const healthStatuses = [
  {
    status: "Healthy",
    description: "All systems operational",
    color: "text-green-500",
    icon: CheckCircle
  },
  {
    status: "Degraded",
    description: "Some services experiencing issues",
    color: "text-yellow-500",
    icon: AlertTriangle
  },
  {
    status: "Unhealthy",
    description: "Critical issues detected",
    color: "text-red-500",
    icon: XCircle
  }
]

export default function HealthPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Health Checks</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Monitor system health and service status with real-time health checks and status indicators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health Status Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {healthStatuses.map((status) => (
              <div key={status.status} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <status.icon className={`h-5 w-5 ${status.color}`} />
                  <h3 className="font-semibold">{status.status}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{status.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-green-500" />
              <code className="text-sm">GET /health</code>
              <Badge variant="outline">Overall health</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-green-500" />
              <code className="text-sm">GET /health/database</code>
              <Badge variant="outline">Database status</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-green-500" />
              <code className="text-sm">GET /health/external</code>
              <Badge variant="outline">External services</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}