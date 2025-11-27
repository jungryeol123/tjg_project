import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  provider: null,
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      const { provider, accessToken } = action.payload;
      state.provider = provider;
      state.accessToken = accessToken;
      const loginInfo = { provider, accessToken };
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    },
    logout(state) {
      state.isLogin = false;
      state.id = null;
      state.provider = null;
      state.accessToken = null;
      localStorage.removeItem("loginInfo");
    },
    socialLogin(state, action) {
      state.isLogin = true;
      const { provider, id, accessToken } = action.payload;
      state.id = id;
      state.provider = provider;
      state.accessToken = accessToken;
      console.log("provider", provider, "id", id);
      const loginInfo = { provider, id, accessToken };
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    },
  },
});

export const { login, logout, socialLogin } = authSlice.actions;
export default authSlice.reducer;
