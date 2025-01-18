import { useEffect, useState, useCallback } from 'react';
import Meta from '../../components/seo/Meta';
import axios from 'axios';
const { PATHURL } = require('../api/config');
import {Loader} from "../../components/loader";
import styled from 'styled-components';
import ArticleCard from '@/components/articles/articleCard';
import { useSearchParams } from 'next/navigation';
import MasonryLayout from '@/components/layout/MasonryLayout';
import SearchBar from '../../components/ui/SearchBar';

const SearchComponent = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const MidDiv = styled.div`
with: 100%;
height: 50vh;
display: flex;
justify-content: center;
align-items: center;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: masonry !important;
  grid-auto-flow: dense;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  align-items: start; 
`;


const LoadMoreButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 

  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'random';

  const fetchArticles = useCallback(async () => {
    if (isFetching || !hasMore) return;

    try {
      setIsFetching(true);
      const endpoint =
        sort === 'recents'
          ? '/api/articles/general/recents'
          : '/api/articles/general/random';

      console.log(`Fetching from: ${endpoint}`);

      const response = await axios.get(endpoint, {
        params: { page, limit: 10 },
      });

      const { articles: newArticles, hasMore: moreAvailable } = response.data;
      setArticles((prev) => (page === 1 ? newArticles : [...prev, ...newArticles]));
      setHasMore(moreAvailable);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsFetching(false);
      setIsLoading(false); 
    }
  }, [page, hasMore, isFetching, sort]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true); 
  }, [sort]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !isFetching &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasMore]);

  return (
    <>
      <Meta
        title="Articulos - Ecotivista"
        description="Articulos de investigación de la comunidad de Ecotivista"
        canonical={`${PATHURL}/articles`}
      />

      <SearchComponent> <SearchBar setArticles={setArticles}/> </SearchComponent>
      
      <Center>
        {isLoading ? (
          <MidDiv> <Loader /> </MidDiv>
        ) : (
          <>
            <ArticlesContainer>
            <MasonryLayout>
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
              </MasonryLayout>
            </ArticlesContainer>
            {isFetching && <Loader />} {/* Infinite scroll loader */}
            {!isFetching && hasMore && (
              <LoadMoreButton onClick={() => setPage((prev) => prev + 1)}>
                Load More
              </LoadMoreButton>
            )}
            {!hasMore && <p>Has llegado al final. Ya no hay más que ver por el momento . . .</p>}
          </>
        )}
      </Center>
    </>
  );
}
