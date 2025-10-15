import React from "react";
import "./CategoryNav.scss";

export default function CategoryNav() {
  return (
    <nav className="category-nav">
      <ul className="category-nav__list">
        <li>채소류</li>
        <li>과일류</li>
        <li>축산물</li>
        <li>수산물</li>
        <li>가공식품</li>
      </ul>
    </nav>
  );
}