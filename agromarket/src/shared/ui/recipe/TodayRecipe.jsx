import React, { useEffect, useState } from "react";
import { axiosGet } from "shared/lib/axiosInstance";
import "./TodayRecipe.scss";

export default function TodayRecipe({ limit = 10 }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosGet(`/recipes/today?limit=${limit}`);
      setRecipes(res);
    };
    fetchData();
  }, [limit]);

  return (
    <section className="today-recipe-section">
      <h2 className="title">오늘은 뭐 먹을까?</h2>

      <div className="recipe-list">
        {recipes.map((r) => (
          <div className="recipe-card" key={r.id}>
            <img src={`/images/recipe/${r.thumbnail}`} alt={r.recipeName} />
            <h3>{r.recipeName}</h3>
            <p>{r.time}분 · {r.difficulty}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
