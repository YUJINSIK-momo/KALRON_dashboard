"use client"

import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    Home,
    Settings,
    ShoppingCart,
    Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navigation = [
  {
    name: "대시보드",
    href: "/",
    icon: Home,
    description: "고객 상세 정보"
  },
  {
    name: "고객 관리",
    href: "/customers",
    icon: Users,
    description: "고객 목록 및 관리"
  },
  {
    name: "우커머스",
    href: "/woocommerce",
    icon: ShoppingCart,
    description: "주문 및 매출 현황"
  },
  {
    name: "설정",
    href: "/settings",
    icon: Settings,
    description: "시스템 설정"
  }
]

export default function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-sm border-r border-white/20 z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚽</span>
              </div>
              <span className="font-bold text-slate-800">유니폼 관리</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-white/20 rounded-lg"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <div className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                    : 'hover:bg-white/50 text-slate-700'
                  }
                `}>
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          {!isCollapsed && (
            <div className="text-center">
              <p className="text-xs text-slate-500">v1.0.0</p>
              <p className="text-xs text-slate-400">유니폼 주문 관리</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 