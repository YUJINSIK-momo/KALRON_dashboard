"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    CheckCircle,
    Clock,
    Search,
    TrendingUp,
    Users
} from "lucide-react"
import { useState } from "react"

// 농구 고객 데이터 타입 정의
interface BasketballCustomer {
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
  friend_added_date: string
  friend_add_status: string
  time_to_send_first_design: number
  time_to_complete_ordersheet_after_design: number
  time_to_payment_after_ordersheet: number
}

// 샘플 농구 고객 데이터
const basketballCustomers: BasketballCustomer[] = [
  {
    id: 1,
    line_user_id: "U1234567890abcdef",
    line_user_name: "김철수",
    customer_team_name: "TEAM HANEDA BASKETBALL",
    sport_type: "농구",
    brand: "Nike",
    customer_type: "신규",
    customer_journey_stage: "디자인 진행중",
    progress_status: "진행중",
    last_message_date: "2024-12-19",
    total_payment_amount: 150000,
    payment_status: "결제 완료",
    tracking_count: 3,
    order_sequence: 1,
    friend_added_date: "2024-12-10",
    friend_add_status: "친구 추가됨",
    time_to_send_first_design: 2,
    time_to_complete_ordersheet_after_design: 1,
    time_to_payment_after_ordersheet: 0
  },
  {
    id: 2,
    line_user_id: "U0987654321fedcba",
    line_user_name: "이영희",
    customer_team_name: "TEAM TOKYO BASKETBALL",
    sport_type: "농구",
    brand: "Adidas",
    customer_type: "기존",
    customer_journey_stage: "오더시트 작성",
    progress_status: "대기중",
    last_message_date: "2024-12-18",
    total_payment_amount: 0,
    payment_status: "미결제",
    tracking_count: 1,
    order_sequence: 2,
    friend_added_date: "2024-12-08",
    friend_add_status: "차단됨",
    time_to_send_first_design: 3,
    time_to_complete_ordersheet_after_design: 0,
    time_to_payment_after_ordersheet: 0
  },
  {
    id: 3,
    line_user_id: "Uabcdef1234567890",
    line_user_name: "박민수",
    customer_team_name: "TEAM OSAKA BASKETBALL",
    sport_type: "농구",
    brand: "Puma",
    customer_type: "신규",
    customer_journey_stage: "결제 완료",
    progress_status: "완료",
    last_message_date: "2024-12-17",
    total_payment_amount: 200000,
    payment_status: "결제 완료",
    tracking_count: 5,
    order_sequence: 3,
    friend_added_date: "2024-12-05",
    friend_add_status: "친구 추가됨",
    time_to_send_first_design: 1,
    time_to_complete_ordersheet_after_design: 2,
    time_to_payment_after_ordersheet: 1
  },
  {
    id: 4,
    line_user_id: "Ufedcba0987654321",
    line_user_name: "최지영",
    customer_team_name: "TEAM KYOTO BASKETBALL",
    sport_type: "농구",
    brand: "Nike",
    customer_type: "기존",
    customer_journey_stage: "친구 추가됨",
    progress_status: "대기중",
    last_message_date: "2024-12-16",
    total_payment_amount: 0,
    payment_status: "미결제",
    tracking_count: 0,
    order_sequence: 4,
    friend_added_date: "2024-12-16",
    friend_add_status: "친구 추가됨",
    time_to_send_first_design: 0,
    time_to_complete_ordersheet_after_design: 0,
    time_to_payment_after_ordersheet: 0
  },
  {
    id: 5,
    line_user_id: "U1234567890abcdef",
    line_user_name: "정수민",
    customer_team_name: "TEAM NAGOYA BASKETBALL",
    sport_type: "농구",
    brand: "Adidas",
    customer_type: "신규",
    customer_journey_stage: "첫 대화",
    progress_status: "진행중",
    last_message_date: "2024-12-15",
    total_payment_amount: 0,
    payment_status: "미결제",
    tracking_count: 2,
    order_sequence: 5,
    friend_added_date: "2024-12-03",
    friend_add_status: "차단됨",
    time_to_send_first_design: 0,
    time_to_complete_ordersheet_after_design: 0,
    time_to_payment_after_ordersheet: 0
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

const getFriendAddStatusColor = (status: string) => {
  switch (status) {
    case "친구 추가됨":
      return "bg-green-100 text-green-800"
    case "차단됨":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BasketballCustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<BasketballCustomer | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [stageFilter, setStageFilter] = useState<string>("all")
  const [friendDateSort, setFriendDateSort] = useState<string>("none")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all")

  const filteredCustomers = basketballCustomers.filter(customer => {
    const matchesSearch = customer.line_user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customer_team_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.progress_status === statusFilter
    const matchesStage = stageFilter === "all" || customer.customer_journey_stage === stageFilter
    const matchesPaymentStatus = paymentStatusFilter === "all" || customer.payment_status === paymentStatusFilter
    
    return matchesSearch && matchesStatus && matchesStage && matchesPaymentStatus
  }).sort((a, b) => {
    if (friendDateSort === "asc") {
      return new Date(a.friend_added_date).getTime() - new Date(b.friend_added_date).getTime()
    } else if (friendDateSort === "desc") {
      return new Date(b.friend_added_date).getTime() - new Date(a.friend_added_date).getTime()
    }
    return 0
  })

  const handleCustomerClick = (customer: BasketballCustomer) => {
    setSelectedCustomer(customer)
    setShowModal(true)
  }

  const clearFilters = () => {
    setStatusFilter("all")
    setStageFilter("all")
    setFriendDateSort("none")
    setPaymentStatusFilter("all")
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      {/* Header */}
      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏀</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                농구 고객 관리
              </h1>
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
                placeholder="농구 고객 검색..."
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
              <option value="진행중">진행중</option>
              <option value="대기중">대기중</option>
              <option value="완료">완료</option>
              <option value="취소">취소</option>
            </select>

            {/* Stage Filter */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[160px] shadow-lg"
            >
              <option value="all">모든 단계</option>
              <option value="친구 추가됨">친구 추가됨</option>
              <option value="첫 대화">첫 대화</option>
              <option value="디자인 진행중">디자인 진행중</option>
              <option value="오더시트 작성">오더시트 작성</option>
              <option value="결제 완료">결제 완료</option>
            </select>

            {/* Friend Date Sort */}
            <select
              value={friendDateSort}
              onChange={(e) => setFriendDateSort(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[140px] shadow-lg"
            >
              <option value="none">정렬 없음</option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>

            {/* Payment Status Filter */}
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[160px] shadow-lg"
            >
              <option value="all">모든 결제 상태</option>
              <option value="결제 완료">결제 완료</option>
              <option value="미결제">미결제</option>
              <option value="부분 결제">부분 결제</option>
              <option value="환불">환불</option>
            </select>

            {/* Clear Filters */}
            {(statusFilter !== "all" || stageFilter !== "all" || friendDateSort !== "none" || paymentStatusFilter !== "all" || searchTerm) && (
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">총 농구 고객</p>
                  <p className="text-2xl font-bold text-slate-800">{basketballCustomers.length}</p>
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
                    {basketballCustomers.filter(c => c.progress_status === "진행중").length}
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
                    {basketballCustomers.filter(c => c.progress_status === "대기중").length}
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
                    {basketballCustomers.filter(c => c.progress_status === "완료").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <Card className="glass hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-slate-800">농구 고객 목록</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => handleCustomerClick(customer)}
                  className="grid grid-cols-10 gap-1 p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200 cursor-pointer border border-white/20 hover:border-indigo-200 items-center"
                >
                  {/* Customer Info */}
                  <div className="flex items-center space-x-2 col-span-2">
                    <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {customer.line_user_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-slate-800 text-xs">{customer.line_user_name}</h3>
                      <span className="text-xs text-slate-500">•</span>
                      <p className="text-xs text-slate-600 truncate">{customer.customer_team_name}</p>
                    </div>
                  </div>

                  {/* Friend Added Date */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">친구 추가</p>
                    <span className="text-xs font-medium text-slate-800">
                      {customer.friend_added_date}
                    </span>
                  </div>

                  {/* Stage */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">단계</p>
                    <span className={`text-xs px-1 py-0.5 rounded-full ${getStageColor(customer.customer_journey_stage)}`}>
                      {customer.customer_journey_stage}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">상태</p>
                    <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusColor(customer.progress_status)} text-white`}>
                      {customer.progress_status}
                    </span>
                  </div>

                  {/* Payment */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">결제</p>
                    <span className="text-xs font-medium text-slate-800">
                      ₩{customer.total_payment_amount.toLocaleString()}
                    </span>
                  </div>

                  {/* Tracking */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">추적</p>
                    <span className="text-xs font-medium text-slate-800">
                      {customer.tracking_count}회
                    </span>
                  </div>

                  {/* Delivery Times */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">전달1</p>
                    <span className="text-xs font-medium text-slate-800">
                      {customer.time_to_send_first_design}일
                    </span>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">전달2</p>
                    <span className="text-xs font-medium text-slate-800">
                      {customer.time_to_complete_ordersheet_after_design}일
                    </span>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">전달3</p>
                    <span className="text-xs font-medium text-slate-800">
                      {customer.time_to_payment_after_ordersheet}일
                    </span>
                  </div>
                </div>
              ))}
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
                <h2 className="text-2xl font-bold text-slate-800">농구 고객 상세 정보</h2>
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
                        <span className="text-sm text-slate-600">고객 ID</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.line_user_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">고객 유형</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.customer_type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">친구 추가 상태</h3>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">현재 상태</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getFriendAddStatusColor(selectedCustomer.friend_add_status)}`}>
                          {selectedCustomer.friend_add_status}
                        </span>
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

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">친구 추가일</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">친구 추가일</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.friend_added_date}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">전달 시간</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">전달1 (첫 디자인 전송)</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.time_to_send_first_design}일</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">전달2 (오더시트 완료)</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.time_to_complete_ordersheet_after_design}일</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">전달3 (결제 완료)</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.time_to_payment_after_ordersheet}일</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                                                        <div>
                     <h3 className="font-semibold text-slate-800 mb-2">최신결제 정보</h3>
                     <div className="space-y-2">
                       <div className="flex justify-between">
                         <span className="text-sm text-slate-600">총 결제 금액</span>
                         <span className="text-sm font-medium text-slate-800">₩{selectedCustomer.total_payment_amount.toLocaleString()}</span>
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
                     <h3 className="font-semibold text-slate-800 mb-2">메모</h3>
                     <textarea
                       placeholder="고객에 대한 메모를 입력하세요..."
                       className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-h-[100px] text-sm"
                       rows={4}
                     />
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