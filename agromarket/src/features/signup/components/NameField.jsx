export default function NameField({ form, refs, handleChangeForm }) {
    return (
        <li>
            <label>이름<span className="red-star">*</span></label>
            <input
                name="name"
                value={form.name}
                onChange={handleChangeForm}
                ref={refs.nameRef}
                placeholder="이름 입력"
            />
        </li>
    );
}
