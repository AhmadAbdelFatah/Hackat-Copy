import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield } from 'lucide-react'

export function AdminHeader() {
  return (
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
  )
}
