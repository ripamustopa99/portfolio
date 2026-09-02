// app/dashboard/media/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Video, Search, Plus, X } from "lucide-react";
import Toast from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { Pagination } from "@/components/ui/Pagination";

interface MediaItem {
  id: string;
  url: string;
  publicId: string;
  resourceType: string;
  filename: string | null;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedMdId, setCopiedMdId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchMedia = useCallback(async (page = 1, searchQuery = "") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media?page=${page}&pageSize=12&search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && Array.isArray(data.media)) {
        setMediaList(data.media);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMedia(1, search);
  }, [fetchMedia, search]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("resourceType", file.type.startsWith("video/") ? "video" : "image");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!data.success) {
          alert(`Upload failed for ${file.name}: ${data.error}`);
        }
      }
      setSuccessMessage("Files uploaded successfully!");
      setIsUploadModalOpen(false);
      fetchMedia(currentPage, search);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert("Upload error: " + message);
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/media?id=${deleteTarget}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Media deleted successfully!");
        fetchMedia(currentPage, search);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert("Error: " + message);
    } finally {
      setDeleteTarget(null);
    }
  };

  const copyToClipboard = (text: string, id: string, type: "url" | "markdown") => {
    navigator.clipboard.writeText(text);
    if (type === "url") {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopiedMdId(id);
      setTimeout(() => setCopiedMdId(null), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-xs font-mono text-foreground-muted">
            Manage, preview, and copy URLs or Markdown tags for your photos and videos. ({totalCount} total assets)
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-accent text-background text-xs font-mono font-bold hover:opacity-90 transition-opacity w-full sm:w-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>Upload Media</span>
        </button>
      </div>

      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Media Asset"
        message="Are you sure you want to delete this media asset? This action cannot be undone."
      />

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border p-6 md:p-8 space-y-6 w-full max-w-lg shadow-2xl relative animate-slide-down">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="text-sm font-mono uppercase tracking-wider text-accent font-bold">
                Upload New Media
              </h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-foreground-muted hover:text-foreground cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <label className="border-2 border-dashed border-border p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-background/50 hover:border-accent transition-colors">
                <Upload size={32} className="text-accent" />
                <span className="text-foreground font-medium">Click to upload images or videos</span>
                <span className="text-foreground-subtle text-[10px]">PNG, JPG, WEBP, MP4, MOV supported</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              {uploading && (
                <div className="text-center text-accent py-2 animate-pulse">
                  Uploading files to Cloudinary... Please wait.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-surface/30 border border-border p-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename or URL..."
            className="w-full pl-9 pr-4 py-2 rounded-none bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-surface/30 border border-border h-64 animate-pulse" />
          ))}
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-surface/30 border border-border p-12 text-center text-xs font-mono text-foreground-muted">
          No media assets found. Click &quot;Upload Media&quot; to add photos or videos.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map((item) => {
            const isVideo = item.resourceType === "video" || item.url.match(/\.(mp4|mov|webm)$/i);
            const markdownSnippet = `![${item.filename || "media"}](${item.url})`;

            return (
              <div key={item.id} className="bg-surface/30 border border-border rounded-none flex flex-col justify-between overflow-hidden group">
                {/* Preview Thumbnail / Video */}
                <div className="relative h-40 bg-background flex items-center justify-center overflow-hidden border-b border-border">
                  {isVideo ? (
                    <video src={item.url} className="w-full h-full object-cover" muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.filename || "Media asset"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-background/80 backdrop-blur-xs border border-border text-[10px] font-mono uppercase text-accent flex items-center gap-1">
                    {isVideo ? <Video size={10} /> : <ImageIcon size={10} />}
                    {item.resourceType}
                  </span>
                </div>

                {/* Info & Actions */}
                <div className="p-3 space-y-3 flex-1 flex flex-col justify-between text-xs font-mono">
                  <div>
                    <div className="text-foreground font-medium truncate" title={item.filename || item.url}>
                      {item.filename || "Unnamed Asset"}
                    </div>
                    <div className="text-foreground-subtle text-[10px] mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-border">
                    <button
                      onClick={() => copyToClipboard(item.url, item.id, "url")}
                      className="px-2 py-1.5 bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedId === item.id ? "Copied" : "Copy URL"}</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(markdownSnippet, item.id, "markdown")}
                      className="px-2 py-1.5 bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                      title="Copy Markdown tag"
                    >
                      {copiedMdId === item.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedMdId === item.id ? "Markdown" : "Copy MD"}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setDeleteTarget(item.id)}
                    className="w-full py-1.5 bg-surface border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        itemName="media assets"
        onPageChange={(page) => fetchMedia(page, search)}
      />
    </div>
  );
}
