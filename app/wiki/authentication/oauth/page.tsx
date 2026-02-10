"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Lock, 
  Copy, 
  ExternalLink,
  Shield,
  Users,
  RefreshCw,
  Key,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react"



const oauthFlow = [
  {
    step: 1,
    title: "Authorization Request",
    description: "Redirect user to 9Data authorization endpoint",
    endpoint: "GET https://auth.9data.com/oauth/authorize",
    params: {
      "response_type": "code",
      "client_id": "your_client_id",
      "redirect_uri": "https://yourapp.com/callback",
      "scope": "read write",
      "state": "random_string"
    }
  },
  {
    step: 2,
    title: "User Authorization",
    description: "User logs in and grants permissions",
    endpoint: "User interaction in browser",
    params: {}
  },
  {
    step: 3,
    title: "Authorization Code",
    description: "Receive authorization code via redirect",
    endpoint: "Redirect to your redirect_uri",
    params: {
      "code": "auth_code_here",
      "state": "random_string"
    }
  },
  {
    step: 4,
    title: "Access Token Exchange",
    description: "Exchange authorization code for access token",
    endpoint: "POST https://auth.9data.com/oauth/token",
    params: {
      "grant_type": "authorization_code",
      "client_id": "your_client_id",
      "client_secret": "your_client_secret",
      "code": "auth_code_here",
      "redirect_uri": "https://yourapp.com/callback"
    }
  }
]

const scopes = [
  {
    name: "read",
    description: "Read access to data and resources",
    category: "Basic"
  },
  {
    name: "write",
    description: "Create and modify resources",
    category: "Basic"
  },
  {
    name: "delete",
    description: "Delete resources and data",
    category: "Advanced"
  },
  {
    name: "admin",
    description: "Full administrative access",
    category: "Admin"
  },
  {
    name: "webhooks",
    description: "Manage webhooks and integrations",
    category: "Advanced"
  },
  {
    name: "analytics",
    description: "Access analytics and metrics",
    category: "Basic"
  }
]

const tokenResponse = {
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  token_type: "Bearer",
  expires_in: 3600,
  refresh_token: "def50200...refresh_token_here...",
  scope: "read write"
}

const examples = {
  authorizationUrl: {
    name: "Authorization URL",
    language: "url",
    code: `https://auth.9data.com/oauth/authorize?
  response_type=code&
  client_id=your_client_id&
  redirect_uri=https://yourapp.com/callback&
  scope=read%20write&
  state=xyz123abc`
  },
  tokenExchange: {
    name: "Token Exchange",
    language: "curl",
    code: `curl -X POST https://auth.9data.com/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=authorization_code" \\
  -d "client_id=your_client_id" \\
  -d "client_secret=your_client_secret" \\
  -d "code=auth_code_here" \\
  -d "redirect_uri=https://yourapp.com/callback"`
  },
  apiCall: {
    name: "API Call with Token",
    language: "curl",
    code: `curl -X GET https://api.9data.com/v1/data/status \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
  -H "Content-Type: application/json"`
  },
  refreshToken: {
    name: "Refresh Token",
    language: "curl",
    code: `curl -X POST https://auth.9data.com/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=refresh_token" \\
  -d "client_id=your_client_id" \\
  -d "client_secret=your_client_secret" \\
  -d "refresh_token=def50200...refresh_token_here..."`
  }
}

export default function OAuthPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-8 w-8" />
          <h1 className="text-3xl font-bold">OAuth 2.0 Authentication</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Implement secure OAuth 2.0 authentication for your applications. Allow users to grant access to their 9Data resources without sharing credentials.
        </p>
      </div>

      {/* OAuth Flow Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            OAuth 2.0 Authorization Code Flow
          </CardTitle>
          <CardDescription>
            Standard OAuth 2.0 flow for web applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {oauthFlow.map((step, index) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold">
                    {step.step}
                  </div>
                  {index < oauthFlow.length - 1 && (
                    <div className="w-px h-16 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="font-mono text-xs text-muted-foreground mb-1">{step.endpoint}</div>
                    {Object.keys(step.params).length > 0 && (
                      <pre className="text-xs overflow-x-auto">
                        <code>{JSON.stringify(step.params, null, 2)}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scopes */}
      <Card>
        <CardHeader>
          <CardTitle>Available Scopes</CardTitle>
          <CardDescription>
            Define the level of access your application requires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scopes.map((scope) => (
              <div key={scope.name} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{scope.name}</Badge>
                  <Badge variant={scope.category === 'Admin' ? 'destructive' : 'secondary'} className="text-xs">
                    {scope.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{scope.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Token Response */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Token Response
          </CardTitle>
          <CardDescription>
            Structure of the access token response
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-sm overflow-x-auto">
              <code>{JSON.stringify(tokenResponse, null, 2)}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(tokenResponse, null, 2))}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Access Token</h4>
              <p className="text-sm text-muted-foreground">
                JWT token for API authentication. Valid for 1 hour.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Refresh Token</h4>
              <p className="text-sm text-muted-foreground">
                Used to obtain new access tokens without user interaction.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Examples</CardTitle>
          <CardDescription>
            Code examples for implementing OAuth 2.0
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="authorizationUrl" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {Object.entries(examples).map(([key, example]) => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  {example.name}
                </TabsTrigger>
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

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Use HTTPS Only</h4>
                <p className="text-sm text-muted-foreground">
                  Always use HTTPS for OAuth endpoints to prevent token interception.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Validate State Parameter</h4>
                <p className="text-sm text-muted-foreground">
                  Prevent CSRF attacks by validating the state parameter.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Secure Token Storage</h4>
                <p className="text-sm text-muted-foreground">
                  Store tokens securely and never log them to files or databases.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Implement Token Refresh</h4>
                <p className="text-sm text-muted-foreground">
                  Use refresh tokens to maintain sessions without user re-authentication.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Registration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Register Your Application
          </CardTitle>
          <CardDescription>
            Get your OAuth 2.0 credentials from the 9Data developer dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold mb-2">Required Information:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Application name and description</li>
                <li>• Redirect URI (must be HTTPS)</li>
                <li>• Application logo (optional)</li>
                <li>• Privacy policy URL</li>
                <li>• Terms of service URL</li>
              </ul>
            </div>
            <Button className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Developer Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}