import { login, logout, socialLogin } from "./authSlice.js";
import { setCartItem, getCartCount } from "../cart/cartSlice.js"
// features
import { parseJwt } from "features/auth/parseJwt";
// utils
import { api, setupApiInterceptors } from "shared/lib/axios.js";

export const getLogin = (formData, param) => async (dispatch) => {
  const { userId, password } = formData;

  try {
    // ✅ 1. 로그인 전에 CSRF 토큰 먼저 요청
    const res = await api.post("/auth/login", { userId, password });
    const accessToken = res.data.accessToken;
    const role = res.data.role;
    if (accessToken) {
      dispatch(login({ provider: "local", accessToken, role }));
      // 토큰정보 취득
      const payload = parseJwt(accessToken);

      // 장바구니 리스트 설정
      const url = "/cart/cartList";
      const cartItem = { "user": { "id": payload.id } };

      // 장바구니 리스트 취득
      const cartData = await api.post(url, cartItem);
      // 장바구니 리스트 설정
      dispatch(setCartItem({ "cartItem": cartData.data }));
      // 장바구니 카운트 설정
      dispatch(getCartCount());

      return true;
    }
  } catch (err) {
    console.error("로그인 실패:", err);
    param.setErrors({
      ...param.errors,
      password: "아이디 또는 비밀번호를 확인해주세요.",
    });
    return false;
  }
};

/**
    id중복 체크
*/
export const getCheckId = async (name, value) => {
  const data = { [name]: value };
  const url = "/member/idcheck";
  const result = await api.post(url, data);
  return result;
};

/**
    signup
*/
export const getSignup = async (formData) => {
  const url = "/member/signup";
  return await api.post(url, formData);
};

/**
    login
*/
export const getLogout = () => async (dispatch) => {
  dispatch(logout());
  const url = "/auth/logout"
  api.post(url, {});
  return false;
};

export const socialApiLogin = (provider, id, accessToken) => (dispatch) => {
  dispatch(socialLogin({ provider, id, accessToken }));
  // ✅ 소셜 로그인도 인터셉터 활성화
  setupApiInterceptors();
};
