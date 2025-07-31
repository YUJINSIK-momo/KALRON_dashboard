"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart3,
    Clock,
    DollarSign,
    Download,
    Eye,
    EyeOff,
    Filter,
    Package,
    PieChart,
    RefreshCw,
    ShoppingCart,
    TrendingUp,
    Users
} from "lucide-react"
import { useState, useEffect } from "react"
import { getOrders, getOrderStats, type WooCommerceOrder } from "@/lib/woocommerce"

// 샘플 우커머스 데이터
const woocommerceData = {
  orders: {
    total: 156,
    today: 12,
    thisWeek: 45,
    thisMonth: 156,
    pending: 8,
    processing: 15,
    completed: 133,
    cancelled: 3
  },
  revenue: {
    total: 23450000,
    today: 1800000,
    thisWeek: 8500000,
    thisMonth: 23450000,
    average: 150320
  },
  customers: {
    total: 89,
    new: 12,
    returning: 77,
    active: 67
  },
  products: {
    total: 45,
    lowStock: 3,
    outOfStock: 1,
    topSelling: [
      { name: "TEAM HANEDA 1st", sales: 23, revenue: 3450000 },
      { name: "TEAM TOKYO 2nd", sales: 18, revenue: 2700000 },
      { name: "TEAM OSAKA 1st", sales: 15, revenue: 2250000 },
      { name: "TEAM KYOTO 1st", sales: 12, revenue: 1800000 },
      { name: "TEAM YOKOHAMA 1st", sales: 10, revenue: 1500000 }
    ]
  },
  recentOrders: [
    {
      id: "ORD-001",
      customer: "김철수",
      team: "TEAM HANEDA",
      product: "1st 유니폼",
      amount: 75000,
      status: "completed",
      date: "2024-12-19 14:30"
    },
    {
      id: "ORD-002",
      customer: "이영희",
      team: "TEAM TOKYO",
      product: "2nd 유니폼",
      amount: 75000,
      status: "processing",
      date: "2024-12-19 13:45"
    },
    {
      id: "ORD-003",
      customer: "박민수",
      team: "TEAM OSAKA",
      product: "1st 유니폼",
      amount: 75000,
      status: "pending",
      date: "2024-12-19 12:20"
    },
    {
      id: "ORD-004",
      customer: "최지영",
      team: "TEAM KYOTO",
      product: "1st 유니폼",
      amount: 75000,
      status: "completed",
      date: "2024-12-19 11:15"
    },
    {
      id: "ORD-005",
      customer: "정현우",
      team: "TEAM YOKOHAMA",
      product: "1st 유니폼",
      amount: 75000,
      status: "processing",
      date: "2024-12-19 10:30"
    }
  ]
}

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

export default function WooCommercePage() {
  const [showRevenue, setShowRevenue] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<WooCommerceOrder[]>([])
  const [orderStats, setOrderStats] = useState<any>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const ordersData = await getOrders(1, 100)
      setOrders(ordersData)
      
      const statsData = await getOrderStats()
      setOrderStats(statsData)
    } catch (error) {
      console.error('주문 데이터 조회 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchOrders()
  }

  // 주문 통계 계산
  const orderStats = {
    total: orders.length,
    completed: orders.filter(order => order.status === 'completed').length,
    processing: orders.filter(order => order.status === 'processing').length,
    pending: orders.filter(order => order.status === 'pending').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length
  }

  // 총 매출 계산
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🛒</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                우커머스 대시보드
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-white/20 rounded-xl"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-64">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">총 주문</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {isLoading ? '...' : orderStats.total}
                  </p>
                  <p className="text-xs text-emerald-600">실시간 데이터</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-success rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">총 매출</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {isLoading ? '...' : `₩${(totalRevenue / 1000).toFixed(0)}K`}
                  </p>
                  <p className="text-xs text-emerald-600">실시간 데이터</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">처리중</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {isLoading ? '...' : orderStats.processing}
                  </p>
                  <p className="text-xs text-blue-600">현재 처리중</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-warning rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">완료</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {isLoading ? '...' : orderStats.completed}
                  </p>
                  <p className="text-xs text-emerald-600">완료된 주문</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-800">매출 현황</h2>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowRevenue(!showRevenue)}
            className="flex items-center space-x-2"
          >
            {showRevenue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showRevenue ? '숨기기' : '보기'}</span>
          </Button>
        </div>

        {/* Revenue Cards */}
        {showRevenue && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">오늘 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  ₩{(woocommerceData.revenue.today / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-emerald-600 mt-1">+15% 어제 대비</p>
              </CardContent>
            </Card>

            <Card className="glass hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">이번 주 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  ₩{(woocommerceData.revenue.thisWeek / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-emerald-600 mt-1">+8% 지난 주 대비</p>
              </CardContent>
            </Card>

            <Card className="glass hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">이번 달 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  ₩{(woocommerceData.revenue.thisMonth / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-emerald-600 mt-1">+12% 지난 달 대비</p>
              </CardContent>
            </Card>

            <Card className="glass hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">평균 주문액</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  ₩{(woocommerceData.revenue.average / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-emerald-600 mt-1">+5% 지난 달 대비</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Order Status Chart */}
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-slate-800">주문 상태</CardTitle>
              </div>
              <CardDescription className="text-slate-600">
                현재 주문 상태별 분포
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">완료</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-800">
                      {isLoading ? '...' : orderStats.completed}
                    </span>
                    <span className="text-xs text-slate-500">
                      {isLoading ? '...' : orderStats.total > 0 ? `(${((orderStats.completed / orderStats.total) * 100).toFixed(1)}%)` : '(0%)'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${orderStats.total > 0 ? (orderStats.completed / orderStats.total) * 100 : 0}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">처리중</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-800">
                      {isLoading ? '...' : orderStats.processing}
                    </span>
                    <span className="text-xs text-slate-500">
                      {isLoading ? '...' : orderStats.total > 0 ? `(${((orderStats.processing / orderStats.total) * 100).toFixed(1)}%)` : '(0%)'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${orderStats.total > 0 ? (orderStats.processing / orderStats.total) * 100 : 0}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">대기중</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-800">
                      {isLoading ? '...' : orderStats.pending}
                    </span>
                    <span className="text-xs text-slate-500">
                      {isLoading ? '...' : orderStats.total > 0 ? `(${((orderStats.pending / orderStats.total) * 100).toFixed(1)}%)` : '(0%)'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${orderStats.total > 0 ? (orderStats.pending / orderStats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-slate-800">인기 상품</CardTitle>
              </div>
              <CardDescription className="text-slate-600">
                매출 기준 상위 상품
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {woocommerceData.products.topSelling.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.sales}개 판매</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-800">
                      ₩{(product.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="glass hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-slate-800">최근 주문</CardTitle>
              </div>
              <Button className="gradient-primary text-white text-sm">
                전체 보기
              </Button>
            </div>
            <CardDescription className="text-slate-600">
              최근 24시간 내 주문 현황
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                  <p className="text-sm text-slate-600 mt-2">주문 데이터를 불러오는 중...</p>
                </div>
              ) : orders.length > 0 ? (
                orders.slice(0, 10).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">#{order.number}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {order.billing.first_name} {order.billing.last_name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {order.line_items.map(item => item.name).join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-800">
                          {order.currency} {parseFloat(order.total).toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(order.date_created).toLocaleString('ko-KR')}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)} text-white`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-sm text-slate-600">주문 데이터가 없습니다</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 