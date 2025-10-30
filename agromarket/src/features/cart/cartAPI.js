import { setCartItem, setCartCount, updateCartCount, updateTotalPrice } from './cartSlice.js';
import { axiosGet } from 'shared/lib/axiosInstance.js'

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

export const addCart = (pid, size) => async (dispatch) => {
    // localStorage에 String타입으로 저장했으니 json타입    으로 parse
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    // 장바구니 테이블에서 선택한 상품이 존재하는가 체크
    const result = await checkCart(pid, size, userId);

    // 장바구니 테이블에 값이 존재 할 경우 qty값 + 1
    if(result){
        dispatch(updateCart(result.cid, true));
    }
    // 장바구니 테이블에 존재하지 않을 경우 레코드 추가
    else {
        const url = "/cart/add";
        const cartItem = { "pid": pid, "size":size, "qty":1, "id":userId };
        const rows = await axiosGet(url, cartItem);
        // 장바구니 갯수 + 1
        dispatch(updateCartCount({"cartCount": 1}));
    }
}

// 장바구니 정보 취득
export const showCart = () => async(dispatch) => {
    const url = "/cart/cartList";
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    const cartItem = { "id" : userId };
    const cartData = await axiosGet(url, cartItem);
    dispatch(setCartItem({"cartItem": cartData}));
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