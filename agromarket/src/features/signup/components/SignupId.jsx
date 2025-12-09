export function SignupId({ form, refs, handleChangeForm, handleIdCheck }) {
  return (
    <li>
      <ul className="part id">
        <li className="left">
          <span>아이디</span>
          <span className="red-star">* </span>
        </li>
        <li>
          <input
            className="input-field"
            type="text"
            placeholder="아이디를 입력해주세요"
            name="userId"
            value={form.userId}
            ref={refs.userIdRef}
            onChange={handleChangeForm}
          />
          <button
            className="btn"
            type="button"
            name="userId"
            value={form.userId}
            onClick={handleIdCheck}
          >
            아이디 확인
          </button>
        </li>
      </ul>
    </li>
  );
}
