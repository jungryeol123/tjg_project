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
  const isCheckRoot = location.pathname.includes("/search");
  // 서브 카테고리 아이디(브랜드로 왔을경우 "brand"가 설정되어 넘어옴)
  const subCategoryId = location.state || {};

  // 검색 기능 경로로 왔을 경우
  if(isCheckRoot){
    filtered = productList.filter((p) =>
    p.description.toLowerCase().includes(keyword.toLowerCase()));
  }
  else {
    // 브랜드 클릭 경로로 왔을경우
    if(subCategoryId === "brand") {
      filtered = productList.filter((p) =>
      p.brandName == keyword);
    } else {
      // 카테고리 클릭 경로로 왔을경우
      filtered = productList.filter((p) =>
      p.categorySub.id == subCategoryId);
    }
  }

  return (
    <div className="search-result-page">
      <h2>검색 결과: "{keyword}"</h2>
      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((item, idx) => (
             <Link
                to={`/products/${item.id}`}
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