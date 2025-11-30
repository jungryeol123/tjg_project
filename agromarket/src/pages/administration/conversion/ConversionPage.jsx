import { useEffect, useState } from "react";
// utils
import ConversionChart from "./ConversionChart";
import { getConversionRates } from "features/administration/analyticsApi";
import { exportConversionExcel } from "features/administration/exportConversionExcel";
// sub

export default function ConversionPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const result = await getConversionRates();
        setData(result);
    };

    const labels = data.map((d) => d.productName);
    const clicks = data.map((d) => d.clicks);
    const orders = data.map((d) => d.orders);
    const rates = data.map((d) => d.conversionRate.toFixed(2));

    return (
        <div style={{ padding: 20 }}>
            <h1>📊 상품별 클릭 → 구매 전환율 분석</h1>
            <button
                onClick={() =>
                    exportConversionExcel(
                        data.map((item) => ({
                            productName: item.productName,
                            clicks: item.clicks,
                            orders: item.orders,
                            conversionRate: item.conversionRate,
                        }))
                    )
                }
            >
                📥 전환율 엑셀 다운로드
            </button>

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
