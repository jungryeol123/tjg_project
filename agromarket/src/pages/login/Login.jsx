// import Swal from 'sweetalert2';
// import { FaLock } from "react-icons/fa";
// import { FaUser } from "react-icons/fa6";
// import { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// // features
// import { getLogin } from 'features/auth/authAPI';
// import "./login.scss";

// //로그인페이지
// export function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const idRef = useRef(null);
//   const pwdRef = useRef(null);
//   const [formData, setFormData] = useState({ userId: "", password: "" });
//   const [errors, setErrors] = useState({ userId: "", password: "" });
//   const location = useLocation();

//   // 이전 페이지 경로 설정 (없으면 기본값으로 홈)
//   const from = location.state?.from || "/";

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ userId: "", password: "" });
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const param = {
//       idRef: idRef,
//       pwdRef: pwdRef,
//       setErrors: setErrors,
//       errors: errors,
//     };
//     // ✅ 1. 로그인 전에 CSRF 토큰 먼저 요청
//     // await axios.get("/csrf", { withCredentials: true });
//     const succ = await dispatch(getLogin(formData, param)); //비동기식 처리 후 isLogin 변경

//     if (succ) {
//       Swal.fire({
//           icon: 'success',
//           timer: 1000, // 1초 후 자동 확인버튼클릭
//           timerProgressBar: true, // 타이머 바
//           title: '✅ 로그인 성공',
//           confirmButtonText: '확인'
//       }).then(() => {
//           navigate(from, { replace: true });
//       });
//     } else {
//       setFormData({ userId: "", password: "" });
//       idRef.current.focus();
//     }
//   };

//   const handleNaverLogin = () => {
//     window.location.href = "http://localhost:8080/oauth2/authorization/naver";
//   };

//   const handleKakaoLogin = async () => {
//     try {
//       // ✅ 1. 카카오 로그인 페이지로 리디렉트 요청
//       window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
//     } catch (error) {
//       console.error("카카오 로그인 실패:", error);
//     }
//   };

//   return (
//     <div className="content">
//       <div className="center-layout login-form">
//         <h1 className="center-title">로그인</h1>
//         <form onSubmit={handleLoginSubmit}>
//           <ul>
//             <li>
//               <div className="login-form-input">
//                 <FaUser />
//                 <input
//                   type="text"
//                   name="userId"
//                   value={formData.userId}
//                   ref={idRef}
//                   onChange={handleFormChange}
//                   placeholder="아이디를 입력해주세요"
//                 />
//               </div>
//               <span style={{ color: "red", fontSize: "0.8rem" }}>
//                 {errors.userId}
//               </span>
//             </li>
//             <li>
//               <div className="login-form-input">
//                 <FaLock />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   ref={pwdRef}
//                   onChange={handleFormChange}
//                   placeholder="패스워드를 입력해주세요"
//                 />
//               </div>
//               <span style={{ color: "red", fontSize: "0.8rem" }}>
//                 {errors.password}
//               </span>
//             </li>
//             <li>
//               <button type="submit" className="btn-main-color">
//                 로그인
//               </button>
//             </li>
//             <li>
//               <button
//                 type="button"
//                 className="btn-main-color"
//                 onClick={() => {
//                   navigate("/signup");
//                 }}
//               >
//                 회원가입
//               </button>
//             </li>
//             <li>
//               <div className="links">
//                 <Link to="/find-user-id">아이디 찾기</Link>
//                 <span>|</span>
//                 <Link to="/send-code">비밀번호 찾기</Link>
//               </div>
//             </li>
//             <li>
//               <button
//                 className="btn-main-color-naver"
//                 onClick={handleNaverLogin}
//               >
//                 네이버 로그인
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={handleKakaoLogin}
//                 style={{
//                   backgroundColor: "#FEE500",
//                 }}
//                 className="btn-main-color-naver"
//               >
//                 카카오로 로그인
//               </button>
//             </li>
//           </ul>
//         </form>
//       </div>
//     </div>
//   );
// }
// src/features/auth/pages/Login.jsx
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./login.scss";
import { useLogin } from "features/login/hooks/useLogin";
import { LoginForm } from "features/login/components/LoginForm";
import { SocialLoginButtons } from "features/login/components/SocialLoginButtons";


export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지로 돌아가기 (없으면 "/")
  const from = location.state?.from || "/";

  // 🔹 useLogin 훅 사용
  const {
    idRef,
    pwdRef,
    formData,
    errors,
    handleFormChange,
    handleLoginSubmit,
  } = useLogin(navigate, from);

  return (
    <div className="content">
      <div className="center-layout login-form">
        <h1 className="center-title">로그인</h1>

        {/* 🔹 입력폼 부분 */}
        <LoginForm
          formData={formData}
          errors={errors}
          idRef={idRef}
          pwdRef={pwdRef}
          onChange={handleFormChange}
          onSubmit={handleLoginSubmit}
        />

        {/* 🔹 로그인 외 추가 메뉴 */}
        <ul>
          <li>
            <button
              type="button"
              className="btn-main-color"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </li>

          <li>
            <div className="links">
              <Link to="/find-user-id">아이디 찾기</Link>
              <span>|</span>
              <Link to="/send-code">비밀번호 찾기</Link>
            </div>
          </li>

          {/* 🔹 소셜 로그인 버튼 */}
          <SocialLoginButtons />
        </ul>
      </div>
    </div>
  );
}
