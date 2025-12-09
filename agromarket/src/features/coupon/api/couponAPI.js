// features/coupon/api/couponAPI.js
import { api } from "shared/lib/axios";

export const couponAPI = {
  getCouponList: () => api.get("/coupon/couponList"),

  getIssuedCoupons: (userId, accessToken) =>
    api.get(`/coupon/user-ids/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  issueCoupon: (couponId, userId, accessToken) =>
    api.post(
      `/coupon/issue/${couponId}`,
      { userId },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    ),
};
