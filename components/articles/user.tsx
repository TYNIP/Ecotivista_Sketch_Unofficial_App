import React, { useEffect, useState} from "react";
import { Loader } from "../../components/loader";
import ArticleCard from "./articleCard";

type Article = {
  _id: string;
  title: string;
  content: string;
  username: string;
  imageUrl?: string;
};

interface UserArticlesProps {
  id?: string;
  numberOfArticles?: number;
}

const UserArticles: React.FC<UserArticlesProps> = ({ id, numberOfArticles }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Se requiere Id");
      return;
    }

    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `/api/articles/user?id=${id}${numberOfArticles ? `&limit=${numberOfArticles}` : ""}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch articles.");
        }

        const data: Article[] = await res.json();
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id, numberOfArticles]);

  if (loading)
    return (
      <div style={{ height: "6vh", paddingTop: "3vh" }}>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div
        style={{
          height: "6vh",
          paddingTop: "3vh",
          width: "100%",
          textAlign: "center",
        }}
      >
        Error: {error}
      </div>
    );
  if (articles.length === 0)
    return (
      <div style={{ height: "6vh", paddingTop: "3vh" }}>
        No Hay Articulos Disponibles
      </div>
    );

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <ArticleCard key={article._id}article={article} setArticles={setArticles}/>
      ))}

      <style jsx>{`
        .articles-container {
          width: 100% !important;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          grid-template-rows: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          padding: 16px;
          margin-top: 1%;
        }

      `}</style>
    </div>
  );
};

export default UserArticles;
