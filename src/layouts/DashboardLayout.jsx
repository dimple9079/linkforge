import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileMenu from "../components/MobileMenu";


function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <MobileMenu isOpen={mobileMenuOpen} toggleMenu={toggleMobileMenu} />
      <div className="main-content">
        <Navbar toggleMobileMenu={toggleMobileMenu} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default DashboardLayout;