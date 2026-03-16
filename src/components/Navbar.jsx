import React from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ toggleMobileMenu }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <div className="flex items-center gap-4">
        <button className="sm:hidden" onClick={toggleMobileMenu}>
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">ProDashboard</h1>
      </div>
      <ThemeToggle />
    </nav>
  );
}