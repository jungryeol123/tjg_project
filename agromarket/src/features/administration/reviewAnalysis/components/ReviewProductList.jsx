// features/review/components/ReviewProductList.jsx
import { Link } from "react-router-dom";

export function ReviewProductList({ filtered }) {
  return (
    <div className="product-list">
      {filtered.map((item) => (
        <Link
          key={item.ppk}
          to={`/admin/reviews/${item.ppk}`}
          className="product-card"
        >
          <h4>{item.productName}</h4>
          <p>{item.count}개의 리뷰</p>
        </Link>
      ))}

      {filtered.length === 0 && (
        <p className="no-result">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
