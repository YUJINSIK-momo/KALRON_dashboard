"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    CheckCircle,
    Clock,
    Filter,
    MoreHorizontal,
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
}

// 샘플 농구 고객 데이터
const basketballCustomers: BasketballCustomer[] = [
  {
    id: 1,
    line_user_id: "U1234567890abcdef",
    line_user_name: "박민수",
    customer_team_name: "TEAM OSAKA BASKETBALL",
    sport_type: "농구",
    brand: "Nike",
    customer_type: "신규",
    customer_journey_stage: "디자인 진행중",
    progress_status: "진행중",
    last_message_date: "2024-12-19",
    total_payment_amount: 200000,
    payment_status: "결제 완료",
    tracking_count: 5,
    order_sequence: 1
  },
  {
    id: 2,
    line_user_id: "U0987654321fedcba",
    line_user_name: "최지영",
    customer_team_name: "TEAM KYOTO BASKETBALL",
    sport_type: "농구",
    brand: "Adidas",
    customer_type: "기존",
    customer_journey_stage: "오더시트 작성",
    progress_status: "대기중",
    last_message_date: "2024-12-18",
    total_payment_amount: 0,
    payment_status: "미결제",
    tracking_count: 0,
    order_sequence: 2
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "진행중": return "text-blue-600 bg-blue-50"
    case "대기중": return "text-yellow-600 bg-yellow-50"
    case "완료": return "text-emerald-600 bg-emerald-50"
    case "취소": return "text-red-600 bg-red-50"
    default: return "text-gray-600 bg-gray-50"
  }
}

const getStageColor = (stage: string) => {
  switch (stage) {
    case "친구 추가됨": return "text-purple-600 bg-purple-50"
    case "첫 대화": return "text-indigo-600 bg-indigo-50"
    case "디자인 진행중": return "text-orange-600 bg-orange-50"
    case "오더시트 작성": return "text-indigo-600 bg-indigo-50"
    case "결제 완료": return "text-emerald-600 bg-emerald-50"
    default: return "text-gray-600 bg-gray-50"
  }
}

export default function BasketballCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = basketballCustomers.filter(customer =>
    customer.line_user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customer_team_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCustomerClick = (customer: BasketballCustomer) => {
    console.log('고객 선택:', customer)
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
                <span className="text-white font-bold text-sm">🏀</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                농구 고객 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="농구 고객 검색..."
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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-slate-800">농구 고객 목록</CardTitle>
              </div>
              <Button className="gradient-primary text-white text-sm">
                새 고객 추가
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredCustomers.map((customer) => (
                <div 
                  key={customer.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200 cursor-pointer"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🏀</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{customer.line_user_name}</h3>
                      <p className="text-sm text-slate-600">{customer.customer_team_name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(customer.progress_status)}`}>
                          {customer.progress_status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStageColor(customer.customer_journey_stage)}`}>
                          {customer.customer_journey_stage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-800">₩{customer.total_payment_amount.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">{customer.last_message_date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="hover:bg-white/20">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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