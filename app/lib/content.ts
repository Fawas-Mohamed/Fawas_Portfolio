const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Project {
  id: string;
  title: string;
  tags: string[];
  thumb: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  isFeatured: boolean;
  orderIndex: number;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  orderIndex: number;
}

export interface Highlight {
  id: string;
  number: string;
  title: string;
  tags: string[];
  thumb: string | null;
  orderIndex: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  thumb: string | null;
  orderIndex: number;
}

export interface Certificate {
  id: string;
  title: string;
  thumb: string | null;
  orderIndex: number;
  skills?: string[];
}

async function safeFetch<T>(path: string, fallback: T[]): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return fallback;
    const body = await res.json();
    return body.data ?? fallback;
  } catch {
    // The API might be down, not deployed yet, or unreachable at build time.
    // Fall back to sensible defaults so the page still renders.
    return fallback;
  }
}

export function getProjects() {
  return safeFetch<Project>("/api/projects", []);
}

export function getSkills() {
  return safeFetch<Skill>("/api/skills", []);
}

export function getHighlights() {
  return safeFetch<Highlight>("/api/highlights", []);
}

export function getTestimonials() {
  return safeFetch<Testimonial>("/api/testimonials", []);
}

export function getCertificates() {
  return safeFetch<Certificate>("/api/certificates", []);
}
