import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
    noticeList: [],
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers : {
    setNoticeList(state, action) {
      const {result} = action.payload;
        state.noticeList = result;
    }
}});

export const {setNoticeList} = noticeSlice.actions; 
export default noticeSlice.reducer;