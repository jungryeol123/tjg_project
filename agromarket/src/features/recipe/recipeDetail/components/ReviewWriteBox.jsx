import React from "react";

export function ReviewWriteBox({
  newRating,
  newContent,
  setNewRating,
  setNewContent,
  submitReview,
}) {
  return (
    <div className="review-write-box">
      <h3 className="review-write-title">후기 작성하기</h3>

      <div className="write-stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`star ${newRating >= n ? "active" : ""}`}
            onClick={() => setNewRating(n)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="write-textarea"
        placeholder="후기를 입력해주세요."
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />

      <button className="write-submit-btn" onClick={submitReview}>
        등록하기
      </button>
    </div>
  );
}
