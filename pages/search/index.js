/* SEARCH */
import Meta from '../../components/seo/Meta';
import SearchBar from '../../components/ui/SearchBar';
import styled from 'styled-components';
const {PATHURL} = require('../api/config');

const Center = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export default function SearchPage() {
  return (
    <>
      <Meta
        title="Busqueda - Ecotivista"
        description="Panel de Busqueda a Toda Información de Ecotivista"
        canonical={`${PATHURL}/search`}
      />
      <Center>
        <SearchBar/>
      </Center>
    </>
  );
}