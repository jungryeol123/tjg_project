export default function PhoneField({ form, refs, handleChangeForm }) {
    return (
        <li>
            <label>휴대폰번호<span className="red-star">*</span></label>
            <input
                name="phone"
                value={form.phone}
                onChange={handleChangeForm}
                ref={refs.phoneRef}
                placeholder="'-' 없이 입력"
                maxLength="11"
            />
        </li>
    );
}
