import { useEffect, useState } from "react";
import ConversionChart from "./ConversionChart";
import { getConversionRates } from "utils/analyticsApi";

export default function ConversionPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const result = await getConversionRates();
    console.log("conversion result", result);
    setData(result);
  };

  const labels = data.map((d) => d.productName);
  const clicks = data.map((d) => d.clicks);
  const orders = data.map((d) => d.orders);
  const rates = data.map((d) => d.conversionRate.toFixed(2));

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 상품별 클릭 → 구매 전환율 분석</h1>

      {data.length > 0 ? (
        <ConversionChart
          labels={labels}
          clicks={clicks}
          orders={orders}
          rates={rates}
        />
      ) : (
        <p>데이터 불러오는 중...</p>
      )}
    </div>
  );
}
