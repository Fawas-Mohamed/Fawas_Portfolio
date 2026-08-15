"use client";

import { useEffect, useState, useCallback } from "react";
import { styles, API_URL } from "./styles";

interface Project {
  id: string;
  title: string;
  tags: string[];
  thumb: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  isFeatured: boolean;
  orderIndex: number;
}

const emptyForm = { title: "", tags: "", thumb: "", githubUrl: "", liveUrl: "", orderIndex: 0 };

export default function ProjectsPanel({ token }: { token: string }) {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/projects`);
    const body = await res.json();
    setItems(body.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(p: Project) {
    setForm({
      title: p.title,
      tags: p.tags.join(", "),
      thumb: p.thumb ?? "",
      githubUrl: p.githubUrl ?? "",
      liveUrl: p.liveUrl ?? "",
      orderIndex: p.orderIndex,
    });
    setEditingId(p.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      thumb: form.thumb || null,
      githubUrl: form.githubUrl || null,
      liveUrl: form.liveUrl || null,
      isFeatured: true,
      orderIndex: Number(form.orderIndex) || 0,
    };
    const url = editingId ? `${API_URL}/api/projects/${editingId}` : `${API_URL}/api/projects`;
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this project?")) return;
    await fetch(`${API_URL}/api/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Projects</h2>
        <button style={styles.button} onClick={startCreate}>
          + Add Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <input
            style={styles.input}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Tags (comma-separated, e.g. React, Node.js)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Thumbnail filename (in public/assets/images/thumbs/)"
            value={form.thumb}
            onChange={(e) => setForm({ ...form, thumb: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="GitHub URL (optional)"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Live demo URL (optional)"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Order (lower shows first)"
            value={form.orderIndex}
            onChange={(e) => setForm({ ...form, orderIndex: Number(e.target.value) })}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.button} type="submit">
              {editingId ? "Save changes" : "Create project"}
            </button>
            <button style={styles.smallBtn} type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading…</p>}
      {!loading && items.length === 0 && <p>No projects yet.</p>}
      {items.map((p) => (
        <div key={p.id} style={styles.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{p.title}</strong>
            <span style={{ opacity: 0.6, fontSize: 13 }}>order: {p.orderIndex}</span>
          </div>
          <p style={{ opacity: 0.8, marginTop: 6 }}>{p.tags.join(" · ")}</p>
          <div style={{ marginTop: 10 }}>
            <button style={styles.smallBtn} onClick={() => startEdit(p)}>
              Edit
            </button>
            <button style={styles.smallBtn} onClick={() => handleDelete(p.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
