// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { axiosGet } from "shared/lib/axiosInstance";
import ProductCard from "shared/ui/productList/ProductCard";
import "./ProductList.scss";

export default function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosGet("/data/foodData.json");
      if (result?.foodData) {
        setItems(result.foodData);
      } else {
        console.warn("데이터가 없습니다:", result);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <h2 className="section-title">🥦 오늘의 농산물 시세!</h2>

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
