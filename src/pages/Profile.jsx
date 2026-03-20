import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, CheckCircle, CreditCard, Crown, Zap, ArrowRight, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isPro = user?.role === 'premium';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Profile</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account information and preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Card */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center space-x-4 mb-8">
              <div className={`h-20 w-20 rounded-full flex items-center justify-center ${
                isPro
                  ? 'bg-linear-to-br from-blue-500 to-indigo-600 text-white'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }`}>
                {isPro ? <Crown size={36} /> : <User size={40} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  {isPro && (
                    <span className="px-2 py-0.5 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase">Pro</span>
                  )}
                </div>
                <p className="text-slate-500 text-sm flex items-center mt-1">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-slate-500">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      readOnly
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 cursor-not-allowed text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 text-slate-500">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="email" 
                      defaultValue={user?.email}
                      readOnly
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 cursor-not-allowed text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-600" />
              Plan Status
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${
                isPro 
                  ? 'bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800/50' 
                  : 'bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-black uppercase tracking-wider ${isPro ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    {isPro ? '⭐ PRO' : 'FREE'}
                  </span>
                  <CheckCircle className={`h-4 w-4 ${isPro ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 italic">
                  {isPro ? 'All features unlocked' : 'Basic features only'}
                </p>
              </div>
              
              <button 
                onClick={() => navigate('/pricing')}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                  isPro
                    ? 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
                }`}
              >
                {isPro ? (
                  <><CreditCard className="mr-2 h-4 w-4" /> Manage Plan</>
                ) : (
                  <><Zap className="mr-2 h-4 w-4" /> Upgrade to Pro <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </button>
            </div>
          </div>

          {!isPro && (
            <div className="rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
              <h4 className="font-bold mb-2 flex items-center"><Crown className="h-4 w-4 mr-2" /> Pro Benefits</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">✓</div>
                  <span>Unlimited Dynamic QRs</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">✓</div>
                  <span>Custom Logos & Designs</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">✓</div>
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5">✓</div>
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
