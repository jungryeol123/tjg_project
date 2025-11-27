import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// features
import { socialApiLogin } from "features/auth/authAPI";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // URL 쿼리 파라미터 파싱
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get("accessToken");
  const success = queryParams.get("success");
  const provider = queryParams.get("provider");
  const id = queryParams.get("userId");

  useEffect(() => {
    if (success === "200") {
      if (accessToken) {
        dispatch(socialApiLogin(provider, id, accessToken));
      }

      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
      
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
