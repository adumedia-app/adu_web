// src/components/ArticleView.tsx
/**
 * Article View Component - Full article display
 */

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Article } from "@/lib/types";

interface ArticleViewProps {
  article: Article;
  digestLabel: string;
  onBack: () => void;
}

const ArticleView = ({ article, digestLabel, onBack }: ArticleViewProps) => {
  // Safely handle content splitting
  const paragraphs = article.content 
    ? article.content.split("\n\n").filter(p => p.trim())
    : [];

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-3 w-full border-b border-border text-left hover:bg-secondary/50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-base">{digestLabel}</span>
      </button>

      {/* Article content */}
      <article className="px-5 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-medium leading-tight mb-2">
            {article.headline}
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
              alt={article.headline}
              className="w-full img-grayscale"
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
      </article>
    </motion.div>
  );
};

export default ArticleView;