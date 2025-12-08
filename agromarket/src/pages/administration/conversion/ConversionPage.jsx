
import { useConversionData } from "features/administration/conversion/hooks/useConversionData";
import ConversionChart from "./ConversionChart";
import { exportConversionExcel } from "features/administration/conversion/exportConversionExcel";

export default function ConversionPage() {
  const { data, labels, clicks, orders, rates } = useConversionData();

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 상품별 클릭 → 구매 전환율 분석</h1>

      <button
        onClick={() =>
          exportConversionExcel(
            data.map(item => ({
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
