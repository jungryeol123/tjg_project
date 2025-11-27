export function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1]; // payload 부분 추출
    const payload = atob(base64Payload); // base64 → 문자열 디코딩
    
    return JSON.parse(payload); // JSON 파싱
  } catch (error) {
    console.error("JWT 파싱 오류:", error);
    return null;
  }
}