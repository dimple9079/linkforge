import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-gray-400">
      <p className="text-lg">{message}</p>
    </div>
  );
}