// utils/exportForecastExcel.js
import axios from "axios";

export async function exportForecastExcel(rows) {
  const res = await axios.post(
    "/excel/forecast",
    { rows },
    { responseType: "blob" }
  );

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "forecast.xlsx");

  document.body.appendChild(link);
  link.click();
}
