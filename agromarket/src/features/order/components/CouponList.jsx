export function CouponList({ coupons, onDelete }) {
  return (
    <ul className="mypage-couponList">
      {coupons.map((c) => (
        <li key={c.id} className="mypage-couponItem">
          <span>
            <b>{c.coupon.couponDcRate}% 할인 쿠폰</b> — 수량: {c.qty}
          </span>
          <button className="mypage-deleteBtn" onClick={() => onDelete(c.coupon.couponId)}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
