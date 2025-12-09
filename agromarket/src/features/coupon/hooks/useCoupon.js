// features/coupon/hooks/useCoupon.js
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { parseJwt } from "features/auth/parseJwt";
import { couponAPI } from "../api/couponAPI";
import { useNavigate, useLocation } from "react-router-dom";

export function useCoupon() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(null);
  const [couponList, setCouponList] = useState([]);
  const [issuedCoupons, setIssuedCoupons] = useState([]);

  // 로그인한 사용자 토큰에서 userId 추출
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      setUserId(payload.id);
    }
  }, []);

  // 전체 쿠폰 불러오기
  useEffect(() => {
    const fetchCoupons = async () => {
      const res = await couponAPI.getCouponList();
      setCouponList(res.data);
    };
    fetchCoupons();
  }, []);

  // 발급된 쿠폰 조회
  useEffect(() => {
    if (!userId) return;
    const fetchIssued = async () => {
      const stored = localStorage.getItem("loginInfo");
      const { accessToken } = JSON.parse(stored);

      try {
        const res = await couponAPI.getIssuedCoupons(userId, accessToken);
        setIssuedCoupons(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("발급된 쿠폰 조회 오류:", err);
      }
    };

    fetchIssued();
  }, [userId]);

  // 쿠폰 발급
  const issueCoupon = async (couponId) => {
    if (!userId) {
      return Swal.fire({
        icon: "warning",
        title: "로그인이 필요합니다",
      }).then(() => {
        navigate("/login", { state: { from: location.pathname } });
      });
    }

    if (issuedCoupons.includes(couponId)) {
      return Swal.fire({
        icon: "warning",
        title: "이미 발급된 쿠폰입니다",
      });
    }

    try {
      const stored = localStorage.getItem("loginInfo");
      const { accessToken } = JSON.parse(stored);

      const res = await couponAPI.issueCoupon(couponId, userId, accessToken);

      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "쿠폰 발급 완료!",
        });

        setIssuedCoupons((prev) => [...prev, couponId]);
      } else {
        Swal.fire({
          icon: "warning",
          title: res.data.message || "이미 발급된 쿠폰입니다",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "쿠폰 발급 실패",
      });
    }
  };

  return {
    userId,
    couponList,
    issuedCoupons,
    issueCoupon,
  };
}
