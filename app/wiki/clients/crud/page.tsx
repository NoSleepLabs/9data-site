import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Copy, 
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Client CRUD - 9Data API",
  description: "Manage clients with Create, Read, Update, Delete operations",
}

const clientOperations = [
  {
    operation: "Create Client",
    method: "POST",
    endpoint: "/clients",
    description: "Register a new client in the system",
    icon: Plus
  },
  {
    operation: "List Clients",
    method: "GET",
    endpoint: "/clients",
    description: "Retrieve all clients with pagination",
    icon: Search
  },
  {
    operation: "Get Client",
    method: "GET",
    endpoint: "/clients/{id}",
    description: "Retrieve specific client details",
    icon: Search
  },
  {
    operation: "Update Client",
    method: "PUT",
    endpoint: "/clients/{id}",
    description: "Update client information",
    icon: Edit
  },
  {
    operation: "Delete Client",
    method: "DELETE",
    endpoint: "/clients/{id}",
    description: "Remove client from system",
    icon: Trash2
  }
]

const clientFields = [
  { name: "name", type: "string", required: true, description: "Client company name" },
  { name: "email", type: "email", required: true, description: "Contact email address" },
  { name: "phone", type: "string", required: false, description: "Contact phone number" },
  { name: "address", type: "object", required: false, description: "Client address" },
  { name: "status", type: "enum", required: false, description: "active, inactive, suspended" },
  { name: "tier", type: "enum", required: false, description: "free, pro, enterprise" }
]

export default function ClientCRUDPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Client CRUD Operations</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Complete client management with Create, Read, Update, and Delete operations. Manage your customer base efficiently with our comprehensive API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Operations</CardTitle>
          <CardDescription>Available CRUD operations for client management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientOperations.map((op) => (
              <div key={op.operation} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <op.icon className="h-5 w-5 text-primary" />
                  <Badge variant={op.method === 'GET' ? 'secondary' : 'default'}>
                    {op.method}
                  </Badge>
                  <code className="font-mono text-sm">{op.endpoint}</code>
                </div>
                <p className="text-sm text-muted-foreground">{op.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Data Model</CardTitle>
          <CardDescription>Client object structure and field specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clientFields.map((field) => (
              <div key={field.name} className="flex items-center gap-3 p-3 border rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm">{field.name}</code>
                    <Badge variant={field.required ? 'destructive' : 'secondary'} className="text-xs">
                      {field.required ? 'Required' : 'Optional'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{field.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}