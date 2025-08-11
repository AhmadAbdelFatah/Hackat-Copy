'use client';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CloudRain, Shield, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import FarmerHeader from "./sharedComponents/FarmerHeader"

export default function FarmerOverview() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <FarmerHeader/>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John Banda</h1>
          <p className="text-gray-600">Farm ID: MW-001-2024 | Location: Lilongwe District</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Policy Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Active Policies</CardTitle>
                    <Shield className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2"></div>
                  <p className="text-emerald-100">Flowering & Full Season</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Premium Status</CardTitle>
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">Paid</div>
                  <p className="text-blue-100">Next due: March 2024</p>
                </CardContent>
              </Card>
            </div>

            {/* Current Weather Alert */}
            <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Weather Alert</CardTitle>
                    <p className="text-sm text-gray-600">Rainfall below threshold detected</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-orange-800 mb-3">
                    <strong>Drought Risk:</strong> Rainfall has been below 12mm/day for 2 consecutive days during your
                    flowering period coverage.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-700">Monitoring continues...</span>
                    <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                      <Clock className="w-3 h-3 mr-1" />
                      Day 2 of 3
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900">Recent Activity</CardTitle>
                  <Link href="/farmer/activity">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CloudRain className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Rainfall check completed</p>
                      <p className="text-sm text-gray-600">8.5mm recorded - below threshold</p>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Premium payment confirmed</p>
                      <p className="text-sm text-gray-600">$18 for Full Season Policy</p>
                    </div>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Policy activated</p>
                      <p className="text-sm text-gray-600">Flowering Stage Insurance</p>
                    </div>
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Weather Widget */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <CloudRain className="w-5 h-5 mr-2 text-blue-600" />
                  Live Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">8.5mm</div>
                  <p className="text-sm text-gray-600">Today's Rainfall</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Temperature</span>
                    <span className="font-medium">28°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Humidity</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Wind Speed</span>
                    <span className="font-medium">12 km/h</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Drought Threshold</span>
                    <span className="text-sm text-blue-700">12mm/day</span>
                  </div>
                  <Progress value={71} className="h-2" />
                  <p className="text-xs text-blue-700 mt-1">71% of safe level</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/farmer/policies">
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    View Policies
                  </Button>
                </Link>
                <Link href="/farmer/rainfall">
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Rainfall Data
                  </Button>
                </Link>
                <Link href="/farmer/claims">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Claim History
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Farm Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Farm Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Farm Size</span>
                  <span className="font-medium">2.5 hectares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Crop Type</span>
                  <span className="font-medium">Maize</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Planting Date</span>
                  <span className="font-medium">Nov 15, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expected Harvest</span>
                  <span className="font-medium">Mar 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}