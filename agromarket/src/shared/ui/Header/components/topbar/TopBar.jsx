// src/ui/Header/components/topbar/TopBar.jsx
import React from "react";
import "./TopBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { LuCandy } from "react-icons/lu";
import { useDispatch,useSelector } from "react-redux";
import { api } from "features/auth/axios";
import axios from "axios";
import { getLogout } from "features/auth/authAPI";


export default function TopBar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin  = useSelector((state) => state.auth.isLogin);
  
  // const handleLogout = () => {
  //   const succ = dispatch(getLogout());
  //   if(succ === null){
  //     alert("로그아웃 되었습니다.");
  //     navigate("/");
  //   }
  // }

  

 const handleLogout = async () => {
  console.log("🚀 로그아웃 요청 시도");
  try {
    await api.post("/auth/logout",{},  {withCredentials: true});
    localStorage.removeItem("loginInfo");
    // dispatch(getLogout());
    window.location.href = "/";
  } catch (err) {
    console.error("로그아웃 실패:", err);
  }
};




  // return (
  //   <div className="top-bar">
  //     <div className="top-bar__left"><Link to="/" className="logo"><LuCandy />Candy</Link></div>
  //     <div className="top-bar__right">
  //       <ul className="top-bar__menu">
  //         <li><Link to="/support">고객센터</Link></li>
  //         <li><Link to="/notice">공지사항</Link></li>
  //         <li>{ !isLogin &&  <Link to="/signup">회원가입</Link>}
  //         { isLogin && <li></li>}
  //         <li>{ !isLogin && <li></li>}
  //             { isLogin && <Link to = "/mypage">마이페이지</Link>}
  //         </li>
  //         </li>
  //         <li>{ !isLogin &&  <Link to="/login">로그인</Link> }
  //         { isLogin &&<li onClick={handleLogout}>로그아웃</li> }</li>
  //         <li><Link to="/pay">주문</Link></li>
  //         { isLogin &&<li><Link to="/product/add">상품등록</Link></li> }
  //         <li><Link to="/mypage">마이페이지</Link></li>
  //       </ul>
  //     </div>
  //   </div>
  // );

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

        {/* 주문 */}
        <li><Link to="/pay">주문</Link></li>

        {/* 상품등록 (로그인 시만) */}
        {isLogin && <li><Link to="/products/add">상품등록</Link></li>}
        
        {/* 상품편집 (로그인 시만) */}
        {isLogin && <li><Link to="/productList/update">상품 편집</Link></li>}
      </ul>
    </div>
  </div>
);

}

