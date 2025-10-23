
import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
  
    productList: [],
    
    product: {},
    
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers : {
    setProductList(state, action) {
        const {foodData} = action.payload;
        state.productList = foodData;
    },
    setProduct(state, action) {
        const {product} = action.payload;
      state.product = product;
    }
  }});



  export const {setProductList, setProduct} = productSlice.actions; 
  export default productSlice.reducer;