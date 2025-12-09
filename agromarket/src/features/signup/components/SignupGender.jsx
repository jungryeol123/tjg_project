export function SignupGender({ form, refs, handleChangeForm }) {
  return (
    <li>
      <ul className="part gender">
        <li className="left">
          <span>성별</span>
        </li>
        <li className="middle">
          <div className="genderList">
            <div>
              <input
                type="radio"
                name="gender"
                className="genderButton"
                value="M"
                ref={refs.genderRef}
                onChange={handleChangeForm}
              />
            </div>
            <div>
              <span>남자</span>
            </div>
          </div>
          <div className="genderList">
            <div>
              <input
                type="radio"
                name="gender"
                className="genderButton"
                value="F"
                ref={refs.genderRef}
                onChange={handleChangeForm}
              />
            </div>
            <div>
              <span>여자</span>
            </div>
          </div>
        </li>
      </ul>
    </li>
  );
}
