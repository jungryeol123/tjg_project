import React from "react";
import "./CategoryNav.scss";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function CategoryNav() {
  return (
    <nav className="category-nav">
      <ul className="category-nav__list">
        <li className="category-first"><FiMenu /><span>카테고리</span></li>
        <li>
          <ul>
            <li><Link to="/products/new">신상품</Link></li>
            <li><Link to="/products/best">베스트</Link></li>
            <li><Link to="/products/sale">알뜰쇼핑</Link></li>
            <li><Link to="/products/deal">특가/혜택</Link></li>
          </ul>
        </li>
        <li className="category-last"><Link to="/delivery">샛별/하루 배송안내</Link></li>
      </ul>
    </nav>
  );
}