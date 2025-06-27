import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Shield, Plus, Edit, Trash2, Copy, DollarSign, Users, FileText } from "lucide-react"

const policyTemplates = [
  {
    id: "POL-001",
    name: "Full Season Insurance",
    description: "Comprehensive coverage for the entire growing season",
    coverage: "Planting to Harvest",
    basePremium: "$13.00",
    maxPayout: "$650.00",
    triggers: ["7 consecutive days below threshold", "Extreme weather events"],
    status: "active",
    farmerCount: 89,
    createdDate: "Dec 15, 2023",
  },
  {
    id: "POL-002",
    name: "Flowering Stage Insurance",
    description: "Targeted protection during critical flowering period",
    coverage: "Flowering Stage Only",
    basePremium: "$5.00",
    maxPayout: "$250.00",
    triggers: ["3 consecutive days below threshold during flowering"],
    status: "active",
    farmerCount: 156,
    createdDate: "Dec 10, 2023",
  },
  {
    id: "POL-003",
    name: "Grain Filling Insurance",
    description: "Protection during grain development phase",
    coverage: "Grain Filling Stage",
    basePremium: "$4.50",
    maxPayout: "$225.00",
    triggers: ["5 consecutive days below threshold during grain filling"],
    status: "active",
    farmerCount: 67,
    createdDate: "Dec 8, 2023",
  },
  {
    id: "POL-004",
    name: "Drought Protection Plus",
    description: "Enhanced drought coverage with additional benefits",
    coverage: "Full Season + Extended",
    basePremium: "$18.00",
    maxPayout: "$900.00",
    triggers: ["Extended drought periods", "Soil moisture depletion"],
    status: "draft",
    farmerCount: 0,
    createdDate: "Jan 15, 2024",
  },
]

export default function PoliciesPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Templates</h1>
            <p className="text-gray-600">Create and manage insurance policy templates</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Policy
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Draft Policies</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">312</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Premium</p>
                <p className="text-2xl font-bold text-gray-900">$10.13</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {policyTemplates.map((policy) => (
          <Card key={policy.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">{policy.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    policy.status === "active"
                      ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                      : "text-orange-600 border-orange-200 bg-orange-50"
                  }
                >
                  {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Coverage:</span>
                    <p className="font-medium">{policy.coverage}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Base Premium:</span>
                    <p className="font-medium text-emerald-600">{policy.basePremium}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Max Payout:</span>
                    <p className="font-medium text-blue-600">{policy.maxPayout}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Subscribers:</span>
                    <p className="font-medium">{policy.farmerCount} farmers</p>
                  </div>
                </div>

                <div>
                  <span className="text-gray-600 text-sm">Triggers:</span>
                  <div className="mt-1 space-y-1">
                    {policy.triggers.map((trigger, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-1">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xs text-gray-500">Created {policy.createdDate}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4 mr-1" />
                      Duplicate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  )
}
