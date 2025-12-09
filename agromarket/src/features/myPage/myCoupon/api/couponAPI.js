// features/coupon/api/couponAPI.js
import { api } from "shared/lib/axios";

export const couponAPI = {
  getMyCoupons: (userId) => api.get(`/coupon/my/${userId}`),

  deleteCoupon: (userId, couponId) =>
    api.delete(`/coupon/deleteCoupon/${userId}/${couponId}`),
};
