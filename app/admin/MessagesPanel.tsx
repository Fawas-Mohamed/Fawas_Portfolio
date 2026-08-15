"use client";

import { useEffect, useState, useCallback } from "react";
import { styles, API_URL } from "./styles";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Stats {
  resumeDownloads: number;
  unreadMessages: number;
}

export default function MessagesPanel({ token }: { token: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [msgRes, statsRes] = await Promise.all([
      fetch(`${API_URL}/api/contact`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API_URL}/api/resume/stats`, { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    const msgBody = await msgRes.json();
    const statsBody = await statsRes.json();
    setMessages(msgBody.data);
    setStats(statsBody.data);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function toggleRead(id: string, isRead: boolean) {
    await fetch(`${API_URL}/api/contact/${id}/read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isRead: !isRead }),
    });
    loadData();
  }

  async function deleteMessage(id: string) {
    if (!window.confirm("Delete this message permanently?")) return;
    await fetch(`${API_URL}/api/contact/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    loadData();
  }

  return (
    <div>
      {stats && (
        <div style={styles.statRow}>
          <div style={styles.statCard}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#F2B759" }}>{stats.unreadMessages}</div>
            <div>Unread messages</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#F2B759" }}>{stats.resumeDownloads}</div>
            <div>Resume downloads</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#F2B759" }}>{messages.length}</div>
            <div>Total messages</div>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Contact Messages</h2>
      {loading && <p>Loading…</p>}
      {!loading && messages.length === 0 && <p>No messages yet.</p>}
      {messages.map((m) => (
        <div key={m.id} style={styles.itemCard}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>{m.name}</strong> — <span style={{ opacity: 0.8 }}>{m.email}</span>
            </div>
            <span style={{ opacity: 0.6, fontSize: 13 }}>{new Date(m.createdAt).toLocaleString()}</span>
          </div>
          <p style={{ marginTop: 10 }}>{m.message}</p>
          <div style={{ marginTop: 10 }}>
            <button style={styles.smallBtn} onClick={() => toggleRead(m.id, m.isRead)}>
              Mark as {m.isRead ? "unread" : "read"}
            </button>
            <button style={styles.smallBtn} onClick={() => deleteMessage(m.id)}>
              Delete
            </button>
            {!m.isRead && (
              <span style={{ background: "#F2B759", color: "#0A4A3C", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                NEW
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
