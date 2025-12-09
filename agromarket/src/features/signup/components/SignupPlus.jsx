import { useState } from 'react';

export function SignupPlus({ form, refs, handleChangeForm, handleIdCheck }) {
  const [isPlusAfter, setIsPlusAfter] = useState(false);

  return (
    <li>
      <ul className="part plus">
        <li>
          <span className="left">추가입력 사항</span>
        </li>
        <li className="middle">
          <input type="radio" onClick={() => setIsPlusAfter(!isPlusAfter)} />
          <span>친구초대 추천인 아이디</span>
          {isPlusAfter && (
            <div className="plusAfter">
              <div className="plusAfterMain">
                <input
                  className="input-field"
                  type="text"
                  placeholder="추천인 아이디 입력"
                  name="recommendation"
                  value={form.recommendation}
                  ref={refs.recommendationRef}
                  onChange={handleChangeForm}
                />
                <button
                  className="btn"
                  type="button"
                  name="recommendation"
                  value={form.recommendation}
                  onClick={handleIdCheck}
                >
                  아이디 확인
                </button>
              </div>
              <div className="plusAfterSub">
                <div>
                  <span>
                    가입 후 7일 이내 첫 주문 배송완료 시, 친구초대 적립금이 지급됩니다.
                  </span>
                </div>
                <div>
                  <span>대소문자 및 띄어쓰기에 유의 부탁드립니다.</span>
                </div>
                <div>
                  <span>가입 이후는 수정이 불가능합니다.</span>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </li>
  );
}
