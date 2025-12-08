import { useMemo } from "react";

export default function useForecastExcelRows(forecast) {
  return useMemo(() => {
    if (!forecast) return [];

    const today = new Date();
    const rows = [];

    const genDates = (len, type = "day") =>
      Array.from({ length: len }, (_, i) => {
        const d = new Date(today);
        if (type === "day") d.setDate(today.getDate() + (i + 1));
        else d.setMonth(today.getMonth() + (i + 1));
        return d.toISOString().split("T")[0];
      });

    // 7일
    genDates(7).forEach((date, i) => {
      rows.push({
        type: "7일 예측",
        date,
        value: forecast.next7Days[i],
      });
    });

    // 30일
    genDates(30).forEach((date, i) => {
      rows.push({
        type: "30일 예측",
        date,
        value: forecast.next30Days[i],
      });
    });

    // 12개월
    Array.from({ length: 12 }, (_, i) => {
      const d = new Date(today);
      d.setMonth(today.getMonth() + (i + 1));
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    }).forEach((month, i) => {
      rows.push({
        type: "12개월 예측",
        date: month,
        value: forecast.next12Months[i],
      });
    });

    // 365일
    genDates(365).forEach((date, i) => {
      rows.push({
        type: "365일 예측",
        date,
        value: forecast.next365Days[i],
      });
    });

    return rows;
  }, [forecast]);
}
