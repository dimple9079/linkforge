import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page not found</p>
      <Link to="/" className="px-6 py-3 bg-indigo-600 font-semibold rounded-lg hover:bg-indigo-500 transition">
        Go Home
      </Link>
    </div>
  );
}
export default NotFound;