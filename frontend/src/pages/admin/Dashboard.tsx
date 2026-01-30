// src/pages/admin/Dashboard.tsx
/**
 * Admin Dashboard Page
 */

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LogOut, Edit, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { adminGetEditions } from "@/lib/api";
import type { EditionSummary } from "@/lib/types";

const AdminDashboard = () => {
  const { token, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch editions
  const { data: editions, isLoading, error } = useQuery<EditionSummary[]>({
    queryKey: ["admin", "editions"],
    queryFn: () => adminGetEditions(token!, 30),
    enabled: !!token,
  });

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium">ADUmedia Admin</h1>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
          <div className="flex items-center gap-4">

              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              View site <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 py-8">
        {/* Recent Editions */}
        <section>
          <h2 className="text-lg font-medium mb-4">Recent Editions</h2>

          {error ? (
            <p className="text-red-600">Failed to load editions</p>
          ) : editions?.length === 0 ? (
            <p className="text-muted-foreground">No editions yet.</p>
          ) : (
            <div className="border border-border rounded divide-y divide-border">
              {editions?.map((edition) => (
                <div
                  key={edition.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30"
                >
                  <div>
                    <p className="font-medium">
                      {edition.day_of_week}, {edition.date}
                      <span className="text-muted-foreground ml-2">
                        ({edition.edition_type})
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edition.article_count} article{edition.article_count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Link
                    to={`/admin/edition/${edition.date_iso}`}
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="mt-8">
          <h2 className="text-lg font-medium mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-4">

              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border rounded hover:bg-secondary transition-colors text-sm"
            >
              Supabase Dashboard
            </a>

              href="https://railway.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border rounded hover:bg-secondary transition-colors text-sm"
            >
              Railway Dashboard
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;