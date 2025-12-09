
import React from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CategoryMenu } from "features/category/components/CategoryMenu.jsx";
import "./CategoryNav.scss";

export default function CategoryNav() {
  return (
    <nav className="category-nav">
      <ul className="category-nav__list">
        {/* 카테고리 전체 메뉴 */}
        <li className="category-first">
          <FiMenu /><span>카테고리</span>
          <CategoryMenu />
        </li>

        {/* 상단 네비 메뉴 */}
        <li>
          <ul>
            <li><Link to="/productList/new">신상품</Link></li>
            <li><Link to="/productList/best">베스트</Link></li>
            <li><Link to="/productList/sale">알뜰쇼핑</Link></li>
            <li><Link to="/productList/deal">특가/혜택</Link></li>
            <li><Link to="/recipe">레시피</Link></li>
          </ul>
        </li>

        <li className="category-last">
          <Link to="/delivery">샛별/하루 배송안내</Link>
        </li>
      </ul>
    </nav>
  );
}
