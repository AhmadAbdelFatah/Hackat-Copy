"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/admin/admin-layout"
import { InteractiveMap } from "@/components/interactive-map"
import { TrendingUp, BarChart3, Calendar, Download, Filter, CloudRain, PieChart, DollarSign } from "lucide-react"

const droughtReports = [
  {
    week: "Week 3, Jan 2024",
    affectedDistricts: 2,
    farmersAtRisk: 67,
    potentialPayouts: 45000,
    severity: "moderate",
    status: "monitoring",
  },
  {
    week: "Week 2, Jan 2024",
    affectedDistricts: 1,
    farmersAtRisk: 23,
    potentialPayouts: 15000,
    severity: "mild",
    status: "resolved",
  },
  {
    week: "Week 1, Jan 2024",
    affectedDistricts: 3,
    farmersAtRisk: 89,
    potentialPayouts: 78000,
    severity: "severe",
    status: "payouts_issued",
  },
]

const systemProfits = {
  totalPremiums: 485000,
  totalPayouts: 342000,
  operatingExpenses: 67000,
  netProfit: 76000,
  profitMargin: 15.7,
  monthlyBreakdown: [
    { month: "Oct", premiums: 125000, payouts: 89000, profit: 36000 },
    { month: "Nov", premiums: 118000, payouts: 76000, profit: 42000 },
    { month: "Dec", premiums: 132000, payouts: 98000, profit: 34000 },
    { month: "Jan", premiums: 110000, payouts: 79000, profit: 31000 },
  ],
}

const performanceMetrics = [
  {
    metric: "Policy Activation Rate",
    value: "94.2%",
    trend: "up",
    change: "+2.1%",
    description: "Percentage of approved policies that become active",
  },
  {
    metric: "Claims Processing Time",
    value: "18 hours",
    trend: "down",
    change: "-6 hours",
    description: "Average time from trigger to payout",
  },
  {
    metric: "Farmer Retention Rate",
    value: "87.5%",
    trend: "up",
    change: "+4.3%",
    description: "Farmers renewing policies season over season",
  },
  {
    metric: "Oracle Accuracy",
    value: "99.8%",
    trend: "stable",
    change: "0%",
    description: "Weather data accuracy from Chainlink oracles",
  },
]

export default function AnalyticsReports() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Advanced analytics and detailed performance reports</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="distribution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="distribution">Farmer Distribution</TabsTrigger>
          <TabsTrigger value="drought">Drought Reports</TabsTrigger>
          <TabsTrigger value="profits">System Profits</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Interactive Farmer Distribution Map */}
        <TabsContent value="distribution" className="space-y-6">
          <InteractiveMap />
        </TabsContent>

        {/* باقي التابات كما هي... */}
        <TabsContent value="drought" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <CloudRain className="w-5 h-5 mr-2" />
                    Weekly Drought Reports
                  </CardTitle>
                  <p className="text-gray-600">Monitor drought conditions and potential payouts</p>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {droughtReports.map((report, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.week}</h4>
                        <p className="text-sm text-gray-600">{report.affectedDistricts} districts affected</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge
                          variant="outline"
                          className={
                            report.severity === "severe"
                              ? "text-red-600 border-red-200 bg-red-50"
                              : report.severity === "moderate"
                                ? "text-orange-600 border-orange-200 bg-orange-50"
                                : "text-yellow-600 border-yellow-200 bg-yellow-50"
                          }
                        >
                          {report.severity}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            report.status === "payouts_issued"
                              ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                              : report.status === "resolved"
                                ? "text-blue-600 border-blue-200 bg-blue-50"
                                : "text-orange-600 border-orange-200 bg-orange-50"
                          }
                        >
                          {report.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{report.farmersAtRisk}</div>
                        <p className="text-sm text-gray-600">Farmers at Risk</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">
                          ${(report.potentialPayouts / 1000).toFixed(0)}K
                        </div>
                        <p className="text-sm text-gray-600">Potential Payouts</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">{report.affectedDistricts}</div>
                        <p className="text-sm text-gray-600">Districts Affected</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Profit Analysis */}
        <TabsContent value="profits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-6 h-6" />
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold mb-1">${(systemProfits.totalPremiums / 1000).toFixed(0)}K</div>
                <p className="text-emerald-100 text-sm">Total Premiums</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-6 h-6" />
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold mb-1">${(systemProfits.totalPayouts / 1000).toFixed(0)}K</div>
                <p className="text-red-100 text-sm">Total Payouts</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <PieChart className="w-6 h-6" />
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold mb-1">${(systemProfits.netProfit / 1000).toFixed(0)}K</div>
                <p className="text-blue-100 text-sm">Net Profit</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-6 h-6" />
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold mb-1">{systemProfits.profitMargin}%</div>
                <p className="text-purple-100 text-sm">Profit Margin</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Monthly Profit Breakdown</CardTitle>
              <p className="text-gray-600">Revenue, expenses, and profit trends</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemProfits.monthlyBreakdown.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">{month.month} 2024</div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-emerald-600">
                        <span className="font-medium">Premiums: </span>${(month.premiums / 1000).toFixed(0)}K
                      </div>
                      <div className="text-red-600">
                        <span className="font-medium">Payouts: </span>${(month.payouts / 1000).toFixed(0)}K
                      </div>
                      <div className="text-blue-600 font-semibold">
                        <span>Profit: </span>${(month.profit / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Metrics */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-900">{metric.metric}</CardTitle>
                    <div className="flex items-center space-x-1">
                      {metric.trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                      {metric.trend === "down" && <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />}
                      {metric.trend === "stable" && <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                      <span
                        className={`text-sm font-medium ${
                          metric.trend === "up"
                            ? "text-emerald-600"
                            : metric.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <p className="text-gray-600 text-sm">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
