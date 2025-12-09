// import Swal from 'sweetalert2';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useMemo, useState } from 'react';
// import { useDaumPostcodePopup } from 'react-daum-postcode';
// // features
// import { parseJwt } from "features/auth/parseJwt";
// import { AddressModal } from 'features/order/AddressModal.jsx';
// import { getKakaoPayment, getNaverPayment } from 'features/order/paymentAPI';
// import { showCart } from 'features/cart/cartAPI';
// // shared
// import { api } from 'shared/lib/axios.js';
// import "./CheckOut.scss";

// export function CheckOut() {

//     const cartList = useSelector((state) => state.cart.cartList);
//     const totalPrice = useSelector((state) => state.cart.totalPrice);
//     const totalDcPrice = useSelector((state) => state.cart.totalDcPrice);
//     const shippingFee = useSelector((state) => state.cart.shippingFee);
//     const dispatch = useDispatch();
//     // ⭐ 이 자리에 early return 넣으면 Hook 규칙 깨짐 → 절대 금지!
//     // if (!cartList || cartList.length === 0) return ...
//     // -----------------------------
//     // 💡 모든 Hook은 조건 없이 항상 호출
//     // -----------------------------
//     const [reduceCartList, setReduceCartList] = useState([]);
//     const [isChange, setIsChange] = useState(true);
//     const [userId, setUserId] = useState(null);
//     const [coupons, setCoupons] = useState([]);
//     const [selectCoupon, setSelectCoupon] = useState(0);
//     const [couponId, setCouponId] = useState(0);
//     const [agree, setAgree] = useState({ terms: false, privacy: false });

//     const [paymentMethod, setPaymentMethod] = useState("kakao");

//     const [receiver, setReceiver] = useState({
//         name: cartList?.[0]?.user?.name || "",
//         phone: cartList?.[0]?.user?.phone || "",
//         address1: cartList?.[0]?.user?.address || "",
//         address2: "",
//         zipcode: cartList?.[0]?.user?.zonecode || "",
//         memo: "문앞에 놔주세요"
//     });

//     const paymentInfo = useMemo(() => ({
//         shippingFee: shippingFee,
//         discountAmount: totalDcPrice,
//         totalAmount: totalPrice - totalDcPrice - selectCoupon + shippingFee
//     }), [selectCoupon]);


//     const [userFullAddress, setFullAddress] = useState(cartList?.[0]?.user?.address || "");
//     const [userZoneCode, setUserZoneCode] = useState(cartList?.[0]?.user?.zonecode || "");

//     const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

//     // -----------------------------
//     // ⭐ cartList 준비되면 초기 데이터 세팅
//     // -----------------------------
//     useEffect(() => {
//         if (cartList?.length > 0 && cartList[0].user) {
//             setReceiver({
//                 name: cartList[0].user.name,
//                 phone: cartList[0].user.phone,
//                 address1: cartList[0].user.address,
//                 address2: "",
//                 zipcode: cartList[0].user.zonecode,
//                 memo: "문앞에 놔주세요"
//             });
//             setUserZoneCode(cartList[0].user.zonecode);
//             setFullAddress(cartList[0].user.address);
//         }
//     }, [cartList]);

//     // -----------------------------
//     // ⭐ 쿠폰 조회
//     // -----------------------------
//     useEffect(() => {
//         const stored = localStorage.getItem("loginInfo");
//         if (stored) {
//             const { accessToken } = JSON.parse(stored);
//             const payload = parseJwt(accessToken);
//             setUserId(payload.id);
//             dispatch(showCart(payload.id));
//         }

//         if (!userId) return;

//         const loadCoupons = async () => {
//             try {
//                 const res = await api.get(`/coupon/my/${userId}`);
//                 const couponList = res.data.filter(item => !item.isUsed);
//                 setCoupons(couponList);
//             } catch (err) {
//                 console.error("쿠폰 조회 실패:", err);
//             }
//         };

//         loadCoupons();
//     }, [userId]);

//     // -----------------------------
//     // ⭐ 0개 상품 제외
//     // -----------------------------
//     useEffect(() => {
//         setReduceCartList(cartList?.filter(cart => cart.product.count !== 0) || []);
//     }, [cartList]);

//     const handleChangeAgree = (e) => {
//         const { name, checked } = e.target;
//         setAgree(prev => ({ ...prev, [name]: checked }));
//     };

//     // -----------------------------
//     // ⭐ 결제 실행
//     // -----------------------------
//     const handlePayment = async () => {
//         if (!agree.terms || !agree.privacy) {
//             Swal.fire({
//                 icon: 'error',
//                 title: '결제하기 실패',
//                 text: '❌ 결제 약관에 동의해주세요.',
//                 confirmButtonText: '확인',
//             });
//             return;
//         }

//         if (paymentMethod === "kakao") {
//             await getKakaoPayment(receiver, paymentInfo, reduceCartList, couponId);
//         } else {
//             await getNaverPayment(receiver, paymentInfo, reduceCartList, couponId);
//         }
//     };

//     const handleChangeValue = (e) => {
//         const { name, value } = e.target;
//         setReceiver(prev => ({ ...prev, [name]: value }));
//     };

//     // -----------------------------
//     // ⭐ 주소 변경
//     // -----------------------------
//     const handleComplete = (data) => {
//         let fullAddress = data.address;
//         let zonecode = data.zonecode;

//         if (data.addressType === "R") {
//             fullAddress += data.bname ? ` (${data.bname})` : "";
//             fullAddress += data.buildingName ? `, ${data.buildingName}` : "";
//         }

//         setFullAddress(fullAddress);
//         setUserZoneCode(zonecode);
//         setReceiver(prev => ({ ...prev, address1: fullAddress, zipcode: zonecode }));
//     };

//     const handleClick = () => {
//         open({ onComplete: handleComplete });
//     };

//     const [isOpen, setIsOpen] = useState(false);

//     const handleSelectAddress = (order) => {
//         setUserZoneCode(order.zipcode);
//         setFullAddress(order.address1);
//         setReceiver({
//             name: order.receiverName,
//             phone: order.receiverPhone,
//             address1: order.address1,
//             address2: order.address2,
//             zipcode: order.zipcode,
//             memo: order.memo
//         });
//     };

//     const handleChangeCoupon = (e) => {
//         const { value } = e.target;
//         setCouponId(value);

//         if (value === "0") {
//             setSelectCoupon(0);
//             return;
//         }

//         const selected = coupons.find(c => c.id == value);
//         const dcRate = selected.coupon.couponDcRate;
//         const finalPrice = Math.round((totalPrice - totalDcPrice) * dcRate * 0.01);

//         if (dcRate === 30) setSelectCoupon(finalPrice >= 15000 ? 15000 : finalPrice);
//         else if (dcRate === 50) setSelectCoupon(finalPrice >= 5000 ? 5000 : finalPrice);
//         else if (dcRate === 60) setSelectCoupon(finalPrice >= 10000 ? 10000 : finalPrice);
//     };

//     // -----------------------------
//     // ⭐ 여기서 조건부 렌더링 처리
//     // -----------------------------
//     if (!cartList || cartList.length === 0) {
//         return (
//             <div className="checkout-container">
//                 장바구니 정보를 불러오는 중입니다...
//             </div>
//         );
//     }

//     // -----------------------------
//     // ⭐ 실제 화면 렌더링
//     // -----------------------------
//     return (
//         <div className="checkout-container">
//             <h2 className="checkout-header">주문/결제</h2>

//             {/* 구매자 정보 */}
//             <div className="section">
//                 <h2 className="section-title">구매자정보</h2>
//                 <div className="info-box">
//                     <div className="info-grid">
//                         <div className="label">이름</div>
//                         <div className="value">{cartList[0]?.user?.name}</div>

//                         <div className="label">이메일</div>
//                         <div className="value">{cartList[0]?.user?.email}</div>

//                         <div className="label">휴대폰 번호</div>
//                         <div className="value phone-input">
//                             <input type="text" value={cartList[0]?.user?.phone || ""} readOnly />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* 받는사람 정보 */}
//             <div className="section">
//                 <h2 className="section-title">
//                     받는사람정보 &nbsp;&nbsp;&nbsp;
//                     {isChange ?
//                         <button className='btn' onClick={() => setIsChange(false)}>배송지 변경</button>
//                         :
//                         <div className='section-btn-group'>
//                             <button className='btn' onClick={() => setIsOpen(true)}>최근 주소</button>
//                             {isOpen && (
//                                 <AddressModal
//                                     onClose={() => setIsOpen(false)}
//                                     onSelectAddress={handleSelectAddress}
//                                 />
//                             )}
//                             <button className='btn' onClick={() => setIsChange(true)}>수정</button>
//                         </div>
//                     }
//                 </h2>

//                 {isChange ? (
//                     <div className="info-box">
//                         <div className="info-grid">
//                             <div className="label">이름</div>
//                             <div className="value">{receiver.name}</div>

//                             <div className="label">배송주소</div>
//                             <div className="value">{userFullAddress} {receiver.address2} ({userZoneCode})</div>

//                             <div className="label">연락처</div>
//                             <div className="value">{receiver.phone}</div>

//                             <div className="label">배송 요청사항</div>
//                             <div className="value">{receiver.memo}</div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="info-box">
//                         <div className="info-grid">
//                             <div className="label">이름</div>
//                             <div className="value phone-input">
//                                 <input type="text" name='name' onChange={handleChangeValue} value={receiver.name} />
//                             </div>
//                             <div className="label">배송주소</div>
//                             <div className="value phone-input">
//                                 <input type="text" name='address1' value={userFullAddress} onClick={handleClick} readOnly />
//                                 <input type="text" name='address2' onChange={handleChangeValue} value={receiver.address2} />
//                             </div>
//                             <div className="label">연락처</div>
//                             <div className="value phone-input">
//                                 <input type="text" name='phone' onChange={handleChangeValue} value={receiver.phone} />
//                             </div>
//                             <div className="label">배송 요청사항</div>
//                             <div className="value phone-input">
//                                 <input type="text" name='memo' onChange={handleChangeValue} value={receiver.memo} />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* 주문 상품 */}
//             <div className="section order-section">
//                 <h2 className="section-title">주문 상품</h2>
//                 <div className="info-box">
//                     <div className="info-grid order-info-grid">
//                         {reduceCartList.map((item) =>
//                             <div key={item.cid} className="value">
//                                 <img src={`/images/productImages/${item.product.imageUrl}`} alt="product" style={{ width: '35px' }} />
//                                 {item.product.productName},
//                                 수량({item.qty?.toLocaleString()}),
//                                 가격({(item.product.price * (100 - item.product.dc) * 0.01 * item.qty)?.toLocaleString()}원)
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* 결제정보 */}
//             <div className="section">
//                 <h2>결제정보</h2>
//                 <table className="payment-table">
//                     <tbody>
//                         <tr>
//                             <td>총상품가격</td>
//                             <td></td>
//                             <td className="price">{totalPrice.toLocaleString()}원</td>
//                         </tr>
//                         <tr>
//                             <td>즉시할인</td>
//                             <td></td>
//                             <td className="discount">-{totalDcPrice.toLocaleString()}원</td>
//                         </tr>
//                         <tr>
//                             <td>쿠폰할인</td>
//                             <td className="coupon" onChange={handleChangeCoupon}>
//                                 {coupons.length === 0 ? (
//                                     <div>사용 가능한 쿠폰이 없습니다.</div>
//                                 ) : (
//                                     <select className="couponList">
//                                         <option value="0">쿠폰 사용 안함</option>
//                                         {coupons.map(coupon =>
//                                             <option key={coupon.id} value={coupon.id}>
//                                                 {coupon.coupon.couponDcRate}% 할인 쿠폰
//                                             </option>
//                                         )}
//                                     </select>
//                                 )}
//                             </td>
//                             <td className='discount'>-{selectCoupon.toLocaleString()}원</td>
//                         </tr>
//                         <tr>
//                             <td>배송비</td>
//                             <td></td>
//                             <td className="price">+{shippingFee.toLocaleString()}원</td>
//                         </tr>

//                         <tr className="total">
//                             <td>총결제금액</td>
//                             <td></td>
//                             <td className="total-price">
//                                 {(totalPrice - totalDcPrice - selectCoupon + shippingFee).toLocaleString()}원
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             {/* 결제 수단 */}
//             <div className="section">
//                 <h2>결제 수단</h2>
//                 <div className="payment-method">
//                     <label className="radio-label">
//                         <input
//                             type="radio"
//                             name="payment"
//                             value="kakao"
//                             checked={paymentMethod === "kakao"}
//                             onChange={() => setPaymentMethod("kakao")}
//                         />
//                         카카오페이
//                     </label>
//                 </div>

//                 <div className="payment-method">
//                     <label className="radio-label">
//                         <input
//                             type="radio"
//                             name="payment"
//                             value="naver"
//                             checked={paymentMethod === "naver"}
//                             onChange={() => setPaymentMethod("naver")}
//                         />
//                         네이버페이
//                     </label>
//                 </div>
//             </div>

//             {/* 약관 */}
//             <div className="terms">
//                 <input type="checkbox" name="terms" checked={agree.terms} onChange={handleChangeAgree} />
//                 <label htmlFor="terms">구매조건 확인 및 결제대행 서비스 약관 동의</label>
//                 <br />
//                 <input type="checkbox" name="privacy" checked={agree.privacy} onChange={handleChangeAgree} />
//                 <label htmlFor="privacy">개인정보 국외 이전 동의</label>
//             </div>

//             <button className="pay-button" onClick={handlePayment}>
//                 결제하기
//             </button>
//         </div>
//     );
// }


import "./CheckOut.scss";

import BuyerInfo from "features/order/components/BuyerInfo";
import ReceiverInfo from "features/order/components/ReceiverInfo";
import OrderItemList from "features/order/components/OrderItemList";
import PaymentInfo from "features/order/components/PaymentInfo";
import PaymentMethod from "features/order/components/PaymentMethod";
import TermsAgree from "features/order/components/TermsAgree";
import PayButton from "features/order/components/PayButton";

import useCheckOutData from "features/order/hooks/useCheckOutData";

export function CheckOut() {

    const checkout = useCheckOutData();

    if (checkout.loading) {
        return (
            <div className="checkout-container">장바구니 정보를 불러오는 중입니다...</div>
        );
    }

    return (
        <div className="checkout-container">
            <h2 className="checkout-header">주문/결제</h2>

            <BuyerInfo user={checkout.user} />

            <ReceiverInfo
                receiver={checkout.receiver}
                setReceiver={checkout.setReceiver}
                userFullAddress={checkout.userFullAddress}
                userZoneCode={checkout.userZoneCode}
                isChange={checkout.isChange}
                setIsChange={checkout.setIsChange}
                isOpen={checkout.isOpen}
                setIsOpen={checkout.setIsOpen}
                handleClick={checkout.handleClick}
                handleSelectAddress={checkout.handleSelectAddress}
                handleChangeValue={checkout.handleChangeValue}
            />

            <OrderItemList reduceCartList={checkout.reduceCartList} />

            <PaymentInfo
                totalPrice={checkout.totalPrice}
                totalDcPrice={checkout.totalDcPrice}
                shippingFee={checkout.shippingFee}
                coupons={checkout.coupons}
                selectCoupon={checkout.selectCoupon}
                handleChangeCoupon={checkout.handleChangeCoupon}
            />

            <PaymentMethod
                paymentMethod={checkout.paymentMethod}
                setPaymentMethod={checkout.setPaymentMethod}
            />

            <TermsAgree
                agree={checkout.agree}
                handleChangeAgree={checkout.handleChangeAgree}
            />

            <PayButton handlePayment={checkout.handlePayment} />
        </div>
    );
}
