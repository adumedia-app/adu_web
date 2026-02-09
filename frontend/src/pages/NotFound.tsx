// src/pages/NotFound.tsx
/**
 * 404 Not Found Page
 */

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-5 text-center">
        <h2 className="text-2xl font-medium mb-4">{t("page_not_found", language)}</h2>
        <p className="text-muted-foreground mb-6">
          {t("page_not_found_description", language)}
        </p>
        <Link
          to="/"
          className="px-4 py-2 border border-border rounded hover:bg-secondary transition-colors"
        >
          {t("go_to_today", language)}
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;