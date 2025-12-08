// src/features/delivery/components/DeliveryMap.jsx
import { useRef } from "react";
import { useKakaoMap } from "../hooks/useKakaoMap";

export function DeliveryMap() {
  const mapRef = useRef(null);
  useKakaoMap(mapRef);

  return (
    <section className="map-section">
      <h2>📍 Candy 본사 위치</h2>
      <div ref={mapRef} className="map-container"></div>
    </section>
  );
}
