import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import "./ReviewListPage.scss";

export default function ReviewListPage() {
  const reviewsAll = useSelector((state) => state.product.productReviewList);
  console.log("productReviewList",reviewsAll);
  const [search, setSearch] = useState("");

  // ppk 기준 그룹화
  const grouped = useMemo(() => {
    return reviewsAll.reduce((acc, r) => {
      if (!acc[r.ppk]) {
        acc[r.ppk] = {
          ppk: r.ppk,
          productName: r.product_name,
          count: 0,
        };
      }
      acc[r.ppk].count++;
      return acc;
    }, {});
  }, [reviewsAll]);

  const list = Object.values(grouped);

  // 검색 필터
  const filtered = list.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  // 전체 요약 계산
  const summary = useMemo(() => {
    const totalReviews = reviewsAll.length;

    let positive = 0;
    let negative = 0;

    reviewsAll.forEach((r) => {
      if (
        r.content.includes("맛있") ||
        r.content.includes("좋") ||
        r.content.includes("추천") ||
        r.likes >= 5
      ) { positive++; }
      else { negative++; }
    });

    const topProducts = [...list]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalReviews,
      positive,
      negative,
      topProducts,
    };
  }, [reviewsAll, list]);

  return (
    <div className="review-dashboard">
      <h2 className="page-title">📊 AI 리뷰 분석 대시보드</h2>

      {/* 요약 카드 */}
      <div className="summary-cards">
        <div className="summary-card">
          <p className="summary-title">전체 리뷰 수</p>
          <h3>{summary.totalReviews}</h3>
        </div>
        <div className="summary-card">
          <p className="summary-title">긍정 리뷰</p>
          <h3 className="positive">{summary.positive}</h3>
        </div>
        <div className="summary-card">
          <p className="summary-title">부정 리뷰</p>
          <h3 className="negative">{summary.negative}</h3>
        </div>
      </div>

      {/* 인기 상품 */}
      <div className="top-products-box">
        <h3>🔥 리뷰 많은 인기 상품 TOP 5</h3>
        <ul>
          {summary.topProducts.map((p) => (
            <li key={p.ppk}>
              {p.productName} <span>({p.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 검색 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="상품명을 검색하세요…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 상품 리스트 */}
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
    </div>
  );
}