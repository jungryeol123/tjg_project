// src/features/delivery/hooks/useKakaoMap.js
import { useEffect } from "react";

export function useKakaoMap(mapRef) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=217fcf3151ca4922f670954462e84226&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const pos = new window.kakao.maps.LatLng(37.494618, 127.030016);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: pos,
          level: 3,
        });

        const marker = new window.kakao.maps.Marker({ position: pos });
        marker.setMap(map);

        const info = new window.kakao.maps.InfoWindow({
          content: `<div style="color: #6a4dfd;">Candy Corporation</div>`,
        });

        info.open(map, marker);
      });
    };
  }, [mapRef]);
}
