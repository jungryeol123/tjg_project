// features
import { parseJwt } from "features/auth/parseJwt.js";
// shared
import { api } from 'shared/lib/axios.js';
import { loadNaverPaySDK } from "../../utils/loadNaverSDK.js";

/** ✅ 카카오페이 결제 */
export const getKakaoPayment = async (receiver, paymentInfo, cartList, couponId) => {
  const cidList = cartList.map((item) => item.cid);
  const qty = cartList.reduce((sum, item) => sum + parseInt(item.qty), 0);
  const productInfo = cartList.map((item) => ({pid: item.product.id, qty: item.qty}));
  const stored = localStorage.getItem("loginInfo");
  let id = -1;

  if (stored) {
    const { accessToken } = JSON.parse(stored);
    const payload = parseJwt(accessToken);
    id = payload.id;
  }

  const url = "/payment/kakao/ready";
  const data = {
    itemName: cartList[0].product.productName,
    id,
    qty,
    totalAmount: paymentInfo.totalAmount,
    receiver,
    paymentInfo,
    cidList,
    couponId,
    productInfo
  };

  try {
    const res = await api.post(url, data);
    if (res.data.tid) {
      window.location.href = res.data.next_redirect_pc_url;
    }
  } catch (error) {
    console.error("KakaoPay Error:", error);
  }
};

/** ✅ 네이버페이 결제 요청 */
export const getNaverPayment = async (receiver, paymentInfo, cartList, couponId) => {
  const cidList = cartList.map((item) => item.cid);
  const qty = cartList.reduce((sum, item) => sum + parseInt(item.qty), 0);
  const productInfo = cartList.map((item) => ({pid: item.product.id, qty: item.qty}));
  const stored = localStorage.getItem("loginInfo");
  let id = -1;

  if (stored) {
    const { accessToken } = JSON.parse(stored);
    const payload = parseJwt(accessToken);
    id = payload.id;
  } 
  // 1️⃣ 백엔드에 주문 생성 요청
  const data = {
    itemName: cartList[0].product.productName,
    id,
    qty,
    totalAmount: paymentInfo.totalAmount,
    receiver,
    paymentInfo,
    cidList,
    couponId,
    productInfo
  };

  try {
    const res = await api.post("/payment/naver/order", data);
    const { merchantPayKey } = res.data;

    // 2️⃣ SDK 동적 로드
    await loadNaverPaySDK();

    // 3️⃣ SDK 객체 생성
    const oPay = window.Naver.Pay.create({
      mode: "development",
      clientId: "HN3GGCMDdTgGUfl0kFCo",
      chainId: "MG5ZbE9ZaXRrZE4",
    });

    // 4️⃣ 결제창 호출
    oPay.open({
      merchantPayKey,
      productName: "AgroMarket 상품 결제",
      productCount: cartList.length.toString(),
      totalPayAmount: paymentInfo.totalAmount.toString(),
      taxScopeAmount: paymentInfo.totalAmount.toString(),
      taxExScopeAmount: "0",
      returnUrl: `http://localhost:8080/payment/naver/return?merchantPayKey=${merchantPayKey}`,
    });
  } catch (error) {
    console.error("NaverPay Error:", error);
  }
};