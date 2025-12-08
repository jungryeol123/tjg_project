import ForecastChart from "./ForecastChart";



export default function ForecastCharts({ sales, forecast, excelRows }) {
  return (
    <div>
      <h2>📌 과거 판매량</h2>
      {sales.length > 0 && (
        <ForecastChart
          labels={sales.map((s) => s.dateTime.split("T")[0])}
          values={sales.map((s) => s.qty)}
        />
      )}

      {forecast && (
        <>
          <h2>📌 7일</h2>
          <ForecastChart
            labels={excelRows
              .filter((r) => r.type === "7일 예측")
              .map((r) => r.date)}
            values={forecast.next7Days}
          />

          <h2>📌 30일</h2>
          <ForecastChart
            labels={excelRows
              .filter((r) => r.type === "30일 예측")
              .map((r) => r.date)}
            values={forecast.next30Days}
          />

          <h2>📅 12개월</h2>
          <ForecastChart
            labels={excelRows
              .filter((r) => r.type === "12개월 예측")
              .map((r) => r.date)}
            values={forecast.next12Months}
          />

          <h2>📅 365일</h2>
          <ForecastChart
            labels={excelRows
              .filter((r) => r.type === "365일 예측")
              .map((r) => r.date)}
            values={forecast.next365Days}
          />
        </>
      )}
    </div>
  );
}
