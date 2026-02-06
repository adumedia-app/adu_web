// src/pages/About.tsx
/**
 * About Page - with multilingual support
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallButton from "@/components/InstallButton";
import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";

const About = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1 px-5 py-8">
        <div className="article-body space-y-4">
          <p>
            <strong>a/d/u</strong>{" "}
            {t("about_intro", language)}{" "}
            <a
              href="https://t.me/a_d_u_media"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Telegram
            </a>.
          </p>

          <p>{t("about_editorial", language)}</p>

          <p>{t("about_sources", language)}</p>

          <p>{t("about_schedule", language)}</p>

          <div className="divider my-8" />

          <p>
            {t("about_contact", language)}
            <br />
            <a
              href="mailto:admin@adu.media"
              className="text-primary hover:underline"
            >
              admin@adu.media
            </a>
          </p>

          <div className="divider my-8" />

          <p>{t("about_install_text", language)}</p>

          <div className="py-4">
            <InstallButton />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;