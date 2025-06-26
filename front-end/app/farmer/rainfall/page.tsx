"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CloudRain, AlertTriangle, TrendingDown, TrendingUp, CheckCircle } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const rainfallData = [
  { date: "Jan 1", rainfall: 15.2, threshold: 12 },
  { date: "Jan 2", rainfall: 18.5, threshold: 12 },
  { date: "Jan 3", rainfall: 22.1, threshold: 12 },
  { date: "Jan 4", rainfall: 8.3, threshold: 12 },
  { date: "Jan 5", rainfall: 6.7, threshold: 12 },
  { date: "Jan 6", rainfall: 4.2, threshold: 12 },
  { date: "Jan 7", rainfall: 11.8, threshold: 12 },
  { date: "Jan 8", rainfall: 16.4, threshold: 12 },
  { date: "Jan 9", rainfall: 19.7, threshold: 12 },
  { date: "Jan 10", rainfall: 14.3, threshold: 12 },
  { date: "Jan 11", rainfall: 9.1, threshold: 12 },
  { date: "Jan 12", rainfall: 7.8, threshold: 12 },
  { date: "Jan 13", rainfall: 5.4, threshold: 12 },
  { date: "Jan 14", rainfall: 8.9, threshold: 12 },
  { date: "Jan 15", rainfall: 12.6, threshold: 12 },
  { date: "Jan 16", rainfall: 17.2, threshold: 12 },
  { date: "Jan 17", rainfall: 21.4, threshold: 12 },
  { date: "Jan 18", rainfall: 13.8, threshold: 12 },
  { date: "Jan 19", rainfall: 10.2, threshold: 12 },
  { date: "Jan 20", rainfall: 7.6, threshold: 12 },
  { date: "Jan 21", rainfall: 9.3, threshold: 12 },
  { date: "Jan 22", rainfall: 11.7, threshold: 12 },
  { date: "Jan 23", rainfall: 15.9, threshold: 12 },
  { date: "Jan 24", rainfall: 18.1, threshold: 12 },
  { date: "Jan 25", rainfall: 12.4, threshold: 12 },
  { date: "Jan 26", rainfall: 8.7, threshold: 12 },
  { date: "Jan 27", rainfall: 6.2, threshold: 12 },
  { date: "Jan 28", rainfall: 4.8, threshold: 12 },
  { date: "Jan 29", rainfall: 7.1, threshold: 12 },
  { date: "Jan 30", rainfall: 9.5, threshold: 12 },
]

export default function RainfallPage() {
  const currentRainfall = 8.5
  const threshold = 12
  const belowThresholdDays = 2
  const averageRainfall = 12.3

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
              <Link
                href="/farmer/rainfall"
                className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-900"
              >
                Rainfall
              </Link>
              <Link href="/farmer/claims" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rainfall Monitoring</h1>
          <p className="text-gray-600">Real-time rainfall data and drought threshold tracking</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Today's Rainfall</CardTitle>
                <CloudRain className="w-4 h-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{currentRainfall}mm</div>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">Below threshold</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Drought Threshold</CardTitle>
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{threshold}mm</div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">Daily minimum</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Days Below Threshold</CardTitle>
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{belowThresholdDays}</div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">Consecutive days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">30-Day Average</CardTitle>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{averageRainfall}mm</div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-emerald-600">Above threshold</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">30-Day Rainfall Chart</CardTitle>
                <p className="text-sm text-gray-600">Daily rainfall measurements with drought threshold indicator</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rainfall: {
                      label: "Rainfall (mm)",
                      color: "hsl(var(--chart-1))",
                    },
                    threshold: {
                      label: "Drought Threshold",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rainfallData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rainfall"
                        stroke="var(--color-rainfall)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-rainfall)", strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5, stroke: "var(--color-rainfall)", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="threshold"
                        stroke="var(--color-threshold)"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="3 3"
                        activeDot={false}
                        name="Drought Threshold"
                      />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const rainfall = payload[0].value
                            const threshold =
                              payload.length > 1 ? payload[1].value : (payload[0].payload as any).threshold

                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-medium">{label}</p>
                                <p className="text-blue-600">Rainfall: {rainfall} mm</p>
                                <p className="text-red-600">Threshold: {threshold} mm</p>
                                <p className={`text-sm ${rainfall >= threshold ? "text-emerald-600" : "text-red-600"}`}>
                                  {rainfall >= threshold ? "Safe level" : "Below threshold"}
                                </p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <ReferenceLine
                        y={threshold}
                        stroke="var(--color-threshold)"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        label={{ value: "Drought Threshold", position: "topRight" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Drought Alert</CardTitle>
                    <p className="text-sm text-gray-600">Active monitoring</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-orange-800 text-sm mb-2">
                      <strong>Status:</strong> Rainfall below threshold for {belowThresholdDays} consecutive days
                    </p>
                    <p className="text-orange-700 text-sm">
                      <strong>Policy:</strong> Flowering Stage Insurance (3-day trigger)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress to payout</span>
                      <span className="font-medium">{belowThresholdDays}/3 days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(belowThresholdDays / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Threshold Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Threshold Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Flowering Stage</span>
                    <span className="font-medium">12mm/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Grain Filling</span>
                    <span className="font-medium">10mm/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Full Season</span>
                    <span className="font-medium">8mm/day</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    <strong>Current Period:</strong> Flowering Stage (Jan 15 - Feb 5)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Weather Forecast */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { day: "Today", rainfall: "8.5mm", status: "below" },
                    { day: "Tomorrow", rainfall: "15.2mm", status: "above" },
                    { day: "Jan 17", rainfall: "18.7mm", status: "above" },
                    { day: "Jan 18", rainfall: "12.4mm", status: "above" },
                    { day: "Jan 19", rainfall: "9.8mm", status: "below" },
                    { day: "Jan 20", rainfall: "14.1mm", status: "above" },
                    { day: "Jan 21", rainfall: "16.9mm", status: "above" },
                  ].map((forecast, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <span className="text-sm font-medium text-gray-900">{forecast.day}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{forecast.rainfall}</span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            forecast.status === "above" ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
