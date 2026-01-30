// src/pages/admin/EditEdition.tsx
/**
 * Admin Edit Edition Page
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2, Edit, ChevronUp, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { adminGetEdition, adminRemoveArticleFromEdition, adminUpdateEdition } from "@/lib/api";
import type { EditionDetail } from "@/lib/types";

const AdminEditEdition = () => {
  const { date } = useParams<{ date: string }>();
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [articleOrder, setArticleOrder] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch edition
  const { data: edition, isLoading, error } = useQuery<EditionDetail>({
    queryKey: ["admin", "edition", date],
    queryFn: () => adminGetEdition(token!, date!),
    enabled: !!token && !!date,
  });

  // Initialize article order when edition loads
  useEffect(() => {
    if (edition) {
      setArticleOrder(edition.articles.map((a) => a.id));
    }
  }, [edition]);

  // Remove article mutation
  const removeMutation = useMutation({
    mutationFn: (articleId: string) =>
      adminRemoveArticleFromEdition(token!, edition!.id, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "edition", date] });
    },
  });

  // Save order mutation
  const saveMutation = useMutation({
    mutationFn: () =>
      adminUpdateEdition(token!, edition!.id, { article_ids: articleOrder }),
    onSuccess: () => {
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ["admin", "edition", date] });
    },
  });

  const handleRemoveArticle = (articleId: string) => {
    if (confirm("Remove this article from the edition?")) {
      removeMutation.mutate(articleId);
      setArticleOrder((prev) => prev.filter((id) => id !== articleId));
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...articleOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setArticleOrder(newOrder);
    setHasChanges(true);
  };

  const handleMoveDown = (index: number) => {
    if (index === articleOrder.length - 1) return;
    const newOrder = [...articleOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setArticleOrder(newOrder);
    setHasChanges(true);
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
  if (error || !edition) {
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
          <p className="text-red-600">Failed to load edition</p>
        </main>
      </div>
    );
  }

  // Get articles in current order
  const orderedArticles = articleOrder
    .map((id) => edition.articles.find((a) => a.id === id))
    .filter(Boolean);

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
          <h1 className="text-xl font-medium">
            Edit Edition: {edition.day_of_week}, {edition.date}
          </h1>
          <p className="text-sm text-muted-foreground">
            {edition.edition_type} - {edition.article_count} articles
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 py-8">
        {/* Save button */}
        {hasChanges && (
          <div className="mb-6 p-4 bg-secondary rounded flex items-center justify-between">
            <p className="text-sm">You have unsaved changes to article order.</p>
            <button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 disabled:opacity-50"
            >
              {saveMutation.isPending ? "Saving..." : "Save Order"}
            </button>
          </div>
        )}

        {/* Articles list */}
        <section>
          <h2 className="text-lg font-medium mb-4">Articles</h2>

          <div className="border border-border rounded divide-y divide-border">
            {orderedArticles.map((article, index) => (
              <div
                key={article!.id}
                className="flex items-start gap-4 px-4 py-3"
              >
                {/* Reorder controls */}
                <div className="flex flex-col gap-1 pt-1">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === orderedArticles.length - 1}
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Article info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium line-clamp-2">{article!.headline}</p>
                  <p className="text-sm text-muted-foreground">{article!.source}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/article/${article!.id}`}
                    className="p-2 text-muted-foreground hover:text-foreground"
                    title="Edit article"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleRemoveArticle(article!.id)}
                    disabled={removeMutation.isPending}
                    className="p-2 text-muted-foreground hover:text-red-600"
                    title="Remove from edition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preview link */}
        <div className="mt-8">

            href={`/digest/${date}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View on site
          </a>
        </div>
      </main>
    </div>
  );
};

export default AdminEditEdition;