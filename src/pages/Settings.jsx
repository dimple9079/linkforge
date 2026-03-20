import React, { useState } from 'react';
import { Bell, Lock, Eye, Moon, Monitor, Sun, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
      checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const Settings = () => {
  const { theme, setTheme } = useAuth();
  const [notifications, setNotifications] = useState({
    scans: true,
    weekly: false,
    security: true
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast.success(`Theme set to ${newTheme}`);
  };

  const handleToggle = (key) => {
    setNotifications(prev => {
      const next = { ...prev, [key]: !prev[key] };
      toast.success(`${key} notifications ${next[key] ? 'enabled' : 'disabled'}`);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Customize your LinkForge experience.</p>
      </div>

      <div className="grid gap-8">
        {/* Appearance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <Eye className="mr-2 h-5 w-5 text-blue-600" />
            Appearance
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' },
              { id: 'system', icon: Monitor, label: 'System' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleThemeChange(item.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  theme === item.id 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <item.icon className={`mb-2 h-6 w-6 ${theme === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-semibold ${theme === item.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <Bell className="mr-2 h-5 w-5 text-blue-600" />
            Notifications
          </h3>
          <div className="space-y-6">
            {[
              { key: 'scans', title: 'Scan Alerts', desc: 'Get notified when your QR codes are scanned.' },
              { key: 'weekly', title: 'Weekly Reports', desc: 'Receive a weekly summary of your QR performance.' },
              { key: 'security', title: 'Security Alerts', desc: 'Important alerts about your account security.' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
                <Toggle 
                  checked={notifications[item.key]} 
                  onChange={() => handleToggle(item.key)} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <Lock className="mr-2 h-5 w-5 text-blue-600" />
            Security
          </h3>
          <div className="space-y-6">
            <button 
              onClick={() => toast('Check your email for the reset link', { icon: '📧' })}
              className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Update Password
            </button>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button 
                className="text-sm text-red-500 hover:text-red-600 font-medium"
                onClick={() => toast.error('This action is irreversible. Contact support to proceed.')}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
