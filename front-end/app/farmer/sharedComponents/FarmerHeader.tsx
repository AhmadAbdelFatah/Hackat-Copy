import Link from "next/link"
import Header from '@/components/common/Header'

function FarmerHeader(){
    return (

        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Header/>

          {/* Navigation */}
          <nav className="mt-4">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <Link href="/farmer" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Overview
              </Link>
              <Link href="/farmer/rainfall" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Rainfall
              </Link>
              <Link href="/farmer/claims" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Claims
              </Link>
              <Link
                href="/farmer/policies"
                className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-900"
              >
                Policies
              </Link>
              <Link href="/farmer/activity" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Activity
              </Link>
            </div>
          </nav>
        </div>
      </header>
        
    )
}

export default FarmerHeader;