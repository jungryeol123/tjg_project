// src/ui/Header/Header.jsx
import React from "react";
import "./Header.scss";
import TopBar from "layouts/topbar/TopBar";
import LogoSearch from "shared/ui/Header/components/logoSearch/LogoSearch";
import CategoryNav from "shared/ui/Header/components/categoryNav/CategoryNav";


export default function Header() {
  return (
    <header className="header">
      <TopBar />
      <LogoSearch />
      <CategoryNav />
    </header>
  );
}
