import React from "react";
import { Link } from "react-router-dom";
import { LuCandy } from "react-icons/lu";
import { useSelector } from "react-redux";
// features
import { api } from "features/auth/axios";
import "./TopBar.scss";

export default function TopBar() {
  const isLogin  = useSelector((state) => state.auth.isLogin);
  const handleLogout = async () => {
    try {
        await api.post("/auth/logout",{},  {withCredentials: true});
        localStorage.removeItem("loginInfo");
        window.location.href = "/";
      } catch (err) {
      }
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Link to="/" className="logo"><LuCandy />Candy</Link>
      </div>

      <div className="top-bar__right">
        <ul className="top-bar__menu">
          <li><Link to="/support">고객센터</Link></li>
          <li><Link to="/notice">공지사항</Link></li>

          {/* 회원가입 */}
          {!isLogin && <li><Link to="/signup">회원가입</Link></li>}
          {/* 로그인 / 로그아웃 */}
          {!isLogin && <li><Link to="/login">로그인</Link></li>}
          {isLogin && <li onClick={handleLogout}>로그아웃</li>}
          {/* 마이페이지 */}
          {isLogin && <li><Link to="/mypage">마이페이지</Link></li>}
          {/* 관리자페이지 */}
          {isLogin && <li><Link to="/admin">관리자페이지</Link></li>}
        </ul>
      </div>
    </div>
  );
}

