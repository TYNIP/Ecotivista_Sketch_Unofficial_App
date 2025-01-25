/* HOME */
import Meta from '../components/seo/Meta';
import {PATHURL} from './api/config';
import styles from '@/styles/index.module.scss';
import Banner from "@/features/HomeFeatures/banner";
import Link from "next/link";
import styled from 'styled-components';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:0;
  padding: 0;
  
`;

const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: masonry !important;
  grid-auto-flow: dense;
  gap: 1rem;
  padding: 2rem;
  align-items: start; 
  overflow: auto;
  scrollbar-width: thin; 
  scrollbar-color: white white;
  scrollbar-style: none;
  margin:0;
  padding: 0;
  border: 1px solid rgba(0,0,0, 0.1);
`;

export default function HomePage() {
  return (
    <>
      <Meta
        title="Ecotivista"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}`}
      />
      <section className={styles.generalContainer}>
      <Center>
      <div className={styles.head}>
          <h2 styles={{"width":"100vh"}}>¡Si tienes un sueño de cambio, ya formas parte de Ecotivista!</h2>
      </div>
      <article className={styles.mainContent}>

      <h2>Ecotivista ➤</h2>
      <ArticlesContainer>
        <Banner path={"ecotivista"}/>
      </ArticlesContainer>

      <h2><Link href="/articles?sort=recents">Recientes ➤</Link></h2>

      <ArticlesContainer>
        <Banner path={"recents"}/>
      </ArticlesContainer>

      <h2><Link href="/articles?sort=discover">Descubre ➤</Link></h2>

      <ArticlesContainer>
        <Banner path={"random"}/>
      </ArticlesContainer>


      </article>
      </Center>
      </section>
      {/* <section className={styles.generalContainer}>
      <div className={styles.head}>
          <h2 styles={{"width":"100vh"}}>¡Si tienes un sueño de cambio, ya formas parte de Ecotivista!</h2>
      </div>

      <article className={styles.mainContent}>
        <h2>Ecotivista</h2>
        <Center >
          <Banner path={"ecotivista"}/>
          </Center>

        <h2><Link href="/articles?sort=recents">Recientes</Link></h2>
        <div style={{"width":"100vh"}}><Banner path={"recents"}/></div>

        <h2><Link href="/articles?sort=discover">Descubre</Link></h2>
        <div style={{"width":"100vh"}}><Banner path={"random"}/></div>

      </article>

      </section> */}

    </>
  );
}
