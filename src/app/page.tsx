import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Activity,
    Award,
    Bell,
    Search,
    Settings,
    ShoppingCart,
    Sparkles,
    TrendingUp,
    Users,
    Zap
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const quickStats = {
    totalCustomers: 156,
    activeOrders: 23,
    totalRevenue: 23450000,
    pendingTasks: 8
  }

  const quickActions = [
    {
      title: "고객 관리",
      description: "고객 목록 및 상세 정보 관리",
      icon: Users,
      href: "/customers",
      color: "gradient-primary",
      stats: `${quickStats.totalCustomers}명`
    },
    {
      title: "우커머스",
      description: "주문 및 매출 현황 대시보드",
      icon: ShoppingCart,
      href: "/woocommerce",
      color: "gradient-success",
      stats: `${quickStats.activeOrders}개 주문`
    },
    {
      title: "설정",
      description: "시스템 설정 및 관리",
      icon: Settings,
      href: "/settings",
      color: "gradient-secondary",
      stats: "관리"
    }
  ]

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
                유니폼 주문 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="전체 검색..."
                  className="pl-10 pr-4 py-2 border border-white/20 rounded-xl bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                />
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-xl">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-64">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-6 w-6 text-indigo-500" />
            <h2 className="text-3xl font-bold text-slate-800">안녕하세요! 👋</h2>
          </div>
          <p className="text-slate-600 text-lg">유니폼 주문 관리 시스템에 오신 것을 환영합니다</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">총 고객</p>
                  <p className="text-2xl font-bold text-slate-800">{quickStats.totalCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-success rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">활성 주문</p>
                  <p className="text-2xl font-bold text-slate-800">{quickStats.activeOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">총 매출</p>
                  <p className="text-2xl font-bold text-slate-800">₩{(quickStats.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-warning rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">대기 작업</p>
                  <p className="text-2xl font-bold text-slate-800">{quickStats.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-bold text-slate-800">빠른 작업</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="glass hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{action.stats}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{action.title}</h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="glass hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-slate-800">최근 활동</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">새로운 주문 접수</p>
                  <p className="text-xs text-slate-600">TEAM HANEDA 1st 유니폼 주문이 접수되었습니다</p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">2분 전</span>
              </div>

              <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">결제 완료</p>
                  <p className="text-xs text-slate-600">₩75,000 결제가 완료되었습니다</p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">5분 전</span>
              </div>

              <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">새 고객 등록</p>
                  <p className="text-xs text-slate-600">TEAM TOKYO가 새로 등록되었습니다</p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">10분 전</span>
              </div>

              <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">디자인 승인</p>
                  <p className="text-xs text-slate-600">TEAM OSAKA 디자인이 승인되었습니다</p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">1시간 전</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
