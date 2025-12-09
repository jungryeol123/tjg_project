// features/cart/components/CartSummary.jsx
export function CartSummary({ totalPrice, totalDcPrice, shippingFee, goCheckout }) {
  const finalPrice = totalPrice - totalDcPrice + shippingFee;

  return (
    <div className="cart-right">
      <div className='cart-summary'>
        <h3>주문 예상 금액</h3>

        <div className='cart-summary-sub'>
          <p className='cart-total'>
            <label>총 상품 가격 :</label>
            <span>{totalPrice.toLocaleString()}원</span>
          </p>
          <p className='cart-total'>
            <label>총 할인 가격 :</label>
            <span>{totalDcPrice.toLocaleString()}원</span>
          </p>
          <p className='cart-total'>
            <label>총 배송비 :</label>
            <span>{totalPrice === 0 ? 0 : shippingFee.toLocaleString()}원</span>
          </p>
        </div>

        <p className='cart-total2'>
          <label>총 금액 :</label>
          <span>{totalPrice === 0 ? 0 : finalPrice.toLocaleString()}원</span>
        </p>
      </div>

      <div className='cart-actions'>
        <button onClick={goCheckout} disabled={totalPrice === 0}>
          주문하기
        </button>
      </div>
    </div>
  );
}
