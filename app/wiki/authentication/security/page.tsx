import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Lock, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Key,
  RefreshCw,
  Globe,
  Users,
  Ban,
  Clock,
  Database,
  Server,
  FileText,
  Wifi,
  Monitor,
  Smartphone
} from "lucide-react"

export const metadata: Metadata = {
  title: "Security Best Practices - 9Data Authentication",
  description: "Security guidelines and best practices for 9Data API authentication",
}

const securityPrinciples = [
  {
    title: "Defense in Depth",
    description: "Multiple layers of security controls",
    icon: Shield,
    color: "text-blue-500"
  },
  {
    title: "Zero Trust",
    description: "Never trust, always verify",
    icon: Lock,
    color: "text-green-500"
  },
  {
    title: "Least Privilege",
    description: "Grant minimum necessary access",
    icon: Key,
    color: "text-purple-500"
  },
  {
    title: "Encryption Everywhere",
    description: "Encrypt data in transit and at rest",
    icon: Database,
    color: "text-orange-500"
  }
]

const bestPractices = [
  {
    category: "API Key Management",
    icon: Key,
    practices: [
      {
        title: "Use Environment Variables",
        description: "Store API keys in environment variables, not source code",
        level: "Critical",
        icon: AlertTriangle
      },
      {
        title: "Regular Key Rotation",
        description: "Rotate API keys every 90 days or when compromised",
        level: "High",
        icon: RefreshCw
      },
      {
        title: "Separate Keys by Environment",
        description: "Use different keys for development, staging, and production",
        level: "High",
        icon: Globe
      },
      {
        title: "Revoke Unused Keys",
        description: "Immediately revoke keys that are no longer needed",
        level: "Medium",
        icon: Ban
      }
    ]
  },
  {
    category: "Network Security",
    icon: Wifi,
    practices: [
      {
        title: "IP Whitelisting",
        description: "Restrict API access to known IP addresses only",
        level: "High",
        icon: Globe
      },
      {
        title: "VPN Required",
        description: "Require VPN for accessing sensitive endpoints",
        level: "Medium",
        icon: Shield
      },
      {
        title: "Firewall Rules",
        description: "Configure firewall rules to block unauthorized access",
        level: "Medium",
        icon: Server
      }
    ]
  },
  {
    category: "Application Security",
    icon: Monitor,
    practices: [
      {
        title: "HTTPS Only",
        description: "Enforce HTTPS for all API communications",
        level: "Critical",
        icon: Lock
      },
      {
        title: "Input Validation",
        description: "Validate and sanitize all user inputs",
        level: "High",
        icon: CheckCircle
      },
      {
        title: "Rate Limiting",
        description: "Implement rate limiting to prevent abuse",
        level: "Medium",
        icon: Clock
      }
    ]
  }
]

const threats = [
  {
    threat: "Man-in-the-Middle (MITM)",
    description: "Attackers intercepting communications between client and server",
    prevention: "Use HTTPS/TLS with certificate pinning",
    icon: Ban,
    severity: "High"
  },
  {
    threat: "API Key Leakage",
    description: "Accidental exposure of API keys in code, logs, or version control",
    prevention: "Use environment variables and secret management tools",
    icon: Key,
    severity: "Critical"
  },
  {
    threat: "Brute Force Attacks",
    description: "Automated attempts to guess API keys or credentials",
    prevention: "Implement rate limiting and account lockout",
    icon: AlertTriangle,
    severity: "Medium"
  },
  {
    threat: "Replay Attacks",
    description: "Captured legitimate requests being resent maliciously",
    prevention: "Use timestamps and nonces in requests",
    icon: RefreshCw,
    severity: "Medium"
  }
]

const compliance = [
  {
    standard: "SOC 2 Type II",
    description: "Service Organization Control 2 compliance",
    status: "Compliant",
    icon: CheckCircle
  },
  {
    standard: "GDPR",
    description: "General Data Protection Regulation",
    status: "Compliant",
    icon: CheckCircle
  },
  {
    standard: "ISO 27001",
    description: "Information security management",
    status: "In Progress",
    icon: Clock
  },
  {
    standard: "CCPA",
    description: "California Consumer Privacy Act",
    status: "Compliant",
    icon: CheckCircle
  }
]

const securityChecklist = [
  "Store API keys in secure environment variables",
  "Rotate keys every 90 days",
  "Implement HTTPS for all communications",
  "Use IP whitelisting where possible",
  "Monitor API usage for anomalies",
  "Implement proper error handling without exposing sensitive data",
  "Use OAuth 2.0 for user-based authentication",
  "Validate all input data",
  "Implement rate limiting",
  "Regular security audits and penetration testing",
  "Keep dependencies up to date",
  "Use logging and monitoring for security events"
]

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Security Best Practices</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Learn how to secure your 9Data API integration with industry-standard security practices and guidelines.
        </p>
      </div>

      {/* Security Principles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityPrinciples.map((principle) => (
          <Card key={principle.title}>
            <CardContent className="pt-6 text-center">
              <principle.icon className={`h-12 w-12 mx-auto mb-4 ${principle.color}`} />
              <h3 className="font-semibold">{principle.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{principle.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Best Practices by Category */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Security Best Practices</h2>
        {bestPractices.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.practices.map((practice) => (
                  <div key={practice.title} className="flex items-start gap-3 p-3 border rounded-lg">
                    <practice.icon className={`h-5 w-5 mt-0.5 ${
                      practice.level === 'Critical' ? 'text-red-500' :
                      practice.level === 'High' ? 'text-orange-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{practice.title}</h4>
                        <Badge variant={
                          practice.level === 'Critical' ? 'destructive' :
                          practice.level === 'High' ? 'default' : 'secondary'
                        } className="text-xs">
                          {practice.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{practice.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Threats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Security Threats
          </CardTitle>
          <CardDescription>
            Understanding potential threats and how to prevent them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {threats.map((threat) => (
              <div key={threat.threat} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <threat.icon className={`h-5 w-5 mt-0.5 ${
                    threat.severity === 'Critical' ? 'text-red-500' :
                    threat.severity === 'High' ? 'text-orange-500' : 'text-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{threat.threat}</h4>
                      <Badge variant={
                        threat.severity === 'Critical' ? 'destructive' :
                        threat.severity === 'High' ? 'default' : 'secondary'
                      } className="text-xs">
                        {threat.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded p-2">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Prevention: {threat.prevention}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Standards */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Certifications</CardTitle>
          <CardDescription>
            Our commitment to security standards and regulations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {compliance.map((item) => (
              <div key={item.standard} className="flex items-center gap-3 p-3 border rounded-lg">
                <item.icon className={`h-5 w-5 ${
                  item.status === 'Compliant' ? 'text-green-500' : 'text-yellow-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.standard}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant={item.status === 'Compliant' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Security Checklist
          </CardTitle>
          <CardDescription>
            Essential security measures to implement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {securityChecklist.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Security Monitoring
          </CardTitle>
          <CardDescription>
            Real-time security monitoring and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Monitor className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">24/7 Monitoring</h3>
              <p className="text-sm text-muted-foreground">Continuous monitoring of all API activity</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Real-time Alerts</h3>
              <p className="text-sm text-muted-foreground">Instant notifications for security events</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Audit Logs</h3>
              <p className="text-sm text-muted-foreground">Complete audit trail of all activities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}