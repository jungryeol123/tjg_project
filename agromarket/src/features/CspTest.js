import { useEffect } from "react";

export default function CspTest() {
  useEffect(() => {
    // 1️⃣ 외부 스크립트 로드 (CSP에서 반드시 차단되어야 함)
    const externalScript = document.createElement("script");
    externalScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js";
    externalScript.async = true;
    externalScript.onload = () => console.log("❌ 외부 스크립트 로드됨 (차단 실패)");
    document.head.appendChild(externalScript);

    // 2️⃣ 인라인 스크립트 (CSP에서 unsafe-inline 없으면 반드시 차단)
    const inlineScript = document.createElement("script");
    inlineScript.textContent = `console.log("❌ 인라인 스크립트 실행됨 (차단 실패)");`;
    document.body.appendChild(inlineScript);

    // 3️⃣ 정상적인 내부 스크립트
    console.log("✔ 내부 스크립트 정상 실행");

  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>CSP 테스트 페이지</h1>
      <p>브라우저 콘솔에서 CSP 차단 여부를 확인하세요.</p>

      <ul>
        <li>외부 스크립트: Lodash</li>
        <li>인라인 스크립트: textContent 방식</li>
        <li>내부 스크립트: React 내부 console.log()</li>
      </ul>

      <p style={{ marginTop: "20px", color: "#666" }}>
        차단되면 콘솔에 빨간 색 에러가 떠야 정상입니다.
      </p>
    </div>
  );
}
