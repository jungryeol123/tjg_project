import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.scss";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="admin-title">관리자 메뉴</h2>

        <nav className="admin-nav">
          <Link to="/admin/analytics/forecast">📈 판매 예측</Link>
          <Link to="/admin/analytics/conversion">📊 전환율 분석</Link>
          <Link to="/admin/analytics/price">상품 가격 분석</Link>
          <Link to="/admin/products/reviewList">리뷰 분석</Link>
          <Link to="/admin/products/add">상품 등록</Link>
          <Link to="/admin/adminProductList">상품 편집</Link>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
