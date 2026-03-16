import React from "react";
import { X, Home, BarChart2, Link2, QrCode } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MobileMenu({ isOpen, toggleMenu }) {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 /> },
    { name: "URL Shortener", path: "/url-shortener", icon: <Link2 /> },
    { name: "QR Generator", path: "/qr", icon: <QrCode /> },
  ];

  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white p-6 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 sm:hidden`}>
      <button className="mb-6" onClick={toggleMenu}>
        <X size={24} />
      </button>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} onClick={toggleMenu} className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition">
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}