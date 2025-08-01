import { getOrders } from '@/lib/woocommerce';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 환경 변수 확인
    const storeUrl = process.env.WOOCOMMERCE_STORE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    console.log('=== WooCommerce API 연결 테스트 ===');
    console.log('환경 변수:', {
      storeUrl,
      consumerKey: consumerKey ? '설정됨' : '미설정',
      consumerSecret: consumerSecret ? '설정됨' : '미설정'
    });

    // 환경 변수 검증
    if (!storeUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({
        success: false,
        error: 'WooCommerce API 환경 변수가 설정되지 않았습니다.',
        message: '환경 변수를 확인하고 설정해주세요.',
        debug: {
          storeUrl: !!storeUrl,
          consumerKey: !!consumerKey,
          consumerSecret: !!consumerSecret
        }
      }, { status: 400 });
    }

    // WooCommerce API 직접 테스트
    const testUrl = `https://${storeUrl}/wp-json/wc/v3/orders?per_page=1`;
    console.log('테스트 URL:', testUrl);

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API 응답 상태:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 오류:', errorText);
      
      return NextResponse.json({
        success: false,
        error: 'WooCommerce API 연결 실패',
        message: `HTTP ${response.status}: ${response.statusText}`,
        debug: {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        }
      }, { status: response.status });
    }

    const data = await response.json();
    console.log('API 응답 데이터:', data);

    // API 연결 테스트
    const orders = await getOrders(1, 5); // 첫 5개 주문만 조회

    return NextResponse.json({
      success: true,
      message: 'WooCommerce API 연결 성공',
      data: {
        storeUrl,
        hasCredentials: !!(consumerKey && consumerSecret),
        ordersCount: orders.length,
        sampleOrders: orders.slice(0, 2), // 샘플 데이터만 반환
        apiResponse: {
          status: response.status,
          dataType: typeof data,
          isArray: Array.isArray(data),
          length: Array.isArray(data) ? data.length : 'N/A'
        }
      }
    });

  } catch (error) {
    console.error('WooCommerce API 테스트 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: 'WooCommerce API 연결 실패',
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      debug: {
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error)
      }
    }, { status: 500 });
  }
} 