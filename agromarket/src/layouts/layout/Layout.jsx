import { Outlet } from "react-router-dom";
// layouts
import Header from "layouts/header/Header";
// shared
import Footer from "shared/ui/Footer/Footer";
import FloatingChatBot from "shared/ui/floating/FloatingChatBot";
import "./Layout.scss";

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
