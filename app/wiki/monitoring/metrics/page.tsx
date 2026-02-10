import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Copy, 
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Metrics API - 9Data API",
  description: "Monitor system performance and API metrics",
}

export default function MetricsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Metrics API</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Monitor system performance and API usage with comprehensive metrics and real-time analytics.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">API Metrics</h3>
              <ul className="space-y-1 text-sm">
                <li>• Request count by endpoint</li>
                <li>• Average response time</li>
                <li>• Error rates</li>
                <li>• Active connections</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">System Metrics</h3>
              <ul className="space-y-1 text-sm">
                <li>• CPU usage</li>
                <li>• Memory consumption</li>
                <li>• Disk I/O</li>
                <li>• Network throughput</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}