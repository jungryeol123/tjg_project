// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import "./cart.css";
// import "./checkoutinfo.css";
// import { getPayment } from './paymentAPI.js';

// export function CheckoutInfo() {
//     const cartList = useSelector((state) => state.cart.cartList);
//     const totalPrice = useSelector((state) => state.cart.totalPrice);
//     const totalDcPrice = useSelector((state) => state.cart.totalDcPrice);
//     const cidList = useSelector((state) => state.cart.cidList);
//     // const name = cartList[0].mname;
//     // const phone = cartList[0].phone;
//     // const email = cartList[0].email;
//     const [receiver, setReceiver] = useState({
//             "name": "홍길동",
//             "phone": "010-1234-1234",
//             "zipcode": "12345",
//             "address1": "서울시 강남구 역삼동",
//             "address2": "123",
//             "memo": "문앞"
//         });
//     const [paymentInfo, setPaymentInfo] = useState({
//             "shippingFee": "0",
//             "discountAmount": "0",
//             "totalAmount": totalPrice
//         });

//   /** payment */
//   const handlePayment = async() => {
//       const result = await getPayment(receiver, paymentInfo, cartList);
//   }

// return (
//     <div className="cart-container">
//     <h2 className="cart-header"> 주문/결제</h2>
//     <div className="section">
//         {/* 구매자 정보 */}
//         <h2 className="section-title">구매자정보</h2>
//         <div className="info-box">
//         <div className="info-grid">
//             <div className="label">이름</div>
//             <div className="value">{cartList[0].user.name}</div>

//             <div className="label">이메일</div>
//             <div className="value">{cartList[0].user.email}</div>

//             <div className="label">휴대폰 번호</div>
//             <div className="value phone-input">
//             <input type="text" value={cartList[0].user.phone} />
//             <button className="btn">수정</button>
//             </div>
//         </div>
//         </div>
//     </div>
//     {/* 받는사람 정보 */}
//     <div className="section">
//         <h2 className="section-title">
//         받는사람정보 &nbsp;&nbsp;&nbsp;
//         <button>배송지 변경</button>
//         </h2>
//         <div className="info-box">
//         <div className="info-grid">
//             <div className="label">이름</div>
//             <div className="value">{receiver.name}</div>

//             <div className="label">배송주소</div>
//             <div className="value">{receiver.zipcode} / {receiver.address1} {receiver.address2}</div>
          
//             <div className="label">연락처</div>
//             <div className="value">{receiver.phone}</div>

//             <div className="label">배송 요청사항</div>
//             <div className="value phone-input">
//             <input type="text" defaultValue={receiver.memo} />
//             <button className="btn">변경</button>
//             </div>
//         </div>
//         </div>
//     </div>

//     {/* 주문 정보 */}
//     <div className="section">
//         <h2 className="section-title">주문 상품</h2>
//         <div className="info-box">
//         <div className="info-grid">
//             { cartList && cartList.map(item => 
//                 <>
//                     <div className="label">상품명</div>
//                     <div className="value">
//                         <img src={`/images/productImages/${item.product.imageUrl}`} alt="product image" style={{width:'35px'}} />
//                         {item.product.productName}, {item.product.description}, 수량({item.qty}), 가격({item.product.price}원)
//                     </div>
//                 </>
//             )}
//         </div>
//         </div>
//     </div>

//     <div class="section">
//         <h2>결제정보</h2>
//         <table class="payment-table">
//         <tr>
//             <td>총상품가격</td>
//             <td class="price">{totalPrice.toLocaleString()}원</td>
//         </tr>
//         <tr>
//             <td>즉시할인</td>
//             <td class="discount">-{totalDcPrice.toLocaleString()}원</td>
//         </tr>
//         <tr>
//             <td>할인쿠폰</td>
//             <td class="coupon">
//             0원 <span class="info">적용 가능한 할인쿠폰이 없습니다.</span>
//             </td>
//         </tr>
//         <tr>
//             <td>배송비</td>
//             <td class="price">0원</td>
//         </tr>
//         <tr>
//             <td>쿠페이캐시</td>
//             <td class="price">
//             0원 <span class="info">보유 : 0원</span>
//             </td>
//         </tr>
//         <tr class="total">
//             <td>총결제금액</td>
//             <td class="total-price">{(totalPrice-totalDcPrice).toLocaleString()}원</td>
//         </tr>
//         </table>
//     </div>

//     <div class="section">
//         <h2>결제 수단</h2>
//         <div class="payment-method">
//             <label class="radio-label">
//                 <input type="radio" name="payment" checked /> 카카오페이
//                 <span class="badge">최대 캐시적립</span>
//             </label>
//         </div>

//         <div class="payment-method">
//         <label class="radio-label">
//             <input type="radio" name="payment" />
//             쿠페이 머니 
//         </label>
//         </div>

//         <div class="payment-method">
//         <label class="radio-label">
//             <input type="radio" name="payment" />
//             다른 결제 수단 <span class="arrow">▼</span>
//         </label>
//         </div>
//     </div>

//     <div class="terms">
//         <input type="checkbox" id="terms"/>
//         <label for="terms">구매조건 확인 및 결제대행 서비스 약관 동의</label>
//         <br />
//         <input type="checkbox" id="privacy" />
//         <label for="privacy">개인정보 국외 이전 동의</label>
//     </div>

//      <button className="pay-button" onClick={handlePayment}>결제하기</button>
//     </div>
// );
// }



import { useState } from 'react';
import { useSelector } from 'react-redux';
import "./cart.css";
import "./checkoutinfo.css";
import { getKakaoPayment, getNaverPayment } from './paymentAPI.js';

export function CheckoutInfo() {
    const cartList = useSelector((state) => state.cart.cartList);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const totalDcPrice = useSelector((state) => state.cart.totalDcPrice);

    // ✅ 결제 수단 상태 추가
    const [paymentMethod, setPaymentMethod] = useState("kakao");

    const [receiver, setReceiver] = useState({
        name: "홍길동",
        phone: "010-1234-1234",
        zipcode: "12345",
        address1: "서울시 강남구 역삼동",
        address2: "123",
        memo: "문앞"
    });

    const [paymentInfo, setPaymentInfo] = useState({
        shippingFee: "0",
        discountAmount: totalDcPrice,
        totalAmount: totalPrice - totalDcPrice
    });

    /** ✅ 결제 실행 */
    const handlePayment = async () => {
        if (paymentMethod === "kakao") {
            await getKakaoPayment(receiver, paymentInfo, cartList);
        } else if (paymentMethod === "naver") {
            await getNaverPayment(receiver, paymentInfo, cartList);
        }
    };

    return (
        <div className="cart-container">
            <h2 className="cart-header">주문/결제</h2>

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
                    <button className='btn'>배송지 변경</button>
                </h2>
                <div className="info-box">
                    <div className="info-grid">
                        <div className="label">이름</div>
                        <div className="value">{receiver.name}</div>

                        <div className="label">배송주소</div>
                        <div className="value">
                            {receiver.zipcode} / {receiver.address1} {receiver.address2}
                        </div>

                        <div className="label">연락처</div>
                        <div className="value">{receiver.phone}</div>

                        <div className="label">배송 요청사항</div>
                        <div className="value phone-input">
                            <input type="text" defaultValue={receiver.memo} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 🟢 주문 상품 */}
            <div className="section order-section">
                <h2 className="section-title">주문 상품</h2>
                <div className="info-box">
                    <div className="info-grid order-info-grid">
                        {cartList.map((item) => (
                            <div key={item.cid} className="value">
                                <img src={`/images/productImages/${item.product.imageUrl}`} alt="product" style={{ width: '35px' }} />
                                {item.product.productName}, 수량({item.qty}), 가격({(item.product.price*(100-item.product.dc)*0.01*item.qty).toLocaleString()}원)
                            </div>
                        ))}
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
                            <td className="price">{totalPrice.toLocaleString()}원</td>
                        </tr>
                        <tr>
                            <td>즉시할인</td>
                            <td className="discount">-{totalDcPrice.toLocaleString()}원</td>
                        </tr>
                        <tr className="total">
                            <td>총결제금액</td>
                            <td className="total-price">{(totalPrice - totalDcPrice).toLocaleString()}원</td>
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
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">구매조건 확인 및 결제대행 서비스 약관 동의</label>
                <br />
                <input type="checkbox" id="privacy" />
                <label htmlFor="privacy">개인정보 국외 이전 동의</label>
            </div>

            <button className="pay-button" onClick={handlePayment}>
                결제하기
            </button>
        </div>
    );
}
