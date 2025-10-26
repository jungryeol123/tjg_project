// src/pages/NewProducts.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux"; // ✅ 네가 만든 컴포넌트
import "./HeaderProductList.scss";
import ProductCard from "shared/ui/productList/ProductCard";
import { useParams } from "react-router-dom";

export function HeaderProductList() {
    const {id} = useParams();
  const productList = useSelector((state) => state.product.productList);

  // ✅ 신상품 필터링
  const filteredProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];

    // keyword가 "new"이면 productDate 기준 최신순
    if (id === "new") {
      return [...productList]
        .filter((p) => !!p.productDate)
        .sort(
          (a, b) => new Date(b.productDate) - new Date(a.productDate)
        );
    }

    // 그 외 키워드는 브랜드, 이름, 카테고리 검색 등으로 확장 가능
    return productList.filter((p) =>
      p.productName.toLowerCase().includes(id.toLowerCase())
    );
  }, [productList, id]);

  return (
    <div className="new-products-page">
      <h1 className="page-title">신상품</h1>

      {/* ✅ 탭 영역 */}
      <div className="product-tabs">
        <button className={id === "new" ? "active" : ""}>신상품순</button>
        <button>판매량순</button>
        <button>할인율순</button>
        <button>낮은 가격순</button>
        <button>높은 가격순</button>
      </div>

      <div className="product-list-container">
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((item) => (
              <ProductCard item={item} />
            ))}
          </div>
        ) : (
          <p className="empty">상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
