"use client";

import { useCallback, useEffect, useState } from "react";
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

interface TestimonialForm {
  name: string;
  role: string;
  quote: string;
  thumb: string;
  orderIndex: number;
}

const emptyForm: TestimonialForm = {
  name: "",
  role: "",
  quote: "",
  thumb: "",
  orderIndex: 0,
};

/**
 * Safely extract a readable error message from different
 * backend response formats.
 */
function getApiErrorMessage(
  body: unknown,
  fallback: string
): string {
  if (!body || typeof body !== "object") {
    return fallback;
  }

  const data = body as Record<string, unknown>;

  // { message: "Something went wrong" }
  if (typeof data.message === "string") {
    return data.message;
  }

  // { error: "Something went wrong" }
  if (typeof data.error === "string") {
    return data.error;
  }

  // { error: { message: "Something went wrong" } }
  if (
    data.error &&
    typeof data.error === "object" &&
    "message" in data.error &&
    typeof (data.error as Record<string, unknown>).message === "string"
  ) {
    return (data.error as Record<string, unknown>)
      .message as string;
  }

  // Validation errors
  if (data.errors) {
    // Example:
    // { errors: ["Name is required", "Quote is required"] }
    if (Array.isArray(data.errors)) {
      const messages = data.errors
        .map((error) => {
          if (typeof error === "string") {
            return error;
          }

          if (error && typeof error === "object") {
            const item = error as Record<string, unknown>;

            if (typeof item.message === "string") {
              return item.message;
            }

            if (typeof item.msg === "string") {
              return item.msg;
            }

            return JSON.stringify(error);
          }

          return String(error);
        })
        .filter(Boolean);

      if (messages.length > 0) {
        return messages.join(", ");
      }
    }

    // Example:
    // {
    //   errors: {
    //     name: "Name is required",
    //     quote: "Quote is required"
    //   }
    // }
    if (
      typeof data.errors === "object" &&
      data.errors !== null &&
      !Array.isArray(data.errors)
    ) {
      const messages = Object.entries(
        data.errors as Record<string, unknown>
      ).map(([field, value]) => {
        if (typeof value === "string") {
          return `${field}: ${value}`;
        }

        if (Array.isArray(value)) {
          return `${field}: ${value
            .map((item) =>
              typeof item === "string"
                ? item
                : JSON.stringify(item)
            )
            .join(", ")}`;
        }

        return `${field}: ${JSON.stringify(value)}`;
      });

      if (messages.length > 0) {
        return messages.join(" | ");
      }
    }
  }

  // Fallback if backend returned an object that we don't recognize.
  try {
    const serialized = JSON.stringify(body);

    if (serialized && serialized !== "{}") {
      return serialized;
    }
  } catch {
    // Ignore serialization failure.
  }

  return fallback;
}

/**
 * Safely parse JSON responses.
 */
async function parseJsonResponse(
  response: Response
): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export default function TestimonialsPanel({
  token,
}: {
  token: string;
}) {
  const [items, setItems] = useState<Testimonial[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );

  const [togglingId, setTogglingId] = useState<string | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [form, setForm] = useState<TestimonialForm>(emptyForm);

  const [showForm, setShowForm] = useState(false);

  /**
   * Load all testimonials.
   */
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/api/testimonials/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      const body = await parseJsonResponse(res);

      console.log("GET /api/testimonials/all:", {
        status: res.status,
        ok: res.ok,
        body,
      });

      if (!res.ok) {
        throw new Error(
          getApiErrorMessage(
            body,
            `Failed to load testimonials (${res.status})`
          )
        );
      }

      /**
       * Support:
       *
       * {
       *   data: [...]
       * }
       *
       * OR
       *
       * [...]
       */
      let data: unknown = [];

      if (
        body &&
        typeof body === "object" &&
        "data" in body
      ) {
        data = (body as Record<string, unknown>).data;
      } else {
        data = body;
      }

      if (Array.isArray(data)) {
        setItems(data as Testimonial[]);
      } else {
        console.warn(
          "Testimonials API returned a non-array data value:",
          data
        );

        setItems([]);
      }
    } catch (err) {
      console.error(
        "Failed to load testimonials:",
        err
      );

      setItems([]);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load testimonials."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Reset form.
   */
  function resetForm() {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(false);
  }

  /**
   * Start creating a testimonial.
   */
  function startCreate() {
    setSuccess(null);
    setError(null);

    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(true);
  }

  /**
   * Start editing a testimonial.
   */
  function startEdit(testimonial: Testimonial) {
    setSuccess(null);
    setError(null);

    setForm({
      name: testimonial.name ?? "",
      role: testimonial.role ?? "",
      quote: testimonial.quote ?? "",
      thumb: testimonial.thumb ?? "",
      orderIndex: Number(testimonial.orderIndex) || 0,
    });

    setEditingId(testimonial.id);
    setShowForm(true);
  }

  /**
   * Update form field.
   */
  function updateForm(
    field: keyof TestimonialForm,
    value: string | number
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /**
   * Submit create/update request.
   */
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    const name = form.name.trim();
    const role = form.role.trim();
    const quote = form.quote.trim();
    const thumb = form.thumb.trim();

    /**
     * Frontend validation.
     */
    if (!name) {
      setError("Name is required.");
      return;
    }

    if (!role) {
      setError("Role / title is required.");
      return;
    }

    if (!quote) {
      setError("Quote is required.");
      return;
    }

    const payload = {
      name,
      role,
      quote,
      thumb: thumb || null,
      isApproved: true,
      orderIndex: Number(form.orderIndex) || 0,
    };

    const url = editingId
      ? `${API_URL}/api/testimonials/${editingId}`
      : `${API_URL}/api/testimonials`;

    const method = editingId ? "PUT" : "POST";

    setSaving(true);

    try {
      console.log("Submitting testimonial:", {
        method,
        url,
        payload,
      });

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await parseJsonResponse(res);

      console.log(
        `${method} ${url}:`,
        {
          status: res.status,
          ok: res.ok,
          body,
        }
      );

      if (!res.ok) {
        throw new Error(
          getApiErrorMessage(
            body,
            `Failed to ${
              editingId ? "update" : "create"
            } testimonial (${res.status})`
          )
        );
      }

      setSuccess(
        editingId
          ? "Testimonial updated successfully."
          : "Testimonial created successfully."
      );

      resetForm();

      await load();
    } catch (err) {
      console.error(
        "Testimonial submit failed:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save testimonial."
      );
    } finally {
      setSaving(false);
    }
  }

  /**
   * Toggle public/private approval.
   */
  async function toggleApproval(
    testimonial: Testimonial
  ) {
    setError(null);
    setSuccess(null);

    setTogglingId(testimonial.id);

    try {
      const res = await fetch(
        `${API_URL}/api/testimonials/${testimonial.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            isApproved: !testimonial.isApproved,
          }),
        }
      );

      const body = await parseJsonResponse(res);

      console.log(
        "Toggle testimonial approval:",
        {
          status: res.status,
          ok: res.ok,
          body,
        }
      );

      if (!res.ok) {
        throw new Error(
          getApiErrorMessage(
            body,
            `Failed to ${
              testimonial.isApproved
                ? "hide"
                : "publish"
            } testimonial (${res.status})`
          )
        );
      }

      setSuccess(
        testimonial.isApproved
          ? "Testimonial hidden from the website."
          : "Testimonial published to the website."
      );

      await load();
    } catch (err) {
      console.error(
        "Failed to toggle testimonial approval:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update testimonial."
      );
    } finally {
      setTogglingId(null);
    }
  }

  /**
   * Delete testimonial.
   */
  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this testimonial permanently?"
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccess(null);

    setDeletingId(id);

    try {
      const res = await fetch(
        `${API_URL}/api/testimonials/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const body = await parseJsonResponse(res);

      console.log(
        "DELETE testimonial:",
        {
          status: res.status,
          ok: res.ok,
          body,
        }
      );

      if (!res.ok) {
        throw new Error(
          getApiErrorMessage(
            body,
            `Failed to delete testimonial (${res.status})`
          )
        );
      }

      setSuccess(
        "Testimonial deleted successfully."
      );

      await load();
    } catch (err) {
      console.error(
        "Failed to delete testimonial:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete testimonial."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: 20, margin: 0 }}>
          Testimonials
        </h2>

        <button
          type="button"
          style={styles.button}
          onClick={startCreate}
          disabled={saving}
        >
          + Add Testimonial
        </button>
      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {success && (
        <div
          style={{
            marginBottom: 16,
            padding: "10px 14px",
            borderRadius: 8,
            background: "rgba(242, 183, 89, 0.12)",
            border: "1px solid rgba(242, 183, 89, 0.35)",
            color: "#F2B759",
            fontSize: 14,
          }}
        >
          {success}
        </div>
      )}

      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <div
          style={{
            marginBottom: 16,
            padding: "12px 14px",
            borderRadius: 8,
            background: "rgba(255, 80, 80, 0.08)",
            border: "1px solid rgba(255, 100, 100, 0.3)",
            color: "#ff8080",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* =====================================================
          CREATE / EDIT FORM
      ===================================================== */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            ...styles.formCard,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 18,
              }}
            >
              {editingId
                ? "Edit Testimonial"
                : "Create Testimonial"}
            </h3>

            <button
              type="button"
              style={styles.smallBtn}
              onClick={resetForm}
              disabled={saving}
            >
              Close
            </button>
          </div>

          {/* Name */}

          <input
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              updateForm("name", e.target.value)
            }
            required
            disabled={saving}
          />

          {/* Role */}

          <input
            style={styles.input}
            placeholder="Role / title"
            value={form.role}
            onChange={(e) =>
              updateForm("role", e.target.value)
            }
            required
            disabled={saving}
          />

          {/* Quote */}

          <textarea
            style={styles.textarea}
            placeholder="Quote"
            value={form.quote}
            onChange={(e) =>
              updateForm("quote", e.target.value)
            }
            required
            disabled={saving}
          />

          {/* Thumbnail */}

          <input
            style={styles.input}
            placeholder="Thumbnail filename (in public/assets/images/thumbs/)"
            value={form.thumb}
            onChange={(e) =>
              updateForm("thumb", e.target.value)
            }
            disabled={saving}
          />

          {/* Order */}

          <input
            style={styles.input}
            type="number"
            placeholder="Order"
            value={form.orderIndex}
            onChange={(e) =>
              updateForm(
                "orderIndex",
                Number(e.target.value)
              )
            }
            disabled={saving}
          />

          {/* Buttons */}

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 8,
            }}
          >
            <button
              style={styles.button}
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Save Changes"
                  : "Create Testimonial"}
            </button>

            <button
              style={styles.smallBtn}
              type="button"
              onClick={resetForm}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <p style={{ opacity: 0.7 }}>
          Loading testimonials…
        </p>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!loading &&
        !error &&
        items.length === 0 && (
          <div
            style={{
              padding: "30px 20px",
              textAlign: "center",
              borderRadius: 10,
              border:
                "1px solid rgba(255,255,255,0.08)",
              background:
                "rgba(255,255,255,0.02)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            No testimonials yet.
          </div>
        )}

      {/* =====================================================
          TESTIMONIAL LIST
      ===================================================== */}

      {!loading &&
        items.length > 0 &&
        items.map((testimonial) => (
          <div
            key={testimonial.id}
            style={styles.itemCard}
          >
            {/* Header */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <div>
                <strong>
                  {testimonial.name}
                </strong>

                <span
                  style={{
                    fontWeight: 400,
                    opacity: 0.8,
                  }}
                >
                  {" "}
                  — {testimonial.role}
                </span>
              </div>

              {/* Status */}

              <span
                style={{
                  flexShrink: 0,
                  background:
                    testimonial.isApproved
                      ? "#F2B759"
                      : "rgba(255,255,255,0.2)",
                  color:
                    testimonial.isApproved
                      ? "#0A4A3C"
                      : "#fff",
                  padding: "2px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {testimonial.isApproved
                  ? "PUBLIC"
                  : "HIDDEN"}
              </span>
            </div>

            {/* Quote */}

            <p
              style={{
                marginTop: 10,
                lineHeight: 1.6,
              }}
            >
              {testimonial.quote}
            </p>

            {/* Thumbnail info */}

            {testimonial.thumb && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  opacity: 0.55,
                }}
              >
                Thumbnail: {testimonial.thumb}
              </div>
            )}

            {/* Order */}

            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                opacity: 0.45,
              }}
            >
              Order: {testimonial.orderIndex}
            </div>

            {/* Actions */}

            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {/* Edit */}

              <button
                type="button"
                style={styles.smallBtn}
                onClick={() =>
                  startEdit(testimonial)
                }
                disabled={
                  saving ||
                  deletingId === testimonial.id ||
                  togglingId === testimonial.id
                }
              >
                Edit
              </button>

              {/* Publish / Hide */}

              <button
                type="button"
                style={styles.smallBtn}
                onClick={() =>
                  toggleApproval(testimonial)
                }
                disabled={
                  saving ||
                  deletingId === testimonial.id ||
                  togglingId === testimonial.id
                }
              >
                {togglingId === testimonial.id
                  ? "Updating..."
                  : testimonial.isApproved
                    ? "Hide from Site"
                    : "Publish to Site"}
              </button>

              {/* Delete */}

              <button
                type="button"
                style={styles.smallBtn}
                onClick={() =>
                  handleDelete(testimonial.id)
                }
                disabled={
                  saving ||
                  deletingId === testimonial.id ||
                  togglingId === testimonial.id
                }
              >
                {deletingId === testimonial.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}