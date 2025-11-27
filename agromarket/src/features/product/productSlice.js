import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
  productList: [],
  product: {},
  productReviewList: [],
  productQnAList: [],
  recentSubCategory: null
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList(state, action) {
      const { result } = action.payload;
      state.productList = result;
    },
    setProduct(state, action) {
      const { product } = action.payload;
      state.product = product;
    },
    setProductReviewList(state, action) {
      const { result } = action.payload;
      state.productReviewList = result;
    },
    setProductQnAList(state, action) {
      const { result } = action.payload;
      state.productQnAList = result;
    },
    setRecentSubCategory(state, action) {
      state.recentSubCategory = action.payload;
    }
  }
});

export const { setProductList, setProduct, setProductReviewList, setProductQnAList, setRecentSubCategory } = productSlice.actions;
export default productSlice.reducer;