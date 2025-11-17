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
  // 카테고리(대분류) 리스트
  const categoryList = useSelector((state) => state.category.categoryList);

  // 현재 경로 취득
  const location = useLocation();

  let filtered;

  // 어떤 경로로 들어왔는지 확인 가능
  const pathName = location.pathname;

  // 카테고리 분류(대분류인지 중분류인지 확인)
  const categoryData = location.state || {};

  // 검색 기능 경로로 왔을 경우
  if(pathName.includes("/search")){
    filtered = productList.filter((p) =>
    p.description.toLowerCase().includes(keyword.toLowerCase()));
  }
  // 브랜드 클릭 경로로 왔을경우
  else if (pathName.includes("/brand")){
    filtered = productList.filter((p) =>
    p.brandName == keyword);
  }
  // 카테고리 클릭 경로로 왔을경우
  else {
    if(categoryData.type === "main"){
      // 대분류 추출
      const category = categoryList.find( (category) => category.id == categoryData.id );

      // 대분류 별 필터 설정
      filtered = productList.filter((p) =>
        category.subCategories.some(sub => sub.id == p.categorySub.id)
      );

    } else {
      // 중분류 별 필터 설정
      filtered = productList.filter((p) =>
      p.categorySub.id == categoryData.id);
    }
  }

  return (
    <div className="search-result-page">
      <h2>검색 결과: "{keyword}"</h2>
      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((item, idx) => (
             <Link
                to={`/products/${encodeURIComponent(item.id)}`}
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