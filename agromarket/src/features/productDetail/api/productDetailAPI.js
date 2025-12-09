// features/productDetail/api/productDetailAPI.js
import { api } from "shared/lib/axios";

// 상품 상세 요청
export const getProductDetail = async (id) => {
  const data = await api.get(`/product/${id}`);
  return data;
};

// 조회 로그 남기기
export const saveViewLog = async (payload) => {
  return api.post("/view/log", payload);
};
