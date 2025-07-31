// 우커머스 API 클라이언트 생성 (임시로 비활성화)
export const wooCommerceClient = {
  get: async () => ({ data: [] })
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
  };
  line_items: Array<{
    id: number;
    name: string;
    quantity: number;
    total: string;
    price: string;
  }>;
  payment_method: string;
  payment_method_title: string;
}

// 주문 목록 조회 (임시로 빈 배열 반환)
export async function getOrders(_page: number = 1, _per_page: number = 100) {
  console.log('우커머스 API 환경 변수가 설정되지 않았습니다.');
  return [];
}

// 주문 통계 조회 (임시로 null 반환)
export async function getOrderStats() {
  console.log('우커머스 API 환경 변수가 설정되지 않았습니다.');
  return null;
} 