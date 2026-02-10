import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  Copy, 
  Upload,
  Download,
  Users,
  Settings,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Webhook Events - 9Data API",
  description: "Available webhook events and their payloads",
}

const eventCategories = [
  {
    category: "Data Processing",
    events: [
      { name: "data.uploaded", description: "Data file uploaded successfully" },
      { name: "data.processing", description: "Data processing started" },
      { name: "data.completed", description: "Data processing completed" },
      { name: "data.failed", description: "Data processing failed" }
    ],
    icon: Upload
  },
  {
    category: "Client Management",
    events: [
      { name: "client.created", description: "New client registered" },
      { name: "client.updated", description: "Client information updated" },
      { name: "client.deleted", description: "Client account deleted" }
    ],
    icon: Users
  },
  {
    category: "System Events",
    events: [
      { name: "system.maintenance", description: "Scheduled maintenance" },
      { name: "system.alert", description: "System alert or warning" },
      { name: "system.backup", description: "Backup completed" }
    ],
    icon: Settings
  }
]

export default function WebhookEventsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Webhook Events</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Explore all available webhook events and their payload structures to integrate real-time notifications into your applications.
        </p>
      </div>

      <div className="space-y-6">
        {eventCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-primary" />
                <CardTitle>{category.category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {category.events.map((event) => (
                  <div key={event.name} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="font-mono text-sm">{event.name}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
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