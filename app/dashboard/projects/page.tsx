// app/dashboard/projects/page.tsx
"use client";

import { useState, useEffect } from "react";
import { FolderKanban, Plus, Trash2, Edit3, Save, Upload, Video, Image as ImageIcon, X } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Toast from "@/components/ui/Toast";
import { ResponsiveTable, Column } from "@/components/ui/ResponsiveTable";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  language: string;
  date: string;
  thumbnail: string;
  animationVideoUrl?: string | null;
  tags: string[];
  techStack: string;
  links: string;
  featured: boolean;
  content: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Modals state
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; language: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects?language=en");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.slug || !editingProject?.title) {
      alert("Slug and Title are required");
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Project saved successfully!");
        setEditingProject(null);
        setIsNew(false);
        fetchProjects();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/projects?slug=${deleteTarget.slug}&language=${deleteTarget.language}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Project deleted successfully!");
        fetchProjects();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "thumbnail" | "animationVideoUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("resourceType", fieldName === "animationVideoUrl" ? "video" : "image");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditingProject((prev) => ({ ...prev, [fieldName]: data.url }));
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err: any) {
      alert("Upload error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Projects</h1>
          <p className="text-xs font-mono text-foreground-muted">Create, edit, and publish bilingual projects with Cloudinary media & markdown.</p>
        </div>
        <button
          onClick={() => {
            setEditingProject({
              slug: "",
              title: "",
              description: "",
              language: "en",
              date: new Date().toISOString().split("T")[0],
              thumbnail: "",
              animationVideoUrl: "",
              tags: ["SaaS", "Next.js"],
              techStack: JSON.stringify([{ category: "Frontend", items: ["Next.js", "TypeScript"] }]),
              links: JSON.stringify({ live: "https://example.com", github: "https://github.com" }),
              featured: true,
              content: "## Overview\n\nWrite project markdown content here...",
            });
            setIsNew(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-accent text-background text-xs font-mono font-bold hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Success Toast Notification */}
      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.slug}" (${deleteTarget?.language})? This action cannot be undone.`}
      />

      {/* Editor Modal / Drawer */}
      {editingProject && (
        <div className="bg-surface border border-border p-6 md:p-8 space-y-6 shadow-2xl relative animate-slide-down">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-sm font-mono uppercase tracking-wider text-accent font-bold">
              {isNew ? "Create New Project" : `Edit Project: ${editingProject.slug}`}
            </h2>
            <button
              onClick={() => setEditingProject(null)}
              className="text-foreground-muted hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Slug</label>
                <input
                  type="text"
                  required
                  value={editingProject.slug || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  placeholder="e.g. saas-dashboard"
                  className="w-full px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Language</label>
                <select
                  value={editingProject.language || "en"}
                  onChange={(e) => setEditingProject({ ...editingProject, language: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent uppercase"
                >
                  <option value="en">English (en)</option>
                  <option value="id">Indonesian (id)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Date</label>
                <input
                  type="date"
                  value={editingProject.date || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Project Title"
                  className="w-full px-3 py-2 bg-background border border-border text-xs text-foreground focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Tags (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProject.tags) ? editingProject.tags.join(", ") : editingProject.tags || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(",").map(s => s.trim()) })}
                  placeholder="SaaS, Next.js, TypeScript"
                  className="w-full px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Description</label>
              <textarea
                rows={2}
                value={editingProject.description || ""}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                placeholder="Short project description..."
                className="w-full px-3 py-2 bg-background border border-border text-xs text-foreground focus:border-accent resize-none"
              />
            </div>

            {/* Cloudinary Media Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-background/50 border border-border">
              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-2 flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-accent" />
                  <span>Thumbnail Image (Cloudinary)</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.thumbnail || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-2 bg-surface border border-border text-xs font-mono text-foreground hover:border-accent">
                    <Upload size={14} />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "thumbnail")} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-2 flex items-center gap-1.5">
                  <Video size={14} className="text-accent" />
                  <span>Animation Video Preview (Dribbble-style, Optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.animationVideoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, animationVideoUrl: e.target.value })}
                    placeholder="https://res.cloudinary.com/.../video.mp4"
                    className="flex-1 px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-2 bg-surface border border-border text-xs font-mono text-foreground hover:border-accent">
                    <Upload size={14} />
                    <span>Upload</span>
                    <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "animationVideoUrl")} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Single Markdown Textarea Editor */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono uppercase text-foreground-muted">
                  Markdown Content (Single Editor)
                </label>
                <span className="text-[11px] font-mono text-accent">Supports Markdown & HTML</span>
              </div>
              <textarea
                rows={12}
                required
                value={editingProject.content || ""}
                onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                placeholder="## Overview&#10;&#10;Write your markdown content here..."
                className="w-full p-4 bg-background border border-border text-xs font-mono text-foreground focus:border-accent leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-foreground">
                <input
                  type="checkbox"
                  checked={Boolean(editingProject.featured)}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="rounded-none bg-background border-border text-accent focus:ring-0"
                />
                <span>Featured Project</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-surface border border-border text-xs font-mono text-foreground hover:border-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-background text-xs font-mono font-bold hover:opacity-90 disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>{uploading ? "Uploading..." : "Save Project"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Table */}
      <ResponsiveTable<ProjectItem>
        data={projects}
        loading={loading}
        keyExtractor={(p) => `${p.slug}-${p.language}`}
        emptyMessage="No projects found. Click 'New Project' to create one."
        columns={[
          {
            header: "Slug / Title",
            cell: (p) => (
              <div>
                <div className="font-bold text-foreground">{p.title}</div>
                <div className="text-[11px] text-foreground-subtle">{p.slug}</div>
              </div>
            ),
          },
          {
            header: "Lang",
            cell: (p) => <span className="uppercase text-accent">{p.language}</span>,
          },
          {
            header: "Date",
            accessorKey: "date",
            className: "text-foreground-muted",
          },
          {
            header: "Featured",
            cell: (p) =>
              p.featured ? (
                <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px]">FEATURED</span>
              ) : (
                <span className="text-foreground-subtle">-</span>
              ),
          },
          {
            header: "Actions",
            className: "text-right",
            cell: (p) => (
              <div className="text-right space-x-2">
                <button
                  onClick={() => {
                    setEditingProject(p);
                    setIsNew(false);
                  }}
                  className="p-1.5 bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => setDeleteTarget({ slug: p.slug, language: p.language })}
                  className="p-1.5 bg-surface border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ),
          },
        ]}
        renderCard={(p) => (
          <div className="bg-surface/40 border border-border p-4 space-y-3 text-xs font-mono">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-bold text-foreground text-sm">{p.title}</div>
                <div className="text-[11px] text-foreground-subtle">{p.slug}</div>
              </div>
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] uppercase shrink-0">
                {p.language}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-foreground-muted pt-2 border-t border-border">
              <div>Date: <span className="text-foreground">{p.date}</span></div>
              <div>
                {p.featured ? (
                  <span className="px-1.5 py-0.5 bg-accent/10 text-accent text-[10px]">FEATURED</span>
                ) : (
                  <span className="text-foreground-subtle">Standard</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  setEditingProject(p);
                  setIsNew(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteTarget({ slug: p.slug, language: p.language })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
