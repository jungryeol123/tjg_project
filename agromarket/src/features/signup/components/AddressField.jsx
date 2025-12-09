export default function AddressField({
    form,
    refs,
    handleChangeForm,
    userFullAddress,
    handleClick
}) {
    return (
        <>
            <li>
                <label>주소<span className="red-star">*</span></label>
                <div className="input-btn">
                    <input
                        name="zonecode"
                        value={form.zonecode}
                        readOnly
                        placeholder="우편번호"
                        ref={refs.zonecodeRef}
                    />
                    <button type="button" onClick={handleClick}>주소 검색</button>
                </div>
            </li>

            <li>
                <label></label>
                <input
                    value={userFullAddress}
                    readOnly
                    placeholder="기본 주소"
                />
            </li>

            <li>
                <label></label>
                <input
                    name="addressDetail"
                    value={form.addressDetail}
                    onChange={handleChangeForm}
                    placeholder="상세 주소 입력"
                    ref={refs.addressDetailRef}
                />
            </li>
        </>
    );
}
