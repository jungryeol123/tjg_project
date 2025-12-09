// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { api } from "shared/lib/axios";
// import './UpdateUserDetail.css';

// export function UpdateUserDetail() {
//   const [user, setUser] = useState(null); 
//   const [userId, setUserId] = useState(null);

//   // ⭐ 유저 ID 가져오기
//   useEffect(() => {
//     const stored = localStorage.getItem("loginInfo");
//     if (stored) {
//       const { accessToken } = JSON.parse(stored);
//       const payload = JSON.parse(atob(accessToken.split(".")[1]));
//       setUserId(payload.id);
//     }
//   }, []);

//   // ⭐ 유저 기본 정보 불러오기
//   useEffect(() => {
//     if (!userId) return;

//     async function fetchUser() {
//       try {
//         const res = await api.get(`/userInfo/${userId}`);
//         setUser(res.data);
//       } catch (err) {
//         console.error("유저 정보 로드 실패:", err);
//       }
//     }
//     fetchUser();
//   }, [userId]);

//   if (!user) return <p>⏳ 불러오는 중...</p>;

//   // ⭐ 수정 공통 함수
//   const handleEditField = async (fieldName, label, currentValue) => {

//   let inputValue = currentValue;

//   if (fieldName === "phone") {
//     // 현재 값에서 숫자만 추출 (010-1234-5678 → 12345678)
//     inputValue = currentValue ? currentValue.replace(/\D/g, "").slice(3) : "";
//   }

//   const { value: newValue } = await Swal.fire({
//     title: `${label} 수정`,
//     input: "text",
//     inputValue,
//     inputAttributes: {
//       maxlength: fieldName === "phone" ? 8 : undefined,
//       pattern: fieldName === "phone" ? "[0-9]*" : undefined,
//     },
//     inputValidator: (value) => {
//       if (fieldName === "phone") {
//         if (!/^\d{8}$/.test(value)) {
//           return "전화번호는 숫자 8자리로 입력해주세요!";
//         }
//       }
//       return null;
//     },
//     showCancelButton: true,
//     confirmButtonText: "저장",
//     cancelButtonText: "취소",
//   });

//   if (!newValue) return;

//   let finalValue = newValue;

//   if (fieldName === "phone") {
//     finalValue = `010-${newValue.slice(0, 4)}-${newValue.slice(4)}`;
//   }

//   try {
//     const updated = { ...user, [fieldName]: finalValue };

//     await api.put(`/userInfo/update/${userId}`, updated);

//     Swal.fire("성공!", `${label}이(가) 수정되었습니다.`, "success");
//     setUser(updated);
//   } catch (err) {
//     console.error(err);
//     Swal.fire("오류", "수정 중 문제가 발생했습니다.", "error");
//   }
// };


//   return (
//     <div className="user-detail-container">
//       <h2 className="section-title">기본정보</h2>

//       <div className="user-card">
//         {/* 이름 */}
//         <div className="user-item">
//           <div>
//             <div className="user-label">회원명</div>
//             <div className="user-value">{user.name}</div>
//           </div>
//           <button
//             className="edit-btn"
//             onClick={() => handleEditField("name", "회원명", user.name)}
//           >
//             수정
//           </button>
//         </div>

//         {/* 전화번호 */}
//         <div className="user-item">
//           <div>
//             <div className="user-label">전화번호</div>
//             <div className="user-value">{(user.phone)}</div>
//           </div>
//           <button
//             className="edit-btn"
//             onClick={() =>
//               handleEditField("phone", "전화번호", user.phone)
//             }
//           >
//             수정
//           </button>
//         </div>

//         {/* 이메일 */}
//         <div className="user-item">
//           <div>
//             <div className="user-label">이메일</div>
//             <div className="user-value">{(user.email)}</div>
//           </div>
//           <button
//             className="edit-btn"
//             onClick={() =>
//               handleEditField("email", "이메일", user.email)
//             }
//           >
//             수정
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// pages/myPage/UpdateUserDetail.jsx

import "./UpdateUserDetail.css";
import "../administration/AdminLayout.scss";
import { useUserDetail } from "features/myPage/userDetail/hooks/useUserDetail";

export function UpdateUserDetail() {
  const { user, handleEditField } = useUserDetail();

  if (!user) return <p>⏳ 불러오는 중...</p>;

  return (
    <div className="user-detail-container">
      <h2 className="section-title">기본정보</h2>

      <div className="user-card">
        {/* 이름 */}
        <div className="user-item">
          <div>
            <div className="user-label">회원명</div>
            <div className="user-value">{user.name}</div>
          </div>
          <button
            className="edit-btn"
            onClick={() => handleEditField("name", "회원명", user.name)}
          >
            수정
          </button>
        </div>

        {/* 전화번호 */}
        <div className="user-item">
          <div>
            <div className="user-label">전화번호</div>
            <div className="user-value">{user.phone}</div>
          </div>
          <button
            className="edit-btn"
            onClick={() => handleEditField("phone", "전화번호", user.phone)}
          >
            수정
          </button>
        </div>

        {/* 이메일 */}
        <div className="user-item">
          <div>
            <div className="user-label">이메일</div>
            <div className="user-value">{user.email}</div>
          </div>
          <button
            className="edit-btn"
            onClick={() => handleEditField("email", "이메일", user.email)}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
