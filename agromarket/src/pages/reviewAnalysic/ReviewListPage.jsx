import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ReviewListPage() {
  const reviewsAll = useSelector(state => state.product.productReviewList);

  // 상품명/ppk 기준으로 그룹화
  const grouped = reviewsAll.reduce((acc, r) => {
    if (!acc[r.ppk]) {
      acc[r.ppk] = {
        ppk: r.ppk,
        productName: r.product_name,
        count: 0
      };
    }
    acc[r.ppk].count++;
    return acc;
  }, {});

  const list = Object.values(grouped);

  return (
    <div>
      <h2>AI 리뷰 분석 (상품 목록)</h2>

      {list.map(item => (
        <div key={item.ppk} style={{ margin: "10px 0" }}>
          <Link to={`admin/reviews/${item.ppk}`}>
            {item.productName} ({item.count})
          </Link>
        </div>
      ))}
    </div>
  );
}
