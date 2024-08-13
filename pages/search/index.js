/* SEARCH */
import Meta from '../../components/seo/Meta';
import SearchBar from '../../components/ui/SearchBar';
import styled from 'styled-components';
import API_URL from '../api/utils/isLocalHost';

const Center = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export default function SearchPage() {
  return (
    <>
      <Meta
        title="Ecotivista | Search"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${API_URL}/search`}
      />
      <Center>
        <SearchBar/>
      </Center>
    </>
  );
}