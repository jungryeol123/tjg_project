// src/ui/Header/components/topbar/TopBar.jsx
import React from "react";
import "./TopBar.scss";

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar__left">AGROMARKET</div>
      <div className="top-bar__right">
        <ul className="top-bar__menu">
          <li>고객센터</li>
          <li>공지사항</li>
          <li>로그인</li>
        </ul>
      </div>
    </div>
  );
}