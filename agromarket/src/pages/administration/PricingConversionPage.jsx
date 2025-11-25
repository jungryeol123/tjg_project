import { useEffect, useState } from "react";
import PricingConversionChart from "./PricingConversionChart";
import { getPricingConversionRates } from "utils/pricingAnalyticsApi";

export default function PricingConversionPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const result = await getPricingConversionRates();
        setData(result);
    };

    const labels = data.map((d) => d.productName);
    const prices = data.map((d) => d.currentPrice);
    const clicks = data.map((d) => d.clicks);
    const orders = data.map((d) => d.orders);
    const rates = data.map((d) => d.conversionRate.toFixed(2));
    const aiRates = data.map((d) => d.aiConversionRate.toFixed(2));
    const aiClickRates = data.map((d) => d.aiClickRate.toFixed(2));

    return (
        <div style={{ padding: 20 }}>
            <h1>📊 AI 가격 최적화 분석 (전체상품)</h1>

            {data.length > 0 ? (
                <PricingConversionChart
                    labels={labels}
                    prices={prices}
                    clicks={clicks}
                    orders={orders}
                    rates={rates}
                    aiRates={aiRates}
                    aiClickRates={aiClickRates}
                />
            ) : (
                <p>데이터 불러오는 중...</p>
            )}
        </div>
    );
}
