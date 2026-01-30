// src/pages/NotFound.tsx
/**
 * 404 Not Found Page
 */

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-5 text-center">
        <h2 className="text-2xl font-medium mb-4">Page not found</h2>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 border border-border rounded hover:bg-secondary transition-colors"
        >
          Go to today's digest
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;