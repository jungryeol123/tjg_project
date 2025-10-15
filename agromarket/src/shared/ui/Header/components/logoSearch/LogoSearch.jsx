// src/ui/Header/components/logoSearch/LogoSearch.jsx
import React from "react";
import "./LogoSearch.scss";

export default function LogoSearch() {
  return (
    <div className="logo-search">
      <h1 className="logo-search__logo">🌾 AgroMarket</h1>
      <div className="logo-search__bar">
        <input
          type="text"
          className="logo-search__input"
          placeholder="상품명을 입력하세요..."
        />
        <button className="logo-search__btn">검색</button>
      </div>
    </div>
  );
}
