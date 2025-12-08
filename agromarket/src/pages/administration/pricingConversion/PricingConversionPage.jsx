// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import PricingConversionChart from "./PricingConversionChart";
// // shared
// import { api } from 'shared/lib/axios.js';
// import "./pricing.scss";   // ⭐ SCSS 적용

// export default function PricingConversionPage() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         load();
//     }, []);

//     const load = async () => {
//         const res = await api.get("/api/admin/pricing/all");
//         setData(res.data);
//     };

//     const labels = data.map((d) => d.productName);
//     const prices = data.map((d) => d.currentPrice);
//     const aiPrices = data.map((d) => d.aiLowerPrice);
//     const clicks = data.map((d) => d.clicks);
//     const orders = data.map((d) => d.orders);
//     const rates = data.map((d) => d.conversionRate.toFixed(2));
//     const aiRates = data.map((d) => d.aiConversionRate.toFixed(2));
//     const aiClickRates = data.map((d) => d.aiClickRate.toFixed(2));

//     return (
//         <div className="pricing-page">
//             <h1>📊 AI 가격 최적화 분석 (전체 상품)</h1>
//             {data.length > 0 ? (
//                 <>
//                     <PricingConversionChart
//                         labels={labels}
//                         prices={prices}
//                         clicks={clicks}
//                         orders={orders}
//                         rates={rates}
//                         aiRates={aiRates}
//                         aiClickRates={aiClickRates}
//                         aiPrices={aiPrices}
//                     />

//                     <div className="detail-section">
//                         <h2>상품 상세 분석 보기</h2>
//                         <ul>
//                             {data.map((d) => (
//                                 <li key={d.ppk}>
//                                     <Link to={`/admin/pricing/${d.ppk}`}>
//                                         {d.productName}
//                                         <span>{d.currentPrice.toLocaleString()}원</span>
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </>
//             ) : (
//                 <p>데이터를 불러오는 중...</p>
//             )}
//         </div>
//     );
// }
import { Link } from "react-router-dom";
import "./pricing.scss";
import PricingConversionChart from "features/administration/pricingConversion/components/PricingConversionChart";
import { usePricingData } from "features/administration/pricingConversion/usePricingData";

export default function PricingConversionPage() {
  const {
    data,
    labels,
    prices,
    clicks,
    orders,
    rates,
    aiRates,
    aiClickRates,
    aiPrices,
  } = usePricingData();

  return (
    <div className="pricing-page">
      <h1>📊 AI 가격 최적화 분석 (전체 상품)</h1>

      {data.length > 0 ? (
        <>
          <PricingConversionChart
            labels={labels}
            prices={prices}
            clicks={clicks}
            orders={orders}
            rates={rates}
            aiRates={aiRates}
            aiClickRates={aiClickRates}
            aiPrices={aiPrices}
          />

          <div className="detail-section">
            <h2>상품 상세 분석 보기</h2>
            <ul>
              {data.map((d) => (
                <li key={d.ppk}>
                  <Link to={`/admin/pricing/${d.ppk}`}>
                    {d.productName}
                    <span>{d.currentPrice.toLocaleString()}원</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
}
