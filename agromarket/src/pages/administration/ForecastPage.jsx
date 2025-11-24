import { useEffect, useState } from "react";
import ForecastChart from "./ForecastChart";
import { getForecast, getSalesData } from "utils/forecastApi";
import { exportForecastExcel } from "utils/exportForecastExcel";

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

    // ------------------------ 엑셀 데이터 구성 ------------------------
    const excelForecastRows = [];

    if (forecast) {
        // 날짜 생성 함수
        const genDates = (length, type = "day") =>
            Array.from({ length }, (_, i) => {
                const d = new Date(today);
                if (type === "day") d.setDate(today.getDate() + (i + 1));
                else d.setMonth(today.getMonth() + (i + 1));
                return d.toISOString().split("T")[0];
            });

        // 7일 예측
        genDates(7).forEach((date, i) => {
            excelForecastRows.push({
                구분: "7일 예측",
                날짜: date,
                값: forecast.next7Days[i],
            });
        });

        // 30일 예측
        genDates(30).forEach((date, i) => {
            excelForecastRows.push({
                구분: "30일 예측",
                날짜: date,
                값: forecast.next30Days[i],
            });
        });

        // 12개월 예측 (월)
        Array.from({ length: 12 }, (_, i) => {
            const d = new Date(today);
            d.setMonth(today.getMonth() + (i + 1));
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        }).forEach((month, i) => {
            excelForecastRows.push({
                구분: "12개월 예측",
                날짜: month,
                값: forecast.next12Months[i],
            });
        });

        // 365일
        genDates(365).forEach((date, i) => {
            excelForecastRows.push({
                구분: "365일 예측",
                날짜: date,
                값: forecast.next365Days[i],
            });
        });
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>📈 상품 판매량 예측</h1>

            <div style={{ marginBottom: 20 }}>
                <label>PPK 선택: </label>
                <input
                    value={ppk}
                    onChange={(e) => setPpk(e.target.value)}
                    type="number"
                    placeholder="상품 ppk"
                    style={{ marginLeft: 8 }}
                />

                <button onClick={loadSales} style={{ marginLeft: 10 }}>
                    판매 데이터 불러오기
                </button>
                <button onClick={runForecast} style={{ marginLeft: 5 }}>
                    예측 실행
                </button>
            </div>

            {/* 엑셀 다운로드 */}
            {forecast && (
                <button
                    onClick={() => exportForecastExcel(excelForecastRows)}
                    style={{
                        padding: "8px 16px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        marginBottom: "20px",
                        cursor: "pointer",
                    }}
                >
                    📥 예측 엑셀(차트 포함) 다운로드
                </button>
            )}

            {/* 과거 판매량 */}
            <h2>📌 과거 판매량</h2>
            {sales.length > 0 && (
                <ForecastChart
                    labels={sales.map((s) => s.dateTime.split("T")[0])}
                    values={sales.map((s) => s.qty)}
                />
            )}

            {/* 예측 차트 */}
            {forecast && (
                <>
                    {/* 7일 */}
                    <h2>📌 미래 7일 예측</h2>
                    <ForecastChart
                        labels={forecast.next7Days.map((_, i) => {
                            const d = new Date(today);
                            d.setDate(today.getDate() + (i + 1));
                            return d.toISOString().split("T")[0];
                        })}
                        values={forecast.next7Days}
                    />

                    {/* 30일 */}
                    <h2>📌 미래 30일 예측</h2>
                    <ForecastChart
                        labels={forecast.next30Days.map((_, i) => {
                            const d = new Date(today);
                            d.setDate(today.getDate() + (i + 1));
                            return d.toISOString().split("T")[0];
                        })}
                        values={forecast.next30Days}
                    />

                    {/* 12개월 */}
                    <h2>📅 월별 12개월 예측</h2>
                    <ForecastChart
                        labels={Array.from({ length: 12 }, (_, i) => {
                            const d = new Date(today);
                            d.setMonth(today.getMonth() + (i + 1));
                            return `${d.getFullYear()}-${String(
                                d.getMonth() + 1
                            ).padStart(2, "0")}`;
                        })}
                        values={forecast.next12Months}
                    />

                    {/* 365일 */}
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
