'use client'
import {usePathname} from 'next/navigation';
import { Badge } from "@/components/ui/badge"
import { Shield } from 'lucide-react'

function Header(){
    const pathname = usePathname(); 
    let formattedName;
        if (pathname.startsWith('/farmer')) {
            formattedName = 'Farmer';
        } else if (pathname.startsWith('/admin')) {
            formattedName = 'Admin';
        }else {
         formattedName = 'Blockchain Insurance';
        }      
    return(
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">

        <div className="flex  justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RainSure</h1>
              <p className="text-xs text-gray-600">{formattedName} Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <div className = "flex flex-row"> 
              <w3m-button/>
              <w3m-network-button/>
              </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Shield className="w-3 h-3 mr-1" />
              {formattedName} Access
            </Badge>
          </div>

        </div>
        </div>
    </header>

    );
}

export default Header;