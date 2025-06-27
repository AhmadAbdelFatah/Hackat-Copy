"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react"

const treasuryData = {
  totalBalance: 2450000,
  availableLiquidity: 1850000,
  reserveRatio: 75.5,
  monthlyInflow: 185000,
  monthlyOutflow: 142000,
  netCashFlow: 43000,
}

const reserves = [
  {
    name: "Emergency Reserve",
    amount: 500000,
    percentage: 20.4,
    status: "healthy",
    target: 600000,
  },
  {
    name: "Operational Reserve",
    amount: 300000,
    percentage: 12.2,
    status: "healthy",
    target: 250000,
  },
  {
    name: "Regulatory Reserve",
    amount: 200000,
    percentage: 8.2,
    status: "warning",
    target: 300000,
  },
]

const cashFlowData = [
  { month: "Oct", inflow: 165000, outflow: 120000 },
  { month: "Nov", inflow: 178000, outflow: 135000 },
  { month: "Dec", inflow: 195000, outflow: 158000 },
  { month: "Jan", inflow: 185000, outflow: 142000 },
]

const riskMetrics = [
  {
    metric: "Liquidity Risk",
    value: "Low",
    score: 85,
    trend: "stable",
    description: "Sufficient liquidity to cover 6 months of operations",
  },
  {
    metric: "Concentration Risk",
    value: "Medium",
    score: 65,
    trend: "improving",
    description: "Geographic concentration in 3 main districts",
  },
  {
    metric: "Weather Risk",
    value: "High",
    score: 35,
    trend: "deteriorating",
    description: "Drought conditions affecting multiple regions",
  },
  {
    metric: "Operational Risk",
    value: "Low",
    score: 90,
    trend: "stable",
    description: "Strong operational controls and processes",
  },
]

export default function LiquidityManagement() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Liquidity Management</h1>
            <p className="text-gray-600">Monitor treasury balance, reserves, and cash flow</p>
          </div>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Treasury Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Total Treasury</CardTitle>
              <Wallet className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">${(treasuryData.totalBalance / 1000000).toFixed(2)}M</div>
            <p className="text-blue-100">Total balance</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Available Liquidity</CardTitle>
              <DollarSign className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">${(treasuryData.availableLiquidity / 1000000).toFixed(2)}M</div>
            <p className="text-emerald-100">Ready for payouts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Reserve Ratio</CardTitle>
              <PieChart className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{treasuryData.reserveRatio}%</div>
            <p className="text-purple-100">Of total assets</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Net Cash Flow</CardTitle>
              <TrendingUp className="w-6 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">${(treasuryData.netCashFlow / 1000).toFixed(0)}K</div>
            <p className="text-teal-100">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Reserve Management */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Reserve Management</CardTitle>
            <p className="text-gray-600">Monitor and manage different reserve pools</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reserves.map((reserve, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{reserve.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${(reserve.amount / 1000).toFixed(0)}K of ${(reserve.target / 1000).toFixed(0)}K target
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        reserve.status === "healthy"
                          ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                          : "text-orange-600 border-orange-200 bg-orange-50"
                      }
                    >
                      {reserve.status}
                    </Badge>
                  </div>
                  <Progress value={(reserve.amount / reserve.target) * 100} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{reserve.percentage}% of total</span>
                    <span>{((reserve.amount / reserve.target) * 100).toFixed(1)}% of target</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow Tracking */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Cash Flow Analysis</CardTitle>
            <p className="text-gray-600">Monthly inflows and outflows</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">Monthly Inflow</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    ${(treasuryData.monthlyInflow / 1000).toFixed(0)}K
                  </div>
                  <p className="text-xs text-emerald-700">Premiums collected</p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Monthly Outflow</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    ${(treasuryData.monthlyOutflow / 1000).toFixed(0)}K
                  </div>
                  <p className="text-xs text-red-700">Payouts & expenses</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">4-Month Trend</h4>
                {cashFlowData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{data.month}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-emerald-600">+${(data.inflow / 1000).toFixed(0)}K</span>
                      <span className="text-red-600">-${(data.outflow / 1000).toFixed(0)}K</span>
                      <span
                        className={`font-medium ${(data.inflow - data.outflow) > 0 ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {data.inflow - data.outflow > 0 ? "+" : ""}${((data.inflow - data.outflow) / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Financial Risk Analysis</CardTitle>
          <p className="text-gray-600">Monitor key risk metrics and indicators</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskMetrics.map((risk, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{risk.metric}</h4>
                  <div className="flex items-center space-x-1">
                    {risk.trend === "improving" && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                    {risk.trend === "deteriorating" && <TrendingDown className="w-4 h-4 text-red-600" />}
                    {risk.trend === "stable" && <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-medium ${
                        risk.value === "Low"
                          ? "text-emerald-600"
                          : risk.value === "Medium"
                            ? "text-orange-600"
                            : "text-red-600"
                      }`}
                    >
                      {risk.value}
                    </span>
                    <span className="text-sm text-gray-600">{risk.score}/100</span>
                  </div>
                  <Progress
                    value={risk.score}
                    className={`h-2 ${
                      risk.score >= 70
                        ? "[&>div]:bg-emerald-500"
                        : risk.score >= 40
                          ? "[&>div]:bg-orange-500"
                          : "[&>div]:bg-red-500"
                    }`}
                  />
                </div>

                <p className="text-xs text-gray-600">{risk.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
