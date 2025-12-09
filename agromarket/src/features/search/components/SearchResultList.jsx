import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "shared/ui/productCard/ProductCard";

export function SearchResultList({ filterList }) {
  if (!filterList || filterList.length === 0)
    return <p>검색 결과가 없습니다.</p>;

  return (
    <div className="product-grid">
      {filterList.map((item, idx) => (
        <Link
          to={`/products/${encodeURIComponent(item.id)}`}
          key={idx}
        >
          <ProductCard item={item} />
        </Link>
      ))}
    </div>
  );
}
