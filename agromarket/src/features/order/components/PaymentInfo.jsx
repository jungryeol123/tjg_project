export default function PaymentInfo({
    totalPrice,
    totalDcPrice,
    shippingFee,
    coupons,
    selectCoupon,
    handleChangeCoupon
}) {
    return (
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
                        <td className="coupon">
                            {coupons.length === 0 ? (
                                <div>사용 가능한 쿠폰이 없습니다.</div>
                            ) : (
                                <select className="couponList" onChange={handleChangeCoupon}>
                                    <option value="0">쿠폰 사용 안함</option>
                                    {coupons.map(coupon =>
                                        <option key={coupon.id} value={coupon.id}>
                                            {coupon.coupon.couponDcRate}% 할인 쿠폰
                                        </option>
                                    )}
                                </select>
                            )}
                        </td>
                        <td className='discount'>-{selectCoupon.toLocaleString()}원</td>
                    </tr>

                    <tr>
                        <td>배송비</td>
                        <td></td>
                        <td className="price">+{shippingFee.toLocaleString()}원</td>
                    </tr>

                    <tr className="total">
                        <td>총결제금액</td>
                        <td></td>
                        <td className="total-price">
                            {(totalPrice - totalDcPrice - selectCoupon + shippingFee).toLocaleString()}원
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
