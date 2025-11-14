import { configureStore } from '@reduxjs/toolkit'
import cartSlice from 'features/cart/cartSlice.js'
import productSlice from 'features/product/productSlice.js'
import authSlice from 'features/auth/authSlice.js'
// import orderSlice from 'features/order/orderSlice.js'
import noticeSlice from 'features/catalog/notice/noticeSlice.js'
import deliverySlice from 'features/delivery/deliverySlice.js'
import categorySlice from 'features/category/categorySlice.js'

// // 액션 로깅 처리 담당 미들웨어
// // store => next => action
// const myLoggerMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   // 실행된 action 의 값 출력
//   console.log("dispatch :: ", action);
//   // store에 저장되어 있는 값 전체 출력(값 확인용)
//   console.log("next state :: ", store.getState());  
//   // 실행 결과 출력?
//   console.log("next action :: ", result);
//   return result;
// }

// // 장바구니 상태 저장 : 로컬스토리지에 저장
// const myCartSaveMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
  
//   // 장바구니(cartSlice) 경우에만 저장
//   if(typeof action.type === "string" && action.type.startsWith("cart/")){
//     const cart = store.getState().cart;
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }

//   return result;
// }

export const store = configureStore({
  reducer: {
    cart : cartSlice,
    product : productSlice,
    // order : orderSlice,
    notice : noticeSlice,
    auth:authSlice,
    delivery : deliverySlice,
    category : categorySlice
  },

//  // 액션 로깅 처리 담당 미들웨어
//  middleware: (getDefaultMiddleware) =>
//    getDefaultMiddleware()
//      .concat(myLoggerMiddleware) // 커스텀 미들웨어 추가
//      .concat(myCartSaveMiddleware) // 커스텀 미들웨어 추가
})