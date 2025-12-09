export function SignupPhone({ form, refs, handleChangeForm }) {
  return (
    <li>
      <ul className="part phone">
        <li className="left">
          <span>휴대폰</span>
        </li>
        <li>
          <input
            className="input-field"
            type="text"
            maxLength={11}
            placeholder="숫자만 입력해주세요"
            name="phone"
            value={form.phone}
            ref={refs.phoneRef}
            onChange={handleChangeForm}
          />
        </li>
        <li className="phone-btn">
          <button className="btn" type="button">
            인증번호 받기
          </button>
        </li>
      </ul>
    </li>
  );
}
