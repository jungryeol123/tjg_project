import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // ✅ 쿠키 자동 전송 (refresh_token 포함)
});

// ✅ 요청 전 AccessToken 자동 추가
api.interceptors.request.use((config) => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  if (loginInfo?.accessToken) {
    config.headers.Authorization = `Bearer ${loginInfo.accessToken}`;
  }
  return config;
});

// ✅ 응답 에러 시 AccessToken 재발급
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 401 → AccessToken 만료 시 refresh 요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "http://localhost:8080/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;

        // localStorage 업데이트
        const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        loginInfo.accessToken = newAccessToken;
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

        // 헤더 갱신 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
        localStorage.removeItem("loginInfo");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
