import { configureStore } from '@reduxjs/toolkit'
import cartSlice from 'features/cart/cartSlice.js'
import productSlice from 'features/product/productSlice.js'
import authSlice from 'features/auth/authSlice.js'
import noticeSlice from 'features/catalog/notice/noticeSlice.js'
import deliverySlice from 'features/delivery/deliverySlice.js'
import categorySlice from 'features/category/categorySlice.js'


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