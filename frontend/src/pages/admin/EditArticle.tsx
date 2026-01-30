// src/pages/admin/EditArticle.tsx
/**
 * Admin Edit Article Page
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { adminGetArticle, adminUpdateArticle, adminDeleteArticle } from "@/lib/api";
import type { ArticleDetail } from "@/lib/types";

const AdminEditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch article
  const { data: article, isLoading, error } = useQuery<ArticleDetail>({
    queryKey: ["admin", "article", id],
    queryFn: () => adminGetArticle(token!, id!),
    enabled: !!token && !!id,
  });

  // Initialize form when article loads
  useEffect(() => {
    if (article) {
      setHeadline(article.headline);
      setContent(article.content);
    }
  }, [article]);

  // Track changes
  useEffect(() => {
    if (article) {
      setHasChanges(
        headline !== article.headline || content !== article.content
      );
    }
  }, [headline, content, article]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: () =>
      adminUpdateArticle(token!, id!, {
        original_title: headline,
        ai_summary: content,
      }),
    onSuccess: () => {
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ["admin", "article", id] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => adminDeleteArticle(token!, id!),
    onSuccess: () => {
      navigate("/admin/dashboard");
    },
  });

  const handleSave = () => {
    updateMutation.mutate();
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this article? This cannot be undone.")) {
      deleteMutation.mutate();
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="max-w-4xl mx-auto px-5 py-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-5 py-8">
          <p className="text-red-600">Failed to load article</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-5 py-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-xl font-medium">Edit Article</h1>
          <p className="text-sm text-muted-foreground">{article.source}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 py-8">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          {/* Headline */}
          <div>
            <label htmlFor="headline" className="block text-sm font-medium mb-2">
              Headline
            </label>
            <input
              type="text"
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Content (AI Summary) */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              AI Summary
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This is the summary displayed on the website and Telegram.
            </p>
          </div>

          {/* Original URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Original Article
            </label>

              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              {article.url.length > 60 ? article.url.substring(0, 60) + "..." : article.url}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Image preview */}
          {article.image_url && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Image
              </label>
              <img
                src={article.image_url}
                alt=""
                className="max-w-sm rounded border border-border"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {deleteMutation.isPending ? "Deleting..." : "Delete Article"}
            </button>

            <div className="flex items-center gap-4">
              {updateMutation.isError && (
                <p className="text-sm text-red-600">Failed to save</p>
              )}
              {updateMutation.isSuccess && !hasChanges && (
                <p className="text-sm text-green-600">Saved</p>
              )}
              <button
                type="submit"
                disabled={!hasChanges || updateMutation.isPending}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminEditArticle;