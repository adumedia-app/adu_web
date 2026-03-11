// src/components/ArticleCard.tsx
/**
 * Article Card Component
 * Shows headline aligned with image with translation support
 * Supports two-line headlines, studio plaque
 * Tags + summary only shown when explicitly enabled (search/tag pages)
 */

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage, getTranslatedContent } from "@/lib/language";

interface ArticleCardProps {
  headline: string;
  headlineLine1?: string;
  headlineLine2?: string;
  source: string;
  image: string;
  summary?: string;
  tags?: string[];
  isStudio?: boolean;
  showTags?: boolean;
  showSummary?: boolean;
  headline_translations?: Record<string, string>;
  headline_line_1_translations?: Record<string, string>;
  headline_line_2_translations?: Record<string, string>;
  ai_summary_translations?: Record<string, string>;
  onClick: () => void;
}

const ArticleCard = ({ 
  headline, 
  headlineLine1,
  headlineLine2,
  source, 
  image,
  summary,
  tags,
  isStudio,
  showTags = false,
  showSummary = false,
  headline_translations,
  headline_line_1_translations,
  headline_line_2_translations,
  ai_summary_translations,
  onClick 
}: ArticleCardProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Get translated content or fallback to original
  const displayHeadline = getTranslatedContent(headline, headline_translations, language);
  const displayLine1 = getTranslatedContent(headlineLine1 || "", headline_line_1_translations, language);
  const displayLine2 = getTranslatedContent(headlineLine2 || "", headline_line_2_translations, language);
  const displaySummary = getTranslatedContent(summary || "", ai_summary_translations, language);
  const hasTwoLineHeadline = !!(displayLine1 || displayLine2);

  // Handle tag click — navigate to tag page
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    const cleanTag = tag.replace(/^#/, "").toLowerCase();
    navigate(`/tag/${encodeURIComponent(cleanTag)}`);
  };

  return (
    <motion.article
      className="flex items-center gap-4 py-4 border-b border-border cursor-pointer hover:bg-secondary/30 transition-colors -mx-5 px-5"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail - 4:3 aspect ratio */}
      <div className="flex-shrink-0 w-[107px] h-20 overflow-hidden bg-secondary rounded">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Studio plaque */}
        {isStudio && (
          <div className="studio-plaque mb-1.5">
            Studio Update
          </div>
        )}

        {/* Two-line headline or fallback to combined */}
        {hasTwoLineHeadline ? (
          <>
            {displayLine1 && (
              <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                {displayLine1}
              </h3>
            )}
            {displayLine2 && (
              <p className="text-sm text-muted-foreground leading-snug mt-0.5 line-clamp-1">
                {displayLine2}
              </p>
            )}
          </>
        ) : (
          <h3 className="font-semibold text-lg leading-snug line-clamp-3">
            {displayHeadline}
          </h3>
        )}

        {/* Source */}
        <p className="article-source mt-1">-- {source}</p>

        {/* Summary preview — only on search/tag pages */}
        {showSummary && displaySummary && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">
            {displaySummary}
          </p>
        )}

        {/* Tags — only on search/tag pages, clickable */}
        {showTags && tags && tags.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {tags.slice(0, 2).map((tag, i) => (
              <button
                key={i}
                onClick={(e) => handleTagClick(e, tag)}
                className="article-tag hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ArticleCard;