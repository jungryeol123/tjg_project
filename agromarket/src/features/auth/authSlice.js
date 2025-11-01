import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin : false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
        login(state,action) {
            state.isLogin = !state.isLogin;
            const { userId ,id } = action.payload;
            const loginInfo = {"token": "token1234", "userId" : userId, "id" : id };
            localStorage.setItem("loginInfo",JSON.stringify(loginInfo));
        },
        logout(state,action) {
            state.isLogin = !state.isLogin;
            localStorage.removeItem("loginInfo");
        },
        socialLogin(state,action) {
            state.isLogin = !state.isLogin;
            const { provider,id } = action.payload;
            console.log("provider", provider, "id", id);
            const loginInfo = {"token": "token1234", "provider" : provider, "id" : id};
            localStorage.setItem("loginInfo",JSON.stringify(loginInfo));
        },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, socialLogin } = authSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default authSlice.reducer     //store 에서 import