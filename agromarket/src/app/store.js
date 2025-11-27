import { configureStore } from '@reduxjs/toolkit'
// features
import cartSlice from 'features/cart/cartSlice.js'
import authSlice from 'features/auth/authSlice.js'
import productSlice from 'features/product/productSlice.js'
import deliverySlice from 'features/delivery/deliverySlice.js'
import categorySlice from 'features/category/categorySlice.js'
import  noticeSlice  from 'features/notice/noticeSlice.js'

export const store = configureStore({
  reducer: {
    cart : cartSlice,
    product : productSlice,
    notice : noticeSlice,
    auth:authSlice,
    delivery : deliverySlice,
    category : categorySlice
  },
})