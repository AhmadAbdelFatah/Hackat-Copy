import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, FileText, DollarSign, AlertTriangle, CheckCircle, Clock, Eye, Check, X } from "lucide-react"

const pendingSubscriptions = [
  {
    id: "SUB-2024-015",
    farmerName: "James Phiri",
    farmId: "MW-002-2024",
    location: "Blantyre District",
    farmSize: "1.8 hectares",
    policyType: "Flowering Stage Insurance",
    premium: "$9.00",
    submittedDate: "Jan 20, 2024",
    status: "pending",
  },
  {
    id: "SUB-2024-016",
    farmerName: "Grace Mbewe",
    farmId: "MW-003-2024",
    location: "Lilongwe District",
    farmSize: "3.2 hectares",
    policyType: "Full Season Insurance",
    premium: "$41.60",
    submittedDate: "Jan 19, 2024",
    status: "pending",
  },
  {
    id: "SUB-2024-017",
    farmerName: "Peter Kachingwe",
    farmId: "MW-004-2024",
    location: "Mzuzu District",
    farmSize: "2.1 hectares",
    policyType: "Grain Filling Insurance",
    premium: "$9.45",
    submittedDate: "Jan 18, 2024",
    status: "pending",
  },
]

const recentPayouts = [
  {
    id: "PAY-2024-008",
    farmerName: "John Banda",
    policyType: "Full Season Insurance",
    amount: "$325.00",
    trigger: "7 consecutive days below threshold",
    processedDate: "Jan 15, 2024",
    status: "completed",
  },
  {
    id: "PAY-2024-007",
    farmerName: "Mary Tembo",
    policyType: "Flowering Stage Insurance",
    amount: "$87.50",
    trigger: "3 consecutive days below threshold",
    processedDate: "Jan 12, 2024",
    status: "completed",
  },
]

export default function AdminDashboard() {
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
              className="flex items-center space-x-3 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
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
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>System Status</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage farmers, policies, and system operations</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Active Farmers</CardTitle>
                    <Users className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">127</div>
                  <p className="text-emerald-100">+12 this month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Active Policies</CardTitle>
                    <Shield className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">284</div>
                  <p className="text-blue-100">Across all farmers</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Pending Reviews</CardTitle>
                    <Clock className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">3</div>
                  <p className="text-purple-100">Require attention</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Total Payouts</CardTitle>
                    <DollarSign className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">$45.2K</div>
                  <p className="text-teal-100">This season</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Subscriptions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">Pending Subscriptions</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {pendingSubscriptions.length} pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingSubscriptions.map((subscription) => (
                      <div key={subscription.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{subscription.farmerName}</h3>
                            <p className="text-sm text-gray-600">
                              {subscription.farmId} • {subscription.location}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-600">Policy:</span>
                            <p className="font-medium">{subscription.policyType}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Premium:</span>
                            <p className="font-medium">{subscription.premium}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Submitted {subscription.submittedDate}</span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Link href="/admin/subscriptions">
                      <Button variant="outline" className="w-full">
                        View All Subscriptions
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Payouts */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900">Recent Payouts</CardTitle>
                    <Link href="/admin/payouts">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayouts.map((payout) => (
                      <div key={payout.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{payout.farmerName}</h3>
                            <p className="text-sm text-gray-600">{payout.policyType}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-600">{payout.amount}</p>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Trigger:</strong> {payout.trigger}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Processed {payout.processedDate}</span>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card className="border-0 shadow-lg mt-8">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Chainlink Oracles</h3>
                    <p className="text-emerald-600 font-medium">Operational</p>
                    <p className="text-sm text-gray-600">Last update: 5 minutes ago</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
                    <p className="text-emerald-600 font-medium">Operational</p>
                    <p className="text-sm text-gray-600">Gas price: 25 gwei</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Weather APIs</h3>
                    <p className="text-emerald-600 font-medium">Operational</p>
                    <p className="text-sm text-gray-600">Response time: 120ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
