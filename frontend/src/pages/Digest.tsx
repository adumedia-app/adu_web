// src/pages/Digest.tsx
/**
 * Digest Page - View a specific date's edition
 */

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import ArticleView from "@/components/ArticleView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useEditionByDate } from "@/hooks/useEditions";
import type { Article } from "@/lib/types";

const Digest = () => {
  const { date } = useParams<{ date: string }>();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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
            message="Could not load this edition"
            onRetry={() => refetch()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Get edition label
  const getEditionLabel = () => {
    switch (digest.editionType) {
      case "weekly":
        return "Weekly Edition";
      case "weekend":
        return "Weekend Catch-Up";
      default:
        return "Daily Edition";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <AnimatePresence mode="wait">
        {selectedArticle ? (
          <ArticleView
            key="article"
            article={selectedArticle}
            digestLabel={digest.date}
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <div key="digest" className="flex-1 flex flex-col">
            <Header />

            {/* Back to archive */}
            <Link
              to="/archive"
              className="flex items-center gap-2 px-5 py-3 text-muted-foreground hover:text-foreground border-b border-border"
            >
              <ArrowLeft className="w-4 h-4" />
              Archive
            </Link>

            {/* Date and intro */}
            <div className="px-5 py-4 text-center border-b border-border">
              <p className="date-primary">
                {digest.dayOfWeek}, {digest.date}
              </p>
              <p className="text-muted-foreground mt-1">
                {getEditionLabel()}
              </p>
            </div>

            {/* Articles list */}
            <main className="flex-1 px-5">
              {digest.articles.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  No articles in this edition.
                </div>
              ) : (
                digest.articles.map((article: Article) => (
                  <ArticleCard
                    key={article.id}
                    headline={article.headline}
                    source={article.source}
                    image={article.image}
                    headline_translations={article.headline_translations}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))
              )}
            </main>

            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Digest;