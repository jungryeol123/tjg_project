import { useDispatch, useSelector } from "react-redux";
import "../styles/components/Cart.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { removeCart, showCart, updateCart } from "features/cart/cartAPI";

export function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.cart.cartList);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const totalDcPrice = useSelector((state) => state.cart.totalDcPrice);

    useEffect(() => {
        dispatch(showCart());
    }, [])
    
    return (
        <div className='cart-container'>
            <h2 className='cart-header'>장바구니</h2>
            <div className="cart-body">
                <div className="cart-left">
                    {
                        cartList && cartList.map(item => 
                            <div>
                                <div className='cart-item'>
                                    <img src={`/images/productImages/${item.product.imageUrl}`} alt='product img' />
                                    <div className='cart-item-details'>
                                        <p className='cart-item-title'>{item.product.productName}</p>
                                        <p className='cart-item-title cart-item-price'>{parseInt(item.product.price).toLocaleString()}원</p>
                                        <p className='cart-item-title cart-item-dcprice'>{parseInt((item.product.price)*(100-item.product.dc)*0.01).toLocaleString()}원</p>
                                    </div>
                                    <div className='cart-quantity'>
                                        <button type='button' onClick={() => item.qty>1 ? dispatch(updateCart(item.cid, (item.qty-1))) : null}>-</button>
                                        <input type="text" value={item.qty} readOnly/>
                                        <button type='button' onClick={() => dispatch(updateCart(item.cid, (item.qty+1)))}>+</button>
                                    </div>
                                    <button className='cart-remove' onClick={()=>dispatch(removeCart(item.cid))}>제거</button>
                                </div>

                            </div>
                        )
                    }
                </div>
                <div className="cart-right">
                    {/* 주문 버튼 출력 */}
                    {cartList && cartList.length > 0 ? 
                        <>
                            <div className='cart-summary'>
                                <h3>주문 예상 금액</h3>
                                <div className='cart-summary-sub'>
                                    <p className='cart-total'>
                                        <label>총 상품 가격 : </label>
                                        <span>{totalPrice}원</span>
                                    </p>
                                    <p className='cart-total'>
                                        <label>총 할인 가격 : </label>
                                        <span>{totalDcPrice}원</span>
                                    </p>
                                    <p className='cart-total'>
                                        <label>총 배송비 : </label>
                                        <span>0원</span>
                                    </p>
                                </div>
                                <p className='cart-total2'>
                                    <label>총 금액 : </label>
                                    <span>{totalPrice - totalDcPrice} 원</span>
                                </p>
                            </div>
                            <div className='cart-actions'>
                                <button type='button' onClick={()=>{navigate("/checkout")}}>주문하기</button>
                            </div>
                        </>
                    : <div>
                        <p> 장바구니에 담은 상품이 없습니다. &nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
                        <img style={{width:"50%", marginTop:"20px"}} src="/images/cart.jpg" />
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}