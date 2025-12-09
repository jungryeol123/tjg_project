import React from "react";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { getCheckId, getSignup } from "features/auth/authAPI";
import { validateSignup } from "features/signup/SignupValidation";

export function useSignupForm() {
  const navigate = useNavigate();
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const initArray = [
    "userId", "password", "cpwd", "name",
    "phone", "address", "addressDetail",
    "emailName", "emailDomain", "emailDomainInput",
    "gender", "dateYear", "dateMonth",
    "dateDay", "recommendation", "zonecode"
  ];

  const numericOnly = ["phone", "dateYear", "dateMonth", "dateDay"];

  function initForm(arr) {
    return arr.reduce((acc, cur) => {
      acc[cur] = "";
      return acc;
    }, {});
  }

  const [form, setForm] = useState({
    ...initForm(initArray),
    emailDomain: "선택하기",
  });

  const refs = useMemo(
    () =>
      initArray.reduce((acc, cur) => {
        acc[`${cur}Ref`] = React.createRef();
        return acc;
      }, {}),
    []
  );

  const [userFullAddress, setUserFullAddress] = useState("");

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    if (numericOnly.includes(name) && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };

  const handleClickAddress = () => open({ onComplete });

  const onComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zonecode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setUserFullAddress(fullAddress);
    setForm({ ...form, zonecode });
  };

  const handleIdCheck = async (e) => {
    const { name, value } = e.target;

    if (!value) {
      Swal.fire({ icon: "error", title: "중복체크 결과", text: "❌ 아이디를 입력해주세요." });
      return;
    }

    const result = await getCheckId(name, value);

    if (name === "userId") {
      Swal.fire({
        icon: result.data ? "error" : "success",
        title: "중복체크 결과",
        text: result.data ? "❌ 존재하는 아이디입니다." : "✅ 사용가능한 아이디입니다.",
      });
    }
  };

  const handleSubmit = async (e, agree) => {
    e.preventDefault();

    const email =
      form.emailDomain === ""
        ? form.emailName + form.emailDomainInput
        : form.emailName + form.emailDomain;

    const formData = {
      ...form,
      email,
      birthday: `${form.dateYear}-${form.dateMonth}-${form.dateDay}`,
      phone: `${form.phone.slice(0, 3)}-${form.phone.slice(3, 7)}-${form.phone.slice(7, 11)}`,
      address: `${userFullAddress} ${form.addressDetail}`,
    };

    const errors = validateSignup(formData);

    if (Object.keys(errors).length > 0) {
      Swal.fire({ icon: "error", title: "회원가입 실패", text: errors });
      return;
    }

    if (!agree.terms || !agree.privacy || !agree.age) {
      Swal.fire({ icon: "error", title: "회원가입 실패", text: "필수 이용 약관을 동의해주세요." });
      return;
    }

    const result = await getSignup(formData);

    if (result) {
      Swal.fire({ icon: "success", title: "회원가입 성공" }).then(() => navigate("/login"));
    } else {
      Swal.fire({ icon: "error", title: "회원가입 실패" });
    }
  };

  return {
    form,
    refs,
    userFullAddress,
    handleChangeForm,
    handleClickAddress,
    setUserFullAddress,
    handleIdCheck,
    handleSubmit,
  };
}
