/* SEARCH */
import Meta from '../../components/seo/Meta';
import SearchBar from '../../components/ui/SearchBar';
import styled from 'styled-components';
const Center = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export default function Home() {
  return (
    <>
      <Meta
        title="Ecotivista | Search"
        description="The House of Independent Journalism, Activism and Education."
        canonical="http://localhost:3000/"
      />
      <Center>
        <SearchBar/>
      </Center>
    </>
  );
}