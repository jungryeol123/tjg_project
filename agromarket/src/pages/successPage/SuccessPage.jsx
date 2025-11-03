// src/pages/SuccessPage.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socialApiLogin } from "features/auth/authAPI";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // URL 쿼리 파라미터 파싱
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");
  const provider = queryParams.get("provider");
  const id = queryParams.get("userId");
       console.log("provider1", provider, "id1", id);
  useEffect(() => {
    if (success === "200") {
      dispatch(socialApiLogin(provider, id));
      console.log("결제 성공!");
      // ✅ 3초 뒤 메인페이지로 자동 이동 (선택사항)
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      {success === "200" ? (
        <>
          <p>잠시 후 메인 페이지로 이동합니다.</p>
        </>
      ) : (
        <>
          <p>문제가 발생했습니다. 다시 시도해주세요.</p>
        </>
      )}
    </div>
  );
}
