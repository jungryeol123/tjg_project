export function KakaoLogoutButton() {
  const logout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        console.log("로그아웃 완료", window.Kakao.Auth.getAccessToken());
      });
    }
  };

  return <button onClick={logout}>로그아웃</button>;
}
