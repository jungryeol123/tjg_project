import React from "react";
// layouts
import TopBar from "layouts/topBar/TopBar";
import LogoSearch from "layouts/logoSearch/LogoSearch";
// shared
import CategoryNav from "shared/ui/Header/components/categoryNav/CategoryNav";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <TopBar />
      <LogoSearch />
      <CategoryNav />
    </header>
  );
}
