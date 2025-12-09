import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { getRecipeDetailAPI, postRecipeReviewAPI } from "utils/recipeAPI";

export function useRecipeDetail(id) {
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const productList = useSelector((state) => state.product.productList);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // 리뷰 작성 상태
  const [newRating, setNewRating] = useState(0);
  const [newContent, setNewContent] = useState("");

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const isLoggedIn = !!loginInfo;

  // 후기 정렬
  const sortedReviews = useMemo(() => {
    return [...reviews].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [reviews]);

  // 현재 페이지 아이템
  const currentItems = sortedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 상세 불러오기
  useEffect(() => {
    const fetch = async () => {
      const result = await getRecipeDetailAPI(id);
      setRecipe(result.recipe);
      setReviews(result.reviews);
    };
    fetch();
  }, [id]);

  // 자동 추천 상품
  useEffect(() => {
    if (!recipe || !productList.length) return;

    const keywords = recipe.ingredients
      .map((ing) => ing.split(/\s+/)[0])
      .map((w) => w.replace(/[^가-힣a-zA-Z0-9]/g, ""))
      .filter((w) => w.length > 1);

    const matches = productList.filter((p) =>
      keywords.some((kw) => p.productName.includes(kw))
    );

    setRelatedProducts(matches);
  }, [recipe, productList]);

  // 후기 등록
  const submitReview = async () => {
    if (!newRating)
      return Swal.fire("⚠ 필수 입력", "별점을 선택해주세요!", "warning");
    if (newContent.trim().length < 2)
      return Swal.fire("⚠ 필수 입력", "후기 내용을 입력해주세요!", "warning");

    const res = await postRecipeReviewAPI(id, newRating, newContent);
    console.log("res", res);
    if (res.status === 200) {
      Swal.fire("등록 완료", "후기가 등록되었습니다!", "success");

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

  return {
    recipe,
    reviews,
    relatedProducts,
    isLoggedIn,
    newRating,
    newContent,
    setNewRating,
    setNewContent,
    submitReview,
    sortedReviews,
    currentItems,
    currentPage,
    itemsPerPage,
    setCurrentPage,
  };
}
