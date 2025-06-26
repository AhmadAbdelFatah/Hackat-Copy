import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, CloudRain, DollarSign, AlertTriangle, Clock, FileText, Activity } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "rainfall_check",
    title: "Rainfall check completed",
    description: "8.5mm recorded - below 12mm threshold",
    timestamp: "2 hours ago",
    status: "warning",
    icon: CloudRain,
    details: "Flowering Stage Policy monitoring",
  },
  {
    id: 2,
    type: "rainfall_check",
    title: "Rainfall check completed",
    description: "7.2mm recorded - below 12mm threshold",
    timestamp: "1 day ago",
    status: "warning",
    icon: CloudRain,
    details: "Day 1 of consecutive dry spell",
  },
  {
    id: 3,
    type: "premium_payment",
    title: "Premium payment confirmed",
    description: "$18.00 for Full Season Policy",
    timestamp: "1 day ago",
    status: "success",
    icon: DollarSign,
    details: "Transaction hash: 0x1234...5678",
  },
  {
    id: 4,
    type: "policy_activation",
    title: "Policy activated",
    description: "Flowering Stage Insurance now active",
    timestamp: "3 days ago",
    status: "success",
    icon: Shield,
    details: "Coverage period: Jan 15 - Feb 5, 2024",
  },
  {
    id: 5,
    type: "payout_issued",
    title: "Payout issued",
    description: "$325.00 for Full Season Policy",
    timestamp: "1 week ago",
    status: "success",
    icon: DollarSign,
    details: "Drought trigger: 7 consecutive days below threshold",
  },
  {
    id: 6,
    type: "rainfall_check",
    title: "Rainfall check completed",
    description: "18.4mm recorded - above threshold",
    timestamp: "1 week ago",
    status: "success",
    icon: CloudRain,
    details: "Good rainfall levels maintained",
  },
  {
    id: 7,
    type: "subscription_approved",
    title: "Subscription approved",
    description: "Flowering Stage Insurance approved by admin",
    timestamp: "2 weeks ago",
    status: "success",
    icon: CheckCircle,
    details: "Admin: Sarah Mwale",
  },
  {
    id: 8,
    type: "subscription_request",
    title: "Subscription request submitted",
    description: "Applied for Flowering Stage Insurance",
    timestamp: "2 weeks ago",
    status: "info",
    icon: FileText,
    details: "Pending admin review",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-emerald-50 border-emerald-200"
    case "warning":
      return "bg-orange-50 border-orange-200"
    case "error":
      return "bg-red-50 border-red-200"
    case "info":
      return "bg-blue-50 border-blue-200"
    default:
      return "bg-gray-50 border-gray-200"
  }
}

const getIconColor = (status: string) => {
  switch (status) {
    case "success":
      return "text-emerald-600 bg-emerald-100"
    case "warning":
      return "text-orange-600 bg-orange-100"
    case "error":
      return "text-red-600 bg-red-100"
    case "info":
      return "text-blue-600 bg-blue-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

export default function ActivityPage() {
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
                <p className="text-xs text-gray-600">Farmer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Farmer
              </Badge>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <Link href="/farmer" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Overview
              </Link>
              <Link href="/farmer/rainfall" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Rainfall
              </Link>
              <Link href="/farmer/claims" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Claims
              </Link>
              <Link href="/farmer/policies" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Policies
              </Link>
              <Link
                href="/farmer/activity"
                className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-900"
              >
                Activity
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Log</h1>
          <p className="text-gray-600">Complete history of your account activity and system events</p>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CloudRain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-sm text-gray-600">Rainfall Checks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                  <p className="text-sm text-gray-600">Payouts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Policies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">31</p>
                  <p className="text-sm text-gray-600">Total Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-900">Recent Activity</CardTitle>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export Log
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={activity.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border ${getStatusColor(activity.status)}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(activity.status)}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                      {activity.details && <p className="text-xs text-gray-500">{activity.details}</p>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-6">
              <Button variant="outline">Load More Activities</Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Types Legend */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Activity Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CloudRain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Rainfall Checks</p>
                    <p className="text-sm text-gray-600">Daily weather monitoring</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payments & Payouts</p>
                    <p className="text-sm text-gray-600">Premium payments and claim payouts</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Policy Events</p>
                    <p className="text-sm text-gray-600">Subscriptions and activations</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">System Alerts</p>
                    <p className="text-sm text-gray-600">Drought warnings and notifications</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
