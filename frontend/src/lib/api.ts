// src/lib/api.ts
/**
 * API client for ADUmedia website
 */

import type { EditionSummary, EditionDetail, ArticleDetail } from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "";

// Helper to get auth token
const getToken = (): string | null => {
  return localStorage.getItem("admin_token");
};

// Helper for API requests
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || "Request failed");
  }

  return response.json();
}

// =============================================================================
// Public API
// =============================================================================

export const api = {
  // Get list of editions
  getEditions: (limit = 20, offset = 0) =>
    request<{
      editions: EditionSummary[];
      has_more: boolean;
    }>(`/api/editions?limit=${limit}&offset=${offset}`),

  // Get today's (or latest) edition
  getToday: () => request<EditionDetail>("/api/editions/today"),

  // Get edition by date
  getEditionByDate: (date: string) =>
    request<EditionDetail>(`/api/editions/${date}`),

  // Get single article
  getArticle: (id: string) =>
    request<ArticleDetail & { editor_notes?: string }>(`/api/articles/${id}`),

  // =============================================================================
  // Admin API
  // =============================================================================

  // Login
  login: (password: string) =>
    request<{
      access_token: string;
      token_type: string;
      expires_in: number;
    }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),

  // Get dashboard stats
  getStats: () =>
    request<{
      total_editions: number;
      total_articles_published: number;
      total_projects: number;
      recent_editions: Array<{
        id: string;
        edition_type: string;
        edition_date: string;
        article_count: number;
        date_formatted: string;
      }>;
    }>("/api/admin/stats"),

  // Get edition for editing
  getEdition: (id: string) =>
    request<{
      id: string;
      edition_type: string;
      edition_date: string;
      article_count: number;
      date_formatted: string;
      day_of_week: string;
      articles: Array<{
        id: string;
        title: string;
        source_name: string;
        url: string;
        ai_summary: string;
        image_url?: string;
      }>;
      edition_summary?: string;
    }>(`/api/admin/editions/${id}`),

  // Update edition
  updateEdition: (id: string, data: { edition_summary?: string }) =>
    request<{ message: string }>(`/api/admin/editions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Remove article from edition
  removeArticleFromEdition: (editionId: string, articleId: string) =>
    request<{ message: string }>(
      `/api/admin/editions/${editionId}/articles/${articleId}`,
      { method: "DELETE" }
    ),

  // Update article
  updateArticle: (
    id: string,
    data: { ai_summary?: string; editor_notes?: string; category?: string }
  ) =>
    request<{ message: string }>(`/api/admin/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
