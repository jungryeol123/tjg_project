import React, { useEffect, useState } from "react";
import { getKamisData } from "shared/lib/axiosInstance.js"; // 경로 alias는 환경에 맞게 수정

export default function Main() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getKamisData({
      categoryCode: "100", // 채소류
      productClsCode: "01", // 농산물
      countryCode: "1101",  // 서울 가락시장
      date: "20251014",     // 날짜
    })
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>농산물 시세 데이터</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>불러오는 중...</p>
      )}
    </div>
  );
}
