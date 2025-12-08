<<<<<<< HEAD
import React from "react";
import "./AdminProductList.scss";
import "../../../styles/components/filter.scss";
import { useAdminProducts } from "features/administration/adminProductList/useAdminProducts";
import ProductFilter from "features/administration/adminProductList/components/ProductFilter";
import ProductGrid from "features/administration/adminProductList/components/ProductGrid";
=======
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo, useEffect, useState } from "react";
// shared
import { FilterItem } from 'shared/constants/FilterItem';
import ProductCard from 'shared/ui/productCard/ProductCard';
// features
import { parseJwt } from "features/auth/parseJwt";
import { setProductListAPI, delProductData } from "features/product/productAPI";
import "./AdminProductList.scss";
import "../../../styles/components/filter.scss";
>>>>>>> af7669cb9d80b226142f5607a8dba851138cd957

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
<<<<<<< HEAD
          <ProductGrid items={filteredProducts} onDelete={handleDelete} />
=======
          <div className="product-grid">
            {filteredProducts.map((item, idx) => (
              // 상품 편집일 경우, 경로 변경
              <div>
                <Link
                  to={`/admin/products/update`}
                  state={{ item }}
                  key={idx}>
                  <ProductCard item={item} />
                  <button type="button" className="update-btn">편집</button>
                </Link>
                <button type="button" className="delete-btn" onClick={ () => { handleDelete(item.id) } }>삭제</button>
              </div>
            ))}
          </div>
>>>>>>> af7669cb9d80b226142f5607a8dba851138cd957
        ) : (
          <p className="empty">상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
