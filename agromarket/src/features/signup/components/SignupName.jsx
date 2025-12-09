export function SignupName({ form, refs, handleChangeForm }) {
  return (
    <li>
      <ul className="part name">
        <li className="left">
          <span>이름</span>
          <span className="red-star">* </span>
        </li>
        <li>
          <input
            className="input-field"
            type="text"
            placeholder="이름을 입력해주세요"
            name="name"
            value={form.name}
            ref={refs.nameRef}
            onChange={handleChangeForm}
          />
        </li>
      </ul>
    </li>
  );
}
