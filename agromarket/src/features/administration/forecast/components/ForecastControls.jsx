export default function ForecastControls({
  ppk,
  setPpk,
  loadSales,
  runForecast,
  forecast,
  excelRows,
  exportExcel,
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label>PPK: </label>
      <input
        value={ppk}
        onChange={(e) => setPpk(e.target.value)}
        type="number"
      />

      <button onClick={loadSales}>판매 데이터</button>
      <button onClick={runForecast}>예측 실행</button>

      {forecast && (
        <button onClick={() => exportExcel(excelRows)}>📥 엑셀 다운로드</button>
      )}
    </div>
  );
}
