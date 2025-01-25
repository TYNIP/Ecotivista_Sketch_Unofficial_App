/* HOME */
import Meta from '../components/seo/Meta';
import {PATHURL} from './api/config';
import styles from '@/styles/index.module.scss';
import Banner from "@/features/HomeFeatures/banner";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Meta
        title="Ecotivista"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}`}
      />
      <section className={styles.generalContainer}>
      <div className={styles.head} styles={{"width":"100vh"}}>
          <h2 styles={{"width":"100vh"}}>¡Si tienes un sueño de cambio, ya formas parte de Ecotivista!</h2>
      </div>

      <article className={styles.mainContent}>
        <h2>Ecotivista</h2>
        <div style={{"width":"100%"}}><Banner path={"ecotivista"}/></div>

        <h2><Link href="/articles?sort=recents">Recientes</Link></h2>
        <div style={{"width":"100%"}}><Banner path={"recents"}/></div>

        <h2><Link href="/articles?sort=discover">Descubre</Link></h2>
        <div style={{"width":"100%"}}><Banner path={"random"}/></div>

      </article>

      </section>

    </>
  );
}
