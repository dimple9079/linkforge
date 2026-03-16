import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import { toast } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react"; // Install: npm i qrcode.react

function QRGenerator() {
  const [text, setText] = useState("");
  const [qrList, setQrList] = useState([]);

  const generateQR = () => {
    if (!text) return toast.error("Enter text/URL");
    const newQR = { text, id: Date.now() };
    setQrList([newQR, ...qrList]);
    setText("");
    toast.success("QR Generated!");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">QR Generator</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={generateQR}>Generate QR</Button>
      </div>

      {qrList.length === 0 && <EmptyState message="No QR codes generated yet." />}

      <div className="flex flex-wrap gap-4">
        {qrList.map((qr) => (
          <GlassCard key={qr.id} title="QR Code" value="">
            <QRCodeCanvas value={qr.text} size={128} className="mb-2" />
            <p className="break-all">{qr.text}</p>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(qr.text);
                  toast.success("Copied!");
                }}
                variant="primary"
              >
                Copy
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
export default QRGenerator;