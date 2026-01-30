// src/hooks/useEditions.ts
/**
 * React Query hooks for editions and articles.
 */

import { useQuery } from "@tanstack/react-query";
import {
  getEditions,
  getTodayEdition,
  getEditionByDate,
  getArticleById,
} from "@/lib/api";
import {
  mapEditionDetailToDigest,
  type Digest,
  type EditionSummary,
} from "@/lib/types";

// =============================================================================
// Query Keys
// =============================================================================

export const queryKeys = {
  editions: ["editions"] as const,
  editionsList: (limit: number, offset: number) => ["editions", "list", limit, offset] as const,
  editionToday: ["editions", "today"] as const,
  editionByDate: (date: string) => ["editions", "date", date] as const,
  article: (id: string) => ["articles", id] as const,
};

// =============================================================================
// Hooks
// =============================================================================

/**
 * Fetch list of editions for archive page.
 */
export function useEditions(limit = 30, offset = 0) {
  return useQuery({
    queryKey: queryKeys.editionsList(limit, offset),
    queryFn: () => getEditions(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch today's edition with articles.
 */
export function useTodayEdition() {
  return useQuery({
    queryKey: queryKeys.editionToday,
    queryFn: getTodayEdition,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Fetch today's digest in legacy format.
 */
export function useTodayDigest() {
  const query = useTodayEdition();

  return {
    ...query,
    data: query.data ? mapEditionDetailToDigest(query.data) : undefined,
  };
}

/**
 * Fetch a specific edition by date.
 * @param dateIso Date in YYYY-MM-DD format
 */
export function useEditionByDate(dateIso: string | undefined) {
  return useQuery({
    queryKey: queryKeys.editionByDate(dateIso || ""),
    queryFn: () => getEditionByDate(dateIso!),
    enabled: !!dateIso,
    staleTime: 10 * 60 * 1000, // 10 minutes (past editions don't change often)
  });
}

/**
 * Fetch a specific digest by date in legacy format.
 */
export function useDigestByDate(dateIso: string | undefined) {
  const query = useEditionByDate(dateIso);

  return {
    ...query,
    data: query.data ? mapEditionDetailToDigest(query.data) : undefined,
  };
}

/**
 * Fetch a single article by ID.
 */
export function useArticle(articleId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.article(articleId || ""),
    queryFn: () => getArticleById(articleId!),
    enabled: !!articleId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}