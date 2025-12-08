// src/features/auth/components/LoginForm.jsx
import { FaUser, FaLock } from "react-icons/fa";

export function LoginForm({
  formData,
  errors,
  idRef,
  pwdRef,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <ul>
        <li>
          <div className="login-form-input">
            <FaUser />
            <input
              type="text"
              name="userId"
              ref={idRef}
              value={formData.userId}
              onChange={onChange}
              placeholder="아이디를 입력해주세요"
            />
          </div>
          <span className="error">{errors.userId}</span>
        </li>

        <li>
          <div className="login-form-input">
            <FaLock />
            <input
              type="password"
              name="password"
              ref={pwdRef}
              value={formData.password}
              onChange={onChange}
              placeholder="패스워드를 입력해주세요"
            />
          </div>
          <span className="error">{errors.password}</span>
        </li>

        <li>
          <button type="submit" className="btn-main-color">
            로그인
          </button>
        </li>
      </ul>
    </form>
  );
}
