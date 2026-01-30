import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Trash2, ExternalLink, Save } from "lucide-react";
import { api } from "@/lib/api";

interface Article {
  id: string;
  title: string;
  source_name: string;
  url: string;
  ai_summary: string;
  image_url?: string;
}

interface Edition {
  id: string;
  edition_type: string;
  edition_date: string;
  article_count: number;
  date_formatted: string;
  day_of_week: string;
  articles: Article[];
  edition_summary?: string;
}

const EditEdition = () => {
  const { editionId } = useParams<{ editionId: string }>();
  const navigate = useNavigate();
  const [edition, setEdition] = useState<Edition | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchEdition = async () => {
      if (!editionId) return;

      setLoading(true);
      try {
        const data = await api.getEdition(editionId);
        setEdition(data);
        setSummary(data.edition_summary || "");
      } catch (err) {
        setError("Failed to load edition");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEdition();
  }, [editionId]);

  const handleRemoveArticle = async (articleId: string) => {
    if (!editionId || !edition) return;
    
    if (!confirm("Remove this article from the edition?")) return;

    try {
      await api.removeArticleFromEdition(editionId, articleId);
      setEdition({
        ...edition,
        articles: edition.articles.filter((a) => a.id !== articleId),
        article_count: edition.article_count - 1,
      });
    } catch (err) {
      setError("Failed to remove article");
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!editionId) return;

    setSaving(true);
    setError(null);

    try {
      await api.updateEdition(editionId, { edition_summary: summary });
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Failed to save changes");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error && !edition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!edition) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </header>

      <main className="px-5 py-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Edition header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium">
            {edition.date_formatted}
          </h1>
          <p className="text-muted-foreground capitalize">
            {edition.edition_type} Edition - {edition.article_count} articles
          </p>
        </div>

        {/* Edition summary */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Edition Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            placeholder="Brief summary of this edition (optional)"
            className="w-full p-3 border border-border rounded-lg bg-background resize-y"
          />
        </div>

        {/* Articles list */}
        <div>
          <h2 className="text-lg font-medium mb-4">Articles</h2>
          <div className="space-y-3">
            {edition.articles.map((article) => (
              <div
                key={article.id}
                className="flex items-start gap-4 p-4 border border-border rounded-lg"
              >
                {/* Thumbnail */}
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt=""
                    className="w-20 h-20 object-cover rounded img-grayscale flex-shrink-0"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {article.source_name}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/admin/articles/${article.id}`}
                    className="p-2 text-muted-foreground hover:text-foreground"
                    title="Edit article"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleRemoveArticle(article.id)}
                    className="p-2 text-muted-foreground hover:text-red-500"
                    title="Remove from edition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditEdition;
