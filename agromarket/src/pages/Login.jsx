import KakaoLoginButton from "features/auth/KakaoLoginButton";
import { KakaoLogoutButton } from "features/auth/KakaoLogoutButton";

export  function Login() {
  return (
    <>
      <KakaoLoginButton/>
      <KakaoLogoutButton />
    </>
  );
}