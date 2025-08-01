"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Search,
  TrendingUp,
  UserPlus,
  Users
} from "lucide-react"
import { useState } from "react"

// Customer 타입 정의
interface Customer {
  id: number
  line_user_id: string
  line_user_name: string
  customer_team_name: string
  sport_type: string
  brand: string
  customer_type: string
  customer_journey_stage: string
  progress_status: string
  last_message_date: string
  total_payment_amount: number
  payment_status: string
  tracking_count: number
  order_sequence: number
  woocommerce_payment_count: number
}

// 샘플 고객 데이터
const customers = [
  {
    id: 1,
    line_user_id: "U1234567890abcdef",
    line_user_name: "김철수",
    customer_team_name: "TEAM HANEDA",
    sport_type: "축구",
    brand: "Nike",
    customer_type: "신규",
    customer_journey_stage: "디자인 진행중",
    progress_status: "진행중",
    last_message_date: "2024-12-19",
    total_payment_amount: 150000,
    payment_status: "결제 완료",
    tracking_count: 3,
    order_sequence: 1,
    woocommerce_payment_count: 1
  },
  {
    id: 2,
    line_user_id: "U0987654321fedcba",
    line_user_name: "이영희",
    customer_team_name: "TEAM TOKYO",
    sport_type: "축구",
    brand: "Adidas",
    customer_type: "기존",
    customer_journey_stage: "오더시트 작성",
    progress_status: "대기중",
    last_message_date: "2024-12-18",
    total_payment_amount: 0,
    payment_status: "미결제",
    tracking_count: 1,
    order_sequence: 2,
    woocommerce_payment_count: 2
  },
  {
    id: 3,
    line_user_id: "Uabcdef1234567890",
    line_user_name: "박민수",
    customer_team_name: "TEAM OSAKA",
    sport_type: "축구",
    brand: "Puma",
    customer_type: "신규",
    customer_journey_stage: "결제 완료",
    progress_status: "완료",
    last_message_date: "2024-12-17",
    total_payment_amount: 200000,
    payment_status: "결제 완료",
    tracking_count: 5,
    order_sequence: 3,
    woocommerce_payment_count: 3
  },
  {
    id: 4,
    line_user_id: "Ufedcba0987654321",
    line_user_name: "최지영",
    customer_team_name: "TEAM KYOTO",
    sport_type: "축구",
    brand: "Nike",
    customer_type: "기존",
    customer_journey_stage: "친구 추가됨",
    progress_status: "대기중",
    last_message_date: "2024-12-16",
    total_payment_amount: 0,
    payment_status: "미결제",
    tracking_count: 0,
    order_sequence: 4,
    woocommerce_payment_count: 0
  },
  {
    id: 5,
    line_user_id: "U1234567890abcdef",
    line_user_name: "정현우",
    customer_team_name: "TEAM YOKOHAMA",
    sport_type: "축구",
    brand: "Adidas",
    customer_type: "신규",
    customer_journey_stage: "첫 대화",
    progress_status: "진행중",
    last_message_date: "2024-12-15",
    total_payment_amount: 0,
    payment_status: "미결제",
    tracking_count: 2,
    order_sequence: 5,
    woocommerce_payment_count: 1
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "완료": return "bg-emerald-500"
    case "진행중": return "bg-blue-500"
    case "대기중": return "bg-yellow-500"
    case "취소": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

const getStageColor = (stage: string) => {
  switch (stage) {
    case "친구 추가됨": return "text-blue-600 bg-blue-50"
    case "첫 대화": return "text-purple-600 bg-purple-50"
    case "디자인 진행중": return "text-orange-600 bg-orange-50"
    case "오더시트 작성": return "text-indigo-600 bg-indigo-50"
    case "결제 완료": return "text-emerald-600 bg-emerald-50"
    default: return "text-gray-600 bg-gray-50"
  }
}

const getWooCommerceTag = (paymentCount: number) => {
  if (paymentCount === 0) return null
  if (paymentCount === 1) return { text: "기존", color: "bg-blue-100 text-blue-800" }
  if (paymentCount === 2) return { text: "재구매", color: "bg-green-100 text-green-800" }
  if (paymentCount >= 3) return { text: "VIP", color: "bg-purple-100 text-purple-800" }
  return null
}

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const filteredCustomers = customers.filter(customer =>
    customer.line_user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customer_team_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex)

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowModal(true)
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
                <span className="text-white font-bold text-sm">⚽</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                고객 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="고객 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-white/20 rounded-xl bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                />
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-64">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">총 고객</p>
                  <p className="text-2xl font-bold text-slate-800">{customers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-success rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">진행중</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {customers.filter(c => c.progress_status === "진행중").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-warning rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">대기중</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {customers.filter(c => c.progress_status === "대기중").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">완료</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {customers.filter(c => c.progress_status === "완료").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <Card className="glass hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-slate-800">고객 목록</CardTitle>
              </div>
              <Button className="gradient-primary text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                새 고객 추가
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
                              {currentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => handleCustomerClick(customer)}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200 cursor-pointer border border-white/20 hover:border-indigo-200"
                >
                  {/* Customer Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {customer.line_user_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-slate-800">{customer.line_user_name}</h3>
                        {getWooCommerceTag(customer.woocommerce_payment_count) && (
                          <span className={`text-xs px-2 py-1 rounded-full ${getWooCommerceTag(customer.woocommerce_payment_count)?.color}`}>
                            {getWooCommerceTag(customer.woocommerce_payment_count)?.text}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{customer.customer_team_name}</p>
                    </div>
                  </div>

                  {/* Status Info */}
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">단계</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStageColor(customer.customer_journey_stage)}`}>
                        {customer.customer_journey_stage}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">상태</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(customer.progress_status)} text-white`}>
                        {customer.progress_status}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">결제</p>
                      <span className="text-xs font-medium text-slate-800">
                        ¥{customer.total_payment_amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">추적</p>
                      <span className="text-xs font-medium text-slate-800">
                        {customer.tracking_count}회
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-green-50">
                      <Phone className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-purple-50">
                      <Mail className="h-4 w-4 text-purple-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* 페이지네이션 */}
              {filteredCustomers.length > itemsPerPage && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600">
                    {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} / {filteredCustomers.length}개
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1"
                    >
                      이전
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="px-3 py-1 min-w-[40px]"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1"
                    >
                      다음
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Customer Detail Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">고객 상세 정보</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowModal(false)}
                  className="hover:bg-gray-100"
                >
                  <span className="text-2xl">×</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">기본 정보</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">팀명</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.customer_team_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">고객 ID</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.line_user_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">고객명</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.line_user_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">스포츠</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.sport_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">브랜드</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">고객 유형</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.customer_type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">진행 상황</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">현재 단계</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStageColor(selectedCustomer.customer_journey_stage)}`}>
                          {selectedCustomer.customer_journey_stage}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">상태</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedCustomer.progress_status)} text-white`}>
                          {selectedCustomer.progress_status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">추적 횟수</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.tracking_count}회</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">주문 순번</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.order_sequence}번째</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">결제 정보</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">총 결제 금액</span>
                        <span className="text-sm font-medium text-slate-800">¥{selectedCustomer.total_payment_amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">결제 상태</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedCustomer.payment_status)} text-white`}>
                          {selectedCustomer.payment_status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">마지막 메시지</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.last_message_date}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">빠른 작업</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="gradient-primary text-white text-sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        메시지
                      </Button>
                      <Button className="gradient-secondary text-white text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        전화
                      </Button>
                      <Button className="gradient-success text-white text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        이메일
                      </Button>
                      <Button className="gradient-warning text-white text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        일정
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 