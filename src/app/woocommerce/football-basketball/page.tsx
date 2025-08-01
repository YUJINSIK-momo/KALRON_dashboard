"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { lineClient, mapWooCommerceToLineCustomer, type LineCustomer } from "@/lib/line"
import { fetchOrdersFromAPI, type WooCommerceOrder } from "@/lib/woocommerce"
import {
  BarChart3,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Home,
  MapPin,
  Package,
  RefreshCw,
  Search
} from "lucide-react"
import { useEffect, useState } from "react"

// 우커머스 주문 데이터 타입 정의 (기존 인터페이스와 통합)
interface FootballBasketballOrder {
  id: number;
  order_number: string;
  customer_name: string;
  customer_team_name: string;
  estimate_name: string;
  quantity: number;
  total_amount: number;
  status: string;
  woocommerce_link: string;
  shipping_address: string;
  sample_refund_deadline: string;
  created_date: string;
  estimated_order_date: string;
  payment_method: string;
  category: string;
}

// 샘플 우커머스 주문 데이터 (API 연결 실패 시 폴백용)
const fallbackOrders: FootballBasketballOrder[] = [
  {
    id: 1,
    customer_team_name: "TEAM HANEDA FOOTBALL",
    order_number: "WC-2024-001",
    estimate_name: "축구 유니폼 優先制作",
    status: "completed",
    payment_method: "신용카드",
    total_amount: 150000,
    estimated_order_date: "2024-12-25",
    woocommerce_link: "https://example.com/product/1",
    shipping_address: "東京都港区六本木1-1-1",
    created_date: "2024-12-19 14:30",
    customer_name: "田中太郎",
    quantity: 1,
    sample_refund_deadline: "",
    category: "유니폼"
  },
  {
    id: 2,
    customer_team_name: "TEAM TOKYO BASKETBALL",
    order_number: "WC-2024-002",
    estimate_name: "농구 유니폼",
    status: "processing",
    payment_method: "계좌이체",
    total_amount: 180000,
    estimated_order_date: "2024-12-30",
    woocommerce_link: "https://example.com/product/2",
    shipping_address: "東京都新宿区西新宿2-2-2",
    created_date: "2024-12-19 13:45",
    customer_name: "佐藤花子",
    quantity: 2,
    sample_refund_deadline: "",
    category: "유니폼"
  },
  {
    id: 3,
    customer_team_name: "TEAM OSAKA FOOTBALL",
    order_number: "WC-2024-003",
    estimate_name: "축구 모자",
    status: "pending",
    payment_method: "신용카드",
    total_amount: 25000,
    estimated_order_date: "2024-12-28",
    woocommerce_link: "https://example.com/product/3",
    shipping_address: "大阪府大阪市北区梅田3-3-3",
    created_date: "2024-12-19 12:20",
    customer_name: "山田次郎",
    quantity: 1,
    sample_refund_deadline: "",
    category: "액세서리"
  },
  {
    id: 4,
    customer_team_name: "TEAM KYOTO BASKETBALL",
    order_number: "WC-2024-004",
    estimate_name: "농구 유니폼 優先制作",
    status: "completed",
    payment_method: "계좌이체",
    total_amount: 200000,
    estimated_order_date: "2024-12-20",
    woocommerce_link: "https://example.com/product/4",
    shipping_address: "京都府京都市中京区四条4-4-4",
    created_date: "2024-12-19 11:15",
    customer_name: "鈴木三郎",
    quantity: 3,
    sample_refund_deadline: "",
    category: "유니폼"
  },
  {
    id: 5,
    customer_team_name: "TEAM NAGOYA FOOTBALL",
    order_number: "WC-2024-005",
    estimate_name: "축구 양말",
    status: "processing",
    payment_method: "신용카드",
    total_amount: 15000,
    estimated_order_date: "2025-01-05",
    woocommerce_link: "https://example.com/product/5",
    shipping_address: "愛知県名古屋市中区栄5-5-5",
    created_date: "2024-12-19 10:30",
    customer_name: "高橋四郎",
    quantity: 1,
    sample_refund_deadline: "",
    category: "액세서리"
  },
  {
    id: 6,
    customer_team_name: "TEAM YOKOHAMA BASKETBALL",
    order_number: "WC-2024-006",
    estimate_name: "농구 장갑 優先制作",
    status: "completed",
    payment_method: "계좌이체",
    total_amount: 45000,
    estimated_order_date: "2024-12-22",
    woocommerce_link: "https://example.com/product/6",
    shipping_address: "神奈川県横浜市西区みなとみらい6-6-6",
    created_date: "2024-12-19 09:45",
    customer_name: "伊藤五郎",
    quantity: 1,
    sample_refund_deadline: "",
    category: "장비"
  },
  {
    id: 7,
    customer_team_name: "TEAM SAPPORO FOOTBALL",
    order_number: "WC-2024-007",
    estimate_name: "축구 배트",
    status: "pending",
    payment_method: "신용카드",
    total_amount: 80000,
    estimated_order_date: "2025-01-10",
    woocommerce_link: "https://example.com/product/7",
    shipping_address: "北海道札幌市中央区南1条7-7-7",
    created_date: "2024-12-19 08:20",
    customer_name: "渡辺六郎",
    quantity: 1,
    sample_refund_deadline: "",
    category: "장비"
  },
  {
    id: 8,
    customer_team_name: "TEAM FUKUOKA BASKETBALL",
    order_number: "WC-2024-008",
    estimate_name: "농구 유니폼",
    status: "completed",
    payment_method: "계좌이체",
    total_amount: 160000,
    estimated_order_date: "2024-12-18",
    woocommerce_link: "https://example.com/product/8",
    shipping_address: "福岡県福岡市博多区博多駅前8-8-8",
    created_date: "2024-12-19 07:15",
    customer_name: "中村七郎",
    quantity: 2,
    sample_refund_deadline: "",
    category: "유니폼"
  },
  {
    id: 9,
    customer_team_name: "TEAM KOBE FOOTBALL",
    order_number: "WC-2024-009",
    estimate_name: "축구 샘플 유니폼",
    status: "processing",
    payment_method: "신용카드",
    total_amount: 50000,
    estimated_order_date: "2025-01-15",
    woocommerce_link: "https://example.com/product/9",
    shipping_address: "兵庫県神戸市中央区三宮町9-9-9",
    sample_refund_deadline: "2025-01-31",
    created_date: "2024-12-19 06:30",
    customer_name: "小林八郎",
    quantity: 1,
    category: "유니폼"
  },
  {
    id: 10,
    customer_team_name: "TEAM HIROSHIMA BASKETBALL",
    order_number: "WC-2024-010",
    estimate_name: "농구 샘플 장갑",
    status: "processing",
    payment_method: "계좌이체",
    total_amount: 30000,
    estimated_order_date: "2025-01-20",
    woocommerce_link: "https://example.com/product/10",
    shipping_address: "広島県広島市中区八丁堀10-10-10",
    sample_refund_deadline: "2025-01-31",
    created_date: "2024-12-19 05:45",
    customer_name: "加藤九郎",
    quantity: 1,
    category: "장비"
  },
  {
    id: 11,
    customer_team_name: "TEAM OSAKA FOOTBALL",
    order_number: "WC-2024-011",
    estimate_name: "サッカー サンプル ユニフォーム",
    status: "processing",
    payment_method: "신용카드",
    total_amount: 40000,
    estimated_order_date: "2025-01-25",
    woocommerce_link: "https://example.com/product/11",
    shipping_address: "大阪府大阪市中央区心斎橋11-11-11",
    sample_refund_deadline: "2025-02-28",
    created_date: "2024-12-19 04:30",
    customer_name: "斎藤十郎",
    quantity: 1,
    category: "유니폼"
  },
  {
    id: 12,
    customer_team_name: "TEAM TOKYO BASKETBALL",
    order_number: "WC-2024-012",
    estimate_name: "バスケ サンプル グローブ",
    status: "processing",
    payment_method: "계좌이체",
    total_amount: 35000,
    estimated_order_date: "2025-01-30",
    woocommerce_link: "https://example.com/product/12",
    shipping_address: "東京都渋谷区渋谷12-12-12",
    sample_refund_deadline: "2025-02-28",
    created_date: "2024-12-19 03:15",
    customer_name: "松本十一郎",
    quantity: 1,
    category: "장비"
  }
]

const getPaymentMethodText = (method: string) => {
  if (method.includes('銀行振込')) {
    return '銀行振込'
  } else if (method.includes('Visa/Mastercard/JCB')) {
    return 'カード決済'
  } else if (method.includes('komoju')) {
    return 'Komoju'
  } else if (method.includes('신용카드')) {
    return '신용카드'
  } else if (method.includes('계좌이체')) {
    return '계좌이체'
  } else {
    return method
  }
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
    case 'pending':
      return '결제 대기 중'
    case 'failed':
      return '실패'
    case 'processing':
      return '처리중'
    case 'completed':
      return '완료'
    case 'on-hold':
      return '제작 완료'
    case 'cancelled':
      return '취소됨'
    case 'refunded':
      return '환불됨'
    default:
      return '알 수 없음'
  }
}



// 샘플 환불 기한 계산 함수
const calculateSampleRefundDeadline = (orderDate: string, status: string) => {
  const date = new Date(orderDate)
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0) // 다음 달 마지막 날
  return status === "processing" ? nextMonth.toISOString().split('T')[0] : "";
}



// WooCommerce API 데이터를 내부 형식으로 변환
const transformWooCommerceOrder = (order: WooCommerceOrder, lineCustomer: LineCustomer | null): FootballBasketballOrder => {
  // 상품 정보 추출 (첫 번째 상품 기준)
  const firstItem = order.line_items?.[0] || null;
  const itemName = firstItem?.name || '상품명 없음';
  const productId = firstItem?.product_id || 0;
  
  // 상품 링크 생성
  const woocommerceLink = productId > 0 
    ? `https://kalron.co/product/?p=${productId}` 
    : 'https://kalron.co/shop/';
  
  // 배송 주소 생성
  const shipping = order.shipping || {};
  const shippingAddress = [
    shipping.address_1,
    shipping.address_2,
    shipping.city,
    shipping.state,
    shipping.postcode,
    shipping.country
  ].filter(Boolean).join(', ') || '배송지 정보 없음';
  
  // 샘플 환불 기한 계산
  const sampleRefundDeadline = calculateSampleRefundDeadline(order.date_created, order.status);
  
  // 고객 팀명 매핑 (라인에서 받은 팀명과 매핑)
  const customerName = lineCustomer?.name || `${order.billing?.first_name || ''} ${order.billing?.last_name || ''}`.trim() || '고객명 없음';
  const customerTeamName = lineCustomer?.team_name || '팀명 없음';
  
  return {
    id: order.id,
    order_number: order.number,
    customer_name: customerName,
    customer_team_name: customerTeamName,
    estimate_name: itemName,
    quantity: firstItem?.quantity || 1,
    total_amount: parseFloat(order.total) || 0,
    status: order.status,
    woocommerce_link: woocommerceLink,
    shipping_address: shippingAddress,
    sample_refund_deadline: sampleRefundDeadline,
    created_date: order.date_created,
    estimated_order_date: order.date_created,
    payment_method: order.payment_method_title || '결제 방법 없음',
    category: '기타'
  };
};

export default function FootballBasketballWooCommercePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sportFilter, setSportFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<FootballBasketballOrder | null>(null)
  const [orders, setOrders] = useState<FootballBasketballOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiConnected, setApiConnected] = useState(false)
  const [lineCustomers, setLineCustomers] = useState<LineCustomer[]>([])
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // API에서 주문 데이터 로드
  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setIsLoading(true)
    try {
      console.log('축구/농구 우커머스 페이지 - 주문 데이터 로드 시작')
      
      // 라인 고객 데이터 로드
      console.log('라인 고객 데이터 로드 시작')
      const lineCustomersData = await lineClient.getCustomers()
      setLineCustomers(lineCustomersData)
      console.log('라인 고객 데이터 로드 완료:', lineCustomersData.length, '명')
      
      // 실제 WooCommerce API에서 데이터 가져오기
      const wooCommerceOrders = await fetchOrdersFromAPI(1, 50)
      
      console.log('API 응답 받음:', wooCommerceOrders.length, '개 주문')
      
      if (wooCommerceOrders.length > 0) {
        // API 데이터를 내부 형식으로 변환 (라인 데이터와 매핑)
        const transformedOrders = wooCommerceOrders.map(order => {
          const lineCustomer = mapWooCommerceToLineCustomer(order, lineCustomersData)
          return transformWooCommerceOrder(order, lineCustomer)
        })
        setOrders(transformedOrders)
        setApiConnected(true)
        console.log('WooCommerce API 연결 성공:', transformedOrders.length, '개 주문 로드')
      } else {
        // API 연결 실패 시 폴백 데이터 사용
        console.log('API에서 주문 데이터가 없음, 폴백 데이터 사용')
        console.log('가능한 원인:')
        console.log('- 환경 변수가 설정되지 않음')
        console.log('- WooCommerce API 키가 잘못됨')
        console.log('- 실제 WooCommerce 스토어에 주문이 없음')
        console.log('- API 엔드포인트 URL이 잘못됨')
        setOrders(fallbackOrders)
        setApiConnected(false)
      }
    } catch (error) {
      console.error('주문 데이터 로드 실패:', error)
      console.log('폴백 데이터로 전환')
      setOrders(fallbackOrders)
      setApiConnected(false)
    } finally {
      setIsLoading(false)
      console.log('주문 데이터 로드 완료')
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer_team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.estimate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.order_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    // 스포츠 필터링
    let matchesSport = true
    if (sportFilter !== "all") {
      if (sportFilter === "football") {
        matchesSport = order.estimate_name.includes("축구") || order.estimate_name.includes("サッカー")
      } else if (sportFilter === "basketball") {
        matchesSport = order.estimate_name.includes("농구") || order.estimate_name.includes("バスケ")
      }
    }
    
    // 갱신 날짜 필터링
    let matchesDate = true
    if (dateFilter !== "all") {
      const orderDate = new Date(order.created_date)
      const filterDate = new Date(dateFilter)
      const orderYear = orderDate.getFullYear()
      const orderMonth = orderDate.getMonth()
      const filterYear = filterDate.getFullYear()
      const filterMonth = filterDate.getMonth()
      matchesDate = orderYear === filterYear && orderMonth === filterMonth
    }
    
    // 즐겨찾기 필터링
    const matchesFavorite = !showFavoritesOnly || favorites.has(order.id)
    
    return matchesSearch && matchesStatus && matchesSport && matchesDate && matchesFavorite
  })

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const clearFilters = () => {
    setStatusFilter("all")
    setSportFilter("all")
    setDateFilter("all")
    setSearchTerm("")
    setShowFavoritesOnly(false)
    setCurrentPage(1)
  }

  const handleAddressClick = (address: string) => {
    setSelectedAddress(address)
    setShowAddressModal(true)
  }

  const openGoogleMaps = (address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(googleMapsUrl, '_blank')
  }

  const handleDetailClick = (order: FootballBasketballOrder) => {
    setSelectedOrder(order)
    setShowDetailModal(true)
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
    setSelectedOrder(null)
  }

  const toggleFavorite = (orderId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(orderId)) {
        newFavorites.delete(orderId)
      } else {
        newFavorites.add(orderId)
      }
      return newFavorites
    })
  }

  // 주문 통계 계산
  const orderStatistics = {
    total: orders.length,
    completed: orders.filter(order => order.status === 'completed').length,
    processing: orders.filter(order => order.status === 'processing').length,
    pending: orders.filter(order => order.status === 'pending').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    return (
      <div className="text-center">
        <div className="text-xs font-medium text-slate-800">{year}-{month}-{day}</div>
        <div className="text-xs text-slate-600">{hours}:{minutes}:{seconds}</div>
      </div>
    )
  }

  const formatDateOnly = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
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
              {/* API 연결 상태 표시 */}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                apiConnected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {apiConnected ? 'API 연결됨' : '폴백 데이터'}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-white/20 rounded-xl"
                onClick={loadOrders}
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
              <option value="pending">결제 대기 중</option>
              <option value="failed">실패</option>
              <option value="processing">처리중</option>
              <option value="completed">완료</option>
              <option value="on-hold">제작 완료</option>
              <option value="cancelled">취소됨</option>
              <option value="refunded">환불됨</option>
            </select>

            {/* Sport Filter */}
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[140px] shadow-lg"
            >
              <option value="all">모든 스포츠</option>
              <option value="football">축구</option>
              <option value="basketball">농구</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border-2 border-white/30 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 min-w-[140px] shadow-lg"
            >
              <option value="all">모든 날짜</option>
              <option value="2025-01">2025년 1월</option>
              <option value="2025-02">2025년 2월</option>
              <option value="2025-03">2025년 3월</option>
              <option value="2025-04">2025년 4월</option>
              <option value="2025-05">2025년 5월</option>
              <option value="2025-06">2025년 6월</option>
              <option value="2025-07">2025년 7월</option>
              <option value="2025-08">2025년 8월</option>
              <option value="2025-09">2025년 9월</option>
              <option value="2025-10">2025년 10월</option>
              <option value="2025-11">2025년 11월</option>
              <option value="2025-12">2025년 12월</option>
              <option value="2024-12">2024년 12월</option>
              <option value="2024-11">2024년 11월</option>
              <option value="2024-10">2024년 10월</option>
              <option value="2024-09">2024년 9월</option>
              <option value="2024-08">2024년 8월</option>
              <option value="2024-07">2024년 7월</option>
              <option value="2024-06">2024년 6월</option>
            </select>

            {/* Favorite Filter */}
            <Button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-3 py-2 border-2 rounded-xl transition-all duration-200 min-w-[140px] shadow-lg ${
                showFavoritesOnly 
                  ? 'border-yellow-500 bg-yellow-100 text-yellow-800' 
                  : 'border-white/30 bg-white/80 text-slate-700'
              }`}
            >
              ⭐ 즐겨찾기만
            </Button>

            {/* Clear Filters */}
            {(statusFilter !== "all" || sportFilter !== "all" || dateFilter !== "all" || showFavoritesOnly || searchTerm) && (
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
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-sm text-slate-600 mt-2">주문 데이터를 불러오는 중...</p>
          </div>
        )}

        {/* Stats */}
        {!isLoading && (
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
        )}

        {/* Orders List */}
        {!isLoading && (
          <Card className="glass hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-slate-800">축구/농구 우커머스 주문 목록</CardTitle>
                <span className="text-sm text-slate-500">({filteredOrders.length}개)</span>
              </div>
            </CardHeader>
            <CardContent>
              {filteredOrders.length > 0 ? (
                <div className="space-y-3">
                  {currentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-12 gap-2 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-200 border border-white/20 hover:border-indigo-200 items-center"
                    >
                      {/* Favorite */}
                      <div className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6"
                          onClick={() => toggleFavorite(order.id)}
                        >
                          <span className={`text-lg ${favorites.has(order.id) ? 'text-yellow-500' : 'text-gray-400'}`}>
                            {favorites.has(order.id) ? '★' : '☆'}
                          </span>
                        </Button>
                      </div>

                      {/* Customer Team Name */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">고객 팀명</p>
                        <div className="text-xs font-medium text-slate-800 leading-tight">
                          {order.customer_team_name}
                        </div>
                      </div>

                      {/* Order Number */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">주문번호</p>
                        <span className="text-xs font-medium text-slate-800">
                          {order.order_number}
                        </span>
                      </div>

                      {/* Updated Date */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">갱신 날짜</p>
                        {formatDate(order.created_date)}
                      </div>

                      {/* Estimate Name */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">견적서명</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6"
                          onClick={() => handleDetailClick(order)}
                        >
                          <Eye className="h-3 w-3 text-purple-600" />
                        </Button>
                      </div>

                      {/* Status */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">상태</p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusColor(order.status)} text-white`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>

                      {/* Payment Amount */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">결제금액</p>
                        <span className="text-xs font-medium text-slate-800">
                          ¥{order.total_amount.toLocaleString()}
                        </span>
                      </div>

                      {/* WooCommerce Link */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">상품 링크</p>
                        {order.woocommerce_link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={() => window.open(order.woocommerce_link, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 text-blue-600" />
                          </Button>
                        )}
                      </div>

                      {/* Shipping Address */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">배송지</p>
                        {order.shipping_address && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={() => handleAddressClick(order.shipping_address)}
                          >
                            <Home className="h-3 w-3 text-green-600" />
                          </Button>
                        )}
                      </div>

                      {/* Estimated Order Date */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">예상 납기</p>
                        <span className="text-xs font-medium text-slate-800">
                          {formatDateOnly(order.estimated_order_date)}
                        </span>
                      </div>

                      {/* Actual Order Date */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">실제 납기</p>
                        <span className="text-xs font-medium text-slate-800">
                          {order.status === "completed" ? formatDateOnly(order.estimated_order_date) : "-"}
                        </span>
                      </div>

                      {/* Sample Refund Deadline */}
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">샘플 환불 기한</p>
                        <span className="text-xs font-medium text-slate-800">
                          {(order.estimate_name.includes("샘플") || order.estimate_name.includes("サンプル")) && order.status === "processing" 
                            ? calculateSampleRefundDeadline(order.estimated_order_date, order.status) 
                            : order.sample_refund_deadline || "-"}
                        </span>
                      </div>


                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-sm text-slate-600">검색 조건에 맞는 주문이 없습니다</p>
                </div>
              )}

              {/* 페이지네이션 */}
              {filteredOrders.length > itemsPerPage && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600">
                    {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} / {filteredOrders.length}개
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
            </CardContent>
          </Card>
        )}
      </main>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">배송 주소</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddressModal(false)}
                  className="hover:bg-gray-100"
                >
                  <span className="text-2xl">×</span>
                </Button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">주소:</p>
                <p className="text-sm font-medium text-slate-800">{selectedAddress}</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    openGoogleMaps(selectedAddress)
                    setShowAddressModal(false)
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Google Maps 열기
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddressModal(false)}
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">견적서 상세 정보</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeDetailModal}
                  className="hover:bg-gray-100"
                >
                  <span className="text-2xl">×</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">견적서명:</p>
                    <p className="text-sm font-medium text-slate-800">{selectedOrder.estimate_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">고객 팀명:</p>
                    <p className="text-sm font-medium text-slate-800">{selectedOrder.customer_team_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">카테고리:</p>
                    <p className="text-sm font-medium text-slate-800">{selectedOrder.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">결제방식:</p>
                    <p className="text-sm font-medium text-slate-800">{getPaymentMethodText(selectedOrder.payment_method)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">수량:</p>
                    <p className="text-sm font-medium text-slate-800">{selectedOrder.quantity}개</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">총 금액:</p>
                    <p className="text-sm font-medium text-slate-800">¥{selectedOrder.total_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">상태:</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        window.open(selectedOrder.woocommerce_link, '_blank')
                        closeDetailModal()
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      상품 링크 열기
                    </Button>
                    <Button
                      variant="outline"
                      onClick={closeDetailModal}
                    >
                      닫기
                    </Button>
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