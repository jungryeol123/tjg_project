import { Outlet, useLocation } from "react-router-dom";
import  Footer  from "shared/ui/Footer/Footer";
import  Header  from "shared/ui/Header/Header";
import {MainNavBar} from "./components/MainNavBar";

export function Layout() {
const location = useLocation();
    return (
        <>
            <Header />
             {location.pathname === "/" && <MainNavBar className="min-h-screen bg-gray-50" />} {/* 홈에서만 표시 */}
            <Outlet />
            <Footer />
        </>
    );
}