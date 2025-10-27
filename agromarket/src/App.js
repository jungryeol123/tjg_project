import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'layouts/Layout';
import Home from 'pages/Home';
import { Delivery } from 'pages/Delivery';
import { Login } from 'pages/Login';
import { Signup } from 'pages/Signup';
import KakaoCallback from 'features/auth/Kakao';
import { useEffect } from 'react';
import PaymentButton from 'features/order/PaymentButton';
import { ProductDetail } from 'pages/ProductDetail';
import { HeaderProductList } from 'pages/productCategoryList/HeaderProductList';

function App() {

   useEffect(() => {
    // 카카오 SDK 초기화 (한번만 실행)
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("217fcf3151ca4922f670954462e84226");
      console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
    }
    console.log(window.Kakao.isInitialized()); 
  }, []);


  return (
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="/delivery" element={<Delivery/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/detail" element={<ProductDetail/>} />
          <Route path="/features/auth/Kakao" element={<KakaoCallback />} />
          <Route path="/pay" element={<PaymentButton/>} />
          <Route path="/" element={<PaymentButton/>} />
          <Route path="/products/:pid/:id" element={<ProductDetail />} />
          <Route path="/productList/:id" element={<HeaderProductList />} />
        </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
