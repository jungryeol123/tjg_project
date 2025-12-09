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
    totalDcPrice: 0,
    // 장바구니 신규 추가 플래그
    isNew: false,
    // 배송비
    shippingFee: 3000
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem (state, action) {
      const { cartItem } = action.payload;
      state.cartList = cartItem;
    },
    // 장바구니 리스트 설정
    updateCartList(state, action) {
      const { cartItem } = action.payload;

      // 동일 상품 조회( 장바구니 리스트에 없을시 undefined )
      const flag = state.cartList.find( cart => String(cart.product.id) === String(cartItem.product.id) )
      // 동일 상품이 없을시
      if(!flag){
        // 장바구니 리스트에 상품 추가
        state.cartList = state.cartList.concat(cartItem);
        // 신규 상품 등록 플래그 : true
        state.isNew = true;
      } else {
        // 신규 상품 등록 플래그 : false
        state.isNew = false;
      }
    },
    // 총 금액 설정
    updateTotalPrice (state) {
      state.totalPrice = state.cartList.filter(cart => cart.product.count > 0)
      .reduce( ( total, item ) => total + (item.qty * item.product.price) , 0);
    },
    updateTotalDcPrice (state) {
      state.totalDcPrice = state.cartList.filter(cart => cart.product.count > 0)
      .reduce( ( total, item ) => total + (item.qty * (item.product.price * item.product.dc * 0.01)) , 0);
    },
    // 장바구니 갯수 취득(총 리스트 갯수) + 배송비 계산
    getCartCount(state){
      state.cartCount = state.cartList.length;
      state.totalPrice>=30000 ? (state.shippingFee = 0) : (state.shippingFee = 3000);
    }
  }
});

// 컴포넌트, API함수에서 reducers의 함수를 사용하기 위해 action 추가(dispatch)
export const { setCartItem, updateCartList, updateTotalPrice, updateTotalDcPrice, getCartCount } = cartSlice.actions;

// store import
export default cartSlice.reducer;