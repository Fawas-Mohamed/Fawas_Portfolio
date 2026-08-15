"use client";

import { useEffect, useState, useCallback } from "react";
import { styles, API_URL } from "./styles";

interface Certificate {
  id: string;
  title: string;
  thumb: string | null;
  orderIndex: number;
  skills?: string[];
}

const emptyForm = { title: "", thumb: "", orderIndex: 0, skills: "" };

export default function CertificationsPanel({ token }: { token: string }) {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/certificates`);
    const body = await res.json().catch(() => ({ data: [] }));
    setItems(body.data ?? []);
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

  function startEdit(c: Certificate) {
    setForm({ title: c.title, thumb: c.thumb ?? "", orderIndex: c.orderIndex, skills: (c.skills || []).join(", ") });
    setEditingId(c.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { title: form.title, thumb: form.thumb || null, orderIndex: Number(form.orderIndex) || 0, skills: (form.skills || "").split(",").map((s: string) => s.trim()).filter(Boolean) };
    const url = editingId ? `${API_URL}/api/certificates/${editingId}` : `${API_URL}/api/certificates`;
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this certificate?")) return;
    await fetch(`${API_URL}/api/certificates/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Certifications</h2>
        <button style={styles.button} onClick={startCreate}>
          + Add Certificate
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <input style={styles.input} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input style={styles.input} placeholder="Thumbnail filename (in public/assets/images/certificates/)" value={form.thumb} onChange={(e) => setForm({ ...form, thumb: e.target.value })} />
          <input style={styles.input} placeholder="Skills (comma-separated, e.g. AWS, TypeScript, Testing)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          <input style={styles.input} type="number" placeholder="Order (lower shows first)" value={form.orderIndex} onChange={(e) => setForm({ ...form, orderIndex: Number(e.target.value) })} />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.button} type="submit">
              {editingId ? "Save changes" : "Create certificate"}
            </button>
            <button style={styles.smallBtn} type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading…</p>}
      {!loading && items.length === 0 && <p>No certificates yet.</p>}
      {items.map((c) => (
        <div key={c.id} style={styles.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{c.title}</strong>
            <span style={{ opacity: 0.6, fontSize: 13 }}>order: {c.orderIndex}</span>
          </div>
          <p style={{ opacity: 0.8, marginTop: 6 }}>{c.thumb}</p>
          <div style={{ marginTop: 10 }}>
            <button style={styles.smallBtn} onClick={() => startEdit(c)}>
              Edit
            </button>
            <button style={styles.smallBtn} onClick={() => handleDelete(c.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
