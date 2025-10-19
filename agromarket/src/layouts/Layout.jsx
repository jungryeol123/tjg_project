import { Outlet } from "react-router-dom";
import Footer from "shared/ui/Footer/Footer";
import Header from "shared/ui/Header/Header";
import "./Layout.scss";
export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
