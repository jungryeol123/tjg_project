import { useEffect } from "react";

export function KakaoCallback() {
  useEffect(() => {
    // URL에서 인가코드(code) 추출
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("인가 코드:", code);

    if (code) {
      // 👉 보통은 여기서 백엔드 서버로 code를 보내서 access_token 교환
      // fetch("http://localhost:8080/kakao/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ code })
      // })
      // .then(res => res.json())
      // .then(data => console.log("토큰:", data));
    }
  }, []);

  return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoCallback;
