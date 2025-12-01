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

  const onRefreshed = (newAccessToken) => {
    refreshSubscribers.forEach((cb) => cb(newAccessToken));
    refreshSubscribers = [];
  };

  const addSubscriber = (cb) => {
    refreshSubscribers.push(cb);
  };

  api.interceptors.response.use(
    // ✅ 성공 응답은 무조건 data 리턴
    (res) => res.data,

    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            addSubscriber((newAccessToken) => {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const refreshResponse = await api.post("/auth/refresh", {}, { withCredentials: true });
          const newAccessToken = refreshResponse.accessToken; // 🔥 .data가 자동 적용됐기 때문에 이렇게 사용함
          if (!newAccessToken) throw new Error("No accessToken returned");

          const loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
          loginInfo.accessToken = newAccessToken;
          localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

          api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          onRefreshed(newAccessToken);
          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);

        } catch (err) {
          console.error("❌ Refresh failed:", err);
          isRefreshing = false;
          localStorage.removeItem("loginInfo");
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
}
