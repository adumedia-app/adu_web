// src/pages/Privacy.tsx
/**
 * Privacy Policy Page - minimal, multilingual
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";

const Privacy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1 px-5 py-8">
        <div className="article-body space-y-4">
          <h1 className="text-xl font-semibold">{t("privacy_title", language)}</h1>

          <p>{t("privacy_intro", language)}</p>

          <p>
            <strong>{t("privacy_cookie_heading", language)}</strong>
            <br />
            {t("privacy_cookie_text", language)}
          </p>

          <p>
            <strong>{t("privacy_analytics_heading", language)}</strong>
            <br />
            {t("privacy_analytics_text", language)}
          </p>

          <p>{t("privacy_no_tracking", language)}</p>

          <p>
            {t("privacy_contact", language)}
            {" "}

              href="mailto:admin@adu.media"
              className="text-primary hover:underline"
            >
              admin@adu.media
            </a>
          </p>

          <div className="divider my-8" />

          <p className="text-sm text-muted-foreground">
            {t("privacy_updated", language)}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;