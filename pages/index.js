/* HOME */
import Meta from '../components/seo/Meta';
import {PATHURL} from './api/config';
import styles from '@/styles/index.module.scss';

export default function HomePage() {
  return (
    <>
      <Meta
        title="Ecotivista"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}`}
      />
      <section className={styles.generalContainer}>
      <div className={styles.head}>
          <h2>¡Si tienes un sueño de cambio, ya formas parte de Ecotivista!</h2>
      </div>

      <article className={styles.mainContent}>
        <h2>Ecotivista</h2>

        <h2>Recientes</h2>

        <h2>Sugeridos</h2>

        <h2>Usuarios</h2>

        <h2>Descubre</h2>
      </article>

      </section>

    </>
  );
}
