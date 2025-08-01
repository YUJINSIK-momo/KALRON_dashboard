import { getOrders } from '@/lib/woocommerce'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('=== API 라우트: WooCommerce 주문 조회 시작 ===')
    
    // 환경 변수 확인
    const storeUrl = process.env.WOOCOMMERCE_STORE_URL
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET
    
    console.log('환경 변수 상태:', {
      storeUrl: storeUrl ? '설정됨' : '미설정',
      consumerKey: consumerKey ? '설정됨' : '미설정', 
      consumerSecret: consumerSecret ? '설정됨' : '미설정'
    })
    
    // URL 파라미터 파싱
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const per_page = parseInt(searchParams.get('per_page') || '50')
    
    console.log('API 라우트 파라미터:', { page, per_page })
    
    // 환경 변수 검증
    if (!storeUrl || !consumerKey || !consumerSecret) {
      console.error('환경 변수가 설정되지 않음')
      return NextResponse.json({
        success: false,
        error: '환경 변수가 설정되지 않았습니다.',
        message: 'WooCommerce API 키가 설정되지 않았습니다.',
        debug: {
          envConfigured: false,
          storeUrl: !!storeUrl,
          consumerKey: !!consumerKey,
          consumerSecret: !!consumerSecret
        }
      }, { status: 400 })
    }
    
    // 서버 사이드에서 WooCommerce API 호출
    console.log('WooCommerce API 호출 시작...')
    const orders = await getOrders(page, per_page)
    
    console.log('API 라우트: 주문 조회 완료', orders.length, '개')
    console.log('첫 번째 주문 샘플:', orders[0] || '주문 없음')
    
    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
      debug: {
        envConfigured: true,
        page,
        per_page,
        storeUrl: storeUrl,
        hasCredentials: !!(consumerKey && consumerSecret)
      }
    })
  } catch (error) {
    console.error('API 라우트 오류:', error)
    
    // error 타입 안전하게 처리
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류'
    const errorType = error instanceof Error ? error.constructor.name : 'Unknown'
    
    return NextResponse.json(
      {
        success: false,
        error: '주문 조회 실패',
        message: errorMessage,
        debug: {
          errorType,
          errorMessage: errorMessage
        }
      },
      { status: 500 }
    )
  }
} 