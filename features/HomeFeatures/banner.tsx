import React, { useEffect, useState } from 'react';
import ArticleCard from '@/components/articles/articleCard';
import { Loader } from '@/components/loader';

type Article = {
  id: string;
  title: string;
  description: string;
};

type BannerProps = {
  path: 'random' | 'recents' | 'ecotivista' | 'suggestions';
};

const Banner: React.FC<BannerProps> = ({ path }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      const endpoint =
        path === 'random'
          ? '/api/articles/general/random'
          : path === 'recents'
          ? '/api/articles/general/recents'
          : path === 'ecotivista'
          ? '/api/articles/ecotivista'
          : '/api/articles/suggestions';

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error('Error: No se pudieron mostrar los articulos');
        }

        const data = await response.json();
        console.log(data);

        setArticles(data.articles || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [path]);

  if (loading)
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="bannerContainer">
      <div className="articlesRow">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <style jsx>
        {`
          .bannerContainer {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            display: flex;
            flex-direction: column;
            scrollbar-width: none; 
          }

          .bannerContainer::-webkit-scrollbar {
            display: none; 
          }

          .articlesRow {
            display: flex;
            flex-wrap: nowrap;
            gap: 16px;
            padding: 16px;
            align-items: flex-start; 
          }

          .loading {
            text-align: center;
            font-size: 1.2rem;
            color: #666;
          }

          .error {
            text-align: center;
            font-size: 1.2rem;
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
