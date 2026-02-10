import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Copy, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Wrench
} from "lucide-react"

export const metadata: Metadata = {
  title: "Troubleshooting - 9Data API",
  description: "Common issues and solutions for 9Data API",
}

const troubleshootingCategories = [
  {
    category: "Authentication Issues",
    problems: [
      {
        problem: "API Key Not Working",
        solution: "Verify key format and check if key is active",
        steps: ["Check API key in dashboard", "Ensure key has correct permissions", "Verify key is not expired"]
      },
      {
        problem: "403 Forbidden Error",
        solution: "Check permissions and rate limits",
        steps: ["Review user permissions", "Check rate limit status", "Verify IP whitelist settings"]
      }
    ]
  },
  {
    category: "Data Processing Issues",
    problems: [
      {
        problem: "File Upload Fails",
        solution: "Check file format and size limits",
        steps: ["Verify supported file format", "Check file size under limit", "Ensure file is not corrupted"]
      },
      {
        problem: "Processing Takes Too Long",
        solution: "Optimize data and check processing type",
        steps: ["Use appropriate processing type", "Check file size vs expected time", "Monitor job status"]
      }
    ]
  },
  {
    category: "Performance Issues",
    problems: [
      {
        problem: "Slow API Response",
        solution: "Check network and optimize requests",
        steps: ["Test network connectivity", "Use compression", "Implement caching"]
      }
    ]
  }
]

export default function TroubleshootingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Troubleshooting</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Find solutions to common issues with the 9Data API. Step-by-step guides to resolve authentication, processing, and performance problems.
        </p>
      </div>

      <div className="space-y-6">
        {troubleshootingCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>Common problems and their solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.problems.map((problem) => (
                  <div key={problem.problem} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{problem.problem}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{problem.solution}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Steps to resolve:</h4>
                      <ul className="space-y-1">
                        {problem.steps.map((step, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
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