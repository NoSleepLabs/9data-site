import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Lock, 
  Copy, 
  CheckCircle,
  Users,
  Shield,
  Key,
  Eye,
  Settings,
  Ban
} from "lucide-react"

export const metadata: Metadata = {
  title: "Client Permissions - 9Data API",
  description: "Manage client permissions and access control",
}

const permissionLevels = [
  {
    level: "Owner",
    description: "Full administrative access to all resources",
    color: "destructive",
    permissions: ["Create", "Read", "Update", "Delete", "Admin", "Billing"],
    icon: Shield
  },
  {
    level: "Admin",
    description: "Administrative access except billing",
    color: "default",
    permissions: ["Create", "Read", "Update", "Delete", "Admin"],
    icon: Settings
  },
  {
    level: "Editor",
    description: "Can create and modify resources",
    color: "secondary",
    permissions: ["Create", "Read", "Update"],
    icon: Edit
  },
  {
    level: "Viewer",
    description: "Read-only access to resources",
    color: "outline",
    permissions: ["Read"],
    icon: Eye
  }
]

const resourceTypes = [
  {
    resource: "Data Processing",
    permissions: ["Upload", "Process", "Download", "Delete"],
    description: "Access to data processing endpoints"
  },
  {
    resource: "Storage",
    permissions: ["Read", "Write", "Delete", "List"],
    description: "File storage and retrieval access"
  },
  {
    resource: "Analytics",
    permissions: ["View", "Export", "Configure"],
    description: "Analytics and reporting access"
  },
  {
    resource: "User Management",
    permissions: ["Create", "Update", "Delete", "Invite"],
    description: "Team and user management"
  },
  {
    resource: "Billing",
    permissions: ["View", "Update", "Payment"],
    description: "Billing and subscription management"
  }
]

export default function ClientPermissionsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Client Permissions</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Manage client permissions and access control with granular role-based permissions. Ensure secure access to resources based on user roles.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {permissionLevels.map((level) => (
          <Card key={level.level}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <level.icon className="h-5 w-5" />
                <CardTitle className="text-lg">{level.level}</CardTitle>
              </div>
              <CardDescription>{level.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {level.permissions.map((permission) => (
                  <Badge key={permission} variant={level.color as any} className="text-xs mr-1">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Permissions</CardTitle>
          <CardDescription>Available permissions for different resource types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resourceTypes.map((resource) => (
              <div key={resource.resource} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{resource.resource}</h3>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <div className="flex flex-wrap gap-2">
                  {resource.permissions.map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}