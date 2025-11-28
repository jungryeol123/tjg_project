import axios from "axios";
import IntroAnimation from "IntroAnimation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// layouts
import { Layout } from "layouts/layout/Layout";
// features
import { login } from "features/auth/authSlice";
import PaymentButton from "features/order/PaymentButton";
// shared
import RecipePage from "shared/ui/recipe/RecipePage";
import RecipeDetailPage from "shared/ui/recipe/RecipeDetailPage";
// pages
import Home from "pages/Home";
import { Cart } from "pages/cart/Cart";
import { Login } from "pages/Login";
import { Coupon } from "pages/Coupon";
import { Signup } from "pages/signup/Signup";
import { Delivery } from "pages/Delivery";
import { PayResult } from "pages/PayResult";
import { FindUserId } from "pages/FindUserId";
import { CheckOut } from "pages/order/CheckOut";
import { FindPassword } from "pages/FindPassword";
import { MyOrders } from "pages/myOrders/MyOrders";
import SuccessPage from "pages/successPage/SuccessPage";
import AdminLayout from "pages/administration/AdminLayout";
import SearchResult from "pages/searchResult/SearchResult";
import ForecastPage from "pages/administration/ForecastPage";
import { ProductAdd } from "pages/administration/ProductAdd";
import ConversionPage from "pages/administration/ConversionPage";
import ReviewListPage from "pages/reviewAnalysic/ReviewListPage";
import { ProductDetail } from "pages/productDetail/ProductDetail";
import { ProductUpdate } from "pages/administration/ProductUpdate";
import CustomerService from "pages/customerService/CustomerService";
import ReviewAnalysisPage from "pages/reviewAnalysic/ReviewAnalysisPage";
import { AdminProductList } from "pages/administration/AdminProductList";
import PricingConversionPage from "pages/administration/PricingConversionPage";
import ProductPricingDetailPage from "pages/administration/ProductPricingDetailPage";
import { HeaderProductList } from "pages/productCategoryList/HeaderProductList";
import { setupApiInterceptors } from "shared/lib/axios";
import NoticeDetail from "features/notice/components/NoticeDetail";
import { NoticeList } from "pages/notice/NoticeList";


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

  // ✅ 3. 인트로가 끝나기 전에는 IntroAnimation만 보여줌
  if (!isIntroFinished) {
    return <IntroAnimation />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-user-id" element={<FindUserId />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/" element={<PaymentButton />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
