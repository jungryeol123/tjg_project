// features/cart/hooks/useCart.js
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { parseJwt } from "features/auth/parseJwt";
import { removeCart, showCart, updateCart } from "features/cart/cartAPI";

export function useCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartList = useSelector((state) => state.cart.cartList);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalDcPrice = useSelector((state) => state.cart.totalDcPrice);
  const shippingFee = useSelector((state) => state.cart.shippingFee);

  const [userId, setUserId] = useState(null);

  // 로그인한 사용자 ID 추출 + 장바구니 로드
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      setUserId(payload.id);
      dispatch(showCart(payload.id));
    }
  }, []);

  // 수량 업데이트
  const decreaseQty = (item) => {
    if (item.qty > 1) dispatch(updateCart(item.cid, item.qty - 1, userId));
  };

  const increaseQty = (item) => {
    if (item.qty < item.product.count)
      dispatch(updateCart(item.cid, item.qty + 1, userId));
  };

  // 아이템 제거
  const removeItem = (cid) => {
    dispatch(removeCart(cid, userId));
  };

  const goCheckout = () => {
    navigate("/checkout");
  };

  return {
    cartList,
    totalPrice,
    totalDcPrice,
    shippingFee,
    decreaseQty,
    increaseQty,
    removeItem,
    goCheckout,
  };
}
