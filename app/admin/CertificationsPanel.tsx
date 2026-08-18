"use client";

import { useEffect, useState, useCallback } from "react";
import { styles, API_URL } from "./styles";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  skill: string[];
  date: string;
  image: string | null;
  credentialId: string | null;
  verifyUrl: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

interface CertificateForm {
  name: string;
  issuer: string;
  skill: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  isPublished: boolean;
  orderIndex: number;
  image: string;
}

const emptyForm: CertificateForm = {
  name: "",
  issuer: "",
  skill: "",
  date: "",
  credentialId: "",
  verifyUrl: "",
  isPublished: true,
  orderIndex: 0,
  image: "",
};

function getApiErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;

  const data = body as Record<string, unknown>;
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  if (data.error && typeof data.error === "object" && "message" in data.error && typeof (data.error as Record<string, unknown>).message === "string") {
    return (data.error as Record<string, unknown>).message as string;
  }

  if (data.errors) {
    if (Array.isArray(data.errors)) {
      const list = data.errors
        .map((entry) => {
          if (typeof entry === "string") return entry;
          if (entry && typeof entry === "object") {
            const item = entry as Record<string, unknown>;
            if (typeof item.message === "string") return item.message;
            if (typeof item.msg === "string") return item.msg;
          }
          return null;
        })
        .filter(Boolean);
      if (list.length > 0) return list.join(", ");
    }

    if (typeof data.errors === "object" && data.errors !== null) {
      const list = Object.entries(data.errors as Record<string, unknown>)
        .map(([key, value]) => {
          if (typeof value === "string") return `${key}: ${value}`;
          if (Array.isArray(value)) return `${key}: ${value.join(", ")}`;
          return `${key}: ${JSON.stringify(value)}`;
        })
        .filter(Boolean);
      if (list.length > 0) return list.join(" | ");
    }
  }

  try {
    const serialized = JSON.stringify(body);
    if (serialized && serialized !== "{}") return serialized;
  } catch {
    // ignore
  }

  return fallback;
}

async function parseJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export default function CertificationsPanel({ token }: { token: string }) {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CertificateForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/certificates/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        cache: "no-store",
      });

      const body = await parseJsonResponse(res);
      if (!res.ok) {
        throw new Error(getApiErrorMessage(body, `Failed to load certificates (${res.status})`));
      }

      const data = body && typeof body === "object" && "data" in body
        ? (body as Record<string, unknown>).data
        : body;

      setItems(Array.isArray(data) ? (data as Certificate[]) : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load certificates.";
      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setSelectedImageFile(null);
    setImagePreview(null);
  }

  function startCreate() {
    resetForm();
    setShowForm(true);
  }

  function startEdit(c: Certificate) {
    setForm({
      name: c.name ?? "",
      issuer: c.issuer ?? "",
      skill: (c.skill ?? []).join(", "),
      date: c.date ?? "",
      credentialId: c.credentialId ?? "",
      verifyUrl: c.verifyUrl ?? "",
      isPublished: c.isPublished,
      orderIndex: c.orderIndex,
      image: c.image ?? "",
    });
    setEditingId(c.id);
    setSelectedImageFile(null);
    setImagePreview(c.image ? `${API_URL}/assets/images/certificates/${c.image}` : null);
    setShowForm(true);
  }

  function handleFileChange(file: File | null) {
    setSelectedImageFile(file);
    if (!file) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("issuer", form.issuer.trim());
      payload.append("skill", form.skill);
      payload.append("date", form.date);
      payload.append("credentialId", form.credentialId.trim());
      payload.append("verifyUrl", form.verifyUrl.trim());
      payload.append("isPublished", String(form.isPublished));
      payload.append("orderIndex", String(Number(form.orderIndex) || 0));

      if (selectedImageFile) {
        payload.append("image", selectedImageFile);
      } else if (editingId && form.image) {
        payload.append("image", form.image);
      }

      const url = editingId ? `${API_URL}/api/certificates/${editingId}` : `${API_URL}/api/certificates`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      const body = await parseJsonResponse(res);
      if (!res.ok) {
        throw new Error(getApiErrorMessage(body, `Certificate save failed (${res.status})`));
      }

      setSuccess(editingId ? "Certificate updated successfully." : "Certificate created successfully.");
      setShowForm(false);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save certificate.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this certificate permanently?")) return;

    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const body = await parseJsonResponse(res);
        throw new Error(getApiErrorMessage(body, `Failed to delete certificate (${res.status})`));
      }

      setSuccess("Certificate deleted successfully.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete certificate.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Certifications</h2>
        <button style={styles.button} onClick={startCreate}>
          + Add Certificate
        </button>
      </div>

      {error && <div style={{ color: "#ffd7d7", marginBottom: 12 }}>{error}</div>}
      {success && <div style={{ color: "#d2f9d0", marginBottom: 12 }}>{success}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard} encType="multipart/form-data">
          <input
            style={styles.input}
            placeholder="Certificate Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Issuer"
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Skills (comma-separated, e.g. Azure, Cloud, Deployment)"
            value={form.skill}
            onChange={(e) => setForm({ ...form, skill: e.target.value })}
          />
          <input
            style={styles.input}
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Credential ID (optional)"
            value={form.credentialId}
            onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
          />
          <input
            style={styles.input}
            type="url"
            placeholder="Verification URL (optional)"
            value={form.verifyUrl}
            onChange={(e) => setForm({ ...form, verifyUrl: e.target.value })}
          />

          <label style={{ display: "block", marginBottom: 8, color: "#fff" }}>
            Certificate Image
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
            style={{ ...styles.input, padding: 8 }}
          />
          {imagePreview && (
            <div style={{ marginBottom: 12 }}>
              <img src={imagePreview} alt="certificate preview" style={{ maxWidth: 180, maxHeight: 120, objectFit: "cover", borderRadius: 8 }} />
            </div>
          )}

          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            Published
          </label>

          <input
            style={styles.input}
            type="number"
            placeholder="Order"
            value={form.orderIndex}
            onChange={(e) => setForm({ ...form, orderIndex: Number(e.target.value) || 0 })}
          />

          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.button} type="submit" disabled={saving}>
              {saving ? (editingId ? "Saving..." : "Creating...") : editingId ? "Save changes" : "Create certificate"}
            </button>
            <button
              style={styles.smallBtn}
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading…</p>}
      {!loading && items.length === 0 && <p>No certificates yet.</p>}

      {items.map((c) => (
        <div key={c.id} style={styles.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {c.image ? (
                <img
                  src={`${API_URL}/assets/images/certificates/${c.image}`}
                  alt={c.name}
                  style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8 }}
                />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: 8, background: "rgba(255,255,255,0.08)" }} />
              )}
              <div>
                <strong>{c.name}</strong>
                <div style={{ opacity: 0.8, fontSize: 13 }}>{c.issuer}</div>
                <div style={{ opacity: 0.7, fontSize: 12 }}>{c.date}</div>
              </div>
            </div>
            <span style={{ opacity: 0.6, fontSize: 13 }}>order: {c.orderIndex}</span>
          </div>

          <p style={{ opacity: 0.8, marginTop: 10, marginBottom: 8 }}>{(c.skill ?? []).join(" • ") || "No skills"}</p>
          <p style={{ opacity: 0.7, margin: 0, fontSize: 12 }}>
            {c.isPublished ? "Published" : "Hidden"}
          </p>

          <div style={{ marginTop: 10 }}>
            <button style={styles.smallBtn} onClick={() => startEdit(c)}>
              Edit
            </button>
            <button style={styles.smallBtn} onClick={() => handleDelete(c.id)} disabled={deletingId === c.id}>
              {deletingId === c.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
