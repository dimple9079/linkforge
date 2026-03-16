import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import GlassCard from "../components/GlassCard";
import SkeletonCard from "../components/SkeletonCard";

function Dashboard() {
  const stats = [
    { title: "Total Links", value: 120 },
    { title: "Clicks", value: 350 },
    { title: "QR Codes Generated", value: 50 },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="flex flex-wrap gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} title={stat.title} value={stat.value} />
        ))}
        <SkeletonCard />
      </div>
    </DashboardLayout>
  );
}
export default Dashboard;