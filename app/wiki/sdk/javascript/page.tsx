import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Copy, 
  Download,
  CheckCircle,
  Github,
  Npm
} from "lucide-react"

export const metadata: Metadata = {
  title: "JavaScript SDK - 9Data API",
  description: "Official JavaScript/Node.js SDK for 9Data API",
}

const installation = {
  npm: "npm install @9data/api",
  yarn: "yarn add @9data/api",
  cdn: '<script src="https://cdn.jsdelivr.net/npm/@9data/api"></script>'
}

const features = [
  "TypeScript support",
  "Promise-based API", 
  "Automatic retries",
  "Error handling",
  "Streaming support",
  "Browser and Node.js compatible"
]

export default function JavaScriptSDKPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-8 w-8" />
          <h1 className="text-3xl font-bold">JavaScript/Node.js SDK</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Official JavaScript SDK for the 9Data API. Works in both browser and Node.js environments with full TypeScript support.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">npm</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.npm}</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">yarn</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.yarn}</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">CDN</h4>
              <code className="bg-muted px-2 py-1 rounded text-sm">{installation.cdn}</code>
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