// usePricingData.js
import { useEffect, useState } from "react";
import { api } from "shared/lib/axios";

export function usePricingData() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await api.get("/api/admin/pricing/all");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // 전처리
  const labels = data.map((d) => d.productName);
  const prices = data.map((d) => d.currentPrice);
  const aiPrices = data.map((d) => d.aiLowerPrice);
  const clicks = data.map((d) => d.clicks);
  const orders = data.map((d) => d.orders);
  const rates = data.map((d) => d.conversionRate.toFixed(2));
  const aiRates = data.map((d) => d.aiConversionRate.toFixed(2));
  const aiClickRates = data.map((d) => d.aiClickRate.toFixed(2));

  return {
    data,
    labels,
    prices,
    clicks,
    orders,
    rates,
    aiRates,
    aiClickRates,
    aiPrices,
  };
}
