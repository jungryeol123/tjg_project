import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// utils
import { getRecipeListAPI } from "utils/recipeAPI";
// sub
import "./RecipePage.scss";
import Sidebar from "features/recipe/Sidebar";

export default function RecipePage() {
  const [selectedSub, setSelectedSub] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedSub) return;

    const fetch = async () => {
      const result = await getRecipeListAPI(selectedSub);
      setRecipeList(result);
    };

    fetch();
  }, [selectedSub]);

  return (
    <div style={{ display: "flex" }}>
      
      {/* 왼쪽 카테고리 */}
      <Sidebar
        onSelectCategory={(mainId, subId) => {
          setSelectedSub(subId);
        }}
      />

      {/* 오른쪽 레시피 목록 */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>레시피</h2>

        <div className="recipe-grid">
          {recipeList.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => navigate(`/recipe/${recipe.id}`)}  // 🔥 클릭 시 이동
            >
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="recipe-img"
              />

              <div className="recipe-title">{recipe.title}</div>
              <div className="recipe-summary">{recipe.summary}</div>

              <div className="recipe-time">
                ⏱ {recipe.cookTime}분 완성
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
