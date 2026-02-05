// src/pages/Article.tsx
/**
 * Article Page - Individual article with SEO-friendly URL
 * URL: /article/:date/:slug
 * Example: /article/2026-02-05/zaha-hadid-architects-new-tower-beijing
 *
 * Features:
 * - Human-readable, shareable URLs with date and headline slug
 * - Swipe left/right to navigate between articles in the same edition
 * - Direction-aware slide animations
 * - Keyboard arrow key support on desktop
 * - Back button returns to edition view
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useEditionByDate } from "@/hooks/useEditions";
import { useLanguage, getTranslatedContent } from "@/lib/language";
import type { Article as ArticleType } from "@/lib/types";

// Swipe threshold
const SWIPE_THRESHOLD = 80;
const SWIPE_VELOCITY = 400;

// Direction-aware animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const ArticlePage = () => {
  const { date, slug } = useParams<{ date: string; slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Swipe direction: 1 = forward (swipe left), -1 = backward (swipe right)
  const [direction, setDirection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load the edition to get article list for navigation
  const { data: digest, isLoading: editionLoading } = useEditionByDate(date || "");

  // Find current article by matching slug
  const currentIndex = digest?.articles.findIndex((a) => a.slug === slug) ?? -1;
  const currentArticle = currentIndex >= 0 ? digest?.articles[currentIndex] : null;
  const totalArticles = digest?.articles.length || 0;

  const prevArticle = currentIndex > 0 ? digest?.articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < totalArticles - 1
      ? digest?.articles[currentIndex + 1]
      : null;

  // Navigate to another article
  const goToArticle = useCallback(
    (article: ArticleType, dir: number) => {
      setDirection(dir);
      navigate(`/article/${date}/${article.slug}`, { replace: true });
    },
    [navigate, date]
  );

  const goNext = useCallback(() => {
    if (nextArticle) goToArticle(nextArticle, 1);
  }, [nextArticle, goToArticle]);

  const goPrev = useCallback(() => {
    if (prevArticle) goToArticle(prevArticle, -1);
  }, [prevArticle, goToArticle]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Scroll to top when article changes
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle swipe gesture
  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset, velocity } = info;
    if (
      offset.x < -SWIPE_THRESHOLD ||
      velocity.x < -SWIPE_VELOCITY
    ) {
      goNext();
    } else if (
      offset.x > SWIPE_THRESHOLD ||
      velocity.x > SWIPE_VELOCITY
    ) {
      goPrev();
    }
  };

  // Back navigation
  const handleBack = () => {
    if (date) {
      navigate(`/digest/${date}`);
    } else {
      navigate("/");
    }
  };

  // Get back label
  const getBackLabel = () => {
    if (!digest) return "Back";
    const parts = digest.date.split(" ");
    return `${digest.dayOfWeek}, ${parts[0]} ${parts[1]}`;
  };

  // Loading state
  if (editionLoading) {
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

  // Article not found in edition
  if (!currentArticle) {
    return (
      <div className="min-h-screen flex flex-col bg-background safe-area-top">
        <Header />
        <div className="flex-1 flex items-center justify-center px-5">
          <ErrorMessage
            message="Article not found"
            onRetry={handleBack}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Translated content
  const displayHeadline = getTranslatedContent(
    currentArticle.headline,
    currentArticle.headline_translations,
    language
  );
  const displayContent = getTranslatedContent(
    currentArticle.content,
    currentArticle.ai_summary_translations,
    language
  );
  const paragraphs = displayContent
    ? displayContent.split("\n\n").filter((p) => p.trim())
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top" ref={contentRef}>
      {/* Back navigation */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-5 py-3 w-full border-b border-border text-left hover:bg-secondary/50 transition-colors flex-shrink-0"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-base">{getBackLabel()}</span>
        {totalArticles > 0 && (
          <span className="ml-auto text-sm text-muted-foreground">
            {currentIndex + 1} / {totalArticles}
          </span>
        )}
      </button>

      {/* Article content with swipe */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.article
          key={slug}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="flex-1 px-5 py-6 touch-pan-y"
        >
          <header className="mb-6">
            <h1 className="text-2xl font-medium leading-tight mb-2">
              {displayHeadline}
            </h1>
            <p className="text-base text-muted-foreground italic">
              {currentArticle.source}
            </p>
          </header>

          {/* Featured image */}
          {currentArticle.image && (
            <figure className="mb-6 -mx-5">
              <img
                src={currentArticle.image}
                alt={displayHeadline}
                className="w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </figure>
          )}

          {/* Article summary */}
          <div className="article-body space-y-4">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p className="text-muted-foreground italic">
                No summary available.
              </p>
            )}
          </div>

          {/* Read original link */}
          <div className="mt-8 pt-6 border-t border-border">
            <a
              href={currentArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Read original article
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Prev / Next navigation */}
          {totalArticles > 1 && (
            <nav className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
              <button
                onClick={goPrev}
                disabled={!prevArticle}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-default transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={goNext}
                disabled={!nextArticle}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-default transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          )}
        </motion.article>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ArticlePage;