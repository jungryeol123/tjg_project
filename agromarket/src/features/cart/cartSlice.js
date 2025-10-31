import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
    // 장바구니 갯수
    cartCount: 0,
    // 장바구니 리스트
    cartList: [],
    // 총 금액
    totalPrice: 0,
    // 총 할인 금액
    totalDcPrice: 0
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 장바구니 리스트 추가 설정
    addCartItem (state, action) {
      const { cartItem } = action.payload;
      state.cartList = cartItem;
//      state.cartList = cartItemsCheck(state.cartList, cartItem);
    },
    setCartItem (state, action) {
      const { cartItem } = action.payload;
      state.cartList = cartItem;
    },
    // 장바구니 갯수 설정(로그인, 장바구니 삭제 시)
    setCartCount(state, action) {
        const { cartCount } = action.payload;
        state.cartCount = cartCount;
    },
    // 장바구니 갯수 설정(쇼핑백 버튼 클릭)
    updateCartCount (state, action) {
        const { cartCount } = action.payload;
      state.cartCount += cartCount;
    },
    // 총 금액 설정
    updateTotalPrice (state) {
      state.totalPrice = state.cartList.reduce( ( total, item ) => total + (item.qty * item.product.price) , 0);
    },
    updateTotalDcPrice (state) {
      state.totalDcPrice = state.cartList.reduce( ( total, item ) => total + (item.qty * (item.product.price * item.product.dc * 0.01)) , 0);
    },
    // 장바구니 초기화
    initCartItem (state, action) {
      state.cartList = [];
      state.cartCount = 0;
      state.totalPrice = 0;
    }
  }
});

// 컴포넌트, API함수에서 reducers의 함수를 사용하기 위해 action 추가(dispatch)
export const { addCartItem, setCartItem, setCartCount, updateCartCount, updateTotalPrice, updateTotalDcPrice, initCartItem } = cartSlice.actions;

// store import
export default cartSlice.reducer;