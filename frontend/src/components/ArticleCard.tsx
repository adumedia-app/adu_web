// src/components/ArticleCard.tsx
/**
 * Article Card Component
 * Shows headline aligned with image
 */

import { motion } from "framer-motion";
import { useLanguage, getTranslatedContent } from "@/lib/language";

interface ArticleCardProps {
  headline: string;
  source: string;
  image: string;
  onClick: () => void;
  headline_translations?: Record<string, string>;
}

const ArticleCard = ({ headline, source, image, onClick, headline_translations }: ArticleCardProps) => {
  const { language } = useLanguage();

  // Get translated headline or fallback to original
  const displayHeadline = getTranslatedContent(headline, headline_translations, language);

  return (
    <motion.article
      className="flex items-center gap-4 py-4 border-b border-border cursor-pointer hover:bg-secondary/30 transition-colors -mx-5 px-5"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover img-grayscale"
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
        {/* Headline in bold */}
        <h3 className="font-semibold text-lg leading-snug line-clamp-3">
          {displayHeadline}
        </h3>
        {/* Source */}
        <p className="article-source mt-1">-- {source}</p>
      </div>
    </motion.article>
  );
};

export default ArticleCard;