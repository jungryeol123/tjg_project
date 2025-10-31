import { Outlet } from "react-router-dom";
import Footer from "shared/ui/Footer/Footer";
import Header from "shared/ui/Header/Header";
import "./Layout.scss";
export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main1 container1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
