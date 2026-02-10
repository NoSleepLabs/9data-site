"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  Copy, 
  FileText,
  HardDrive,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Database,
  Settings,
  ArrowRight,
  Download,
  BarChart3
} from "lucide-react"



const supportedFormats = [
  {
    format: "CSV",
    description: "Comma-separated values",
    maxSize: "1GB",
    features: ["Structured data", " Widely supported", "Fast processing"]
  },
  {
    format: "JSON",
    description: "JavaScript Object Notation",
    maxSize: "500MB",
    features: ["Nested data", "Schema flexible", "API-friendly"]
  },
  {
    format: "XML",
    description: "Extensible Markup Language",
    maxSize: "500MB",
    features: ["Hierarchical data", "Schema validation", "Enterprise standard"]
  },
  {
    format: "Excel",
    description: "Microsoft Excel files",
    maxSize: "100MB",
    features: ["Multiple sheets", "Rich formatting", "Business data"]
  },
  {
    format: "Parquet",
    description: "Apache Parquet format",
    maxSize: "5GB",
    features: ["Columnar storage", "Compression", "Big data optimized"]
  }
]

const processingTypes = [
  {
    type: "standard",
    description: "Basic data validation and processing",
    speed: "Fast",
    cost: "$0.01/MB",
    features: ["Data validation", "Format conversion", "Basic transformations"]
  },
  {
    type: "advanced",
    description: "Complex data processing with AI-powered insights",
    speed: "Medium",
    cost: "$0.05/MB",
    features: ["AI analysis", "Advanced transformations", "Pattern detection"]
  },
  {
    type: "realtime",
    description: "Real-time streaming data processing",
    speed: "Instant",
    cost: "$0.10/MB",
    features: ["Live processing", "Stream analytics", "Real-time alerts"]
  }
]

const uploadExample = {
  curl: {
    name: "cURL",
    code: `curl -X POST https://api.9data.com/v1/data/upload \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@data.csv" \\
  -F "processing_type=standard" \\
  -F "metadata={\\"source\\":\\"sales\\",\\"department\\":\\"marketing\\"}" \\
  -F "notification_webhook=https://yourapp.com/webhook"`
  },
  javascript: {
    name: "JavaScript",
    code: `const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('processing_type', 'advanced');
formData.append('metadata', JSON.stringify({
  source: 'sales',
  department: 'marketing'
}));

const response = await fetch('https://api.9data.com/v1/data/upload', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your_api_key_here'
  },
  body: formData
});

const result = await response.json();`
  },
  python: {
    name: "Python",
    code: `import requests

files = {'file': open('data.csv', 'rb')}
data = {
    'processing_type': 'standard',
    'metadata': '{"source": "sales", "department": "marketing"}'
}

response = requests.post(
    'https://api.9data.com/v1/data/upload',
    files=files,
    data=data,
    headers={'X-API-Key': 'your_api_key_here'}
)

result = response.json()`
  }
}

const uploadResponse = {
  job_id: "job_1234567890abcdef",
  status: "uploaded",
  file_size: 1048576,
  records_detected: 5000,
  processing_type: "standard",
  estimated_completion: "2024-01-15T10:35:00Z",
  created_at: "2024-01-15T10:30:00Z",
  metadata: {
    source: "sales",
    department: "marketing"
  }
}

const uploadSteps = [
  {
    title: "Prepare Your Data",
    description: "Ensure your data is in a supported format and properly structured",
    icon: FileText
  },
  {
    title: "Choose Processing Type",
    description: "Select the appropriate processing type for your needs",
    icon: Settings
  },
  {
    title: "Upload File",
    description: "Send your file to the upload endpoint with proper authentication",
    icon: Upload
  },
  {
    title: "Monitor Progress",
    description: "Track processing status and receive completion notifications",
    icon: BarChart3
  }
]

export default function DataUploadPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Data Upload</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Upload your data files for secure processing. Supports multiple formats with flexible processing options tailored to your needs.
        </p>
      </div>

      {/* Upload Steps */}
      <div className="grid md:grid-cols-4 gap-4">
        {uploadSteps.map((step, index) => (
          <div key={index} className="relative">
            <Card className="h-full">
              <CardContent className="pt-6 text-center">
                <step.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
            {index < uploadSteps.length - 1 && (
              <ArrowRight className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Supported File Formats
          </CardTitle>
          <CardDescription>
            Upload data in various formats with automatic processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedFormats.map((format) => (
              <div key={format.format} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{format.format}</h3>
                  <Badge variant="outline">{format.maxSize}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{format.description}</p>
                <div className="space-y-1">
                  {format.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Processing Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Processing Types
          </CardTitle>
          <CardDescription>
            Choose the processing level that matches your requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {processingTypes.map((type) => (
              <Card key={type.type} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">{type.type}</CardTitle>
                    <Badge variant={type.type === 'standard' ? 'secondary' : 'default'}>
                      {type.speed}
                    </Badge>
                  </div>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-2xl font-bold text-primary">{type.cost}</div>
                  <div className="space-y-2">
                    {type.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Examples</CardTitle>
          <CardDescription>
            Code examples for uploading data in different languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(uploadExample).map(([key, example]) => (
                <TabsTrigger key={key} value={key}>{example.name}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(uploadExample).map(([key, example]) => (
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

      {/* Response Format */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Upload Response
          </CardTitle>
          <CardDescription>
            Structure of the response after successful upload
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-sm overflow-x-auto">
              <code>{JSON.stringify(uploadResponse, null, 2)}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(uploadResponse, null, 2))}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>
            Tips for optimal data upload and processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Compress Large Files</h4>
                <p className="text-sm text-muted-foreground">
                  Use gzip compression for files over 100MB to reduce upload time.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Validate Before Upload</h4>
                <p className="text-sm text-muted-foreground">
                  Check data format and structure before uploading to avoid errors.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Monitor Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Use webhooks or polling to track processing status and completion.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-semibold">Handle Timeouts</h4>
                <p className="text-sm text-muted-foreground">
                  Set appropriate timeout values for large file uploads.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}