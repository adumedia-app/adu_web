// src/pages/Tag.tsx
/**
 * Tag Page — shows all articles with a specific tag
 * URL: /tag/:tagName
 */

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { searchByTag } from "@/lib/typesense";
import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";
import type { Article } from "@/lib/types";

const ARTICLES_PER_PAGE = 30;

const Tag = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [articles, setArticles] = useState<(Article & { _edition_date?: string })[]>([]);
  const [found, setFound] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const decodedTag = decodeURIComponent(tagName || "");

  // Format tag for display — capitalize first letter
  const displayTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  const loadArticles = useCallback(async (pageNum: number) => {
    if (!decodedTag) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchByTag(decodedTag, {
        limit: ARTICLES_PER_PAGE,
        page: pageNum,
      });
      setArticles(data.articles as (Article & { _edition_date?: string })[]);
      setFound(data.found);
    } catch (err) {
      console.error("Tag search error:", err);
      setError("Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  }, [decodedTag]);

  useEffect(() => {
    loadArticles(page);
  }, [loadArticles, page]);

  // Navigate to article
  const handleArticleClick = (article: Article & { _edition_date?: string }) => {
    const editionDate = article._edition_date;
    if (editionDate) {
      navigate(`/article/${editionDate}/${article.slug}`);
    } else {
      window.open(article.url, "_blank");
    }
  };

  const hasMore = page * ARTICLES_PER_PAGE < found;

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      {/* Tag header */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center justify-center gap-2">
          <span className="article-tag text-sm px-3 py-1">
            {displayTag}
          </span>
        </div>
        {!isLoading && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            {found} {found === 1 ? t("search_result", language) : t("search_results", language)}
          </p>
        )}
      </div>

      {/* Articles */}
      <main className="flex-1 px-5">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <ErrorMessage message={error} onRetry={() => loadArticles(page)} />
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-lg">
              {t("search_no_results", language)}
            </p>
          </div>
        ) : (
          <>
            {articles.map((article) => (
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

            {/* Load more */}
            {hasMore && (
              <div className="py-6 text-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {t("load_more", language)}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Tag;