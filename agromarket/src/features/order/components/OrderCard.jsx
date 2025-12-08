export function OrderCard({ order, onDelete, onAddCart, navigate }) {

  // 🔒 order 또는 order.orderDetails 안전하게 처리
  const details = Array.isArray(order?.orderDetails) ? order.orderDetails : [];

  return (
    <div className="mypage-card">
      <div className="mypage-body">
        <div className="mypage-order-title">
          <h4>📦 주문 상품</h4>
          <div className="mypage-order-date">
            <b>주문일자:</b> {new Date(order.odate).toLocaleString()}
            <p><b>주문 번호:</b> {order.orderCode}</p>
          </div>
        </div>

        <ul>
          {details.map((item) => (
            <li key={item.id} className="mypage-product-list">
              <div className="mypage-product-img-container">
                <img
                  className="mypage-product-img"
                  src={`/images/productImages/${item.product?.imageUrl}`}
                  alt=""
                />
                {item.product?.count === 0 && (
                  <div className="sold-out">SOLD OUT</div>
                )}
              </div>

              <div className="mypage-product-info">
                <div>{item.productName}</div>
                {item.price.toLocaleString()}원 · <b>{item.qty}</b>개
              </div>

              <div className="mypage-btn">
                <button onClick={() => navigate(`/products/${item.ppk}`)}>
                  상품 바로가기
                </button>
                <button
                  disabled={item.product?.count === 0}
                  onClick={() => onAddCart(item)}
                >
                  장바구니
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mypage-info">
          <p><b>수령인:</b> {order.receiverName} / {order.receiverPhone}</p>
          <p><b>주소:</b> {order.address1} {order.address2} ({order.zipcode})</p>
          <p><b>결제 금액:</b> {order.totalAmount.toLocaleString()}원</p>
        </div>
      </div>

      <button
        className="mypage-deleteBtn"
        onClick={() => onDelete(order.orderCode)}
      >
        삭제
      </button>
    </div>
  );
}
