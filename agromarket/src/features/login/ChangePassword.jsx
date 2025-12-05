import { useState } from "react";
import { api } from "shared/lib/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // 1️⃣ 인증번호 요청
  const handleSendCode = async () => {
    if (!email) return alert("이메일을 입력하세요!");

    try {
      const res = await api.post("/member/send-code", {
        email
      });

      if (res.status === 200) {
      Swal.fire({
        icon : "suceess",
        title : "✅ 인증번호 요청 성공",
        confirmButtonText : "확인"
      })
  setStep(2);
} 

    } catch (e) {
    Swal.fire({
        icon : "warning",
        title : "⚠ 메일 전송 실패!",
        confirmButtonText : "확인"
    })    
      console.error(e);
    }
  };

  // 2️⃣ 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      const res = await api.post("/member/verify-code", {
        email,
        code
      });

      if (res.status === 200) {
        Swal.fire({
        icon : "suceess",
        title : "✅ 인증 완료",
        confirmButtonText : "확인"
      })
        setStep(3);
      } 
    } catch (e) {
      Swal.fire({
        icon : "warning",
        title : "⚠ 메일 전송 실패!",
        confirmButtonText : "확인"
    })   
      console.error(e);
    }
  };

  // 3️⃣ 비밀번호 변경
  const handleChangePassword = async () => {
    if (!newPassword) return alert("새 비밀번호를 입력하세요!");

    try {
      const res = await api.post("/member/reset-password", {
        email,
        password : newPassword
      });

      if (res.status === 200) {
        Swal.fire({
        icon : "suceess",
        title : "✅ 비밀번호 변경 완료",
        confirmButtonText : "확인"
      }).then(() => {
          navigate("/login");
      });
      } 
    } catch (e) {
        Swal.fire({
        icon : "warning",
        title : "⚠ 비밀번호 변경 실패!",
        confirmButtonText : "확인"
    })   
      console.error(e);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 비밀번호 찾기</h2>

      {/* STEP 1: 이메일 입력 */}
      {step === 1 && (
        <>
          <p>등록된 이메일을 입력하면 인증번호를 보내드립니다.</p>
          <input
            style={styles.input}
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button style={styles.btn} onClick={handleSendCode}>
            인증번호 보내기
          </button>
        </>
      )}

      {/* STEP 2: 인증번호 입력 */}
      {step === 2 && (
        <>
          <p>메일로 받은 인증번호를 입력하세요.</p>
          <input
            style={styles.input}
            type="text"
            placeholder="인증번호 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button style={styles.btn} onClick={handleVerifyCode}>
            인증번호 확인
          </button>
        </>
      )}

      {/* STEP 3: 새 비밀번호 입력 */}
      {step === 3 && (
        <>
          <p>새 비밀번호를 입력하세요.</p>
          <input
            style={styles.input}
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button style={styles.btn} onClick={handleChangePassword}>
            비밀번호 변경
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Pretendard",
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  btn: {
    width: "95%",
    padding: "12px",
    backgroundColor: "#4B3EFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
