import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

// 우커머스 API 클라이언트 생성
export const wooCommerceClient = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://your-store.com',
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET || '',
  version: 'wc/v3'
});

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

// 주문 목록 조회
export async function getOrders(page: number = 1, per_page: number = 100) {
  // 환경 변수가 설정되지 않은 경우 빈 배열 반환
  if (!process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 
      !process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY || 
      !process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET) {
    console.log('우커머스 API 환경 변수가 설정되지 않았습니다.');
    return [];
  }

  try {
    const response = await wooCommerceClient.get('orders', {
      page,
      per_page,
      orderby: 'date',
      order: 'desc'
    });
    return response.data;
  } catch (error) {
    console.error('우커머스 주문 조회 오류:', error);
    return [];
  }
}

// 주문 통계 조회
export async function getOrderStats() {
  // 환경 변수가 설정되지 않은 경우 null 반환
  if (!process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 
      !process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY || 
      !process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET) {
    console.log('우커머스 API 환경 변수가 설정되지 않았습니다.');
    return null;
  }

  try {
    const response = await wooCommerceClient.get('reports/orders/totals');
    return response.data;
  } catch (error) {
    console.error('우커머스 통계 조회 오류:', error);
    return null;
  }
} 