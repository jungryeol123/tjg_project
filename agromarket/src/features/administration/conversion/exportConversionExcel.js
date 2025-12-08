// utils
import { api } from "shared/lib/axios.js";

export async function exportConversionExcel(rows) {
  const res = await api.post(
    "/excel/conversion",
    { rows },
    {
      responseType: "blob", // 엑셀파일로 받기 위해 blob 설정
    }
  );

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "conversion.xlsx");
  document.body.appendChild(link);
  link.click();
}
