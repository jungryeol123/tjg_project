import { setCartItem, updateCartList, updateTotalPrice, updateTotalDcPrice, getCartCount } from './cartSlice.js';
import { axiosPost } from 'shared/lib/axiosInstance.js'
import { parseJwt } from "features/auth/parseJwt";
import { api } from 'features/auth/axios.js';

// 장바구니 추가(신규일경우 레코드추가, 기존 레코드 존재시 qty 증가)
export const addCart = (ppk, qty) => async(dispatch, getState) => {
    const url = "/cart/add";
    // localStorage에서 토큰정보취득
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
        const { accessToken } = JSON.parse(stored);
        const payload = parseJwt(accessToken);

        // 장바구니 값 설정
        const cart = {
                "qty": qty,
                "product": { "id": ppk },
                "user": { "id": payload.id }
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
}

// 장바구니 정보 취득
export const showCart = (id) => async(dispatch) => {
    const url = "/cart/cartList";
    const cartItem = { "user" : {"id":id} };
    // const cartData = await axiosPost(url, cartItem);
    const cartData = await api.post(url, cartItem);

    if(cartData) {
        dispatch(setCartItem({"cartItem": cartData.data}));
        dispatch(updateTotalPrice());
        dispatch(updateTotalDcPrice());
        dispatch(getCartCount());
    }
    // return cartData;
}

export const updateCart = (cid, qty, id) => async(dispatch) => {
    const url = "/cart/updateQty";
    const cartData = { "cid": cid, "qty":qty };
    const rows = await axiosPost(url, cartData);
    console.log(rows);
    
    // 장바구니 아이템 재설정
    dispatch(showCart(id));
    return rows;
}

export const removeCart = (cid, id) => async(dispatch) => {
    const url = "/cart/deleteItem";
    const data = {"cid": cid};
    const rows = await axiosPost(url, data);
    dispatch(showCart(id));
    return rows;
}
