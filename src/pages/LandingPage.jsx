import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ArrowRight, BarChart3, Zap, Shield, Globe, Users, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">LinkForge</span>
          </div>
          <nav className="hidden space-x-10 md:flex">
            {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-400">Sign in</Link>
            <Link to="/signup" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-20 lg:pt-52 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-bold text-blue-600 dark:text-blue-400">
              <Zap className="mr-2 h-4 w-4" /> Smart QR Platform for Modern Teams
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl">
              Turn Scans Into <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Growth</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              LinkForge is the all-in-one platform to generate, track, and optimize dynamic QR codes. 
              Built for creators, freelancers, and growing businesses.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="rounded-2xl bg-slate-900 dark:bg-blue-600 px-8 py-5 text-lg font-bold text-white shadow-2xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all flex items-center">
                Start Creating Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-5 text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                View Live Demo
              </button>
            </div>
            <div className="mt-10 flex items-center justify-center space-x-8 text-sm font-medium text-slate-400 dark:text-slate-500">
              <span className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> No Credit Card Required</span>
              <span className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Cancel Anytime</span>
            </div>
          </div>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl opacity-50"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 dark:bg-slate-900/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Everything you need to scale</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Powerful features designed to help you understand your audience better.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Dynamic QR Codes', desc: 'Change the destination link anytime without regenerating the QR code.', icon: Zap },
              { title: 'Advanced Analytics', desc: 'Track scans, location, device type, and conversion rates in real-time.', icon: BarChart3 },
              { title: 'Smart Redirects', desc: 'Create landing pages that host multiple links for your social bios.', icon: Globe },
              { title: 'Bulk Generation', desc: 'Generate hundreds of QR codes at once from a CSV or list.', icon: Users },
              { title: 'Custom Branding', desc: 'Add colors, logos, and custom frames to match your brand identity.', icon: Shield },
              { title: 'Safe Links', desc: 'Every link is verified and scanned for malware to protect your users.', icon: Shield },
            ].map((feature, i) => (
              <div key={i} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 transition-all hover:-translate-y-1 hover:shadow-xl">
                 <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <feature.icon className="h-6 w-6" />
                 </div>
                 <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 sm:py-32">
         {/* Pricing content here */}
         <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Simple, Transparent Pricing</h2>
            <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                {/* Free Plan */}
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-10 bg-white dark:bg-slate-900">
                    <h3 className="text-lg font-bold text-slate-500 uppercase">Starter</h3>
                    <p className="mt-4 text-4xl font-black dark:text-white">$0<span className="text-lg font-normal text-slate-400">/mo</span></p>
                    <ul className="mt-10 space-y-4 text-slate-600 dark:text-slate-400">
                        <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-green-500" /> 10 Static QR Codes</li>
                        <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-green-500" /> Basic Analytics</li>
                        <li className="flex items-center text-slate-400 dark:text-slate-600"><CheckCircle className="mr-3 h-5 w-5 text-slate-300 dark:text-slate-800" /> No Custom Branding</li>
                        <li className="flex items-center text-slate-400 dark:text-slate-600"><CheckCircle className="mr-3 h-5 w-5 text-slate-300 dark:text-slate-800" /> Watermark on Scans</li>
                    </ul>
                    <Link to="/signup" className="mt-10 block w-full rounded-2xl border-2 border-slate-900 dark:border-slate-700 py-4 text-center font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        Get Started
                    </Link>
                </div>
                {/* Premium Plan */}
                <div className="rounded-3xl border-2 border-blue-600 p-10 bg-white dark:bg-slate-900 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-5 right-5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Popular</div>
                    <h3 className="text-lg font-bold text-blue-600 uppercase">Pro</h3>
                    <p className="mt-4 text-4xl font-black dark:text-white">$19<span className="text-lg font-normal text-slate-400">/mo</span></p>
                    <ul className="mt-10 space-y-4 text-slate-900 dark:text-white font-medium">
                        <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-blue-600" /> Unlimited Dynamic QRs</li>
                        <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-blue-600" /> Advanced Custom Design</li>
                        <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-blue-600" /> Real-time Heatmaps</li>
                        <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-blue-600" /> Bulk Generate & Export</li>
                        <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-blue-600" /> White-label Redirects</li>
                    </ul>
                    <Link to="/signup" className="mt-10 block w-full rounded-2xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">
                        Upgrade Today
                    </Link>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-slate-500 dark:text-slate-400">
          <p>© 2024 LinkForge. Built for the modern web.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
