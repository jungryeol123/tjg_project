import React from "react";
import { useNavigate } from "react-router-dom";
import { SubCategory } from "features/category/components/SubCategory.jsx";

export function MainCategory({ main }) {
  const navigate = useNavigate();

  const goMain = () => {
    navigate(`/category/${encodeURIComponent(main.name)}`, {
      state: { type: "main", id: main.id },
    });
  };

  return (
    <li className="main-category-item" onClick={goMain}>
      {main.name}

      {main.subCategories?.length > 0 && (
        <ul className="sub-category-list">
          {main.subCategories.map((sub) => (
            <SubCategory key={sub.id} sub={sub} />
          ))}
        </ul>
      )}
    </li>
  );
}
