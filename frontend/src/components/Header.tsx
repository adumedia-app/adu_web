// src/components/Header.tsx
/**
 * Header Component
 */

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="pt-8 pb-4 text-center border-b border-border">
      <Link to="/" className="inline-block">
        <h1 className="logo-text">
          <span className="logo-italic">a</span>
          <span className="logo-slash">/</span>
          <span className="logo-italic">d</span>
          <span className="logo-slash">/</span>
          <span className="logo-italic">u</span>
        </h1>
        <p className="tagline mt-1">architecture / design / urbanism</p>
      </Link>
    </header>
  );
};

export default Header;