import React from "react";
// layouts
import TopBar from "layouts/topbar/TopBar";
import LogoSearch from "layouts/logoSearch/LogoSearch";
// shared
import "./Header.scss";
import CategoryNav from "layouts/categoryNav/CategoryNav";

export default function Header() {
  return (
    <header className="header">
      <TopBar />
      <LogoSearch />
      <CategoryNav />
    </header>
  );
}
