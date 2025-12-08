import React from "react";
import "./AdminProductList.scss";
import "../../../styles/components/filter.scss";
import { useAdminProducts } from "features/administration/adminProductList/useAdminProducts";
import ProductFilter from "features/administration/adminProductList/components/ProductFilter";
import ProductGrid from "features/administration/adminProductList/components/ProductGrid";

export function AdminProductList() {
  const {
    loading,
    activeFilter,
    filteredProducts,
    filterLabel,
    handleFilter,
    handleDelete,
  } = useAdminProducts();

  return (
    <div className="new-products-page">
      <h1 className="page-title">상품 편집</h1>

      <ProductFilter
        filterLabel={filterLabel}
        activeFilter={activeFilter}
        onFilter={handleFilter}
      />

      <div className="product-list-container">
        {loading ? (
          <p className="loading">로딩 중...</p>
        ) : filteredProducts.length > 0 ? (
          <ProductGrid items={filteredProducts} onDelete={handleDelete} />
        ) : (
          <p className="empty">상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
