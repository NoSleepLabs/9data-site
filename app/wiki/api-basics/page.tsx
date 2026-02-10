import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Copy, 
  CheckCircle, 
  XCircle,
  Info,
  AlertTriangle,
  Globe,
  Database,
  Shield,
  Clock,
  Zap
} from "lucide-react"

export const metadata: Metadata = {
  title: "API Basics - 9Data API",
  description: "Understanding the fundamentals of the 9Data API",
}

const apiStructure = {
  baseInfo: {
    url: "https://api.9data.com/v1",
    protocol: "HTTPS",
    format: "JSON",
    encoding: "UTF-8"
  },
  headers: [
    { name: "X-API-Key", required: true, description: "Your API authentication key" },
    { name: "Content-Type", required: true, description: "application/json for requests" },
    { name: "Accept", required: false, description: "application/json for responses" },
    { name: "X-Request-ID", required: false, description: "Unique request identifier for tracing" },
  ],
  methods: [
    { method: "GET", description: "Retrieve data or resources" },
    { method: "POST", description: "Create new resources or trigger operations" },
    { method: "PUT", description: "Update existing resources completely" },
    { method: "PATCH", description: "Partial updates to resources" },
    { method: "DELETE", description: "Remove resources" },
  ]
}

const responseCodes = [
  { code: "200", meaning: "OK", description: "Request successful", icon: CheckCircle },
  { code: "201", meaning: "Created", description: "Resource successfully created", icon: CheckCircle },
  { code: "204", meaning: "No Content", description: "Request successful, no content returned", icon: CheckCircle },
  { code: "400", meaning: "Bad Request", description: "Invalid request parameters", icon: XCircle },
  { code: "401", meaning: "Unauthorized", description: "Invalid or missing authentication", icon: XCircle },
  { code: "403", meaning: "Forbidden", description: "Insufficient permissions", icon: XCircle },
  { code: "404", meaning: "Not Found", description: "Resource does not exist", icon: XCircle },
  { code: "429", meaning: "Too Many Requests", description: "Rate limit exceeded", icon: AlertTriangle },
  { code: "500", meaning: "Internal Server Error", description: "Server error occurred", icon: XCircle },
]

const rateLimits = [
  { tier: "Free", requests: "1,000", window: "hour", features: ["Basic endpoints", "Community support"] },
  { tier: "Pro", requests: "10,000", window: "hour", features: ["All endpoints", "Priority support", "Advanced features"] },
  { tier: "Enterprise", requests: "Unlimited", window: "hour", features: ["Custom limits", "Dedicated support", "SLA guarantee"] },
]

const exampleRequests = {
  getData: {
    title: "Get Data Status",
    method: "GET",
    url: "https://api.9data.com/v1/data/status/{job_id}",
    headers: {
      "X-API-Key": "your_api_key_here",
      "Accept": "application/json"
    },
    response: `{
  "id": "job_1234567890",
  "status": "processing",
  "progress": 75,
  "created_at": "2024-01-15T10:30:00Z",
  "estimated_completion": "2024-01-15T10:35:00Z",
  "records_processed": 75000,
  "total_records": 100000
}`
  },
  postData: {
    title: "Upload Data",
    method: "POST",
    url: "https://api.9data.com/v1/data/upload",
    headers: {
      "X-API-Key": "your_api_key_here",
      "Content-Type": "application/json"
    },
    body: `{
  "file_url": "https://example.com/data.csv",
  "processing_type": "standard",
  "notification_webhook": "https://your-app.com/webhook",
  "metadata": {
    "source": "customer_db",
    "department": "analytics"
  }
}`,
    response: `{
  "job_id": "job_1234567890",
  "status": "queued",
  "estimated_processing_time": "5 minutes",
  "file_size": 1024000,
  "records_detected": 5000
}`
  }
}

export default function APIBasics() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-8 w-8" />
          <h1 className="text-3xl font-bold">API Basics</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Understand the fundamental concepts of the 9Data API including endpoints, authentication, request formats, and responses.
        </p>
      </div>

      {/* API Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="font-mono text-sm">https://api.9data.com/v1</div>
            <div className="text-xs text-muted-foreground">Base URL</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="font-mono text-sm">JSON</div>
            <div className="text-xs text-muted-foreground">Response Format</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="font-mono text-sm">HTTPS</div>
            <div className="text-xs text-muted-foreground">Protocol</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="font-mono text-sm">&lt;50ms</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </CardContent>
        </Card>
      </div>

      {/* Request Structure */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Required Headers</CardTitle>
            <CardDescription>Headers needed for API requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {apiStructure.headers.map((header) => (
                <div key={header.name} className="flex items-center gap-3">
                  <div className="font-mono text-sm bg-muted px-2 py-1 rounded">{header.name}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{header.description}</span>
                      {header.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HTTP Methods</CardTitle>
            <CardDescription>Supported HTTP methods and their usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {apiStructure.methods.map((item) => (
                <div key={item.method} className="flex items-center gap-3">
                  <Badge variant={item.method === 'GET' ? 'secondary' : 'default'}>
                    {item.method}
                  </Badge>
                  <span className="text-sm">{item.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Codes */}
      <Card>
        <CardHeader>
          <CardTitle>HTTP Status Codes</CardTitle>
          <CardDescription>Understanding API response codes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {responseCodes.map((code) => (
              <div key={code.code} className="flex items-start gap-3 p-3 rounded-lg border">
                <code.icon className={`h-5 w-5 mt-0.5 ${
                  code.code.startsWith('2') ? 'text-green-500' : 
                  code.code.startsWith('4') ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{code.code}</Badge>
                    <span className="font-semibold text-sm">{code.meaning}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{code.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Request Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Request Examples</CardTitle>
          <CardDescription>Common API request patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="getData" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="getData">Get Data Status</TabsTrigger>
              <TabsTrigger value="postData">Upload Data</TabsTrigger>
            </TabsList>
            {Object.entries(exampleRequests).map(([key, example]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={example.method === 'GET' ? 'secondary' : 'default'}>
                      {example.method}
                    </Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{example.url}</code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Headers</h4>
                    <pre className="bg-muted rounded-lg p-3 text-sm overflow-x-auto">
                      <code>{JSON.stringify(example.headers, null, 2)}</code>
                    </pre>
                  </div>
                  
                  {example.body && (
                    <div>
                      <h4 className="font-semibold mb-2">Request Body</h4>
                      <pre className="bg-muted rounded-lg p-3 text-sm overflow-x-auto">
                        <code>{example.body}</code>
                      </pre>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold mb-2">Response</h4>
                    <pre className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm overflow-x-auto">
                      <code>{example.response}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Rate Limits
          </CardTitle>
          <CardDescription>API rate limits by plan tier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rateLimits.map((tier) => (
              <div key={tier.tier} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{tier.tier} Plan</h3>
                  <Badge variant="outline">{tier.requests} requests/{tier.window}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}