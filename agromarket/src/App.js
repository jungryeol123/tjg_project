import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'layouts/Layout';
import Home from 'pages/Home';
import { Delivery } from 'pages/Delivery';
import { Login } from 'pages/Login';
import { Signup } from 'pages/Signup';
import KakaoCallback from 'features/auth/Kakao';
import { useEffect, useState } from 'react';
import PaymentButton from 'features/order/PaymentButton';
import { ProductDetail } from 'pages/ProductDetail';
import { HeaderProductList } from 'pages/productCategoryList/HeaderProductList';
import SearchResult from 'pages/searchResult/SearchResult';
import CustomerService from 'pages/customerService/CustomerService';
import {NoticeList} from 'pages/noticeList/NoticeList';
import NoticeDetail from 'pages/noticeList/NoticeDetail';
import { Cart } from 'pages/Cart';
import { FindUserId } from 'pages/FindUserId';
import { FindPassword } from 'pages/FindPassword';
import { PayResult } from 'pages/PayResult';
import { MyOrders } from 'pages/myOrders/MyOrders';
import { CheckoutInfo } from 'pages/order/CheckoutInfo';
import IntroAnimation from 'IntroAnimation';
import SuccessPage from 'pages/successPage/SuccessPage';
function App() {

   const [isIntroFinished, setIsIntroFinished] = useState(false);


  useEffect(() => {
    // ✅ 1. 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("217fcf3151ca4922f670954462e84226");
      console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
    }

    // ✅ 2. 인트로 애니메이션 3초 후 종료
    const timer = setTimeout(() => {
      setIsIntroFinished(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // // ✅ 3. 인트로가 끝나기 전에는 IntroAnimation만 보여줌
  // if (!isIntroFinished) {
  //   return <IntroAnimation />;
  // }


  return (
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="/delivery" element={<Delivery/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/find-user-id" element={<FindUserId />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/detail" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/checkout' element={<CheckoutInfo />} />
          <Route path="/features/auth/Kakao" element={<KakaoCallback />} />
          {/* <Route path="/pay" element={<PaymentButton/>} /> */}
          <Route path="/" element={<PaymentButton/>} />
          <Route path="/products/:pid/:id" element={<ProductDetail />} />
          <Route path="/productList/:id" element={<HeaderProductList />} />
           <Route path="/search/:keyword" element={<SearchResult />} />
           <Route path="/brand/:keyword" element={<SearchResult />} />
             <Route path="/support" element={<CustomerService />} />
             <Route path="/notice" element={<NoticeList />} />
                <Route path="/notice/:id" element={<NoticeDetail />} />
                 <Route path="/payResult" element={<PayResult />} />
                  <Route path="/MyOrders" element={<MyOrders />} />
                   <Route path="/success" element={<SuccessPage />} />
        </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
