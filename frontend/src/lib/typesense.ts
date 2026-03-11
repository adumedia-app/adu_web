// src/lib/typesense.ts
/**
 * Typesense search client for ADUmedia
 * Searches Typesense Cloud directly from the browser (using search-only key)
 */

import type { Article } from "./types";

// Connection config — loaded from env or fetched from backend
const TYPESENSE_HOST = import.meta.env.VITE_TYPESENSE_HOST || "";
const TYPESENSE_SEARCH_KEY = import.meta.env.VITE_TYPESENSE_SEARCH_KEY || "";
const COLLECTION = "articles";

interface TypesenseHit {
  document: {
    id: string;
    title: string;
    headline_line_1: string;
    headline_line_2: string;
    ai_summary: string;
    source_name: string;
    source_id: string;
    tags: string[];
    is_studio: boolean;
    slug: string;
    url: string;
    image_url: string;
    category: string;
    edition_date: string;
    published_date: string;
    fetch_timestamp: number;
    headline_translations?: Record<string, string>;
    headline_line_1_translations?: Record<string, string>;
    headline_line_2_translations?: Record<string, string>;
    ai_summary_translations?: Record<string, string>;
  };
  highlights?: Array<{
    field: string;
    snippet: string;
  }>;
}

interface TypesenseSearchResponse {
  found: number;
  hits: TypesenseHit[];
  facet_counts?: Array<{
    field_name: string;
    counts: Array<{ value: string; count: number }>;
  }>;
}

// Cache for search config fetched from backend
let _configCache: { host: string; search_key: string; collection: string } | null = null;

/**
 * Get Typesense connection config.
 * Prefers env vars, falls back to fetching from backend API.
 */
async function getConfig() {
  if (TYPESENSE_HOST && TYPESENSE_SEARCH_KEY) {
    return { host: TYPESENSE_HOST, search_key: TYPESENSE_SEARCH_KEY, collection: COLLECTION };
  }

  if (_configCache) return _configCache;

  const resp = await fetch("/api/search/config");
  if (!resp.ok) throw new Error("Search not configured");
  _configCache = await resp.json();
  return _configCache!;
}

/**
 * Search articles via Typesense.
 */
export async function searchArticles(
  query: string,
  options: {
    limit?: number;
    page?: number;
    filterBy?: string;
    facetBy?: string;
  } = {}
): Promise<{ articles: Article[]; found: number; facets?: Record<string, Array<{ value: string; count: number }>> }> {
  const config = await getConfig();
  const { limit = 20, page = 1, filterBy, facetBy } = options;

  const params = new URLSearchParams({
    q: query || "*",
    query_by: "title,headline_line_1,headline_line_2,ai_summary,source_name,tags",
    per_page: String(limit),
    page: String(page),
    sort_by: query ? "_text_match:desc,fetch_timestamp:desc" : "fetch_timestamp:desc",
  });

  if (filterBy) params.set("filter_by", filterBy);
  if (facetBy) params.set("facet_by", facetBy);

  const url = `https://${config.host}/collections/${config.collection}/documents/search?${params}`;

  const resp = await fetch(url, {
    headers: { "X-TYPESENSE-API-KEY": config.search_key },
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Search failed: ${err}`);
  }

  const data: TypesenseSearchResponse = await resp.json();

  // Transform hits to Article format (matching existing frontend types)
  const articles: Article[] = data.hits.map((hit) => {
    const doc = hit.document;
    return {
      id: doc.id,
      headline: doc.title,
      headlineLine1: doc.headline_line_1 || "",
      headlineLine2: doc.headline_line_2 || "",
      slug: doc.slug || "",
      source: doc.source_name || "",
      image: doc.image_url || "",
      imageCaption: "",
      imageCredit: "",
      content: doc.ai_summary || "",
      readTime: Math.ceil((doc.ai_summary || "").split(" ").length / 200),
      url: doc.url || "",
      tags: doc.tags || [],
      isStudio: doc.is_studio || false,
      headline_translations: doc.headline_translations || {},
      headline_line_1_translations: doc.headline_line_1_translations || {},
      headline_line_2_translations: doc.headline_line_2_translations || {},
      ai_summary_translations: doc.ai_summary_translations || {},
      // Extra field for linking back to edition
      _edition_date: doc.edition_date || "",
    } as Article & { _edition_date: string };
  });

  // Parse facets
  const facets: Record<string, Array<{ value: string; count: number }>> = {};
  if (data.facet_counts) {
    for (const fc of data.facet_counts) {
      facets[fc.field_name] = fc.counts;
    }
  }

  return { articles, found: data.found, facets };
}

/**
 * Get all tags with counts.
 */
export async function getTagCounts(): Promise<Array<{ value: string; count: number }>> {
  const result = await searchArticles("*", {
    limit: 0,
    facetBy: "tags",
  });
  return result.facets?.tags || [];
}

/**
 * Search articles by tag.
 */
export async function searchByTag(
  tag: string,
  options: { limit?: number; page?: number } = {}
): Promise<{ articles: Article[]; found: number }> {
  return searchArticles("*", {
    ...options,
    filterBy: `tags:=${tag}`,
  });
}
