import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getKakaoPayment, getNaverPayment } from './paymentAPI.js';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { AddressModal } from './AddressModal';
import { parseJwt } from "features/auth/parseJwt";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./CheckOut.css";


export function CheckOut() {
    const cartList = useSelector((state) => state.cart.cartList);
    const [reduceCartList, setReduceCartList] = useState([]);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const totalDcPrice = useSelector((state) => state.cart.totalDcPrice);
    const [isChange,setIsChange] = useState(true);
    const [userId, setUserId] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [selectCoupon, setSelectCoupon] = useState(0);
    const [couponId, setCouponId] = useState(0);
    const [agree, setAgree] = useState({terms:false, privacy:false});

    // ✅ 결제 수단 상태 추가
    const [paymentMethod, setPaymentMethod] = useState("kakao");

    const [receiver, setReceiver] = useState({
        name: "홍길동",
        phone: "010-1234-1234",
        address1: "서울시 강남구 역삼동",
        address2: "1동 101호",
        zipcode: "12345",
        memo: "문앞에 놔주세요"
    });

    const [paymentInfo, setPaymentInfo] = useState({
        shippingFee: "0",
        discountAmount: totalDcPrice,
        totalAmount: totalPrice - totalDcPrice
    });

    useEffect(() => {
        setReceiver({
            name: cartList[0].user.name,
            phone: cartList[0].user.phone,
            address1: cartList[0].user.address,
            address2: "",
            zipcode: cartList[0].user.zonecode,
            memo: "문앞에 놔주세요"
        });
        setUserZoneCode(cartList[0].user.zonecode);
    }, [])

    useEffect(() => {
        const stored = localStorage.getItem("loginInfo");
        if (stored) {
            const { accessToken } = JSON.parse(stored);
            const payload = parseJwt(accessToken);
        
            setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
        }

        if (!userId) return;

        const fetchCoupons = async () => {
            try {
                // 🔥 loginInfo 안에서 token 가져오기
                const stored = localStorage.getItem("loginInfo");
                const parsed = stored ? JSON.parse(stored) : null;
                const token = parsed?.token || null;

                const res = await axios.get(`/coupon/my/${userId}`);

                const couponList = res.data.filter(item => item.isUsed === false)

                setCoupons(Array.isArray(couponList) ? couponList : []);
            } catch (err) {
                console.error("쿠폰 조회 실패:", err);
            }
        };

        fetchCoupons();
    }, [userId]);

    // 상품 갯수가 0인 상품 제외
    useEffect( ()=> {
        setReduceCartList(cartList.filter(cart => cart.product.count !== 0));
    },[]);

    const handleChangeAgree = (e) => {
        const {name, checked} = e.target;
        setAgree({...agree, [name]:checked});
    }

    /** ✅ 결제 실행 */
    const handlePayment = async () => {
        if(!agree.terms || !agree.privacy){
            Swal.fire({
                icon: 'error',
                title: '결제하기 실패',
                text: '❌ 결제 약관에 동의해주세요.',
                confirmButtonText: '확인',
            });
            return;
        }
        if (paymentMethod === "kakao") {
            await getKakaoPayment(receiver, paymentInfo, reduceCartList, couponId);
        } else if (paymentMethod === "naver") {
            await getNaverPayment(receiver, paymentInfo, reduceCartList, couponId);
        }
    };

    const handleChange = () => {
        setIsChange(!isChange);
    }

    const handleChangeValue = (e) => {
        const {name, value} = e.target;
        setReceiver({...receiver, [name]:value})
    }

    
    const [userFullAddress, setFullAddress] = useState(cartList[0].user.address); //유저 주소
    const [userZoneCode, setUserZoneCode] = useState(""); //유저 우편번호
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
        setUserZoneCode(zonecode);
        setReceiver({...receiver, "address1": fullAddress, "zipcode": zonecode});
    };
    
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleSelectAddress = (order) => {
        console.log(order);
        setUserZoneCode(order.zipcode);
        setFullAddress(order.address1);
        setReceiver({
            "name": order.receiverName,
            "phone": order.receiverPhone,
            "address1": order.address1,
            "address2": order.address2,
            "zipcode": order.zipcode,
            "memo": order.memo
        })
    }

    const handleChangeCoupon = (e) => {
        const {value} = e.target;
        setCouponId(value);

        if(value === "0") {
            setSelectCoupon(0);
            return;
        }
        const selected = coupons.find(c => c.id == value);
        const dcRate = selected.coupon.couponDcRate;
        const finalPrice = Math.round((totalPrice - totalDcPrice)*dcRate*0.01);

        if(dcRate === 30) {
            finalPrice >= 15000 
            ? setSelectCoupon(15000)
            : setSelectCoupon(finalPrice);
        } else if(dcRate === 50) {
            finalPrice >= 5000
            ? setSelectCoupon(5000)
            : setSelectCoupon(finalPrice) 
        } else if(dcRate === 60) {
            finalPrice >= 10000
            ? setSelectCoupon(10000)
            : setSelectCoupon(finalPrice)
        }
    }

    return (
        <div className="checkout-container">
            <h2 className="checkout-header">주문/결제</h2>

            {/* 🟢 구매자 정보 */}
            <div className="section">
                <h2 className="section-title">구매자정보</h2>
                <div className="info-box">
                    <div className="info-grid">
                        <div className="label">이름</div>
                        <div className="value">{cartList[0].user.name}</div>

                        <div className="label">이메일</div>
                        <div className="value">{cartList[0].user.email}</div>

                        <div className="label">휴대폰 번호</div>
                        <div className="value phone-input">
                            <input type="text" value={cartList[0].user.phone} readOnly />
                        </div>
                    </div>
                </div>
            </div>

            {/* 🟢 받는사람 정보 */}
            <div className="section">
                <h2 className="section-title">
                    받는사람정보 &nbsp;&nbsp;&nbsp;
                    {isChange ?
                    <button className='btn' onClick={handleChange}>배송지 변경</button>
                    :
                    <div className='section-btn-group'>
                        <button className='btn' onClick={() => setIsOpen(true)}>최근 주소</button>
                        {isOpen && <AddressModal onClose={() => setIsOpen(false)} onSelectAddress={handleSelectAddress} />}
                        <button className='btn' onClick={handleChange}>수정</button>
                    </div>
                    }
                </h2>
                {isChange ?
                    <div className="info-box">
                        <div className="info-grid">
                            <div className="label">이름</div>
                            <div className="value">{receiver.name}</div>

                            <div className="label">배송주소</div>
                            <div className="value">
                               {userFullAddress} {receiver.address2} ({userZoneCode})
                            </div>

                            <div className="label">연락처</div>
                            <div className="value">{receiver.phone}</div>

                            <div className="label">배송 요청사항</div>
                            <div className="value">{receiver.memo}</div>
                        </div>
                    </div>
                :
                    <div className="info-box">
                        <div className="info-grid">
                            <div className="label">이름</div>
                            <div className="value phone-input">
                                <input type="text" name='name' onChange={handleChangeValue} value={receiver.name} />
                            </div>
                            <div className="label">배송주소</div>
                            <div className="value phone-input">
                                <input type="text" name='address1' value={userFullAddress} onClick={handleClick} readOnly/>
                                <input type="text" name='address2' onChange={handleChangeValue} value={receiver.address2} />
                            </div>
                            <div className="label">연락처</div>
                            <div className="value phone-input">
                                <input type="text" name='phone' onChange={handleChangeValue} value={receiver.phone} />
                            </div>
                            <div className="label">배송 요청사항</div>
                            <div className="value phone-input">
                                <input type="text" name='memo' onChange={handleChangeValue} value={receiver.memo} />
                            </div>
                        </div>
                    </div>
                }
            </div>

            {/* 🟢 주문 상품 */}
            <div className="section order-section">
                <h2 className="section-title">주문 상품</h2>
                <div className="info-box">
                    <div className="info-grid order-info-grid">
                        {reduceCartList.map((item) => 
                            <div key={item.cid} className="value">
                                <img src={`/images/productImages/${item.product.imageUrl}`} alt="product" style={{ width: '35px' }} />
                                {item.product.productName}, 수량({item.qty}), 가격({(item.product.price*(100-item.product.dc)*0.01*item.qty).toLocaleString()}원)
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 🟢 결제정보 */}
            <div className="section">
                <h2>결제정보</h2>
                <table className="payment-table">
                    <tbody>
                        <tr>
                            <td>총상품가격</td>
                            <td></td>
                            <td className="price">{totalPrice.toLocaleString()}원</td>
                        </tr>
                        <tr>
                            <td>즉시할인</td>
                            <td></td>
                            <td className="discount">-{totalDcPrice.toLocaleString()}원</td>
                        </tr>
                        <tr>
                            <td>쿠폰할인</td>
                            <td className="coupon" onChange={handleChangeCoupon}>
                                {coupons.length === 0 ? <div>사용 가능한 쿠폰이 없습니다.</div> :
                                <>
                                    <select className="couponList">
                                        <option value="0">쿠폰 사용 안함</option>
                                        {coupons.map(coupon =>
                                            <option value={coupon.id}>{coupon.coupon.couponDcRate}% 할인 쿠폰</option>
                                        )}
                                    </select>
                                </>
                                }
                            </td>
                            <td className='discount'>-{selectCoupon.toLocaleString()}원</td>
                        </tr>
                        <tr className="total">
                            <td>총결제금액</td>
                            <td></td>
                            <td className="total-price">{(totalPrice - totalDcPrice - selectCoupon).toLocaleString()}원</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 🟢 결제 수단 선택 */}
            <div className="section">
                <h2>결제 수단</h2>

                <div className="payment-method">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="payment"
                            value="kakao"
                            checked={paymentMethod === "kakao"}
                            onChange={() => setPaymentMethod("kakao")}
                        />{" "}
                        카카오페이
                    </label>
                </div>

                <div className="payment-method">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="payment"
                            value="naver"
                            checked={paymentMethod === "naver"}
                            onChange={() => setPaymentMethod("naver")}
                        />{" "}
                        네이버페이
                    </label>
                </div>
            </div>

            {/* 약관 */}
            <div className="terms">
                <input type="checkbox" name="terms" checked={agree.terms} onChange={handleChangeAgree}/>
                <label htmlFor="terms">구매조건 확인 및 결제대행 서비스 약관 동의</label>
                <br />
                <input type="checkbox" name="privacy" checked={agree.privacy} onChange={handleChangeAgree}/>
                <label htmlFor="privacy">개인정보 국외 이전 동의</label>
            </div>

            <button className="pay-button" onClick={handlePayment}>
                결제하기
            </button>
        </div>
    );
}