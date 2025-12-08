// ProductGrid.jsx
import { Link } from "react-router-dom";
import ProductCard from "shared/ui/productCard/ProductCard";

export default function ProductGrid({ items, onDelete }) {
  return (
    <div className="product-grid">
      {items.map((item, idx) => (
        <div key={idx}>
          <Link to={`/admin/products/update`} state={{ item }}>
            <ProductCard item={item} />
            <button type="button" className="update-btn">편집</button>
          </Link>

          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(item.id)}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
