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
    RefreshCw
} from "lucide-react"
import { useState, useEffect } from "react"
import { getOrders, type WooCommerceOrder } from "@/lib/woocommerce"

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

export default function BaseballWooCommercePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<WooCommerceOrder[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const ordersData = await getOrders(1, 100)
      setOrders(ordersData)
    } catch (error) {
      console.error('야구 주문 데이터 조회 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchOrders()
  }

  // 주문 통계 계산
  const orderStatistics = {
    total: orders.length,
    completed: orders.filter(order => order.status === 'completed').length,
    processing: orders.filter(order => order.status === 'processing').length,
    pending: orders.filter(order => order.status === 'pending').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length
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
                <span className="text-white font-bold text-sm">⚾</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                야구 우커머스 대시보드
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
        {/* Status Filter Bar */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-white/50 rounded-xl">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">모두 ({orderStatistics.total})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">결제 대기 중 ({orderStatistics.pending})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">진행 중 ({orderStatistics.processing})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">완료 ({orderStatistics.completed})</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white/50 rounded-xl">
          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              <option>일괄 작업</option>
            </select>
            <Button variant="outline" size="sm">적용</Button>
            
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              <option>모든 날짜</option>
            </select>
            
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              <option>모든 판매 채널</option>
            </select>
            
            <Button variant="outline" size="sm">필터</Button>
            <Button variant="outline" size="sm">Export to CSV</Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="야구 주문 검색..." 
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            />
            <Button size="sm">주문 검색</Button>
          </div>
        </div>

        {/* Order Status Chart */}
        <Card className="glass hover:shadow-xl transition-all duration-300 mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-slate-800">야구 주문 상태</CardTitle>
            </div>
            <CardDescription className="text-slate-600">
              현재 야구 주문 상태별 분포
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
                    {isLoading ? '...' : orderStatistics.completed}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isLoading ? '...' : orderStatistics.total > 0 ? `(${((orderStatistics.completed / orderStatistics.total) * 100).toFixed(1)}%)` : '(0%)'}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${orderStatistics.total > 0 ? (orderStatistics.completed / orderStatistics.total) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">처리중</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-800">
                    {isLoading ? '...' : orderStatistics.processing}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isLoading ? '...' : orderStatistics.total > 0 ? `(${((orderStatistics.processing / orderStatistics.total) * 100).toFixed(1)}%)` : '(0%)'}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${orderStatistics.total > 0 ? (orderStatistics.processing / orderStatistics.total) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">대기중</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-800">
                    {isLoading ? '...' : orderStatistics.pending}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isLoading ? '...' : orderStatistics.total > 0 ? `(${((orderStatistics.pending / orderStatistics.total) * 100).toFixed(1)}%)` : '(0%)'}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${orderStatistics.total > 0 ? (orderStatistics.pending / orderStatistics.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="glass hover:shadow-xl transition-all duration-300">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="text-sm text-slate-600 mt-2">야구 주문 데이터를 불러오는 중...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-slate-300" />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        주문 ↕
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        날짜 ↕
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        상품
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        청구
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        배송지
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        총계 ↕
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Export Status ↕
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {orders.slice(0, 20).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <input type="checkbox" className="rounded border-slate-300" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-900">
                              #{order.number} {order.billing.first_name} {order.billing.last_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          {new Date(order.date_created).toLocaleString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)} text-white`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900">
                          {order.line_items.map(item => item.name).join(', ')}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          <div>
                            <div>{order.billing.address_1}, {order.billing.city}</div>
                            <div className="text-xs text-slate-400">{order.payment_method_title}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          <div>
                            <div>{order.shipping.address_1}, {order.shipping.city}</div>
                            <div className="text-xs text-slate-400">- 送料</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">
                          {order.currency} {parseFloat(order.total).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          -
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-sm text-slate-600">야구 주문 데이터가 없습니다</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-500">
            {orderStatistics.total} 아이템
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">총 {Math.ceil(orderStatistics.total / 20)} 페이지 중 1 번째 페이지</span>
            <Button variant="outline" size="sm" disabled>‹</Button>
            <Button variant="outline" size="sm">›</Button>
          </div>
        </div>
      </main>
    </div>
  )
} 