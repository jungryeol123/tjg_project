import React, { use, useEffect, useState } from "react";
import "./ReviewList.scss";
import { axiosGet } from "shared/lib/axiosInstance";

export function ReviewList({ pid }) {
  const [reviews, setReviews] = useState([]);
    const [reviewImages, setReviewImages] = useState([]);
    const [images, setImages] = useState([]);
     const [showModal, setShowModal] = useState(false);

     
  useEffect(() => {
    const axiosData = async () => {
      const result = await axiosGet("/data/reviews.json");
      const reviews = result.reviews.filter((item) => item.pid === pid);
      const allImages = reviews.flatMap((review) => review.images);
      setImages(allImages);
       // ✅ 6개까지만 표시
      const visibleImages = allImages.slice(0, 6);
      setReviews(reviews);
      setReviewImages(visibleImages );
    };
    axiosData();
  }, [pid]);

  return (
    <div className="review-list">
      <h2>상품 후기</h2>
      <p>총 {reviews.length}개</p>

      <div className="review-images">
      {reviewImages.map((img, i) => (
        <div key={i} className="review-thumb">
          <img src={img} alt={`review-${i}`} />
        </div>
      ))}

      {/* ✅ 나머지 있으면 '더보기' 버튼 표시 */}
      {images.length > 6 && (
        <div className="review-thumb more" onClick={() => setShowModal(true)}>
          <span>+ 더보기</span>
        </div>
      )}

      {/* ✅ 전체 이미지 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않게
          >
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <div className="modal-grid">
              {images.map((img, i) => (
                <div key={i} className="modal-image">
                  <img src={img} alt={`full-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>

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
