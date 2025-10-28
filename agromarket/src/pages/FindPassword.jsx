import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/utilities/login.css'; 

export function FindPassword() {
  const navigate = useNavigate();
  const [userIdOrEmail, setUserIdOrEmail] = useState('');
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setUserIdOrEmail(e.target.value);
    setResult('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/find-password?query=${encodeURIComponent(userIdOrEmail)}`
      );
      const data = await response.json();

      if (data.passwordResetLink) {
        setResult(
          `비밀번호 재설정 링크가 이메일로 전송되었습니다: ${data.passwordResetLink}`
        );
      } else {
        setResult('일치하는 계정이 없습니다.');
      }
    } catch (err) {
      console.error(err);
      setResult('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="content">
      <div className="center-layout login-form">
        <h1 className="center-title">비밀번호 찾기</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <div className="login-form-input">
                <input
                  type="text"
                  placeholder="아이디 또는 이메일 입력"
                  value={userIdOrEmail}
                  onChange={handleChange}
                />
              </div>
            </li>
            <li>
              <button type="submit" className="btn-main-color">
                비밀번호 재설정
              </button>
            </li>
            {result && <li><span>{result}</span></li>}
          </ul>
        </form>
        <button className="btn-main-color" onClick={() => navigate('/login')}>
          로그인 페이지로
        </button>
      </div>
    </div>
  );
}
