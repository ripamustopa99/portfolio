// app/dashboard/notes/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Toast from "@/components/ui/Toast";
import { ResponsiveTable } from "@/components/ui/ResponsiveTable";

interface NoteItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  language: string;
  date: string;
  tags: string[];
  content: string;
}

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Partial<NoteItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Modals state
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; language: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes?language=en");
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotes(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotes();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote?.slug || !editingNote?.title) {
      alert("Slug and Title are required");
      return;
    }

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingNote),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Note saved successfully!");
        setEditingNote(null);
        setIsNew(false);
        fetchNotes();
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
      const res = await fetch(`/api/notes?slug=${deleteTarget.slug}&language=${deleteTarget.language}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Note deleted successfully!");
        fetchNotes();
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
          <h1 className="text-2xl font-bold text-foreground">Manage Notes</h1>
          <p className="text-xs font-mono text-foreground-muted">Create, edit, and publish technical learning logs and articles.</p>
        </div>
        <button
          onClick={() => {
            setEditingNote({
              slug: "",
              title: "",
              description: "",
              language: "en",
              date: new Date().toISOString().split("T")[0],
              tags: ["TypeScript", "Architecture"],
              content: "## Introduction\n\nWrite note content here...",
            });
            setIsNew(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-accent text-background text-xs font-mono font-bold hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          <Plus size={16} />
          <span>New Note</span>
        </button>
      </div>

      {/* Success Toast Notification */}
      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Note"
        message={`Are you sure you want to delete note "${deleteTarget?.slug}" (${deleteTarget?.language})? This action cannot be undone.`}
      />

      {/* Editor Modal / Drawer */}
      {editingNote && (
        <div className="bg-surface border border-border p-6 md:p-8 space-y-6 shadow-2xl relative animate-slide-down">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-sm font-mono uppercase tracking-wider text-accent font-bold">
              {isNew ? "Create New Note" : `Edit Note: ${editingNote.slug}`}
            </h2>
            <button
              onClick={() => setEditingNote(null)}
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
                  value={editingNote.slug || ""}
                  onChange={(e) => setEditingNote({ ...editingNote, slug: e.target.value })}
                  placeholder="e.g. typescript-tips"
                  className="w-full px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Language</label>
                <select
                  value={editingNote.language || "en"}
                  onChange={(e) => setEditingNote({ ...editingNote, language: e.target.value })}
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
                  value={editingNote.date || ""}
                  onChange={(e) => setEditingNote({ ...editingNote, date: e.target.value })}
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
                  value={editingNote.title || ""}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  placeholder="Note Title"
                  className="w-full px-3 py-2 bg-background border border-border text-xs text-foreground focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Tags (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingNote.tags) ? editingNote.tags.join(", ") : editingNote.tags || ""}
                  onChange={(e) => setEditingNote({ ...editingNote, tags: e.target.value.split(",").map(s => s.trim()) })}
                  placeholder="TypeScript, DX"
                  className="w-full px-3 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">Description</label>
              <textarea
                rows={2}
                value={editingNote.description || ""}
                onChange={(e) => setEditingNote({ ...editingNote, description: e.target.value })}
                placeholder="Short note description..."
                className="w-full px-3 py-2 bg-background border border-border text-xs text-foreground focus:border-accent resize-none"
              />
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
                value={editingNote.content || ""}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                placeholder="## Section Title&#10;&#10;Write your note markdown here..."
                className="w-full p-4 bg-background border border-border text-xs font-mono text-foreground focus:border-accent leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setEditingNote(null)}
                className="px-4 py-2 bg-surface border border-border text-xs font-mono text-foreground hover:border-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-background text-xs font-mono font-bold hover:opacity-90"
              >
                <Save size={14} />
                <span>Save Note</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List Table */}
      <ResponsiveTable<NoteItem>
        data={notes}
        loading={loading}
        keyExtractor={(n) => `${n.slug}-${n.language}`}
        emptyMessage="No notes found. Click 'New Note' to create one."
        columns={[
          {
            header: "Slug / Title",
            cell: (n) => (
              <div>
                <div className="font-bold text-foreground">{n.title}</div>
                <div className="text-[11px] text-foreground-subtle">{n.slug}</div>
              </div>
            ),
          },
          {
            header: "Lang",
            cell: (n) => <span className="uppercase text-accent">{n.language}</span>,
          },
          {
            header: "Date",
            accessorKey: "date",
            className: "text-foreground-muted",
          },
          {
            header: "Actions",
            className: "text-right",
            cell: (n) => (
              <div className="text-right space-x-2">
                <button
                  onClick={() => {
                    setEditingNote(n);
                    setIsNew(false);
                  }}
                  className="p-1.5 bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => setDeleteTarget({ slug: n.slug, language: n.language })}
                  className="p-1.5 bg-surface border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ),
          },
        ]}
        renderCard={(n) => (
          <div className="bg-surface/40 border border-border p-4 space-y-3 text-xs font-mono">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-bold text-foreground text-sm">{n.title}</div>
                <div className="text-[11px] text-foreground-subtle">{n.slug}</div>
              </div>
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] uppercase shrink-0">
                {n.language}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-foreground-muted pt-2 border-t border-border">
              <div>Date: <span className="text-foreground">{n.date}</span></div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  setEditingNote(n);
                  setIsNew(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteTarget({ slug: n.slug, language: n.language })}
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
