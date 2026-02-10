import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  Zap, 
  Play,
  BarChart3,
  Wifi,
  Activity,
  CheckCircle,
  AlertTriangle,
  Globe
} from "lucide-react"

export const metadata: Metadata = {
  title: "Real-time Processing - 9Data API",
  description: "Stream and process data in real-time with 9Data",
}

const realtimeFeatures = [
  {
    title: "Sub-second Latency",
    description: "Process data in milliseconds",
    icon: Zap
  },
  {
    title: "Continuous Streaming",
    description: "Handle unlimited data streams",
    icon: Activity
  },
  {
    title: "Auto-scaling",
    description: "Scale resources automatically",
    icon: BarChart3
  },
  {
    title: "Global Distribution",
    description: "Process data close to source",
    icon: Globe
  }
]

const streamSources = [
  {
    source: "IoT Devices",
    throughput: "10K events/sec",
    latency: "&lt;100ms",
    useCase: "Sensor data processing"
  },
  {
    source: "Web Analytics",
    throughput: "100K events/sec",
    latency: "&lt;50ms",
    useCase: "Real-time user behavior"
  },
  {
    source: "Financial Data",
    throughput: "1M trades/sec",
    latency: "&lt;10ms",
    useCase: "Trading algorithms"
  },
  {
    source: "Social Media",
    throughput: "500K posts/sec",
    latency: "&lt;200ms",
    useCase: "Trend analysis"
  }
]

export default function RealtimePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Real-time Processing</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Process data streams in real-time with millisecond latency. Perfect for IoT, analytics, and time-sensitive applications.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {realtimeFeatures.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-6 text-center">
              <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stream Sources</CardTitle>
          <CardDescription>Supported data sources and their capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {streamSources.map((source) => (
              <div key={source.source} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{source.source}</h3>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-sm">
                    <span className="font-medium">Throughput:</span> {source.throughput}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Latency:</span> {source.latency}
                  </div>
                </div>
                <p className="text-xs text-primary">{source.useCase}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}