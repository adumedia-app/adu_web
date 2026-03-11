// src/components/Header.tsx
/**
 * Header Component — with search icon
 */
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="pt-8 pb-4 text-center border-b border-border relative">
      {/* Search icon — top right */}
      <Link
        to="/search"
        className="absolute right-5 top-8 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search"
      >
        <Search size={20} />
      </Link>
      <Link to="/" className="inline-block">
        <img 
          src="/logo.png" 
          alt="a/d/u - architecture / design / urbanism"
          className="h-auto mx-auto"
          style={{ maxWidth: "200px" }}
        />
      </Link>
      {/* Tagline */}
      <p className="tagline mt-3" style={{ color: "#333333" }}>
        Curated for Professionals
      </p>
      {/* Orange accent line — matched to logo */}
      <div style={{ width: "48px", height: "2px", backgroundColor: "#C8541A", margin: "6px auto 0" }} />
    </header>
  );
};

export default Header;