// features/review/components/SummaryCards.jsx
export function SummaryCards({ summary }) {
  return (
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
  );
}
    