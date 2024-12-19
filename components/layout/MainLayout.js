// components/layout/MainLayout.js
import Header from '../common/Header';
import Footer from '../common/Footer';
import styled from 'styled-components';
import SubHeader from '../common/SubHeader';
import Warning from '../ui/Warning';
import {NotificationProvider} from '../../pages/api/context/NotificationContext';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh !important;
`;

const Main = styled.main`
  flex: 1;
  margin: 2% 5%

`;
const Content = styled.section`
  flex: 1;
  margin: 0

`;



const generalNotifications = [{msg: 'hola', color:'green'}, {msg:'ah', color:'red'}];

const MainLayout = ({ children }) => (
  <Container>
    <Header />
    <SubHeader/>
      <NotificationProvider>
        {generalNotifications.length > 0 && (
          generalNotifications.map((notification, key)=>
          <Warning key={key} message={notification.msg} bkg={notification.color}/>
          )
        )}
      
            <Main>
              
              
            <section id="content-wrapper">
              <section className='ad'></section>
                <Content>{children}</Content>
              <section className='ad'></section>
            </section>


            </Main>
          
      </NotificationProvider>
    <Footer />
  </Container>
);

export default MainLayout;
