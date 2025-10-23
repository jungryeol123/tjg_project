import '../styles/layout/Signup.css';

export function Signup() {
    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <div className='essential'><span>* </span>필수입력사항</div>
            <ul>
                <li>
                    <ul className='part id'>
                        <li className='left'><span>아이디</span></li>
                        <li><input className="input-field" type="text" placeholder='아이디를 입력해주세요' /></li>
                    </ul>
                </li>
                <li>
                    <ul className='part pwd'>
                        <li className='left'><span>비밀번호</span></li>
                        <li><input className="input-field" type="password" placeholder='비밀번호를 입력해주세요' /></li>
                    </ul>
                </li>
                <li>
                    <ul className='part pwd'>
                        <li className='left'><span>비밀번호확인</span></li>
                        <li><input className="input-field" type="password" placeholder='비밀번호를 한번 더 입력해주세요' /></li>
                    </ul>
                </li>
                <li>
                    <ul className='part name'>
                        <li className='left'><span>이름</span></li>
                        <li><input className="input-field" type="text" placeholder='이름을 입력해주세요' /></li>
                    </ul>
                </li>
                <li>
                    <ul className='part email'>
                        <li className='left'><span>이메일</span></li>
                        <li>
                            <input className="input-field" type="text" placeholder='예:marketcandy' />
                        </li>
                        <li>
                            <select className="input-field">
                                <option value="default">선택하기</option>
                                <option value="@naver.com">@naver.com</option>
                                <option value="@gmail.com">@gmail.com</option>
                                <option value="@hanmail.net">@hanmail.net</option>
                                <option value="@kakao.com">@kakao.com</option>
                                <option value="@daum.net">@daum.net</option>
                                <option value="@hotmail.com">@hotmail.com</option>
                                <option value="@yahoo.co.kr">@yahoo.co.kr</option>
                                <option value="">직접 입력</option>
                            </select>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='part phone'>
                        <li className='left'><span>휴대폰</span></li>
                        <li><input className="input-field" type="text" placeholder='숫자만 입력해주세요' /></li>
                        <li className='phone-btn'>
                            <button className="btn" type="button">인증번호 받기</button>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='part address'>
                        <li className='left'><span>주소</span></li>
                        <li className='middle'>
                            <div className='btn-address'><button className="btn btn-address" type="button">주소 검색</button></div>
                            <span>배송지에 따라 상품 정보가 달라질 수 있습니다.</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='part gender'>
                        <li className='left'>
                            <span>성별</span>
                        </li>
                        <li className='middle'>
                            <div className='genderList'>
                                <div>
                                    <input type="radio" name="gender" className='genderButton'/>
                                </div>
                                <div>
                                    <span>남자</span>
                                </div>
                            </div>
                            <div className='genderList'>
                                <div>
                                    <input type="radio" name="gender" className='genderButton'/>
                                </div>
                                <div>
                                    <span>여자</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='part date'>
                        <li className='left'><span>생년월일</span></li>
                        <li className='middle'>
                            <div>
                                <input className="input-field input-date" type="text" placeholder='YYYY' />
                            </div>
                            <div>
                                <span>/</span>
                            </div>
                            <div>
                                <input className="input-field input-date" type="text" placeholder='MM' />
                            </div>
                            <div>
                                <span>/</span>
                            </div>
                            <div>
                                <input className="input-field input-date" type="text" placeholder='DD' />
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='part plus'>
                        <li><span className='left'>추가입력 사항</span></li>
                        <li className='middle'>
                            <input type="radio" />
                            <span>친구초대 추천인 아이디</span>
                            <div className='plusAfter'>
                                <input className="input-field" type="text" />
                                <button className="btn" type="button">아이디 확인</button>
                                <li><span>가입 후 7일 이내 첫 주문 배송완료 시, 친구초대 적립금이 지급됩니다.</span></li>
                                <li><span>ID 입력시, 대소문자 및 띄어쓰기에 유의 부탁드립니다.</span></li>
                                <li><span>가입 이후는 수정이 불가능합니다.</span></li>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='part agree'>
                        <li className='left'>
                            <span>이용약관동의</span>
                        </li>
                        <li className='middle'>
                            <div className='allAgree'>
                                <div className='allAgreefirst'>
                                    <input type="checkbox" />
                                    <h3>전체 동의합니다.</h3>
                                </div>
                                <div>
                                    <span>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input type="checkbox" />
                                    <span>이용약관 동의</span>
                                    <span>(필수)</span>
                                </div>
                                <div>
                                    <span>약관보기</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input type="checkbox" />
                                    <span>개인정보 수집 이용 동의 동의</span>
                                    <span>(필수)</span>
                                </div>
                                <div>
                                    <span>약관보기</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input type="checkbox" />
                                    <span>마케팅 광고 활용을 위한 수집 및 이용 동의</span>
                                    <span>(선택)</span>
                                </div>
                                <div>
                                    <span>약관보기</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input type="checkbox" />
                                    <span>무료배송, 할인쿠폰 등 해택/정보 수신 동의</span>
                                    <span>(선택)</span>
                                    <div className='sns'>
                                        <div>
                                            <input type="checkbox" />
                                            <span>SMS</span>
                                        </div>
                                        <div>
                                            <input type="checkbox" />
                                            <span>이메일</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input type="checkbox" />
                                    <span>본인은 만 14세 이상입니다.</span>
                                    <span>(필수)</span>
                                </div>
                                <div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li><button className="btn-submit" type="button">가입하기</button></li>
            </ul>
        </div>
    );
}
