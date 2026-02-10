import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Copy, 
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Client Analytics - 9Data API",
  description: "Analyze client behavior and performance metrics",
}

const analyticsMetrics = [
  {
    category: "Usage Analytics",
    metrics: [
      { name: "API Calls", description: "Total API requests per client" },
      { name: "Data Volume", description: "Amount of data processed" },
      { name: "Active Sessions", description: "Concurrent active sessions" },
      { name: "Peak Usage", description: "Highest usage periods" }
    ],
    icon: Activity
  },
  {
    category: "Performance Analytics",
    metrics: [
      { name: "Response Times", description: "Average API response time" },
      { name: "Error Rates", description: "Percentage of failed requests" },
      { name: "Throughput", description: "Requests per second" },
      { name: "Latency", description: "Network and processing latency" }
    ],
    icon: TrendingUp
  },
  {
    category: "Business Analytics",
    metrics: [
      { name: "Revenue", description: "Revenue generated per client" },
      { name: "Retention", description: "Client retention rates" },
      { name: "Growth", description: "Client growth metrics" },
      { name: "Churn", description: "Client churn analysis" }
    ],
    icon: DollarSign
  }
]

const timeRanges = [
  { range: "Last Hour", granularity: "Minutes" },
  { range: "Last 24 Hours", granularity: "Hours" },
  { range: "Last 7 Days", granularity: "Days" },
  { range: "Last 30 Days", granularity: "Days" },
  { range: "Last Quarter", granularity: "Weeks" },
  { range: "Last Year", granularity: "Months" }
]

export default function ClientAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Client Analytics</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Gain insights into client behavior and performance with comprehensive analytics. Track usage, performance, and business metrics to optimize services.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {analyticsMetrics.map((category) => (
          <Card key={category.category}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.metrics.map((metric) => (
                  <div key={metric.name} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <div>
                      <div className="font-medium text-sm">{metric.name}</div>
                      <div className="text-xs text-muted-foreground">{metric.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Time Range Options</CardTitle>
          <CardDescription>Available time ranges for analytics data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {timeRanges.map((time) => (
              <div key={time.range} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-1">{time.range}</h3>
                <p className="text-sm text-muted-foreground">Granularity: {time.granularity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}