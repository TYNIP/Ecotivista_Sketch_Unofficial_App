import {useEffect, useState, useCallback} from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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


const MainLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter()

  const [status, setStatus] = useState(isAuthenticated);
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = useCallback(async ()=>{
    try{
      const response = await axios.get("/api/announcements");
      setAnnouncements(response.data);
    }catch(err){
      console.error('Error fetching announcements');
    }
  },[])

  useEffect(()=>{
    setStatus(isAuthenticated);
    const path = pathname.split('/')[1];
    if(isAuthenticated && (path === 'login' || path === 'register')) {
      router.push('/')
    }

  },[isAuthenticated, pathname, router]);

  useEffect(()=>{
    fetchAnnouncements()
  },[fetchAnnouncements]);
  return(
  
  <Container>
    <Header isAuthenticated={status}/>
    <SubHeader/>
      <NotificationProvider>
        {announcements.length > 0 && (
          announcements.map((notification, key)=>
          <Warning key={key} message={notification.message} bkg={notification.color==="green"?"green":notification.color==="red"?"#A60101":"#B88F27"}/>
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
