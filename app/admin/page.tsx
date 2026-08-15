"use client";

import { useEffect, useState } from "react";
import { styles, tabStyle, API_URL, TOKEN_KEY } from "./styles";
import MessagesPanel from "./MessagesPanel";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";
import HighlightsPanel from "./HighlightsPanel";
import TestimonialsPanel from "./TestimonialsPanel";
import CertificationsPanel from "./CertificationsPanel";

type Tab = "messages" | "projects" | "skills" | "highlights" | "testimonials" | "certifications";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("messages");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(TOKEN_KEY) : null;
    if (saved) setToken(saved);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message ?? "Login failed");
      }
      const body = await res.json();
      window.localStorage.setItem(TOKEN_KEY, body.data.accessToken);
      setToken(body.data.accessToken);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  if (!token) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={{ fontSize: 22, marginBottom: 24 }}>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button style={styles.button} type="submit">
              Log in
            </button>
            {loginError && <p style={{ color: "#ff8080", marginTop: 12 }}>{loginError}</p>}
          </form>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "messages", label: "Messages" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
    { key: "highlights", label: "Highlights" },
    { key: "testimonials", label: "Testimonials" },
    { key: "certifications", label: "Certifications" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 26 }}>Admin Dashboard</h1>
          <button style={styles.smallBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>

        <div style={{ marginBottom: 28 }}>
          {tabs.map((t) => (
            <button key={t.key} style={tabStyle(tab === t.key)} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "messages" && <MessagesPanel token={token} />}
        {tab === "projects" && <ProjectsPanel token={token} />}
        {tab === "skills" && <SkillsPanel token={token} />}
        {tab === "highlights" && <HighlightsPanel token={token} />}
        {tab === "testimonials" && <TestimonialsPanel token={token} />}
        {tab === "certifications" && <CertificationsPanel token={token} />}
      </div>
    </div>
  );
}
