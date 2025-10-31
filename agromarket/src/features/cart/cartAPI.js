import { setCartItem, setCartCount, updateCartCount, updateTotalPrice, updateTotalDcPrice } from './cartSlice.js';
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
export const addCart = (ppk, qty) => async(dispatch) => {
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
    console.log("result", result);

    if (result) {

    } else {
        console.error("장바구니 저장 실패");
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
    console.log(cartData);
    console.log(cartData[0].product.price*cartData[0].qty);
    // return cartData;
}

// 장바구니 테이블의 기존 항목 확인
export const checkCart = async(pid, size, id) => {
    const url = "/cart/checkCart";
    const cartItem = { "pid":pid, "size":size, "id":id };
    const cartData = await axiosGet(url, cartItem);
    return cartData;
}

export const updateCart = (cid, upFlag) => async(dispatch) => {
    const url = "/cart/updateQty";
    const cartData = { "cid": cid, "upFlag":upFlag };
    let count = 0;
    // 장바구니 테이블의 qty값 변경 upFlag(true : 1증가, false : 1감소)
    const rows = await axiosGet(url, cartData);
    // + - 버튼 클릭에 따른 카운트 증가 감소 설정
    if(upFlag){
        // 장바구니 갯수 설정
        count = 1;
    } else {
        // 장바구니 갯수 설정
        count = -1;
    }
    // 장바구니 갯수 + 1
    dispatch(updateCartCount({"cartCount": count}));
    // 장바구니 아이템 재설정
    dispatch(showCart());
    // 총 금액 설정
    dispatch(updateTotalPrice());
    return rows;
}

export const removeCart = (cid, qty) => async(dispatch) => {
    const url = "/cart/deleteItem";
    const cartData = { "cid": cid };
    // 장바구니 테이블의 삭제
    const rows = await axiosGet(url, cartData);

    // 장바구니 테이블의 삭제가 정상 처리 됬을 경우
    if(rows === 1){
        // 장바구니 갯수 설정
        dispatch(updateCartCount({"cartCount": -qty}));
    } else {
        alert("errer");
    }

    // 장바구니 아이템 재설정
    dispatch(showCart());
    // 총 금액 설정
    dispatch(updateTotalPrice());
}

// 장바구니 추가
export const addCartCount = (count) => (dispatch)=> {
    dispatch(setCartCount({ "cartCount": count }));
}