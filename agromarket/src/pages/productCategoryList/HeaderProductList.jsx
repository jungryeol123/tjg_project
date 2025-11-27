import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo, useEffect, useState } from "react";
// shared
import { FilterItem } from "shared/constants/FilterItem";

// features
import { setProductBestListAPI, setProductListAPI } from "features/product/productAPI";
import "./HeaderProductList.scss";
import "../../styles/components/filter.scss";
import ProductCard from "shared/ui/productCard/ProductCard";

export function HeaderProductList() {
  const { id } = useParams();
  const productList = useSelector((state) => state.product.productList);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  // 상품 리스트 최신화
  useEffect(() => {
    dispatch(setProductListAPI());
    setActiveFilter("");
  }, []);

  // ✅ (1) 신상품: 날짜 기준 최신순 정렬
  const sortedNewProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];
    if (id !== "new") return [];
    return [...productList]
      .filter((p) => !!p.productDate)
      .sort((a, b) => new Date(b.productDate) - new Date(a.productDate));
  }, [id, productList]);

  // ✅ (2) 특가 상품 (deal): HotDeal or MemberSpecial이 true
  const hotOrSpecialProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];
    if (id !== "deal") return [];
    return productList
      .filter((p) => p.hotDeal === true || p.memberSpecial === true);
  }, [id, productList]);

  // ✅ (3) 세일 상품 (sale): 할인율(dc)이 10% 이상
  const saleProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];
    if (id !== "sale") return [];
    return productList
      .filter((p) => p.dc >= 10)
      .sort((a, b) => b.dc - a.dc);
  }, [id, productList]);

  // ✅ (4) 마감 상품 (time) : 날짜 기준 오래된 순서
  const timeProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];
    if (id !== "time") return [];
    return [...productList]
      .filter((p) => !!p.productDate)
      .sort((a, b) => new Date(a.productDate) - new Date(b.productDate));
  }, [id, productList]);

  // ✅ (5) 베스트 상품 (best): 백엔드 API 호출
  useEffect(() => {
    if(id !== "best") return;
    const fetchBestProducts = async () => {
        setLoading(true);
        try {
          const result = await setProductBestListAPI();
          setFilteredProducts(result);
        } catch (error) {
          console.error("베스트 상품 불러오기 실패:", error);
          setFilteredProducts([]);
        } finally {
          setLoading(false);
        }
    };
    fetchBestProducts();
  },[id]);

  // ✅ 즉시 반영되는 필터들
  useEffect(() =>{
    if (id === "new") {
      setFilteredProducts(sortedNewProducts);
    } else if (id === "deal") {
      setFilteredProducts(hotOrSpecialProducts);
    } else if (id === "sale") {
      setFilteredProducts(saleProducts);
    } else if (id === "time") {
      setFilteredProducts(timeProducts);
    }
  }, [id, productList, sortedNewProducts, hotOrSpecialProducts, saleProducts, timeProducts]);

  // 선택된 필터라벨
  const [activeFilter, setActiveFilter] = useState("");

  // 필터 분류
  const filterLabel = [
    { label: "최신순", value: "new" },
    { label: "높은가격순", value: "priceHigh" },
    { label: "낮은가격순", value: "priceLow" }
  ];

  // 필터 클릭시 이벤트
  const handleFilter = (type) => {
    let filtered = [];
    // 클릭한 필터 활성화
    setActiveFilter(type);

    // 최신순 클릭
    if(type === "new") {
      filtered = filteredProducts.toSorted(
        (a, b) => new Date(b.productDate) - new Date(a.productDate)
      );
    }
    // 가격순 클릭
    else if(type === "priceHigh") {
      filtered = filteredProducts.toSorted(
        (a, b) => b.price - a.price
      );
    }
    // 구매순 클릭
    else if(type === "priceLow") {
      filtered = filteredProducts.toSorted(
        (a, b) => a.price - b.price
      );
    }
    // 필터 결과 설정
    setFilteredProducts(filtered);
  }

  return (
    <div className="new-products-page">
      <h1 className="page-title">
        {id === "best"
          ? "베스트 상품"
          : id === "sale"
          ? "세일 상품 (10% 이상)"
          : id === "deal"
          ? "특가/혜택 상품"
          : id === "time"
          ? "마감 임박 상품" 
          : "신상품"}
      </h1>
      {/* 필터 */}
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
      <div className="product-list-container">
        {loading ? (
          <p className="loading">로딩 중...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((item, idx) => (
                <Link
                  to={`/products/${item.id}`}
                  key={idx}
                >
                    <ProductCard item={item} />
                </Link>
            ))}
          </div>
        ) : (
          <p className="empty">상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
