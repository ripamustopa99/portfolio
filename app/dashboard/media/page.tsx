// app/dashboard/media/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Video, Plus, X, Maximize2 } from "lucide-react";
import Toast from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { Pagination } from "@/components/ui/Pagination";
import AdminSearchFilter from "@/components/dashboard/AdminSearchFilter";
import CustomSelect from "@/components/ui/CustomSelect";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: string;
  url: string;
  publicId: string;
  resourceType: string;
  filename: string | null;
  category: string;
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
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [uploadCategory, setUploadCategory] = useState("universal");

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedMdId, setCopiedMdId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fetchMedia = useCallback(async (page = 1, searchQuery = "", catFilter = "all") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media?page=${page}&pageSize=12&search=${encodeURIComponent(searchQuery)}&category=${catFilter}`);
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
    fetchMedia(1, search, categoryFilter);
  }, [fetchMedia, search, categoryFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && previewItem) {
        setPreviewItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewItem]);

  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("resourceType", file.type.startsWith("video/") ? "video" : "image");
        formData.append("category", uploadCategory);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!data.success) {
          setToastType("error");
          setToastMessage(`Upload failed for ${file.name}: ${data.error}`);
        }
      }
      setToastType("success");
      setToastMessage("Files uploaded successfully!");
      setIsUploadOpen(false);
      fetchMedia(currentPage, search, categoryFilter);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setToastType("error");
      setToastMessage("Upload error: " + message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget;
    setDeleteTarget(null);

    const previousMediaList = [...mediaList];
    const previousTotalCount = totalCount;

    // Optimistic update
    setMediaList((prev) => prev.filter((item) => item.id !== targetId));
    setTotalCount((prev) => Math.max(0, prev - 1));

    try {
      const res = await fetch(`/api/media?id=${targetId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setToastType("success");
        setToastMessage("Media asset successfully deleted from Cloudinary & database.");
        fetchMedia(currentPage, search, categoryFilter);
      } else {
        setMediaList(previousMediaList);
        setTotalCount(previousTotalCount);
        setToastType("error");
        setToastMessage(data.error || "Failed to delete media asset.");
      }
    } catch (err: unknown) {
      setMediaList(previousMediaList);
      setTotalCount(previousTotalCount);
      const message = err instanceof Error ? err.message : "Network error";
      setToastType("error");
      setToastMessage(`Network connection error: ${message}. Deletion aborted.`);
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
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-xs font-mono text-foreground-muted">
            Manage, preview, and copy URLs or Markdown tags for your photos and videos. ({totalCount} total assets)
          </p>
        </div>
        <button
          onClick={() => setIsUploadOpen(!isUploadOpen)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-accent text-background text-xs font-mono font-bold hover:opacity-95 transition-opacity w-full sm:w-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>Upload Media</span>
        </button>
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} type={toastType} />

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Media Asset"
        message="Are you sure you want to delete this media asset? This action cannot be undone."
      />

      {/* Fullscreen Preview Lightbox Modal */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setPreviewItem(null)}
              className="absolute inset-0 bg-background/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.08, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-surface border border-border p-6 max-w-4xl w-full space-y-4 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="text-xs font-mono text-foreground font-medium truncate max-w-lg" title={previewItem.filename || previewItem.url}>
                  {previewItem.filename || "Media Preview"}
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="text-foreground-muted hover:text-foreground cursor-pointer p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center justify-center bg-background border border-border min-h-[300px] max-h-[70vh] overflow-hidden p-2">
                {previewItem.resourceType === "video" || previewItem.url.match(/\.(mp4|mov|webm)$/i) ? (
                  <video
                    src={previewItem.url}
                    controls
                    autoPlay
                    className="max-h-[65vh] w-full object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewItem.url}
                    alt={previewItem.filename || "Preview"}
                    className="max-h-[65vh] w-auto object-contain"
                  />
                )}
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-mono">
                <span className="text-accent uppercase text-[10px] px-2 py-0.5 bg-accent/10 border border-accent/20">
                  {previewItem.category} • {previewItem.resourceType}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(previewItem.url, previewItem.id, "url")}
                    className="px-3 py-1.5 bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === previewItem.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedId === previewItem.id ? "Copied" : "Copy URL"}</span>
                  </button>
                  <button
                    onClick={() => setPreviewItem(null)}
                    className="px-4 py-1.5 bg-accent text-background font-bold hover:opacity-90 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inline Upload Drawer */}
      {isUploadOpen && (
        <div className="bg-surface border border-border p-6 md:p-8 space-y-6 shadow-2xl relative animate-slide-down">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-sm font-mono uppercase tracking-wider text-accent font-bold">
              Upload New Media Asset
            </h2>
            <button
              onClick={() => setIsUploadOpen(false)}
              className="text-foreground-muted hover:text-foreground cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">
                Category Association
              </label>
              <CustomSelect
                value={uploadCategory}
                onChange={setUploadCategory}
                options={[
                  { value: "universal", label: "Universal (General)" },
                  { value: "projects", label: "Projects" },
                  { value: "notes", label: "Notes" },
                  { value: "profile", label: "Profile" },
                ]}
                uppercase
              />
            </div>

            <label
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-background/50 transition-colors ${
                isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent"
              }`}
            >
              <Upload size={32} className="text-accent" />
              <span className="text-foreground font-medium">Drag & drop files here, or click to browse</span>
              <span className="text-foreground-subtle text-[10px]">PNG, JPG, WEBP, MP4, MOV supported</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {uploading && (
              <div className="text-center text-accent py-2 animate-pulse">
                Uploading files to Cloudinary... Please wait.
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 bg-surface border border-border text-xs font-mono text-foreground hover:border-accent cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <AdminSearchFilter
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by filename or URL..."
        selectValue={categoryFilter}
        onSelectChange={setCategoryFilter}
        options={[
          { value: "all", label: "All Categories" },
          { value: "universal", label: "Universal" },
          { value: "projects", label: "Projects" },
          { value: "notes", label: "Notes" },
          { value: "profile", label: "Profile" },
        ]}
        uppercase
      />

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface/30 border border-border h-64 animate-pulse" />
          ))}
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-surface/30 border border-border p-12 text-center text-xs font-mono text-foreground-muted">
          No media assets found. Click &quot;Upload Media&quot; to add photos or videos.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaList.map((item) => {
            const isVideo = item.resourceType === "video" || item.url.match(/\.(mp4|mov|webm)$/i);
            const markdownSnippet = `![${item.filename || "media"}](${item.url})`;

            return (
              <div key={item.id} className="bg-surface/30 border border-border rounded-none flex flex-col justify-between overflow-hidden group">
                {/* Preview Thumbnail / Video */}
                <div
                  onClick={() => setPreviewItem(item)}
                  className="relative h-40 bg-background flex items-center justify-center overflow-hidden border-b border-border cursor-pointer group/thumb"
                  title="Click to preview fullscreen"
                >
                  {isVideo ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.filename || "Media asset"} className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300" />
                  )}

                  {/* Hover Overlay Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-mono font-bold">
                    <Maximize2 size={16} />
                    <span>Preview</span>
                  </div>

                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-background/80 backdrop-blur-xs border border-border text-[10px] font-mono uppercase text-foreground z-10">
                    {item.category}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-background/80 backdrop-blur-xs border border-border text-[10px] font-mono uppercase text-accent flex items-center gap-1 z-10">
                    {isVideo ? <Video size={10} /> : <ImageIcon size={10} />}
                    {item.resourceType}
                  </span>
                </div>

                {/* Info & Actions */}
                <div className="p-3 space-y-2.5 flex-1 flex flex-col justify-between text-xs font-mono">
                  <div>
                    <div className="text-foreground font-medium truncate" title={item.filename || item.url}>
                      {item.filename || "Unnamed Asset"}
                    </div>
                    <div className="text-foreground-subtle text-[10px] mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-border">
                    <button
                      onClick={() => copyToClipboard(item.url, item.id, "url")}
                      className="flex-1 px-2 py-1.5 bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span className="truncate">{copiedId === item.id ? "Copied" : "URL"}</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(markdownSnippet, item.id, "markdown")}
                      className="flex-1 px-2 py-1.5 bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                      title="Copy Markdown tag"
                    >
                      {copiedMdId === item.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span className="truncate">{copiedMdId === item.id ? "Markdown" : "MD"}</span>
                    </button>

                    <button
                      onClick={() => setDeleteTarget(item.id)}
                      className="px-2.5 py-1.5 bg-surface border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center text-[11px] cursor-pointer"
                      title="Delete asset"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
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
        onPageChange={(page) => fetchMedia(page, search, categoryFilter)}
      />
    </div>
  );
}
