import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
    categoryList : []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers : {
    setCategoryList(state, action) {
      const { result } = action.payload;
      state.categoryList = result;
    }
  }});

export const { setCategoryList } = categorySlice.actions; 
export default categorySlice.reducer;