"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Users, FileText, DollarSign, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react'

const navigationItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Users,
  },
  {
    href: "/admin/subscriptions",
    label: "Subscriptions",
    icon: FileText,
  },
  {
    href: "/admin/policies",
    label: "Policy Templates",
    icon: Shield,
  },
  {
    href: "/admin/payouts",
    label: "Payout History",
    icon: DollarSign,
  },
  {
    href: "/admin/liquidity",
    label: "Liquidity Management",
    icon: TrendingUp,
  },
  {
    href: "/admin/analytics",
    label: "Analytics & Reports",
    icon: BarChart3,
  },
  {
    href: "/admin/complaints",
    label: "Complaints",
    icon: AlertTriangle,
  },
  {
    href: "/admin/system",
    label: "System Status",
    icon: AlertTriangle,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-sm border-r min-h-screen">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={isActive ? "font-medium" : ""}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
