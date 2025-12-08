// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// // features
// import { parseJwt } from "features/auth/parseJwt";
// import { removeCart, showCart, updateCart } from "features/cart/cartAPI";
// import "./Cart.scss";

// export function Cart() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const cartList = useSelector((state) => state.cart.cartList);
//     const totalPrice = useSelector((state) => state.cart.totalPrice);
//     const totalDcPrice = useSelector((state) => state.cart.totalDcPrice);
//     const shippingFee = useSelector((state) => state.cart.shippingFee);
//     const [userId, setUserId] = useState(null); // ✅ 테스트용 사용자 id (나중엔 토큰으로 대체)

//     useEffect(() => {
//         const stored = localStorage.getItem("loginInfo");
//         if (stored) {
//             const { accessToken } = JSON.parse(stored);
//             const payload = parseJwt(accessToken);
    
//             setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
//             dispatch(showCart(payload.id));
//         }
//     }, [])
    
//     return (
//         <div className='cart-container'>
//             <h2 className='cart-header'>장바구니</h2>
//             <div className="cart-body">
//                 <div className="cart-left">
//                     { cartList && cartList.map(item => 
//                         <div>
//                             <div className='cart-item'>
//                                 <div className="cart-image-container">
//                                     <img src={`/images/productImages/${item.product.imageUrl}`} alt='product img' />
//                                     { item.product.count === 0 && <div class="sold-out">SOLD OUT</div> }
//                                 </div>
//                                 <div className='cart-item-details'>
//                                     <p className='cart-item-title'>{item.product.productName}</p>
//                                     <p className='cart-item-title cart-item-price'>{item.product.price.toLocaleString()}원</p>
//                                     <p className='cart-item-title cart-item-dcprice'>{((item.product.price)*(100-item.product.dc)*0.01).toLocaleString()}원</p>
//                                 </div>
//                                 <div className='cart-quantity'>
//                                     <button type='button' onClick={() => item.qty>1 ? dispatch(updateCart(item.cid, (item.qty-1), userId)) : null}
//                                         disabled={item.product.count === 0}>-</button>
//                                     <input type="text" value={item.qty.toLocaleString()} readOnly/>
//                                     <button type='button' onClick={() => item.qty<item.product.count && dispatch(updateCart(item.cid, (item.qty+1), userId))}
//                                         disabled={item.product.count === 0}>+</button>
//                                 </div>
//                                 <button className='cart-remove' onClick={()=>dispatch(removeCart(item.cid, userId))}>제거</button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 <div className="cart-right">
//                     {/* 주문 버튼 출력 */}
//                     { cartList && cartList.length > 0 ? 
//                         <>
//                             <div className='cart-summary'>
//                                 <h3>주문 예상 금액</h3>
//                                 <div className='cart-summary-sub'>
//                                     <p className='cart-total'>
//                                         <label>총 상품 가격 : </label>
//                                         <span>{totalPrice.toLocaleString()}원</span>
//                                     </p>
//                                     <p className='cart-total'>
//                                         <label>총 할인 가격 : </label>
//                                         <span>{totalDcPrice.toLocaleString()}원</span>
//                                     </p>
//                                     <p className='cart-total'>
//                                         <label>총 배송비 : </label>
//                                         <span>{shippingFee.toLocaleString()}원</span>
//                                     </p>
//                                 </div>
//                                 <p className='cart-total2'>
//                                     <label>총 금액 : </label>
//                                     <span>{(totalPrice - totalDcPrice + shippingFee).toLocaleString()} 원</span>
//                                 </p>
//                             </div>
//                             <div className='cart-actions'>
//                                 <button type='button' onClick={()=>{navigate("/checkout")}}
//                                     disabled={totalPrice - totalDcPrice === 0}>주문하기</button>
//                             </div>
//                         </>
//                         : <div className="cart-empty">
//                             <p> 장바구니에 담은 상품이 없습니다. &nbsp;&nbsp;&nbsp;&nbsp; </p>
//                             <img style={{marginTop:"20px"}} src="/images/emptycart.png" />
//                         </div>
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// }



// pages/cart/CartPage.jsx
import { CartItemList } from "features/cart/components/CartItemList";
import { CartSummary } from "features/cart/components/CartSummary";
import { CartEmpty } from "features/cart/components/CartEmpty";
import "./Cart.scss";
import { useCart } from "features/cart/useCart";

export function Cart() {
  const {
    cartList,
    totalPrice,
    totalDcPrice,
    shippingFee,
    decreaseQty,
    increaseQty,
    removeItem,
    goCheckout,
  } = useCart();

  return (
    <div className='cart-container'>
      <h2 className='cart-header'>장바구니</h2>
      <div className="cart-body">

        {cartList.length > 0 ? (
          <>
            <CartItemList
              cartList={cartList}
              decreaseQty={decreaseQty}
              increaseQty={increaseQty}
              removeItem={removeItem}
            />
            <CartSummary
              totalPrice={totalPrice}
              totalDcPrice={totalDcPrice}
              shippingFee={shippingFee}
              goCheckout={goCheckout}
            />
          </>
        ) : (
          <CartEmpty />
        )}

      </div>
    </div>
  );
}
