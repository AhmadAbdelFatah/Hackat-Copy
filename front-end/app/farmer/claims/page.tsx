import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, CheckCircle, DollarSign, Calendar, FileText, TrendingUp, AlertCircle } from "lucide-react"

const claimsHistory = [
  {
    id: "CLM-2024-001",
    policyName: "Full Season Insurance",
    payoutDate: "Feb 15, 2024",
    amount: "$325.00",
    status: "Completed",
    trigger: "7 consecutive days below 8mm threshold",
    period: "Feb 8-14, 2024",
  },
  {
    id: "CLM-2023-003",
    policyName: "Flowering Stage Insurance",
    payoutDate: "Jan 28, 2024",
    amount: "$125.00",
    status: "Completed",
    trigger: "3 consecutive days below 12mm threshold",
    period: "Jan 25-27, 2024",
  },
  {
    id: "CLM-2023-002",
    policyName: "Full Season Insurance",
    payoutDate: "Dec 10, 2023",
    amount: "$325.00",
    status: "Completed",
    trigger: "7 consecutive days below 8mm threshold",
    period: "Dec 3-9, 2023",
  },
  {
    id: "CLM-2023-001",
    policyName: "Grain Filling Insurance",
    payoutDate: "Nov 22, 2023",
    amount: "$112.50",
    status: "Completed",
    trigger: "5 consecutive days below 10mm threshold",
    period: "Nov 17-21, 2023",
  },
]

export default function ClaimsPage() {
  const totalPayouts = claimsHistory.reduce((sum, claim) => sum + Number.parseFloat(claim.amount.replace("$", "")), 0)
  const currentYearPayouts = claimsHistory
    .filter((claim) => claim.payoutDate.includes("2024"))
    .reduce((sum, claim) => sum + Number.parseFloat(claim.amount.replace("$", "")), 0)

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
              <Link
                href="/farmer/claims"
                className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-900"
              >
                Claims
              </Link>
              <Link href="/farmer/policies" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Policies
              </Link>
              <Link href="/farmer/activity" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Activity
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Claims & Payouts</h1>
          <p className="text-gray-600">Your payout history and claim records</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Total Payouts</CardTitle>
                <DollarSign className="w-6 h-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">${totalPayouts.toFixed(2)}</div>
              <p className="text-emerald-100">All-time earnings</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">2024 Payouts</CardTitle>
                <TrendingUp className="w-6 h-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">${currentYearPayouts.toFixed(2)}</div>
              <p className="text-blue-100">Current year</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Success Rate</CardTitle>
                <CheckCircle className="w-6 h-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">100%</div>
              <p className="text-teal-100">Claims processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Status */}
        <Card className="border-0 shadow-lg mb-8 border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Potential Payout Alert</CardTitle>
                <p className="text-sm text-gray-600">Monitoring active drought conditions</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-orange-800 text-sm mb-2">
                    <strong>Flowering Stage Policy:</strong> Currently 2 of 3 consecutive days below threshold
                  </p>
                  <p className="text-orange-700 text-sm">
                    Potential payout: <strong>$125.00</strong> (if trigger conditions are met)
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">Day 2/3</div>
                    <p className="text-sm text-orange-700">Progress to payout</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Claims History Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-900">Payout History</CardTitle>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Policy</TableHead>
                    <TableHead>Trigger Event</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Payout Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claimsHistory.map((claim) => (
                    <TableRow key={claim.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{claim.policyName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-600">{claim.trigger}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {claim.period}
                        </div>
                      </TableCell>
                      <TableCell>{claim.payoutDate}</TableCell>
                      <TableCell>
                        <span className="font-bold text-emerald-600">{claim.amount}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {claim.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* How Payouts Work */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">How Automatic Payouts Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Drought Detection</h3>
                <p className="text-gray-600 text-sm">
                  Daily rainfall monitoring detects when levels fall below your policy threshold
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Trigger Countdown</h3>
                <p className="text-gray-600 text-sm">
                  System counts consecutive days below threshold until trigger condition is met
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Automatic Payout</h3>
                <p className="text-gray-600 text-sm">
                  Payout is automatically processed and sent to your wallet within 24 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
