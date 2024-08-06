// components/layout/MainLayout.js
import Header from '../common/Header';
import Footer from '../common/Footer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

const MainLayout = ({ children }) => (
  <Container>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Container>
);

export default MainLayout;
