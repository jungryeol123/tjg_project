export function SignupAddress({
  form,
  refs,
  userFullAddress,
  handleChangeForm,
  handleClickAddress,
}) {
  return (
    <li>
      <ul className="part address">
        <li className="left">
          <span>주소</span>
        </li>
        {userFullAddress === "" ? (
          <li className="middle">
            <div className="btn-address">
              <button className="btn btn-address" type="button" onClick={handleClickAddress}>
                주소 검색
              </button>
            </div>
            <span>배송지에 따라 상품 정보가 달라질 수 있습니다.</span>
          </li>
        ) : (
          <>
            <li className="address-hide">
              <input
                className="input-field"
                type="text"
                placeholder={userFullAddress}
                name="address"
                value={userFullAddress}
                ref={refs.addressRef}
                onChange={handleChangeForm}
                readOnly
              />
              <input
                className="input-field"
                type="text"
                placeholder="나머지 주소를 입력해주세요"
                name="addressDetail"
                value={form.addressDetail}
                ref={refs.addressDetailRef}
                onChange={handleChangeForm}
              />
            </li>
            <li className="phone-btn">
              <button className="btn" type="button" onClick={handleClickAddress}>
                재검색
              </button>
            </li>
          </>
        )}
      </ul>
    </li>
  );
}
