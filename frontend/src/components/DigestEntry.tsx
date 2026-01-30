// src/components/DigestEntry.tsx
/**
 * Digest Entry Component - Archive list item
 */

import { motion } from "framer-motion";
import type { EditionType } from "@/lib/types";

interface DigestEntryProps {
  dayOfWeek: string;
  date: string;
  dateIso: string;
  editionType: EditionType;
  articleCount: number;
  onClick: () => void;
}

const DigestEntry = ({
  dayOfWeek,
  date,
  editionType,
  articleCount,
  onClick,
}: DigestEntryProps) => {
  // Extract just day and month for display (e.g., "30 January")
  const dateParts = date.split(" ");
  const shortDate = `${dateParts[0]} ${dateParts[1]}`;

  // Estimate read time (~4 min per article)
  const readTime = articleCount * 4;

  // Get edition type suffix
  const getEditionSuffix = () => {
    switch (editionType) {
      case "weekly":
        return " / Weekly";
      case "weekend":
        return " / Weekend";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="py-5 border-b border-border cursor-pointer hover:bg-secondary/30 transition-colors -mx-5 px-5"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="date-primary">
        {dayOfWeek}, {shortDate}
        {editionType !== "daily" && (
          <span className="text-muted-foreground">{getEditionSuffix()}</span>
        )}
      </h3>
      <p className="date-secondary mt-1">
        ~{readTime} min / {articleCount} article{articleCount !== 1 ? "s" : ""}
      </p>
    </motion.div>
  );
};

export default DigestEntry;