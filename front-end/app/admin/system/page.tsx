import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Users,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Server,
  Database,
  Wifi,
  Zap,
  RefreshCw,
} from "lucide-react"

const systemComponents = [
  {
    name: "Chainlink Oracles",
    status: "operational",
    uptime: "99.9%",
    lastUpdate: "2 minutes ago",
    description: "Weather data feeds and price oracles",
    metrics: {
      responseTime: "120ms",
      dataPoints: "1,247",
      accuracy: "99.8%",
    },
  },
  {
    name: "Smart Contracts",
    status: "operational",
    uptime: "100%",
    lastUpdate: "1 minute ago",
    description: "Policy management and payout automation",
    metrics: {
      gasPrice: "25 gwei",
      transactions: "1,834",
      success: "99.9%",
    },
  },
  {
    name: "Weather APIs",
    status: "operational",
    uptime: "99.7%",
    lastUpdate: "30 seconds ago",
    description: "Multiple weather data providers",
    metrics: {
      responseTime: "85ms",
      providers: "3 active",
      coverage: "100%",
    },
  },
  {
    name: "Database Cluster",
    status: "warning",
    uptime: "99.5%",
    lastUpdate: "5 minutes ago",
    description: "User data and transaction history",
    metrics: {
      storage: "78% used",
      queries: "45,231",
      latency: "12ms",
    },
  },
  {
    name: "Payment Gateway",
    status: "operational",
    uptime: "99.8%",
    lastUpdate: "1 minute ago",
    description: "Premium collection and payout processing",
    metrics: {
      transactions: "234",
      volume: "$12,450",
      fees: "2.1%",
    },
  },
  {
    name: "Notification Service",
    status: "degraded",
    uptime: "97.2%",
    lastUpdate: "15 minutes ago",
    description: "SMS and email notifications to farmers",
    metrics: {
      sent: "1,456",
      delivered: "94.2%",
      failed: "84",
    },
  },
]

const recentAlerts = [
  {
    id: "ALT-001",
    type: "warning",
    component: "Database Cluster",
    message: "Storage usage above 75% threshold",
    timestamp: "5 minutes ago",
    status: "active",
  },
  {
    id: "ALT-002",
    type: "error",
    component: "Notification Service",
    message: "SMS delivery rate below 95%",
    timestamp: "15 minutes ago",
    status: "investigating",
  },
  {
    id: "ALT-003",
    type: "info",
    component: "Smart Contracts",
    message: "Gas price optimization completed",
    timestamp: "1 hour ago",
    status: "resolved",
  },
]

export default function SystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RainSure</h1>
                <p className="text-xs text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Shield className="w-3 h-3 mr-1" />
                Admin Access
              </Badge>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-sm border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Users className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/subscriptions"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <FileText className="w-5 h-5" />
              <span>Subscriptions</span>
            </Link>
            <Link
              href="/admin/policies"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Shield className="w-5 h-5" />
              <span>Policy Templates</span>
            </Link>
            <Link
              href="/admin/payouts"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <DollarSign className="w-5 h-5" />
              <span>Payout History</span>
            </Link>
            <Link
              href="/admin/system"
              className="flex items-center space-x-3 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">System Status</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">System Status</h1>
                  <p className="text-gray-600">Monitor system health and performance</p>
                </div>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Status
                </Button>
              </div>
            </div>

            {/* Overall Status */}
            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">All Systems Operational</h2>
                      <p className="text-gray-600">6 components monitored • 2 minor issues</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">99.2% Uptime</Badge>
                </div>
                <Progress value={99.2} className="h-2" />
              </CardContent>
            </Card>

            {/* System Components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {systemComponents.map((component, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            component.status === "operational"
                              ? "bg-emerald-100"
                              : component.status === "warning"
                                ? "bg-orange-100"
                                : "bg-red-100"
                          }`}
                        >
                          {component.name.includes("Oracle") && (
                            <Wifi
                              className={`w-5 h-5 ${
                                component.status === "operational"
                                  ? "text-emerald-600"
                                  : component.status === "warning"
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                            />
                          )}
                          {component.name.includes("Contract") && (
                            <Zap
                              className={`w-5 h-5 ${
                                component.status === "operational"
                                  ? "text-emerald-600"
                                  : component.status === "warning"
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                            />
                          )}
                          {component.name.includes("API") && (
                            <Activity
                              className={`w-5 h-5 ${
                                component.status === "operational"
                                  ? "text-emerald-600"
                                  : component.status === "warning"
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                            />
                          )}
                          {component.name.includes("Database") && (
                            <Database
                              className={`w-5 h-5 ${
                                component.status === "operational"
                                  ? "text-emerald-600"
                                  : component.status === "warning"
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                            />
                          )}
                          {component.name.includes("Payment") && (
                            <DollarSign
                              className={`w-5 h-5 ${
                                component.status === "operational"
                                  ? "text-emerald-600"
                                  : component.status === "warning"
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                            />
                          )}
                          {component.name.includes("Notification") && (
                            <Server
                              className={`w-5 h-5 ${
                                component.status === "operational"
                                  ? "text-emerald-600"
                                  : component.status === "warning"
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-900">{component.name}</CardTitle>
                          <p className="text-sm text-gray-600">{component.description}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          component.status === "operational"
                            ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                            : component.status === "warning"
                              ? "text-orange-600 border-orange-200 bg-orange-50"
                              : "text-red-600 border-red-200 bg-red-50"
                        }
                      >
                        {component.status === "operational" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {component.status === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {component.status === "degraded" && <Clock className="w-3 h-3 mr-1" />}
                        {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uptime:</span>
                        <span className="font-medium">{component.uptime}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        {Object.entries(component.metrics).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t text-xs text-gray-500">
                        <span>Last updated {component.lastUpdate}</span>
                        <Button size="sm" variant="outline">
                          View Logs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Alerts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              alert.type === "error"
                                ? "bg-red-100"
                                : alert.type === "warning"
                                  ? "bg-orange-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            {alert.type === "error" && <AlertTriangle className="w-4 h-4 text-red-600" />}
                            {alert.type === "warning" && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                            {alert.type === "info" && <CheckCircle className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{alert.component}</h3>
                            <p className="text-sm text-gray-600">{alert.message}</p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            alert.status === "resolved"
                              ? "text-emerald-600 border-emerald-200"
                              : alert.status === "investigating"
                                ? "text-orange-600 border-orange-200"
                                : "text-red-600 border-red-200"
                          }
                        >
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
