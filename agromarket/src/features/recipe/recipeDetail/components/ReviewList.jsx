import React from "react";

export function ReviewList({ currentItems }) {
  if (!currentItems.length) return <p>아직 작성된 후기가 없습니다.</p>;

  return (
    <ul className="review-list">
      {currentItems.map((rev) => (
        <li key={rev.id} className="review-item">
          <div className="review-header">
            <span className="review-user">{rev.username}</span>
            <span className="review-rating">⭐ {rev.rating}</span>
          </div>
          <div className="review-content">{rev.content}</div>
          <div className="review-date">
            {new Date(rev.createdAt).toLocaleString("ko-KR")}
          </div>
        </li>
      ))}
    </ul>
  );
}
    