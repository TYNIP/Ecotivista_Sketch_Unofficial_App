import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "../../components/loader";
import Link from "next/link";

function getIndex(array:any){
    for(let i=0; i<array.length; i++){
        if(array[i].type === "text"){
            return i;
        }
    }
}

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
        console.log(`Fetching: ${url}`);
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch articles.");
        }

        const data: Article[] = await res.json();
        console.log(data);
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id, numberOfArticles]);

  if (loading) return <div style={{ height: "6vh", paddingTop: "3vh" }}><Loader /></div>;
  if (error) return <div style={{ height: "6vh", paddingTop: "3vh", width:"100%", "textAlign": "center" }}>Error: {error}</div>;
  if (articles.length === 0) return <div style={{ height: "6vh", paddingTop: "3vh" }}>No articles available yet.</div>;

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <Link href={`/article/${article._id}`} key={article._id}>
        <div className={`article-card ${article.imageUrl ? "" : "no-image"}`}>
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={300}
              height={200}
              className="article-image"
            />
          ) : (
            <div className="article-no-image-content">
              <h2 className="article-title">{article.title}</h2>
              <span>Por {article.username}</span>
              <p className="article-content">{article.sections[getIndex(article.sections)].content}</p>
            </div>
          )}
          {article.imageUrl && (
            <>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-content">{article.content}</p>
            </>
          )}
        </div>
        </Link>
      ))}
      <style jsx>{`
        .articles-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          padding: 16px;
          margin-top: 1%;
        }
        .article-card {
          border: 3px solid #25C660;
          border-radius: 8px;
          padding: 16px;
          background-color: #fff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .article-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .article-no-image-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .article-title {
          font-size: 1.25rem;
          font-weight: 500;
          margin: 12px 0;
          color: #333;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-content {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .no-image .article-title {
          font-size: 1.5rem;
          color: #222;
        }
        .no-image .article-content {
          margin-top: 8px;
          font-size: 1rem;
          color: #444;
        }
        @media (max-width: 768px) {
          .articles-container {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
        @media (max-width: 480px) {
          .article-title {
            font-size: 1rem;
          }
          .article-content {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UserArticles;
