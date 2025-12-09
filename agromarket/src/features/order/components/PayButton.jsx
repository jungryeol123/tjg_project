export default function PayButton({ handlePayment }) {
    return (
        <button className="pay-button" onClick={handlePayment}>
            결제하기
        </button>
    );
}
