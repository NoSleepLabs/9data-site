import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  Copy, 
  CheckCircle,
  XCircle,
  RefreshCw,
  Lock
} from "lucide-react"

export const metadata: Metadata = {
  title: "Error Codes - 9Data API",
  description: "Complete list of API error codes and their meanings",
}

const errorCategories = [
  {
    category: "Authentication Errors (4xx)",
    errors: [
      { code: "401", message: "Unauthorized", description: "Invalid or missing API key" },
      { code: "403", message: "Forbidden", description: "Insufficient permissions" },
      { code: "401001", message: "Invalid API Key", description: "API key format is invalid" },
      { code: "401002", message: "Expired API Key", description: "API key has expired" }
    ]
  },
  {
    category: "Request Errors (4xx)",
    errors: [
      { code: "400", message: "Bad Request", description: "Invalid request parameters" },
      { code: "404", message: "Not Found", description: "Resource does not exist" },
      { code: "413", message: "Payload Too Large", description: "File size exceeds limit" },
      { code: "422", message: "Unprocessable Entity", description: "Invalid data format" }
    ]
  },
  {
    category: "Rate Limiting (4xx)",
    errors: [
      { code: "429", message: "Too Many Requests", description: "Rate limit exceeded" },
      { code: "429001", message: "Daily Limit", description: "Daily request limit exceeded" },
      { code: "429002", message: "Burst Limit", description: "Burst rate limit exceeded" }
    ]
  },
  {
    category: "Server Errors (5xx)",
    errors: [
      { code: "500", message: "Internal Server Error", description: "Server encountered error" },
      { code: "502", message: "Bad Gateway", description: "Upstream service error" },
      { code: "503", message: "Service Unavailable", description: "Service temporarily down" },
      { code: "504", message: "Gateway Timeout", description: "Request timeout" }
    ]
  }
]

export default function ErrorCodesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Error Codes</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Complete reference for all API error codes. Understand what each error means and how to handle them in your applications.
        </p>
      </div>

      <div className="space-y-6">
        {errorCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>Error codes and their descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.errors.map((error) => (
                  <div key={error.code} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={
                        error.code.startsWith('5') ? 'destructive' :
                        error.code.startsWith('4') ? 'default' : 'secondary'
                      }>
                        {error.code}
                      </Badge>
                      <h3 className="font-semibold">{error.message}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{error.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}