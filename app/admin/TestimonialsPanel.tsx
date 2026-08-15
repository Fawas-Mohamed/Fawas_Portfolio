"use client";

import { useEffect, useState, useCallback } from "react";
import { styles, API_URL } from "./styles";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  thumb: string | null;
  isApproved: boolean;
  orderIndex: number;
}

const emptyForm = { name: "", role: "", quote: "", thumb: "", orderIndex: 0 };

export default function TestimonialsPanel({ token }: { token: string }) {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/testimonials/all`, { headers: { Authorization: `Bearer ${token}` } });
    const body = await res.json();
    setItems(body.data);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  function startCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(t: Testimonial) {
    setForm({ name: t.name, role: t.role, quote: t.quote, thumb: t.thumb ?? "", orderIndex: t.orderIndex });
    setEditingId(t.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: form.name,
      role: form.role,
      quote: form.quote,
      thumb: form.thumb || null,
      isApproved: true,
      orderIndex: Number(form.orderIndex) || 0,
    };
    const url = editingId ? `${API_URL}/api/testimonials/${editingId}` : `${API_URL}/api/testimonials`;
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setShowForm(false);
    load();
  }

  async function toggleApproval(t: Testimonial) {
    await fetch(`${API_URL}/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isApproved: !t.isApproved }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this testimonial?")) return;
    await fetch(`${API_URL}/api/testimonials/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Testimonials</h2>
        <button style={styles.button} onClick={startCreate}>
          + Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <input style={styles.input} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input style={styles.input} placeholder="Role / title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          <textarea style={styles.textarea} placeholder="Quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
          <input
            style={styles.input}
            placeholder="Thumbnail filename (in public/assets/images/thumbs/)"
            value={form.thumb}
            onChange={(e) => setForm({ ...form, thumb: e.target.value })}
          />
          <input style={styles.input} type="number" placeholder="Order" value={form.orderIndex} onChange={(e) => setForm({ ...form, orderIndex: Number(e.target.value) })} />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.button} type="submit">
              {editingId ? "Save changes" : "Create testimonial"}
            </button>
            <button style={styles.smallBtn} type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading…</p>}
      {!loading && items.length === 0 && <p>No testimonials yet.</p>}
      {items.map((t) => (
        <div key={t.id} style={styles.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>
              {t.name} — <span style={{ fontWeight: 400, opacity: 0.8 }}>{t.role}</span>
            </strong>
            <span
              style={{
                background: t.isApproved ? "#F2B759" : "rgba(255,255,255,0.2)",
                color: t.isApproved ? "#0A4A3C" : "#fff",
                padding: "2px 10px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {t.isApproved ? "PUBLIC" : "HIDDEN"}
            </span>
          </div>
          <p style={{ marginTop: 8 }}>{t.quote}</p>
          <div style={{ marginTop: 10 }}>
            <button style={styles.smallBtn} onClick={() => startEdit(t)}>
              Edit
            </button>
            <button style={styles.smallBtn} onClick={() => toggleApproval(t)}>
              {t.isApproved ? "Hide from site" : "Publish to site"}
            </button>
            <button style={styles.smallBtn} onClick={() => handleDelete(t.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
