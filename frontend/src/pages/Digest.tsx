// src/pages/Digest.tsx
/**
 * Digest Page - View a specific date's edition
 * Clicking an article navigates to /article/:date/:slug
 */

import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useEditionByDate } from "@/hooks/useEditions";
import { useLanguage } from "@/lib/language";
import { t, translateDay, translateDate, getTranslatedEditionTypeLabel } from "@/lib/translations";
import type { Article } from "@/lib/types";

const Digest = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data: digest, isLoading, error, refetch } = useEditionByDate(date || "");

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background safe-area-top">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !digest) {
    return (
      <div className="min-h-screen flex flex-col bg-background safe-area-top">
        <Header />
        <div className="flex-1 flex items-center justify-center px-5">
          <ErrorMessage
            message={t("error_load_digest", language)}
            onRetry={() => refetch()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      {/* Back to archive */}
      <Link
        to="/archive"
        className="flex items-center gap-2 px-5 py-3 text-muted-foreground hover:text-foreground border-b border-border"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("archive", language)}
      </Link>

      {/* Date and intro */}
      <div className="px-5 py-4 text-center border-b border-border">
        <div className="flex items-center justify-center gap-3">
          {digest.prevEditionDate ? (
            <Link
              to={`/digest/${digest.prevEditionDate}`}
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors p-1"
              aria-label={t("previous_day", language)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          ) : (
            <span className="w-7" />
          )}

          <p className="text-lg font-semibold">
            {translateDay(digest.dayOfWeek, language)}, {translateDate(digest.date, language)}
          </p>

          {digest.nextEditionDate ? (
            <Link
              to={`/digest/${digest.nextEditionDate}`}
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors p-1"
              aria-label={t("next_day", language)}
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <span className="w-7" />
          )}
        </div>

        <p className="text-muted-foreground mt-1">
          {getTranslatedEditionTypeLabel(digest.editionType, language)}
        </p>
      </div>

      {/* Articles list */}
      <main className="flex-1 px-5">
        {digest.articles.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            {t("no_articles", language)}
          </div>
        ) : (
          digest.articles.map((article: Article) => (
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
              lighterHeadlines
              onClick={() => navigate(`/article/${digest.dateIso}/${article.slug}`)}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Digest;