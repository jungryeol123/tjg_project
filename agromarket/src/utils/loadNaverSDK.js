export const loadNaverPaySDK = () => {
  return new Promise((resolve, reject) => {
    // 이미 로드된 경우
    if (window.Naver && window.Naver.Pay) {
      resolve(window.Naver);
      return;
    }

    // SDK 스크립트 태그 생성
    const script = document.createElement("script");
    script.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
    script.async = true;

    script.onload = () => {
      if (window.Naver && window.Naver.Pay) {
        resolve(window.Naver);
      } else {
        reject("❌ NaverPay SDK 로드 실패");
      }
    };

    script.onerror = () => reject("❌ 네이버페이 SDK 로드 실패");

    document.body.appendChild(script);
  });
};
