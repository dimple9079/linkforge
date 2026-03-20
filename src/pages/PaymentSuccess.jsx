import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuth();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const finalize = async () => {
      if (fetchUserProfile) {
        await fetchUserProfile();
      }
      toast.success('Payment successful! Welcome to Pro.');
    };
    finalize();
  }, [fetchUserProfile]);

  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4 dark:bg-green-900/30">
        <CheckCircle className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Upgrade Successful!</h1>
      <p className="text-slate-500 dark:text-slate-400">
        Thank you for upgrading to LinkForge Pro. Your account features have been unlocked.
      </p>
      <div className="pt-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full flex items-center justify-center py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all"
        >
          Go to Dashboard <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
