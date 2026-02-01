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
          className="h-auto mx-auto"
          style={{ maxWidth: "200px" }}
        />
      </Link>
    </header>
  );
};

export default Header;