import React from "react";
import { useSelector } from "react-redux";
import { MainCategory } from "features/category/components/MainCategory.jsx";

export function CategoryMenu() {
  const categoryList = useSelector((state) => state.category.categoryList);

  return (
    
    <ul className="main-category-list">
      
      {categoryList.map((main) => (
        <MainCategory key={main.id} main={main} />
      ))}
    </ul>
  );
}
