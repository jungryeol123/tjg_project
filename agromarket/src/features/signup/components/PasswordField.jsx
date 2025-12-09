export default function PasswordField({ form, refs, handleChangeForm }) {
    return (
        <>
            <li>
                <label>비밀번호<span className="red-star">*</span></label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChangeForm}
                    ref={refs.passwordRef}
                    placeholder="비밀번호 입력"
                />
            </li>

            <li>
                <label>비밀번호 확인<span className="red-star">*</span></label>
                <input
                    type="password"
                    name="cpwd"
                    value={form.cpwd}
                    onChange={handleChangeForm}
                    ref={refs.cpwdRef}
                    placeholder="비밀번호 확인"
                />
            </li>
        </>
    );
}
