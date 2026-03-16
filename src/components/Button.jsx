import React from "react";

export default function Button({ children, onClick, variant = "primary", className = "" }) {
  const base = "px-4 py-2 rounded-md font-semibold transition-colors duration-200";
  const styles = variant === "primary"
    ? "bg-indigo-600 text-white hover:bg-indigo-500"
    : "bg-gray-600 text-white hover:bg-gray-500";

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}