import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  HardDrive, 
  Copy, 
  Download,
  Upload,
  Search,
  FolderOpen,
  FileText,
  Lock,
  CheckCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Storage API - 9Data API",
  description: "Store and retrieve data with the 9Data Storage API",
}

const storageFeatures = [
  {
    title: "Unlimited Storage",
    description: "Store unlimited amounts of data",
    icon: HardDrive
  },
  {
    title: "High Availability",
    description: "99.99% uptime guarantee",
    icon: CheckCircle
  },
  {
    title: "Secure Encryption",
    description: "AES-256 encryption at rest",
    icon: Lock
  },
  {
    title: "Fast Retrieval",
    description: "Millisecond access times",
    icon: Search
  }
]

const storageOperations = [
  {
    operation: "PUT /storage/files",
    method: "PUT",
    description: "Upload a file to storage",
    example: "Store processed results"
  },
  {
    operation: "GET /storage/files/{id}",
    method: "GET",
    description: "Retrieve a file from storage",
    example: "Download analytics reports"
  },
  {
    operation: "DELETE /storage/files/{id}",
    method: "DELETE",
    description: "Delete a file from storage",
    example: "Clean up old data"
  },
  {
    operation: "GET /storage/files",
    method: "GET",
    description: "List files in storage",
    example: "Browse available datasets"
  }
]

export default function StorageAPIPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <HardDrive className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Storage API</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Store, retrieve, and manage your data with our high-performance storage API. Perfect for archiving processed results and maintaining data repositories.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {storageFeatures.map((feature) => (
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
          <CardTitle>Storage Operations</CardTitle>
          <CardDescription>Available endpoints for file management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storageOperations.map((op) => (
              <div key={op.operation} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={op.method === 'GET' ? 'secondary' : 'default'}>
                    {op.method}
                  </Badge>
                  <code className="font-mono text-sm">{op.operation}</code>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{op.description}</p>
                <p className="text-xs text-primary">Example: {op.example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}