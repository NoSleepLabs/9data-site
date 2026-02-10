import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Webhook, 
  Copy, 
  CheckCircle,
  Settings,
  Bell,
  Link,
  Lock
} from "lucide-react"

export const metadata: Metadata = {
  title: "Webhook Setup - 9Data API",
  description: "Configure webhooks for real-time notifications",
}

export default function WebhookSetupPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Webhook className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Webhook Setup</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Configure webhooks to receive real-time notifications about data processing events, status changes, and system updates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Endpoint URL</h3>
              <p className="text-sm text-muted-foreground mb-2">Your server endpoint to receive webhook events</p>
              <code className="bg-muted px-2 py-1 rounded text-sm">https://yourapp.com/webhook/9data</code>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">Secure your webhooks with signature verification</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">HMAC-SHA256</Badge>
                <Badge variant="outline">Bearer Token</Badge>
                <Badge variant="outline">IP Whitelist</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}