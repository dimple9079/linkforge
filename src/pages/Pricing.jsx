import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Check, Zap, Crown, Loader2, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Starter',
    description: 'Perfect for individuals getting started with QR codes.',
    price: '₹0',
    period: '/month',
    features: [
      '10 Static QR Codes',
      'Basic Analytics',
      'Standard QR Designs',
      'Email Support',
    ],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    id: 'premium',
    name: 'Pro',
    description: 'For teams and businesses that need advanced features.',
    price: '₹750',
    period: '/month',
    features: [
      'Unlimited Dynamic QR Codes',
      'Advanced Analytics & Heatmaps',
      'Custom Branding & Logos',
      'Bulk Generate & Export',
      'White-label Redirects',
      'Priority Support',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
];

const Pricing = () => {
  const { user, updateUser, fetchUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const handleUpgrade = async (planId) => {
    if (user?.role === planId) {
      toast('You are already on this plan!', { icon: 'ℹ️' });
      return;
    }

    if (planId === 'free') {
      setLoading(planId);
      try {
        const { data } = await api.put('/auth/upgrade', { plan: 'free' });
        updateUser(data);
        toast.success('Downgraded to Free plan.');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Downgrade failed');
      } finally {
        setLoading(null);
      }
      return;
    }

    // Demo Mode Bypass
    const isDemo = new URLSearchParams(window.location.search).get('demo') === 'true';
    if (isDemo && planId === 'premium') {
      setLoading(planId);
      setTimeout(async () => {
        try {
          // Simulate backend upgrade for demo
          const { data } = await api.put('/auth/upgrade', { plan: 'premium' });
          updateUser(data);
          toast.success('🎉 [DEMO] LinkForge Pro Activated!');
          navigate('/dashboard');
        } catch (error) {
          toast.error('Demo upgrade failed');
        } finally {
          setLoading(null);
        }
      }, 1000);
      return;
    }

    // Pro Upgrade Flow via Razorpay
    setLoading(planId);
    try {
      // 1. Create order on backend
      const { data: order } = await api.post('/payments/razorpay/order');

      // Handle Mock Order (Developer Mode)
      if (order.mock) {
        toast.success('🎁 Entering Developer Mock Payment Mode');
        setTimeout(async () => {
          try {
            // Directly use the upgrade endpoint in mock mode
            const { data } = await api.put('/auth/upgrade', { plan: 'premium' });
            toast.success('🎉 LinkForge Pro Activated! (Mock Mode)');
            updateUser(data);
            window.location.href = '/dashboard';
          } catch (error) {
            console.error('Mock upgrade failed:', error);
            toast.error(error.response?.data?.message || 'Mock upgrade failed');
          } finally {
            setLoading(null);
          }
        }, 1500);
        return;
      }

      // 2. Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: order.amount,
        currency: order.currency,
        name: 'LinkForge',
        description: 'Upgrade to Pro Plan',
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3. Verify payment on backend
            const { data } = await api.post('/payments/razorpay/verify', response);
            toast.success(data.message);
            updateUser(data.user || user); // Update local user state
            window.location.href = '/dashboard';
          } catch (error) {
            toast.error(error.response?.data?.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#2563eb',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment initiation failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 dark:bg-blue-900/20 dark:text-blue-400">
          <Zap className="h-3 w-3 mr-1" /> PRICING
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
          Choose Your Plan
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Start free, upgrade when you need more power. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        {plans.map((plan) => {
          const isCurrent = user?.role === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl border-2 p-8 transition-all ${
                plan.highlight
                  ? 'border-blue-600 bg-white shadow-xl shadow-blue-500/10 dark:bg-slate-900 dark:shadow-blue-500/5'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg">
                  <Crown className="h-3 w-3 mr-1" /> MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{plan.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-slate-500 text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <div className={`mr-3 rounded-full p-0.5 ${plan.highlight ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading !== null || isCurrent}
                className={`w-full flex items-center justify-center py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60 ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {loading === plan.id ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isCurrent ? (
                  <>
                    <Check className="h-4 w-4 mr-2" /> Current Plan
                  </>
                ) : (
                  <>
                    {plan.cta} <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="text-lg font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes! Downgrade to Free plan instantly from this page.' },
            { q: 'Is there a trial?', a: 'The Free plan is your trial — no credit card required.' },
            { q: 'What happens to my QRs on downgrade?', a: 'Your existing QR codes continue to work. You just can\'t create new ones beyond the Free limit.' },
            { q: 'Do you store payment info?', a: 'No. All payments are securely handled by Razorpay. We never store your card details.' },
          ].map((faq, i) => (
            <div key={i}>
              <h4 className="font-semibold text-sm mb-1">{faq.q}</h4>
              <p className="text-sm text-slate-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
