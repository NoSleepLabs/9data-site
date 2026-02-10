import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Lock,
  Clock,
  User,
  Terminal
} from "lucide-react"
import { useState } from "react"

export const metadata: Metadata = {
  title: "API Keys - 9Data Authentication",
  description: "Managing API keys for 9Data API authentication",
}

const keyTypes = [
  {
    type: "Production",
    description: "Full access to all API endpoints",
    permissions: ["Read", "Write", "Delete", "Admin"],
    color: "destructive",
    icon: Shield
  },
  {
    type: "Development",
    description: "Limited access for testing and development",
    permissions: ["Read", "Write (limited)"],
    color: "secondary",
    icon: Terminal
  },
  {
    type: "Read-only",
    description: "Can only retrieve data, no modifications",
    permissions: ["Read"],
    color: "outline",
    icon: Eye
  }
]

const securityFeatures = [
  {
    title: "Automatic Rotation",
    description: "Keys automatically rotate every 90 days",
    icon: RefreshCw
  },
  {
    title: "IP Whitelisting",
    description: "Restrict API access to specific IP addresses",
    icon: Lock
  },
  {
    title: "Usage Monitoring",
    description: "Real-time monitoring of API key usage",
    icon: Eye
  },
  {
    title: "Instant Revocation",
    description: "Revoke keys immediately if compromised",
    icon: Shield
  }
]

const examples = {
  curl: {
    name: "cURL",
    code: `curl -X GET https://api.9data.com/v1/data/status \\
  -H "X-API-Key: 9data_prod_abc123def456..." \\
  -H "Content-Type: application/json"`
  },
  javascript: {
    name: "JavaScript",
    code: `const response = await fetch('https://api.9data.com/v1/data/status', {
  method: 'GET',
  headers: {
    'X-API-Key': '9data_prod_abc123def456...',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`
  },
  python: {
    name: "Python",
    code: `import requests

headers = {
    'X-API-Key': '9data_prod_abc123def456...',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.9data.com/v1/data/status',
    headers=headers
)

data = response.json()`
  }
}

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState(false)
  const [selectedKey, setSelectedKey] = useState("9data_prod_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz")

  const generateNewKey = () => {
    const newKey = "9data_prod_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setSelectedKey(newKey)
    setShowKey(true)
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-8 w-8" />
          <h1 className="text-3xl font-bold">API Keys</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Secure your API access with API keys. Learn how to create, manage, and secure your authentication credentials.
        </p>
      </div>

      {/* Key Types */}
      <div className="grid md:grid-cols-3 gap-6">
        {keyTypes.map((keyType) => (
          <Card key={keyType.type}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <keyType.icon className="h-5 w-5" />
                <CardTitle className="text-lg">{keyType.type}</CardTitle>
              </div>
              <CardDescription>{keyType.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Permissions:</h4>
                <div className="flex flex-wrap gap-2">
                  {keyType.permissions.map((permission) => (
                    <Badge key={permission} variant={keyType.color as any} className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Create {keyType.type} Key
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Generator Demo */}
      <Card>
        <CardHeader>
          <CardTitle>API Key Generator</CardTitle>
          <CardDescription>
            Generate a new API key for your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="font-mono text-sm bg-muted p-3 rounded-lg flex items-center gap-2">
                <span className={showKey ? "" : "blur-sm select-none"}>
                  {selectedKey}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(selectedKey)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={generateNewKey}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
            <Button variant="outline">
              Copy to Clipboard
            </Button>
          </div>
          {!showKey && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              Click the eye icon to reveal the API key
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            How to use API keys in different programming languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(examples).map(([key, example]) => (
                <TabsTrigger key={key} value={key}>{example.name}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(examples).map(([key, example]) => (
              <TabsContent key={key} value={key}>
                <div className="relative">
                  <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => navigator.clipboard.writeText(example.code)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Features
          </CardTitle>
          <CardDescription>
            Built-in security measures to protect your API keys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 p-3 border rounded-lg">
                <feature.icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>
            Keep your API keys secure and your applications protected
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Use Environment Variables</h4>
                <p className="text-sm text-muted-foreground">
                  Store API keys in environment variables, not in source code
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Rotate Keys Regularly</h4>
                <p className="text-sm text-muted-foreground">
                  Update API keys every 90 days or when team members leave
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Use Least Privilege</h4>
                <p className="text-sm text-muted-foreground">
                  Grant only the permissions necessary for each key
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Never Share Keys Publicly</h4>
                <p className="text-sm text-muted-foreground">
                  Don't commit API keys to Git repositories or share them publicly
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}