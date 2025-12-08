// src/features/coupon/components/CouponList.jsx

export function CouponList({ couponList, userId, issuedCoupons, onIssue }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {couponList.map((coupon) => {
        const isIssued = issuedCoupons.includes(coupon.id);

        return (
          <li key={coupon.id} style={{ marginBottom: "20px" }}>
            <button
              onClick={() => onIssue(coupon.id)}
              disabled={!userId || isIssued}
              style={{
                padding: "12px 25px",
                fontSize: "18px",
                borderRadius: "8px",
                width: "200px",
                border: "none",
                fontWeight: "bold",
                cursor: isIssued ? "not-allowed" : "pointer",
                backgroundColor: isIssued ? "#c5c5c5" : "#4949b1ff",
                color: "#fff",
              }}
            >
              {isIssued ? "이미 발급됨" : `${coupon.rate}% 쿠폰 받기`}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
