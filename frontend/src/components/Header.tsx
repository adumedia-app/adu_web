// src/components/Header.tsx
/**
 * Header Component
 */

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="pt-8 pb-4 text-center border-b border-border">
      <Link to="/" className="inline-block">
        <img 
          src="/logo.png" 
          alt="a/d/u - architecture / design / urbanism"
          className="h-12 mx-auto"
        />
        <p className="tagline mt-1">architecture / design / urbanism</p>
      </Link>
    </header>
  );
};

export default Header;