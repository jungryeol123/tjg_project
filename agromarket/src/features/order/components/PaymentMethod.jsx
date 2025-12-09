export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
    return (
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
                    />
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
                    />
                    네이버페이
                </label>
            </div>
        </div>
    );
}
