import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  Copy, 
  CheckCircle,
  Clock,
  Database,
  BarChart3,
  Zap,
  Play,
  Pause,
  Square,
  Settings
} from "lucide-react"

export const metadata: Metadata = {
  title: "Batch Processing - 9Data API",
  description: "Process large datasets efficiently with batch processing",
}

const batchFeatures = [
  {
    title: "Scalable Processing",
    description: "Handle datasets from GB to PB scale",
    icon: Database
  },
  {
    title: "Parallel Execution",
    description: "Distributed processing for faster completion",
    icon: Zap
  },
  {
    title: "Cost Optimization",
    description: "Reduce costs with efficient resource utilization",
    icon: BarChart3
  },
  {
    title: "Progress Tracking",
    description: "Real-time monitoring of batch jobs",
    icon: Activity
  }
]

const jobTypes = [
  {
    type: "ETL",
    description: "Extract, Transform, Load operations",
    useCase: "Data warehouse updates",
    duration: "Hours"
  },
  {
    type: "Analytics",
    description: "Statistical analysis and reporting",
    useCase: "Business intelligence",
    duration: "Minutes to Hours"
  },
  {
    type: "ML Training",
    description: "Machine learning model training",
    useCase: "Predictive analytics",
    duration: "Hours to Days"
  },
  {
    type: "Data Cleanup",
    description: "Data quality and deduplication",
    useCase: "Data governance",
    duration: "Minutes"
  }
]

export default function BatchProcessingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Batch Processing</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Process large datasets efficiently with our distributed batch processing system. Perfect for ETL operations, analytics, and machine learning workloads.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {batchFeatures.map((feature) => (
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
          <CardTitle>Batch Job Types</CardTitle>
          <CardDescription>Different processing types for various use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {jobTypes.map((job) => (
              <div key={job.type} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{job.type}</h3>
                  <Badge variant="outline">{job.duration}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{job.description}</p>
                <p className="text-xs text-primary">Use case: {job.useCase}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}