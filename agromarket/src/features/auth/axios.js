// // // src/features/auth/axios.js
// import axios from "axios";

// export const api = axios.create({
//   baseURL: "/",
//   withCredentials: true,
// });

// // ✅ 로그인 이후 API만 인터셉트
// export function setupApiInterceptors() {
//   api.interceptors.request.use((config) => {
//     const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
//     if (loginInfo?.accessToken) {
//       config.headers.Authorization = `Bearer ${loginInfo.accessToken}`;
//     }
//     console.log("Authorization", loginInfo.accessToken);
//     const csrf = document.cookie.split('; ')
//       .find(row => row.startsWith('XSRF-TOKEN='))
//       ?.split('=')[1];
//     if (csrf) config.headers['X-XSRF-Token'] = csrf;
    
//     return config;
//   });

//   // api.interceptors.response.use(
//   //   (res) => res,
//   //   async (error) => {
//   //     const originalRequest = error.config;
//   //     if (error.response?.status === 401 && !originalRequest._retry) {
//   //       originalRequest._retry = true;
//   //       try {
//   //         const refreshResponse = await axios.post(
//   //           "/auth/refresh",
//   //           {},
//   //           { withCredentials: true }
//   //         );
//   //         const newAccessToken = refreshResponse.data.accessToken;
//   //         const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
//   //         loginInfo.accessToken = newAccessToken;
//   //         localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
//   //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//   //         return api(originalRequest);
//   //       } catch (err) {
//   //         console.error("err", err);
//   //         // localStorage.removeItem("loginInfo");
//   //         // window.location.href = "/login";
//   //       }
//   //     }
//   //     return Promise.reject(error);
//   //   }
//   // );


//   api.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//       const originalRequest = error.config;

//       // ✅ AccessToken 만료 시 refresh 요청
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         try {
//           const refreshResponse = await api.post(
//             "/auth/refresh",
//             {},
//             { withCredentials: true }
//           );

//           const newAccessToken = refreshResponse.data.accessToken;
//           if (!newAccessToken) {
//             throw new Error("No accessToken returned from refresh");
//           }

//           // ✅ localStorage 업데이트
//           const loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
//           loginInfo.accessToken = newAccessToken;
//           localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

//           // ✅ axios 기본 헤더에도 반영 (이거 없으면 다음 요청 또 401)
//           api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//           // ✅ 실패했던 요청 재시도
//           return api(originalRequest);
//         } catch (err) {
//           console.error("❌ Token refresh failed:", err);
//           localStorage.removeItem("loginInfo");
//           // window.location.href = "/login";
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
// }

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
    if (csrf) config.headers["X-XSRF-Token"] = csrf;

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

  // api.interceptors.response.use(
  //   (res) => res,
  //   async (error) => {
  //     const originalRequest = error.config;

  //     // AccessToken 만료 감지
  //     if (error.response?.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;

  //       // 이미 refresh 중이라면 기다렸다가 새 토큰으로 재시도
  //       if (isRefreshing) {
  //         return new Promise((resolve) => {
  //           addSubscriber((newAccessToken) => {
  //             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  //             resolve(api(originalRequest));
  //           });
  //         });
  //       }

  //       isRefreshing = true;

  //       try {
  //         const refreshResponse = await api.post("/auth/refresh", {}, { withCredentials: true });
  //         const newAccessToken = refreshResponse.data.accessToken;

  //         if (!newAccessToken) throw new Error("No accessToken returned");

  //         // 로컬스토리지 갱신
  //         const loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
  //         loginInfo.accessToken = newAccessToken;
  //         localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

  //         // 기본 헤더 갱신
  //         api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

  //         // refresh 기다리던 요청들 처리
  //         onRefreshed(newAccessToken);
  //         isRefreshing = false;

  //         // 실패했던 요청 재시도
  //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  //         return api(originalRequest);
  //       } catch (err) {
  //         console.error("❌ Refresh failed:", err);
  //         isRefreshing = false;

  //         // refresh 자체 실패 → 강제 로그아웃
  //         localStorage.removeItem("loginInfo");
  //         window.location.href = "/login";
  //         return Promise.reject(err);
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

 api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

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
  }
);


}
