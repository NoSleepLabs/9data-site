import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Copy, 
  CheckCircle,
  ArrowRight,
  Filter,
  Shuffle,
  Calculator,
  FileText,
  Database
} from "lucide-react"

export const metadata: Metadata = {
  title: "Data Transformation - 9Data API",
  description: "Transform and enrich your data with powerful processing capabilities",
}

const transformationTypes = [
  {
    type: "Format Conversion",
    description: "Convert between CSV, JSON, XML, Parquet",
    icon: FileText
  },
  {
    type: "Data Cleaning",
    description: "Remove duplicates, fix errors, standardize",
    icon: Filter
  },
  {
    type: "Enrichment",
    description: "Add missing data, validate values",
    icon: Database
  },
  {
    type: "Aggregation",
    description: "Group, sum, average, statistical operations",
    icon: Calculator
  },
  {
    type: "Normalization",
    description: "Standardize formats, normalize data",
    icon: Shuffle
  }
]

const transformationRules = [
  {
    rule: "Date Formatting",
    input: "2024-01-15",
    output: "January 15, 2024",
    description: "Convert dates to preferred format"
  },
  {
    rule: "Currency Conversion",
    input: "$1,234.56",
    output: 1234.56,
    description: "Extract numeric value from currency"
  },
  {
    rule: "Text Normalization",
    input: "  HELLO  World  ",
    output: "Hello World",
    description: "Trim whitespace and normalize case"
  },
  {
    rule: "Email Validation",
    input: "user@example.com",
    output: "valid@example.com",
    description: "Validate and clean email addresses"
  }
]

export default function DataTransformationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Data Transformation</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Transform your data with powerful processing capabilities. Clean, enrich, and normalize your datasets for better analysis and insights.
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {transformationTypes.map((type) => (
          <Card key={type.type}>
            <CardContent className="pt-6 text-center">
              <type.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-sm">{type.type}</h3>
              <p className="text-xs text-muted-foreground mt-2">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transformation Examples</CardTitle>
          <CardDescription>Common data transformation rules and their effects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {transformationRules.map((rule) => (
              <div key={rule.rule} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{rule.rule}</h3>
                <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Input:</span>
                    <code className="bg-muted px-2 py-1 rounded text-sm">{rule.input}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Output:</span>
                    <code className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 px-2 py-1 rounded text-sm">{rule.output}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}