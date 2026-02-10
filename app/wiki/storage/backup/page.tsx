import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Copy, 
  Clock,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react"

export const metadata: Metadata = {
  title: "Backup & Recovery - 9Data API",
  description: "Automated backup and disaster recovery for your data",
}

const backupFeatures = [
  {
    title: "Automated Backups",
    description: "Schedule automatic backups daily, weekly, or monthly",
    icon: Clock
  },
  {
    title: "Point-in-Time Recovery",
    description: "Restore data to any specific point in time",
    icon: RefreshCw
  },
  {
    title: "Cross-Region Replication",
    description: "Replicate backups across multiple regions",
    icon: Upload
  },
  {
    title: "Instant Restore",
    description: "Restore data instantly from backup snapshots",
    icon: Download
  }
]

const backupTypes = [
  {
    type: "Full Backup",
    frequency: "Weekly",
    retention: "90 days",
    rto: "4 hours",
    rpo: "24 hours"
  },
  {
    type: "Incremental",
    frequency: "Daily",
    retention: "30 days",
    rto: "2 hours",
    rpo: "24 hours"
  },
  {
    type: "Continuous",
    frequency: "Real-time",
    retention: "7 days",
    rto: "15 minutes",
    rpo: "5 minutes"
  }
]

export default function BackupPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Backup & Recovery</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Protect your data with automated backups and disaster recovery. Ensure business continuity with comprehensive backup solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {backupFeatures.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-6 text-center">
              <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backup Strategies</CardTitle>
          <CardDescription>Different backup approaches for various needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {backupTypes.map((backup) => (
              <Card key={backup.type}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{backup.type}</CardTitle>
                  <CardDescription>{backup.frequency}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Retention:</span>
                    <span className="text-sm">{backup.retention}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">RTO:</span>
                    <span className="text-sm">{backup.rto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">RPO:</span>
                    <span className="text-sm">{backup.rpo}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}