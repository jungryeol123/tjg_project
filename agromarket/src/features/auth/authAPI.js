import { login, logout, socialLogin } from "./authSlice.js";
import { validateFormCheck, validateSignupFormCheck } from "./validate.js";
import { axiosPost } from "./dataFetch.js";
import api, { setupApiInterceptors } from "./axios.js";
import { setCartItem, getCartCount } from "../cart/cartSlice.js"
import axios from "axios";

const plainAxios = axios.create({
  baseURL: "http://localhost:8080",
});

export const getLogin = (formData, param) => async (dispatch) => {
  const { userId, password } = formData;

  try {
    const res = await plainAxios.post("/auth/login", { userId, password });
    const accessToken = res.data.accessToken;

    if (accessToken) {
      dispatch(login({ provider: "local", accessToken }));

      // // 장바구니 리스트 설정
	    // const url = "/cart/cartList";
	    // const cartItem = { "user" : {"id":id} };
	    // const cartData = await axiosPost(url, cartItem);
	    // dispatch(setCartItem({"cartItem": cartData}));
	    // dispatch(getCartCount());

      // ✅ 이제부터 인터셉터 활성화
      setupApiInterceptors();


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

// export const getLogin = (formData, param) => async (dispatch) => {
//   const { userId, password } = formData;

//   try {
//     // ✅ 1. 백엔드에 로그인 요청
//     const res = await api.post("/auth/login", {
//       userId: userId,
//       password: password,
//     });

//     // ✅ 2. AccessToken 받기
//     const accessToken = res.data.accessToken;
//     console.log("로그인 성공 → accessToken:", accessToken);
//     if (accessToken) {
//       // ✅ 3. Redux 상태 업데이트
//       dispatch(login({provider : "local", "accessToken" : accessToken }));

//       return true;
//     }
//   } catch (err) {
//     console.error("로그인 실패:", err);
//     param.setErrors({
//       ...param.errors,
//       password: "아이디 또는 비밀번호를 확인해주세요.",
//     });
//     return false;
//   }
// };

/**
    id중복 체크
*/
export const getIdCheck = (id) => async (dispatch) => {
  const data = { id: id };
  const url = "/member/idcheck";
  const result = await axiosPost(url, data);
  return result;
};

/**
    signup
*/
export const getSignup = (formData, param) => async (dispatch) => {
  let result = null;
  if (validateSignupFormCheck(param)) {
    const url = "/member/signup";
    result = await axiosPost(url, formData);
  }
  return result;
};

/**
    login
*/
export const getLogout = () => async (dispatch) => {
  dispatch(logout());
  return true;
};

export const socialApiLogin = (provider, id, accessToken) => (dispatch) => {
  dispatch(socialLogin({ provider, id, accessToken }));
  // ✅ 소셜 로그인도 인터셉터 활성화
  setupApiInterceptors();
};
