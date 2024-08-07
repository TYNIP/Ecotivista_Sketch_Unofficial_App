// components/layout/MainLayout.js
import Header from '../common/Header';
import Footer from '../common/Footer';
import styled from 'styled-components';
import SubHeader from '../common/SubHeader';
import Warning from '../ui/Warning';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  margin: 2% 5%

`;

const color ='green'
const msg = ''

const MainLayout = ({ children }) => (
  <Container>
    <Header />
    <SubHeader/>
    {msg.length > 0 && (<Warning message={msg} bkg={color}/>)}
    <Main>{children}</Main>
    <Footer />
  </Container>
);

export default MainLayout;
