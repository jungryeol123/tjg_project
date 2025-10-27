// src/ui/Header/components/logoSearch/LogoSearch.jsx
import React, { useState } from "react";
import "./LogoSearch.scss";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동용

export default function LogoSearch() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  // ✅ 검색 버튼 클릭 시 이동
  const handleSearch = () => {
    if (keyword.trim() === "") return; // 빈 입력 방지
    navigate(`/search/${encodeURIComponent(keyword)}`);
  };

  // ✅ Enter 키로도 검색 가능하게
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="middle-search">
      <div className="middle-search__bar">
        <input
          type="text"
          className="middle-search__bar__input"
          placeholder="상품명을 입력하세요..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="middle-search__bar__btn" onClick={handleSearch}>
          검색
        </button>
      </div>

      <div className="etc">
        <span>
          <CiLocationOn />
        </span>
        <span>
          <FaRegHeart />
        </span>
        <span>
          <IoCartOutline />
        </span>
      </div>
    </div>
  );
}
