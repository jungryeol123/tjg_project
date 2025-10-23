import React, { useEffect, useState } from "react";
import "./ReviewList.scss";
import { axiosGet } from "shared/lib/axiosInstance";

export function ReviewList({pid}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const axiosData = async () => {
      const result = await axiosGet("/data/reviews.json");
      const reviews = result.reviews.filter((item) => item.pid === pid);
      setReviews(reviews);
    };
    axiosData();
  }, [pid]);

  return (
    <div className="review-list">
      <h2>상품 후기</h2>
      <p>총 {reviews.length}개</p>

      {reviews.map((r) => (
        <div key={r.id} className="review-card">
          {r.isBest && <span className="badge">베스트</span>}

          <h3>{r.productName}</h3>
          <p className="review-title">{r.title}</p>
          <p className="review-content">{r.content}</p>

          <div className="review-images">
            {r.images.map((img, i) => (
              <img key={i} src={img} alt="리뷰 이미지" />
            ))}
          </div>

          <div className="review-footer">
            <div className="user-Date">
              <span>{r.userId}</span>
              <span className="date">{r.date}</span>
            </div>
            <span className="likes">도움돼요 {r.likes}</span>
          </div>

          <div className="tags">
            {r.tags.map((tag, i) => (
              <span key={i} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
