export default function EmailField({ form, refs, handleChangeForm }) {
    return (
        <li>
            <label>이메일<span className="red-star">*</span></label>

            <div className="email-wrap">
                <input
                    name="emailName"
                    value={form.emailName}
                    onChange={handleChangeForm}
                    ref={refs.emailNameRef}
                    placeholder="이메일 아이디"
                />

                <span>@</span>

                {form.emailDomain === "직접입력" ? (
                    <input
                        name="emailDomainInput"
                        value={form.emailDomainInput}
                        onChange={handleChangeForm}
                        placeholder="도메인 입력"
                    />
                ) : (
                    <select
                        name="emailDomain"
                        value={form.emailDomain}
                        onChange={handleChangeForm}
                    >
                        <option value="선택하기">선택하기</option>
                        <option value="@gmail.com">@gmail.com</option>
                        <option value="@naver.com">@naver.com</option>
                        <option value="@daum.net">@daum.net</option>
                        <option value="직접입력">직접입력</option>
                    </select>
                )}
            </div>
        </li>
    );
}
