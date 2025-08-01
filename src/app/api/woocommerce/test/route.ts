import { getOrders } from '@/lib/woocommerce';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 환경 변수 확인
    const storeUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL;
    const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;

    // 환경 변수 검증
    if (!storeUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({
        success: false,
        error: 'WooCommerce API 환경 변수가 설정되지 않았습니다.',
        message: '환경 변수를 확인하고 설정해주세요.'
      }, { status: 400 });
    }

    // API 연결 테스트
    const orders = await getOrders(1, 5); // 첫 5개 주문만 조회

    return NextResponse.json({
      success: true,
      message: 'WooCommerce API 연결 성공',
      data: {
        storeUrl,
        hasCredentials: !!(consumerKey && consumerSecret),
        ordersCount: orders.length,
        sampleOrders: orders.slice(0, 2) // 샘플 데이터만 반환
      }
    });

  } catch (error) {
    console.error('WooCommerce API 테스트 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: 'WooCommerce API 연결 실패',
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    }, { status: 500 });
  }
} 