import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
// shared
import { FilterItem } from "../../shared/constants/FilterItem";
import "./SearchResult.scss"
import "../../styles/components/filter.scss";
import ProductCard from "shared/ui/productCard/ProductCard";

export default function SearchResult() {
  const { keyword } = useParams();
  const productList = useSelector((state) => state.product.productList);
  // 카테고리(대분류) 리스트
  const categoryList = useSelector((state) => state.category.categoryList);
  // 화면에 표시하는 필터리스트
  const [filterList, setFilterList] = useState([]);
  // 선택된 필터라벨
  const [activeFilter, setActiveFilter] = useState("");

  // 현재 경로 취득
  const location = useLocation();

  // 어떤 경로로 들어왔는지 확인 가능
  const pathName = location.pathname;

  // 카테고리 분류(대분류인지 중분류인지 확인)
  const categoryData = location.state || {};

  // 필터 분류
  const filterLabel = [
    { label: "최신순", value: "new" },
    { label: "높은가격순", value: "priceHigh" },
    { label: "낮은가격순", value: "priceLow" }
  ];

  useEffect( () => {
    let filtered = [];

    // 검색 기능 경로로 왔을 경우(상품명, 브랜드명, 안내사항에 포함될경우 출력)
    if(pathName.includes("/search")){
      filtered = productList.filter((p) =>
      p.description.toLowerCase().includes(keyword.toLowerCase()) ||
      p.productName.toLowerCase().includes(keyword.toLowerCase()) ||
      p.brandName.toLowerCase().includes(keyword.toLowerCase())
    );

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

    setActiveFilter("");
  },[pathName]);

  // 필터 클릭시 이벤트
  const handleFilter = (type) => {
    let filtered = [];
    // 클릭한 필터 활성화
    setActiveFilter(type);

    // 최신순 클릭
    if(type === "new") {
      filtered = filterList.toSorted(
        (a, b) => new Date(b.productDate) - new Date(a.productDate)
      );
    }
    // 가격순 클릭
    else if(type === "priceHigh") {
      filtered = filterList.toSorted(
        (a, b) => b.price - a.price
      );
    }
    // 구매순 클릭
    else if(type === "priceLow") {
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
        {filterLabel.map((item) => (
          <FilterItem
            key={item.value}
            label={item.label}
            value={item.value}
            activeFilter={activeFilter}
            onClick={handleFilter}
          />
        ))}
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