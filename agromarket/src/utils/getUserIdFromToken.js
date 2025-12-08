// src/utils/getUserIdFromToken.js

export function getUserIdFromToken() {
  const stored = localStorage.getItem("loginInfo");
  if (!stored) return null;

  try {
    const { accessToken } = JSON.parse(stored);
    const payload = JSON.parse(atob(accessToken.split(".")[1]));

    return payload.id || null;
  } catch (e) {
    console.error("토큰 파싱 실패:", e);
    return null;
  }
}
