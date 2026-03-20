import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { QrCode, ArrowRight, Zap, TrendingUp, Users, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalQRs: 0, totalScans: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics/overall');
        setStats(data);
      } catch (error) {
        console.error('Stats fetch failed');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back,, {user?.name ? user.name.split(' ')[0] : "User"}! 👋</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Here's what's happening with your QR codes today.</p>
        </div>
        <button 
          onClick={() => navigate('/generator')}
          className="flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <Zap className="mr-2 h-5 w-5" /> Create New QR
        </button>
      </div>

      {/* Overview Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20">
            <QrCode className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Active QR Codes</p>
          <p className="text-3xl font-bold">{stats.totalQRs}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">
            <TrendingUp className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Total Scans</p>
          <p className="text-3xl font-bold">{stats.totalScans}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20">
            <Users className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Conversion Rate</p>
          <p className="text-3xl font-bold">14.2%</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick Actions / Tips */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-linear-to-br from-blue-600 to-indigo-700 p-8 shadow-xl text-white">
           <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4">Go Dynamic for full control</h3>
                <p className="text-blue-100 mb-8 leading-relaxed">
                    Dynamic QR codes allow you to change the destination link anytime without reprinted the QR code. Perfect for menus, seasonal promos, and social links.
                </p>
                <button 
                  onClick={() => navigate('/generator')}
                  className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold flex items-center hover:bg-blue-50 transition-colors"
                >
                    Try Dynamic QR <ArrowRight className="ml-2 h-5 w-5" />
                </button>
           </div>
        </div>

        {/* Plan status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
           <h3 className="font-bold mb-4">Your Subscription</h3>
           <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500 uppercase font-semibold">Active Plan</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{(user?.role || "free").toUpperCase()}</span>
                </div>
                <p className="font-bold text-lg mb-4">{user?.role === 'premium' ? 'LinkForge Pro' : 'Free Forever'}</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: user?.role === 'premium' ? '100%' : '15%' }}></div>
                </div>
                <p className="text-xs text-slate-500 flex justify-between">
                    <span>{user?.role === 'premium' ? 'Unlimited' : stats.totalQRs} / {user?.role === 'premium' ? 'Unlimited' : '10'} QRs used</span>
                </p>
           </div>
           {user?.role !== 'premium' && (
             <button className="w-full mt-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                Upgrade to Pro
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
