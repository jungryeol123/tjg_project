import React from "react";
import { Link } from "react-router-dom";

export function RelatedProductList({ relatedProducts }) {
  if (!relatedProducts.length) return null;

  return (
    <>
      <h2 className="section-title">레시피에 필요한 상품</h2>

      <div className="related-product-list">
        {relatedProducts.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id}>
            <div className="related-product-card">
              <img src={`/images/productImages/${p.imageUrl}`} alt={p.productName} />
              <div className="product-name">{p.productName}</div>
              <div className="product-price">{p.price.toLocaleString()}원</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
