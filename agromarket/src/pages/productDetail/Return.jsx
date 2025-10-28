import './Return.scss';

export function Return() {
  return (
    <section className="return-policy">
      <h2>반품·교환 및 정책 안내</h2>

      <div className="policy-section">
        <h3>교환 및 반품이 가능한 경우</h3>
        <ul>
          <li>상품 수령일로부터 <strong>7일 이내</strong> 신청 시 가능합니다.</li>
          <li>배송된 상품이 표시·광고 내용과 다르거나 불량인 경우, <strong>배송비 무료</strong>로 교환·반품이 가능합니다.</li>
          <li>단순 변심에 의한 교환·반품은 <strong>왕복 배송비</strong>가 발생할 수 있습니다.</li>
        </ul>
      </div>

      <div className="policy-section">
        <h3>교환 및 반품이 불가능한 경우</h3>
        <ul>
          <li>상품 수령 후 <strong>7일이 경과한 경우</strong></li>
          <li>고객의 책임 있는 사유로 상품이 훼손되거나 가치가 감소한 경우</li>
          <li>시간 경과로 재판매가 어려운 상품 (신선식품, 맞춤제작 상품 등)</li>
        </ul>
      </div>

      <div className="policy-section">
        <h3>환불 안내</h3>
        <ul>
          <li>반품 상품 회수 및 상태 확인 후 <strong>3영업일 이내</strong> 환불이 진행됩니다.</li>
          <li>카드 결제의 경우 결제 취소 처리까지 <strong>영업일 기준 3~5일</strong>이 소요될 수 있습니다.</li>
        </ul>
      </div>

      <div className="policy-section">
        <h3>고객센터 안내</h3>
        <ul>
          <li>고객센터 : <strong>1234-5678</strong> (평일 10:00 ~ 17:00)</li>
          <li>이메일 문의 : help@farmfresh.com</li>
        </ul>
      </div>
    </section>
  );
}
