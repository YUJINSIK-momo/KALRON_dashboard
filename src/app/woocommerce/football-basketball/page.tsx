"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart3,
    Download,
    Eye,
    Filter,
    Package,
    RefreshCw,
    Search
} from "lucide-react"
import { useState } from "react"

// 우커머스 주문 데이터 타입 정의
interface WooCommerceOrder {
  id: number
  customer_team_name: string
  order_number: string
  item_name: string
  category: string
  status: string
  payment_method: string
  payment_amount: number
  estimated_order_date: string
  actual_order_date: string
}

// 샘플 우커머스 주문 데이터
const wooCommerceOrders: WooCommerceOrder[] = [
  {
    id: 1,
    customer_team_name: "TEAM HANEDA FOOTBALL",
    order_number: "WC-2024-001",
    item_name: "축구 유니폼 優先制作",
    category: "유니폼",
    status: "completed",
    payment_method: "신용카드",
    payment_amount: 150000,
    estimated_order_date: "2024-12-25",
    actual_order_date: "2024-12-29"
  },
  {
    id: 2,
    customer_team_name: "TEAM TOKYO BASKETBALL",
    order_number: "WC-2024-002",
    item_name: "농구 유니폼",
    category: "유니폼",
    status: "processing",
    payment_method: "계좌이체",
    payment_amount: 180000,
    estimated_order_date: "2024-12-30",
    actual_order_date: ""
  },
  {
    id: 3,
    customer_team_name: "TEAM OSAKA FOOTBALL",
    order_number: "WC-2024-003",
    item_name: "축구 모자",
    category: "액세서리",
    status: "pending",
    payment_method: "신용카드",
    payment_amount: 25000,
    estimated_order_date: "2024-12-28",
    actual_order_date: ""
  },
  {
    id: 4,
    customer_team_name: "TEAM KYOTO BASKETBALL",
    order_number: "WC-2024-004",
    item_name: "농구 유니폼 優先制作",
    category: "유니폼",
    status: "completed",
    payment_method: "계좌이체",
    payment_amount: 200000,
    estimated_order_date: "2024-12-20",
    actual_order_date: "2024-12-24"
  },
  {
    id: 5,
    customer_team_name: "TEAM NAGOYA FOOTBALL",
    order_number: "WC-2024-005",
    item_name: "축구 양말",
    category: "액세서리",
    status: "processing",
    payment_method: "신용카드",
    payment_amount: 15000,
    estimated_order_date: "2025-01-05",
    actual_order_date: ""
  },
  {
    id: 6,
    customer_team_name: "TEAM YOKOHAMA BASKETBALL",
    order_number: "WC-2024-006",
    item_name: "농구 장갑 優先制作",
    category: "장비",
    status: "completed",
    payment_method: "계좌이체",
    payment_amount: 45000,
    estimated_order_date: "2024-12-22",
    actual_order_date: "2024-12-26"
  },
  {
    id: 7,
    customer_team_name: "TEAM SAPPORO FOOTBALL",
    order_number: "WC-2024-007",
    item_name: "축구 배트",
    category: "장비",
    status: "pending",
    payment_method: "신용카드",
    payment_amount: 80000,
    estimated_order_date: "2025-01-10",
    actual_order_date: ""
  },
  {
    id: 8,
    customer_team_name: "TEAM FUKUOKA BASKETBALL",
    order_number: "WC-2024-008",
    item_name: "농구 유니폼",
    category: "유니폼",
    status: "completed",
    payment_method: "계좌이체",
    payment_amount: 160000,
    estimated_order_date: "2024-12-18",
    actual_order_date: "2024-12-22"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-emerald-500"
    case "processing": return "bg-blue-500"
    case "pending": return "bg-yellow-500"
    case "cancelled": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "completed": return "완료"
    case "processing": return "처리중"
    case "pending": return "대기중"
    case "cancelled": return "취소"
    default: return "알 수 없음"
  }
}

const getPaymentMethodColor = (method: string) => {
  switch (method) {
    case "신용카드": return "bg-blue-100 text-blue-800"
    case "계좌이체": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function FootballBasketballWooCommercePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredOrders = wooCommerceOrders.filter(order => {
    const matchesSearch = order.customer_team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.order_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesCategory = categoryFilter === "all" || order.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const clearFilters = () => {
    setStatusFilter("all")
    setCategoryFilter("all")
    setSearchTerm("")
  }

  // 주문 통계 계산
  const orderStatistics = {
    total: wooCommerceOrders.length,
    completed: wooCommerceOrders.filter(order => order.status === 'completed').length,
    processing: wooCommerceOrders.filter(order => order.status === 'processing').length,
    pending: wooCommerceOrders.filter(order => order.status === 'pending').length,
    cancelled: wooCommerceOrders.filter(order => order.status === 'cancelled').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚽🏀</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                축구/농구 우커머스 대시보드
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-xl">
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="glass border-b border-white/20 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="주문 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-white/20 rounded-xl bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[200px]"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[140px] shadow-lg"
            >
              <option value="all">모든 상태</option>
              <option value="completed">완료</option>
              <option value="processing">처리중</option>
              <option value="pending">대기중</option>
              <option value="cancelled">취소</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[140px] shadow-lg"
            >
              <option value="all">모든 카테고리</option>
              <option value="유니폼">유니폼</option>
              <option value="액세서리">액세서리</option>
              <option value="장비">장비</option>
            </select>

            {/* Clear Filters */}
            {(statusFilter !== "all" || categoryFilter !== "all" || searchTerm) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white px-3 py-2 rounded-lg border-2 border-white/30 shadow-lg font-medium"
              >
                필터 초기화
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-64">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">총 주문</p>
                  <p className="text-2xl font-bold text-slate-800">{orderStatistics.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-success rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">완료</p>
                  <p className="text-2xl font-bold text-slate-800">{orderStatistics.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-warning rounded-lg flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">처리중</p>
                  <p className="text-2xl font-bold text-slate-800">{orderStatistics.processing}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">대기중</p>
                  <p className="text-2xl font-bold text-slate-800">{orderStatistics.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-danger rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">취소</p>
                  <p className="text-2xl font-bold text-slate-800">{orderStatistics.cancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card className="glass hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-slate-800">축구/농구 우커머스 주문 목록</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-9 gap-2 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200 border border-white/20 hover:border-indigo-200 items-center"
                >
                  {/* Customer Team Name */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">고객 팀명</p>
                    <span className="text-xs font-medium text-slate-800 truncate">
                      {order.customer_team_name}
                    </span>
                  </div>

                  {/* Order Number */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">주문번호</p>
                    <span className="text-xs font-medium text-slate-800">
                      {order.order_number}
                    </span>
                  </div>

                  {/* Item Name */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">항목명</p>
                    <span className="text-xs font-medium text-slate-800 truncate">
                      {order.item_name}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">카테고리</p>
                    <span className="text-xs font-medium text-slate-800">
                      {order.category}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">상태</p>
                    <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusColor(order.status)} text-white`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Payment Method */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">결제방식</p>
                    <span className={`text-xs px-1 py-0.5 rounded-full ${getPaymentMethodColor(order.payment_method)}`}>
                      {order.payment_method}
                    </span>
                  </div>

                  {/* Payment Amount */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">결제금액</p>
                    <span className="text-xs font-medium text-slate-800">
                      ₩{order.payment_amount.toLocaleString()}
                    </span>
                  </div>

                  {/* Estimated Order Date */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">예상 납기</p>
                    <span className="text-xs font-medium text-slate-800">
                      {order.estimated_order_date}
                    </span>
                  </div>

                  {/* Actual Order Date */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">실제 납기</p>
                    <span className="text-xs font-medium text-slate-800">
                      {order.actual_order_date || "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 