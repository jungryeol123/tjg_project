// features/user/hooks/useUserDetail.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userAPI } from "../api/userAPI";

export function useUserDetail() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // ⭐ 유저 ID 가져오기
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = JSON.parse(atob(accessToken.split(".")[1]));

      setUserId(payload.id);
    }
  }, []);

  // ⭐ 유저 기본 정보 불러오기
  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await userAPI.getUser(userId);
        setUser(res.data);
      } catch (err) {
        console.error("유저 정보 로드 실패:", err);
      }
    }

    fetchUser();
  }, [userId]);

  // ⭐ 수정 함수 (기존 로직 100% 유지)
  const handleEditField = async (fieldName, label, currentValue) => {
    let inputValue = currentValue;

    if (fieldName === "phone") {
      inputValue = currentValue ? currentValue.replace(/\D/g, "").slice(3) : "";
    }

    const { value: newValue } = await Swal.fire({
      title: `${label} 수정`,
      input: "text",
      inputValue,
      inputAttributes: {
        maxlength: fieldName === "phone" ? 8 : undefined,
        pattern: fieldName === "phone" ? "[0-9]*" : undefined,
      },
      inputValidator: (value) => {
        if (fieldName === "phone") {
          if (!/^\d{8}$/.test(value)) {
            return "전화번호는 숫자 8자리로 입력해주세요!";
          }
        }
        return null;
      },
      showCancelButton: true,
      confirmButtonText: "저장",
      cancelButtonText: "취소",
    });

    if (!newValue) return;

    let finalValue = newValue;

    if (fieldName === "phone") {
      finalValue = `010-${newValue.slice(0, 4)}-${newValue.slice(4)}`;
    }

    try {
      const updated = { ...user, [fieldName]: finalValue };

      await userAPI.updateUser(userId, updated);

      Swal.fire("성공!", `${label}이(가) 수정되었습니다.`, "success");
      setUser(updated);
    } catch (err) {
      console.error(err);
      Swal.fire("오류", "수정 중 문제가 발생했습니다.", "error");
    }
  };

  return {
    user,
    userId,
    handleEditField,
  };
}
