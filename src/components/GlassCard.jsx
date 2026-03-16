import React from "react";

export default function GlassCard({ title, value, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-200 animate-fadeInUp w-full sm:w-80">
      <h3 className="text-gray-200 font-semibold text-lg">{title}</h3>
      <p className="text-white font-bold text-2xl mt-2">{value}</p>
      {children && <div className="mt-3 text-gray-300">{children}</div>}
    </div>
  );
}