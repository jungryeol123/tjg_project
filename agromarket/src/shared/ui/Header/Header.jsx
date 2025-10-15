// src/ui/Header/Header.jsx
import React from "react";
import "./Header.scss";
import TopBar from "./components/topbar/TopBar.jsx";
import LogoSearch from "./components/logoSearch/LogoSearch.jsx";
import CategoryNav from "./components/categoryNav/CategoryNav.jsx";


export default function Header() {
  return (
    <header className="header">
      <TopBar />
      <LogoSearch />
      <CategoryNav />
    </header>
  );
}
