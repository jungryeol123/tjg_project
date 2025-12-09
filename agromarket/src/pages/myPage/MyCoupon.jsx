// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";
// // features
// import { parseJwt } from "features/auth/parseJwt";
// // shared
// import { api } from 'shared/lib/axios.js';
// import './MyPage.css'
// import '../administration/AdminLayout.scss'


// export function MyCoupon () {
//     const [coupons, setCoupons] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userId, setUserId] = useState(null);

//      /** 🔹 로그인 ID 읽기 */
//   useEffect(() => {
//       const stored = localStorage.getItem("loginInfo");
//       if (stored) {
//         const { accessToken } = JSON.parse(stored);
//         const payload = parseJwt(accessToken);
  
//         setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
//       }
  
//     }, []);
//     /** 🔹 쿠폰 목록 조회 */
//       useEffect(() => {
//         if (!userId) return;
    
//         const fetchCoupons = async () => {
//           try {
//             const res = await api.get(`/coupon/my/${userId}`);
//             const couponList = res.data.filter(item => item.isUsed === false);
//             setCoupons(Array.isArray(couponList) ? couponList : []);
//           } catch (err) {
//             console.error("쿠폰 조회 실패:", err);
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchCoupons();
//       }, [userId]);

//       /** 🔹 쿠폰 삭제 기능 */
//         const handleDeleteCoupon = async (couponId) => {
//           try {
//             const res = await api.delete(
//               `/coupon/deleteCoupon/${userId}/${couponId}`
//             );
      
//             if (res.status === 200) {
//               Swal.fire({
//                       icon: 'success',
//                       title: '✅삭제 완료',
//                       text: "쿠폰이 삭제 되었습니다.",
//                       confirmButtonText: '확인'
//                     });;
      
//               // 🔄 화면에서도 즉시 삭제
//               setCoupons(coupons.filter((c) => c.coupon.couponId !== couponId));
//             }
//           } catch (err) {
//             Swal.fire({
//                     icon: 'error',
//                     title: '⚠ 삭제 실패',
//                     text: "쿠폰 삭제에 실패했습니다.",
//                     confirmButtonText: '확인'
//                   });;
//           }
//         };

//     return (
//         <div className="mypage-container">
//         {/* 받은 쿠폰 목록 */}
//       <div>
//         <h2 className="mypage-title">🎟️ 받은 쿠폰</h2>

//         {coupons.length === 0 ? (
//           <p>받은 쿠폰이 없습니다.</p>
//         ) : (
//           <ul className="mypage-couponList">
          
//             { coupons.map((c) => (
//               <li key={c.id} className="mypage-couponItem">
//                 <span>
//                   <b>{c.coupon.couponDcRate}% 할인 쿠폰</b> — 수량: {c.qty}
//                 </span>
//                 <button
//                   className="mypage-deleteBtn"
//                   onClick={() => handleDeleteCoupon(c.coupon.couponId)}
//                 >
//                   삭제
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//         </div>
//     );
// }



// pages/myPage/MyCouponPage.jsx

import './MyPage.css';
import '../administration/AdminLayout.scss';
import { useMyCoupon } from 'features/myPage/useMyCoupon';
import { MyCouponList } from 'features/myPage/MyCouponList';

export function MyCoupon() {
  const { userId, coupons, loading, deleteCoupon } = useMyCoupon();

  if (!userId) {
    return <p>로그인 후 이용해주세요.</p>;
  }

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">🎟️ 받은 쿠폰</h2>

      <MyCouponList
        coupons={coupons}
        onDelete={deleteCoupon}
      />
    </div>
  );
}
