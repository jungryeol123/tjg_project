import { Outlet } from "react-router-dom";
import Footer from "shared/ui/Footer/Footer";
import Header from "shared/ui/Header/Header";
import "./Layout.scss";
import FloatingChatBot from "shared/ui/floating/FloatingChatBot";
export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main1 container1">
        <Outlet />
      </main>
      <Footer />

      {/* 🔥 1200px 바깥에 떠있는 UI */}
      <FloatingChatBot />
    </div>
  );
}
