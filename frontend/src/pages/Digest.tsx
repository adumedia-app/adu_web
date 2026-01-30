import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

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
}

const Digest = () => {
  const { date } = useParams<{ date: string }>();
  const [edition, setEdition] = useState<Edition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEdition = async () => {
      if (!date) return;

      setLoading(true);
      setError(null);

      try {
        const data = await api.getEditionByDate(date);
        setEdition(data);
      } catch (err) {
        setError("Edition not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEdition();
  }, [date]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !edition) {
    return (
      <div className="min-h-screen bg-background safe-area-top">
        <Header />
        <main className="px-5 py-8 text-center">
          <p className="text-muted-foreground mb-4">
            {error || "Edition not found"}
          </p>
          <Link to="/archive" className="text-primary hover:underline">
            View archive
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1">
        {/* Back to archive */}
        <Link
          to="/archive"
          className="flex items-center gap-2 px-5 py-3 text-muted-foreground hover:text-foreground border-b border-border"
        >
          <ArrowLeft className="w-4 h-4" />
          Archive
        </Link>

        {/* Edition header */}
        <div className="px-5 py-6 border-b border-border">
          <h1 className="text-2xl font-medium">{edition.date_formatted}</h1>
          <p className="text-muted-foreground capitalize">
            {edition.day_of_week} - {edition.edition_type} Edition
          </p>
        </div>

        {/* Articles */}
        <div className="divide-y divide-border">
          {edition.articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => window.open(article.url, "_blank")}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Digest;
