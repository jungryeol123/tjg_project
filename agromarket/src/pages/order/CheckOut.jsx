import "./CheckOut.scss";

import BuyerInfo from "features/order/components/BuyerInfo";
import ReceiverInfo from "features/order/components/ReceiverInfo";
import OrderItemList from "features/order/components/OrderItemList";
import PaymentInfo from "features/order/components/PaymentInfo";
import PaymentMethod from "features/order/components/PaymentMethod";
import TermsAgree from "features/order/components/TermsAgree";
import PayButton from "features/order/components/PayButton";

import useCheckOutData from "features/order/hooks/useCheckOutData";

export function CheckOut() {

    const checkout = useCheckOutData();

    if (checkout.loading) {
        return (
            <div className="checkout-container">장바구니 정보를 불러오는 중입니다...</div>
        );
    }

    return (
        <div className="checkout-container">
            <h2 className="checkout-header">주문/결제</h2>

            <BuyerInfo user={checkout.user} />

            <ReceiverInfo
                receiver={checkout.receiver}
                setReceiver={checkout.setReceiver}
                userFullAddress={checkout.userFullAddress}
                userZoneCode={checkout.userZoneCode}
                isChange={checkout.isChange}
                setIsChange={checkout.setIsChange}
                isOpen={checkout.isOpen}
                setIsOpen={checkout.setIsOpen}
                handleClick={checkout.handleClick}
                handleSelectAddress={checkout.handleSelectAddress}
                handleChangeValue={checkout.handleChangeValue}
            />

            <OrderItemList reduceCartList={checkout.reduceCartList} />

            <PaymentInfo
                totalPrice={checkout.totalPrice}
                totalDcPrice={checkout.totalDcPrice}
                shippingFee={checkout.shippingFee}
                coupons={checkout.coupons}
                selectCoupon={checkout.selectCoupon}
                handleChangeCoupon={checkout.handleChangeCoupon}
            />

            <PaymentMethod
                paymentMethod={checkout.paymentMethod}
                setPaymentMethod={checkout.setPaymentMethod}
            />

            <TermsAgree
                agree={checkout.agree}
                handleChangeAgree={checkout.handleChangeAgree}
            />

            <PayButton handlePayment={checkout.handlePayment} />
        </div>
    );
}
