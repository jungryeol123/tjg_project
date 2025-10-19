import React from "react";

const PaymentButton = () => {
  // 결제 버튼 클릭 시 실행되는 함수
  const onClickPayment = () => {
    // 아임포트 객체 로드
    const { IMP } = window;
    // ✅ imp 코드 없이도 테스트 가능 (빈 문자열로 둬야 테스트 모드 작동)
    IMP.init("imp78258261");

    // 결제 정보
    const data = {
      pg: "kakaopay", // 카카오페이 결제 시뮬레이션
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`, // 주문 고유번호 (매번 달라야 함)
      name: "의료 예약 결제 테스트",
      amount: 100, // 결제 금액 (테스트니까 임의 숫자)
      buyer_email: "test@test.com",
      buyer_name: "홍길동",
      buyer_tel: "010-1234-5678",
    };

    // 결제 요청
    IMP.request_pay(data, (rsp) => {
      if (rsp.success) {
        alert("✅ 결제 성공 (테스트 모드)");
        console.log("결제 성공 정보:", rsp);
      } else {
        alert("❌ 결제 실패: " + rsp.error_msg);
      }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>💳 카카오페이 결제 테스트</h2>
      <button
        onClick={onClickPayment}
        style={{
          backgroundColor: "#FEE500",
          color: "#000",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        카카오페이로 결제하기 (테스트)
      </button>
    </div>
  );
};

export default PaymentButton;
