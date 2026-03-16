import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Link2, QrCode } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 /> },
    { name: "URL Shortener", path: "/url-shortener", icon: <Link2 /> },
    { name: "QR Generator", path: "/qr", icon: <QrCode /> },
  ];

  return (
    <aside className="hidden sm:flex flex-col w-64 bg-gray-900 text-white p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition ${isActive ? "bg-gray-700" : ""}`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </aside>
  );
}