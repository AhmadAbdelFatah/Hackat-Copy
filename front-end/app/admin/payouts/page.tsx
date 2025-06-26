import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Search,
  Download,
  TrendingUp,
} from "lucide-react"

const payouts = [
  {
    id: "PAY-2024-008",
    farmerName: "John Banda",
    farmId: "MW-005-2024",
    location: "Zomba District",
    policyType: "Full Season Insurance",
    amount: "$325.00",
    trigger: "7 consecutive days below threshold",
    processedDate: "Jan 15, 2024",
    status: "completed",
    transactionHash: "0x1234...5678",
  },
  {
    id: "PAY-2024-007",
    farmerName: "Mary Tembo",
    farmId: "MW-001-2024",
    location: "Kasungu District",
    policyType: "Flowering Stage Insurance",
    amount: "$87.50",
    trigger: "3 consecutive days below threshold",
    processedDate: "Jan 12, 2024",
    status: "completed",
    transactionHash: "0x2345...6789",
  },
  {
    id: "PAY-2024-006",
    farmerName: "David Mwale",
    farmId: "MW-007-2024",
    location: "Mchinji District",
    policyType: "Grain Filling Insurance",
    amount: "$156.75",
    trigger: "5 consecutive days below threshold during grain filling",
    processedDate: "Jan 10, 2024",
    status: "completed",
    transactionHash: "0x3456...7890",
  },
  {
    id: "PAY-2024-005",
    farmerName: "Sarah Phiri",
    farmId: "MW-008-2024",
    location: "Ntcheu District",
    policyType: "Full Season Insurance",
    amount: "$412.30",
    trigger: "Extended drought period detected",
    processedDate: "Jan 8, 2024",
    status: "completed",
    transactionHash: "0x4567...8901",
  },
  {
    id: "PAY-2024-004",
    farmerName: "Robert Nyirenda",
    farmId: "MW-009-2024",
    location: "Dedza District",
    policyType: "Flowering Stage Insurance",
    amount: "$95.25",
    trigger: "Weather station data confirmed threshold breach",
    processedDate: "Jan 5, 2024",
    status: "pending",
    transactionHash: null,
  },
]

export default function PayoutsPage() {
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
              className="flex items-center space-x-3 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg"
            >
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Payout History</span>
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Payout History</h1>
                  <p className="text-gray-600">Track and manage insurance payouts</p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Payouts</p>
                      <p className="text-2xl font-bold text-gray-900">$45,234</p>
                      <p className="text-xs text-emerald-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">4</p>
                      <p className="text-xs text-gray-500 mt-1">This month</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">1</p>
                      <p className="text-xs text-orange-600 mt-1">Requires review</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Payout</p>
                      <p className="text-2xl font-bold text-gray-900">$215</p>
                      <p className="text-xs text-gray-500 mt-1">Per claim</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search by farmer name or payout ID..." className="pl-10" />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Policies</SelectItem>
                      <SelectItem value="full">Full Season Insurance</SelectItem>
                      <SelectItem value="flowering">Flowering Stage Insurance</SelectItem>
                      <SelectItem value="grain">Grain Filling Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payouts List */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Recent Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payouts.map((payout) => (
                    <div key={payout.id} className="border rounded-lg p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{payout.farmerName}</h3>
                          <p className="text-sm text-gray-600">
                            {payout.farmId} • {payout.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-600">{payout.amount}</p>
                          <Badge
                            variant="outline"
                            className={
                              payout.status === "completed"
                                ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                                : "text-orange-600 border-orange-200 bg-orange-50"
                            }
                          >
                            {payout.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {payout.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-600">Policy Type:</span>
                          <p className="font-medium">{payout.policyType}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Processed Date:</span>
                          <p className="font-medium">{payout.processedDate}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-gray-600 text-sm">Trigger Event:</span>
                        <p className="font-medium text-sm mt-1">{payout.trigger}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-xs text-gray-500">
                          <span>ID: {payout.id}</span>
                          {payout.transactionHash && <span className="ml-4">Tx: {payout.transactionHash}</span>}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          {payout.transactionHash && (
                            <Button size="sm" variant="outline">
                              View on Explorer
                            </Button>
                          )}
                        </div>
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
