// src/features/coupon/hooks/useCoupon.js
import { useEffect, useState } from "react";
import { parseJwt } from "features/auth/parseJwt";
import { fetchUserCoupons, issueCoupon } from "../api/couponApi";
import Swal from "sweetalert2";

export function useCoupon(navigate, location) {
  const [userId, setUserId] = useState(null);
  const [issuedCoupons, setIssuedCoupons] = useState([]);

  // 로그인 정보에서 userId 추출
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      setUserId(payload.id);
    }
  }, []);

  // 이미 발급된 쿠폰 불러오기
  useEffect(() => {
    if (!userId) return;

    const stored = localStorage.getItem("loginInfo");
    const { accessToken } = JSON.parse(stored);

    fetchUserCoupons(userId, accessToken)
      .then((res) => {
        setIssuedCoupons(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("쿠폰 조회 실패:", err));
  }, [userId]);

  // 쿠폰 발급 로직
  const handleIssue = async (couponId) => {
    if (!userId) {
      return Swal.fire({
        icon: "warning",
        title: "⚠ 로그인 필요",
        text: "로그인이 필요합니다!",
      }).then(() =>
        navigate("/login", { state: { from: location.pathname } })
      );
    }

    if (issuedCoupons.includes(couponId)) {
      return Swal.fire({
        icon: "warning",
        title: "⚠ 이미 발급됨",
        text: "이미 받은 쿠폰입니다!",
      });
    }

    try {
      const stored = localStorage.getItem("loginInfo");
      const { accessToken } = JSON.parse(stored);

      const res = await issueCoupon(couponId, userId, accessToken);

      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "쿠폰 발급 완료",
        });
        setIssuedCoupons((prev) => [...prev, couponId]);
      } else {
        Swal.fire({
          icon: "warning",
          title: "⚠ 이미 발급됨",
          text: res.data.message || "이미 받은 쿠폰입니다.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "❌ 발급 실패",
        text: "쿠폰 발급 중 오류가 발생했습니다.",
      });
    }
  };

  return { userId, issuedCoupons, handleIssue };
}
