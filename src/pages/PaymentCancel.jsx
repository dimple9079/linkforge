import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-4 dark:bg-red-900/30">
        <XCircle className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Payment Cancelled</h1>
      <p className="text-slate-500 dark:text-slate-400">
        No worries! Your account hasn't been charged. You can try upgrading again whenever you're ready.
      </p>
      <div className="pt-4 flex flex-col gap-3">
        <button
          onClick={() => navigate('/pricing')}
          className="w-full flex items-center justify-center py-3.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Try Again
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full flex items-center justify-center py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
