"use client";

import { useEffect, useState, useCallback } from "react";
import { styles, API_URL } from "./styles";

interface Highlight {
  id: string;
  number: string;
  title: string;
  tags: string[];
  thumb: string | null;
  orderIndex: number;
}

const emptyForm = { number: "01", title: "", tags: "", thumb: "", orderIndex: 0 };

export default function HighlightsPanel({ token }: { token: string }) {
  const [items, setItems] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/highlights`);
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

  function startEdit(h: Highlight) {
    setForm({ number: h.number, title: h.title, tags: h.tags.join(", "), thumb: h.thumb ?? "", orderIndex: h.orderIndex });
    setEditingId(h.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      number: form.number,
      title: form.title,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      thumb: form.thumb || null,
      orderIndex: Number(form.orderIndex) || 0,
    };
    const url = editingId ? `${API_URL}/api/highlights/${editingId}` : `${API_URL}/api/highlights`;
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this highlight?")) return;
    await fetch(`${API_URL}/api/highlights/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Skill Highlights (homepage service cards)</h2>
        <button style={styles.button} onClick={startCreate}>
          + Add Highlight
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <input style={styles.input} placeholder="Number (e.g. 01)" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} required />
          <input style={styles.input} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input style={styles.input} placeholder="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <input
            style={styles.input}
            placeholder="Thumbnail filename (in public/assets/images/thumbs/)"
            value={form.thumb}
            onChange={(e) => setForm({ ...form, thumb: e.target.value })}
          />
          <input style={styles.input} type="number" placeholder="Order" value={form.orderIndex} onChange={(e) => setForm({ ...form, orderIndex: Number(e.target.value) })} />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.button} type="submit">
              {editingId ? "Save changes" : "Create highlight"}
            </button>
            <button style={styles.smallBtn} type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading…</p>}
      {!loading && items.length === 0 && <p>No highlights yet.</p>}
      {items.map((h) => (
        <div key={h.id} style={styles.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>
              {h.number} — {h.title}
            </strong>
            <span style={{ opacity: 0.6, fontSize: 13 }}>order: {h.orderIndex}</span>
          </div>
          <p style={{ opacity: 0.8, marginTop: 6 }}>{h.tags.join(" · ")}</p>
          <div style={{ marginTop: 10 }}>
            <button style={styles.smallBtn} onClick={() => startEdit(h)}>
              Edit
            </button>
            <button style={styles.smallBtn} onClick={() => handleDelete(h.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
