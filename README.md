# KALRON_dashboard

축구 유니폼 주문 관리 시스템 대시보드

## 🚀 프로젝트 개요

이 프로젝트는 축구 유니폼 주문 관리를 위한 현대적인 웹 대시보드입니다. Next.js, TypeScript, Tailwind CSS, shadcn/ui를 사용하여 구축되었습니다.

## ✨ 주요 기능

### 📊 대시보드
- 전체 시스템 현황 개요
- 빠른 작업 카드 (고객 관리, 우커머스, 설정)
- 최근 활동 피드

### 👥 고객 관리
- 고객 목록 (1줄 표시)
- 상세 정보 팝업 모달
- 검색 및 필터링 기능
- 상태별 분류 (진행중, 대기중, 완료)

### 🛒 우커머스 대시보드
- 실시간 주문 현황
- 매출 통계 및 차트
- 인기 상품 순위
- 최근 주문 목록

### 🎨 UI/UX 특징
- 글래스모피즘 디자인
- 그라데이션 효과
- 반응형 레이아웃
- 부드러운 애니메이션

## 🛠 기술 스택

- **Frontend**: Next.js 15, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📁 프로젝트 구조

```
dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 메인 대시보드
│   │   ├── customers/
│   │   │   └── page.tsx          # 고객 관리 페이지
│   │   └── woocommerce/
│   │       └── page.tsx          # 우커머스 대시보드
│   ├── components/
│   │   ├── ui/                   # shadcn/ui 컴포넌트
│   │   └── Navigation.tsx        # 사이드바 네비게이션
│   ├── lib/
│   │   └── utils.ts              # 유틸리티 함수
│   └── app/
│       └── globals.css           # 전역 스타일
├── tailwind.config.ts            # Tailwind 설정
├── components.json               # shadcn/ui 설정
└── package.json
```

## 🚀 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
# .env.local 파일을 생성하고 다음 변수들을 설정하세요:
# WOOCOMMERCE_STORE_URL=your-store-domain.com
# WOOCOMMERCE_CONSUMER_KEY=your-consumer-key
# WOOCOMMERCE_CONSUMER_SECRET=your-consumer-secret

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 🔧 환경 변수 설정

### 로컬 개발 환경
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
WOOCOMMERCE_STORE_URL=your-store-domain.com
WOOCOMMERCE_CONSUMER_KEY=your-consumer-key
WOOCOMMERCE_CONSUMER_SECRET=your-consumer-secret
```

### 배포 환경
배포 플랫폼(Vercel, Netlify 등)의 환경 변수 설정에서 동일한 변수들을 추가하세요.

**WooCommerce API 키 설정 방법:**
1. WooCommerce 관리자 페이지 → 설정 → 고급 → REST API
2. "키 추가" 클릭
3. 권한을 "읽기/쓰기"로 설정
4. 생성된 Consumer Key와 Consumer Secret을 환경 변수에 설정

## 📱 페이지 구성

- **메인 대시보드**: `http://localhost:3000/`
- **고객 관리**: `http://localhost:3000/customers`
- **우커머스 대시보드**: `http://localhost:3000/woocommerce`

## 🎯 주요 데이터 필드

### 고객 정보
- `line_user_id`: LINE 사용자 ID
- `line_user_name`: 고객명
- `customer_team_name`: 팀명
- `sport_type`: 스포츠 종류
- `brand`: 브랜드
- `customer_type`: 고객 유형 (신규/기존)
- `customer_journey_stage`: 고객 여정 단계
- `progress_status`: 진행 상태

### 주문 정보
- `order_number`: 주문 번호
- `order_version`: 주문 버전 (1st, 2nd, 3rd)
- `total_payment_amount`: 총 결제 금액
- `payment_status`: 결제 상태
- `payment_method`: 결제 방식
- `order_classification`: 주문 분류

### 디자인 프로세스
- `first_design_sent_date`: 첫 디자인 발송일
- `design_confirm_date`: 디자인 확정일
- `revision_counts`: 수정 횟수 (1st, 2nd, 3rd)
- `time_to_send_first_design`: 첫 디자인까지 소요 시간

## 🔮 향후 계획

- [ ] 실제 우커머스 API 연동
- [ ] LINE API 연동
- [ ] 실시간 알림 시스템
- [ ] 고급 차트 라이브러리 추가
- [ ] 다크 모드 지원
- [ ] 모바일 앱 개발

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 기여

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

---

**KALRON Dashboard** - 축구 유니폼 주문 관리의 새로운 표준
