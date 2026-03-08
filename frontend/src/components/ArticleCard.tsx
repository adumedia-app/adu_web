// src/components/ArticleCard.tsx
/**
 * Article Card Component
 * Shows headline aligned with image with translation support
 * Supports two-line headlines, studio plaque, and tags
 */

import { motion } from "framer-motion";
import { useLanguage, getTranslatedContent } from "@/lib/language";

interface ArticleCardProps {
  headline: string;
  headlineLine1?: string;
  headlineLine2?: string;
  source: string;
  image: string;
  tags?: string[];
  isStudio?: boolean;
  headline_translations?: Record<string, string>;
  headline_line_1_translations?: Record<string, string>;
  headline_line_2_translations?: Record<string, string>;
  onClick: () => void;
}

const ArticleCard = ({ 
  headline, 
  headlineLine1,
  headlineLine2,
  source, 
  image,
  tags,
  isStudio,
  headline_translations,
  headline_line_1_translations,
  headline_line_2_translations,
  onClick 
}: ArticleCardProps) => {
  const { language } = useLanguage();

  // Get translated headline or fallback to original
  const displayHeadline = getTranslatedContent(headline, headline_translations, language);
  const displayLine1 = getTranslatedContent(headlineLine1 || "", headline_line_1_translations, language);
  const displayLine2 = getTranslatedContent(headlineLine2 || "", headline_line_2_translations, language);
  const hasTwoLineHeadline = !!(displayLine1 || displayLine2);

  return (
    <motion.article
      className="flex items-center gap-4 py-4 border-b border-border cursor-pointer hover:bg-secondary/30 transition-colors -mx-5 px-5"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail - 4:3 aspect ratio, same height as before */}
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

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex gap-1.5 mt-1.5">
            {tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="article-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ArticleCard;
