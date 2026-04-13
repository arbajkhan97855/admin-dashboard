import React, { useState } from "react";
import "./navbarhome.css";

const menuItems = [
  { title: "Home", link: "#" },
  {
    title: "Mobiles",
    link: "#",
    submenu: [
      { title: "Apple", link: "#" },
      { title: "Samsung", link: "#" },
      { title: "Xiaomi", link: "#" },
      { title: "OnePlus", link: "#" },
    ],
  },
  {
    title: "Accessories",
    link: "#",
    submenu: [
      { title: "Chargers", link: "#" },
      { title: "Covers", link: "#" },
      { title: "Earphones", link: "#" },
    ],
  },
  { title: "Offers", link: "#" },
  { title: "Contact", link: "#" },
];

export default function Navbarhome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({});

  const toggleSubmenu = (i) => {
    setSubmenuOpen((p) => ({ ...p, [i]: !p[i] }));
  };

  return (
    <>
      {/* 🔝 TOP HEADER */}
      <div className="top-header">
        <span>🔥 Big Sale – Up to 40% OFF on Mobiles</span>
        <div className="top-links">
          <a href="#">Track Order</a>
          <a href="#">Login</a>
        </div>
      </div>

      {/* 🔹 MAIN NAVBAR */}
      <nav className="navbar">
        {/* Logo */}
        <div className="brand">
          <span className="logo">📱</span>
          <span>MobileMart</span>
        </div>

        {/* Hamburger */}
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menu */}
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          {menuItems.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                onClick={(e) => {
                  if (item.submenu) {
                    e.preventDefault();
                    toggleSubmenu(i);
                  }
                }}
              >
                {item.title}
                {item.submenu && <span className="arrow">▼</span>}
              </a>

              {item.submenu && (
                <ul className={`submenu ${submenuOpen[i] ? "show" : ""}`}>
                  {item.submenu.map((s, j) => (
                    <li key={j}>
                      <a href={s.link}>{s.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="nav-actions">
          <input
            type="search"
            className="search"
            placeholder="Search products, brands..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Search:", e.target.value);
                // yaha search API call
              }
            }}
          />

          <span className="icon">🛒</span>
          <span className="icon">👤</span>
        </div>
      </nav>
    </>
  );
}
