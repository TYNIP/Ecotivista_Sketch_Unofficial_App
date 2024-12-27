import {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Header from '../common/Header';
import Footer from '../common/Footer';
import styled from 'styled-components';
import SubHeader from '../common/SubHeader';
import Warning from '../ui/Warning';

import {NotificationProvider} from '../../pages/api/context/NotificationContext';
import { useAuth } from '../../pages/api/context/AuthContext';

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

const MainLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter()

  const [status, setStatus] = useState(isAuthenticated)
  useEffect(()=>{
    setStatus(isAuthenticated);
    const path = pathname.split('/')[1];
    if(isAuthenticated && (path === 'login' || path === 'register')) {
      router.push('/')
    }

  },[isAuthenticated, pathname]);
  return(
  
  <Container>
    <Header isAuthenticated={status}/>
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
)};

export default MainLayout;
