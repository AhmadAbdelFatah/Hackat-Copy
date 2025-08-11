"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, CheckCircle, Clock, QrCode, Download, Calendar, DollarSign, AlertTriangle } from "lucide-react"
import { useState } from "react"
import FarmerHeader from "../sharedComponents/FarmerHeader"

const policies = [
  {
    id: 1,
    name: "Flowering Stage Insurance",
    description: "Critical protection during maize flowering period",
    duration: "3-4 weeks",
    period: "Mid-December to Mid-January",
    premium: "$5 per hectare",
    coverage: "$50 per hectare",
    threshold: "12mm/day",
    trigger: "3 consecutive days below threshold",
    status: "active",
    startDate: "Jan 15, 2024",
    endDate: "Feb 5, 2024",
    isSubscribed: true,
  },
  {
    id: 2,
    name: "Grain Filling Insurance",
    description: "Protect kernel development during grain filling",
    duration: "4-6 weeks",
    period: "Mid-January to End of February",
    premium: "$4.50 per hectare",
    coverage: "$45 per hectare",
    threshold: "10mm/day",
    trigger: "5 consecutive days below threshold",
    status: "available",
    startDate: "Feb 1, 2024",
    endDate: "Mar 15, 2024",
    isSubscribed: false,
  },
  {
    id: 3,
    name: "Full Season Insurance",
    description: "Complete protection for entire growing season",
    duration: "3-4 months",
    period: "November to March",
    premium: "$13 per hectare",
    coverage: "$130 per hectare",
    threshold: "8mm/day",
    trigger: "7 consecutive days below threshold",
    status: "active",
    startDate: "Nov 15, 2023",
    endDate: "Mar 30, 2024",
    isSubscribed: true,
  },
]

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <FarmerHeader />                                                                             

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Policies</h1>
          <p className="text-gray-600">Choose the right coverage for your maize farming needs</p>
        </div>

        {/* Pricing Disclosure */}
        <Card className="border-0 shadow-lg mb-8 border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Policy Pricing Disclosure</CardTitle>
                <p className="text-sm text-gray-600">How our premiums are calculated</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 text-sm leading-relaxed">
                <strong>Transparent Pricing:</strong> Insurance premiums are determined before the insurance period
                starts, based on historical weather data, regional crop yields, and average maize prices from recent
                seasons. Premiums remain fixed throughout the policy duration and are not affected by real-time market
                fluctuations. This ensures stability and fairness for all farmers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {policies.map((policy) => (
            <Card
              key={policy.id}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                policy.isSubscribed ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={policy.status === "active" ? "default" : "secondary"}
                    className={policy.status === "active" ? "bg-emerald-100 text-emerald-700" : ""}
                  >
                    {policy.isSubscribed ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Subscribed
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Available
                      </>
                    )}
                  </Badge>
                  {policy.isSubscribed && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <QrCode className="w-4 h-4 mr-1" />
                          QR Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Policy QR Code</DialogTitle>
                          <DialogDescription>Scan to view policy metadata on IPFS</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                            <QrCode className="w-24 h-24 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-600 text-center">
                            Policy ID: {policy.name.replace(/\s+/g, "-").toLowerCase()}-{policy.id}
                          </p>
                          <Button variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download QR Code
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <CardTitle className="text-xl text-gray-900">{policy.name}</CardTitle>
                <p className="text-gray-600 text-sm">{policy.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Premium</p>
                    <p className="font-bold text-emerald-600">{policy.premium}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Coverage</p>
                    <p className="font-bold text-blue-600">{policy.coverage}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{policy.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Period:</span>
                    <span className="font-medium">{policy.period}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Threshold:</span>
                    <span className="font-medium">{policy.threshold}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trigger:</span>
                    <span className="font-medium">{policy.trigger}</span>
                  </div>
                </div>

                {policy.isSubscribed && (
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-sm font-medium text-emerald-800">Active Period</span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      {policy.startDate} - {policy.endDate}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  {policy.isSubscribed ? (
                    <Button className="w-full" variant="outline" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Subscribed
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                          Subscribe Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Subscribe to {policy.name}</DialogTitle>
                          <DialogDescription>Review policy details and confirm your subscription</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Policy Summary</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Premium (2.5 hectares):</span>
                                <span className="font-medium">
                                  $
                                  {(
                                    Number.parseFloat(policy.premium.replace("$", "").replace(" per hectare", "")) * 2.5
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Coverage (2.5 hectares):</span>
                                <span className="font-medium">
                                  $
                                  {(
                                    Number.parseFloat(policy.coverage.replace("$", "").replace(" per hectare", "")) *
                                    2.5
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-medium">{policy.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-orange-800 font-medium mb-1">Important Notice</p>
                                <p className="text-sm text-orange-700">
                                  This subscription requires admin approval. You will be notified once your application
                                  is reviewed.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1">
                                Cancel
                              </Button>
                            </DialogTrigger>
                            <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                              Confirm Subscription
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Recommendations for Your Farm</CardTitle>
            <p className="text-gray-600">Based on your 2.5 hectare maize farm in Lilongwe District</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-lg p-4">
                <h4 className="font-medium text-emerald-900 mb-2">Most Critical Protection</h4>
                <p className="text-emerald-800 text-sm mb-3">
                  <strong>Flowering Stage Insurance</strong> is recommended as your top priority. This period is most
                  sensitive to drought and offers the best protection for your investment.
                </p>
                <div className="flex items-center text-sm text-emerald-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Already subscribed - Great choice!</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Complete Protection</h4>
                <p className="text-blue-800 text-sm mb-3">
                  <strong>Full Season Insurance</strong> provides comprehensive coverage for your entire growing season.
                  Best value for complete peace of mind.
                </p>
                <div className="flex items-center text-sm text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Already subscribed - Excellent coverage!</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Consider Adding</h4>
              <p className="text-gray-700 text-sm mb-3">
                <strong>Grain Filling Insurance</strong> would complement your current coverage by protecting the kernel
                development phase. This creates a comprehensive protection strategy.
              </p>
              <Button variant="outline" size="sm">
                Learn More About Grain Filling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
