import { useEffect, useRef } from "react";
import "./Delivery.scss";

export function Delivery() {
  const mapRef = useRef(null);

  useEffect(() => {
    // ✅ Kakao Map 로드
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=217fcf3151ca4922f670954462e84226&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(37.494618, 127.030016); // 본사 위치 (예: 강남)
        const options = { center: position, level: 3 };
        const map = new window.kakao.maps.Map(mapRef.current, options);

        const marker = new window.kakao.maps.Marker({ position });
        marker.setMap(map);

        const info = new window.kakao.maps.InfoWindow({
          content: `
            <div style="
              color: #6a4dfd;
            ">
              Candy Corporation
            </div>
          `,
        });
        info.open(map, marker);
      });
    };
  }, []);

  return (
    <div className="delivery-info">
      {/* 1️⃣ Hero Section */}
      <section className="hero">
        {/* <div className="hero-text">
          <h1>Candy 샛별 & 하루배송</h1>
          <p>지금 주문하면 내일 새벽 도착! 신선함 그대로 전해드립니다 🍓</p>
        </div> */}
      </section>

      {/* 2️⃣ Delivery Highlights */}
      <section className="highlights">
        <h2>샛별이 뜰 때 가장 신선할 때</h2>
        <div className="cards">
          <div className="card">
            <h3>24시간 이내 배송</h3>
            <p>신선식품을 빠르게, 새벽에 만나보세요.</p>
          </div>
          <div className="card">
            <h3>100% 냉장/냉동 유지</h3>
            <p>신선도 유지를 위한 냉장 시스템으로 안전하게 배송됩니다.</p>
          </div>
          <div className="card">
            <h3>친환경 포장</h3>
            <p>Candy는 지속 가능한 포장을 사용합니다.</p>
          </div>
        </div>
      </section>

      {/* 3️⃣ 배송 지역별 표 */}
      <section className="delivery-table">
        <h2>주문부터 배송까지 한눈에 보기</h2>
        <table>
          <thead>
            <tr>
              <th>지역</th>
              <th>주문 시간</th>
              <th>배송 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>수도권</td>
              <td>오늘 밤 11시 전</td>
              <td>내일 아침 7시 전</td>
            </tr>
            <tr>
              <td>충청</td>
              <td>오늘 밤 11시 전</td>
              <td>내일 아침 7시 전</td>
            </tr>
            <tr>
              <td>부산</td>
              <td>오늘 밤 11시 전</td>
              <td>내일 아침 8시 전</td>
            </tr>
            <tr>
              <td>그 외 지역</td>
              <td>오늘 밤 11시 전</td>
              <td>익일 도착</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4️⃣ 지도 섹션 */}
      <section className="map-section">
        <h2>📍 Candy 본사 위치</h2>
        <div ref={mapRef} className="map-container"></div>
      </section>
    </div>
  );
}
