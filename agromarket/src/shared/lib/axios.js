import axios from "axios";

export const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

export function setupApiInterceptors() {
  api.interceptors.request.use((config) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo?.accessToken) {
      config.headers.Authorization = `Bearer ${loginInfo.accessToken}`;
    }

    const csrf = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    if (csrf) config.headers["X-XSRF-TOKEN"] = csrf;
    return config;
  });

  let isRefreshing = false;
  let refreshSubscribers = [];

  // ✅ 여러 요청이 동시에 401일 때, refresh 완료 후 재시도하도록 큐잉
  const onRefreshed = (newAccessToken) => {
    refreshSubscribers.forEach((cb) => cb(newAccessToken));
    refreshSubscribers = [];
  };

  const addSubscriber = (cb) => {
    refreshSubscribers.push(cb);
  };

 api.interceptors.response.use(
  (res) => res, async (error) => {
    const originalRequest = error.config;

    // 로그인 요청일 경우 refresh 무시
    if (originalRequest.url === "/auth/login") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newAccessToken) => {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(api(originalRequest)); // ✅ refresh 끝난 뒤 재요청
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/auth/refresh", {}, { withCredentials: true });
        const newAccessToken = refreshResponse.data.accessToken;

        if (!newAccessToken) throw new Error("No accessToken returned");

        const loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
        loginInfo.accessToken = newAccessToken;
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        onRefreshed(newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // ✅ 재요청 응답 반환
      } catch (err) {
        console.error("❌ Refresh failed:", err);
        isRefreshing = false;

        localStorage.removeItem("loginInfo");
        window.location.href = "/login";
        return Promise.reject(err); // ❗ 여긴 reject 유지해야 함
      }
    }

    // ✅ 나머지는 reject 유지
    return Promise.reject(error);
  });
}