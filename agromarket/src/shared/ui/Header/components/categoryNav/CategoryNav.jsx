import React from "react";
import "./CategoryNav.scss";
import { FiMenu } from "react-icons/fi";
export default function CategoryNav() {
  return (
    <nav className="category-nav">
      <ul className="category-nav__list">
        <li className="category-first"><FiMenu /><span>카테고리</span></li>
        <li>
          <ul>
            <li>신상품</li>
            <li>베스트</li>
            <li>알뜰쇼핑</li>
            <li>특가/혜택</li>
          </ul>
        </li>
        <li className="category-last">샛별/하루 배송안내</li>
      </ul>
    </nav>
  );
}