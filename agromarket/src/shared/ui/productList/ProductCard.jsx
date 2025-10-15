import React from "react";
import "./ProductCard.scss";
import productImages from "./productImages.json";
export default function ProductCard({ item }) {
  const imageSrc = productImages[item.item_name] || "/준비중.png";
  return (
    <div className="product-card">
      <img
        src={imageSrc}
        alt={item.item_name}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{item.item_name}</h3>
        <p className="product-price">
          {item.dpr1 ? `${item.dpr1}원` : "가격 정보 없음"}
        </p>
        <p className="product-unit">{item.unit}</p>
        <span className="market">{item.marketname}</span>
      </div>
    </div>
  );
}