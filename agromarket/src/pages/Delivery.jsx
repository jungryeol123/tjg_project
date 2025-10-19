import { useEffect, useRef } from "react";

export  function Delivery() {
   const mapRef = useRef(null);

  useEffect(() => {
    // 기존 script 있으면 제거
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
    );
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=217fcf3151ca4922f670954462e84226&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("✅ Kakao SDK 로드 완료"); // ← 이거 반드시 떠야 정상
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = mapRef.current;
          console.log("container:", container);
          if (!container) return;

          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);
          console.log("✅ 지도 객체 생성됨:", map);
        });
      } else {
        console.error("❌ Kakao SDK 로드 실패");
      }
    };
  }, []);
  return (
    <>
    <h1>agro 찾아오시는 길</h1>
      <div
        ref={mapRef}
        style={{ width: "400px", height: "400px", border: "2px solid blue" }}
      />
    </>
  );
}