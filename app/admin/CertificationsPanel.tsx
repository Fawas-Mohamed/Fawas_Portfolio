"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { styles, API_URL } from "./styles";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  skills: string[];
  image: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

interface CertificateForm {
  name: string;
  issuer: string;
  skills: string;
  isPublished: boolean;
  orderIndex: number;
}

const emptyForm: CertificateForm = { name: "", issuer: "", skills: "", isPublished: true, orderIndex: 0 };

function getApiErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const data = body as Record<string, unknown>;
  if (data.error && typeof data.error === "object" && typeof (data.error as Record<string, unknown>).message === "string") {
    return (data.error as Record<string, string>).message;
  }
  if (Array.isArray(data.errors)) return data.errors.map((entry) => typeof entry === "string" ? entry : JSON.stringify(entry)).join(", ");
  return typeof data.message === "string" ? data.message : fallback;
}

async function parseJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/certificates/all`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        cache: "no-store",
      });
      const body = await parseJsonResponse(response);
      if (!response.ok) throw new Error(getApiErrorMessage(body, `Failed to load certificates (${response.status})`));
      const data = body && typeof body === "object" && "data" in body ? (body as { data: unknown }).data : body;
      setItems(Array.isArray(data) ? data as Certificate[] : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, [load]);

  function revokePreviewObjectUrl() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setSelectedImage(null);
    revokePreviewObjectUrl();
    setImagePreview(null);
  }

  function startEdit(certificate: Certificate) {
    setForm({ name: certificate.name, issuer: certificate.issuer, skills: certificate.skills.join(", "), isPublished: certificate.isPublished, orderIndex: certificate.orderIndex });
    setEditingId(certificate.id);
    setSelectedImage(null);
    revokePreviewObjectUrl();
    setImagePreview(certificate.imageUrl);
    setShowForm(true);
  }

  function handleImageChange(file: File | null) {
    revokePreviewObjectUrl();
    setSelectedImage(file);
    if (!file) {
      setImagePreview(editingId ? items.find((item) => item.id === editingId)?.imageUrl ?? null : null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setImagePreview(objectUrl);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("issuer", form.issuer.trim());
      payload.append("skills", form.skills);
      payload.append("isPublished", String(form.isPublished));
      payload.append("orderIndex", String(Number(form.orderIndex) || 0));
      if (selectedImage) payload.append("image", selectedImage);
      const response = await fetch(`${API_URL}/api/certificates${editingId ? `/${editingId}` : ""}`, {
        method: editingId ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });
      const body = await parseJsonResponse(response);
      if (!response.ok) throw new Error(getApiErrorMessage(body, `Certificate save failed (${response.status})`));
      const certificate = (body as { data: Certificate }).data;
      setItems((current) => (editingId ? current.map((item) => item.id === certificate.id ? certificate : item) : [...current, certificate]).sort((a, b) => a.orderIndex - b.orderIndex));
      setSuccess(editingId ? "Certificate updated successfully." : "Certificate created successfully.");
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save certificate.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(certificate: Certificate) {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/certificates/${certificate.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !certificate.isPublished }),
      });
      const body = await parseJsonResponse(response);
      if (!response.ok) throw new Error(getApiErrorMessage(body, `Failed to update certificate (${response.status})`));
      const updated = (body as { data: Certificate }).data;
      setItems((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update certificate.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this certificate permanently?")) return;
    setDeletingId(id);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/certificates/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const body = await parseJsonResponse(response);
      if (!response.ok) throw new Error(getApiErrorMessage(body, `Failed to delete certificate (${response.status})`));
      setItems((current) => current.filter((item) => item.id !== id));
      setSuccess("Certificate deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete certificate.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Certificates</h2>
        <button style={styles.button} onClick={() => { resetForm(); setShowForm(true); }}>+ Add Certificate</button>
      </div>
      {error && <div style={{ color: "#ffd7d7", marginBottom: 12 }}>{error}</div>}
      {success && <div style={{ color: "#d2f9d0", marginBottom: 12 }}>{success}</div>}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <input style={styles.input} placeholder="Certificate Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <input style={styles.input} placeholder="Issuer" value={form.issuer} onChange={(event) => setForm({ ...form, issuer: event.target.value })} required />
          <input style={styles.input} placeholder="Skills (3–5, comma-separated)" value={form.skills} onChange={(event) => setForm({ ...form, skills: event.target.value })} required />
          <label style={{ display: "block", marginBottom: 8, color: "#fff" }}>
            Certificate Image (recommended)
          </label>
          <input
            style={{ ...styles.input, padding: 8 }}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => handleImageChange(event.target.files?.[0] ?? null)}
          />
          <p style={{ opacity: 0.75, fontSize: 12, marginTop: -4 }}>
            Selecting a new image replaces the current image. Maximum size: 5 MB.
          </p>
          {imagePreview && (
            <img src={imagePreview} alt="Certificate preview" style={{ width: 180, height: 110, objectFit: "contain", background: "#fff", borderRadius: 8, marginBottom: 12 }} />
          )}
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /> Published</label>
          <input style={styles.input} type="number" placeholder="Order" value={form.orderIndex} onChange={(event) => setForm({ ...form, orderIndex: Number(event.target.value) || 0 })} />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.button} type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Save changes" : "Create certificate"}</button>
            <button style={styles.smallBtn} type="button" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      )}
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No certificates yet.</p>}
      {items.map((certificate) => (
        <div key={certificate.id} style={styles.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
              {certificate.imageUrl ? (
                <img src={certificate.imageUrl} alt={`${certificate.name} thumbnail`} style={{ width: 72, height: 52, objectFit: "contain", background: "#fff", borderRadius: 6 }} />
              ) : (
                <div style={{ width: 72, height: 52, borderRadius: 6, background: "rgba(255,255,255,0.08)" }} />
              )}
              <div><strong>{certificate.name}</strong><div style={{ opacity: 0.8, fontSize: 13 }}>{certificate.issuer}</div></div>
            </div>
            <span style={{ opacity: 0.6, fontSize: 13 }}>order: {certificate.orderIndex}</span>
          </div>
          <p style={{ opacity: 0.8, marginTop: 10, marginBottom: 8 }}>{certificate.skills.join(" • ")}</p>
          <p style={{ opacity: 0.7, margin: 0, fontSize: 12 }}>{certificate.isPublished ? "Published" : "Hidden"}</p>
          <div style={{ marginTop: 10 }}>
            <button style={styles.smallBtn} onClick={() => startEdit(certificate)}>Edit</button>
            <button style={styles.smallBtn} onClick={() => togglePublished(certificate)}>{certificate.isPublished ? "Hide" : "Publish"}</button>
            <button style={styles.smallBtn} onClick={() => handleDelete(certificate.id)} disabled={deletingId === certificate.id}>{deletingId === certificate.id ? "Deleting..." : "Delete"}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
