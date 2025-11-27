import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
    deliveryList : []
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers : {
    setDeliveryList(state, action) {
      const {result} = action.payload;
      state.deliveryList = result;
    }
  }});

export const { setDeliveryList } = deliverySlice.actions; 
export default deliverySlice.reducer;