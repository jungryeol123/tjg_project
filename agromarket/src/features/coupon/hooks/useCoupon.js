// features/coupon/hooks/useCoupon.js
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "shared/lib/axios";
import { parseJwt } from "features/auth/parseJwt";
import { CouponList } from "../components/CouponList";

export function useCoupon() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(null);
  const [issuedCoupons, setIssuedCoupons] = useState([]);

  /** 🔹 1. 로그인 정보에서 userId 가져오기 */
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      setUserId(payload.id);
    }
  }, []);

  /** 🔹 2. 발급된 쿠폰 불러오기 */
  useEffect(() => {
    if (userId) fetchIssuedCoupons();
  }, [userId]);

  const fetchIssuedCoupons = async () => {
    const stored = localStorage.getItem("loginInfo");
    const { accessToken } = JSON.parse(stored);

    try {
      const res = await api.get(`/coupon/user-ids/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setIssuedCoupons(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("사용자 쿠폰 조회 실패:", err);
    }
  };

  /** 🔹 3. 쿠폰 발급 */
  const handleIssueCoupon = async (couponId) => {
    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "⚠ 로그인 필요",
        text: "로그인이 필요합니다!",
      }).then(() => {
        navigate("/login", { state: { from: location.pathname } });
      });
      return;
    }

    if (issuedCoupons.includes(couponId)) {
      Swal.fire({
        icon: "warning",
        title: "⚠ 이미 발급됨",
        text: "이미 받은 쿠폰입니다!",
      });
      return;
    }

    try {
      const stored = localStorage.getItem("loginInfo");
      const { accessToken } = JSON.parse(stored);

      const res = await api.post(
        `/coupon/issue/${couponId}`,
        { userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "✅ 지급 완료",
          text: "쿠폰이 발급되었습니다!",
        });
        setIssuedCoupons((prev) => [...prev, couponId]);
      } else {
        Swal.fire({
          icon: "warning",
          title: "⚠ 지급 불가",
          text: res.data.message || "이미 발급된 쿠폰입니다.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "❌ 오류",
        text: "쿠폰 발급 실패 또는 이미 받은 쿠폰입니다.",
      });
      console.error("쿠폰 발급 실패:", err);
    }
  };

  return {
    CouponList,
    userId,
    issuedCoupons,
    handleIssueCoupon,
  };
}
