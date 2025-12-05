import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// features
import { parseJwt } from "features/auth/parseJwt";
// import { addCart } from "features/cart/cartAPI.js";
// shared
// import { api } from 'shared/lib/axios.js';
import './MyPage.css'
import '../administration/AdminLayout.scss'
import { Link,Outlet } from "react-router-dom";
// import { MyOrders } from "./MyOrders";
// import { MyCoupon } from "./MyCoupon";
// import { UpdateUserDetail } from "./UpdateUserDetail";

export function MyPage() {
  
  const [userId, setUserId] = useState(null);

  
  
  
  /** 🔹 로그인 ID 읽기 */
  useEffect(() => {
      const stored = localStorage.getItem("loginInfo");
      if (stored) {
        const { accessToken } = JSON.parse(stored);
        const payload = parseJwt(accessToken);
  
        setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
      }
  
    }, []);

  return (
    <>
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="admin-title">마이페이지 메뉴</h2>

        <nav className="admin-nav">
          <Link to="/mypage/update">개인정보수정</Link>
          <Link to="/mypage/myorders">주문 내역</Link>
          <Link to="/mypage/mycoupon">쿠폰함</Link>
          
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
        {/* <UpdateUserDetail/> */}
      </main>
    </div>
   
    </>
  );
}