import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ReviewAnalysisPage() {
  const { ppk } = useParams();
  const reviewsAll = useSelector(state => state.product.productReviewList);

  // 현재 상품 리뷰만 필터
  const reviews = reviewsAll.filter(r => r.ppk === Number(ppk));

  // 분석용 텍스트 준비
  const texts = reviews.map(r => r.content);

  return (
    <div style={{ padding: 20 }}>
      <h2>{reviews[0]?.product_name} 리뷰 분석</h2>

      <section>
        <h3>총 리뷰 {reviews.length}개</h3>
      </section>

      <section>
        <h3>리뷰 목록</h3>
        {reviews.map(r => (
          <div key={r.id} style={{ borderBottom: "1px solid #ddd", padding: 10 }}>
            <p><b>{r.title}</b></p>
            <p>{r.content}</p>

            {r.images?.length > 0 && (
              <div style={{ display: "flex", gap: 10 }}>
                {r.images.map((img, i) => (
                  <img key={i} src={img} width={80} alt="" />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
