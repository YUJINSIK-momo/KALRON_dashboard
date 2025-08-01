// 라인 API 환경 변수 (실제 구현 시 사용)
// const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
// const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;

export interface LineCustomer {
  id: string;
  name: string;
  team_name: string;
  phone: string;
  email: string;
  created_date: string;
  last_message_date: string;
  customer_journey_stage: string;
}

// WooCommerce 주문 인터페이스
interface WooCommerceOrder {
  billing?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
}

// 라인 API 클라이언트
export const lineClient = {
  // 라인 고객 목록 조회 (실제 구현 필요)
  getCustomers: async (): Promise<LineCustomer[]> => {
    try {
      console.log('라인 고객 데이터 조회 시작');
      
      // TODO: 실제 라인 API 호출 구현
      // 현재는 샘플 데이터 반환
      const sampleCustomers: LineCustomer[] = [
        {
          id: 'line_001',
          name: '礼香 溝淵',
          team_name: 'TEAM HANEDA FOOTBALL',
          phone: '07031486806111',
          email: 'test@gmail.com',
          created_date: '2025-01-15T10:30:00',
          last_message_date: '2025-01-20T14:20:00',
          customer_journey_stage: '친구추가'
        },
        {
          id: 'line_002',
          name: '田中太郎',
          team_name: 'TEAM TOKYO BASKETBALL',
          phone: '08012345678',
          email: 'tanaka@example.com',
          created_date: '2025-01-20T14:20:00',
          last_message_date: '2025-01-25T09:15:00',
          customer_journey_stage: '첫 메시지'
        }
      ];
      
      console.log('라인 고객 데이터 조회 완료:', sampleCustomers.length, '명');
      return sampleCustomers;
    } catch (error) {
      console.error('라인 고객 데이터 조회 실패:', error);
      return [];
    }
  },

  // 팀명으로 고객 검색
  findCustomerByTeam: async (teamName: string): Promise<LineCustomer | null> => {
    try {
      const customers = await lineClient.getCustomers();
      return customers.find(customer => 
        customer.team_name.toLowerCase().includes(teamName.toLowerCase())
      ) || null;
    } catch (error) {
      console.error('팀명으로 고객 검색 실패:', error);
      return null;
    }
  }
};

// WooCommerce 주문과 라인 고객 매핑 함수
export const mapWooCommerceToLineCustomer = (
  wooCommerceOrder: WooCommerceOrder, 
  lineCustomers: LineCustomer[]
): LineCustomer | null => {
  const customerName = `${wooCommerceOrder.billing?.first_name || ''} ${wooCommerceOrder.billing?.last_name || ''}`.trim();
  const customerEmail = wooCommerceOrder.billing?.email || '';
  const customerPhone = wooCommerceOrder.billing?.phone || '';
  
  // 이름, 이메일, 전화번호로 매칭
  return lineCustomers.find(lineCustomer => {
    // 이름 매칭
    if (lineCustomer.name.toLowerCase().includes(customerName.toLowerCase()) ||
        customerName.toLowerCase().includes(lineCustomer.name.toLowerCase())) {
      return true;
    }
    
    // 이메일 매칭
    if (lineCustomer.email && customerEmail && 
        lineCustomer.email.toLowerCase() === customerEmail.toLowerCase()) {
      return true;
    }
    
    // 전화번호 매칭 (하이픈 제거 후 비교)
    if (lineCustomer.phone && customerPhone) {
      const normalizedLinePhone = lineCustomer.phone.replace(/[-\s]/g, '');
      const normalizedWooPhone = customerPhone.replace(/[-\s]/g, '');
      if (normalizedLinePhone === normalizedWooPhone) {
        return true;
      }
    }
    
    return false;
  }) || null;
}; 