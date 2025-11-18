// src/pages/SearchResult.jsx
import React, { useEffect, useState } from "react";
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
  // 화면에 표시하는 필터리스트
  const [filterList, setFilterList] = useState([]);

  // 현재 경로 취득
  const location = useLocation();

  // 어떤 경로로 들어왔는지 확인 가능
  const pathName = location.pathname;

  // 카테고리 분류(대분류인지 중분류인지 확인)
  const categoryData = location.state || {};

  useEffect( () => {
    let filtered = [];

    // 검색 기능 경로로 왔을 경우
    if(pathName.includes("/search")){
      filtered = productList.filter((p) =>
      p.description.toLowerCase().includes(keyword.toLowerCase()));

      setFilterList(filtered);
    }
    // 브랜드 클릭 경로로 왔을경우
    else if (pathName.includes("/brand")){
      filtered = productList.filter((p) =>
      p.brandName === keyword);

      setFilterList(filtered);
    }
    // 카테고리 클릭 경로로 왔을경우
    else {
      // 대분류로 검색
      if(categoryData.type === "main"){
        // 대분류 추출
        const category = categoryList.find( (category) => category.id === categoryData.id );

        // 대분류 별 필터 설정
        filtered = productList.filter((p) =>
          category.subCategories.some(sub => sub.id === p.categorySub.id)
        );
      // 중분류로 검색
      } else {
        // 중분류 별 필터 설정
        filtered = productList.filter((p) =>
        p.categorySub.id === categoryData.id);
      }
            
      setFilterList(filtered);
    }
  },[pathName]);

  const handleFilter = (keyword) => {
    let filtered = [];

    // 최신순 클릭
    if(keyword === "new") {
      filtered = filterList.toSorted(
        (a, b) => new Date(b.productDate) - new Date(a.productDate)
      );
    }
    // 가격순 클릭
    else if(keyword === "priceHigh") {
      filtered = filterList.toSorted(
        (a, b) => b.price - a.price
      );
    }
    // 구매순 클릭
    else if(keyword === "priceRow") {
      filtered = filterList.toSorted(
        (a, b) => a.price - b.price
      );
    }
    // 필터 결과 설정
    setFilterList(filtered);
  }

  return (
    <div className="search-result-page">
      <h2>검색 결과: "{keyword}"</h2>
      <ul className="product-filter">
        <li className="item" onClick={ ()=> { handleFilter("new") }}><a>최신순</a></li>
        <li className="item" onClick={ ()=> { handleFilter("priceHigh") }}><a>높은가격순</a></li>
        <li className="item" onClick={ ()=> { handleFilter("priceRow") }}><a>낮은가격순</a></li>
      </ul>
      {filterList?.length > 0 ? (
        <div className="product-grid">
          {filterList?.map((item, idx) => (
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