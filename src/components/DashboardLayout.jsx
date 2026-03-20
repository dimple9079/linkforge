import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="pl-64">
        <div className="mx-auto max-w-7xl p-8 pt-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
