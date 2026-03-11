// src/pages/Archive.tsx
/**
 * Archive Page - List of past editions
 * With multilingual support
 */

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useArchive } from "@/hooks/useEditions";
import { useLanguage } from "@/lib/language";
import {
  t,
  translateDate,
  translateDay,
  translateMonthYear,
  getTranslatedEditionTypeLabel,
} from "@/lib/translations";
import type { Digest } from "@/lib/types";

const Archive = () => {
  const { language } = useLanguage();
  const { data, isLoading, error, refetch } = useArchive(50);

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
  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-background safe-area-top">
        <Header />
        <div className="flex-1 flex items-center justify-center px-5">
          <ErrorMessage
            message={t("error_load_archive", language)}
            onRetry={() => refetch()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  const { editions } = data;

  // Group editions by month
  const groupedByMonth: Record<string, Digest[]> = {};
  editions.forEach((edition: Digest) => {
    // Parse the formatted date to get month/year
    const parts = edition.date.split(" "); // "30 January 2026"
    const monthYear = `${parts[1]} ${parts[2]}`; // "January 2026"

    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = [];
    }
    groupedByMonth[monthYear].push(edition);
  });

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1 px-5 py-6">
        <h2 className="text-2xl font-medium mb-6">
          {t("archive_title", language)}
        </h2>

        {editions.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            {t("archive_empty", language)}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByMonth).map(([monthYear, monthEditions]) => (
              <div key={monthYear}>
                <h3 className="text-lg font-medium text-muted-foreground mb-3">
                  {translateMonthYear(monthYear, language)}
                </h3>
                <div className="space-y-2">
                  {monthEditions.map((edition: Digest) => (
                    <Link
                      key={edition.id}
                      to={`/digest/${edition.dateIso}`}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">
                          {translateDay(edition.dayOfWeek, language)},{" "}
                          {translateDate(edition.date, language).split(" ").slice(0, 2).join(" ")}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getTranslatedEditionTypeLabel(edition.editionType, language)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edition.articles.length || "--"}{" "}
                        {t("archive_articles", language)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Archive;