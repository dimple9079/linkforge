import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";


import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import URLShortener from "../pages/URLShortener";
import QRGenerator from "../pages/QRGenerator";
import NotFound from "../pages/NotFound";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="url-shortener" element={<URLShortener />} />
          <Route path="qr" element={<QRGenerator />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      
      </Routes>
    </BrowserRouter>
  );
}