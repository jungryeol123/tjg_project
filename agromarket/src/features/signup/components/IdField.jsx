export default function IdField({ form, refs, handleChangeForm, handleIdCheck }) {
    return (
        <li>
            <label>아이디<span className="red-star">*</span></label>
            <div className="input-btn">
                <input
                    name="userId"
                    value={form.userId}
                    onChange={handleChangeForm}
                    ref={refs.userIdRef}
                    placeholder="아이디 입력"
                />
                <button type="button" onClick={handleIdCheck}>중복확인</button>
            </div>
        </li>
    );
}
