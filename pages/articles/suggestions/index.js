import { useEffect, useState } from 'react';
import Meta from '@/components/seo/Meta';
import axios from 'axios';
import ArticleCard from '@/components/articles/articleCard';
import styled from 'styled-components';
import { Loader } from '@/components/loader';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;

const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
`;

export default function SuggestionsPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('/api/suggestions');
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <>
      <Meta
        title="Artículos Sugeridos - Ecotivista"
        description="Explora los artículos sugeridos de la comunidad de Ecotivista"
        canonical="/suggestions"
      />

      <Center>
        {isLoading ? (
          <Loader/>
        ) : (
          <ArticlesContainer>
            {articles.length < 0?("Que raro no hay sugerencias..."):(

              articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))

            )}
          </ArticlesContainer>
        )}
      </Center>
    </>
  );
}
