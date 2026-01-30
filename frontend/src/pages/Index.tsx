// src/pages/Index.tsx
/**
 * Home Page - Today's Digest
 */

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import ArticleView from "@/components/ArticleView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useTodayDigest } from "@/hooks/useEditions";
import type { Article } from "@/lib/types";

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { data: digest, isLoading, error, refetch } = useTodayDigest();

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
            message="Could not load today's digest"
            onRetry={() => refetch()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Get intro text based on edition type
  const getIntroText = () => {
    switch (digest.editionType) {
      case "weekly":
        return "Our weekly selection of essential reads.";
      case "weekend":
        return "Catch up on the week's highlights.";
      default:
        return "Our editorial selection for today.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <AnimatePresence mode="wait">
        {selectedArticle ? (
          <ArticleView
            key="article"
            article={selectedArticle}
            digestLabel="Today"
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <div key="digest" className="flex-1 flex flex-col">
            <Header />

            {/* Date and intro */}
            <div className="px-5 py-4 text-center border-b border-border">
              <p className="date-primary">
                {digest.dayOfWeek}, {digest.date}
                {digest.editionType !== "daily" && (
                  <span className="text-muted-foreground">
                    {" "}/ {digest.editionType === "weekly" ? "Weekly" : "Weekend"}
                  </span>
                )}
              </p>
              <p className="text-muted-foreground mt-1">
                {getIntroText()}
              </p>
            </div>

            {/* Articles list */}
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
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;