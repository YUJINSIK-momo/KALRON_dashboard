# WooCommerce API 설정 가이드

## 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_WOOCOMMERCE_STORE_URL=your-store-domain.com
NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY=your-consumer-key
NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET=your-consumer-secret
```

### 예시:
```env
NEXT_PUBLIC_WOOCOMMERCE_STORE_URL=example.com
NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 2. WooCommerce API 키 생성 방법

### 2.1 WooCommerce 관리자 페이지 접속
- WordPress 관리자 페이지에 로그인
- WooCommerce → 설정 → 고급 → REST API

### 2.2 API 키 생성
1. "키 추가" 버튼 클릭
2. 설명 입력 (예: "Dashboard API")
3. 권한 설정: "읽기/쓰기" 선택
4. "키 생성" 버튼 클릭

### 2.3 키 정보 복사
- **Consumer Key**: `ck_`로 시작하는 키
- **Consumer Secret**: `cs_`로 시작하는 키
- **Store URL**: 웹사이트 도메인 (https:// 제외)

## 3. 테스트 방법

### 3.1 환경 변수 확인
서버 콘솔에서 다음 로그 확인:
```
환경 변수 상태: { storeUrl: '설정됨', consumerKey: '설정됨', consumerSecret: '설정됨' }
```

### 3.2 API 연결 테스트
축구/농구 우커머스 페이지에서:
- "API 연결됨" 상태 확인
- 실제 주문 데이터 표시 확인

## 4. 문제 해결

### 4.1 환경 변수 미설정
```
환경 변수 상태: { storeUrl: '미설정', consumerKey: '미설정', consumerSecret: '미설정' }
```
→ `.env.local` 파일을 생성하고 API 키를 설정하세요.

### 4.2 API 키 오류
```
WooCommerce API 응답 오류: 401 Unauthorized
```
→ API 키가 올바른지 확인하세요.

### 4.3 CORS 오류
```
Failed to fetch
```
→ 이미 해결됨 (Next.js API 라우트 사용)

### 4.4 주문 데이터 없음
```
API 라우트: 주문 조회 완료 0 개
```
→ WooCommerce 스토어에 실제 주문이 있는지 확인하세요.

## 5. 보안 주의사항

- `.env.local` 파일은 `.gitignore`에 포함되어 있어야 합니다
- API 키는 절대 공개 저장소에 커밋하지 마세요
- 프로덕션 환경에서는 환경 변수를 서버에서 관리하세요

## 6. 개발 서버 재시작

환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다:

```bash
npm run dev
``` 