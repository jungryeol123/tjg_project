// pages/coupon/CouponList.jsx

export function CouponButtons({ userId, couponList, issuedCoupons, onIssue }) {
  return (
    <div style={{ textAlign: "center", padding: "30px 0" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {couponList.map((coupon) => {
          const already = issuedCoupons.includes(coupon.couponId);

          return (
            <li key={coupon.couponId} style={{ marginBottom: "20px" }}>
              <button
                onClick={() => onIssue(coupon.couponId)}
                disabled={!userId || already}
                style={{
                  padding: "12px 25px",
                  fontSize: "18px",
                  borderRadius: "8px",
                  cursor: already ? "not-allowed" : "pointer",
                  width: "200px",
                  border: "none",
                  fontWeight: "bold",
                  backgroundColor: already ? "#c5c5c5" : "#4949b1ff",
                  color: "#fff",
                }}
                onMouseOver={(e) => {
                  if (!already) e.currentTarget.style.backgroundColor = "#3a3a98";
                }}
                onMouseOut={(e) => {
                  if (!already) e.currentTarget.style.backgroundColor = "#4949b1ff";
                }}
              >
                {already
                  ? "이미 발급됨"
                  : `${coupon.couponDcRate}% 쿠폰 받기`}
              </button>
            </li>
          );
        })}
      </ul>

      {!userId && (
        <p style={{ color: "red" }}>로그인 후 쿠폰을 받을 수 있습니다.</p>
      )}
    </div>
  );
}
