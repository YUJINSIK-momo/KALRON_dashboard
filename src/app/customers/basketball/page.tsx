"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
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
  phone_number?: string
  email?: string
  woocommerce_registered?: boolean
  last_updated?: string
  woocommerce_payment_count: number
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
    time_to_payment_after_ordersheet: 0,
    phone_number: "010-1234-5678",
    email: "kim@example.com",
    woocommerce_registered: true,
    last_updated: "",
    woocommerce_payment_count: 1
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
    time_to_payment_after_ordersheet: 0,
    phone_number: "010-2345-6789",
    email: "lee@example.com",
    woocommerce_registered: false,
    last_updated: "",
    woocommerce_payment_count: 2
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
    time_to_payment_after_ordersheet: 1,
    phone_number: "010-3456-7890",
    email: "park@example.com",
    woocommerce_registered: true,
    last_updated: "",
    woocommerce_payment_count: 3
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
    time_to_payment_after_ordersheet: 0,
    woocommerce_payment_count: 0
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
    time_to_payment_after_ordersheet: 0,
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
    case "첫 메시지": return "text-purple-600 bg-purple-50"
    case "첫 대화": return "text-purple-600 bg-purple-50"
    case "시안 요청 중": return "text-orange-600 bg-orange-50"
    case "시안 컨펌 중": return "text-orange-600 bg-orange-50"
    case "시안 수정 중": return "text-orange-600 bg-orange-50"
    case "디자인 진행중": return "text-orange-600 bg-orange-50"
    case "디자인 확정": return "text-green-600 bg-green-50"
    case "오더시트 요청": return "text-indigo-600 bg-indigo-50"
    case "오더시트 작성": return "text-indigo-600 bg-indigo-50"
    case "오더시트 작성 완료": return "text-indigo-600 bg-indigo-50"
    case "견적서 전달": return "text-yellow-600 bg-yellow-50"
    case "결제 완료": return "text-emerald-600 bg-emerald-50"
    case "결제 대기 중": return "text-yellow-600 bg-yellow-50"
    case "결제 실패": return "text-red-600 bg-red-50"
    case "재 구매": return "text-purple-600 bg-purple-50"
    case "샘플대여 요청": return "text-blue-600 bg-blue-50"
    case "샘플발송완료": return "text-green-600 bg-green-50"
    case "리치메뉴만 클릭": return "text-gray-600 bg-gray-50"
    case "드랍": return "text-red-600 bg-red-50"
    case "오더홀딩": return "text-yellow-600 bg-yellow-50"
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

const getWooCommerceTag = (paymentCount: number) => {
  if (paymentCount === 0) return null
  if (paymentCount === 1) return { text: "기존", color: "bg-blue-100 text-blue-800" }
  if (paymentCount === 2) return { text: "재구매", color: "bg-green-100 text-green-800" }
  if (paymentCount >= 3) return { text: "VIP", color: "bg-purple-100 text-purple-800" }
  return null
}

export default function BasketballCustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<BasketballCustomer | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState<string>("all")
  const [monthFilter, setMonthFilter] = useState<string>("none")
  const [lastMessageFilter, setLastMessageFilter] = useState<string>("none")
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const filteredCustomers = basketballCustomers.filter(customer => {
    const matchesSearch = customer.line_user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customer_team_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === "all" || customer.customer_journey_stage === stageFilter
    
    let matchesMonth = true
    if (monthFilter !== "none") {
      const customerDate = new Date(customer.friend_added_date)
      const customerYearMonth = `${customerDate.getFullYear()}-${String(customerDate.getMonth() + 1).padStart(2, '0')}`
      matchesMonth = customerYearMonth === monthFilter
    }
    
    let matchesLastMessage = true
    if (lastMessageFilter !== "none") {
      const customerDate = new Date(customer.last_message_date)
      const customerYearMonth = `${customerDate.getFullYear()}-${String(customerDate.getMonth() + 1).padStart(2, '0')}`
      matchesLastMessage = customerYearMonth === lastMessageFilter
    }
    
    return matchesSearch && matchesStage && matchesMonth && matchesLastMessage
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex)

  const handleCustomerClick = (customer: BasketballCustomer) => {
    setSelectedCustomer(customer)
    setShowModal(true)
  }

  const handleUpdateCustomer = () => {
    const now = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    setLastUpdated(now)

    // TODO: API 연동 시 여기에 실제 업데이트 로직 추가
    console.log('고객 정보 업데이트:', selectedCustomer?.id)
  }

  const clearFilters = () => {
    setStageFilter("all")
    setMonthFilter("none")
    setLastMessageFilter("none")
    setSearchTerm("")
    setCurrentPage(1)
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
            
            {/* Stage Filter */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[160px] shadow-lg"
            >
              <option value="all">모든 단계</option>
              <option value="친구 추가됨">친구 추가됨</option>
              <option value="첫 메시지">첫 메시지</option>
              <option value="첫 대화">첫 대화</option>
              <option value="시안 요청 중">시안 요청 중</option>
              <option value="시안 컨펌 중">시안 컨펌 중</option>
              <option value="시안 수정 중">시안 수정 중</option>
              <option value="디자인 진행중">디자인 진행중</option>
              <option value="디자인 확정">디자인 확정</option>
              <option value="오더시트 요청">오더시트 요청</option>
              <option value="오더시트 작성">오더시트 작성</option>
              <option value="오더시트 작성 완료">오더시트 작성 완료</option>
              <option value="견적서 전달">견적서 전달</option>
              <option value="결제 완료">결제 완료</option>
              <option value="결제 대기 중">결제 대기 중</option>
              <option value="결제 실패">결제 실패</option>
              <option value="재 구매">재 구매</option>
              <option value="샘플대여 요청">샘플대여 요청</option>
              <option value="샘플발송완료">샘플발송완료</option>
              <option value="리치메뉴만 클릭">리치메뉴만 클릭</option>
              <option value="드랍">드랍</option>
              <option value="오더홀딩">오더홀딩</option>
            </select>

            {/* Month Filter */}
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[160px] shadow-lg"
            >
              <option value="none">전체 기간(친구추가)</option>
              <option value="2025-12">2025년 12월</option>
              <option value="2025-11">2025년 11월</option>
              <option value="2025-10">2025년 10월</option>
              <option value="2025-09">2025년 9월</option>
              <option value="2025-08">2025년 8월</option>
              <option value="2025-07">2025년 7월</option>
              <option value="2025-06">2025년 6월</option>
              <option value="2025-05">2025년 5월</option>
              <option value="2025-04">2025년 4월</option>
              <option value="2025-03">2025년 3월</option>
              <option value="2025-02">2025년 2월</option>
              <option value="2025-01">2025년 1월</option>
              <option value="2024-12">2024년 12월</option>
              <option value="2024-11">2024년 11월</option>
              <option value="2024-10">2024년 10월</option>
              <option value="2024-09">2024년 9월</option>
              <option value="2024-08">2024년 8월</option>
              <option value="2024-07">2024년 7월</option>
              <option value="2024-06">2024년 6월</option>
              <option value="2024-05">2024년 5월</option>
              <option value="2024-04">2024년 4월</option>
              <option value="2024-03">2024년 3월</option>
              <option value="2024-02">2024년 2월</option>
              <option value="2024-01">2024년 1월</option>
            </select>

            {/* Last Message Filter */}
            <select
              value={lastMessageFilter}
              onChange={(e) => setLastMessageFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[160px] shadow-lg"
            >
              <option value="none">전체 기간(대화)</option>
              <option value="2025-12">2025년 12월</option>
              <option value="2025-11">2025년 11월</option>
              <option value="2025-10">2025년 10월</option>
              <option value="2025-09">2025년 9월</option>
              <option value="2025-08">2025년 8월</option>
              <option value="2025-07">2025년 7월</option>
              <option value="2025-06">2025년 6월</option>
              <option value="2025-05">2025년 5월</option>
              <option value="2025-04">2025년 4월</option>
              <option value="2025-03">2025년 3월</option>
              <option value="2025-02">2025년 2월</option>
              <option value="2025-01">2025년 1월</option>
              <option value="2024-12">2024년 12월</option>
              <option value="2024-11">2024년 11월</option>
              <option value="2024-10">2024년 10월</option>
              <option value="2024-09">2024년 9월</option>
              <option value="2024-08">2024년 8월</option>
              <option value="2024-07">2024년 7월</option>
              <option value="2024-06">2024년 6월</option>
              <option value="2024-05">2024년 5월</option>
              <option value="2024-04">2024년 4월</option>
              <option value="2024-03">2024년 3월</option>
              <option value="2024-02">2024년 2월</option>
              <option value="2024-01">2024년 1월</option>
            </select>

            {/* Clear Filters */}
            {(stageFilter !== "all" || monthFilter !== "none" || lastMessageFilter !== "none" || searchTerm) && (
              <Button
                onClick={clearFilters}
                className="gradient-primary text-white px-3 py-2 rounded-lg shadow-lg font-medium"
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
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
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
              {currentCustomers.map((customer) => (
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
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-1">
                        <h3 className="font-semibold text-slate-800 text-xs">{customer.line_user_name}</h3>
                        {getWooCommerceTag(customer.woocommerce_payment_count) && (
                          <span className={`text-xs px-1 py-0.5 rounded-full ${getWooCommerceTag(customer.woocommerce_payment_count)?.color}`}>
                            {getWooCommerceTag(customer.woocommerce_payment_count)?.text}
                          </span>
                        )}
                      </div>
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

                  {/* Payment */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">결제</p>
                    <span className="text-xs font-medium text-slate-800">
                      ¥{customer.total_payment_amount.toLocaleString()}
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
                <h2 className="text-2xl font-bold text-slate-800">농구 고객 상세 정보</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleUpdateCustomer}
                    className="gradient-primary text-white"
                  >
                    수정
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowModal(false)}
                    className="hover:bg-gray-100"
                  >
                    <span className="text-2xl">×</span>
                  </Button>
                </div>
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
                        <span className="text-sm text-slate-600">고객 유형</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.customer_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">전화번호</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.phone_number || "미등록"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">이메일</span>
                        <span className="text-sm font-medium text-slate-800">{selectedCustomer.email || "미등록"}</span>
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
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">우커머스 등록</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${selectedCustomer.woocommerce_registered ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                          {selectedCustomer.woocommerce_registered ? '등록됨' : '미등록'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {lastUpdated && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">마지막 갱신:</span> {lastUpdated}
                      </p>
                    </div>
                  )}

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