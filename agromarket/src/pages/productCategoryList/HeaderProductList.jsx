// src/pages/NewProducts.jsx
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HeaderProductList.scss";
import ProductCard from "shared/ui/productList/ProductCard";
import { useParams } from "react-router-dom";
import { setProductBestListAPI } from "features/product/productAPI";
import { Link } from "react-router-dom";
export function HeaderProductList() {
  const { id } = useParams();
  const productList = useSelector((state) => state.product.productList);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    return productList.filter((p) => p.hotDeal === true || p.memberSpecial === true);
  }, [id, productList]);

  // ✅ (3) 세일 상품 (sale): 할인율(dc)이 10% 이상
  const saleProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];
    if (id !== "sale") return [];
    return productList.filter((p) => p.dc >= 10);
  }, [id, productList]);

  // ✅ (4) 베스트 상품 (best): 백엔드 API 호출
  useEffect(() => {
    const fetchBestProducts = async () => {
      if (id === "best") {
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
      }
    };
    fetchBestProducts();

    // ✅ 즉시 반영되는 필터들
    if (id === "new") {
      setFilteredProducts(sortedNewProducts);
    } else if (id === "deal") {
      setFilteredProducts(hotOrSpecialProducts);
    } else if (id === "sale") {
      setFilteredProducts(saleProducts);
    }
  }, [id, sortedNewProducts, hotOrSpecialProducts, saleProducts]);

  return (
    <div className="new-products-page">
      <h1 className="page-title">
        {id === "best"
          ? "베스트 상품"
          : id === "sale"
          ? "세일 상품 (10% 이상)"
          : id === "deal"
          ? "특가/혜택 상품"
          : "신상품"}
      </h1>

      {/* ✅ 탭 버튼
      <div className="product-tabs">
        <button className={id === "new" ? "active" : ""}>신상품순</button>
        <button className={id === "best" ? "active" : ""}>판매량순</button>
        <button className={id === "sale" ? "active" : ""}>세일상품</button>
        <button className={id === "deal" ? "active" : ""}>특가/혜택</button>
      </div> */}

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
