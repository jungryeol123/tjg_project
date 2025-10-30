// src/pages/SearchResult.jsx
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "shared/ui/productList/ProductCard";
import "./SearchResult.scss";
import { Link } from "react-router-dom";
export default function SearchResult() {
  const { keyword } = useParams();
  const productList = useSelector((state) => state.product.productList);
  // 현재 경로 취득
  const location = useLocation();
  
  let filtered;

  // 어떤 경로로 들어왔는지 확인 가능
  const isCheckRoot = location.pathname.includes("/keyword/");

  if(isCheckRoot){
    filtered = productList.filter((p) =>
      p.description.toLowerCase().includes(keyword.toLowerCase())
    );
  } else {
    filtered = productList.filter((p) =>
      p.brandName == keyword);
  }

  return (
    <div className="search-result-page">
      <h2>검색 결과: "{keyword}"</h2>
      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((item, idx) => (
             <Link
                to={`/products/${item.pid}/${item.id}`}
                key={idx}>
                    <ProductCard key={item.pid} item={item} />
                </Link>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
