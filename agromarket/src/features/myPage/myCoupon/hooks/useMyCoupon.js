// features/coupon/hooks/useMyCoupon.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { parseJwt } from "features/auth/parseJwt";
import { couponAPI } from "../api/couponAPI";

export function useMyCoupon() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  /** 🔹 로그인 ID 읽기 */
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      setUserId(payload.id);
    }
  }, []);

  /** 🔹 쿠폰 목록 조회 */
  useEffect(() => {
    if (!userId) return;

    const fetchCoupons = async () => {
      try {
        const res = await couponAPI.getMyCoupons(userId);

        const availableCoupons = res.data.filter(
          (item) => item.isUsed === false
        );

        setCoupons(Array.isArray(availableCoupons) ? availableCoupons : []);
      } catch (err) {
        console.error("쿠폰 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [userId]);

  /** 🔹 쿠폰 삭제 기능 */
  const deleteCoupon = async (couponId) => {
    try {
      const res = await couponAPI.deleteCoupon(userId, couponId);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "삭제 완료",
          text: "쿠폰이 삭제되었습니다.",
        });

        setCoupons((prev) =>
          prev.filter((item) => item.coupon.couponId !== couponId)
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text: "쿠폰 삭제에 실패했습니다.",
      });
    }
  };

  return {
    userId,
    coupons,
    loading,
    deleteCoupon,
  };
}
