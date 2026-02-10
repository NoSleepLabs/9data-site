import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Copy, 
  Download,
  CheckCircle,
  Terminal
} from "lucide-react"

export const metadata: Metadata = {
  title: "Go SDK - 9Data API",
  description: "Official Go SDK for 9Data API",
}

const installation = {
  go_get: "go get github.com/9data/api-go",
  go_mod: "require github.com/9data/api-go v1.0.0"
}

const features = [
  "Go 1.18+ support",
  "Context-based cancellation", 
  "Strong typing",
  "Connection pooling",
  "Goroutine-safe",
  "Automatic retries"
]

export default function GoSDKPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Go SDK</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Official Go SDK for the 9Data API. Built with performance and concurrency in mind.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">go get</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.go_get}</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">go.mod</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.go_mod}</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}