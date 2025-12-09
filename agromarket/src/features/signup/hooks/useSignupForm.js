import { useState } from "react";
import Swal from "sweetalert2";
import { validateSignup } from "features/signup/SignupValidation";
import { getCheckId, getSignup } from "features/auth/authAPI";

export function useSignupForm(initArray, numericOnly, refs, userFullAddress, navigate) {

    const initForm = () =>
        initArray.reduce((acc, cur) => {
            acc[cur] = "";
            return acc;
        }, {});

    const [form, setForm] = useState({
        ...initForm(),
        emailDomain: "선택하기",
    });

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        if (numericOnly.includes(name) && !/^\d*$/.test(value)) return;

        setForm({ ...form, [name]: value });

        // 자동 포커스 이동
        if (name === "dateYear" && value.length === 4) refs.dateMonthRef.current.focus();
        if (name === "dateMonth" && value.length === 2) refs.dateDayRef.current.focus();
    };

    const handleIdCheck = async (e) => {
        const { name, value } = e.target;

        if (value === "") {
            Swal.fire({
                icon: "error",
                title: "중복체크 결과",
                text: "❌ 아이디를 입력해주세요.",
            });
            return;
        }

        const result = await getCheckId(name, value);

        const success = name === "userId" ? !result.data : result.data;

        Swal.fire({
            icon: success ? "success" : "error",
            title: name === "userId" ? "아이디 확인" : "추천인 확인",
            text: success
                ? "사용 가능합니다."
                : name === "userId"
                ? "이미 존재하는 아이디입니다."
                : "존재하지 않는 아이디입니다.",
        });
    };

    const handleSubmit = async (e, agree) => {
        e.preventDefault();

        let email = form.emailDomain === ""
            ? form.emailName + form.emailDomainInput
            : form.emailName + form.emailDomain;

        const formData = {
            ...form,
            email,
            birthday: `${form.dateYear}-${form.dateMonth}-${form.dateDay}`,
            phone: `${form.phone.slice(0, 3)}-${form.phone.slice(3, 7)}-${form.phone.slice(7, 11)}`,
            address: userFullAddress + " " + form.addressDetail,
        };

        const errors = validateSignup(formData);

        if (Object.keys(errors).length > 0) {
            Swal.fire({ icon: "error", title: "회원가입 실패", text: errors });
            return;
        }

        if (!agree.terms || !agree.privacy || !agree.age) {
            Swal.fire({ icon: "error", title: "회원가입 실패", text: "필수 약관을 동의해주세요." });
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
        setForm,
        handleChangeForm,
        handleIdCheck,
        handleSubmit,
    };
}
