// src/ui/Header/components/logoSearch/LogoSearch.jsx
import React from "react";
import "./LogoSearch.scss";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
export default function LogoSearch() {
  return (
    <div className="middle-search">
      <div className="middle-search__bar">
        <input
          type="text"
          className="middle-search__bar__input"
          placeholder="상품명을 입력하세요..."
        />
        <button className="middle-search__bar__btn">검색</button>
      </div>
      <div className="etc">
        <span><CiLocationOn /></span>
        <span><FaRegHeart /></span>
        <span><IoCartOutline /></span>
        </div>
    </div>
  );
}
