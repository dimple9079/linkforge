import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Activity, Globe, Smartphone, Clock, ArrowUpRight, BarChart3, Info } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverall = async () => {
      try {
        const { data } = await api.get('/analytics/overall');
        setData(data);
      } catch (error) {
        console.error('Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchOverall();
  }, []);

  // Process real data for charts
  const chartData = useMemo(() => {
    if (!data?.recentActivity?.length) return [];
    const dailyMap = {};
    data.recentActivity.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString(undefined, { weekday: 'short' });
      dailyMap[date] = (dailyMap[date] || 0) + 1;
    });
    return Object.entries(dailyMap).map(([date, scans]) => ({ date, scans }));
  }, [data]);

  const deviceData = useMemo(() => {
    if (!data?.recentActivity?.length) return [
      { name: 'Mobile', value: 0 },
      { name: 'Desktop', value: 0 },
    ];
    const deviceMap = {};
    data.recentActivity.forEach(log => {
      const device = log.deviceType || 'Desktop';
      deviceMap[device] = (deviceMap[device] || 0) + 1;
    });
    return Object.entries(deviceMap).map(([name, value]) => ({ name, value }));
  }, [data]);

  if (loading) return <div className="text-center py-20 text-slate-500">Loading analytics...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">Deep dive into your QR performance and audience.</p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Analytics Only Track Dynamic QR Codes</p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Static QR codes link directly to URLs and cannot track scans. Enable "Dynamic Tracking" when creating QR codes to see analytics here.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total QR Codes', value: data?.totalQRs || 0, icon: Globe, bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600' },
          { label: 'Total Scans', value: data?.totalScans || 0, icon: Activity, bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600' },
          { label: 'Recent Scans', value: data?.recentActivity?.length || 0, icon: Smartphone, bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600' },
          { label: 'Avg. Scans/QR', value: data?.totalQRs > 0 ? Math.round((data?.totalScans || 0) / data.totalQRs) : 0, icon: Clock, bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl ${stat.bg} p-3 ${stat.text}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="mb-8 text-lg font-bold">Scan Activity</h3>
        <div className="h-80 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="scans" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">No scan data yet</p>
                <p className="text-sm text-slate-400 mt-1">Create and share dynamic QR codes to see analytics here.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         {/* Recent Activity */}
         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="mb-6 font-bold">Recent Scans</h3>
            <div className="space-y-4">
                {data?.recentActivity?.length > 0 ? data.recentActivity.slice(0, 10).map((log, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 dark:border-slate-800">
                        <div className="flex items-center space-x-3">
                            <div className={`rounded-lg p-2 ${log.deviceType === 'Mobile' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                <Smartphone className={`h-4 w-4 ${log.deviceType === 'Mobile' ? 'text-blue-500' : 'text-slate-500'}`} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{log.deviceType}</p>
                                <p className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{log.ip}</span>
                    </div>
                )) : (
                    <p className="text-center py-10 text-slate-500">No recent scan activity yet.</p>
                )}
            </div>
         </div>

         {/* Device Distribution */}
         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="mb-6 font-bold">Device Distribution</h3>
            <div className="h-64">
              {deviceData.some(d => d.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deviceData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {deviceData.map((entry, index) => (
                              <Cell key={index} fill={['#2563EB', '#6366F1', '#94A3B8'][index % 3]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-slate-500">No device data yet.</p>
                </div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
