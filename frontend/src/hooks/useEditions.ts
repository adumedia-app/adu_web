// src/hooks/useEditions.ts
/**
 * React Query hooks for fetching editions and articles.
 */

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  type Digest,
  type EditionSummary,
  mapEditionDetailToDigest,
  mapEditionSummaryToDigest,
} from "@/lib/types";

/**
 * Fetch today's (or latest) digest.
 */
export function useTodayDigest() {
  return useQuery<Digest>({
    queryKey: ["edition", "today"],
    queryFn: async () => {
      const data = await api.getToday();
      return mapEditionDetailToDigest(data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Fetch a specific edition by date.
 */
export function useEditionByDate(date: string) {
  return useQuery<Digest>({
    queryKey: ["edition", date],
    queryFn: async () => {
      const data = await api.getEditionByDate(date);
      return mapEditionDetailToDigest(data);
    },
    enabled: !!date,
    staleTime: 10 * 60 * 1000, // 10 minutes (past editions don't change)
  });
}

/**
 * Fetch archive list (edition summaries).
 */
export function useArchive(limit = 20, offset = 0) {
  return useQuery<{ editions: Digest[]; hasMore: boolean }>({
    queryKey: ["archive", limit, offset],
    queryFn: async () => {
      const data = await api.getEditions(limit, offset);
      return {
        editions: data.editions.map((e: EditionSummary) => mapEditionSummaryToDigest(e)),
        hasMore: data.has_more,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
