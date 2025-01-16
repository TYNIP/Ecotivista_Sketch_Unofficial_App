/* ARTICLES */
import Meta from '../../components/seo/Meta';
const {PATHURL} = require('../api/config');
import SearchBar from '../../components/ui/SearchBar';
import styled from 'styled-components';

const Center = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

export default function ArticlesPage() {
  return (
    <>
      <Meta
        title="Articulos - Ecotivista"
        description="Articulos de investigación de la comunidad de Ecotivista"
        canonical={`${PATHURL}/articles`}
      />
      <Center>
        <SearchBar/>
      </Center>
    </>
  );
}