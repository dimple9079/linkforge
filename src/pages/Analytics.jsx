import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import GlassCard from "../components/GlassCard";

function Analytics() {
  const analyticsData = [
    { title: "Most Visited Link", value: "https://short.ly/abc123" },
    { title: "Top Country", value: "India" },
    { title: "Clicks Today", value: 45 },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="flex flex-wrap gap-6">
        {analyticsData.map((item, i) => (
          <GlassCard key={i} title={item.title} value={item.value} />
        ))}
      </div>
    </>
  );
}
export default Analytics;