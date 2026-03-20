import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Search, Filter, Trash2, ExternalLink, Download, Copy, ToggleLeft, ToggleRight, MoreVertical } from 'lucide-react';

const QRHistory = () => {
  const [qrs, setQrs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQRs = async () => {
    try {
      const { data } = await api.get('/qr');
      setQrs(data);
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this QR Code?')) return;
    try {
      await api.delete(`qr/${id}`);
      setQrs(qrs.filter(q => q._id !== id));
      toast.success('QR Code deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied!');
  };

  const downloadQR = (id, name, format) => {
    window.open(`${import.meta.env.VITE_API_URL}/qr/${id}/download/${format}`, '_blank');
    toast.success(`Downloading ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">QR History</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and track your generated QR codes.</p>
        </div>
        <div className="flex space-x-3">
             <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search QRs..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900"
                />
             </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4">QR / Name</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Scans</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Downloads</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center">Loading...</td></tr>
              ) : qrs.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-slate-500">No QR codes found.</td></tr>
              ) : qrs.map((qr) => (
                <tr key={qr._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    <div className="flex items-center">
                      <div className="mr-4 h-12 w-12 shrink-0 bg-white p-1 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                        <img src={qr.qrImageUrl} alt={qr.name} className="h-full w-full object-contain" />
                      </div>
                      <span className="truncate font-bold">{qr.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center">max-w-[150px]
                      <span className="truncate  text-xs font-mono">{qr.originalUrl}</span>
                      <button onClick={() => copyToClipboard(qr.originalUrl)} className="ml-2 text-slate-300 hover:text-blue-500 transition-colors">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                      qr.isDynamic 
                        ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' 
                        : 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                    }`}>
                      {qr.isDynamic ? 'Dynamic' : 'Static'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{qr.scanCount}</div>
                    <p className="text-[10px] text-slate-400">Scans</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(qr.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button 
                         onClick={() => downloadQR(qr._id, qr.name, 'png')}
                         className="p-1.5 text-xs font-bold border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                       >
                         PNG
                       </button>
                       <button 
                         onClick={() => downloadQR(qr._id, qr.name, 'svg')}
                         className="p-1.5 text-xs font-bold border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                       >
                         SVG
                       </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button 
                        onClick={() => handleDelete(qr._id)} 
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QRHistory;
