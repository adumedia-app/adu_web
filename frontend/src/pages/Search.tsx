// src/pages/Search.tsx
/**
 * Search Page — full-text search across all articles
 * Searches Typesense directly from the browser
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { searchArticles } from "@/lib/typesense";
import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";
import type { Article } from "@/lib/types";

const DEBOUNCE_MS = 300;

const Search = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<(Article & { _edition_date?: string })[]>([]);
  const [found, setFound] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current && !initialQuery) {
      inputRef.current.focus();
    }
  }, []);

  // Search function
  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setFound(0);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchArticles(q.trim(), { limit: 30 });
      setResults(data.articles as (Article & { _edition_date?: string })[]);
      setFound(data.found);
      setHasSearched(true);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
      setFound(0);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Run search on initial load if query param exists
  useEffect(() => {
    if (initialQuery) {
      doSearch(initialQuery);
    }
  }, []);

  // Debounced search on typing
  const handleInputChange = (value: string) => {
    setQuery(value);

    // Update URL
    if (value.trim()) {
      setSearchParams({ q: value.trim() }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }

    // Debounce the actual search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(value);
    }, DEBOUNCE_MS);
  };

  // Clear search
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setFound(0);
    setHasSearched(false);
    setSearchParams({}, { replace: true });
    inputRef.current?.focus();
  };

  // Navigate to article
  const handleArticleClick = (article: Article & { _edition_date?: string }) => {
    const editionDate = article._edition_date;
    if (editionDate) {
      navigate(`/article/${editionDate}/${article.slug}`);
    } else {
      window.open(article.url, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      {/* Search bar */}
      <div className="px-5 py-6 border-b border-border">
        <div className="relative max-w-xl mx-auto">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={t("search_placeholder", language)}
            className="w-full pl-10 pr-10 py-3 bg-secondary/50 border border-border rounded-lg text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results count */}
        {hasSearched && !isSearching && (
          <p className="text-center text-sm text-muted-foreground mt-3">
            {found === 0
              ? t("search_no_results", language)
              : `${found} ${found === 1 ? t("search_result", language) : t("search_results", language)}`}
          </p>
        )}
      </div>

      {/* Results */}
      <main className="flex-1 px-5">
        {isSearching && !results.length ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : results.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {results.map((article) => (
                <ArticleCard
                  key={article.id}
                  headline={article.headline}
                  headlineLine1={article.headlineLine1}
                  headlineLine2={article.headlineLine2}
                  source={article.source}
                  image={article.image}
                  summary={article.content}
                  tags={article.tags}
                  isStudio={article.isStudio}
                  headline_translations={article.headline_translations}
                  headline_line_1_translations={article.headline_line_1_translations}
                  headline_line_2_translations={article.headline_line_2_translations}
                  ai_summary_translations={article.ai_summary_translations}
                  showTags
                  showSummary
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : hasSearched && !isSearching ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-lg">
              {t("search_try_different", language)}
            </p>
          </div>
        ) : !hasSearched ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              {t("search_hint", language)}
            </p>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Search;