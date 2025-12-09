// pages/myPage/MyCouponList.jsx

export function MyCouponList({ coupons, onDelete }) {
  if (!coupons.length) {
    return <p>받은 쿠폰이 없습니다.</p>;
  }

  return (
    <ul className="mypage-couponList">
      {coupons.map((item) => (
        <li key={item.id} className="mypage-couponItem">
          <span>
            <b>{item.coupon.couponDcRate}% 할인 쿠폰</b> — 수량: {item.qty}
          </span>
          
          <button
            className="mypage-deleteBtn"
            onClick={() => onDelete(item.coupon.couponId)}
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
