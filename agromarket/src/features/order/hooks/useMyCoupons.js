import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { api } from "shared/lib/axios";

export function useMyCoupons(userId) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchCoupons = async () => {
      try {
        const res = await api.get(`/coupon/my/${userId}`);
        setCoupons(res.data.filter((c) => !c.isUsed));
      } catch (err) {
        console.error("쿠폰 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [userId]);

  const deleteCoupon = async (couponId) => {
    try {
      await api.delete(`/coupon/deleteCoupon/${userId}/${couponId}`);

      Swal.fire({ icon: "success", title: "쿠폰 삭제" });

      setCoupons((prev) =>
        prev.filter((c) => c.coupon.couponId !== couponId)
      );
    } catch {
      Swal.fire({ icon: "error", title: "삭제 실패" });
    }
  };

  return { coupons, loading, deleteCoupon };
}
