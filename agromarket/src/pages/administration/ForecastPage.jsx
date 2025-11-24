import { useEffect, useState } from "react";
import ForecastChart from "./ForecastChart";
import { getForecast, getSalesData } from "utils/forecastApi";

export default function ForecastPage() {
  const [ppk, setPpk] = useState(4);
  const [sales, setSales] = useState([]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    const data = await getSalesData(ppk);
    setSales(data);
  };

  const runForecast = async () => {
    const result = await getForecast(ppk);
    setForecast(result);
  };

  const today = new Date();
  console.log("today.getDate()", today.getDate());
  return (
    <div style={{ padding: 20 }}>
      <h1>상품 판매량 예측</h1>

      <label>PPK 선택: </label>
      <input
        value={ppk}
        onChange={(e) => setPpk(e.target.value)}
        type="number"
        placeholder="상품 ppk"
      />

      <button onClick={loadSales}>판매 데이터 불러오기</button>
      <button onClick={runForecast}>예측 실행</button>

      <h2>📌 과거 판매량</h2>
      {sales.length > 0 && (
        <ForecastChart
          labels={sales.map((s) => s.dateTime.split("T")[0])}
          values={sales.map((s) => s.qty)}
        />
      )}

      {forecast && (
        <>
          {/* -------------------- 7일 -------------------- */}
          <h2>📌 미래 7일 예측</h2>
          <ForecastChart
            labels={forecast.next7Days.map((_, i) => {
              const d = new Date(today);
              d.setDate(today.getDate() + (i + 1));
              return d.toISOString().split("T")[0];
            })}
            values={forecast.next7Days}
          />

          {/* -------------------- 30일 -------------------- */}
          <h2>📌 미래 30일 예측</h2>
          <ForecastChart
            labels={forecast.next30Days.map((_, i) => {
              const d = new Date(today);
              d.setDate(today.getDate() + (i + 1));
              return d.toISOString().split("T")[0];
            })}
            values={forecast.next30Days}
          />

          {/* -------------------- 12개월 -------------------- */}
          <h2>📅 월별 12개월 예측</h2>
          <ForecastChart
            labels={Array.from({ length: 12 }, (_, i) => {
              const d = new Date(today);
              d.setMonth(today.getMonth() + (i + 1));
              return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            })}
            values={forecast.next12Months}
          />

          {/* -------------------- 365일 -------------------- */}
          <h2>📅 1년(365일) 일별 예측</h2>
          <ForecastChart
            labels={Array.from({ length: 365 }, (_, i) => {
              const d = new Date(today);
              d.setDate(today.getDate() + (i + 1));
              return d.toISOString().split("T")[0];
            })}
            values={forecast.next365Days}
          />
        </>
      )}
    </div>
  );
}
