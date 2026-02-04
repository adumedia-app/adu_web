// src/components/Footer.tsx
/**
 * Footer Component
 */

import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const location = useLocation();
  const isArchive = location.pathname === "/archive";
  const isDigest = location.pathname.startsWith("/digest/");

  return (
    <footer className="footer-nav border-t border-border safe-area-bottom">
      {isArchive || isDigest ? (
        <>
          <Link to="/" className="footer-nav-link">
            Today
          </Link>
          <span className="footer-nav-separator">|</span>
          <Link to="/about" className="footer-nav-link">
            About
          </Link>
          <span className="footer-nav-separator">|</span>
          <LanguageSelector />
        </>
      ) : (
        <>
          <Link to="/archive" className="footer-nav-link">
            Archive
          </Link>
          <span className="footer-nav-separator">|</span>
          <Link to="/about" className="footer-nav-link">
            About
          </Link>
          <span className="footer-nav-separator">|</span>
          <LanguageSelector />
        </>
      )}
    </footer>
  );
};

export default Footer;