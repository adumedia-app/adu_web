// src/pages/Index.tsx
/**
 * Home Page - Today's Digest
 * Clicking an article navigates to /article/:date/:slug
 */

import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useTodayDigest } from "@/hooks/useEditions";

const Index = () => {
  const navigate = useNavigate();
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
              headline_translations={article.headline_translations}
              onClick={() => navigate(`/article/${digest.dateIso}/${article.slug}`)}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;