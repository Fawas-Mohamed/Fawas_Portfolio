import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0A4A3C",
    color: "#fff",
    fontFamily: "system-ui, sans-serif",
    padding: "40px 20px",
  },
  card: {
    maxWidth: 420,
    margin: "80px auto",
    background: "rgba(255,255,255,0.05)",
    padding: 32,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    marginBottom: 14,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "#fff",
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    marginBottom: 14,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "#fff",
    fontSize: 14,
    minHeight: 80,
    fontFamily: "inherit",
  },
  button: {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    background: "#F2B759",
    color: "#0A4A3C",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
  },
  container: { maxWidth: 1000, margin: "0 auto" },
  statRow: { display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" },
  statCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: "16px 24px",
    minWidth: 160,
  },
  itemCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  smallBtn: {
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    marginRight: 8,
    fontSize: 13,
  },
  formCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
};

export function tabStyle(active: boolean): CSSProperties {
  return {
    padding: "8px 18px",
    borderRadius: 8,
    border: active ? "1px solid #F2B759" : "1px solid rgba(255,255,255,0.2)",
    background: active ? "#F2B759" : "transparent",
    color: active ? "#0A4A3C" : "#fff",
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
    fontSize: 14,
    marginRight: 10,
  };
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
export const TOKEN_KEY = "fawas_admin_token";
