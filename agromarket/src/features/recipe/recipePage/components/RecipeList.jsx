import React from "react";
import { RecipeCard } from "./RecipeCard";

export function RecipeList({ recipeList }) {
  return (
    <div className="recipe-grid">
      {recipeList.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
