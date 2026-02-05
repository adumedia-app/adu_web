// src/pages/Article.tsx
/**
 * Article Page - Individual article view with swipe navigation
 *
 * URL: /digest/:date/:articleIndex
 *
 * Features:
 * - Direct URL to each article (shareable/bookmarkable)
 * - Swipe left/right to navigate between articles in the edition
 * - "Back" always returns to the edition list
 * - Direction-aware slide animations
 * - Elastic bounce at first/last article
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useEditionByDate } from "@/hooks/useEditions";
import { useLanguage, getTranslatedContent } from "@/lib/language";
import type { Article as ArticleType } from "@/lib/types";

// ---------------------------------------------------------------------------
// Animation variants – direction-aware slide
// ---------------------------------------------------------------------------

// `custom` is +1 (forward / swipe-left) or -1 (backward / swipe-right)
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

const slideTransition = {
  type: "spring" as const,
  damping: 28,
  stiffness: 260,
};

// Thresholds for swipe detection
const SWIPE_OFFSET_THRESHOLD = 80; // px
const SWIPE_VELOCITY_THRESHOLD = 400; // px/s

// ---------------------------------------------------------------------------
// Article content (extracted for reuse inside AnimatePresence)
// ---------------------------------------------------------------------------

interface ArticleContentProps {
  article: ArticleType;
  index: number;
  total: number;
  onSwipe: (direction: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const ArticleContent = ({
  article,
  index,
  total,
  onSwipe,
  hasPrev,
  hasNext,
}: ArticleContentProps) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const displayHeadline = getTranslatedContent(
    article.headline,
    article.headline_translations,
    language
  );

  const displayContent = getTranslatedContent(
    article.content,
    article.ai_summary_translations,
    language
  );

  const paragraphs = displayContent
    ? displayContent.split("\n\n").filter((p) => p.trim())
    : [];

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [article.id]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;

    const swipedLeft =
      (offset.x < -SWIPE_OFFSET_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD) && hasNext;
    const swipedRight =
      (offset.x > SWIPE_OFFSET_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD) && hasPrev;

    if (swipedLeft) {
      onSwipe(1); // next
    } else if (swipedRight) {
      onSwipe(-1); // prev
    }
    // Otherwise it snaps back (dragConstraints handles this)
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={hasPrev && hasNext ? 0.35 : hasPrev ? { left: 0, right: 0.35 } : hasNext ? { left: 0.35, right: 0 } : 0.12}
      onDragEnd={handleDragEnd}
      style={{ touchAction: "pan-y" }}
      className="min-h-[60vh]"
      ref={containerRef}
    >
      {/* Article content */}
      <article className="px-5 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-medium leading-tight mb-2">
            {displayHeadline}
          </h1>
          <p className="text-base text-muted-foreground italic">
            {article.source}
          </p>
        </header>

        {/* Featured image */}
        {article.image && (
          <figure className="mb-6 -mx-5">
            <img
              src={article.image}
              alt={displayHeadline}
              className="w-full"
              draggable={false}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </figure>
        )}

        {/* Article summary */}
        <div className="article-body space-y-4">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          ) : (
            <p className="text-muted-foreground italic">No summary available.</p>
          )}
        </div>

        {/* Read original link */}
        <div className="mt-8 pt-6 border-t border-border">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Read original article
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Article position indicator + nav arrows */}
        <div className="mt-6 flex items-center justify-between text-muted-foreground">
          <button
            onClick={() => hasPrev && onSwipe(-1)}
            disabled={!hasPrev}
            className="p-2 -ml-2 rounded-full hover:bg-secondary/50 transition-colors disabled:opacity-0"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm tabular-nums">
            {index + 1} / {total}
          </span>

          <button
            onClick={() => hasNext && onSwipe(1)}
            disabled={!hasNext}
            className="p-2 -mr-2 rounded-full hover:bg-secondary/50 transition-colors disabled:opacity-0"
            aria-label="Next article"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </article>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main Article Page
// ---------------------------------------------------------------------------

const Article = () => {
  const { date, articleIndex: indexParam } = useParams<{
    date: string;
    articleIndex: string;
  }>();

  const navigate = useNavigate();
  const articleIndex = parseInt(indexParam || "0", 10);

  // Direction for animation: +1 = forward, -1 = backward
  const [direction, setDirection] = useState(0);

  // Fetch the edition (React Query caches this, so navigating between
  // articles in the same edition doesn't re-fetch)
  const { data: digest, isLoading, error, refetch } = useEditionByDate(date || "");

  // Navigate to a different article index
  const goToArticle = useCallback(
    (dir: number) => {
      const newIndex = articleIndex + dir;
      if (!digest || newIndex < 0 || newIndex >= digest.articles.length) return;

      setDirection(dir);
      // Use replace so browser Back goes to edition, not through every article
      navigate(`/digest/${date}/${newIndex}`, { replace: true });
    },
    [articleIndex, date, digest, navigate]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToArticle(-1);
      if (e.key === "ArrowRight") goToArticle(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToArticle]);

  // ---- Loading ----
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

  // ---- Error ----
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

  // ---- Index out of bounds ----
  if (isNaN(articleIndex) || articleIndex < 0 || articleIndex >= digest.articles.length) {
    // Redirect to the edition page
    navigate(`/digest/${date}`, { replace: true });
    return null;
  }

  const article = digest.articles[articleIndex];
  const hasPrev = articleIndex > 0;
  const hasNext = articleIndex < digest.articles.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      {/* Back navigation — always goes to edition */}
      <Link
        to={`/digest/${date}`}
        className="flex items-center gap-2 px-5 py-3 border-b border-border text-left hover:bg-secondary/50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-base">
          {digest.dayOfWeek}, {digest.date}
        </span>
      </Link>

      {/* Animated article content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.div
            key={articleIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          >
            <ArticleContent
              article={article}
              index={articleIndex}
              total={digest.articles.length}
              onSwipe={goToArticle}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Article;
