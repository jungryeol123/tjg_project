import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// shared
import { api } from 'shared/lib/axios.js';
import "./ReviewAnalysisPage.scss";

export default function ReviewAnalysisPage() {
  const { ppk } = useParams();
  const reviewsAll = useSelector((state) => state.product.productReviewList);

  const reviews = reviewsAll.filter((r) => r.ppk === Number(ppk));
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    api.get(`/api/admin/reviews/analysis/${ppk}`)
      .then((res) => {
        setAnalysis(res.data);
      });
  }, [ppk]);

  if (!reviews.length) return <p>리뷰가 없습니다</p>;
  if (!analysis) return <p>AI 분석 중...</p>;

  return (
    <div className="analysis-page">
      <h2 className="page-title">
        {analysis.productName} AI 리뷰 분석
      </h2>

      {/* AI 분석 요약 카드 */}
      <div className="analysis-grid">
        <div className="analysis-card">
          <h3>🍽 맛 키워드</h3>
          <ul>
            {analysis.tasteKeywords.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
        </div>

        <div className="analysis-card">
          <h3>👍 고객이 좋아한 포인트</h3>
          <ul>
            {analysis.positivePoints.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
        </div>

        <div className="analysis-card">
          <h3>⚠ 품질 문제</h3>
          <ul>
            {analysis.qualityIssues.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
        </div>

        <div className="analysis-card score-card">
          <h3>😊 긍정 / 😡 부정</h3>
          <p className="positive-score">긍정 {analysis.positiveCount.toLocaleString()}개</p>
          <p className="negative-score">부정 {analysis.negativeCount.toLocaleString()}개</p>
        </div>
      </div>

      {/* 실제 리뷰 */}
      <h3 className="review-title">📌 전체 리뷰({reviews.length.toLocaleString()})</h3>
      <div className="review-list">
        {reviews.map((r) => (
          <div key={r.id} className="review-item">
            <p className="review-title-text">{r.title}</p>
            <p className="review-content">{r.content}</p>

            {r.images?.length > 0 && (
              <div className="review-images">
                {r.images.map((img, i) => (
                  <img key={i} src={img} alt="" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
