// src/components/Footer.tsx
/**
 * Footer Component
 */

import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";

const Footer = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isArchive = location.pathname === "/archive";
  const isDigest = location.pathname.startsWith("/digest/");

  return (
    <footer className="footer-nav border-t border-border safe-area-bottom pb-6">
      {isArchive || isDigest ? (
        <>
          <Link to="/" className="footer-nav-link">
            {t("today", language)}
          </Link>
          <span className="footer-nav-separator">|</span>
          <Link to="/about" className="footer-nav-link">
            {t("about", language)}
          </Link>
          <span className="footer-nav-separator">|</span>
          <a 
            href="https://t.me/a_d_u_media" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-nav-link"
          >
            {t("telegram", language)}
          </a>
          <span className="footer-nav-separator">|</span>
          <LanguageSelector />
        </>
      ) : (
        <>
          <Link to="/archive" className="footer-nav-link">
            {t("archive", language)}
          </Link>
          <span className="footer-nav-separator">|</span>
          <Link to="/about" className="footer-nav-link">
            {t("about", language)}
          </Link>
          <span className="footer-nav-separator">|</span>
          <a 
            href="https://t.me/a_d_u_media" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-nav-link"
          >
            {t("telegram", language)}
          </a>
          <span className="footer-nav-separator">|</span>
          <LanguageSelector />
        </>
      )}
    </footer>
  );
};

export default Footer;