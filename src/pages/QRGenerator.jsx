import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { QrCode, Link as LinkIcon, Palette, Image as ImageIcon, Download, Loader2, Info, Maximize } from 'lucide-react';

const QRGenerator = () => {
  const [formData, setFormData] = useState({
    name: '',
    originalUrl: '',
    isDynamic: false,
    design: {
      color: '#000000',
      bgColor: '#FFFFFF',
      size: 300,
      logoUrl: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [generatedQR, setGeneratedQR] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/qr', formData);
      setGeneratedQR(data);
      toast.success('QR Code generated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = async (format) => {
    if (!generatedQR) return;
    try {
      window.open(`${import.meta.env.VITE_API_URL}/qr/${generatedQR._id}/download/${format}`, '_blank');
      toast.success(`Downloading ${format.toUpperCase()}...`);
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const logos = [
    { name: 'None', url: '' },
    { name: 'Google', url: 'https://www.google.com/favicon.ico' },
    { name: 'Twitter', url: 'https://twitter.com/favicon.ico' },
    { name: 'GitHub', url: 'https://github.com/favicon.ico' },
    { name: 'LinkedIn', url: 'https://static.licdn.com/favicon.ico' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">QR Generator</h1>
        <p className="text-slate-600 dark:text-slate-400">Create beautiful, custom QR codes with logos and tracking.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">QR Name / Label</label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
                placeholder="Marketing Campaign"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Destination URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="https://example.com"
                  value={formData.originalUrl}
                  onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center space-x-3 mb-2">
                <input
                  type="checkbox"
                  id="dynamic"
                  className="h-5 w-5 rounded border-slate-300 text-blue-600"
                  checked={formData.isDynamic}
                  onChange={(e) => setFormData({ ...formData, isDynamic: e.target.checked })}
                />
                <label htmlFor="dynamic" className="text-sm font-bold text-blue-900 dark:text-blue-100">
                  Enable Dynamic Tracking
                </label>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start">
                <Info className="h-3 w-3 mr-1 mt-0.5 shrink-0" />
                Only dynamic QR codes support scan analytics and link updates after printing.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
              <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-slate-500">
                <Palette className="mr-2 h-4 w-4" /> Customization
              </h3>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase text-slate-500">QR Color</label>
                  <input
                    type="color"
                    className="h-10 w-full cursor-pointer rounded-lg bg-transparent border-none"
                    value={formData.design.color}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      design: { ...formData.design, color: e.target.value } 
                    })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase text-slate-500">Background</label>
                  <input
                    type="color"
                    className="h-10 w-full cursor-pointer rounded-lg bg-transparent border-none"
                    value={formData.design.bgColor}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      design: { ...formData.design, bgColor: e.target.value } 
                    })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 flex justify-between text-xs font-medium uppercase text-slate-500">
                  <span>QR Size</span>
                  <span>{formData.design.size}px</span>
                </label>
                <div className="flex items-center space-x-4">
                   <Maximize className="h-4 w-4 text-slate-400" />
                   <input
                    type="range"
                    min="200"
                    max="1000"
                    step="50"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    value={formData.design.size}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      design: { ...formData.design, size: parseInt(e.target.value) } 
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-xs font-medium uppercase text-slate-500">Add Brand Logo</label>
                <div className="grid grid-cols-5 gap-2">
                  {logos.map((logo) => (
                    <button
                      key={logo.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, design: { ...formData.design, logoUrl: logo.url } })}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                        formData.design.logoUrl === logo.url 
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {logo.url ? (
                        <img src={logo.url} alt={logo.name} className="h-6 w-6 rounded" />
                      ) : (
                        <div className="h-6 w-6 border-2 border-dashed border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400">×</div>
                      )}
                      <span className="text-[10px] mt-1 truncate w-full text-center">{logo.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 py-3.5 font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <QrCode className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
              Generate Custom QR
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="relative top-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 p-8 dark:border-slate-800 dark:bg-slate-900/20 h-fit ">
          {generatedQR ? (
            <div className="w-full text-center animate-in zoom-in-95 duration-300">
              <div className="mx-auto mb-8 relative inline-block">
                <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full"></div>
                <div className="relative rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <img src={generatedQR.qrImageUrl} alt="Generated QR" className="mx-auto max-w-full h-auto rounded-lg" style={{ width: formData.design.size / 1.5 }} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-bold">{generatedQR.name}</h2>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => downloadQR('png')}
                    className="flex items-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all shadow-lg"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download PNG
                  </button>
                  <button
                    onClick={() => downloadQR('svg')}
                    className="flex items-center rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-sm"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download SVG
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
               <div className="mx-auto mb-6 h-24 w-24 rounded-3xl bg-slate-100 flex items-center justify-center dark:bg-slate-800/50">
                 <ImageIcon className="h-12 w-12 text-slate-300 dark:text-slate-700" />
               </div>
               <p className="text-lg font-bold text-slate-400">Preview Area</p>
               <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">Adjust your settings and generate a QR to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
