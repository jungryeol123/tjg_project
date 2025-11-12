// import { axiosPost } from './dataFetch.js';

// export const getPayment = async(receiver, paymentInfo, cartList) => {
// console.log(cartList);
//     const cidList = cartList.map(item => item.cid);
//     const qty = cartList.reduce((sum, item) => sum + parseInt(item.qty), 0);
//     // const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
//     const url = "/payment/kakao/ready";  //카카오 QR 코드 호출
//     const id = 6;
//     const data = {
//         "orderId": "",
//         id,
//         "itemName": cartList[0].productName,
//         "qty": qty,
//         "totalAmount": cartList[0].totalPrice,
//         "receiver": receiver,
//         "paymentInfo": paymentInfo,
//         "cidList": cidList
//     }

//     try {
//         const kakaoReadyResult = await axiosPost(url, data);
//         console.log("kakaoReadyResult => ", kakaoReadyResult);
//         if(kakaoReadyResult.tid) {
//             //새로운 페이지 연결
//             window.location.href = kakaoReadyResult.next_redirect_pc_url;
//         }

//     } catch(error) {
//         console.log("error :: ", error);
//     }
// }

// import { axiosPost } from "./dataFetch.js";

// /** ✅ 카카오페이 */
// export const getPayment = async (receiver, paymentInfo, cartList) => {
//   const cidList = cartList.map((item) => item.cid);
//   const qty = cartList.reduce((sum, item) => sum + parseInt(item.qty), 0);

//   const url = "/payment/kakao/ready";
//   const data = {
//     itemName: cartList[0].product.productName,
//     qty,
//     totalAmount: cartList[0].product.price * qty,
//     receiver,
//     paymentInfo,
//     cidList,
//   };

//   try {
//     const kakaoReadyResult = await axiosPost(url, data);
//     if (kakaoReadyResult.tid) {
//       window.location.href = kakaoReadyResult.next_redirect_pc_url;
//     }
//   } catch (error) {
//     console.error("KakaoPay Error:", error);
//   }
// };

import { axiosPost } from "./dataFetch.js";
import { loadNaverPaySDK } from "../../utils/loadNaverSDK.js";
import { parseJwt } from "features/auth/parseJwt.js";
/** ✅ 카카오페이 결제 */
export const getKakaoPayment = async (receiver, paymentInfo, cartList) => {
  const cidList = cartList.map((item) => item.cid);
  const qty = cartList.reduce((sum, item) => sum + parseInt(item.qty), 0);
  // const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  // const id = loginInfo.id;
  let id = -1;

  const stored = localStorage.getItem("loginInfo");
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
    totalAmount: cartList[0].product.price * qty,
    receiver,
    paymentInfo,
    cidList,
  };

  try {
    const res = await axiosPost(url, data);
    if (res.tid) {
      window.location.href = res.next_redirect_pc_url;
    }
  } catch (error) {
    console.error("KakaoPay Error:", error);
  }
};

/** ✅ 네이버페이 결제 요청 */
export const getNaverPayment = async (receiver, paymentInfo, cartList) => {
  const cidList = cartList.map((item) => item.cid);
  const totalAmount = cartList.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const qty = cartList.reduce((sum, item) => sum + parseInt(item.qty), 0);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const id = loginInfo.id;
  // 1️⃣ 백엔드에 주문 생성 요청
  const data = {
    itemName: cartList[0].product.productName,
    id,
    qty,
    totalAmount: cartList[0].product.price * qty,
    receiver,
    paymentInfo,
    cidList,
  };

  try {
    const res = await axiosPost("/payment/naver/order", data);
    const { merchantPayKey } = res;

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
      totalPayAmount: totalAmount.toString(),
      taxScopeAmount: totalAmount.toString(),
      taxExScopeAmount: "0",
      returnUrl: `http://localhost:8080/payment/naver/return?merchantPayKey=${merchantPayKey}`,
    });
  } catch (error) {
    console.error("NaverPay Error:", error);
  }
};
