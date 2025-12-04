import axios from "axios";
import IntroAnimation from "IntroAnimation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// layouts
import { Layout } from "layouts/layout/Layout";
// features
import { login } from "features/auth/authSlice";
// shared
// pages
import Home from "pages/Home";
import { Cart } from "pages/cart/Cart";
import { Signup } from "pages/signup/Signup";
import { CheckOut } from "pages/order/CheckOut";
import { MyOrders } from "pages/myOrders/MyOrders";
import SuccessPage from "pages/successPage/SuccessPage";
import AdminLayout from "pages/administration/AdminLayout";
import SearchResult from "pages/searchResult/SearchResult";
import { ProductDetail } from "pages/productDetail/ProductDetail";
import CustomerService from "pages/customerService/CustomerService";
import { HeaderProductList } from "pages/productCategoryList/HeaderProductList";
import { setupApiInterceptors } from "shared/lib/axios";
import NoticeDetail from "features/notice/components/NoticeDetail";
import { NoticeList } from "pages/notice/NoticeList";
import { AdminProductList } from "pages/administration/adminProductList/AdminProductList";
import ConversionPage from "pages/administration/conversion/ConversionPage";
import ForecastPage from "pages/administration/forecast/ForecastPage";
import PricingConversionPage from "pages/administration/pricingConversion/PricingConversionPage";
import ProductPricingDetailPage from "pages/administration/pricingDetail/ProductPricingDetailPage";
import { ProductUpdate } from "pages/administration/productSkill/ProductUpdate";
import { ProductAdd } from "pages/administration/productSkill/ProductAdd";
import ReviewListPage from "pages/administration/reviewAnalysic/ReviewListPage";
import ReviewAnalysisPage from "features/reviewAnalysic/ReviewAnalysisPage";
import { Delivery } from "pages/delivery/Delivery";
import { Login } from "pages/login/Login";
// import { FindPassword } from "features/login/FindPassword";
import { FindUserId } from "features/login/FindUserId";
import { Coupon } from "pages/coupon/Coupon";
import { PayResult } from "pages/payResult/PayResult";
import RecipePage from "pages/recipe/RecipePage";
import RecipeDetailPage from "features/recipe/RecipeDetailPage";
import AdminRoute from "shared/ui/adminRoute/AdminRoute";
import ChangePassword from "features/login/ChangePassword";


function App() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setupApiInterceptors(); // ✅ 앱 시작 시 인터셉터 등록 (로그인 상태 유지)
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("loginInfo");
    if (saved) {
      const parsed = JSON.parse(saved);
      dispatch(login(parsed)); // Redux 복원
    }
  }, [dispatch]);

  useEffect(() => {
    // ✅ 2. 인트로 애니메이션 3초 후 종료
    const timer = setTimeout(() => {
      setIsIntroFinished(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // ✅ 메인 렌더링 시 CSRF 토큰 미리 요청
    axios
      .get("/csrf", { withCredentials: true })
      .then(() => console.log("✅ CSRF Token issued"))
      .catch((err) => console.error("❌ CSRF Token init failed:", err));
  }, []);

  // // ✅ 3. 인트로가 끝나기 전에는 IntroAnimation만 보여줌
  // if (!isIntroFinished) {
  //   return <IntroAnimation />;
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-user-id" element={<FindUserId />} />
          <Route path="/send-code" element={<ChangePassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/productList/:id" element={<HeaderProductList />} />
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="/brand/:keyword" element={<SearchResult />} />
          <Route path="/category/:keyword" element={<SearchResult />} />
          <Route path="/support" element={<CustomerService />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/payResult" element={<PayResult />} />
          <Route path="/mypage" element={<MyOrders />} />
          <Route path="/oauth/success" element={<SuccessPage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="analytics/forecast" element={<ForecastPage />} />
              <Route path="analytics/conversion" element={<ConversionPage />} />
              <Route path="analytics/price" element={<PricingConversionPage />} />
              <Route path="pricing/:ppk" element={<ProductPricingDetailPage />} />
              <Route path="products/add" element={<ProductAdd />} />
              <Route path="products/update" element={<ProductUpdate />} />
              <Route path="adminProductList" element={<AdminProductList />} />
              <Route path="products/reviewList" element={<ReviewListPage />} />
              <Route path="reviews/:ppk" element={<ReviewAnalysisPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
