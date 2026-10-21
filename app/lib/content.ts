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

export interface Certificate {
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

export interface YouTubeVideo {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  description?: string;
  channelTitle?: string;
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

export function getCertificates() {
  return safeFetch<Certificate>("/api/certificates", []);
}

export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  const res = await fetch(`${API_URL}/api/youtube/videos`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load YouTube videos (${res.status})`);
  }

  const body = (await res.json()) as { data?: YouTubeVideo[] };
  return body.data ?? [];
}
