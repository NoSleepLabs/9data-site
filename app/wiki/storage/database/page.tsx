import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  Copy, 
  Search,
  Edit,
  Trash2,
  Plus,
  Table,
  BarChart3
} from "lucide-react"

export const metadata: Metadata = {
  title: "Database Operations - 9Data API",
  description: "Manage databases and perform CRUD operations with the 9Data API",
}

const dbOperations = [
  {
    operation: "Create",
    method: "POST",
    icon: Plus,
    description: "Create new records in database tables",
    endpoint: "/db/{table}/create"
  },
  {
    operation: "Read",
    method: "GET", 
    icon: Search,
    description: "Query and retrieve database records",
    endpoint: "/db/{table}/read"
  },
  {
    operation: "Update",
    method: "PUT",
    icon: Edit,
    description: "Modify existing database records",
    endpoint: "/db/{table}/update"
  },
  {
    operation: "Delete",
    method: "DELETE",
    icon: Trash2,
    description: "Remove records from database",
    endpoint: "/db/{table}/delete"
  }
]

const supportedDatabases = [
  {
    name: "PostgreSQL",
    type: "Relational",
    features: ["ACID compliance", "Complex queries", "Full-text search"]
  },
  {
    name: "MongoDB",
    type: "NoSQL",
    features: ["Flexible schema", "Horizontal scaling", "Aggregation framework"]
  },
  {
    name: "Redis",
    type: "Key-Value",
    features: ["In-memory", "High performance", "Data structures"]
  },
  {
    name: "ClickHouse",
    type: "Columnar",
    features: ["Analytics optimized", "Fast aggregates", "Compression"]
  }
]

export default function DatabasePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Database className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Database Operations</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Perform CRUD operations on multiple database types. Support for relational, NoSQL, and in-memory databases with unified API.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {dbOperations.map((op) => (
          <Card key={op.operation}>
            <CardContent className="pt-6 text-center">
              <op.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <Badge variant={op.method === 'GET' ? 'secondary' : 'default'} className="mb-2">
                {op.method}
              </Badge>
              <h3 className="font-semibold mb-2">{op.operation}</h3>
              <p className="text-sm text-muted-foreground">{op.description}</p>
              <code className="text-xs font-mono mt-2 block">{op.endpoint}</code>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supported Databases</CardTitle>
          <CardDescription>Database engines we support with unified API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {supportedDatabases.map((db) => (
              <div key={db.name} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{db.name}</h3>
                  <Badge variant="outline">{db.type}</Badge>
                </div>
                <div className="space-y-1">
                  {db.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
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