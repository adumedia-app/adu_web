// src/pages/Digest.tsx
/**
 * Digest Page - View specific edition by date
 * URL: /digest/:date (e.g., /digest/2026-01-30)
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import ArticleView from "@/components/ArticleView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useDigestByDate } from "@/hooks/useEditions";
import type { Article } from "@/lib/types";

const Digest = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { data: digest, isLoading, error, refetch } = useDigestByDate(date);

  // Get digest label for back button
  const getDigestLabel = () => {
    if (!digest) return "Digest";
    const shortDate = digest.date.split(" ").slice(0, 2).join(" ");
    return `${digest.dayOfWeek}, ${shortDate}`;
  };

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
        <div className="flex-1 flex flex-col">
          {/* Back navigation */}
          <button
            onClick={() => navigate("/archive")}
            className="flex items-center gap-2 px-5 py-3 border-b border-border text-left hover:bg-secondary/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-base">Archive</span>
          </button>

          <div className="flex-1 flex items-center justify-center px-5">
            <ErrorMessage
              message="Could not load this edition"
              onRetry={() => refetch()}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <AnimatePresence mode="wait">
        {selectedArticle ? (
          <ArticleView
            key="article"
            article={selectedArticle}
            digestLabel={getDigestLabel()}
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <motion.div
            key="digest-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <Header />

            {/* Back navigation */}
            <button
              onClick={() => navigate("/archive")}
              className="flex items-center gap-2 px-5 py-3 border-b border-border text-left hover:bg-secondary/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-base">Archive</span>
            </button>

            {/* Date header */}
            <div className="px-5 py-4 text-center border-b border-border">
              <p className="date-primary">
                {digest.dayOfWeek}, {digest.date}
                {digest.editionType !== "daily" && (
                  <span className="text-muted-foreground">
                    {" "}/ {digest.editionType === "weekly" ? "Weekly" : "Weekend"}
                  </span>
                )}
              </p>
            </div>

            {/* Articles */}
            <main className="flex-1 px-5">
              {digest.articles.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  No articles in this edition.
                </div>
              ) : (
                digest.articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    headline={article.headline}
                    source={article.source}
                    image={article.image}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))
              )}
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Digest;