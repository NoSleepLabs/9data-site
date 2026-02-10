import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Zap, 
  CheckCircle, 
  Copy, 
  Terminal,
  Code,
  Rocket,
  Clock,
  Shield
} from "lucide-react"

export const metadata: Metadata = {
  title: "Quick Start - 9Data API",
  description: "Get started with the 9Data API in minutes",
}

const steps = [
  {
    title: "Get Your API Key",
    description: "Sign up and generate your API key from the dashboard",
    code: `curl -X POST https://api.9data.com/v1/auth/api-key \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`
  },
  {
    title: "Make Your First Request",
    description: "Test the API with a simple health check",
    code: `curl -X GET https://api.9data.com/v1/health \\
  -H "X-API-Key: your_api_key_here"`
  },
  {
    title: "Upload Your First Dataset",
    description: "Upload and process your first dataset",
    code: `curl -X POST https://api.9data.com/v1/data/upload \\
  -H "X-API-Key: your_api_key_here" \\
  -F "file=@dataset.csv" \\
  -F "processing_type=standard"`
  }
]

const languageExamples = {
  javascript: {
    name: "JavaScript/Node.js",
    install: "npm install @9data/api",
    code: `const { NineDataAPI } = require('@9data/api');

const client = new NineDataAPI({
  apiKey: 'your_api_key_here'
});

async function uploadData() {
  try {
    const result = await client.data.upload('./dataset.csv', {
      processingType: 'standard'
    });
    console.log('Upload successful:', result.id);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}`
  },
  python: {
    name: "Python",
    install: "pip install 9data-api",
    code: `import nine_data

client = nine_data.NineDataAPI(api_key='your_api_key_here')

try:
    result = client.data.upload('dataset.csv', 
                              processing_type='standard')
    print(f'Upload successful: {result.id}')
except Exception as e:
    print(f'Upload failed: {e}')`
  },
  curl: {
    name: "cURL",
    install: "Pre-installed on most systems",
    code: `# Upload data using cURL
curl -X POST https://api.9data.com/v1/data/upload \\
  -H "X-API-Key: your_api_key_here" \\
  -F "file=@dataset.csv" \\
  -F "processing_type=standard"

# Check processing status
curl -X GET https://api.9data.com/v1/data/status/{job_id} \\
  -H "X-API-Key: your_api_key_here"`
  }
}

const features = [
  { icon: Rocket, title: "Fast Setup", description: "Get running in under 5 minutes" },
  { icon: Shield, title: "Secure by Default", description: "Enterprise-grade security built-in" },
  { icon: Clock, title: "Real-time Processing", description: "Process data as it arrives" },
]

export default function QuickStart() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Quick Start Guide</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get up and running with the 9Data API in minutes. Follow these simple steps to start processing your data.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-6 text-center">
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started in 3 Easy Steps</CardTitle>
          <CardDescription>
            Follow these steps to make your first API call
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <div className="relative">
                <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{step.code}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => navigator.clipboard.writeText(step.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {index < steps.length - 1 && <div className="border-l-2 border-muted ml-4 h-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language Examples */}
      <Card>
        <CardHeader>
          <CardTitle>SDK Examples</CardTitle>
          <CardDescription>
            Use our official SDKs for your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(languageExamples).map(([key, lang]) => (
                <TabsTrigger key={key} value={key}>{lang.name}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(languageExamples).map(([key, lang]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Installation</h4>
                  <div className="bg-muted rounded-lg p-3">
                    <code className="text-sm">{lang.install}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Example Code</h4>
                  <div className="relative">
                    <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{lang.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => navigator.clipboard.writeText(lang.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-semibold">Explore Authentication</h4>
                <p className="text-sm text-muted-foreground">Learn about API keys and OAuth 2.0</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-semibold">Data Processing Guide</h4>
                <p className="text-sm text-muted-foreground">Master data upload and processing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-semibold">Webhook Integration</h4>
                <p className="text-sm text-muted-foreground">Set up real-time notifications</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-semibold">Error Handling</h4>
                <p className="text-sm text-muted-foreground">Handle API errors gracefully</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}