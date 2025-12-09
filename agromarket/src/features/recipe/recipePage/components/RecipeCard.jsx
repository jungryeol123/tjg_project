import React from "react";
import { useNavigate } from "react-router-dom";

export function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="recipe-img"
      />

      <div className="recipe-title">{recipe.title}</div>
      <div className="recipe-summary">{recipe.summary}</div>

      <div className="recipe-time">⏱ {recipe.cookTime}분 완성</div>
    </div>
  );
}
