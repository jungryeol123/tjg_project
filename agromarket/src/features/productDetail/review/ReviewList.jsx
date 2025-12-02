import { useSelector } from "react-redux";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ReviewList.scss";

export function ReviewList({ id }) {
  const reviewsAll = useSelector((state) => state.product.productReviewList);
  const [reviews, setReviews] = useState([]);
  const [reviewImages, setReviewImages] = useState([]);
  // const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const isFirstRender = useRef(true);
  // ✅ 부모요소 ref 추가
  const containerRef = useRef(null);

  // ✅ 상품별 리뷰 필터링
  const productReviews = useMemo(() => {
    // if (!reviewsAll || reviewsAll.length === 0) return [];
    return reviewsAll.filter((review) => review.ppk ===  Number(id));
  }, [reviewsAll, id]);

  // ✅ 리뷰에서 이미지만 추출
  useEffect(() => {
    if (productReviews.length > 0) {
      const allImages = productReviews.flatMap((r) => r.images || []);
      
      setReviewImages(allImages.slice(0, 6));
      setReviews(productReviews); // 6개까지만 미리보기
    } else {
      setReviews(productReviews); 
      setReviewImages([]);
    }
  }, [productReviews]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 첫 렌더링일 땐 스크롤하지 않음
    }

    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev * itemsPerPage < reviews.length ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // ✅ slice 계산을 여기서 즉시 수행
  const currentItems = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="review-list" ref={containerRef}>
      <h2>상품 후기</h2>
      <p>총 {reviews.length.toLocaleString()}개</p>

      { reviews.length === 0 ? "상품 후기가 존재하지 않습니다."
       : <>
        <div className="review-images">
          {reviewImages.map((img, i) => (
            <div key={i} className="review-thumb">
              <img src={img} alt={`review-${i}`} />
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top">
                <span>상품 전체 보기</span>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ 리뷰 카드 목록 */}
        {currentItems.map((r, index) => (
          <div key={index} className="review-card">
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

      {currentItems.length !== 0 ?
        <div className="pagination">
          <button onClick={handlePrev}
            disabled={currentPage === 1}>
            {"<"}
          </button>
          <span style={{ margin: "0 0.6rem" }}>
            {currentPage} / {Math.ceil(reviews.length / itemsPerPage)}
          </span>
          <button onClick={handleNext}
            disabled={currentPage * itemsPerPage >= reviews.length}>
            {">"}
          </button>
        </div>
        : ""}
      </>}
    </div>
  );
}
