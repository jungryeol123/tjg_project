function KakaoLoginButton() {
    const loginWithKakao = () => {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/features/auth/Kakao',
            scope: 'profile_nickname'
        });
    };

    return (
        <button
            onClick={loginWithKakao}
            style={{ backgroundColor: "#FEE500", border: "none", padding: "10px" }}
        >
            카카오 로그인
        </button>
    );
}

export default KakaoLoginButton;
