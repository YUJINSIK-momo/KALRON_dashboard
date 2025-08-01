// 우커머스 API 환경 변수
const WOOCOMMERCE_STORE_URL = process.env.WOOCOMMERCE_STORE_URL || 'kalron.co';
const WOOCOMMERCE_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_6e0eae9b3fcbdc6fa41bbbd8643d5e5a5821e64a';
const WOOCOMMERCE_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_707fb6ac64b94ca679c83d1a7b47dfda40653a97';

// Base64 인코딩 함수
function base64Encode(str: string): string {
  if (typeof window !== 'undefined') {
    return btoa(str);
  }
  return Buffer.from(str).toString('base64');
}

// URL 정규화 함수
function normalizeStoreUrl(url: string): string {
  // https:// 제거
  let normalizedUrl = url.replace(/^https?:\/\//, '');
  // 끝의 슬래시 제거
  normalizedUrl = normalizedUrl.replace(/\/$/, '');
  return normalizedUrl;
}

// 우커머스 API 클라이언트 생성
export const wooCommerceClient = {
  get: async (endpoint: string, params: Record<string, string | number | boolean> = {}) => {
    // 환경 변수 체크
    if (!WOOCOMMERCE_STORE_URL || !WOOCOMMERCE_CONSUMER_KEY || !WOOCOMMERCE_CONSUMER_SECRET) {
      console.warn('우커머스 API 환경 변수가 설정되지 않았습니다.');
      console.warn('환경 변수 설정:', {
        storeUrl: WOOCOMMERCE_STORE_URL ? '설정됨' : '미설정',
        consumerKey: WOOCOMMERCE_CONSUMER_KEY ? '설정됨' : '미설정',
        consumerSecret: WOOCOMMERCE_CONSUMER_SECRET ? '설정됨' : '미설정'
      });
      return { data: [] };
    }

    try {
      // URL 정규화
      const normalizedStoreUrl = normalizeStoreUrl(WOOCOMMERCE_STORE_URL);
      const url = new URL(`/wp-json/wc/v3/${endpoint}`, `https://${normalizedStoreUrl}`);
      
      // 쿼리 파라미터 추가
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });

      console.log('WooCommerce API 요청:', url.toString());
      console.log('API 엔드포인트:', endpoint);
      console.log('파라미터:', params);

      // Basic Auth 헤더 생성
      const credentials = base64Encode(`${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`);
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        // CORS 이슈 방지를 위한 설정
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('WooCommerce API 응답 상태:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('WooCommerce API 응답 오류:', {
          status: response.status,
          statusText: response.statusText,
          url: url.toString(),
          error: errorText
        });
        throw new Error(`우커머스 API 오류: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('WooCommerce API 응답 성공:', data.length || '데이터 없음');
      console.log('응답 데이터 타입:', typeof data);
      console.log('응답 데이터 구조:', Array.isArray(data) ? '배열' : '객체');
      
      return { data };
    } catch (error) {
      console.error('우커머스 API 요청 실패:', error);
      
      // 네트워크 오류인지 확인
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('네트워크 오류 - CORS 또는 연결 문제일 수 있습니다.');
      }
      
      return { data: [] };
    }
  },

  post: async (endpoint: string, data: Record<string, unknown>) => {
    if (!WOOCOMMERCE_STORE_URL || !WOOCOMMERCE_CONSUMER_KEY || !WOOCOMMERCE_CONSUMER_SECRET) {
      console.warn('우커머스 API 환경 변수가 설정되지 않았습니다.');
      return { data: null };
    }

    try {
      const url = new URL(`/wp-json/wc/v3/${endpoint}`, `https://${normalizeStoreUrl(WOOCOMMERCE_STORE_URL)}`);
      const credentials = base64Encode(`${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`);
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`우커머스 API 오류: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      return { data: responseData };
    } catch (error) {
      console.error('우커머스 API 요청 실패:', error);
      return { data: null };
    }
  }
};

// 주문 데이터 타입 정의
export interface WooCommerceOrder {
  id: number;
  number: string;
  status: string;
  date_created: string;
  date_created_gmt: string;
  total: string;
  currency: string;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  line_items: Array<{
    id: number;
    name: string;
    quantity: number;
    total: string;
    price: string;
    product_id: number;
    variation_id: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total_tax: string;
    taxes: Array<{
      id: number;
      total: string;
      subtotal: string;
    }>;
    meta_data: Array<{
      id: number;
      key: string;
      value: string;
    }>;
    sku: string;
    image?: {
      id: number;
      src: string;
      name: string;
      alt: string;
    };
    parent_name?: string | null;
  }>;
  payment_method: string;
  payment_method_title: string;
  meta_data: Array<{
    id: number;
    key: string;
    value: string;
  }>;
}

// 클라이언트에서 사용할 API 함수들
export async function fetchOrdersFromAPI(page: number = 1, per_page: number = 50): Promise<WooCommerceOrder[]> {
  try {
    console.log('클라이언트: API 라우트를 통한 주문 조회 시작')
    
    const response = await fetch(`/api/woocommerce/orders?page=${page}&per_page=${per_page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API 라우트 응답 오류:', errorData)
      throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const result = await response.json()
    console.log('클라이언트: API 라우트 응답 성공', result.count, '개 주문')
    console.log('디버깅 정보:', result.debug)
    
    return result.data || []
  } catch (error) {
    console.error('클라이언트: API 라우트 호출 실패:', error)
    return []
  }
}

// 주문 목록 조회
export async function getOrders(page: number = 1, per_page: number = 100): Promise<WooCommerceOrder[]> {
  try {
    console.log('주문 목록 조회 시작:', { page, per_page })
    
    const response = await wooCommerceClient.get('orders', {
      page,
      per_page,
      orderby: 'date',
      order: 'desc'
    })
    
    console.log('주문 목록 조회 완료:', response.data?.length || 0, '개')
    return response.data || []
  } catch (error) {
    console.error('주문 목록 조회 실패:', error)
    return []
  }
}

// 주문 통계 조회
export async function getOrderStats() {
  try {
    const response = await wooCommerceClient.get('orders', {
      per_page: 1
    });
    
    if (response.data && response.data.length > 0) {
      // 실제 구현에서는 별도의 통계 엔드포인트를 사용하거나
      // 여러 요청을 조합하여 통계를 계산
      return {
        total_orders: 0, // 실제로는 별도 계산 필요
        total_revenue: 0,
        average_order_value: 0
      };
    }
    
    return null;
  } catch (error) {
    console.error('주문 통계 조회 실패:', error);
    return null;
  }
}

// 특정 주문 조회
export async function getOrder(orderId: number): Promise<WooCommerceOrder | null> {
  try {
    const response = await wooCommerceClient.get(`orders/${orderId}`);
    return response.data || null;
  } catch (error) {
    console.error('주문 조회 실패:', error);
    return null;
  }
}

// 주문 상태 업데이트
export async function updateOrderStatus(orderId: number, status: string): Promise<boolean> {
  try {
    const response = await wooCommerceClient.post(`orders/${orderId}`, {
      status
    });
    
    return response.data !== null;
  } catch (error) {
    console.error('주문 상태 업데이트 실패:', error);
    return false;
  }
}

// 주문 검색
export async function searchOrders(searchTerm: string, page: number = 1, per_page: number = 100): Promise<WooCommerceOrder[]> {
  try {
    const response = await wooCommerceClient.get('orders', {
      page,
      per_page,
      search: searchTerm
    });
    
    return response.data || [];
  } catch (error) {
    console.error('주문 검색 실패:', error);
    return [];
  }
}

// 주문 필터링 (상태별)
export async function getOrdersByStatus(status: string, page: number = 1, per_page: number = 100): Promise<WooCommerceOrder[]> {
  try {
    const response = await wooCommerceClient.get('orders', {
      page,
      per_page,
      status
    });
    
    return response.data || [];
  } catch (error) {
    console.error('상태별 주문 조회 실패:', error);
    return [];
  }
} 