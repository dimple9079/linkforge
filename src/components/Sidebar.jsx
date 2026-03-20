import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  QrCode, 
  BarChart3, 
  History, 
  Settings, 
  User,
  LogOut,
  CreditCard,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const { logout, user, theme, setTheme } = useAuth();
  const navigate = useNavigate();

  const isPro = user?.role === 'premium';

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: QrCode, label: 'Generator', path: '/generator' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: History, label: 'History', path: '/history' },
    { icon: CreditCard, label: 'Pricing', path: '/pricing' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="mb-10 flex items-center px-4">
          <QrCode className="mr-2 h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">LinkForge</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
          {/* Theme Quick Toggle */}
          <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1 rounded-xl mb-4 mx-2">
            {[
              { id: 'light', icon: Sun },
              { id: 'dark', icon: Moon },
              { id: 'system', icon: Monitor }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "flex-1 flex justify-center py-1.5 rounded-lg transition-all",
                  theme === t.id 
                    ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                )}
                title={t.id.charAt(0).toUpperCase() + t.id.slice(1)}
              >
                <t.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <button 
            onClick={() => navigate('/pricing')}
            className="w-full mb-3 px-4 py-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Current Plan</p>
            <p className={cn(
              "text-xs mt-0.5 font-black uppercase",
              isPro ? "text-blue-600" : "text-slate-600 dark:text-slate-400"
            )}>
              {isPro ? '⭐ Pro' : 'Free'} 
              {!isPro && <span className="text-blue-500 ml-1 font-bold normal-case">→ Upgrade</span>}
            </p>
          </button>
          <button
            onClick={logout}
            className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
