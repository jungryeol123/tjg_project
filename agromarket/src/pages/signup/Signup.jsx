import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import React, { useState, useMemo, useEffect } from 'react';
// features
import { getCheckId, getSignup } from 'features/auth/authAPI';
import { validateSignup } from 'features/signup/SignupValidation';
// shared
import { api } from 'shared/lib/axios.js';
import './Signup.scss';

export function Signup() {
    const initArray = ["userId", "password", "cpwd", "name", "phone", "address", "addressDetail", "emailName", "emailDomain", "emailDomainInput", "gender", "dateYear", "dateMonth", "dateDay", "recommendation", "zonecode"];
    const numericOnly = ["phone", "dateYear", "dateMonth", "dateDay"];
    const navigate = useNavigate();
    const [isPlusAfer, setIsPlusAfter] = useState(true);

    // 약관 토글
    const [hoveredId, setHoveredId] = useState(null);
    const [termList, setTermList] = useState([]);

    const [agree, setAgree] = useState({
        all: false,
        terms: false, // 이용약관 동의(필수)
        privacy: false, // 개인정보 수집 이용 동의(필수)
        marketing: false, // 마케팅 광고 활용(선택)
        benefit: false, // 무료배송, 할인쿠폰 수신 동의(선택)
        sms: false,
        email: false,
        age: false, // 만 14세 이상(필수)
    })

    // ✅ 전체 동의 핸들러
    const handleAllAgree = (e) => {
        const checked = e.target.checked;
        setAgree({
            all: checked,
            terms: checked,
            privacy: checked,
            marketing: checked,
            benefit: checked,
            sms: checked,
            email: checked,
            age: checked,
        });
    }

    // ✅ 개별 체크박스 핸들러
    const handleAgreeChange = (e) => {
        const { name, checked } = e.target;
        let updated;
        if(name === "benefit") {
            updated = {...agree, [name]: checked, sms: checked, email: checked};
        } else {
            updated = { ...agree, [name]: checked };
        }

        const benefitChecked = updated.sms && updated.email;
        // 모든 항목이 true인지 확인 → 전체 동의 자동 체크
        const allChecked =
            updated.terms &&
            updated.privacy &&
            updated.marketing &&
            updated.sms &&
            updated.email &&
            updated.age;

        updated.benefit = benefitChecked;
        updated.all = allChecked;
        setAgree(updated);
    }
    
    function initForm(initArray) {
        return initArray.reduce((acc,cur) => {
            acc[cur]="";
            return acc;
        }, {});
    } 
    
    const [form, setForm] = useState({...initForm(initArray), emailDomain: "선택하기"});
    
    const refs = useMemo(() => {    //Hooks 비동기식 처리 진행
        return initArray.reduce((acc,cur) => {
            acc[`${cur}Ref`] = React.createRef();
            return acc;
        }, {});
    })

    const handleChangeForm = (e) => {
        const {name, value} = e.target;
        
        if (numericOnly.includes(name) && !/^\d*$/.test(value)) {
            return; // 숫자 외 입력은 무시
        }

        setForm({...form,[name]:value});    //스프레드 연산자 이용

        // ✅ 자동 포커스 이동
        if (name === "dateYear" && value.length === 4) {
            refs.dateMonthRef.current.focus();
        } else if (name === "dateMonth" && value.length === 2) {
            refs.dateDayRef.current.focus();
        }
    }    

    const handleSubmit = async(e) => {
        e.preventDefault();

        let formData;

        if(form.emailDomain === "") {
            formData = {
                ...form, 
                "email":form.emailName.concat(form.emailDomainInput),  
                "birthday":form.dateYear.concat('-', form.dateMonth, '-', form.dateDay),
                "phone":form.phone.slice(0,3).concat('-', form.phone.slice(3,7), '-', form.phone.slice(7,11)),
                "address":userFullAddress.concat(" ", form.addressDetail)
            };
        } else {
            formData = {
                ...form, 
                "email":form.emailName.concat(form.emailDomain),  
                "birthday":form.dateYear.concat('-', form.dateMonth, '-', form.dateDay),
                "phone":form.phone.slice(0,3).concat('-', form.phone.slice(3,7), '-', form.phone.slice(7,11)),
                "address":userFullAddress.concat(" ", form.addressDetail)
            };
        }

        const errors = validateSignup(formData);

        if(Object.keys(errors).length > 0) {
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                text: errors,
                confirmButtonText: '확인',
            })
            return;
        }

        if(!agree.terms || !agree.privacy || !agree.age) {
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                text: '필수 이용 약관을 동의해주세요.',
                confirmButtonText: '확인',
            })
            return;
        }

        const result = await getSignup(formData);
        
        if(result) {
            Swal.fire({
                icon: 'success',
                title: '✅ 회원가입 성공',
                confirmButtonText: '확인',
            }).then(() => {
                navigate("/login");
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '❌ 회원가입 실패',
                confirmButtonText: '확인',
            });
        }
    }
    
    const [userFullAddress, setFullAddress] = useState(""); //유저 주소
    //다음 우편번호 찾기 API사용
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        let zonecode = data.zonecode;

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setFullAddress(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        setForm({...form, zonecode:zonecode});
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    /** 아이디 중복체크 */
    const handleIdCheck = async(e) => {
        const {name, value} = e.target;
        if(value === "") {
            Swal.fire({
                icon: 'error',
                title: '중복체크 결과',
                text: "❌ 아이디를 입력해주세요.",
                confirmButtonText: '확인',
            })
            return;
        }
        
        const result = await getCheckId(name, value);
        
        if(name === "userId") {
            if(result.data) {
                Swal.fire({
                    icon: 'error',
                    title: '중복체크 결과',
                    text: "❌ 존재하는 아이디입니다.",
                    confirmButtonText: '확인',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '중복체크 결과',
                    text: "✅ 사용가능한 아이디입니다.",
                    confirmButtonText: '확인',
                });
            }
        } else if(name === "recommendation") {
            if(result.data) {
                Swal.fire({
                    icon: 'success',
                    title: '추천인 확인 결과',
                    text: "✅ 존재하는 아이디입니다.",
                    confirmButtonText: '확인',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '추천인 확인 결과',
                    text: "❌ 존재하지 않는 아이디입니다.",
                    confirmButtonText: '확인',
                });
            }
        }
    }
    
    useEffect(() => {
        const load = async() => {
            const result = await api.get('/data/terms.json');
            setTermList(result.data.terms);
        }
        load();
    }, [])

    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <div className='essential'><span className='red-star'>* </span>필수입력사항</div>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <ul className='part id'>
                            <li className='left'><span>아이디</span><span className='red-star'>* </span></li>
                            <li>
                                <input className="input-field" type="text" placeholder='아이디를 입력해주세요' name='userId' value={form.userId} ref={refs.userIdRef} onChange={handleChangeForm} />
                                <button className="btn" type="button" name='userId' value={form.userId} onClick={handleIdCheck}>아이디 확인</button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className='part pwd'>
                            <li className='left'><span>비밀번호</span><span className='red-star'>* </span></li>
                            <li><input className="input-field" type="password" placeholder='비밀번호를 입력해주세요' name='password' value={form.password} ref={refs.passwordRef} onChange={handleChangeForm} /></li>
                        </ul>
                    </li>
                    <li>
                        <ul className='part pwd'>
                            <li className='left'><span>비밀번호확인</span><span className='red-star'>* </span></li>
                            <li><input className="input-field" type="password" placeholder='비밀번호를 한번 더 입력해주세요' name='cpwd' value={form.cpwd} ref={refs.cpwdRef} onChange={handleChangeForm} /></li>
                        </ul>
                    </li>
                    <li>
                        <ul className='part name'>
                            <li className='left'><span>이름</span><span className='red-star'>* </span></li>
                            <li><input className="input-field" type="text" placeholder='이름을 입력해주세요' name='name' value={form.name} ref={refs.nameRef} onChange={handleChangeForm} /></li>
                        </ul>
                    </li>
                    <li>
                        <ul className='part email'>
                            <li className='left'><span>이메일</span><span className='red-star'>* </span></li>
                            <li className='email-middle'>
                                <input className="input-field" type="text" placeholder='예:marketcandy' name='emailName' value={form.emailName} ref={refs.emailNameRef} onChange={handleChangeForm} />
                                {
                                    form.emailDomain === ""
                                    ? <input className="input-field domain-input" type="text" placeholder='@직접 입력' name='emailDomainInput' value={form.emailDomainInput} ref={refs.emailDomainInputRef} onChange={handleChangeForm} />
                                    : <input className="input-field domain-input" type="text" name='emailDomain' value={form.emailDomain} ref={refs.emailDomainRef} onChange={handleChangeForm} readOnly/>
                                }
                                
                                <select className="input-field domain" name='emailDomain' value={form.emailDomain} ref={refs.emailDomainRef} onChange={handleChangeForm} >
                                    <option value="선택하기">선택하기</option>
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
                            <li><input className="input-field" type="text" maxLength={11} placeholder='숫자만 입력해주세요' name='phone' value={form.phone} ref={refs.phoneRef} onChange={handleChangeForm} /></li>
                            <li className='phone-btn'>
                                <button className="btn" type="button">인증번호 받기</button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className='part address'>
                            <li className='left'><span>주소</span></li>
                            {userFullAddress === "" 
                            ?
                            <li className='middle'>
                                <div className='btn-address'><button className="btn btn-address" type="button" onClick={handleClick}>주소 검색</button></div>
                                <span>배송지에 따라 상품 정보가 달라질 수 있습니다.</span>
                            </li>
                            : 
                            <>
                            <li className='address-hide'>
                                <input className="input-field" type="text" placeholder={userFullAddress} name='address' value={userFullAddress} ref={refs.addressRef} onChange={handleChangeForm} readOnly/>
                                <input className="input-field" type="text" placeholder='나머지 주소를 입력해주세요' name='addressDetail' value={form.addressDetail} ref={refs.addressDetailRef} onChange={handleChangeForm} />
                            </li>
                            <li className='phone-btn'>
                                <button className="btn" type="button" onClick={handleClick}>재검색</button>
                            </li>
                            </>
                            }
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
                                        <input type="radio" name="gender" className='genderButton' value='M' ref={refs.genderRef} onChange={handleChangeForm}/>
                                    </div>
                                    <div>
                                        <span>남자</span>
                                    </div>
                                </div>
                                <div className='genderList'>
                                    <div>
                                        <input type="radio" name="gender" className='genderButton' value='F' ref={refs.genderRef} onChange={handleChangeForm}/>
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
                                <div className="date-wrapper">
                                    <input className="date-input" type="text" maxLength={4} placeholder='YYYY' 
                                        name='dateYear' value={form.dateYear} ref={refs.dateYearRef} onChange={handleChangeForm} />

                                    <span className="date-slash">/</span>

                                    <input className="date-input" type="text" maxLength={2} placeholder='MM' 
                                        name='dateMonth' value={form.dateMonth} ref={refs.dateMonthRef} onChange={handleChangeForm} />

                                    <span className="date-slash">/</span>

                                    <input className="date-input" type="text" maxLength={2} placeholder='DD' 
                                        name='dateDay' value={form.dateDay} ref={refs.dateDayRef} onChange={handleChangeForm} />
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className='part plus'>
                            <li><span className='left'>추가입력 사항</span></li>
                            <li className='middle'>
                                <input type="radio" onClick={() => setIsPlusAfter(false)}/>
                                <span>친구초대 추천인 아이디</span>
                                {isPlusAfer
                                ? <></>
                                :   <div className='plusAfter'>
                                        <div className='plusAfterMain'>
                                            <input className="input-field" type="text" placeholder='추천인 아이디 입력' name='recommendation' value={form.recommendation} ref={refs.recommendationRef} onChange={handleChangeForm} />
                                            <button className="btn" type="button" name='recommendation' value={form.recommendation} onClick={handleIdCheck}>아이디 확인</button>
                                        </div>
                                        <div className='plusAfterSub'>
                                            <div><span>가입 후 7일 이내 첫 주문 배송완료 시, 친구초대 적립금이 지급됩니다.</span></div>
                                            <div><span>ID 입력시, 대소문자 및 띄어쓰기에 유의 부탁드립니다.</span></div>
                                            <div><span>가입 이후는 수정이 불가능합니다.</span></div>
                                        </div>
                                    </div>
                                }
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
                                        <input type="checkbox" name="all" checked={agree.all} onChange={handleAllAgree} />
                                        <h3>전체 동의합니다.</h3>
                                    </div>
                                    <div>
                                        <span>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</span>
                                    </div>
                                </div>
                                {termList && termList.map((item, index) => 
                                <div key={index}>
                                    <div>
                                        <input type="checkbox" name={item.id} checked={agree[item.id]} onChange={handleAgreeChange} />
                                        <span>{item.title}</span>
                                        <span> ({item.importance})</span>
                                    </div>
                                    <div className='agree-hover-area' onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)}>
                                        <span className='agree-text'>약관보기</span>
                                        {hoveredId === item.id && (
                                            <div className="agree-box">
                                                <h4 className="agree-title">이용약관 동의(필수)</h4>
                                                <ol className="agree-list">
                                                {item.content.map((contentItem, index) => 
                                                    <div className='term-total' key={index}>
                                                        <li className='term-title'>{contentItem.title}</li>
                                                        <li className='term-body'>{contentItem.body}</li>
                                                    </div>
                                                )}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                </div>)
                                }
                                <div className='agreeBenefit'>
                                    <div>
                                        <input type="checkbox" name="benefit" checked={agree.benefit} onChange={handleAgreeChange} />
                                        <span>무료배송, 할인쿠폰 등 해택/정보 수신 동의 </span>
                                        <span>(선택)</span>
                                        <div className='sns'>
                                            <div>
                                                <input type="checkbox" name="sms" checked={agree.sms} onChange={handleAgreeChange} />
                                                <span>SMS</span>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="email" checked={agree.email} onChange={handleAgreeChange} />
                                                <span>이메일</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <input type="checkbox" name="age" checked={agree.age} onChange={handleAgreeChange} />
                                        <span>본인은 만 14세 이상입니다 </span>
                                        <span>(필수)</span>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li><button className="btn-submit" type="submit">가입하기</button></li>
                </ul>
            </form>
        </div>
    );
}