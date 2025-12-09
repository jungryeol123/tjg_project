export function SignupPassword({ form, refs, handleChangeForm }) {
  return (
    <>
        <li>
            <ul className="part pwd">
                <li className="left">
                    <span>비밀번호</span>
                    <span className="red-star">* </span>
                </li>
                <li>
                    <input className="input-field" type="password" placeholder="비밀번호를 입력해주세요" name="password" value={form.password} ref={refs.passwordRef} onChange={handleChangeForm} />
                </li>
            </ul>
        </li>
        <li>
            <ul className='part pwd'>
                <li className='left'>
                    <span>비밀번호확인</span>
                    <span className='red-star'>* </span>
                </li>
                <li>
                    <input className="input-field" type="password" placeholder='비밀번호를 한번 더 입력해주세요' name='cpwd' value={form.cpwd} ref={refs.cpwdRef} onChange={handleChangeForm} />
                </li>
            </ul>
        </li>
    </>
  );
}
