// useConversionData.js
import { useEffect, useState } from "react";
import { getConversionRates } from "../analyticsApi";

export function useConversionData() {
  const [data, setData] = useState([]);

  const load = async () => {
    const result = await getConversionRates();
    setData(result);
  };

  useEffect(() => {
    load();
  }, []);

  const labels = data.map(d => d.productName);
  const clicks = data.map(d => d.clicks);
  const orders = data.map(d => d.orders);
  const rates = data.map(d => d.conversionRate.toFixed(2));

  return {
    data,
    labels,
    clicks,
    orders,
    rates,
    reload: load,
  };
}
