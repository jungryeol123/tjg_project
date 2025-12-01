import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// features
import { parseJwt } from "features/auth/parseJwt";
// shared
import { api } from 'shared/lib/axios.js';

export function Coupon() {
  const [userId, setUserId] = useState(null);
  const [issuedCoupons, setIssuedCoupons] = useState([]);
  const navigate = useNavigate();
  // 현재 경로 확인용
  const location = useLocation();

  const couponList = [
    { id: 1, rate: 30 },
    { id: 2, rate: 50 },
    { id: 3, rate: 60 },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);

      setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
    }
  }, []);
  
  useEffect(() => {
    if (userId) {
      fetchIssuedCoupons(userId);
    }
  }, [userId]);

  const fetchIssuedCoupons = async (id) => {
    const stored = localStorage.getItem("loginInfo");
    const { accessToken } = JSON.parse(stored);
    try {
      const res = await api.get(
        `/coupon/user-ids/${id}`,
        { headers : { Authorization : `Bearer ${accessToken}` } }
      );
      setIssuedCoupons(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("사용자 쿠폰 조회 실패:", err);
    }
  };

  const handleIssueCoupon = async (couponId) => {
    // 비로그인시
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: '⚠ 로그인 화면으로',
        text: "로그인이 필요합니다!",
        confirmButtonText: '확인'
      }) // 현재 페이지 경로(location.pathname)를 state에 담아 로그인 페이지로 이동
        .then(() => { navigate("/login", { state: { from: location.pathname } }) });
    } else {
      if (issuedCoupons.includes(couponId)) {
          Swal.fire({
          icon: 'warning',
          title: '⚠ 지급 완료',
          text: "이미 받은 쿠폰입니다!",
          confirmButtonText: '확인'
        });
        return;
      }

      try {
        const stored = localStorage.getItem("loginInfo");
        const { accessToken } = JSON.parse(stored);

        const res = await api.post(
          `http://localhost:8080/coupon/issue/${couponId}`,
          { userId: userId },
          { headers : { Authorization : `Bearer ${accessToken}` }
      });

      if (res.data.status === "success") {
          Swal.fire({
            icon: 'success',
            title: '✅ 지급 완료',
            text: "쿠폰이 발급되었습니다!",
            confirmButtonText: '확인'
          });
          setIssuedCoupons((prev) => [...prev, couponId]);
        } else {
          Swal.fire({
            icon: 'warning',
            title: '⚠ 지급 완료',
            text: res.data.message || "이미 받은 쿠폰입니다.",
            confirmButtonText: '확인'
          });
        }
      } catch (err) {
        Swal.fire({
            icon: 'error',
            title: '❌ 지급 실패',
            text: "쿠폰 발급 실패 또는 이미 받은 쿠폰입니다.",
            confirmButtonText: '확인'
          });
        console.error("쿠폰 발급 실패:", err);
      }
    }
  };

  return (
    <div style={{ fontFamily: "'Pretendard', sans-serif", maxWidth : "1200px" }}>

      {/* 🔥 전체 화면 이미지 */}
      <div
        style={{
          // width: "77.3vw",
          height: "100vh",
          backgroundImage: "url('/images/popupimage/coupon_image3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 🔽 이미지 아래 쿠폰 리스트 */}
      <div style={{ textAlign: "center", padding: "30px 0" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {couponList.map((coupon) => (
            <li key={coupon.id} style={{ marginBottom: "20px" }}>
              <button
                onClick={() => handleIssueCoupon(coupon.id)}
                disabled={!userId || issuedCoupons.includes(coupon.id)}
                style={{
                    padding: "12px 25px",
                    fontSize: "18px",
                    borderRadius: "8px",
                    cursor: issuedCoupons.includes(coupon.id) ? "not-allowed" : "pointer",
                    width: "200px",
                    border: "none",
                    fontWeight: "bold",
                    backgroundColor: issuedCoupons.includes(coupon.id)
                    ? "#c5c5c5"              
                    : "#4949b1ff",           
                    color: "#fff",
                    transition: "0.2s ease",
                }}
                onMouseOver={(e) => {
                    if (!issuedCoupons.includes(coupon.id)) {
                    e.currentTarget.style.backgroundColor = "#3a3a98";
                    }
                }}
                onMouseOut={(e) => {
                    if (!issuedCoupons.includes(coupon.id)) {
                    e.currentTarget.style.backgroundColor = "#4949b1ff"; 
                    }
                }}
                >
                {issuedCoupons.includes(coupon.id)
                    ? "이미 발급됨"
                    : `${coupon.rate}% 쿠폰 받기`}
                </button>

            </li>
          ))}
        </ul>

        {!userId && (
          <p style={{ color: "red" }}>로그인 후 쿠폰을 받을 수 있습니다.</p>
        )}
      </div>
    </div>
  );
}