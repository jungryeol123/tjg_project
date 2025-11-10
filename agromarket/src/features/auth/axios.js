// // src/features/auth/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

// ✅ 로그인 이후 API만 인터셉트
export function setupApiInterceptors() {
  api.interceptors.request.use((config) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo?.accessToken) {
      config.headers.Authorization = `Bearer ${loginInfo.accessToken}`;
    }

    const csrf = document.cookie.split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
    if (csrf) config.headers['X-CSRF-Token'] = csrf;
    
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.post(
            "http://localhost:8080/auth/refresh",
            {},
            { withCredentials: true }
          );
          const newAccessToken = refreshResponse.data.accessToken;
          const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
          loginInfo.accessToken = newAccessToken;
          localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem("loginInfo");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
}
