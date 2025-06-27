"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Crop, DollarSign, ArrowLeft } from "lucide-react"

// بيانات المناطق
const districtsData = [
  {
    id: "lilongwe",
    name: "Lilongwe",
    farmers: 45,
    percentage: 35.4,
    avgFarmSize: 2.8,
    totalCoverage: 126000,
    coordinates: { lat: -13.9626, lng: 33.7741 },
    farmers_list: [
      { id: "MW-001", name: "John Banda", farmSize: 2.5, policy: "Full Season", premium: 32.5 },
      { id: "MW-002", name: "Mary Tembo", farmSize: 3.1, policy: "Flowering Stage", premium: 15.5 },
      { id: "MW-003", name: "Peter Mwale", farmSize: 2.8, policy: "Grain Filling", premium: 12.6 },
    ],
  },
  {
    id: "blantyre",
    name: "Blantyre",
    farmers: 32,
    percentage: 25.2,
    avgFarmSize: 2.1,
    totalCoverage: 67200,
    coordinates: { lat: -15.7861, lng: 35.0058 },
    farmers_list: [
      { id: "MW-004", name: "Grace Phiri", farmSize: 1.8, policy: "Full Season", premium: 23.4 },
      { id: "MW-005", name: "James Kachingwe", farmSize: 2.4, policy: "Flowering Stage", premium: 12.0 },
    ],
  },
  {
    id: "mzuzu",
    name: "Mzuzu",
    farmers: 28,
    percentage: 22.0,
    avgFarmSize: 3.2,
    totalCoverage: 89600,
    coordinates: { lat: -11.4607, lng: 34.0164 },
    farmers_list: [
      { id: "MW-006", name: "Sarah Nyirenda", farmSize: 3.5, policy: "Full Season", premium: 45.5 },
      { id: "MW-007", name: "Robert Chisale", farmSize: 2.9, policy: "Grain Filling", premium: 13.05 },
    ],
  },
  {
    id: "zomba",
    name: "Zomba",
    farmers: 22,
    percentage: 17.3,
    avgFarmSize: 2.5,
    totalCoverage: 55000,
    coordinates: { lat: -15.385, lng: 35.3188 },
    farmers_list: [
      { id: "MW-008", name: "David Mbewe", farmSize: 2.2, policy: "Flowering Stage", premium: 11.0 },
      { id: "MW-009", name: "Alice Banda", farmSize: 2.8, policy: "Full Season", premium: 36.4 },
    ],
  },
]

export function InteractiveMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"overview" | "district" | "farmer">("overview")

  const currentDistrict = selectedDistrict ? districtsData.find((d) => d.id === selectedDistrict) : null
  const currentFarmer =
    selectedFarmer && currentDistrict ? currentDistrict.farmers_list.find((f) => f.id === selectedFarmer) : null

  const handleDistrictClick = (districtId: string) => {
    setSelectedDistrict(districtId)
    setViewMode("district")
    setSelectedFarmer(null)
  }

  const handleFarmerClick = (farmerId: string) => {
    setSelectedFarmer(farmerId)
    setViewMode("farmer")
  }

  const handleBackToOverview = () => {
    setSelectedDistrict(null)
    setSelectedFarmer(null)
    setViewMode("overview")
  }

  const handleBackToDistrict = () => {
    setSelectedFarmer(null)
    setViewMode("district")
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {viewMode !== "overview" && (
              <Button
                variant="outline"
                size="sm"
                onClick={viewMode === "farmer" ? handleBackToDistrict : handleBackToOverview}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <div>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {viewMode === "overview" && "Farmer Distribution Map"}
                {viewMode === "district" && `${currentDistrict?.name} District`}
                {viewMode === "farmer" && `${currentFarmer?.name} Farm Details`}
              </CardTitle>
              <p className="text-gray-600">
                {viewMode === "overview" && "Geographic distribution of farmers across districts"}
                {viewMode === "district" && `${currentDistrict?.farmers} farmers in this district`}
                {viewMode === "farmer" && `Farm ID: ${currentFarmer?.id}`}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="district">District</SelectItem>
                <SelectItem value="farmer">Farmer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Export Map
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
              {viewMode === "overview" && (
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
                  <p className="text-gray-600">Click on districts to view details</p>

                  {/* District Markers */}
                  <div className="absolute inset-0">
                    {districtsData.map((district, index) => (
                      <button
                        key={district.id}
                        onClick={() => handleDistrictClick(district.id)}
                        className={`absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-blue-600 transition-colors ${
                          index === 0
                            ? "top-1/4 left-1/3"
                            : index === 1
                              ? "bottom-1/4 right-1/3"
                              : index === 2
                                ? "top-1/3 right-1/4"
                                : "bottom-1/3 left-1/4"
                        }`}
                        title={district.name}
                      >
                        {district.farmers}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === "district" && currentDistrict && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {currentDistrict.farmers}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentDistrict.name} District</h3>
                  <p className="text-gray-600">Click on farmers below to view individual details</p>
                </div>
              )}

              {viewMode === "farmer" && currentFarmer && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <Crop className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentFarmer.name}</h3>
                  <p className="text-gray-600">
                    {currentFarmer.farmSize} hectares • {currentFarmer.policy}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {viewMode === "overview" && (
              <>
                <h4 className="font-semibold text-gray-900">District Breakdown</h4>
                {districtsData.map((district) => (
                  <button
                    key={district.id}
                    onClick={() => handleDistrictClick(district.id)}
                    className="w-full bg-white rounded-lg p-4 border hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{district.name}</h5>
                      <Badge variant="secondary">{district.farmers} farmers</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coverage:</span>
                        <span className="font-medium">{district.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Farm Size:</span>
                        <span className="font-medium">{district.avgFarmSize} ha</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Coverage:</span>
                        <span className="font-medium">${(district.totalCoverage / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            )}

            {viewMode === "district" && currentDistrict && (
              <>
                <h4 className="font-semibold text-gray-900">Farmers in {currentDistrict.name}</h4>
                {currentDistrict.farmers_list.map((farmer) => (
                  <button
                    key={farmer.id}
                    onClick={() => handleFarmerClick(farmer.id)}
                    className="w-full bg-white rounded-lg p-4 border hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{farmer.name}</h5>
                      <Badge variant="secondary">{farmer.id}</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Farm Size:</span>
                        <span className="font-medium">{farmer.farmSize} ha</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Policy:</span>
                        <span className="font-medium">{farmer.policy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Premium:</span>
                        <span className="font-medium text-emerald-600">${farmer.premium}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            )}

            {viewMode === "farmer" && currentFarmer && (
              <>
                <h4 className="font-semibold text-gray-900">Farm Details</h4>
                <div className="bg-white rounded-lg p-4 border space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Crop className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-blue-600">{currentFarmer.farmSize}</div>
                      <div className="text-xs text-gray-600">Hectares</div>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-emerald-600">${currentFarmer.premium}</div>
                      <div className="text-xs text-gray-600">Premium</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Policy Type:</span>
                      <span className="font-medium">{currentFarmer.policy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Farm ID:</span>
                      <span className="font-medium">{currentFarmer.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">District:</span>
                      <span className="font-medium">{currentDistrict?.name}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <Button className="w-full" size="sm">
                      View Full Farm Profile
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
