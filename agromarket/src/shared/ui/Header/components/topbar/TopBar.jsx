// src/ui/Header/components/topbar/TopBar.jsx
import React from "react";
import "./TopBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { LuCandy } from "react-icons/lu";
import { useDispatch,useSelector } from "react-redux";
import { getLogout } from "features/auth/authAPI";
export default function TopBar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin  = useSelector((state) => state.auth.isLogin);
  
  const handleLogout = () => {
    const succ = dispatch(getLogout());
    if(succ === null){
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  }



  return (
    <div className="top-bar">
      <div className="top-bar__left"><Link to="/" className="logo"><LuCandy />Candy</Link></div>
      <div className="top-bar__right">
        <ul className="top-bar__menu">
          <li><Link to="/support">고객센터</Link></li>
          <li><Link to="/notice">공지사항</Link></li>
          <li>{ !isLogin &&  <Link to="/signup">회원가입</Link>}
          { isLogin && <li></li>}
          <li>{ !isLogin && <li></li>}
              { isLogin && <Link to = "/mypage">마이페이지</Link>}
          </li>
          </li>
          <li>{ !isLogin &&  <Link to="/login">로그인</Link> }
          { isLogin &&<li onClick={handleLogout}>로그아웃</li> }</li>
          <li><Link to="/pay">주문</Link></li>
        </ul>
      </div>
    </div>
  );
}

