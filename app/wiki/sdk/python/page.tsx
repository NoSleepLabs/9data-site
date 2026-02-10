import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Copy, 
  Download,
  CheckCircle,
  Package
} from "lucide-react"

export const metadata: Metadata = {
  title: "Python SDK - 9Data API",
  description: "Official Python SDK for 9Data API",
}

const installation = {
  pip: "pip install 9data-api",
  pipenv: "pipenv install 9data-api",
  poetry: "poetry add 9data-api"
}

const features = [
  "Python 3.7+ support",
  "Async/await support", 
  "Type hints",
  "Automatic retries",
  "Context managers",
  "Dataclasses support"
]

export default function PythonSDKPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Python SDK</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Official Python SDK for the 9Data API. Full async support with type hints and modern Python features.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">pip</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.pip}</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">pipenv</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.pipenv}</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">poetry</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.poetry}</code>
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