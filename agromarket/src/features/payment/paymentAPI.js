import { axiosPost } from "./dataFetch.js";

export const getPayment = async (receiver, paymentInfo, cartList) => {
  const cidList = cartList.map((item) => item.cid);
  const qty = cartList.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = paymentInfo.totalAmount;
  const id = 1; // 로그인 사용자 예시

  const data = {
    orderId: "",
    id,
    itemName: cartList.length === 1 
      ? cartList[0].name 
      : `${cartList[0].name} 외 ${cartList.length - 1}건`,
    qty,
    totalAmount,
    receiver,
    paymentInfo,
    cidList
  };

  try {
    const result = await axiosPost("http://localhost:8080/payment/kakao/ready", data);
    console.log("카카오 결제 요청 결과:", result);
    if (result?.tid) {
      window.location.href = result.next_redirect_pc_url;
    } else {
      alert("결제 준비 실패");
    }
  } catch (err) {
    console.error("getPayment error:", err);
  }
};
