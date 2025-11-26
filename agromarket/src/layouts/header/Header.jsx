// src/ui/Header/Header.jsx
import React from "react";
import "./Header.scss";
import TopBar from "layouts/topbar/TopBar";
import CategoryNav from "shared/ui/Header/components/categoryNav/CategoryNav";
import LogoSearch from "layouts/logoSearch/LogoSearch";


export default function Header() {
  return (
    <header className="header">
      <TopBar />
      <LogoSearch />
      <CategoryNav />
    </header>
  );
}
