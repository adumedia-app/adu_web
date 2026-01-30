// src/pages/Archive.tsx
/**
 * Archive Page - List of past editions
 */

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DigestEntry from "@/components/DigestEntry";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useEditions } from "@/hooks/useEditions";

const Archive = () => {
  const navigate = useNavigate();
  const { data: editions, isLoading, error, refetch } = useEditions(50);

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
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background safe-area-top">
        <Header />
        <div className="flex-1 flex items-center justify-center px-5">
          <ErrorMessage
            message="Could not load archive"
            onRetry={() => refetch()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Skip the first edition (today's) since it's on the home page
  const archiveEditions = editions?.slice(1) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      {/* Archive title */}
      <div className="px-5 py-4 text-center border-b border-border">
        <h2 className="text-xl font-medium">Archive</h2>
      </div>

      {/* Digest list */}
      <main className="flex-1 px-5">
        {archiveEditions.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No past editions yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {archiveEditions.map((edition) => (
              <DigestEntry
                key={edition.id}
                dayOfWeek={edition.day_of_week}
                date={edition.date}
                dateIso={edition.date_iso}
                editionType={edition.edition_type}
                articleCount={edition.article_count}
                onClick={() => navigate(`/digest/${edition.date_iso}`)}
              />
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Archive;