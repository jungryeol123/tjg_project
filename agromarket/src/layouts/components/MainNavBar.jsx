// src/ui/Header/components/mainNav/MainNavBar.jsx
import React from "react";
import "./MainNavBar.scss";
import { FiMenu } from "react-icons/fi"; // 햄버거 메뉴 아이콘 (react-icons 설치 필요)

export function MainNavBar() {
  return (
    <nav className="main-nav">
      <div className="main-nav__inner">
        <ul className="main-nav__list">
          <li className="main-nav__item main-nav__item--menu">
            <FiMenu size={18} />
            <span>전체카테고리</span>
          </li>
          <li className="main-nav__item">농산물</li>
          <li className="main-nav__item">축산물</li>
          <li className="main-nav__item">수산물</li>
          <li className="main-nav__item">가공품</li>
        </ul>
        <ul className="main-nav__right">
          <li>한국가격 정보공개</li>
          <li>브랜드샵</li>
        </ul>
      </div>
    </nav>
  );
}
