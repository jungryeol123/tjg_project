// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getKamisData } from "shared/lib/axiosInstance";
import ProductCard from "shared/ui/ProductCard";
import "./ProductList.scss";

export default function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getKamisData({
        categoryCode: "100", // 채소류
        productClsCode: "01", // 농산물
        countryCode: "1101", // 서울 가락시장
        date: "20251014",
      });

      if (result?.data?.item) {
        setItems(result.data.item);
      } else {
        console.warn("데이터가 없습니다:", result);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <h2 className="section-title">🥦 오늘의 농산물 시세</h2>

      <div className="product-grid">
        {items.length > 0 ? (
          items.map((item, idx) => <ProductCard key={idx} item={item} />)
        ) : (
          <p>데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
}
