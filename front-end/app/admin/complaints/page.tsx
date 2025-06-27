"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminLayout } from "@/components/admin/admin-layout"
import { TrendingUp, Search, MessageSquare, Clock, CheckCircle, Eye, Reply, AlertTriangle } from "lucide-react"
import { useState } from "react"

const complaints = [
  {
    id: "CMP-2024-001",
    farmerName: "John Banda",
    farmId: "MW-001-2024",
    type: "Payout Delay",
    priority: "high",
    status: "investigating",
    subject: "Payout not received after 48 hours",
    description:
      "My policy triggered 3 days ago but I haven't received the payout yet. The system shows it was processed but no funds in my wallet.",
    submittedDate: "Jan 22, 2024",
    lastUpdate: "Jan 23, 2024",
    assignedTo: "Sarah Mwale",
    responses: 2,
  },
  {
    id: "CMP-2024-002",
    farmerName: "Mary Tembo",
    farmId: "MW-003-2024",
    type: "Policy Coverage",
    priority: "medium",
    status: "pending",
    subject: "Confusion about flowering stage coverage dates",
    description:
      "I'm not sure if my flowering stage policy covers the current period. The dates seem unclear in my policy document.",
    submittedDate: "Jan 21, 2024",
    lastUpdate: "Jan 21, 2024",
    assignedTo: "David Phiri",
    responses: 0,
  },
  {
    id: "CMP-2024-003",
    farmerName: "Peter Kachingwe",
    farmId: "MW-007-2024",
    type: "Technical Issue",
    priority: "low",
    status: "resolved",
    subject: "Cannot access farmer dashboard",
    description: "Having trouble logging into my farmer dashboard. Password reset doesn't seem to work.",
    submittedDate: "Jan 20, 2024",
    lastUpdate: "Jan 21, 2024",
    assignedTo: "Tech Support",
    responses: 3,
  },
  {
    id: "CMP-2024-004",
    farmerName: "Grace Mbewe",
    farmId: "MW-005-2024",
    type: "Billing Issue",
    priority: "medium",
    status: "in_progress",
    subject: "Incorrect premium calculation",
    description: "The premium charged for my 3.2 hectare farm seems too high compared to the quoted rate.",
    submittedDate: "Jan 19, 2024",
    lastUpdate: "Jan 22, 2024",
    assignedTo: "Finance Team",
    responses: 1,
  },
  {
    id: "CMP-2024-005",
    farmerName: "Robert Nyirenda",
    farmId: "MW-009-2024",
    type: "Weather Data",
    priority: "high",
    status: "escalated",
    subject: "Disputed rainfall measurements",
    description:
      "The system shows 6mm rainfall on Jan 18th, but we had heavy rains that day. I believe the weather station data is incorrect.",
    submittedDate: "Jan 18, 2024",
    lastUpdate: "Jan 23, 2024",
    assignedTo: "Weather Team",
    responses: 4,
  },
]

export default function ComplaintsManagement() {
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complaints Management</h1>
            <p className="text-gray-600">Track and manage farmer complaints and inquiries</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Complaint
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
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
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-emerald-600">12</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">4.2h</p>
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
                <Input placeholder="Search complaints..." className="pl-10" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payout">Payout Issues</SelectItem>
                <SelectItem value="policy">Policy Coverage</SelectItem>
                <SelectItem value="technical">Technical Issues</SelectItem>
                <SelectItem value="billing">Billing Issues</SelectItem>
                <SelectItem value="weather">Weather Data</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">All Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="border rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{complaint.subject}</h3>
                      <Badge
                        variant="outline"
                        className={
                          complaint.priority === "high"
                            ? "text-red-600 border-red-200 bg-red-50"
                            : complaint.priority === "medium"
                              ? "text-orange-600 border-orange-200 bg-orange-50"
                              : "text-blue-600 border-blue-200 bg-blue-50"
                        }
                      >
                        {complaint.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>{complaint.farmerName}</strong> • {complaint.farmId} • {complaint.type}
                    </p>
                    <p className="text-gray-700 mb-3">{complaint.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      complaint.status === "resolved"
                        ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                        : complaint.status === "investigating" || complaint.status === "in_progress"
                          ? "text-blue-600 border-blue-200 bg-blue-50"
                          : complaint.status === "escalated"
                            ? "text-red-600 border-red-200 bg-red-50"
                            : "text-orange-600 border-orange-200 bg-orange-50"
                    }
                  >
                    {complaint.status === "investigating" && <Clock className="w-3 h-3 mr-1" />}
                    {complaint.status === "resolved" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {complaint.status === "escalated" && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {complaint.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">Submitted:</span>
                    <p className="font-medium">{complaint.submittedDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Update:</span>
                    <p className="font-medium">{complaint.lastUpdate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Assigned To:</span>
                    <p className="font-medium">{complaint.assignedTo}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Responses:</span>
                    <p className="font-medium">{complaint.responses}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xs text-gray-500">ID: {complaint.id}</span>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Complaint Details - {complaint.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-600">Farmer Name</label>
                              <p className="font-medium">{complaint.farmerName}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Farm ID</label>
                              <p className="font-medium">{complaint.farmId}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Type</label>
                              <p className="font-medium">{complaint.type}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Priority</label>
                              <Badge variant="outline" className="mt-1">
                                {complaint.priority}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">Subject</label>
                            <p className="font-medium">{complaint.subject}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">Description</label>
                            <p className="text-gray-700">{complaint.description}</p>
                          </div>

                          <div className="border-t pt-4">
                            <label className="text-sm font-medium text-gray-600">Add Response</label>
                            <Textarea placeholder="Type your response here..." className="mt-2" rows={4} />
                            <div className="flex justify-end space-x-2 mt-3">
                              <Button variant="outline" size="sm">
                                Save Draft
                              </Button>
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                <Reply className="w-4 h-4 mr-1" />
                                Send Response
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {complaint.status !== "resolved" && (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <Reply className="w-4 h-4 mr-1" />
                        Respond
                      </Button>
                    )}

                    {complaint.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Assign
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
