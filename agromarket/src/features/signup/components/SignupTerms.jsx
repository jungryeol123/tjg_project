export function SignupTerms({
  agree,
  termList,
  hoveredId,
  setHoveredId,
  handleAgreeChange,
  handleAllAgree,
}) {
  return (
    <li>
      <ul className="part agree">
        <li className="left">
          <span>이용약관동의</span>
        </li>

        <li className="middle">

          {/* 전체 동의 */}
          <div className="allAgree">
            <div className="allAgreefirst">
              <input
                type="checkbox"
                name="all"
                checked={agree.all}
                onChange={handleAllAgree}
              />
              <h3>전체 동의합니다.</h3>
            </div>
            <div>
              <span>
                선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.
              </span>
            </div>
          </div>

          {/* 개별 약관 */}
          {termList &&
            termList.map((item, index) => (
              <div key={index}>
                <div>
                  <input
                    type="checkbox"
                    name={item.id}
                    checked={agree[item.id]}
                    onChange={handleAgreeChange}
                  />
                  <span>{item.title}</span>
                  <span> ({item.importance})</span>
                </div>

                {/* 약관 보기 Hover 영역 */}
                <div
                  className="agree-hover-area"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span className="agree-text">약관보기</span>

                  {/* Hover 시 약관 내용 표시 */}
                  {hoveredId === item.id && (
                    <div className="agree-box">
                      <h4 className="agree-title">{item.title}</h4>
                      <ol className="agree-list">
                        {item.content.map((contentItem, cIdx) => (
                          <div className="term-total" key={cIdx}>
                            <li className="term-title">{contentItem.title}</li>
                            <li className="term-body">{contentItem.body}</li>
                          </div>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {/* 혜택 수신 동의 */}
          <div className="agreeBenefit">
            <div>
              <input
                type="checkbox"
                name="benefit"
                checked={agree.benefit}
                onChange={handleAgreeChange}
              />
              <span>무료배송, 할인쿠폰 등 해택/정보 수신 동의 </span>
              <span>(선택)</span>

              <div className="sns">
                <div>
                  <input
                    type="checkbox"
                    name="sms"
                    checked={agree.sms}
                    onChange={handleAgreeChange}
                  />
                  <span>SMS</span>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="email"
                    checked={agree.email}
                    onChange={handleAgreeChange}
                  />
                  <span>이메일</span>
                </div>
              </div>
            </div>
          </div>

          {/* 14세 이상 */}
          <div>
            <div>
              <input
                type="checkbox"
                name="age"
                checked={agree.age}
                onChange={handleAgreeChange}
              />
              <span>본인은 만 14세 이상입니다 </span>
              <span>(필수)</span>
            </div>
          </div>

        </li>
      </ul>
    </li>
  );
}
