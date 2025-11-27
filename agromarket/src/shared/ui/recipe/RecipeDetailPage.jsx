import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
// utils
import {
  getRecipeDetailAPI,
  postRecipeReviewAPI,
} from "utils/recipeAPI";
import "./RecipeDetailPage.scss";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // 현재 경로 확인용
  const location = useLocation();
  
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const isLoggedIn = !!loginInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // 후기 작성 상태
  const [newRating, setNewRating] = useState(0);
  const [newContent, setNewContent] = useState("");

  const productList = useSelector((state) => state.product.productList);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // 후기 정렬
  const sortedReviews = useMemo(() => {
    return [...reviews].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [reviews]);

  // 페이지네이션
  const currentItems = sortedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev * itemsPerPage < sortedReviews.length ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // 상세정보 불러오기
  useEffect(() => {
    const fetch = async () => {
      const result = await getRecipeDetailAPI(id);
      setRecipe(result.recipe);
      setReviews(result.reviews);
    };
    fetch();
  }, [id]);

  // 자동 상품 추천
  useEffect(() => {
    if (!recipe || !productList.length) return;

    const keywords = recipe.ingredients
    .map((ing) => ing.split(/\s+/)[0])      // 🔥 첫 번째 단어만 추출
    .map((w) => w.replace(/[^가-힣a-zA-Z0-9]/g, "")) // 특수문자 제거
    .filter((w) => w.length > 1);           // 한 글자 단어 제외

    const matches = productList.filter((p) =>
      keywords.some((kw) => p.productName.includes(kw))
    );

    setRelatedProducts(matches);
  }, [recipe, productList]);

  // 후기 등록
  const handleSubmitReview = async () => {
    if (newRating === 0) 
      return Swal.fire({
        icon: 'warning',
        title: '⚠ 필수 입력',
        text: "별점을 선택해주세요!",
        confirmButtonText: '확인'
      });
    if (newContent.trim().length < 2)
      return Swal.fire({
        icon: 'warning',
        title: '⚠ 필수 입력',
        text: "후기 내용을 입력해주세요.",
        confirmButtonText: '확인'
      });

    const res = await postRecipeReviewAPI(
      id,
      newRating,
      newContent
    );

    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '✅ 등록 완료',
        text: "후기가 등록되었습니다!",
        confirmButtonText: '확인'
      });
      // 화면 즉시 반영
      setReviews((prev) => [
        {
          id: res.data.recipeReview.user.id,
          username: res.data.recipeReview.user.name,
          rating: newRating,
          content: newContent,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setNewRating(0);
      setNewContent("");
      setCurrentPage(1);
    }
  };

  if (!recipe) return <div>로딩중...</div>;

  return (
    <div className="recipe-detail-container">
      {/* 이미지 */}
      <img src={recipe.imageUrl} alt={recipe.title} className="detail-img" />

      {/* 제목 */}
      <h1 className="detail-title">{recipe.title}</h1>

      {/* 요약 */}
      <div className="detail-summary">{recipe.summary}</div>

      {/* 평점 / 시간 / 난이도 */}
      <div className="detail-info-box">
        <div className="info-item">⭐ {recipe.rating} ({recipe.reviewCount})</div>
        <div className="info-divider" />
        <div className="info-item">⏱ {recipe.cookTime}분</div>
        <div className="info-divider" />
        <div className="info-item">난이도: {recipe.difficulty}</div>
      </div>

      {/* 관련 상품 */}
      {relatedProducts.length > 0 && (
        <>
          <h2 className="section-title">레시피에 필요한 상품</h2>
          <div className="related-product-list">
            {relatedProducts.map((p) => (
              <Link to={`/products/${p.id}`} key={p.id}>
                <div className="related-product-card">
                  <img src={`/images/productImages/${p.imageUrl}`} alt={p.productName} />
                  <div className="product-name">{p.productName}</div>
                  <div className="product-price">{p.price.toLocaleString()}원</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* 재료 */}
      <h2 className="section-title">재료</h2>
      <ul className="ingredient-list">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      {/* 단계 */}
      <h2 className="section-title">조리 단계</h2>
      <ol className="step-list">
        {recipe.steps.map((step, i) => (
          <li key={i}>
            <div className="step-text">{step}</div>
          </li>
        ))}
      </ol>

      {/* 팁 */}
      <h2 className="section-title">팁</h2>
      <div className="tip-box">{recipe.tips}</div>

      {/* Youtube */}
      {recipe.youtubeUrl && (
        <div className="youtube-box">
          <iframe
            width="100%"
            height="400"
            src={recipe.youtubeUrl.replace("watch?v=", "embed/")}
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* 후기 */}
      <h2 className="section-title">후기</h2>

      {/* 후기 작성 UI */}
      {isLoggedIn ? (
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

          <button className="write-submit-btn" onClick={handleSubmitReview}>
            등록하기
          </button>
        </div>
      ) :
      (
      <div
        className="review-login-needed"
        onClick={() => navigate("/login", { state: { from: location.pathname } }) }
      >
        <p>로그인 후 후기를 작성할 수 있습니다.</p>
        <button className="goto-login-btn">로그인하러 가기</button>
      </div>
      )
      }

      {/* 후기 목록 */}
      {currentItems.length === 0 ?
       ( <p>아직 작성된 후기가 없습니다.</p> )
        : (
        <ul className="review-list">
          {currentItems.map((rev) => (
            <li key={rev.id} className="review-item">
              <div className="review-header">
                <span className="review-user">{rev.username}</span>
                <span className="review-rating">⭐ {rev.rating}</span>
              </div>
              <div className="review-content">{rev.content}</div>
              <div className="review-date">{new Date((rev.createdAt)).toLocaleString('ko-KR')}</div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn" onClick={handlePrev} disabled={currentPage === 1}>
          &lt;
        </button>

        <span className="page-info">
          {currentPage} / {Math.ceil(sortedReviews.length / itemsPerPage)}
        </span>

        <button
          className="page-btn"
          onClick={handleNext}
          disabled={currentPage * itemsPerPage >= sortedReviews.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
