// src/features/auth/hooks/useLogin.js
import { getLogin } from "features/auth/authAPI";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export function useLogin(navigate, from) {
  const dispatch = useDispatch();
  const idRef = useRef(null);
  const pwdRef = useRef(null);
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [errors, setErrors] = useState({ userId: "", password: "" });

  useEffect(()=>{window.scrollTo({ top: 0, behavior: "auto" });},[]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ userId: "", password: "" });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const param = { idRef, pwdRef, setErrors, errors };

    const succ = await dispatch(getLogin(formData, param));

    if (succ) {
      Swal.fire({
        icon: "success",
        timer: 1000,
        title: "✅ 로그인 성공",
      }).then(() => navigate(from, { replace: true }));
    } else {
      setFormData({ userId: "", password: "" });
      idRef.current.focus();
    }
  };

  return {
    idRef,
    pwdRef,
    formData,
    errors,
    handleFormChange,
    handleLoginSubmit,
  };
}
