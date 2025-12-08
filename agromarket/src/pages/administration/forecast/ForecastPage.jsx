// import { useEffect, useState } from "react";
// // utils
// import ForecastChart from "./ForecastChart";
// import { getForecast, getSalesData } from "features/administration/forecast/forecastApi";
// import { exportForecastExcel } from "features/administration/forecast/exportForecastExcel";

// export default function ForecastPage() {
//     const [ppk, setPpk] = useState(4);
//     const [sales, setSales] = useState([]);
//     const [forecast, setForecast] = useState(null);
//     const excelRows = [];
//     const today = new Date();

//     useEffect(() => {
//         loadSales();
//     }, []);

//     const loadSales = async () => {
//         const data = await getSalesData(ppk);
//         setSales(data);
//     };

//     const runForecast = async () => {
//         const result = await getForecast(ppk);
//         setForecast(result);
//     };

//     if (forecast) {
//         const genDates = (len, type = "day") =>
//             Array.from({ length: len }, (_, i) => {
//                 const d = new Date(today);
//                 if (type === "day") d.setDate(today.getDate() + (i + 1));
//                 else d.setMonth(today.getMonth() + (i + 1));
//                 return d.toISOString().split("T")[0];
//             });

//         // 7일
//         genDates(7).forEach((date, i) => {
//             excelRows.push({
//                 type: "7일 예측",
//                 date,
//                 value: forecast.next7Days[i],
//             });
//         });

//         // 30일
//         genDates(30).forEach((date, i) => {
//             excelRows.push({
//                 type: "30일 예측",
//                 date,
//                 value: forecast.next30Days[i],
//             });
//         });

//         // 12개월
//         Array.from({ length: 12 }, (_, i) => {
//             const d = new Date(today);
//             d.setMonth(today.getMonth() + (i + 1));
//             return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
//         }).forEach((month, i) => {
//             excelRows.push({
//                 type: "12개월 예측",
//                 date: month,
//                 value: forecast.next12Months[i],
//             });
//         });

//         // 365일
//         genDates(365).forEach((date, i) => {
//             excelRows.push({
//                 type: "365일 예측",
//                 date,
//                 value: forecast.next365Days[i],
//             });
//         });
//     }

//     return (
//         <div style={{ padding: 20 }}>
//             <h1>📈 상품 판매량 예측</h1>
//             <div style={{ marginBottom: 20 }}>
//                 <label>PPK: </label>
//                 <input
//                     value={ppk}
//                     onChange={(e) => setPpk(e.target.value)}
//                     type="number"
//                 />
//                 <button onClick={loadSales}>판매 데이터</button>
//                 <button onClick={runForecast}>예측 실행</button>
//             </div>

//             {forecast && (
//                 <button onClick={() => exportForecastExcel(excelRows)}>
//                     📥 엑셀 다운로드
//                 </button>
//             )}

//             <h2>📌 과거 판매량</h2>
//             {sales.length > 0 && (
//                 <ForecastChart
//                     labels={sales.map((s) => s.dateTime.split("T")[0])}
//                     values={sales.map((s) => s.qty)}
//                 />
//             )}

//             {forecast && (
//                 <>
//                     <h2>📌 7일</h2>
//                     <ForecastChart
//                         labels={excelRows
//                             .filter((r) => r.type === "7일 예측")
//                             .map((r) => r.date)}
//                         values={forecast.next7Days}
//                     />

//                     <h2>📌 30일</h2>
//                     <ForecastChart
//                         labels={excelRows
//                             .filter((r) => r.type === "30일 예측")
//                             .map((r) => r.date)}
//                         values={forecast.next30Days}
//                     />

//                     <h2>📅 12개월</h2>
//                     <ForecastChart
//                         labels={excelRows
//                             .filter((r) => r.type === "12개월 예측")
//                             .map((r) => r.date)}
//                         values={forecast.next12Months}
//                     />

//                     <h2>📅 365일</h2>
//                     <ForecastChart
//                         labels={excelRows
//                             .filter((r) => r.type === "365일 예측")
//                             .map((r) => r.date)}
//                         values={forecast.next365Days}
//                     />
//                 </>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { getForecast, getSalesData } from "features/administration/forecast/forecastApi";
import { exportForecastExcel } from "features/administration/forecast/exportForecastExcel";
import ForecastControls from "features/administration/forecast/components/ForecastControls";
import ForecastCharts from "features/administration/forecast/components/ForecastCharts";
import useForecastExcelRows from "features/administration/forecast/useForecastExcelRows";

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

  // 🔥 forecast가 바뀔 때만 계산됨
  const excelRows = useForecastExcelRows(forecast);

  return (
    <div style={{ padding: 20 }}>
      <h1>📈 상품 판매량 예측</h1>

      <ForecastControls
        ppk={ppk}
        setPpk={setPpk}
        loadSales={loadSales}
        runForecast={runForecast}
        forecast={forecast}
        excelRows={excelRows}
        exportExcel={exportForecastExcel}
      />

      <ForecastCharts sales={sales} forecast={forecast} excelRows={excelRows} />
    </div>
  );
}
