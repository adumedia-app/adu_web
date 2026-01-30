import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Calendar, FileText, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

interface Stats {
  total_editions: number;
  total_articles_published: number;
  total_projects: number;
  recent_editions: Array<{
    id: string;
    edition_type: string;
    edition_date: string;
    article_count: number;
    date_formatted: string;
  }>;
}

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      setError("Failed to load dashboard stats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">ADUmedia Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="px-5 py-6">
        {/* Stats cards */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchStats}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        ) : stats ? (
          <div className="space-y-8">
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4">
                <div className="text-2xl font-medium">{stats.total_editions}</div>
                <div className="text-sm text-muted-foreground">Editions</div>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="text-2xl font-medium">{stats.total_articles_published}</div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="text-2xl font-medium">{stats.total_projects}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>

            {/* Recent editions */}
            <div>
              <h2 className="text-lg font-medium mb-4">Recent Editions</h2>
              <div className="space-y-2">
                {stats.recent_editions.map((edition) => (
                  <Link
                    key={edition.id}
                    to={`/admin/editions/${edition.id}`}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{edition.date_formatted}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {edition.edition_type} Edition
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{edition.article_count}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Dashboard;
