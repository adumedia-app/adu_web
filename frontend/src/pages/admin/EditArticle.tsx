import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";

interface Article {
  id: string;
  title: string;
  source_name: string;
  url: string;
  ai_summary: string;
  image_url?: string;
  category?: string;
  editor_notes?: string;
  tags?: string[];
}

const EditArticle = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;
      
      setLoading(true);
      try {
        const data = await api.getArticle(articleId);
        setArticle(data);
        setSummary(data.ai_summary || "");
        setNotes(data.editor_notes || "");
        setCategory(data.category || "");
      } catch (err) {
        setError("Failed to load article");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSave = async () => {
    if (!articleId) return;

    setSaving(true);
    setError(null);

    try {
      await api.updateArticle(articleId, {
        ai_summary: summary,
        editor_notes: notes,
        category: category,
      });
      navigate(-1);
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

  if (error && !article) {
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

  if (!article) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
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

        <form className="space-y-6">
          {/* Title (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <div className="p-3 bg-secondary rounded-lg">
              {article.title}
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium mb-2">Source</label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{article.source_name}</span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., project, news, interview"
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>

          {/* AI Summary */}
          <div>
            <label className="block text-sm font-medium mb-2">AI Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={6}
              className="w-full p-3 border border-border rounded-lg bg-background resize-y"
            />
          </div>

          {/* Editor Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Editor Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Internal notes (not published)"
              className="w-full p-3 border border-border rounded-lg bg-background resize-y"
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditArticle;
