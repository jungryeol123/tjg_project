// features/review/hooks/useReviewList.js
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

export function useReviewList() {
  const reviewsAll = useSelector((state) => state.product.productReviewList);
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

  // 요약 계산
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
      ) {
        positive++;
      } else {
        negative++;
      }
    });

    const topProducts = [...list]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { totalReviews, positive, negative, topProducts };
  }, [reviewsAll, list]);

  return {
    search,
    setSearch,
    summary,
    filtered,
  };
}
