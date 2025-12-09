export default function GenderField({ refs, handleChangeForm }) {
    return (
        <li>
            <label>성별<span className="red-star">*</span></label>
            <div className="radio-wrap">
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="M"
                        onChange={handleChangeForm}
                        ref={refs.genderRef}
                    />
                    남자
                </label>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="F"
                        onChange={handleChangeForm}
                    />
                    여자
                </label>
            </div>
        </li>
    );
}
