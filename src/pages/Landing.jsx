import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-indigo-600 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to ProDashboard</h1>
      <p className="text-lg mb-6 text-center">
        Manage links, QR codes, and analytics all in one place.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-200 transition">
          Login
        </Link>
        <Link to="/dashboard" className="px-6 py-3 bg-indigo-700 font-semibold rounded-lg hover:bg-indigo-600 transition">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
export default Landing;