// features/coupon/components/CouponButton.jsx

export function CouponButton({ coupon, issued, onClick }) {
  const disabled = issued;

  const baseStyle = {
    padding: "12px 25px",
    fontSize: "18px",
    borderRadius: "8px",
    width: "200px",
    border: "none",
    fontWeight: "bold",
    cursor: disabled ? "not-allowed" : "pointer",
    backgroundColor: disabled ? "#c5c5c5" : "#4949b1ff",
    color: "#fff",
    transition: "0.2s ease",
  };

  return (
    <button
      style={baseStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseOver={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#3a3a98";
      }}
      onMouseOut={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#4949b1ff";
      }}
    >
      {disabled ? "이미 발급됨" : `${coupon.rate}% 쿠폰 받기`}
    </button>
  );
}
