// app/dashboard/projects/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Edit3, Save, Video, Image as ImageIcon, X, ExternalLink } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Toast from "@/components/ui/Toast";
import { ResponsiveTable } from "@/components/ui/ResponsiveTable";
import { Pagination } from "@/components/ui/Pagination";
import AdminSearchFilter from "@/components/dashboard/AdminSearchFilter";
import Link from "next/link";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [languageFilter, setLanguageFilter] = useState("en");
  const [search, setSearch] = useState("");
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [editorTab, setEditorTab] = useState<"edit" | "preview">("edit");
  const [previewHtml, setPreviewHtml] = useState("");
  const [loadingPreview, setLoadingPreview] = useState(false);

  const handleTabChange = async (tab: "edit" | "preview") => {
    setEditorTab(tab);
    if (tab === "preview") {
      setLoadingPreview(true);
      try {
        const res = await fetch("/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editingProject?.content || "" }),
        });
        const data = await res.json();
        if (data.success) {
          setPreviewHtml(data.html);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPreview(false);
      }
    }
  };

  // Modals state
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; language: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchProjects = useCallback(async (page = 1, lang = "en", searchQuery = "") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/projects?language=${lang}&page=${page}&pageSize=10&search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && Array.isArray(data.projects)) {
        setProjects(data.projects);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      } else if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects(1, languageFilter, search);
  }, [fetchProjects, languageFilter, search]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.slug || !editingProject?.title) {
      alert("Slug and Title are required");
      return;
    }
    if (!editingProject?.thumbnail) {
      alert("Thumbnail Image URL is required.");
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
        fetchProjects(currentPage, languageFilter);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert("Error: " + message);
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
        fetchProjects(currentPage, languageFilter);
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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Projects</h1>
          <p className="text-xs font-mono text-foreground-muted">Create, edit, and publish bilingual projects with Media Library URLs & markdown.</p>
        </div>
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 w-full sm:w-auto">
          <Link
            href="/dashboard/media"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-surface border border-border text-foreground text-xs font-mono hover:border-accent transition-colors"
            title="Open Media Library to copy URLs"
          >
            <ImageIcon size={14} className="text-accent shrink-0" />
            <span className="truncate">Media</span>
            <ExternalLink size={12} className="text-foreground-muted shrink-0" />
          </Link>
          <button
            onClick={() => {
              setEditingProject({
                slug: "",
                title: "",
                description: "",
                language: languageFilter,
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
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-none bg-accent text-background text-xs font-mono font-bold hover:opacity-95 transition-opacity cursor-pointer truncate"
          >
            <Plus size={16} className="shrink-0" />
            <span className="truncate">New Project</span>
          </button>
        </div>
      </div>

      <AdminSearchFilter
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search projects by title or slug..."
        languageFilter={languageFilter}
        onLanguageChange={setLanguageFilter}
      />

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
              className="text-foreground-muted hover:text-foreground cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center justify-between bg-background border border-border px-4 py-2.5 text-xs font-mono">
              <span className="text-foreground-muted uppercase">Target Language:</span>
              <span className="text-accent font-bold uppercase px-2 py-0.5 bg-accent/10 border border-accent/20">
                {editingProject.language || languageFilter}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Media URL Inputs with Smart Live Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-background/50 border border-border">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-foreground-muted flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-accent" />
                  <span>Thumbnail Image URL <span className="text-accent">*</span></span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={editingProject.thumbnail || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                  />
                  {editingProject.thumbnail && (
                    <div className="w-10 h-10 border border-border bg-background shrink-0 overflow-hidden flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={editingProject.thumbnail} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-foreground-muted flex items-center gap-1.5">
                  <Video size={14} className="text-accent" />
                  <span>Animation Video URL (Optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.animationVideoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, animationVideoUrl: e.target.value })}
                    placeholder="https://res.cloudinary.com/.../video.mp4"
                    className="flex-1 px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                  />
                  {editingProject.animationVideoUrl && (
                    <div className="w-10 h-10 border border-border bg-background shrink-0 overflow-hidden flex items-center justify-center">
                      <Video size={16} className="text-accent animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Single Markdown Textarea Editor with Live Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 bg-background border border-border p-0.5">
                  <button
                    type="button"
                    onClick={() => handleTabChange("edit")}
                    className={`px-3 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                      editorTab === "edit" ? "bg-accent text-background font-bold" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    Edit (Markdown)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange("preview")}
                    className={`px-3 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                      editorTab === "preview" ? "bg-accent text-background font-bold" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    Preview HTML
                  </button>
                </div>
                <span className="text-[11px] font-mono text-accent">Supports Markdown & HTML</span>
              </div>

              {editorTab === "edit" ? (
                <textarea
                  rows={12}
                  required
                  value={editingProject.content || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                  placeholder="## Overview&#10;&#10;Write your markdown content here..."
                  className="w-full p-4 bg-background border border-border text-xs font-mono text-foreground focus:border-accent leading-relaxed"
                />
              ) : (
                <div className="w-full p-6 bg-background border border-border min-h-[300px] max-h-[500px] overflow-y-auto prose prose-invert prose-sm max-w-none text-xs">
                  {loadingPreview ? (
                    <div className="flex items-center justify-center py-12 text-accent font-mono animate-pulse">
                      Processing markdown preview...
                    </div>
                  ) : previewHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                  ) : (
                    <span className="text-foreground-subtle italic">Nothing to preview yet...</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-foreground">
                <input
                  type="checkbox"
                  checked={Boolean(editingProject.featured)}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="rounded-none bg-background border-border text-accent focus:ring-0 cursor-pointer"
                />
                <span>Featured Project</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-surface border border-border text-xs font-mono text-foreground hover:border-accent cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-background text-xs font-mono font-bold hover:opacity-95 cursor-pointer"
                >
                  <Save size={14} />
                  <span>Save Project</span>
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
        emptyMessage={`No projects found for language (${languageFilter.toUpperCase()}). Click 'New Project' to create one.`}
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
                  className="p-1.5 bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors cursor-pointer"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => setDeleteTarget({ slug: p.slug, language: p.language })}
                  className="p-1.5 bg-surface border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors cursor-pointer"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteTarget({ slug: p.slug, language: p.language })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        itemName="projects"
        onPageChange={(page) => fetchProjects(page, languageFilter, search)}
      />
    </div>
  );
}
