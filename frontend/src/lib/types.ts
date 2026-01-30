// src/lib/types.ts
/**
 * TypeScript types for ADUmedia Website
 */

// =============================================================================
// Edition Types
// =============================================================================

export type EditionType = "daily" | "weekend" | "weekly";

export interface EditionSummary {
  id: string;
  edition_type: EditionType;
  edition_date: string;       // "2026-01-30" (ISO format)
  article_count: number;
  date_formatted: string;     // "30 January 2026"
  day_of_week: string;        // "Thursday"
}

export interface EditionDetail extends EditionSummary {
  articles: ArticleDetail[];
  edition_summary?: string;
}

// =============================================================================
// Article Types
// =============================================================================

export interface ArticleDetail {
  id: string;
  title: string;
  source_name: string;
  url: string;
  ai_summary: string;
  image_url?: string;
  tags?: string[];
  category?: string;
}

// =============================================================================
// Legacy Types (for compatibility with existing components)
// =============================================================================

/**
 * Article type matching the existing components.
 */
export interface Article {
  id: string;
  headline: string;
  source: string;
  image: string;
  imageCaption: string;
  imageCredit: string;
  content: string;
  readTime: number;
  url: string;
}

/**
 * Digest type matching the existing components.
 */
export interface Digest {
  id: string;
  date: string;           // Formatted date "30 January 2026"
  dateIso: string;        // ISO date "2026-01-30"
  dayOfWeek: string;
  isWeekly: boolean;
  editionType: EditionType;
  articles: Article[];
  readTime: number;
}

// =============================================================================
// API Response Types
// =============================================================================

export interface ApiError {
  detail: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// =============================================================================
// Mapping Functions
// =============================================================================

/**
 * Convert API ArticleDetail to legacy Article format.
 */
export function mapArticleDetailToArticle(article: ArticleDetail): Article {
  return {
    id: article.id,
    headline: article.title,
    source: article.source_name,
    image: article.image_url || "",
    imageCaption: "",
    imageCredit: "",
    content: article.ai_summary,
    readTime: Math.ceil((article.ai_summary || "").split(" ").length / 200),
    url: article.url,
  };
}

/**
 * Convert API EditionDetail to legacy Digest format.
 */
export function mapEditionDetailToDigest(edition: EditionDetail): Digest {
  const articles = edition.articles.map(mapArticleDetailToArticle);
  const totalReadTime = articles.reduce((sum, a) => sum + a.readTime, 0);

  return {
    id: edition.id,
    date: edition.date_formatted,
    dateIso: edition.edition_date,
    dayOfWeek: edition.day_of_week,
    isWeekly: edition.edition_type === "weekly",
    editionType: edition.edition_type,
    articles,
    readTime: totalReadTime,
  };
}

/**
 * Convert API EditionSummary to a Digest with empty articles.
 */
export function mapEditionSummaryToDigest(edition: EditionSummary): Digest {
  return {
    id: edition.id,
    date: edition.date_formatted,
    dateIso: edition.edition_date,
    dayOfWeek: edition.day_of_week,
    isWeekly: edition.edition_type === "weekly",
    editionType: edition.edition_type,
    articles: [],
    readTime: edition.article_count * 4, // Estimate
  };
}

/**
 * Get edition type label for display.
 */
export function getEditionTypeLabel(type: EditionType): string {
  switch (type) {
    case "weekly":
      return "Weekly";
    case "weekend":
      return "Weekend Catch-Up";
    case "daily":
    default:
      return "Daily";
  }
}
