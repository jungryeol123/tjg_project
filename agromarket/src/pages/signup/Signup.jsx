import React from "react";
import { SignupId } from "features/signup/components/SignupId";
import { SignupPassword } from "features/signup/components/SignupPassword";
import { SignupName } from "features/signup/components/SignupName";
import { SignupEmail } from "features/signup/components/SignupEmail";
import { SignupPhone } from "features/signup/components/SignupPhone";
import { SignupAddress } from "features/signup/components/SignupAddress";
import { SignupGender } from "features/signup/components/SignupGender";
import { SignupBirth } from "features/signup/components/SignupBirth";
import { SignupPlus } from "features/signup/components/SignupPlus";
import { SignupTerms } from "features/signup/components/SignupTerms";

import { useSignupForm } from "features/signup/hooks/useSignupForm";
import { useSignupAgree } from "features/signup/hooks/useSignupAgree";
import './Signup.scss';

export function Signup() {
  const {
    form,
    refs,
    userFullAddress,
    handleChangeForm,
    handleClickAddress,
    setUserFullAddress,
    handleIdCheck,
    handleSubmit,
  } = useSignupForm();

  const {
    agree,
    termList,
    hoveredId,
    setHoveredId,
    handleAgreeChange,
    handleAllAgree,
  } = useSignupAgree();

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <div className="essential">
        <span className="red-star">* </span>필수입력사항
      </div>

      <form onSubmit={(e) => handleSubmit(e, agree)}>
        <ul>
          <SignupId form={form} refs={refs} handleChangeForm={handleChangeForm} handleIdCheck={handleIdCheck} />

          <SignupPassword form={form} refs={refs} handleChangeForm={handleChangeForm} />

          <SignupName form={form} refs={refs} handleChangeForm={handleChangeForm} />

          <SignupEmail form={form} refs={refs} handleChangeForm={handleChangeForm} />

          <SignupPhone form={form} refs={refs} handleChangeForm={handleChangeForm} />

          <SignupAddress
            form={form}
            refs={refs}
            userFullAddress={userFullAddress}
            handleChangeForm={handleChangeForm}
            handleClickAddress={handleClickAddress}
          />

          <SignupGender form={form} refs={refs} handleChangeForm={handleChangeForm} />

          <SignupBirth form={form} refs={refs} handleChangeForm={handleChangeForm} />

          <SignupPlus form={form} refs={refs} handleChangeForm={handleChangeForm} handleIdCheck={handleIdCheck} />

          <SignupTerms
            agree={agree}
            termList={termList}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            handleAgreeChange={handleAgreeChange}
            handleAllAgree={handleAllAgree}
          />

          <li>
            <button className="btn-submit" type="submit">가입하기</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

