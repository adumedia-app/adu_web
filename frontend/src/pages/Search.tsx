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

// Suggestion chips per language
const SUGGESTIONS: Record<string, string[]> = {
  en: ["Museum", "Housing", "Chicago", "BIG", "Tower", "School", "Bridge", "Zaha Hadid"],
  ru: ["Музей", "Жильё", "Чикаго", "Башня", "Школа", "Мост"],
  es: ["Museo", "Vivienda", "Chicago", "Torre", "Escuela", "Puente"],
  fr: ["Musée", "Logement", "Chicago", "Tour", "École", "Pont"],
  "pt-br": ["Museu", "Habitação", "Chicago", "Torre", "Escola", "Ponte"],
};

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

  const suggestions = SUGGESTIONS[language] || SUGGESTIONS.en;

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

    if (value.trim()) {
      setSearchParams({ q: value.trim() }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(value);
    }, DEBOUNCE_MS);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setFound(0);
    setHasSearched(false);
    setSearchParams({}, { replace: true });
    inputRef.current?.focus();
  };

  const handleSuggestion = (term: string) => {
    setQuery(term);
    setSearchParams({ q: term }, { replace: true });
    doSearch(term);
  };

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
      <div className="px-5 py-8 border-b border-border">
        <div className="relative max-w-xl mx-auto">
          <SearchIcon
            className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground/50"
            size={17}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={t("search_placeholder", language)}
            className="w-full pl-7 pr-8 py-2 bg-transparent border-0 border-b border-border text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 transition-colors"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Results count */}
        {hasSearched && !isSearching && (
          <p className="text-center text-xs text-muted-foreground/60 mt-4 tracking-wide">
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
                  tags={article.tags}
                  isStudio={article.isStudio}
                  headline_translations={article.headline_translations}
                  headline_line_1_translations={article.headline_line_1_translations}
                  headline_line_2_translations={article.headline_line_2_translations}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : hasSearched && !isSearching ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground/60 text-sm mb-8">
              {t("search_try_different", language)}
            </p>
            {/* Suggestion chips after no results */}
            <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
              {suggestions.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSuggestion(term)}
                  className="px-3 py-1 text-xs text-muted-foreground border border-border rounded-full hover:border-foreground/30 hover:text-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : !hasSearched ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground/50 text-xs tracking-widest uppercase mb-8">
              {t("search_hint", language)}
            </p>
            {/* Suggestion chips on empty state */}
            <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
              {suggestions.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSuggestion(term)}
                  className="px-3 py-1 text-xs text-muted-foreground border border-border rounded-full hover:border-foreground/30 hover:text-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Search;