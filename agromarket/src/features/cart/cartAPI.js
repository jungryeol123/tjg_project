import { setCartItem, setCartCount, updateCartCount, updateCartList, updateTotalPrice, updateTotalDcPrice, getCartCount } from './cartSlice.js';
import { axiosGet, axiosPost } from 'shared/lib/axiosInstance.js'

export const getTotalPrice = () => (dispatch) => {
    // 총 금액 설정
    dispatch(updateTotalPrice());
}

// 장바구니 갯수 설정
export const setCount = (id) => async(dispatch) => {
    const url = "/cart/count";
    const data = {"id": id}
    const jsonData = await axiosGet(url, data);
    dispatch(setCartCount({ "cartCount": jsonData.sumQty }));
}

// 장바구니 추가(신규일경우 레코드추가, 기존 레코드 존재시 qty 증가)
export const addCart = (ppk, qty) => async(dispatch, getState) => {
    const url = "/cart/add";
    // localStorage에서 user의id취득
    const { id } = JSON.parse(localStorage.getItem("loginInfo"));
    // 장바구니 값 설정
    const cart = {
            "qty": qty,
            "product": { "id": ppk },
            "user": { "id": id }
    }

    // 장바구니 설정
    const result = await axiosPost(url, cart);

    if (result) {
        await dispatch(updateCartList({ "cartItem" : result }));
        await dispatch(getCartCount());

        // // 최신 state 가져오기
        const isNew = getState().cart.isNew;
        return isNew;
    } else {
        console.error("장바구니 저장 실패");
        return false;
    }
}

// 장바구니 정보 취득
export const showCart = () => async(dispatch) => {
    const url = "/cart/cartList";
    const { id } = JSON.parse(localStorage.getItem("loginInfo"));
    const cartItem = { "user" : {"id":id} };
    const cartData = await axiosPost(url, cartItem);
    dispatch(setCartItem({"cartItem": cartData}));
    dispatch(updateTotalPrice());
    dispatch(updateTotalDcPrice());
    // return cartData;
}

// 장바구니 테이블의 기존 항목 확인
export const checkCart = async(pid, size, id) => {
    const url = "/cart/checkCart";
    const cartItem = { "pid":pid, "size":size, "id":id };
    const cartData = await axiosGet(url, cartItem);
    return cartData;
}

export const updateCart = (cid, qty) => async(dispatch) => {
    const url = "/cart/updateQty";
    const cartData = { "cid": cid, "qty":qty };
    const rows = await axiosPost(url, cartData);
    // 장바구니 아이템 재설정
    dispatch(showCart());
    return rows;
}

export const removeCart = (cid) => async(dispatch) => {
    const url = "/cart/deleteItem";
    const data = {"cid": cid};
    const rows = await axiosPost(url, data);
    dispatch(showCart());
    return rows;
}

// 장바구니 추가
export const addCartCount = (count) => (dispatch)=> {
    dispatch(setCartCount({ "cartCount": count }));
}