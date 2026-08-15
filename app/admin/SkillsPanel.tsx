"use client";

import { useEffect, useState, useCallback } from "react";
import { styles, API_URL } from "./styles";

interface Skill {
  id: string;
  category: string;
  name: string;
  orderIndex: number;
}

const emptyForm = { category: "Core", name: "", orderIndex: 0 };

export default function SkillsPanel({ token }: { token: string }) {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/skills`);
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

  function startEdit(s: Skill) {
    setForm({ category: s.category, name: s.name, orderIndex: s.orderIndex });
    setEditingId(s.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { category: form.category, name: form.name, orderIndex: Number(form.orderIndex) || 0 };
    const url = editingId ? `${API_URL}/api/skills/${editingId}` : `${API_URL}/api/skills`;
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this skill?")) return;
    await fetch(`${API_URL}/api/skills/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Skills (Core Technologies grid)</h2>
        <button style={styles.button} onClick={startCreate}>
          + Add Skill
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <input
            style={styles.input}
            placeholder="Category (e.g. Frontend, Backend, Database, Cloud)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Skill name (e.g. React.js)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
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
              {editingId ? "Save changes" : "Create skill"}
            </button>
            <button style={styles.smallBtn} type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading…</p>}
      {!loading && items.length === 0 && <p>No skills yet.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {items.map((s) => (
          <div key={s.id} style={{ ...styles.itemCard, marginBottom: 0, padding: "12px 16px" }}>
            <div style={{ fontWeight: 700 }}>{s.name}</div>
            <div style={{ opacity: 0.7, fontSize: 12 }}>
              {s.category} · order {s.orderIndex}
            </div>
            <div style={{ marginTop: 8 }}>
              <button style={styles.smallBtn} onClick={() => startEdit(s)}>
                Edit
              </button>
              <button style={styles.smallBtn} onClick={() => handleDelete(s.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
