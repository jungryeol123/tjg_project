import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동용
import { IoCartOutline } from "react-icons/io5";
import "./LogoSearch.scss";

export default function LogoSearch() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  // 장바구니 카운트 갯수
  const cartCount = useSelector( state => state.cart.cartCount );

  // ✅ 검색 버튼 클릭 시 이동
  const handleSearch = () => {
    // 빈 입력 방지
    if (keyword.trim() !== "") {
      navigate(`/search/${encodeURIComponent(keyword)}`);
    }
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
        <span className="etc__cart-link">
          <Link to="/cart"><IoCartOutline /></Link>
          <span className="etc__cart-count">{cartCount}</span>
        </span>
      </div>
    </div>
  );
}
