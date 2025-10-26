// src/ui/Header/components/topbar/TopBar.jsx
import React from "react";
import "./TopBar.scss";
import { Link } from "react-router-dom";
import { LuCandy } from "react-icons/lu";
export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar__left"><Link to="/" className="logo"><LuCandy />Candy</Link></div>
      <div className="top-bar__right">
        <ul className="top-bar__menu">
          <li><Link to="/support">고객센터</Link></li>
          <li><Link to="/notice">공지사항</Link></li>
          <li><Link to="/signup">회원가입</Link></li>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/pay">주문</Link></li>
        </ul>
      </div>
    </div>
  );
}