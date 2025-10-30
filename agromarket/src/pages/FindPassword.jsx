import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/utilities/login.css';

export function FindPassword() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');

    try {
      const response = await fetch(
        `/member/find-password?id=${encodeURIComponent(id)}&query=${encodeURIComponent(query)}`
      );
      const data = await response.text();
      setResult(data);
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
                  placeholder="아이디 입력"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            </li>
            <li>
              <div className="login-form-input">
                <input
                  type="text"
                  placeholder="휴대폰 번호 또는 이메일 입력"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </li>
            <li>
              <button type="submit" className="btn-main-color">
                비밀번호 찾기
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
