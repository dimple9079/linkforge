import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import GlassCard from "../components/GlassCard";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import { toast } from "react-hot-toast";
import { copyToClipboard, downloadFile } from "../utilities/Helpers";
import { DummyLinks } from "../data/DummyLinks";
import Button from "../components/Button";

function URLShortener() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState(DummyLinks);
  const [loading, setLoading] = useState(false);

  const handleShorten = () => {
    if (!url) return toast.error("Enter a URL");
    setLoading(true);
    setTimeout(() => {
      const shortCode = Math.random().toString(36).substring(2, 8);
      const newLink = {
        title: "New Link",
        original: url,
        short: `https://short.ly/${shortCode}`,
        clicks: 0,
      };
      setLinks([newLink, ...links]);
      setUrl("");
      setLoading(false);
      toast.success("URL shortened!");
    }, 800);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">URL Shortener</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={handleShorten}>Shorten</Button>
      </div>

      {loading && (
        <div className="flex flex-wrap gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!loading && links.length === 0 && <EmptyState message="No links created yet." />}

      <div className="flex flex-wrap gap-4">
        {links.map((link, i) => (
          <GlassCard key={i} title={link.title} value={link.short}>
            <p>Original: {link.original}</p>
            <p>Clicks: {link.clicks}</p>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => {
                  copyToClipboard(link.short);
                  toast.success("Copied!");
                }}
                variant="primary"
              >
                Copy
              </Button>
              <Button
                onClick={() => downloadFile("link.txt", link.short)}
                variant="secondary"
              >
                Download
              </Button>
              <Button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: link.title, url: link.short });
                  } else toast("Share not supported");
                }}
                variant="secondary"
              >
                Share
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
export default URLShortener;